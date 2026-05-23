"use client";

// CourseGridSection — animated responsive grid of course cards with mode, duration, and pricing badges.
import * as React from "react";
import { Clock, Globe, Monitor, Tag } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { ProgramCard } from "@/components/ui/program-card";
import { type PopularCourse } from "@/components/sections/popular-courses-section";

export type CourseGridSectionProps = {
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

export default function CourseGridSection({
  courses,
  className,
}: CourseGridSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={cn("bg-surface-default", className)}>
      <div className="mx-auto max-w-[1340px] page-px py-16 sm:py-20 lg:py-24">
        <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course, idx) => {
            const card = (
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
              />
            );

            if (prefersReducedMotion) {
              return <li key={course.ctaHref}>{card}</li>;
            }

            return (
              <li key={course.ctaHref}>
                <motion.div
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
