export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  /** Lexical rich text JSON from Payload (for new posts). */
  richContent?: Record<string, unknown> | null;
  /** Legacy markdown content (for imported posts). */
  markdownContent?: string | null;
  author: string;
}

export const BLOG_AUTHOR = "Bodhi School of Yoga";

/** Rough reading time in minutes. */
export function readingTime(post: BlogPost): number {
  const text = post.markdownContent || "";
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
