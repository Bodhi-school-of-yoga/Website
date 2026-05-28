'use client';

import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface CurriculumItem {
  title: string;
  description: string;
}

export interface CurriculumSectionProps {
  eyebrow: string;
  heading: string;
  items: CurriculumItem[];
  nextHref?: string;
}

export function CurriculumSection({
  eyebrow,
  heading,
  items,
  nextHref = '#right-for-you',
}: CurriculumSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

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

  const trackContainer: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0, staggerChildren: 0 } },
      }
    : {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.2 },
        },
      };

  const handleScrollNext = () => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>('[data-curriculum-card]');
    if (!firstCard) return;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const step = firstCard.offsetWidth + gap;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (atEnd) {
      const target = document.querySelector(nextHref);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      track.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    track.scrollBy({ left: step, behavior: 'smooth' });
  };

  return (
    <section className="bg-surface-1 page-px py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1340px]">
        {/* Eyebrow + heading */}
        <div className="flex flex-col items-start gap-1">
          <motion.span
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-mini font-semibold uppercase tracking-[1.8px] text-text-teal-deep"
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.08 }}
            className="font-heading text-[28px] md:text-[30px] lg:text-[34px] font-bold leading-[1.04] text-text-secondary"
          >
            {heading}
          </motion.h2>
        </div>

        {/* Cards row + arrow */}
        <div className="mt-8 md:mt-10 lg:mt-12 flex items-stretch gap-4 lg:gap-[21px]">
          <motion.div
            ref={trackRef}
            variants={trackContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="-mx-4 flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:snap-none lg:flex lg:gap-[21px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item, idx) => (
              <motion.article
                key={`${item.title}-${idx}`}
                data-curriculum-card
                variants={fadeInUp}
                className="group flex w-[80vw] shrink-0 snap-start flex-col items-start rounded-[19px] border border-border-3 bg-surface-1 px-[19px] py-[17px] shadow-card transition-transform duration-300 motion-safe:hover:-translate-y-0.5 md:w-auto md:shrink lg:h-[148px] lg:w-[294px] lg:shrink-0"
              >
                <div className="flex w-full flex-col gap-[5px] px-[16px] pb-[18px] pt-[13px]">
                  <h3 className="font-heading text-[20px] font-bold leading-[23.1px] text-text-secondary">
                    {item.title}
                  </h3>
                  <p className="text-body-sm leading-[20px] text-text-primary">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Arrow button — desktop end-of-row */}
          <motion.button
            type="button"
            onClick={handleScrollNext}
            aria-label="Scroll curriculum forward"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
            className="hidden lg:inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center self-center rounded-full border border-border-3 bg-surface-1 text-text-secondary shadow-card transition-colors hover:border-text-brand hover:text-text-brand"
          >
            <ArrowUpRight
              className="h-5 w-5 transition-transform duration-300 motion-safe:group-hover:rotate-45"
              aria-hidden="true"
            />
          </motion.button>
        </div>

        {/* Mobile/tablet arrow — below cards, right-aligned */}
        <div className="mt-6 flex justify-end lg:hidden">
          <button
            type="button"
            onClick={handleScrollNext}
            aria-label="Scroll curriculum forward"
            className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border border-border-3 bg-surface-1 text-text-secondary shadow-card transition-colors hover:border-text-brand hover:text-text-brand"
          >
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
