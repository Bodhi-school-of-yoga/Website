"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface VideoTestimonial {
  id: string;
  videoId: string;
  name?: string;
}

export interface VideoTestimonialsSectionProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  testimonials: VideoTestimonial[];
  /** How many cards to show before the "Show More" overlay */
  initialVisible?: number;
  /** Auto-advance the carousel; pauses on hover, stops once a video plays */
  autoScroll?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Animation                                                          */
/* ------------------------------------------------------------------ */

const HOUSE_EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px" } as const;

/* ------------------------------------------------------------------ */
/*  Stars                                                              */
/* ------------------------------------------------------------------ */

function Stars() {
  return (
    <span className="flex gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="#facc15">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Sound icon                                                         */
/* ------------------------------------------------------------------ */

function SoundIcon() {
  return (
    <span className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Single video card                                                  */
/* ------------------------------------------------------------------ */

function VideoCard({
  testimonial,
  className,
  onPlay,
}: {
  testimonial: VideoTestimonial;
  className?: string;
  onPlay?: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const handlePlay = useCallback(() => {
    setPlaying(true);
    onPlay?.();
  }, [onPlay]);

  const thumbnailUrl = `https://img.youtube.com/vi/${testimonial.videoId}/0.jpg`;

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-[1.25rem] bg-neutral-100",
        "shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] will-change-transform",
        "transition-[transform,box-shadow] duration-300 ease-out",
        "hover:-translate-y-2 hover:shadow-[0_18px_48px_-12px_rgba(0,0,0,0.22)]",
        className,
      )}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={testimonial.name ?? "Video testimonial"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play video${testimonial.name ? ` from ${testimonial.name}` : ""}`}
            className="absolute inset-0 h-full w-full cursor-pointer"
          >
            <img
              src={thumbnailUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            <SoundIcon />
            <span className="absolute inset-0 flex items-center justify-center">
              <span
                className={cn(
                  "flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full",
                  "bg-white/85 shadow-2xl backdrop-blur-md",
                  "transition-all duration-300 group-hover:scale-110 group-hover:bg-white/95",
                )}
              >
                <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 text-neutral-900">
                  <path
                    d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.31-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </span>
            <span className="absolute bottom-4 left-4">
              <Stars />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Carousel row (visible row of cards)                                */
/* ------------------------------------------------------------------ */

function VideoCarouselRow({
  items,
  autoScroll = false,
}: {
  items: VideoTestimonial[];
  autoScroll?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  // Only loop/auto-advance when there are enough cards to actually overflow.
  const enabled = autoScroll && !prefersReducedMotion && items.length > 3;

  // Stable plugin instance — pauses on hover, keeps playing after arrow clicks.
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  // Once a visitor plays a video, stop auto-advancing so it never scrolls away.
  const handlePlay = useCallback(() => autoplay.stop(), [autoplay]);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: enabled || items.length > 3,
        slidesToScroll: 1,
      }}
      plugins={enabled ? [autoplay] : []}
      className="w-full"
    >
      <CarouselContent className="-ml-4 py-2 lg:-ml-6">
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-[78%] pl-4 sm:basis-[48%] md:basis-[38%] lg:basis-1/3 lg:pl-6"
          >
            <VideoCard testimonial={item} onPlay={handlePlay} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Nav arrows — larger, high-contrast, overlaid just inside the edges so
          they're always visible (never clipped off-screen). */}
      <CarouselPrevious className="left-2 z-20 h-11 w-11 border-neutral-200 bg-white text-neutral-900 shadow-[0_6px_22px_-4px_rgba(0,0,0,0.28)] hover:bg-white hover:text-neutral-900 disabled:opacity-0 [&_svg]:!size-5 lg:left-3 lg:h-12 lg:w-12" />
      <CarouselNext className="right-2 z-20 h-11 w-11 border-neutral-200 bg-white text-neutral-900 shadow-[0_6px_22px_-4px_rgba(0,0,0,0.28)] hover:bg-white hover:text-neutral-900 disabled:opacity-0 [&_svg]:!size-5 lg:right-3 lg:h-12 lg:w-12" />
    </Carousel>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export function VideoTestimonialsSection({
  eyebrow = "Testimonials",
  heading = "What our students say",
  description,
  testimonials,
  initialVisible = 3,
  autoScroll = true,
  className,
}: VideoTestimonialsSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const slide = prefersReducedMotion ? 0 : 20;
  const slideSoft = prefersReducedMotion ? 0 : 12;
  const dur = prefersReducedMotion ? 0 : 0.55;

  // With auto-scroll, everything lives in one continuous scroller — the
  // "Show More" overlay (and its second stacked row) only applies to the
  // static layout.
  const hasMore = !autoScroll && testimonials.length > initialVisible;
  const visibleItems =
    autoScroll || expanded
      ? testimonials
      : testimonials.slice(0, initialVisible);

  const headerWrap: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: slideSoft },
    visible: { opacity: 1, y: 0, transition: { duration: dur, ease: HOUSE_EASE } },
  };
  const headingV: Variants = {
    hidden: { opacity: 0, y: slide },
    visible: { opacity: 1, y: 0, transition: { duration: dur, ease: HOUSE_EASE } },
  };

  return (
    <section className={cn("w-full bg-[#FCFCFC] py-12 sm:py-16 md:py-20 lg:py-28", className)}>
      <div className="mx-auto max-w-[1200px] page-px">
        {/* Header */}
        <motion.header
          className="mx-auto mb-8 sm:mb-12 lg:mb-16 max-w-2xl text-center"
          variants={headerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {eyebrow && (
            <motion.p variants={fadeUp} className="text-mini uppercase text-text-brand">
              {eyebrow}
            </motion.p>
          )}
          {heading && (
            <motion.h2
              variants={headingV}
              className="mt-3 font-heading text-[clamp(1.375rem,3.5vw+0.25rem,3.25rem)] leading-[1.2] text-text-secondary"
            >
              {heading}
            </motion.h2>
          )}
          {description && (
            <motion.p variants={fadeUp} className="mt-3 text-subtext-1 text-text-secondary">
              {description}
            </motion.p>
          )}
        </motion.header>

        {/* Carousel + show-more wrapper */}
        <div className="relative">
          <VideoCarouselRow items={visibleItems} autoScroll={autoScroll} />

          {/* Reveal extra cards */}
          <AnimatePresence>
            {!autoScroll && expanded && testimonials.length > initialVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: HOUSE_EASE }}
                className="mt-6 overflow-hidden"
              >
                <VideoCarouselRow items={testimonials.slice(initialVisible)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blur gradient + Show More */}
          {hasMore && !expanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center">
              <div className="h-48 w-full bg-gradient-to-t from-[#FCFCFC] via-[#FCFCFC]/85 to-transparent" />
              <div className="pointer-events-auto -mt-8 pb-2">
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className={cn(
                    "rounded-full border border-neutral-200 bg-white px-9 py-3.5",
                    "text-sm font-semibold text-neutral-800",
                    "shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)]",
                    "transition-all duration-200",
                    "hover:border-neutral-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)]",
                    "active:scale-[0.97]",
                  )}
                >
                  Show More
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
