'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  current?: boolean;
};

export type CourseHeroProps = {
  backgroundImage?: string;
  breadcrumb: BreadcrumbItem[];
  title: string;
  priceLabel: string;
  price: string;
  cta: { label: string; href: string };
};

export function CourseHero({
  backgroundImage = '/images/courses/yoga-300-hour-ytt/hero.png',
  breadcrumb,
  title,
  priceLabel,
  price,
  cta,
}: CourseHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeIn: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
      };

  const fadeInUp: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section
      className="relative isolate w-full overflow-hidden min-h-[520px] sm:min-h-[600px] lg:min-h-[892px] flex flex-col text-text-inverse"
      aria-label="Course hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={backgroundImage}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Overlay gradient for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-dark/70 via-brand-dark/40 to-brand-dark/70 sm:from-brand-dark/55 sm:via-brand-dark/25 sm:to-brand-dark/60"
      />

      {/* Content */}
      <div className="page-px mx-auto w-full max-w-[1340px] flex-1 flex flex-col pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-24">
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0 }}
          className="mb-8 sm:mb-10 lg:mb-12"
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-hero-eyebrow uppercase tracking-wider text-text-inverse/85">
            {breadcrumb.map((crumb, idx) => {
              const isLast = idx === breadcrumb.length - 1;
              return (
                <li key={`${crumb.label}-${idx}`} className="flex items-center gap-1.5 truncate">
                  {crumb.href && !crumb.current ? (
                    <Link
                      href={crumb.href}
                      className="motion-safe:transition-colors hover:text-text-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-inverse/60 rounded-sm"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current={crumb.current ? 'page' : undefined} className="text-text-inverse">
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && (
                    <span aria-hidden className="text-text-inverse/60">
                      /
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </motion.nav>

        {/* Main content row */}
        <div className="mt-auto flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          {/* Title */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={prefersReducedMotion ? undefined : { delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-h3 sm:text-h2 lg:text-hero-headline font-medium max-w-[20ch] lg:max-w-[18ch] text-text-inverse"
          >
            {title}
          </motion.h1>

          {/* Price + CTA cluster */}
          <div className="flex flex-col gap-5 lg:items-end lg:max-w-[360px] w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={prefersReducedMotion ? undefined : { delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex flex-col items-start gap-1 rounded-xl bg-surface-1/95 px-5 py-4 backdrop-blur-sm shadow-card"
            >
              <span className="text-hero-eyebrow uppercase tracking-wider text-text-tertiary">
                {priceLabel}
              </span>
              <span className="text-h4 lg:text-h3 text-text-brand-emerald font-semibold">
                {price}
              </span>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={prefersReducedMotion ? undefined : { delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <Link
                href={cta.href}
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-8 py-4 text-hero-sub font-medium text-text-inverse motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-inverse focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
              >
                {cta.label}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
