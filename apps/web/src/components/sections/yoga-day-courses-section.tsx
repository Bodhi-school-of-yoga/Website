"use client";

// YogaDayCoursesSection — eyebrow + heading + sub-copy, then a 3-up grid
// reusing the existing CourseCard primitive with verbatim Figma placeholder
// content. CourseCard self-animates (whileInView), so the cards are NOT wrapped
// in a stagger parent here — only the section header animates — to avoid
// double-animation.
import * as React from "react";
import { Clock, Globe, Languages } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { CourseCard, type CourseCardProps } from "@/components/ui/course-card";
import { cn } from "@/lib/utils";

const HOUSE_EASE = [0.22, 1, 0.36, 1] as const;

// TODO(assets): Figma course thumbnails are localhost:3845 asset ids
//   9b960670591093e0ff99418a76fa0695df782525.png,
//   2d0fbf196eedca7e24151d4d184a5bd3564e1078.png,
//   f47feada4030c2ceff916bb1a86c79e36d91a8d1.png — replace this placeholder
//   with the exported assets when available.
const COURSE_IMAGE = "/images/programs/weight-loss-coach.png";

function resolveFeatureIcon(label: string): React.ReactNode {
  if (/week|day|month|hour/i.test(label)) {
    return <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />;
  }
  if (/online|live/i.test(label)) {
    return <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />;
  }
  return <Languages className="h-3.5 w-3.5" strokeWidth={1.75} />;
}

export type YogaDayCourse = {
  title: string;
  description?: string;
  price: string;
  originalPrice?: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  cardHref?: string;
  image?: { src: string; alt: string };
};

export type YogaDayCoursesSectionProps = {
  eyebrow?: string;
  title?: string;
  subCopy?: string;
  courses?: YogaDayCourse[];
  className?: string;
};

const DEFAULT_COURSES: YogaDayCourse[] = Array.from({ length: 3 }, () => ({
  title: "Online Weight Loss Coach Certification",
  description:
    "Become a certified weight-loss coach with a science-backed, yoga-led program.",
  price: "₹4,999",
  originalPrice: "₹9,99",
  features: ["4 weeks", "Online", "English"],
  ctaLabel: "View Program",
  ctaHref: "#",
  cardHref: "#",
}));

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: HOUSE_EASE },
  },
};

export function YogaDayCoursesSection({
  eyebrow = "yoga day offer",
  title = "Courses with Yoga Day Discounts",
  subCopy = "Join the waitlist to unlock these prices on June 21 — exclusive to registered members.",
  courses = DEFAULT_COURSES,
  className,
}: YogaDayCoursesSectionProps) {
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
      <div className="mx-auto max-w-[1340px] page-px py-16 sm:py-20 lg:py-24">
        <motion.div
          {...headerMotion}
          variants={prefersReducedMotion ? undefined : headerVariants}
          className="flex max-w-[720px] flex-col gap-3"
        >
          <span className="font-heading text-mini uppercase tracking-[0.18em] text-text-brand">
            {eyebrow}
          </span>
          <h2 className="font-heading font-bold text-h2 text-text-primary">
            {title}
          </h2>
          <p className="font-sans text-body text-text-secondary">{subCopy}</p>
        </motion.div>

        <div className="mt-10 flex flex-col gap-6 sm:mt-12 lg:mt-14">
          {courses.map((course, idx) => {
            const cardProps: CourseCardProps = {
              variant: "course",
              image:
                course.image ?? {
                  src: COURSE_IMAGE,
                  alt: course.title,
                },
              title: course.title,
              description: course.description ?? "",
              price: course.price,
              originalPrice: course.originalPrice,
              features: course.features.map((label) => ({
                icon: resolveFeatureIcon(label),
                label,
              })),
              ctaLabel: course.ctaLabel ?? "View Program",
              ctaHref: course.ctaHref ?? "#",
              cardHref: course.cardHref ?? "#",
            };

            return (
              <CourseCard
                key={`${course.title}-${idx}`}
                {...cardProps}
                className="w-full"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
