import * as React from "react";
import { Clock, Globe, Monitor, Tag } from "lucide-react";

import { cn } from "@/lib/utils";
import { ProgramCard, type ProgramCardModeBadge } from "@/components/ui/program-card";

export type PopularCourse = {
  title: string;
  image: string;
  meta: Array<{ icon: string; label: string }>;
  instructor: { initials: string; name: string };
  ctaLabel: string;
  ctaHref: string;
  modeBadge?: ProgramCardModeBadge;
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

const DEFAULT_COURSES: PopularCourse[] = [
  {
    title: "Online Weight Loss Coach Certification",
    image: "/images/programs/pranayama-nervous-system.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "monitor", label: "Online" },
    ],
    instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
    ctaLabel: "Enrol Now",
    ctaHref: "/programs/certifications/weight-loss-coach",
  },
  {
    title: "Online Mudra Therapy Yoga Teacher Training",
    image: "/images/programs/face-yoga-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "2 weeks" },
      { icon: "monitor", label: "Online" },
    ],
    instructor: { initials: "PP", name: "Prarthana Patel" },
    ctaLabel: "Enrol Now",
    ctaHref: "/programs/certifications/mudra-therapy",
  },
  {
    title: "Online MAT Pilates Instructor Certification",
    image: "/images/programs/weight-loss-coach-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "monitor", label: "Online" },
    ],
    instructor: { initials: "LY", name: "Lakshmi Yalamudi" },
    ctaLabel: "Enrol Now",
    ctaHref: "/programs/certifications/mat-pilates-instructor",
  },
];

export function PopularCoursesSection({
  eyebrow,
  heading,
  subhead,
  courses = DEFAULT_COURSES,
  className,
}: PopularCoursesSectionProps) {
  return (
    <section
      className={cn("w-full bg-surface-1 py-20 sm:py-24 lg:py-28", className)}
    >
      <div className="mx-auto flex max-w-[1340px] flex-col gap-10 px-6 sm:px-8 lg:gap-12 lg:px-10">
        <header className="flex flex-col items-center gap-4 text-center">
          <p className="text-mini uppercase text-text-brand">{eyebrow}</p>
          <h2 className="font-heading text-h2 text-text-secondary">{heading}</h2>
          <p className="max-w-2xl text-subtext-2 text-text-secondary">{subhead}</p>
        </header>

        <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
