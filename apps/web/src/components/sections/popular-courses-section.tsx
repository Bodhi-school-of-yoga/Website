// PopularCoursesSection — curated grid of popular program cards on the homepage and listing pages.
import * as React from "react";
import { Clock, Globe, Monitor, Tag } from "lucide-react";

import { cn } from "@/lib/utils";
import { ProgramCard, type ProgramCardModeBadge } from "@/components/ui/program-card";
import { COURSES, getDiscountLabel } from "@/data/courses-catalog";

export type PopularCourse = {
  title: string;
  image: string;
  meta: Array<{ icon: string; label: string }>;
  instructor: { initials: string; name: string };
  ctaLabel: string;
  ctaHref: string;
  modeBadge?: ProgramCardModeBadge;
  rating?: number;
  reviewCount?: number;
  centersLabel?: string;
  featured?: boolean;
  price?: string;
  originalPrice?: string;
  discountLabel?: string;
};

export type PopularCoursesSectionProps = {
  eyebrow: string;
  heading: string;
  subhead: string;
  courses: PopularCourse[];
  className?: string;
};

function resolveMetaIcon(icon: string): React.ReactNode {
  switch (icon) {
    case "clock":
      return <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />;
    case "globe":
      return <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />;
    case "monitor":
      return <Monitor className="h-3.5 w-3.5" strokeWidth={1.75} />;
    default:
      return <Tag className="h-3.5 w-3.5" strokeWidth={1.75} />;
  }
}

const DEFAULT_COURSES: PopularCourse[] = COURSES.filter(
  (c) =>
    c.slug === "weight-loss-coach-certification" ||
    c.slug === "face-yoga-ttc" ||
    c.slug === "mat-pilates-certification",
).map((c) => ({
  title: c.title,
  image: c.listingImage,
  meta: [
    { icon: "clock", label: c.durationLabel },
    { icon: "monitor", label: c.mode === "online" ? "Online" : "Studio" },
  ],
  instructor: c.instructor,
  ctaLabel: "View Program",
  ctaHref: `/courses/${c.slug}`,
  price: c.price,
  originalPrice: c.originalPrice,
  discountLabel: getDiscountLabel(c),
}));

export function PopularCoursesSection({
  eyebrow,
  heading,
  subhead,
  courses = DEFAULT_COURSES,
  className,
}: PopularCoursesSectionProps) {
  return (
    <section
      className={cn("w-full bg-surface-1 py-12 sm:py-16 md:py-20 lg:py-28", className)}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 page-px lg:gap-12">
        <header className="flex flex-col items-center gap-4 text-center">
          <p className="text-mini uppercase text-text-brand">{eyebrow}</p>
          <h2 className="font-heading text-[clamp(1.5rem,3.5vw+0.25rem,3.25rem)] leading-[1.2] text-text-secondary">{heading}</h2>
          <p className="max-w-2xl text-subtext-2 text-text-secondary">{subhead}</p>
        </header>

        <ul className="grid w-full grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <li key={course.ctaHref}>
              <ProgramCard
                title={course.title}
                href={course.ctaHref}
                imageSrc={course.image}
                imageAlt={course.title}
                meta={course.meta.map((m) => ({
                  icon: resolveMetaIcon(m.icon),
                  label: m.label,
                }))}
                instructor={{
                  initials: course.instructor.initials,
                  name: course.instructor.name,
                }}
                cta={course.ctaLabel}
                modeBadge={course.modeBadge}
                priority={i === 0}
                rating={course.rating}
                reviewCount={course.reviewCount}
                centersLabel={course.centersLabel}
                featured={course.featured}
                price={course.price}
                originalPrice={course.originalPrice}
                discountLabel={course.discountLabel}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
