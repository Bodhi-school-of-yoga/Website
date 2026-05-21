import type { Metadata } from "next";
import BlogContent from "@/components/blog/blog-content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on yoga, wellness, mindfulness, and healthy living from the Bodhi Yoga community.",
};

export default function BlogPage() {
  return <BlogContent />;
}
