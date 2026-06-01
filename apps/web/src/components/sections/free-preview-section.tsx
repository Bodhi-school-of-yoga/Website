"use client";

// FreePreviewSection — animated teaser section offering a free class or preview on course listing pages.
import * as React from "react";
import { motion, type Variants } from "framer-motion";

import { SectionHeader } from "@/components/ui/section-header";
import {
  VideoLessonCard,
  type VideoLessonCardProps,
} from "@/components/ui/video-lesson-card";
import { cn } from "@/lib/utils";

export type FreePreviewSectionProps = {
  title: string;
  subtitle?: string;
  lessons: VideoLessonCardProps[];
  className?: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const viewport = { once: true, amount: 0.2 } as const;

export function FreePreviewSection({
  title,
  subtitle,
  lessons,
  className,
}: FreePreviewSectionProps) {
  return (
    <section className={cn("py-12 lg:py-16", className)}>
      <div className="mx-auto max-w-[1200px] page-px">
        <SectionHeader title={title} subtitle={subtitle} />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {lessons.map((lesson, index) => (
            <motion.div
              key={`${lesson.title}-${index}`}
              variants={itemVariants}
            >
              <VideoLessonCard {...lesson} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
