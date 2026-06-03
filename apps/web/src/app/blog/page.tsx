import type { Metadata } from "next";
import BlogContent from "@/components/blog/blog-content";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on yoga, wellness, mindfulness, and healthy living from the Bodhi Yoga community.",
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <BlogContent />
      </main>
      <SiteFooterBlock />
    </>
  );
}
