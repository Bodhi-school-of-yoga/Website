'use client';

import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/components/ui/carousel';

export type TestimonialItem = {
  avatar?: string;
  quote: string;
  name: string;
  role: string;
};

export type TestimonialsSectionProps = {
  eyebrow: string;
  heading: string;
  items: TestimonialItem[];
};

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || '·';
}

function FeaturedCard({ item }: { item: TestimonialItem }) {
  return (
    <article className="flex h-full flex-col rounded-[24px] bg-brand-primary p-6 lg:p-7">
      <div className="relative h-[110px] w-[110px] lg:h-[130px] lg:w-[130px] shrink-0 overflow-hidden rounded-full bg-mint-soft">
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            sizes="130px"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[42px] font-heading font-bold text-brand-primary">
            {getInitial(item.name)}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-h5 font-heading font-bold text-surface-1">
        {item.name}
      </h3>
      <p className="mt-0.5 text-body-sm text-mint-soft">{item.role}</p>
      <p className="mt-4 text-body-sm leading-[1.55] text-surface-1">
        &ldquo;{item.quote}&rdquo;
      </p>
    </article>
  );
}

function RegularCard({ item }: { item: TestimonialItem }) {
  return (
    <article className="flex h-full flex-col rounded-[24px] border border-border-3 bg-surface-1 p-5">
      <div className="flex items-center gap-3">
        <div className="relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-full bg-mint-soft">
          {item.avatar ? (
            <Image
              src={item.avatar}
              alt={item.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-[20px] font-heading font-bold text-text-brand">
              {getInitial(item.name)}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-subtext-3 font-bold text-text-secondary">
            {item.name}
          </h3>
          <p className="text-xs text-text-brand">{item.role}</p>
        </div>
      </div>
      <p className="mt-3 text-body-sm leading-[1.55] text-text-tertiary">
        &ldquo;{item.quote}&rdquo;
      </p>
    </article>
  );
}

export function TestimonialsSection({
  eyebrow,
  heading,
  items,
}: TestimonialsSectionProps) {
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

  const [featured, ...rest] = items;

  // Group rest into pairs (2 per slide) for the 2-row carousel
  const slides: TestimonialItem[][] = [];
  for (let i = 0; i < rest.length; i += 2) {
    slides.push(rest.slice(i, i + 2));
  }

  return (
    <section className="bg-surface-1 py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1340px] page-px">
        {/* Eyebrow + heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-start gap-1"
        >
          <motion.p
            variants={fadeInUp}
            className="text-mini font-semibold uppercase tracking-[1.8px] text-text-secondary"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-[28px] md:text-[30px] lg:text-[34px] font-heading font-bold leading-[1.04] text-text-secondary"
          >
            {heading}
          </motion.h2>
        </motion.div>

        {/* Featured card + carousel grid */}
        <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-5">
          {/* Featured (green) card — left */}
          {featured && <FeaturedCard item={featured} />}

          {/* Right — 2-row carousel */}
          <Carousel
            opts={{ align: 'start', loop: false, slidesToScroll: 1 }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {slides.map((pair, slideIdx) => (
                <CarouselItem
                  key={slideIdx}
                  className="pl-4 basis-[85%] sm:basis-[70%] md:basis-[50%] shadow"
                >
                  <div className="flex flex-col gap-4 h-full">
                    {pair.map((item, idx) => (
                      <RegularCard
                        key={`${item.name}-${slideIdx}-${idx}`}
                        item={item}
                      />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hidden lg:block">
              <CarouselNext className="static translate-x-0 translate-y-0 h-[46px] w-[46px] rounded-full border border-border-3 bg-surface-1 text-text-secondary shadow-card hover:border-text-brand hover:text-text-brand" />
            </div>
            <div className="mt-4 flex justify-end lg:hidden">
              <CarouselNext className="static translate-x-0 translate-y-0 h-[46px] w-[46px] rounded-full border border-border-3 bg-surface-1 text-text-secondary shadow-card hover:border-text-brand hover:text-text-brand" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
