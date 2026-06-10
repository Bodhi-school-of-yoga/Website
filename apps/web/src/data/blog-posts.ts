// Blog data layer — fetches from Strapi CMS with fallback to local JSON.
//
// When Strapi has published articles they are used; otherwise the bundled
// blog-posts.json is returned so the site always has content.

import postsData from "./blog-posts.json";
import {
  getArticles,
  getArticleBySlug as fetchStrapiArticle,
  getCategories,
  getStrapiMedia,
  type StrapiArticle,
  type StrapiBlock,
} from "@/lib/strapi";

export type BlogCategory = string;

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** Cover image — either a local path or a full Strapi URL */
  image: string;
  /** Markdown body — see components/blog/markdown.tsx for supported syntax. */
  content: string;
}

export const BLOG_AUTHOR = "Bodhi School of Yoga";

// ─── Local JSON (fallback) ───────────────────────────────────────────

const localPosts: BlogPost[] = postsData as BlogPost[];

function localCategories(): string[] {
  return Array.from(new Set(localPosts.map((p) => p.category)));
}

// ─── Strapi → BlogPost adapter ──────────────────────────────────────

function blocksToMarkdown(blocks: StrapiBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.__component) {
        case "shared.rich-text":
          return block.body ?? "";
        case "shared.quote":
          return `> ${block.body ?? block.title ?? ""}`;
        case "shared.media":
        case "shared.slider":
          return "";
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}

function strapiToBlogPost(article: StrapiArticle): BlogPost {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.description ?? "",
    category: article.category?.name ?? "Uncategorized",
    image: getStrapiMedia(article.cover?.url) ?? "/images/blog/default.jpg",
    content: blocksToMarkdown(article.blocks ?? []),
  };
}

// ─── Public async API (used by server components) ────────────────────

export async function fetchAllPosts(): Promise<BlogPost[]> {
  try {
    const res = await getArticles({ pageSize: 100 });
    if (res.data && res.data.length > 0) {
      return res.data.map(strapiToBlogPost);
    }
  } catch {
    // Strapi unavailable — fall through to local data
  }
  return localPosts;
}

export async function fetchPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  try {
    const article = await fetchStrapiArticle(slug);
    if (article) return strapiToBlogPost(article);
  } catch {
    // fall through
  }
  return localPosts.find((p) => p.slug === slug);
}

export async function fetchRelatedPosts(
  slug: string,
  limit = 3,
): Promise<BlogPost[]> {
  const all = await fetchAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);
  const sameCategory = all.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = all.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const res = await getCategories();
    if (res.data && res.data.length > 0) {
      return res.data.map((c) => c.name);
    }
  } catch {
    // fall through
  }
  return localCategories();
}

// ─── Synchronous helpers (still used by client components) ───────────

/** Rough reading time in minutes, derived from the markdown body. */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// ─── Legacy synchronous API (kept for any non-migrated imports) ──────

export const blogPosts = localPosts;

export const BLOG_CATEGORIES: string[] = localCategories();

export function getAllPosts(): BlogPost[] {
  return localPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return localPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return localPosts.slice(0, limit);
  const sameCategory = localPosts.filter(
    (post) => post.slug !== slug && post.category === current.category,
  );
  const others = localPosts.filter(
    (post) => post.slug !== slug && post.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
