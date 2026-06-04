'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
}: CurriculumSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="bg-surface-1 py-12 sm:py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] page-px">
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
            className="font-heading text-[clamp(1.5rem,3.5vw+0.25rem,3.25rem)] font-bold leading-[1.2] text-text-secondary"
          >
            {heading}
          </motion.h2>
        </div>

        {/* Carousel */}
        <div className="mt-8 md:mt-10 lg:mt-12">
          <Carousel
            opts={{
              align: 'start',
              loop: false,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {items.map((item, idx) => (
                <CarouselItem
                  key={`${item.title}-${idx}`}
                  className="pl-4 basis-[80%] sm:basis-[45%] md:basis-[35%] lg:basis-[25%]"
                >
                  <article className="flex h-full flex-col items-start rounded-[19px] border border-border-3 bg-surface-1 shadow-card transition-transform duration-300 motion-safe:hover:-translate-y-0.5">
                    <div className="flex w-full flex-col gap-[5px] px-[20px] pb-[18px] pt-[16px]">
                      <h3 className="font-heading text-[20px] font-bold leading-[23.1px] text-text-secondary">
                        {item.title}
                      </h3>
                      <p className="text-body-sm leading-[20px] text-text-primary">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex items-center justify-end gap-2">
              <CarouselPrevious className="static translate-x-0 translate-y-0 h-[46px] w-[46px] rounded-full border border-border-3 bg-surface-1 text-text-secondary shadow-card hover:border-text-brand hover:text-text-brand" />
              <CarouselNext className="static translate-x-0 translate-y-0 h-[46px] w-[46px] rounded-full border border-border-3 bg-surface-1 text-text-secondary shadow-card hover:border-text-brand hover:text-text-brand" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
