'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export type InstructorItem = {
  avatar: string;
  name: string;
  role: string;
  href?: string;
};

export type InstructorsSectionProps = {
  eyebrow: string;
  heading: string;
  items: InstructorItem[];
  nextHref?: string;
};

type InstructorCardProps = {
  item: InstructorItem;
  fallbackHref: string;
  itemVariants: Variants;
};

function InstructorCard({ item, fallbackHref, itemVariants }: InstructorCardProps) {
  const href = item.href ?? fallbackHref;
  return (
    <motion.div
      variants={itemVariants}
      className="snap-start shrink-0 w-[300px] sm:w-auto"
    >
      <Link
        href={href}
        className={[
          'group flex items-center gap-[14px]',
          'h-[126px]',
          'rounded-[19px] bg-surface-1 border border-border-3',
          'pl-[15px] pr-[19px] py-[17px]',
          'shadow-[0px_22px_35px_rgba(197,197,197,0.25)]',
          'transition-transform transition-shadow duration-300 ease-out',
          'motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0px_26px_42px_rgba(197,197,197,0.35)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand focus-visible:ring-offset-2',
        ].join(' ')}
      >
        <div
          className={[
            'relative shrink-0 overflow-hidden rounded-full',
            'h-[98px] w-[98px]',
            'border border-border-3 bg-surface-2',
          ].join(' ')}
        >
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            sizes="98px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="font-heading font-bold text-[17px] leading-[29.7px] text-text-secondary">
            {item.name}
          </p>
          <p className="text-[13px] leading-[19px] text-text-tertiary">
            {item.role}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export function InstructorsSection({
  eyebrow,
  heading,
  items,
  nextHref = '#faq',
}: InstructorsSectionProps) {
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

  const rowContainer: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0, delayChildren: 0 },
        },
      }
    : {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.15 },
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
    <section className="bg-surface-1">
      <div className="py-14 md:py-16 lg:py-[50px]">
        <div className="max-w-[1340px] mx-auto page-px">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-[2px]"
          >
            <motion.p
              variants={fadeUp}
              className="text-mini font-semibold uppercase tracking-[1.8px] text-text-secondary leading-[18.15px]"
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ delay: prefersReducedMotion ? 0 : 0.08 }}
              className="font-heading font-bold text-[28px] md:text-[30px] lg:text-[34px] leading-[1.04] text-text-secondary"
            >
              {heading}
            </motion.h2>
          </motion.div>

          {/* Mobile: horizontal snap strip */}
          <motion.div
            variants={rowContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className={[
              'mt-[23px]',
              'flex sm:hidden gap-[16px] overflow-x-auto snap-x snap-mandatory',
              '-mx-4 px-4 pb-2',
            ].join(' ')}
          >
            {items.map((item, idx) => (
              <InstructorCard
                key={`m-${item.name}-${idx}`}
                item={item}
                fallbackHref={nextHref}
                itemVariants={cardItem}
              />
            ))}
          </motion.div>

          {/* Tablet 2-col / Desktop 4-col grid */}
          <motion.div
            variants={rowContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className={[
              'mt-[23px]',
              'hidden sm:grid',
              'sm:grid-cols-2 lg:grid-cols-4',
              'gap-[18px] lg:gap-[23px]',
            ].join(' ')}
          >
            {items.map((item, idx) => (
              <InstructorCard
                key={`g-${item.name}-${idx}`}
                item={item}
                fallbackHref={nextHref}
                itemVariants={cardItem}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
