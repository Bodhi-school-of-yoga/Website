"use client";

// HighlightsSection — icon-card grid on the homepage listing Bodhi's key program differentiators.
import * as React from "react";
import {
  Flower2,
  AlignCenter,
  Dumbbell,
  Leaf,
  Cpu,
  Users,
  Feather,
  Bone,
  Smile,
  Rocket,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { HighlightCard } from "@/components/ui/highlight-card";

// Maps item.icon string keys to lucide-react elements.
// Extend this map as new icon keys are introduced in content.
const ICON_RESOLVER: Record<string, React.ReactNode> = {
  yoga: <Flower2 className="h-6 w-6" strokeWidth={1.75} />,
  "align-center": <AlignCenter className="h-6 w-6" strokeWidth={1.75} />,
  strength: <Dumbbell className="h-6 w-6" strokeWidth={1.75} />,
  leaf: <Leaf className="h-6 w-6" strokeWidth={1.75} />,
  technology: <Cpu className="h-6 w-6" strokeWidth={1.75} />,
  people: <Users className="h-6 w-6" strokeWidth={1.75} />,
  feather: <Feather className="h-6 w-6" strokeWidth={1.75} />,
  spine: <Bone className="h-6 w-6" strokeWidth={1.75} />,
  smile: <Smile className="h-6 w-6" strokeWidth={1.75} />,
  rocket: <Rocket className="h-6 w-6" strokeWidth={1.75} />,
};

const DEFAULT_ICON = <Flower2 className="h-6 w-6" strokeWidth={1.75} />;

export type HighlightItem = {
  icon: string;
  title: string;
  body: string;
};

export type HighlightsSectionProps = {
  id?: string;
  eyebrow: string;
  heading: string;
  items: HighlightItem[];
  className?: string;
};

export function HighlightsSection({
  id,
  eyebrow,
  heading,
  items,
  className,
}: HighlightsSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Header fade-in-up variants (scroll-into-view).
  const headerVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      };

  // Grid parent — stagger-children with delayChildren:0.15.
  const gridVariants: Variants = prefersReducedMotion
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0.15 },
        },
      };

  // Each card child — fade-in-up.
  const cardVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      };

  return (
    <section
      id={id}
      className={cn(
        "w-full border-y border-border-2 bg-surface-0",
        "py-16 lg:py-20",
        id && "scroll-mt-20 lg:scroll-mt-24",
        className,
      )}
    >
      <div className="mx-auto max-w-[1200px] page-px">
        <motion.div
          className="flex flex-col gap-1.5 mb-10"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <p className="text-mini uppercase tracking-widest text-text-brand-deep">
            {eyebrow}
          </p>
          <h2 className="font-heading text-[34px] font-bold leading-tight text-text-secondary">
            {heading}
          </h2>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-[18px] list-none p-0 m-0"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {items.map((item) => (
            <motion.li
              key={item.title}
              variants={cardVariants}
              className="motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg rounded-lg"
            >
              <HighlightCard
                icon={ICON_RESOLVER[item.icon] ?? DEFAULT_ICON}
                title={item.title}
                body={item.body}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
