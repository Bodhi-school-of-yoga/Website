'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface CertificationSectionProps {
  eyebrow: string;
  heading: string;
  body: string;
  footerCaption: string;
}

export function CertificationSection({
  eyebrow,
  heading,
  body,
  footerCaption,
}: CertificationSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUpSlow: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const fadeIn: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const reveal = (delay: number) =>
    prefersReducedMotion ? { duration: 0, delay: 0 } : { delay };

  return (
    <section className="bg-brand-dark">
      <div className="page-px py-10 md:py-12 lg:py-14">
        <div className="mx-auto max-w-[908px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12"
          >
            <div className="flex flex-col gap-3 md:gap-4">
              <motion.p
                variants={fadeInUpSlow}
                transition={reveal(0)}
                className="text-mini uppercase tracking-[0.18em] text-text-mint-shade"
              >
                {eyebrow}
              </motion.p>
              <motion.h2
                variants={fadeInUpSlow}
                transition={reveal(prefersReducedMotion ? 0 : 0.1)}
                className="text-h4 md:text-h3 text-text-inverse"
              >
                {heading}
              </motion.h2>
            </div>

            <div className="flex flex-col gap-4 md:gap-5">
              <motion.p
                variants={fadeInUpSlow}
                transition={reveal(prefersReducedMotion ? 0 : 0.2)}
                className="text-subtext-1 md:text-subtext-2 text-text-inverse/90"
              >
                {body}
              </motion.p>
              <motion.p
                variants={fadeIn}
                transition={reveal(prefersReducedMotion ? 0 : 0.35)}
                className="text-body-sm text-text-mint-shade"
              >
                {footerCaption}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
