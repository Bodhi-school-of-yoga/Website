import { NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";
import postsData from "@/data/blog-posts.json";

interface LegacyPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  content: string;
}

export async function POST() {
  const payload = await getPayload();

  const createdCategories: string[] = [];
  const skippedCategories: string[] = [];
  const createdPosts: string[] = [];
  const skippedPosts: string[] = [];
  const errors: string[] = [];

  // 1. Seed categories
  const categoryNames = Array.from(
    new Set((postsData as LegacyPost[]).map((p) => p.category)),
  );
  const categoryMap = new Map<string, string | number>();

  for (const name of categoryNames) {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    try {
      const existing = await payload.find({
        collection: "categories",
        where: { slug: { equals: slug } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        const doc = existing.docs[0] as unknown as { id: string | number };
        categoryMap.set(name, doc.id);
        skippedCategories.push(name);
      } else {
        const doc = await payload.create({
          collection: "categories",
          data: { name, slug },
        });
        categoryMap.set(name, (doc as unknown as { id: string | number }).id);
        createdCategories.push(name);
      }
    } catch (err) {
      errors.push(`Category "${name}": ${(err as Error).message}`);
    }
  }

  // 2. Seed blog posts
  for (const post of postsData as LegacyPost[]) {
    try {
      const existing = await payload.find({
        collection: "blog-posts",
        where: { slug: { equals: post.slug } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        skippedPosts.push(post.slug);
        continue;
      }

      const categoryId = categoryMap.get(post.category);
      if (!categoryId) {
        errors.push(`No category id for "${post.title}" (${post.category})`);
        continue;
      }

      await payload.create({
        collection: "blog-posts",
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          category: categoryId,
          legacyImage: post.image,
          markdownContent: post.content,
          author: "Bodhi School of Yoga",
          status: "published",
        } as Record<string, unknown>,
      });

      createdPosts.push(post.slug);
    } catch (err) {
      errors.push(`Post "${post.slug}": ${(err as Error).message}`);
    }
  }

  return NextResponse.json({
    summary: {
      categoriesCreated: createdCategories.length,
      categoriesSkipped: skippedCategories.length,
      postsCreated: createdPosts.length,
      postsSkipped: skippedPosts.length,
      errors: errors.length,
    },
    createdCategories,
    skippedCategories,
    createdPosts,
    skippedPosts,
    errors,
  });
}
