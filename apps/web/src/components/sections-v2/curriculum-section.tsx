'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface CurriculumItem {
  image: string;
  title: string;
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
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      };

  const fadeIn: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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
      }
      return;
    }
    track.scrollBy({ left: step, behavior: 'smooth' });
  };

  return (
    <section className="page-px py-10 md:py-14 lg:py-20">
      <div className="mx-auto max-w-[1340px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="flex flex-col gap-3">
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
              className="text-h4 lg:text-h3 text-text-primary"
            >
              {heading}
            </motion.h2>
          </div>

          <div className="hidden md:block">
            <Link
              href={nextHref}
              onClick={(event) => {
                event.preventDefault();
                handleScrollNext();
              }}
              aria-label="Scroll curriculum forward"
              className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-2 bg-surface-1 text-text-brand transition-colors hover:border-text-brand"
            >
              <ArrowUpRight
                className="h-5 w-5 transition-transform duration-300 motion-safe:group-hover:rotate-45"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.25 }}
          className="mt-8 md:mt-10 lg:mt-12"
        >
          <div
            ref={trackRef}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:-mx-6 md:gap-5 md:px-6 lg:mx-0 lg:gap-6 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item, idx) => (
              <article
                key={`${item.title}-${idx}`}
                data-curriculum-card
                className="group flex shrink-0 snap-start flex-col gap-3 rounded-2xl border border-border-2 bg-surface-1 p-3 transition-transform duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-card w-[80vw] md:w-[50vw] lg:w-[294px]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-mint-frost">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1280px) 50vw, 294px"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="text-subtext-1 text-text-primary px-1 pb-1">{item.title}</h3>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
