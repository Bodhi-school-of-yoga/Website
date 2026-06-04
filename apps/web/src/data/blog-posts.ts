// Typed loader for blog content.
//
// The actual articles + cover images live in ./blog-posts.json (sourced from
// bodhischoolofyoga.com/blogs-and-insights). Bodies are stored as lightweight
// markdown (## / ### headings, `-` / `1.` lists, **bold**, > quote) and rendered
// by components/blog/markdown.tsx — no extra deps. Publish dates are intentionally
// omitted across the blog experience. Edit the JSON to add or change posts.

import postsData from "./blog-posts.json";

export type BlogCategory =
  | "Women's Wellness"
  | "Yoga Stories"
  | "Mental Health"
  | "Yoga Therapy"
  | "Spirituality"
  | "Yoga Practice"
  | "Mind & Science"
  | "Ayurveda"
  | "Teen Fitness";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** Cover image under /public/images/blog */
  image: string;
  /** Markdown body — see components/blog/markdown.tsx for supported syntax. */
  content: string;
}

export const BLOG_AUTHOR = "Bodhi School of Yoga";

export const blogPosts: BlogPost[] = postsData as BlogPost[];

/** Categories in display order, derived from the posts that actually exist. */
export const BLOG_CATEGORIES: BlogCategory[] = Array.from(
  new Set(blogPosts.map((post) => post.category)),
);

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return blogPosts.slice(0, limit);
  const sameCategory = blogPosts.filter(
    (post) => post.slug !== slug && post.category === current.category,
  );
  const others = blogPosts.filter(
    (post) => post.slug !== slug && post.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/** Rough reading time in minutes, derived from the markdown body. */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
