'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowUpRight, Quote } from 'lucide-react';

export type TestimonialItem = {
  avatar: string;
  quote: string;
  name: string;
  role: string;
};

export type TestimonialsSectionProps = {
  eyebrow: string;
  heading: string;
  items: TestimonialItem[];
};

type TestimonialCardProps = {
  item: TestimonialItem;
  itemVariants: Variants;
};

function TestimonialCard({ item, itemVariants }: TestimonialCardProps) {
  return (
    <motion.article
      variants={itemVariants}
      className={[
        'group relative shrink-0',
        'snap-start',
        'w-[85%] sm:w-[60%] md:w-[46%] lg:w-[31%] xl:w-[24%]',
        'rounded-2xl bg-surface-1 border border-border-2',
        'p-5 md:p-6',
        'flex flex-col',
        'transition-transform transition-shadow duration-300 ease-out',
        'motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-card',
      ].join(' ')}
    >
      <div className="relative w-full overflow-hidden rounded-xl aspect-[4/3] bg-mint-frost">
        <Image
          src={item.avatar}
          alt={item.name}
          fill
          sizes="(min-width: 1280px) 320px, (min-width: 768px) 45vw, 85vw"
          className={[
            'object-cover',
            'transition-transform duration-500 ease-out',
            'motion-safe:group-hover:scale-[1.04]',
          ].join(' ')}
        />
        <div
          aria-hidden="true"
          className="absolute top-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-1 text-text-brand shadow-card"
        >
          <Quote className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>

      <p className="mt-5 text-subtext-2 text-text-primary">
        &ldquo;{item.quote}&rdquo;
      </p>

      <div className="mt-6 pt-4 border-t border-border-2">
        <h3 className="text-h5 text-text-primary">{item.name}</h3>
        <p className="mt-1 text-body-sm text-text-tertiary">{item.role}</p>
      </div>
    </motion.article>
  );
}

export function TestimonialsSection({
  eyebrow,
  heading,
  items,
}: TestimonialsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const fadeUp: Variants = prefersReducedMotion
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
          transition: { staggerChildren: 0.08, delayChildren: 0.2 },
        },
      };

  const cardItem: Variants = prefersReducedMotion
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

  const scrollNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>('[data-card]');
    const cardWidth = firstCard?.offsetWidth ?? track.clientWidth * 0.5;
    const gap = 24;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= maxScroll - 4;
    if (atEnd) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    }
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('[data-card]');
    const target = cards[index];
    if (!target) return;
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = track.querySelectorAll<HTMLElement>('[data-card]');
        const trackLeft = track.scrollLeft;
        let nearest = 0;
        let nearestDist = Number.POSITIVE_INFINITY;
        cards.forEach((card, idx) => {
          const dist = Math.abs(card.offsetLeft - track.offsetLeft - trackLeft);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearest = idx;
          }
        });
        setActiveIndex(nearest);
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="bg-surface-cream">
      <div className="page-px py-14 md:py-20 lg:py-24">
        <div className="max-w-[1340px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div className="max-w-[760px]">
              <motion.p
                variants={fadeUp}
                className="text-mini text-text-brand uppercase tracking-[0.18em]"
              >
                {eyebrow}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.1,
                  duration: prefersReducedMotion ? 0 : 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-3 text-h4 md:text-h3 lg:text-h2 text-text-primary"
              >
                {heading}
              </motion.h2>
            </div>

            <motion.button
              type="button"
              onClick={scrollNext}
              variants={fadeUp}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.2,
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-label="Show next testimonial"
              className={[
                'hidden md:inline-flex items-center justify-center',
                'h-12 w-12 lg:h-14 lg:w-14 shrink-0',
                'rounded-full bg-surface-1 border border-border-2 text-text-primary',
                'transition-transform duration-300 ease-out',
                'motion-safe:hover:rotate-45 motion-safe:hover:bg-mint-frost',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand focus-visible:ring-offset-2',
              ].join(' ')}
            >
              <ArrowUpRight className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={1.75} />
            </motion.button>
          </motion.div>

          <motion.div
            ref={trackRef}
            variants={trackContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className={[
              'mt-10 md:mt-12 lg:mt-14',
              'flex gap-4 md:gap-5 lg:gap-6',
              'overflow-x-auto snap-x snap-mandatory',
              'scroll-smooth',
              '-mx-4 px-4 md:-mx-6 md:px-6',
              'pb-4',
              '[scrollbar-width:none] [-ms-overflow-style:none]',
              '[&::-webkit-scrollbar]:hidden',
            ].join(' ')}
          >
            {items.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                data-card
                className="flex shrink-0 snap-start"
              >
                <TestimonialCard item={item} itemVariants={cardItem} />
              </div>
            ))}
          </motion.div>

          <div className="mt-6 flex justify-center gap-2 md:hidden">
            {items.map((item, idx) => (
              <button
                key={`dot-${item.name}-${idx}`}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
                aria-current={activeIndex === idx}
                className={[
                  'h-2 rounded-full transition-all duration-300',
                  activeIndex === idx
                    ? 'w-6 bg-text-brand'
                    : 'w-2 bg-border-3',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
