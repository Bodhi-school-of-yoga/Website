'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface MoreCoursesItem {
  image: string;
  title: string;
  subtitle: string;
  href: string;
}

export interface MoreCoursesSectionProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: MoreCoursesItem[];
}

export function MoreCoursesSection({
  eyebrow,
  heading,
  subheading,
  items,
}: MoreCoursesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const gridStagger: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.3 },
        },
      };

  const cardItem: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="page-px py-10 md:py-14 lg:py-20">
      <div className="mx-auto max-w-[1340px]">
        <div className="flex flex-col gap-3 md:gap-4">
          <motion.span
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-mini uppercase text-text-brand"
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}
            className="text-h4 lg:text-h2 text-text-primary"
          >
            {heading}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
            className="text-subtext-2 text-text-tertiary max-w-[720px]"
          >
            {subheading}
          </motion.p>
        </div>

        <motion.div
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7"
        >
          {items.map((item, idx) => (
            <motion.div
              key={`${item.title}-${idx}`}
              variants={cardItem}
              className="group"
            >
              <Link
                href={item.href}
                className="flex h-full flex-col gap-4 rounded-2xl border border-border-2 bg-surface-1 p-4 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-mint-frost lg:aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 px-1 pb-1">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-h5 text-text-primary">{item.title}</h3>
                    <p className="text-body-sm text-text-tertiary">{item.subtitle}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-2 text-text-brand transition-transform duration-300 motion-safe:group-hover:rotate-45"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
