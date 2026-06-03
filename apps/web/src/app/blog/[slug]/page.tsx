import type { Metadata } from "next";
import BlogPostContent from "@/components/blog/blog-post-content";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

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
  return (
    <>
      <SiteHeader />
      <main>
        <BlogPostContent slug={slug} />
      </main>
      <SiteFooterBlock />
    </>
  );
}
