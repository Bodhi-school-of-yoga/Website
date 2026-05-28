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
      className={[
        'snap-start shrink-0',
        'w-[260px] sm:w-auto',
      ].join(' ')}
    >
      <Link
        href={href}
        className={[
          'group flex flex-col items-center text-center',
          'rounded-2xl bg-surface-1 border border-border-2',
          'p-5 md:p-6 lg:p-7',
          'transition-transform transition-shadow duration-300 ease-out',
          'motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-card',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand focus-visible:ring-offset-2',
          'h-full',
        ].join(' ')}
      >
        <div
          className={[
            'relative overflow-hidden rounded-full',
            'h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24',
            'bg-mint-frost',
          ].join(' ')}
        >
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            sizes="(min-width: 1280px) 96px, (min-width: 768px) 80px, 64px"
            className="object-cover"
          />
        </div>
        <h3 className="mt-4 text-h5 text-text-primary">{item.name}</h3>
        <p className="mt-1 text-body-sm text-text-tertiary">{item.role}</p>
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
    <section className="bg-surface-1">
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

          {/* Mobile: horizontal snap strip. sm+: grid */}
          <motion.div
            variants={rowContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={[
              'mt-10 md:mt-12 lg:mt-14',
              // mobile: snap strip
              'flex sm:hidden gap-4 overflow-x-auto snap-x snap-mandatory',
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

          <motion.div
            variants={rowContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={[
              'mt-10 md:mt-12 lg:mt-14',
              'hidden sm:grid',
              'sm:grid-cols-2 lg:grid-cols-4',
              'gap-4 md:gap-5 lg:gap-[18px]',
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
