"use client";

// ProgramsGridSection — dark full-bleed band with 2 stacked program rails
// (Yoga Teacher Training Courses + Regular yoga Courses). Each rail header is
// a flex row: eyebrow + title on the left, "More Courses" link on the right.
// Cards animate in via a parent stagger when the rail scrolls into view.
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Globe, Monitor } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export type ProgramCard = {
  slug: string;
  title: string;
  duration: string;
  modality: "online" | "studio";
  language?: string;
  thumbnail: string;
  href: string;
  authorName?: string;
  authorInitials?: string;
};

export type ProgramsBlock = {
  eyebrow: string;
  heading: string;
  subhead?: string;
  cards: ProgramCard[];
};

// New rail shape used by the Figma home-page band.
export type Rail = {
  eyebrow: string;
  title: string;
  moreLabel: string;
  moreHref: string;
  cards: ProgramCard[];
};

export type ProgramsGridSectionProps = {
  /** Preferred new API: 2 rails (TTC + Regular). When omitted, defaults derive from DEFAULT_TTC / DEFAULT_CERT trimmed to first 3 cards each. */
  rails?: Rail[];
  /** Legacy: full TTC block. Kept for backwards compatibility with non-home consumers. */
  ttcBlock?: ProgramsBlock;
  /** Legacy: certification block. Kept for backwards compatibility with non-home consumers. */
  certificationBlock?: ProgramsBlock;
  className?: string;
};

// PRESERVED: existing card data with real hrefs. Do not delete entries; only the
// first 3 are rendered per rail on the home page, but the full arrays may be
// used by other consumers / future filters.
const DEFAULT_TTC: ProgramsBlock = {
  eyebrow: "Yoga Teacher Training",
  heading: "Yoga Teacher Training Courses",
  subhead:
    "Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga.",
  cards: [
    {
      slug: "pranayama-nervous-system",
      title: "Pranayama & the nervous system",
      duration: "4 weeks",
      modality: "online",
      language: "English",
      thumbnail: "/images/programs/pranayama-nervous-system.jpg",
      href: "/programs/pranayama-nervous-system",
    },
    {
      slug: "300-hour-ttc-online",
      title: "300 Hour Yoga Teacher Training — Online",
      duration: "4 weeks",
      modality: "online",
      language: "English",
      thumbnail: "/images/programs/300-hour-yoga-teacher-training-online.jpg",
      href: "/programs/300-hour-yoga-teacher-training-online",
    },
    {
      slug: "face-yoga-ttc",
      title: "Face Yoga Teacher Training Course",
      duration: "4 weeks",
      modality: "online",
      language: "English",
      thumbnail: "/images/programs/face-yoga-teacher-training.jpg",
      href: "/programs/face-yoga-teacher-training",
    },
    {
      slug: "weight-loss-coach-ttc",
      title: "Weight Loss Coach Teacher Training Course",
      duration: "4 weeks",
      modality: "online",
      language: "English",
      thumbnail: "/images/programs/weight-loss-coach-teacher-training.jpg",
      href: "/programs/weight-loss-coach-teacher-training",
    },
    {
      slug: "bala-yoga-ttc",
      title: "Bala Yoga Teacher Training Course",
      duration: "4 weeks",
      modality: "studio",
      language: "English",
      thumbnail: "/images/programs/bala-yoga-teacher-training.jpg",
      href: "/programs/bala-yoga-teacher-training",
    },
    {
      slug: "mat-pilates-ttc",
      title: "Mat Pilates Teacher Training Course",
      duration: "4 weeks",
      modality: "studio",
      language: "English",
      thumbnail: "/images/programs/mat-pilates-teacher-training.jpg",
      href: "/programs/mat-pilates-teacher-training",
    },
  ],
};

const DEFAULT_CERT: ProgramsBlock = {
  eyebrow: "Top Popular Yoga Course",
  heading: "Certification Yoga Courses",
  subhead:
    "Deepen your wisdom and elevate your yoga career with our specialized yoga certifications.",
  cards: [
    {
      slug: "weight-loss-coach-cert",
      title: "Online Weight Loss Coach Certification",
      duration: "4 weeks",
      modality: "online",
      language: "English",
      thumbnail: "/images/programs/pranayama-nervous-system.jpg",
      href: "/programs/certifications/weight-loss-coach",
      authorName: "Janardhan Durga Prasad",
      authorInitials: "JD",
    },
    {
      slug: "mudra-therapy-cert",
      title: "Online Mudra Therapy Yoga Teacher Training",
      duration: "2 weeks",
      modality: "online",
      language: "English",
      thumbnail: "/images/programs/face-yoga-teacher-training.jpg",
      href: "/programs/certifications/mudra-therapy",
      authorName: "Prarthana Patel",
      authorInitials: "PP",
    },
    {
      slug: "mat-pilates-cert",
      title: "Online MAT Pilates Instructor Certification",
      duration: "4 weeks",
      modality: "online",
      language: "English",
      thumbnail: "/images/programs/weight-loss-coach-teacher-training.jpg",
      href: "/programs/certifications/mat-pilates-instructor",
      authorName: "Lakshmi Yalamudi",
      authorInitials: "LY",
    },
  ],
};

// Default 2-rail set for the Figma home-page band. Card hrefs preserved from
// DEFAULT_TTC / DEFAULT_CERT (first 3 each). Rail-1 eyebrow is "Teacher Training"
// verbatim per Figma — flagged as a likely copy bug for product review.
const DEFAULT_RAILS: Rail[] = [
  {
    eyebrow: "Teacher Training",
    title: "Yoga Teacher Training Courses",
    moreLabel: "More Courses",
    moreHref: "/teacher-courses",
    cards: DEFAULT_TTC.cards.slice(0, 3),
  },
  {
    eyebrow: "Teacher Training",
    title: "Regular yoga Courses",
    moreLabel: "More Courses",
    moreHref: "/yoga-courses",
    cards: DEFAULT_CERT.cards.slice(0, 3),
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProgramsGridSection({
  rails,
  ttcBlock,
  certificationBlock,
  className,
}: ProgramsGridSectionProps) {
  // Resolve rails: explicit prop > legacy block props (mapped) > defaults.
  const resolvedRails: Rail[] = React.useMemo(() => {
    if (rails && rails.length > 0) return rails;
    if (ttcBlock || certificationBlock) {
      const out: Rail[] = [];
      if (ttcBlock) {
        out.push({
          eyebrow: ttcBlock.eyebrow,
          title: ttcBlock.heading,
          moreLabel: "More Courses",
          moreHref: "/teacher-courses",
          cards: ttcBlock.cards.slice(0, 3),
        });
      }
      if (certificationBlock) {
        out.push({
          eyebrow: certificationBlock.eyebrow,
          title: certificationBlock.heading,
          moreLabel: "More Courses",
          moreHref: "/yoga-courses",
          cards: certificationBlock.cards.slice(0, 3),
        });
      }
      return out;
    }
    return DEFAULT_RAILS;
  }, [rails, ttcBlock, certificationBlock]);

  return (
    <section
      className={cn(
        "relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-brand-dark py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1340px] flex-col gap-20 page-px lg:gap-24">
        {resolvedRails.map((rail, idx) => (
          <RailView key={`${rail.title}-${idx}`} rail={rail} />
        ))}
      </div>
    </section>
  );
}

function RailView({ rail }: { rail: Rail }) {
  const prefersReducedMotion = useReducedMotion();

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: EASE },
    },
  };

  const rowVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: EASE },
    },
  };

  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      <motion.header
        className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        variants={headerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
      >
        <div className="flex flex-col gap-3">
          <p className="text-mini uppercase tracking-wider text-brand-shade">
            {rail.eyebrow}
          </p>
          <h2 className="font-heading text-h4 sm:text-h3 text-text-inverse">
            {rail.title}
          </h2>
        </div>

        <Link
          href={rail.moreHref}
          className={cn(
            "group inline-flex items-center gap-2 text-body-sm text-brand-shade",
            "relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full",
          )}
        >
          {rail.moreLabel}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2.25}
          />
        </Link>
      </motion.header>

      <motion.ul
        className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        variants={rowVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
      >
        {rail.cards.slice(0, 3).map((card) => (
          <motion.li key={card.slug} variants={cardVariants}>
            <DarkProgramCard card={card} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

// Inline card kept until T5 ProgramCard primitive lands. Mirrors the previous
// TtcCard markup but uses bg-surface-cream against the dark band.
function DarkProgramCard({ card }: { card: ProgramCard }) {
  return (
    <Link
      href={card.href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[20px] bg-surface-cream",
        "border border-border-2 shadow-card transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-12px_rgba(0,0,0,0.5)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
      )}
    >
      <span className="relative block aspect-[16/10] w-full overflow-hidden bg-surface-2">
        <Image
          src={card.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-brand-primary/95 px-3 py-1 text-mini uppercase text-text-inverse">
          {card.modality === "online" ? (
            <Monitor className="h-3 w-3" strokeWidth={2.25} />
          ) : (
            <Globe className="h-3 w-3" strokeWidth={2.25} />
          )}
          {card.modality}
        </span>
      </span>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-subtext-3 text-text-primary">{card.title}</h3>
        <div className="flex flex-wrap items-center gap-3 text-text-tertiary">
          <span className="inline-flex items-center gap-1.5 text-body-sm">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
            {card.duration}
          </span>
          {card.language && (
            <>
              <span aria-hidden className="text-text-tertiary/50">
                ·
              </span>
              <span className="text-body-sm">{card.language}</span>
            </>
          )}
        </div>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-body-sm text-text-brand transition-transform duration-200 group-hover:translate-x-0.5">
          View Program
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>
      </div>
    </Link>
  );
}
