"use client";

// ModuleSection — animated expandable module block listing topics within a course curriculum.
import * as React from "react";
import { motion, type Variants } from "framer-motion";

import { SectionHeader } from "@/components/ui/section-header";
import {
  VideoLessonCard,
  type VideoLessonCardProps,
} from "@/components/ui/video-lesson-card";
import { cn } from "@/lib/utils";

export type ModuleSectionProps = {
  title: string;
  subtitle?: string;
  lessons: VideoLessonCardProps[];
  className?: string;
  id?: string;
};

const container: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.1, staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ModuleSection({
  title,
  subtitle,
  lessons,
  className,
  id,
}: ModuleSectionProps) {
  return (
    <section className={cn("py-12 lg:py-16", className)} id={id}>
      <div className="mx-auto max-w-[1340px] page-px">
        <SectionHeader title={title} subtitle={subtitle} />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {lessons.map((lesson, i) => (
            <motion.div variants={item} key={i}>
              <VideoLessonCard {...lesson} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
