"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { usePromoBanner } from "@/components/ui/use-promo-banner";

export type FeatureCard = {
  icon: string;
  label: string;
  description: string;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type OnlineOfflineHeroProps = {
  breadcrumb?: BreadcrumbItem[];
  headline: string;
  subtitle: string;
  resultCount?: string;
  backgroundImage: string;
  backgroundAlt?: string;
  features: FeatureCard[];
  className?: string;
};

export function OnlineOfflineHero({
  breadcrumb,
  headline,
  subtitle,
  resultCount,
  backgroundImage,
  backgroundAlt = "",
  features,
  className,
}: OnlineOfflineHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const { visible: bannerVisible } = usePromoBanner();

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: prefersReducedMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const fadeUp = (y: number, duration: number): Variants => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.12 : duration,
        ease: "easeOut",
      },
    },
  });

  const breadcrumbVariants = fadeUp(8, 0.28);
  const headlineVariants = fadeUp(16, 0.4);
  const subtitleVariants = fadeUp(12, 0.35);
  const featureVariants = fadeUp(10, 0.3);

  return (
    <div className="relative">
      {/* Hero band */}
      <section
        className={cn(
          "relative flex w-full overflow-hidden",
          // Mobile: plain white bg, shorter height. Desktop: full image hero.
          "bg-white min-h-0",
          "lg:min-h-[560px]",
          bannerVisible && "lg:min-h-[600px]",
          className,
        )}
      >
        {/* Background image — hidden on mobile */}
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          sizes="100vw"
          className="hidden lg:block object-cover object-center"
          priority
        />

        {/* Content */}
        <motion.div
          className={cn(
            "relative z-10 mx-auto flex w-full max-w-[1200px] flex-col page-px",
            bannerVisible
              ? "pt-[120px] sm:pt-[130px] lg:pt-[160px] pb-10 lg:pb-16"
              : "pt-[96px] sm:pt-[104px] lg:pt-[116px] pb-10 lg:pb-16",
          )}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <motion.nav
              variants={breadcrumbVariants}
              aria-label="Breadcrumb"
              className="mb-4"
            >
              <ol className="flex items-center gap-1.5 text-body-sm text-text-secondary lg:text-neutral-200">
                {breadcrumb.map((item, index) => {
                  const isLast = index === breadcrumb.length - 1;
                  return (
                    <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                      {item.href && !isLast ? (
                        <Link
                          href={item.href}
                          className="transition-colors hover:text-text-primary lg:hover:text-neutral-300"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-text-primary lg:text-white">{item.label}</span>
                      )}
                      {!isLast && <span className="text-text-tertiary lg:text-neutral-200">/</span>}
                    </li>
                  );
                })}
              </ol>
            </motion.nav>
          )}

          <div className="max-w-xl lg:max-w-2xl">
            <motion.h1
              variants={headlineVariants}
              className="font-heading text-h2 lg:text-h1 text-text-primary lg:text-white"
            >
              {headline}
            </motion.h1>

            <motion.p
              variants={subtitleVariants}
              className="mt-4 text-body-md text-text-secondary lg:text-neutral-200 max-w-lg"
            >
              {subtitle}
            </motion.p>

            {resultCount && (
              <motion.p
                variants={subtitleVariants}
                className="mt-3 text-mini uppercase tracking-widest text-text-primary lg:text-white"
              >
                {resultCount}
              </motion.p>
            )}
          </div>
        </motion.div>
      </section>

      {/* Feature cards — overlapping on desktop, stacked on mobile */}
      <motion.div
        className="relative z-20 mx-auto max-w-[1200px] page-px lg:-mt-10 mt-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.12 : 0.4,
          ease: "easeOut",
          delay: prefersReducedMotion ? 0 : 0.4,
        }}
      >
        <div
          className={cn(
            "rounded-2xl border border-neutral-200 bg-white",
            // Mobile: single column, horizontal dividers
            "divide-y divide-neutral-200",
            // Desktop: 4 columns, vertical dividers
            "lg:grid lg:grid-cols-4 lg:divide-y-0 lg:divide-x",
          )}
        >
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex items-start gap-3 px-5 py-4 sm:px-5 sm:py-5"
            >
              <Image
                src={feature.icon}
                alt=""
                width={28}
                height={28}
                className="shrink-0 mt-0.5"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary leading-tight">
                  {feature.label}
                </p>
                <p className="mt-0.5 text-xs text-text-tertiary leading-snug">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
