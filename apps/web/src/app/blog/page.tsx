import type { Metadata } from "next";
import BlogContent from "@/components/blog/blog-content";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { BLOG_AUTHOR, getAllPosts } from "@/data/blog-posts";

const SITE_URL = "https://bodhischoolofyoga.com";

export const metadata: Metadata = {
  title: "Blogs & Insights",
  description:
    "Insights on yoga, wellness, mindfulness, women's health, Ayurveda, and mindful living from the Bodhi School of Yoga community.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Blogs & Insights | Bodhi School of Yoga",
    description:
      "Insights on yoga, wellness, mindfulness, women's health, Ayurveda, and mindful living from the Bodhi School of Yoga community.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Bodhi School of Yoga — Blogs & Insights",
    url: `${SITE_URL}/blog`,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: BLOG_AUTHOR, url: SITE_URL },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: `${SITE_URL}${post.image}`,
      articleSection: post.category,
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main>
        <BlogContent />
      </main>
      <SiteFooterBlock />
    </>
  );
}
