import type { Metadata } from "next";
import BlogPostContent from "@/components/blog/blog-post-content";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  props: BlogPostPageProps,
): Promise<Metadata> {
  const { slug } = await props.params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title,
    description: `Read "${title}" on the Bodhi Yoga blog.`,
  };
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const { slug } = await props.params;
  return <BlogPostContent slug={slug} />;
}
