"use client";

// CourseIncludesSection — animated icon-and-text list of what students receive with a course enrollment.
import * as React from "react";
import { motion, type Variants } from "framer-motion";
import {
  Monitor,
  Video,
  Clock,
  Download,
  FileText,
  Award,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { HighlightCard } from "@/components/ui/highlight-card";

const ICON_MAP = {
  devices: Monitor,
  video: Video,
  clock: Clock,
  download: Download,
  pdf: FileText,
  certificate: Award,
  community: MessageCircle,
  sparkles: Sparkles,
} as const;

export type IncludeItem = {
  title: string;
  sub: string;
  iconKey:
    | "devices"
    | "video"
    | "clock"
    | "download"
    | "pdf"
    | "certificate"
    | "community"
    | "sparkles";
};

export type CourseIncludesSectionProps = {
  title: string;
  items: IncludeItem[];
  className?: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.06,
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

export function CourseIncludesSection({
  title,
  items,
  className,
}: CourseIncludesSectionProps) {
  return (
    <section className={cn("py-16 lg:py-20 bg-surface-mint-pale", className)}>
      <div className="mx-auto max-w-[1200px] page-px">
        <SectionHeader title={title} />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((item) => {
            const Icon = ICON_MAP[item.iconKey];
            return (
              <motion.div key={item.title} variants={itemVariants}>
                <HighlightCard
                  icon={<Icon className="h-6 w-6" strokeWidth={1.75} />}
                  title={item.title}
                  body={item.sub}
                  className="h-full transition-transform duration-300 hover:-translate-y-1"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
