'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

export type HighlightItem = {
  icon: LucideIcon;
  title: string;
  body: string;
  emphasis?: boolean;
};

export type HighlightsSectionProps = {
  eyebrow: string;
  heading: string;
  items: HighlightItem[];
};

type HighlightCardProps = {
  item: HighlightItem;
  itemVariants: Variants;
};

function HighlightCard({ item, itemVariants }: HighlightCardProps) {
  const Icon = item.icon;
  return (
    <motion.article
      variants={itemVariants}
      className={[
        'group rounded-2xl bg-surface-1 border border-border-1',
        'p-6 md:p-8',
        'transition-transform transition-shadow duration-300 ease-out',
        'motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-card',
        item.emphasis ? 'sm:col-span-2' : '',
      ].join(' ')}
    >
      <div className="flex items-start gap-4 md:gap-5">
        <div
          className={[
            'shrink-0 inline-flex items-center justify-center',
            'rounded-xl bg-mint-frost text-text-brand',
            'h-11 w-11 md:h-[52px] md:w-[52px]',
          ].join(' ')}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <h3 className="text-h5 text-text-primary">{item.title}</h3>
          <p className="mt-2 text-body-sm text-text-primary/80">{item.body}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function HighlightsSection({ eyebrow, heading, items }: HighlightsSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const gridContainer: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.2 },
        },
      };

  const cardItem: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="bg-mint-cream">
      <div className="page-px py-14 md:py-20 lg:py-24">
        <div className="max-w-[1340px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-[760px]"
          >
            <motion.p
              variants={fadeUp}
              className="text-mini text-text-brand uppercase tracking-[0.18em]"
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}
              className="mt-3 text-h4 md:text-h3 lg:text-h2 text-text-primary"
            >
              {heading}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={[
              'mt-10 md:mt-12 lg:mt-14',
              'grid grid-cols-1 sm:grid-cols-2',
              'gap-4 md:gap-[18px]',
            ].join(' ')}
          >
            {items.map((item, idx) => (
              <HighlightCard
                key={`${item.title}-${idx}`}
                item={item}
                itemVariants={cardItem}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
