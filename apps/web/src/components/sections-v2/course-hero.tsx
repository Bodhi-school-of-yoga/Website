'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { MapPin } from 'lucide-react';

import { PackageSelector } from '@/components/ui/package-selector';
import { usePromoBanner } from '@/components/ui/use-promo-banner';
import type { DescribedPlan } from '@/data/courses-catalog';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  current?: boolean;
};

export type CourseMetaPill = {
  icon?: 'studio' | 'clock' | 'calendar';
  /** Path to an SVG/image icon (e.g. "/icons/course1.svg"). Takes priority over `icon`. */
  iconSrc?: string;
  label: string;
};

export type CourseHeroProps = {
  backgroundImage?: string;
  imageAlt?: string;
  breadcrumb: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  availabilityNote?: string;
  availabilityHref?: string;
  metaPills?: CourseMetaPill[];
  priceLabel: string;
  price?: string;
  originalPrice?: string;
  /** Tiered/subscription pricing — rendered as a package selector when present. */
  pricingPlans?: { period: string; price: string }[];
  /** Fires when the visitor picks a subscription tier (initial + on change). */
  onPlanChange?: (plan: DescribedPlan, index: number) => void;
  /**
   * Reserve CTA. Provide `href` for a Link, `onClick` for a button-driven
   * booking flow (e.g. opening the Razorpay batch-booking dialog). When both
   * are given, `onClick` wins.
   */
  cta: { label: string; href?: string; onClick?: () => void };
};

function PillIcon({ name }: { name: CourseMetaPill['icon'] }) {
  // Inline SVGs — older lucide-react in this project doesn't ship modern icons.
  if (name === 'clock') {
    return (
      <svg
        aria-hidden
        viewBox="0 0 21 21"
        className="h-[21px] w-[21px] shrink-0 text-text-brand-emerald"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10.5" cy="10.5" r="8.4" />
        <path d="M10.5 6v4.7l3 2.1" />
      </svg>
    );
  }
  if (name === 'calendar') {
    return (
      <svg
        aria-hidden
        viewBox="0 0 21 22"
        className="h-[22px] w-[21px] shrink-0 text-text-brand-emerald"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2.5" y="4" width="16" height="16" rx="2" />
        <path d="M2.5 9h16M7 2v4M14 2v4" />
      </svg>
    );
  }
  // studio (default) — a simple building/door glyph
  return (
    <svg
      aria-hidden
      viewBox="0 0 19 22"
      className="h-[22px] w-[19px] shrink-0 text-text-brand-emerald"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 21V8l7.5-5L17 8v13" />
      <path d="M7 21v-6h5v6" />
    </svg>
  );
}


export function CourseHero({
  backgroundImage = '/images/courses/yoga-300-hour-ytt/hero.png',
  imageAlt = '',
  breadcrumb,
  title,
  subtitle,
  availabilityNote,
  availabilityHref,
  metaPills,
  priceLabel,
  price,
  originalPrice,
  pricingPlans,
  onPlanChange,
  cta,
}: CourseHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  // The hero bleeds up behind the fixed nav (+ promo bar). When the bar is live
  // it overlays ~48px more below the nav, so add top clearance to keep the
  // breadcrumb from tucking under it.
  const { visible: bannerVisible } = usePromoBanner();
  const topPad = bannerVisible
    ? 'pt-[172px] sm:pt-[180px] lg:pt-[192px]'
    : 'pt-[120px] sm:pt-[128px] lg:pt-[140px]';

  const container: Variants = prefersReducedMotion
    ? {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0, duration: 0 },
      },
    }
    : {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
      },
    };

  const fadeInUp: Variants = prefersReducedMotion
    ? {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0 } },
    }
    : {
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      },
    };

  const imageReveal: Variants = prefersReducedMotion
    ? {
      hidden: { opacity: 1, scale: 1 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0 } },
    }
    : {
      hidden: { opacity: 0, scale: 1.02 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      },
    };

  return (
    <section
      className="relative w-full overflow-x-clip bg-[linear-gradient(to_bottom,var(--color-brand-lite)_0%,#ffffff_100%)]"
      aria-label="Course hero"
    >
      <div className={`page-px mx-auto w-full max-w-[1200px] pb-[64px] sm:pb-20 lg:pb-[80px] ${topPad}`}>
        <motion.div
          // Render directly in the resolved "visible" state (no hidden→visible
          // enter gate). Framer otherwise drives the entrance via rAF, which the
          // browser pauses while the tab is backgrounded — stranding the whole
          // hero at opacity 0 until a scroll wakes it. initial={false} guarantees
          // the content paints immediately regardless of tab focus.
          initial={false}
          animate="visible"
          variants={container}
          className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 lg:gap-[92px] lg:items-center"
        >

          {/* Left — content column (Figma: text/CTA on left) */}
          <motion.div
            variants={imageReveal}
            className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] aspect-[608/546] md:aspect-auto md:min-h-[420px] lg:min-h-[546px] bg-surface-2 order-1 md:order-2"
          >
            <Image
              src={backgroundImage}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 608px, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </motion.div>
          {/* Right — image (Figma: image on right) */}

          <motion.div variants={container} className="flex flex-col order-2 ">
            {/* Breadcrumb */}
            <motion.nav
              aria-label="Breadcrumb"
              variants={fadeInUp}
              className="mb-3 sm:mb-4"
            >
              <ol className="flex flex-wrap items-center gap-1.5 text-subtext-2 text-text-tertiary">
                {breadcrumb.map((crumb, idx) => {
                  const isLast = idx === breadcrumb.length - 1;
                  return (
                    <li
                      key={`${crumb.label}-${idx}`}
                      className="flex items-center gap-1.5"
                    >
                      {crumb.href && !crumb.current ? (
                        <Link
                          href={crumb.href}
                          className="rounded-sm motion-safe:transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand/60"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span
                          aria-current={crumb.current ? 'page' : undefined}
                          className="text-text-tertiary"
                        >
                          {crumb.label}
                        </span>
                      )}
                      {!isLast && (
                        <span aria-hidden className="text-text-tertiary">
                          /
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </motion.nav>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-[clamp(1.75rem,4vw+0.25rem,3.25rem)] leading-[1.15] font-heading font-bold text-text-secondary"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                variants={fadeInUp}
                className=" text-subtext-2 text-text-tertiary max-w-[34rem] mt-2"
              >
                {subtitle}
              </motion.p>
            )}
            {/* Availability note */}
            {availabilityNote && (
              <motion.div
                variants={fadeInUp}
                className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2"
              >
                <span className="inline-flex items-center gap-2 text-body-sm font-medium text-text-secondary">
                  <MapPin fill="#009877" className="h-[18px] w-[18px] text-white" />
                  {availabilityNote}
                </span>
                {availabilityHref && (
                  <Link
                    href={availabilityHref}
                    className="text-body-sm font-medium text-text-brand-emerald underline-offset-4 motion-safe:transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand/60 rounded-sm"
                  >
                    Check availability
                  </Link>
                )}
              </motion.div>
            )}

            {/* Meta pills row */}
            {metaPills && metaPills.length > 0 && (
              <motion.ul
                variants={fadeInUp}
                className="mt-4 flex flex-wrap items-center gap-2 sm:gap-[11px]"
              >
                {metaPills.map((pill, idx) => (
                  <li
                    key={`${pill.label}-${idx}`}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-border-3 bg-surface-1 px-3 py-2 sm:px-[17px] sm:py-[11px] text-[13px] sm:text-body-sm font-semibold text-text-secondary"
                  >
                    {pill.iconSrc ? (
                      <Image src={pill.iconSrc} alt="" width={26} height={26} className="shrink-0" />
                    ) : (
                      <PillIcon name={pill.icon} />
                    )}
                    {pill.label}
                  </li>
                ))}
              </motion.ul>
            )}

            {/* Price block — subscription package selector, a single price, or nothing. */}
            {pricingPlans && pricingPlans.length > 0 ? (
              <motion.div variants={fadeInUp} className="mt-8">
                <PackageSelector
                  label="Select your package"
                  plans={pricingPlans}
                  onPlanChange={onPlanChange}
                />
              </motion.div>
            ) : price ? (
              <motion.div
                variants={fadeInUp}
                className="mt-8 flex items-baseline gap-4"
              >
                <span className="sr-only">{priceLabel}</span>
                {originalPrice && (
                  <span className="block mt-0.5 text-[19px] text-text-tertiary line-through">
                    {originalPrice}
                  </span>
                )}
                <span className="block text-[clamp(1.5rem,2.5vw+0.5rem,2.25rem)] font-heading font-bold text-brand-primary">
                  {price}
                </span>
              </motion.div>
            ) : null}

            {/* CTA */}
            <motion.div variants={fadeInUp} className="mt-5">
              {cta.onClick ? (
                <button
                  type="button"
                  onClick={cta.onClick}
                  className="inline-flex w-full sm:w-full items-center justify-center rounded-full bg-brand-primary px-8 py-[10px] text-subtext-2 font-semibold text-text-inverse motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.01] motion-safe:active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
                >
                  {cta.label}
                </button>
              ) : (
                <Link
                  href={cta.href ?? '#'}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-brand-primary px-8 py-[14px] text-subtext-2 font-semibold text-text-inverse motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.01] motion-safe:active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
                >
                  {cta.label}
                </Link>
              )}
            </motion.div>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}
