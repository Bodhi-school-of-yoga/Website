'use client';

import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface CourseEligibilitySectionProps {
  eyebrow?: string;
  heading: string;
  checklist: string[];
  sideImage: string;
  imageAlt: string;
}

interface ChecklistItemProps {
  label: string;
  variants: Variants;
}

function CheckBadge() {
  return (
    <span
      aria-hidden="true"
      className="flex size-[22px] shrink-0 items-center justify-center rounded-[11px] border border-brand-shade bg-brand-primary"
    >
      <svg
        viewBox="0 0 12 12"
        className="h-[10px] w-[10px] text-surface-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="2,6.5 5,9 10,3.5" />
      </svg>
    </span>
  );
}

function ChecklistItem({ label, variants }: ChecklistItemProps) {
  return (
    <motion.li
      variants={variants}
      className="flex w-full items-center gap-[12px] rounded-[8px] border border-border-3 bg-surface-1 px-[16px] py-[12px] md:h-[48px] md:py-0"
    >
      <CheckBadge />
      <span className="text-body-sm text-text-secondary">{label}</span>
    </motion.li>
  );
}

export function CourseEligibilitySection({
  eyebrow,
  heading,
  checklist,
  sideImage,
  imageAlt,
}: CourseEligibilitySectionProps) {
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
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const scaleIn: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, scale: 0.96 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
        },
      };

  return (
    <section className="bg-brand-lite py-[64px] md:py-[80px] lg:py-[85px]">
      <div className="mx-auto max-w-[1200px] page-px">
        <div className="flex w-full flex-col items-stretch gap-[40px] md:gap-[56px] lg:flex-row lg:items-center lg:justify-between lg:gap-[71px]">
          {/* Left: eyebrow + heading + checklist */}
          <div className="flex flex-col lg:min-w-0 lg:flex-1">
            {eyebrow ? (
              <motion.span
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="text-mini font-semibold uppercase tracking-[1.8px] text-text-teal-deep"
              >
                {eyebrow}
              </motion.span>
            ) : null}

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-[16px] font-heading font-bold leading-[1.04] text-text-secondary text-[28px] md:text-[32px] lg:text-[34px]"
            >
              {heading}
            </motion.h2>

            <motion.ul
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mt-[32px] flex w-full flex-col gap-[12px] lg:mt-[41px]"
            >
              {checklist.map((item, idx) => (
                <ChecklistItem key={idx} label={item} variants={childFade} />
              ))}
            </motion.ul>
          </div>

          {/* Right: single image */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative aspect-[574/543] w-full overflow-hidden rounded-[21px] md:max-w-[640px] md:self-center lg:aspect-auto lg:h-[543px] lg:w-[574px] lg:shrink-0 lg:max-w-none"
          >
            <Image
              src={sideImage}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 574px, (min-width: 768px) 640px, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
