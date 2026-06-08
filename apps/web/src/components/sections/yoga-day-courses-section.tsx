"use client";

// YogaDayCoursesSection — eyebrow + heading + sub-copy, then a responsive 3-up
// grid of YogaDayCourseCard (Figma node 691:1552), with a staggered fade-in-up
// entrance.
//
// SINGLE SOURCE OF TRUTH: the cards are built from the real course catalog
// (@/data/courses-catalog), which already has the per-category campaign discount
// applied. There is NO duplicated course/price data here — change a course in
// courses.json or a discount in yoga-day-offer.json and this section updates
// automatically. `FEATURED_SLUGS` only chooses WHICH courses to spotlight.
import * as React from "react";
import { Clock, Globe } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  YogaDayCourseCard,
  type YogaDayCourseCardProps,
} from "@/components/ui/yoga-day-course-card";
import { COURSES, type Course, getDiscountLabel } from "@/data/courses-catalog";
import { offerPercentFor } from "@/data/yoga-day-offer";
import { cn } from "@/lib/utils";

const HOUSE_EASE = [0.22, 1, 0.36, 1] as const;

// Which catalog courses to spotlight — one per category so the section shows
// the different per-category discounts. Pricing/content come from the catalog.
const FEATURED_SLUGS = [
  "weight-loss-coach-certification", // teacher
  "300-hour-ytt-online", // advanced
  "advanced-yoga-mat-pilates", // yoga
];

// Map a catalog course → YogaDayCourseCard props. The catalog price/originalPrice
// are already campaign-adjusted; the badge text is derived (lowercase, to match
// the Figma) from the course's category discount.
function toCardProps(course: Course): YogaDayCourseCardProps {
  const pct = offerPercentFor(course.category);

  // For subscription courses (Daily Regular Yoga), show yearly price with
  // monthly×12 as the strikethrough so the saving is visible.
  let displayPrice = course.price ?? "";
  let displayOriginal = course.originalPrice;
  if (!course.price && course.pricingPlans) {
    const yearly = course.pricingPlans.find((p: { period: string }) => /year/i.test(p.period));
    const monthly = course.pricingPlans.find((p: { period: string; price: string }) => /month/i.test(p.period));
    if (yearly) {
      displayPrice = yearly.price;
      if (monthly) {
        const monthlyAmt = Number(monthly.price.replace(/[^\d.]/g, ""));
        const symbol = monthly.price.match(/^\D+/)?.[0]?.trim() ?? "₹";
        displayOriginal = `${symbol}${Math.round(monthlyAmt * 12).toLocaleString("en-IN")}`;
      }
    }
  }

  const staticLabel = getDiscountLabel({ price: displayPrice, originalPrice: displayOriginal });
  return {
    title: `${course.title} (${course.mode === "online" ? "Online" : "Offline"})`,
    price: displayPrice,
    originalPrice: displayOriginal,
    discountLabel: pct ? `${pct}% off` : staticLabel ? staticLabel.toLowerCase() : undefined,
    features: [
      {
        icon: <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />,
        label: course.durationLabel,
      },
      {
        icon: <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />,
        label: course.mode === "online" ? "Online" : "Studio",
      },
    ],
    instructor: course.instructor,
    imageSrc: course.listingImage,
    imageAlt: course.title,
    ctaLabel: "View Program",
    ctaHref: `/courses/${course.slug}`,
  };
}

const DEFAULT_COURSES: YogaDayCourseCardProps[] = FEATURED_SLUGS.map((slug) =>
  COURSES.find((c) => c.slug === slug),
)
  .filter((c): c is Course => Boolean(c))
  .map(toCardProps);

export type YogaDayCoursesSectionProps = {
  eyebrow?: string;
  title?: string;
  subCopy?: string;
  courses?: YogaDayCourseCardProps[];
  /** Override which catalog slugs to spotlight. When provided, builds cards from these slugs instead of DEFAULT_COURSES. */
  featuredSlugs?: string[];
  className?: string;
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: HOUSE_EASE },
  },
};

function buildFromSlugs(slugs: string[]): YogaDayCourseCardProps[] {
  return slugs
    .map((slug) => COURSES.find((c) => c.slug === slug))
    .filter((c): c is Course => Boolean(c))
    .map(toCardProps);
}

export function YogaDayCoursesSection({
  eyebrow = "yoga day offer",
  title = "Courses with Yoga Day Discounts",
  subCopy = "Join the waitlist to unlock these prices on June 21 — exclusive to registered members.",
  courses,
  featuredSlugs,
  className,
}: YogaDayCoursesSectionProps) {
  const resolvedCourses = courses ?? (featuredSlugs ? buildFromSlugs(featuredSlugs) : DEFAULT_COURSES);
  const prefersReducedMotion = useReducedMotion();

  const headerMotion = prefersReducedMotion
    ? { initial: "visible" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.4 },
      };

  return (
    <section className={cn("bg-surface-default", className)}>
      <div className="mx-auto max-w-[1200px] page-px py-16 sm:py-20 lg:py-24">
        <motion.div
          {...headerMotion}
          variants={prefersReducedMotion ? undefined : headerVariants}
          className="mx-auto flex max-w-[720px] flex-col items-center gap-3 text-center"
        >
          <span className="font-heading text-mini uppercase tracking-[0.18em] text-text-brand">
            {eyebrow}
          </span>
          <h2 className="font-heading font-bold text-h2 text-text-primary">
            {title}
          </h2>
          <p className="font-sans text-body text-text-secondary">{subCopy}</p>
        </motion.div>

        {/* Responsive 3-up grid — same gutters as the homepage course grid. */}
        <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {resolvedCourses.map((course, idx) => {
            const card = (
              <YogaDayCourseCard {...course} priority={idx === 0} />
            );

            if (prefersReducedMotion) {
              return (
                <li key={course.ctaHref ?? `${course.title}-${idx}`} className="h-full">
                  {card}
                </li>
              );
            }

            return (
              <li
                key={course.ctaHref ?? `${course.title}-${idx}`}
                className="h-full"
              >
                <motion.div
                  className="h-full"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.28,
                    ease: "easeOut",
                    delay: idx * 0.07,
                  }}
                >
                  {card}
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
