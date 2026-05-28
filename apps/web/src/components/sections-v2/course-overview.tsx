'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface CourseOverviewProps {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
}

export function CourseOverview({ eyebrow, heading, paragraphs }: CourseOverviewProps) {
  const prefersReducedMotion = useReducedMotion();

  const staggerParent: Variants = prefersReducedMotion
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      };

  const childFade: Variants = prefersReducedMotion
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
    <section className="bg-surface-1 py-12 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1340px] page-px">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col"
        >
          {/* Eyebrow + Heading block (Figma: 441px wide block left-aligned) */}
          <motion.div variants={childFade} className="flex flex-col gap-3 md:gap-4">
            <span className="text-mini font-semibold uppercase text-text-brand tracking-[1.8px]">
              {eyebrow}
            </span>
            <h2 className="text-[26px] md:text-[28px] lg:text-[30px] font-heading font-bold leading-[1.17] text-text-secondary max-w-[640px]">
              {heading}
            </h2>
          </motion.div>

          {/* Paragraphs: full-width below, ~15px body, ~27px line-height */}
          <motion.div
            variants={staggerParent}
            className="mt-5 md:mt-6 flex flex-col gap-3"
          >
            {paragraphs.map((paragraph, idx) => (
              <motion.p
                key={idx}
                variants={childFade}
                className="text-[15px] leading-[27px] text-text-tertiary"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
