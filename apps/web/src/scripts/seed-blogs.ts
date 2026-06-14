/**
 * Seed script — imports existing blog posts from blog-posts.json into Payload CMS.
 *
 * Usage:
 *   npx tsx src/scripts/seed-blogs.ts
 *
 * Prerequisites:
 *   - DATABASE_URI and PAYLOAD_SECRET set in .env.local
 *   - PostgreSQL database running
 */

import { getPayload } from "payload";
import config from "../payload.config";
import postsData from "../data/blog-posts.json";

interface LegacyPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  content: string;
}

async function seed() {
  console.log("Initializing Payload...");
  const payload = await getPayload({ config });

  // 1. Seed categories
  const categoryNames = [...new Set(postsData.map((p: LegacyPost) => p.category))];
  const categoryMap = new Map<string, string>(); // name -> id

  console.log(`\nSeeding ${categoryNames.length} categories...`);
  for (const name of categoryNames) {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if already exists
    const existing = await payload.find({
      collection: "categories",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      const doc = existing.docs[0] as unknown as { id: string };
      categoryMap.set(name, String(doc.id));
      console.log(`  ✓ Category "${name}" already exists`);
    } else {
      const doc = await payload.create({
        collection: "categories",
        data: { name, slug },
      });
      categoryMap.set(name, String(doc.id));
      console.log(`  + Created category "${name}"`);
    }
  }

  // 2. Seed blog posts
  console.log(`\nSeeding ${postsData.length} blog posts...`);
  for (const post of postsData as LegacyPost[]) {
    // Check if already exists
    const existing = await payload.find({
      collection: "blog-posts",
      where: { slug: { equals: post.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`  ✓ Post "${post.title}" already exists, skipping`);
      continue;
    }

    const categoryId = categoryMap.get(post.category);
    if (!categoryId) {
      console.error(`  ✗ Category "${post.category}" not found for post "${post.title}"`);
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

    console.log(`  + Created post "${post.title}"`);
  }

  console.log("\nSeed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
