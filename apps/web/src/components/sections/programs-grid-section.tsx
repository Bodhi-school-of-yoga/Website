// ProgramsGridSection — filterable grid of all Bodhi programs with mode, duration, and pricing metadata.
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Globe, Monitor } from "lucide-react";

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

export type ProgramsGridSectionProps = {
  ttcBlock?: ProgramsBlock;
  certificationBlock?: ProgramsBlock;
  className?: string;
};

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

export function ProgramsGridSection({
  ttcBlock = DEFAULT_TTC,
  certificationBlock = DEFAULT_CERT,
  className,
}: ProgramsGridSectionProps) {
  return (
    <section
      className={cn("w-full bg-surface-1 py-20 sm:py-24 lg:py-28", className)}
    >
      <div className="mx-auto flex max-w-[1340px] flex-col gap-24 page-px lg:gap-28">
        <ProgramsBlockView block={ttcBlock} variant="ttc" />
        <ProgramsBlockView block={certificationBlock} variant="cert" />
      </div>
    </section>
  );
}

function ProgramsBlockView({
  block,
  variant,
}: {
  block: ProgramsBlock;
  variant: "ttc" | "cert";
}) {
  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      <header className="flex flex-col items-center gap-4 text-center">
        <p className="text-mini uppercase text-text-brand">{block.eyebrow}</p>
        <h2 className="font-heading text-h4 sm:text-h3 text-text-secondary">
          {block.heading}
        </h2>
        {block.subhead && (
          <p className="max-w-2xl text-subtext-1 text-text-tertiary">
            {block.subhead}
          </p>
        )}
      </header>

      <ul
        className={cn(
          "grid w-full grid-cols-1 gap-6 sm:grid-cols-2",
          variant === "ttc" ? "lg:grid-cols-3" : "lg:grid-cols-3",
        )}
      >
        {block.cards.map((card) =>
          variant === "ttc" ? (
            <li key={card.slug}>
              <TtcCard card={card} />
            </li>
          ) : (
            <li key={card.slug}>
              <CertCard card={card} />
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

function TtcCard({ card }: { card: ProgramCard }) {
  return (
    <Link
      href={card.href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[20px] bg-surface-1",
        "border border-border-2 shadow-card transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-brand-shade hover:shadow-[0_22px_44px_-12px_rgba(0,152,119,0.18)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
      )}
    >
      <span className="relative block aspect-[16/10] w-full overflow-hidden bg-surface-2">
        <Image
          src={card.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
        <h3 className="text-subtext-3 text-text-secondary">{card.title}</h3>
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
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-body-sm text-text-brand transition-transform duration-300 group-hover:translate-x-0.5">
          View Program
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>
      </div>
    </Link>
  );
}

function CertCard({ card }: { card: ProgramCard }) {
  return (
    <Link
      href={card.href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[24px] bg-surface-cream",
        "border border-border-2 transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-12px_rgba(0,40,44,0.12)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
      )}
    >
      <span className="relative block aspect-[16/11] w-full overflow-hidden bg-surface-2">
        <Image
          src={card.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </span>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-subtext-3 text-text-secondary">{card.title}</h3>

        <div className="flex items-center gap-3 border-y border-sage-divider-soft py-3 text-text-tertiary">
          <span className="inline-flex items-center gap-1.5 text-body-sm">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
            {card.duration}
          </span>
          <span aria-hidden className="text-text-tertiary/50">
            ·
          </span>
          <span className="inline-flex items-center gap-1.5 text-body-sm">
            <Monitor className="h-3.5 w-3.5" strokeWidth={1.75} />
            {card.modality}
          </span>
        </div>

        {card.authorName && (
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary text-mini text-text-inverse">
              {card.authorInitials}
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-mini uppercase text-text-tertiary">
                Instructor
              </span>
              <span className="text-body-sm font-medium text-text-secondary">
                {card.authorName}
              </span>
            </div>
          </div>
        )}

        <span className="mt-auto inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-6 font-sans text-body-sm font-semibold text-text-inverse transition-colors duration-200 hover:bg-brand-primary/90">
          Enrol Now
          <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
        </span>
      </div>
    </Link>
  );
}
