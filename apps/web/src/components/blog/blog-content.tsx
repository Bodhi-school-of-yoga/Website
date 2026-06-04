"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Container from "@/components/shared/container";
import { usePromoBanner } from "@/components/ui/use-promo-banner";
import { cn } from "@/lib/utils";
import {
  getAllPosts,
  BLOG_CATEGORIES,
  readingTime,
  type BlogPost,
} from "@/data/blog-posts";

const posts = getAllPosts();
const tabs = ["All", ...BLOG_CATEGORIES];

export default function BlogContent() {
  const { visible: bannerVisible } = usePromoBanner();
  const [activeCategory, setActiveCategory] = useState("All");
  const showFeatured = activeCategory === "All";

  const featured = posts[0];
  const visiblePosts = useMemo(() => {
    if (showFeatured) return posts.slice(1);
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, showFeatured]);

  return (
    <>
      {/* Hero — same brand-lite → white gradient as the home page */}
      <section
        className={cn(
          "relative overflow-hidden bg-[linear-gradient(to_bottom,var(--color-brand-lite)_0%,#ffffff_100%)]",
          showFeatured ? "pb-10 sm:pb-12" : "pb-12",
          bannerVisible ? "pt-40 sm:pt-44" : "pt-32 sm:pt-36",
        )}
      >
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-mini font-semibold uppercase tracking-[0.22em] text-text-brand">
              Bodhi Journal
            </p>
            <h1 className="mt-4 font-heading text-[clamp(2rem,5vw+0.5rem,5.625rem)] leading-[0.95]">
              <span className="text-text-primary">Stories to wake up</span>
              <br className="hidden sm:block" />{" "}
              <span className="text-text-brand">the world</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-subtext-2 text-text-tertiary">
              Yoga, wellness, and mindful living — insights, science, and real
              stories from the Bodhi community.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Featured */}
      {showFeatured && (
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto"
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid items-stretch overflow-hidden rounded-[28px] border border-border-2 bg-surface-1 shadow-chip transition-all duration-300 hover:-translate-y-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[16/11]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 620px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  priority
                />
                <span className="absolute left-5 top-5 rounded-full bg-surface-1/90 px-3 py-1 text-mini font-semibold text-text-brand-deep shadow-sm backdrop-blur">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center gap-3 sm:gap-4 p-5 sm:p-7 lg:p-10">
                <MetaRow category={featured.category} content={featured.content} />
                <h2 className="font-heading text-h4 text-text-primary transition-colors group-hover:text-text-brand">
                  {featured.title}
                </h2>
                <p className="text-body-md leading-relaxed text-text-tertiary">
                  {featured.excerpt}
                </p>
                <span className="mt-1 inline-flex items-center gap-1.5 text-subtext-3 font-semibold text-text-brand">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        </Container>
      )}

      {/* Filter + grid */}
      <section className={cn(showFeatured ? "pt-14 pb-16" : "py-14")}>
        <Container>
          {/* Category pills — wrap + center, scales to any number of categories */}
          <div className="mb-10 flex flex-wrap justify-center gap-2.5">
            {tabs.map((tab) => {
              const active = tab === activeCategory;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveCategory(tab)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-body-sm font-medium transition-colors",
                    active
                      ? "border-brand-primary bg-brand-primary text-text-inverse"
                      : "border-border-3 bg-surface-1 text-text-tertiary hover:border-brand-primary hover:text-text-brand",
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="mb-8 flex items-baseline justify-between border-b border-border-2 pb-4">
            <h2 className="font-heading text-h5 text-text-primary">
              {showFeatured ? "Latest articles" : activeCategory}
            </h2>
            <span className="text-subtext-3 text-text-tertiary">
              {visiblePosts.length}{" "}
              {visiblePosts.length === 1 ? "article" : "articles"}
            </span>
          </div>

          <div
            key={activeCategory}
            className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visiblePosts.map((post, i) => (
              <article
                key={post.slug}
                className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both"
                style={{ animationDelay: `${Math.min(i, 8) * 55}ms` }}
              >
                <PostCard post={post} />
              </article>
            ))}
          </div>

          {visiblePosts.length === 0 && (
            <p className="py-16 text-center text-body-md text-text-tertiary">
              No articles in this category yet.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}

function MetaRow({
  category,
  content,
}: {
  category: string;
  content: string;
}) {
  return (
    <div className="flex items-center gap-3 text-mini font-semibold uppercase tracking-[0.14em]">
      <span className="rounded-full bg-brand-lite px-2.5 py-1 text-text-brand-deep">
        {category}
      </span>
      <span className="inline-flex items-center gap-1 text-text-tertiary">
        <Clock className="h-3.5 w-3.5" />
        {readingTime(content)} min read
      </span>
    </div>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-2 bg-surface-1 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-chip"
    >
      {/* Wide on mobile, square on larger screens */}
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <MetaRow category={post.category} content={post.content} />
        <h3 className="font-heading text-subtext-1 leading-snug text-text-primary transition-colors group-hover:text-text-brand">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-body-sm leading-relaxed text-text-tertiary">
          {post.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-subtext-3 font-semibold text-text-brand">
          Read more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
