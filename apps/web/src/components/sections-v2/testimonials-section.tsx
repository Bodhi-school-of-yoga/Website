'use client';

import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export type TestimonialItem = {
  /**
   * Avatar source. When provided as an image path, renders as <Image>.
   * When omitted, falls back to the first letter of the name on a mint tile.
   */
  avatar?: string;
  quote: string;
  name: string;
  role: string;
};

export type TestimonialsSectionProps = {
  eyebrow: string;
  heading: string;
  /**
   * Items in display order. The FIRST item renders as the featured (green)
   * card spanning both rows of the left column. The next up-to-5 items fill
   * a 2×2 (+1) grid of white cards on the right.
   */
  items: TestimonialItem[];
};

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || '·';
}

type FeaturedCardProps = {
  item: TestimonialItem;
  variants: Variants;
};

function FeaturedCard({ item, variants }: FeaturedCardProps) {
  return (
    <motion.article
      variants={variants}
      className={[
        'flex flex-col',
        'rounded-[24px] bg-brand-primary',
        'p-7 lg:p-8',
        'row-span-2',
        'min-h-[320px] lg:min-h-[406px]',
      ].join(' ')}
    >
      <div className="relative h-[110px] w-[110px] lg:h-[135px] lg:w-[135px] overflow-hidden rounded-full bg-mint-soft shrink-0">
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            sizes="135px"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[42px] font-heading font-bold text-brand-primary">
            {getInitial(item.name)}
          </span>
        )}
      </div>

      <h3 className="mt-6 text-h5 text-surface-1 font-heading font-bold">
        {item.name}
      </h3>
      <p className="mt-1 text-body-sm text-mint-soft">{item.role}</p>

      <p className="mt-5 text-body-sm text-surface-1 leading-[1.55]">
        &ldquo;{item.quote}&rdquo;
      </p>
    </motion.article>
  );
}

type RegularCardProps = {
  item: TestimonialItem;
  variants: Variants;
};

function RegularCard({ item, variants }: RegularCardProps) {
  return (
    <motion.article
      variants={variants}
      className={[
        'flex flex-col',
        'rounded-[24px] bg-surface-1 border border-border-3',
        'p-5 lg:p-6',
        'transition-shadow duration-300 ease-out',
        'motion-safe:hover:shadow-card',
      ].join(' ')}
    >
      <div className="relative h-[80px] w-[80px] lg:h-[98px] lg:w-[98px] overflow-hidden rounded-full bg-mint-soft shrink-0">
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            sizes="98px"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[42px] font-heading font-bold text-text-brand">
            {getInitial(item.name)}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-subtext-3 font-bold text-text-secondary">
        {item.name}
      </h3>
      <p className="mt-1 text-body-sm text-text-brand">{item.role}</p>

      <p className="mt-3 text-body-sm text-text-tertiary leading-[1.55]">
        &ldquo;{item.quote}&rdquo;
      </p>
    </motion.article>
  );
}

export function TestimonialsSection({
  eyebrow,
  heading,
  items,
}: TestimonialsSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = prefersReducedMotion
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
          transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
      };

  const itemVariants: Variants = prefersReducedMotion
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

  const [featured, ...rest] = items;
  const others = rest.slice(0, 5);

  return (
    <section className="bg-surface-1">
      <div className="page-px py-14 md:py-20 lg:py-[58px]">
        <div className="max-w-[1340px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="flex flex-col items-start"
          >
            <motion.p
              variants={itemVariants}
              className="text-mini font-semibold uppercase tracking-[1.8px] text-text-secondary"
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="mt-2 text-[28px] md:text-[30px] lg:text-[34px] font-heading font-bold leading-[1.04] text-text-secondary"
            >
              {heading}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className={[
              'mt-8 lg:mt-[37px]',
              'grid gap-x-4 gap-y-4 md:gap-x-[18px] md:gap-y-[18px] lg:gap-x-[25px] lg:gap-y-[18px]',
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
              'lg:grid-rows-2',
              'lg:auto-rows-fr',
            ].join(' ')}
          >
            {featured ? (
              <FeaturedCard item={featured} variants={itemVariants} />
            ) : null}

            {others.map((item, idx) => (
              <RegularCard
                key={`${item.name}-${idx}`}
                item={item}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
