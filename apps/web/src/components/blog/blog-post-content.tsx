"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";
import { usePromoBanner } from "@/components/ui/use-promo-banner";

export default function BlogPostContent({ slug }: { slug: string }) {
  const { visible: bannerVisible } = usePromoBanner();
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <section className={bannerVisible ? "pt-44 pb-20" : "pt-32 pb-20"}>
      <Container className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button render={<Link href="/blog" />} variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>

          <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
          <div className="mt-2 h-1 w-16 rounded-full bg-primary" />

          <div className="mt-8 prose prose-neutral max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              This blog post content is managed through Strapi CMS. Once
              connected, the full article for &ldquo;{title}&rdquo; will be
              rendered here with rich text formatting, images, and embedded
              media.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              To populate this page with real content, create a Blog Post entry
              in your Strapi admin panel at{" "}
              <code className="text-primary">
                {process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}
                /admin
              </code>
              .
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
