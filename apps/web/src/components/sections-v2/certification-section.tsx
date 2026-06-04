'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface CertificationSectionProps {
  eyebrow: string;
  heading: string;
  panelHeading?: string;
  body: string;
  /** Optional secondary caption rendered below the dark panel. */
  footerCaption?: string;
}

export function CertificationSection({
  eyebrow,
  heading,
  panelHeading = 'Globally Recognised',
  body,
  footerCaption,
}: CertificationSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUpSlow: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  return (
    <section className="bg-surface-1">
      <div className="py-12 sm:py-16 md:py-20 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="mx-auto flex max-w-[1200px] flex-col gap-[26px] page-px"
        >
          {/* Eyebrow + heading block — left aligned on desktop, centered on mobile */}
          <div className="flex flex-col gap-[5px] text-center md:text-left">
            <motion.p
              variants={fadeInUpSlow}
              className="text-mini font-semibold uppercase tracking-[1.8px] text-text-teal-deep"
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              variants={fadeInUpSlow}
              className="text-[clamp(1.5rem,3.5vw+0.25rem,3.25rem)] font-heading font-bold leading-[1.2] text-text-secondary"
            >
              {heading}
            </motion.h2>
          </div>

          {/* Dark green panel */}
          <motion.div
            variants={fadeInUpSlow}
            className="rounded-[16px] sm:rounded-[20px] bg-brand-green-darkest px-5 py-6 sm:px-6 sm:py-8 md:px-[40px] md:pt-[31px] md:pb-[36px]"
          >
            <div className="flex flex-col gap-[9px] text-center md:text-left">
              <h3 className="text-[24px] md:text-[28px] font-heading font-bold leading-[1.26] text-text-inverse">
                {panelHeading}
              </h3>
              <p className="text-body-sm md:text-[14px] leading-[1.7] text-text-inverse/80">
                {body}
              </p>
            </div>
          </motion.div>

          {footerCaption ? (
            <motion.p
              variants={fadeInUpSlow}
              className="text-body-sm text-text-tertiary text-center md:text-left"
            >
              {footerCaption}
            </motion.p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
