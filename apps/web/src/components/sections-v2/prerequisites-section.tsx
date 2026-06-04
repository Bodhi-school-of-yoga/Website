'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface PrerequisitesSectionProps {
  eyebrow: string;
  heading: string;
  checklist: string[];
  /** Legacy prop kept for backwards-compatibility with existing demo pages. Unused in this layout. */
  sideImage?: string;
  /** Legacy prop kept for backwards-compatibility with existing demo pages. Unused in this layout. */
  imageAlt?: string;
}

interface ChecklistItemProps {
  label: string;
  variants: Variants;
}

function ChecklistItem({ label, variants }: ChecklistItemProps) {
  return (
    <motion.li
      variants={variants}
      className="flex w-full items-center gap-[12px] rounded-[14px] border border-border-2 bg-surface-1 px-[17px] py-[14px] backdrop-blur-[29.45px]"
    >
      <span
        aria-hidden="true"
        className="flex size-[22px] shrink-0 items-center justify-center rounded-[11px] border border-brand-shade bg-brand-primary text-[11px] font-bold leading-none text-white"
      >
        ✓
      </span>
      <span className="text-body-sm leading-[23.1px] text-text-secondary">
        {label}
      </span>
    </motion.li>
  );
}

export function PrerequisitesSection({
  eyebrow,
  heading,
  checklist,
}: PrerequisitesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp: Variants = prefersReducedMotion
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

  const headingFadeInUp: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
        },
      };

  const staggerParent: Variants = prefersReducedMotion
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.16 } },
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
    <section className="bg-brand-lite page-px py-12 sm:py-14 md:py-16 lg:py-[52px]">
      <div className="mx-auto flex w-full max-w-[674px] flex-col items-center gap-6 sm:gap-8 lg:gap-[33px]">
        <div className="flex flex-col items-center gap-[19px]">
          <motion.span
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-mini font-semibold uppercase tracking-[1.8px] text-text-brand"
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            variants={headingFadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-center font-heading text-[clamp(1.5rem,3.5vw+0.25rem,3.25rem)] font-bold leading-[1.2] text-text-secondary"
          >
            {heading}
          </motion.h2>
        </div>

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex w-full flex-col gap-[10px]"
        >
          {checklist.map((item, idx) => (
            <ChecklistItem key={idx} label={item} variants={childFade} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
