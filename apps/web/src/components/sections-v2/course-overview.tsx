'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface CourseOverviewProps {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
}

export function CourseOverview({ eyebrow, heading, paragraphs }: CourseOverviewProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      };

  const staggerParent: Variants = prefersReducedMotion
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
      };

  const childFade: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      };

  return (
    <section className="page-px py-10 md:py-14 lg:py-20">
      <div className="mx-auto max-w-[1340px]">
        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-4"
          >
            <span className="text-mini uppercase text-text-brand">{eyebrow}</span>
            <h2 className="text-h4 lg:text-h2 text-text-primary">{heading}</h2>
          </motion.div>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-5"
          >
            {paragraphs.map((paragraph, idx) => (
              <motion.p
                key={idx}
                variants={childFade}
                className="text-subtext-2 text-text-tertiary"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
