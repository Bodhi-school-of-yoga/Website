"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Container from "@/components/shared/container";
import { Markdown } from "@/components/blog/markdown";
import { usePromoBanner } from "@/components/ui/use-promo-banner";
import { cn } from "@/lib/utils";
import { BLOG_AUTHOR, readingTime, type BlogPost } from "@/data/blog-posts";

export default function BlogPostContent({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const { visible: bannerVisible } = usePromoBanner();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <article>
      {/* Reading progress */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-brand-primary transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* Header — same brand-lite → white gradient as the home page */}
      <header
        className={cn(
          "relative overflow-hidden bg-[linear-gradient(to_bottom,var(--color-brand-lite)_0%,#ffffff_100%)] pb-10",
          bannerVisible ? "pt-40 sm:pt-44" : "pt-32 sm:pt-36",
        )}
      >
        <Container className="relative max-w-[760px]">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-subtext-3 text-text-tertiary"
          >
            <Link href="/" className="transition-colors hover:text-text-brand">
              Home
            </Link>
            <span aria-hidden className="text-border-3">
              /
            </span>
            <Link
              href="/blog"
              className="transition-colors hover:text-text-brand"
            >
              Blog
            </Link>
            <span aria-hidden className="text-border-3">
              /
            </span>
            <span className="text-text-secondary">{post.category}</span>
          </nav>

          <div className="mt-7 flex items-center gap-3 text-mini font-semibold uppercase tracking-[0.14em]">
            <span className="rounded-full bg-brand-lite px-2.5 py-1 text-text-brand-deep">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 text-text-tertiary">
              <Clock className="h-3.5 w-3.5" />
              {readingTime(post.content)} min read
            </span>
          </div>

          <h1 className="mt-4 font-heading text-h3 text-text-primary">
            {post.title}
          </h1>
          <p className="mt-5 text-subtext-2 leading-relaxed text-text-tertiary">
            {post.excerpt}
          </p>

          <div className="mt-7 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-lite font-heading text-subtext-2 text-text-brand-deep">
              B
            </span>
            <span className="text-subtext-3 text-text-tertiary">
              {BLOG_AUTHOR}
            </span>
          </div>
        </Container>
      </header>

      {/* Cover image — square frame keeps the (mostly 1:1) covers uncropped */}
      <Container className="relative z-10 mt-8 max-w-[760px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-3xl border border-border-2 shadow-card"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 520px) 520px, 100vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </Container>

      {/* Body */}
      <Container className="max-w-[760px]">
        <div className="py-12">
          <Markdown content={post.content} />
        </div>

        {/* Inline CTA */}
        <div className="mb-16 rounded-3xl border border-border-2 bg-surface-mint-pale px-6 py-8 text-center sm:px-10">
          <h2 className="font-heading text-h5 text-text-primary">
            Ready to begin your journey?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-body-md text-text-tertiary">
            Explore Bodhi&apos;s Yoga Teacher Training and wellness programs —
            and turn insight into practice.
          </p>
          <Link
            href="/teacher-courses/online"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-subtext-3 font-semibold text-text-inverse transition-colors hover:bg-brand-mid"
          >
            Explore our courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border-2 bg-surface-2/40 py-16">
          <Container>
            <h2 className="mb-8 font-heading text-h4 text-text-primary">
              Continue reading
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-2 bg-surface-1 shadow-card transition-shadow hover:shadow-chip"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <span className="text-mini font-semibold uppercase tracking-[0.14em] text-text-brand">
                      {item.category}
                    </span>
                    <h3 className="font-heading text-subtext-2 leading-snug text-text-primary transition-colors group-hover:text-text-brand">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
