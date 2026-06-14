import "server-only";
import { getPayload } from "./payload";
import { BLOG_AUTHOR, type BlogPost } from "./blog-utils";

export { BLOG_AUTHOR, readingTime } from "./blog-utils";
export type { BlogPost } from "./blog-utils";

function resolveImageUrl(
  image: unknown,
  legacyImage: unknown,
): string {
  // Payload media upload (populated object with url)
  if (image && typeof image === "object" && "url" in (image as Record<string, unknown>)) {
    return (image as { url: string }).url;
  }
  // Legacy static image path
  if (legacyImage && typeof legacyImage === "string") {
    return legacyImage;
  }
  return "/images/blog/placeholder.jpg";
}

function mapPost(doc: Record<string, unknown>): BlogPost {
  const category = doc.category as
    | { name: string; slug: string }
    | string
    | null;

  return {
    slug: doc.slug as string,
    title: doc.title as string,
    excerpt: doc.excerpt as string,
    category: typeof category === "object" && category ? category.name : (category as string) || "",
    image: resolveImageUrl(doc.image, doc.legacyImage),
    richContent: doc.content as Record<string, unknown> | null,
    markdownContent: doc.markdownContent as string | null,
    author: (doc.author as string) || BLOG_AUTHOR,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "blog-posts",
    where: { status: { equals: "published" } },
    sort: "-createdAt",
    limit: 100,
    depth: 1,
  });

  return docs.map((doc) => mapPost(doc as unknown as Record<string, unknown>));
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "blog-posts",
    where: { slug: { equals: slug }, status: { equals: "published" } },
    depth: 1,
    limit: 1,
  });

  return docs.length > 0
    ? mapPost(docs[0] as unknown as Record<string, unknown>)
    : undefined;
}

export async function getRelatedPosts(
  slug: string,
  limit = 3,
): Promise<BlogPost[]> {
  const current = await getPostBySlug(slug);
  if (!current) {
    const all = await getAllPosts();
    return all.slice(0, limit);
  }

  const payload = await getPayload();

  // Get posts in the same category first
  const { docs: sameCat } = await payload.find({
    collection: "blog-posts",
    where: {
      slug: { not_equals: slug },
      status: { equals: "published" },
    },
    sort: "-createdAt",
    limit: limit + 5,
    depth: 1,
  });

  const mapped = sameCat.map((doc) =>
    mapPost(doc as unknown as Record<string, unknown>),
  );
  const sameCategory = mapped.filter((p) => p.category === current.category);
  const others = mapped.filter((p) => p.category !== current.category);

  return [...sameCategory, ...others].slice(0, limit);
}

/** All unique categories from published posts. */
export async function getCategories(): Promise<string[]> {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "categories",
    limit: 50,
    sort: "name",
  });

  return docs.map((doc) => (doc as unknown as { name: string }).name);
}
