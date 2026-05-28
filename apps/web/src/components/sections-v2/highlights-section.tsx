'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  Activity,
  AlignCenter,
  Award,
  Dumbbell,
  HandHeart,
  Leaf,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';

export type HighlightIconName =
  | 'yoga'
  | 'align-center'
  | 'leaf'
  | 'strength'
  | 'technology'
  | 'people'
  | 'award'
  | 'hands';

export type HighlightItem = {
  /** Either a Lucide icon component (when used from a Client Component) or a
   *  string name from the icon map below (when used from a Server Component). */
  icon: LucideIcon | HighlightIconName;
  title: string;
  body: string;
};

export type HighlightsSectionProps = {
  eyebrow: string;
  heading: string;
  items: HighlightItem[];
};

const ICON_MAP: Record<HighlightIconName, LucideIcon> = {
  yoga: Activity,
  'align-center': AlignCenter,
  leaf: Leaf,
  strength: Dumbbell,
  technology: Sparkles,
  people: Users,
  award: Award,
  hands: HandHeart,
};

function resolveIcon(icon: HighlightItem['icon']): LucideIcon {
  if (typeof icon === 'string') return ICON_MAP[icon] ?? Sparkles;
  return icon;
}

function HighlightCard({
  item,
  variants,
}: {
  item: HighlightItem;
  variants: Variants;
}) {
  const Icon = resolveIcon(item.icon);
  return (
    <motion.article
      variants={variants}
      className="flex flex-col gap-[14px] rounded-[19px] border border-border-3 bg-surface-1 px-[19px] py-[17px] shadow-[0_7px_17px_rgba(231,231,231,0.25)]"
    >
      <div
        className="flex h-[52px] w-[52px] items-center justify-center rounded-[17px] bg-mint-cream"
        aria-hidden="true"
      >
        <Icon className="h-[22px] w-[22px] text-text-brand" strokeWidth={1.75} />
      </div>
      <div className="flex flex-col gap-[2px]">
        <h3 className="text-subtext-3 font-bold text-text-secondary">
          {item.title}
        </h3>
        <p className="text-body-sm text-text-tertiary">{item.body}</p>
      </div>
    </motion.article>
  );
}

export function HighlightsSection({
  eyebrow,
  heading,
  items,
}: HighlightsSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const grid: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0 } } }
    : {
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
      };

  return (
    <section className="bg-surface-0">
      <div className="page-px py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1340px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-[1px]"
          >
            <motion.p
              variants={fadeUp}
              className="text-mini font-semibold uppercase tracking-[1.8px] text-text-teal-deep"
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ delay: prefersReducedMotion ? 0 : 0.08 }}
              className="text-[28px] sm:text-[32px] lg:text-[34px] font-heading font-bold leading-[1.04] text-text-secondary"
            >
              {heading}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-[22px] grid grid-cols-1 gap-[15px] sm:gap-[18px] md:grid-cols-2"
          >
            {items.map((item) => (
              <HighlightCard key={item.title} item={item} variants={fadeUp} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
