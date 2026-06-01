"use client";

// ProgramsGridSection — filterable grid of all Bodhi programs with mode, duration, and pricing metadata.
import * as React from "react";
import { Clock, Globe, Monitor } from "lucide-react";

import { cn } from "@/lib/utils";
import { ProgramCard as UiProgramCard } from "@/components/ui/program-card";
import { COURSES, getDiscountLabel, getDisplayPrice, type Course } from "@/data/courses-catalog";

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
  price?: string;
  originalPrice?: string;
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

function toCard(course: Course): ProgramCard {
  return {
    slug: course.slug,
    title: course.title,
    duration: course.durationLabel,
    modality: course.mode,
    language: "English",
    thumbnail: course.listingImage,
    href: `/courses/${course.slug}`,
    authorName: course.instructor.name,
    authorInitials: course.instructor.initials,
    price: getDisplayPrice(course),
    originalPrice: course.originalPrice,
  };
}

// Same training (e.g. 300-Hour YTT) is offered in both online and studio modes
// — listing both here on the home page produces visual duplicates. Prefer the
// online variant by default; users can switch to the studio listing from nav.
function dedupeByTitle(courses: Course[]): Course[] {
  const seen = new Set<string>();
  return courses.filter((c) => {
    if (seen.has(c.title)) return false;
    seen.add(c.title);
    return true;
  });
}

const DEFAULT_TTC: ProgramsBlock = {
  eyebrow: "Yoga Teacher Training",
  heading: "Yoga Teacher Training Courses",
  subhead:
    "Accredited teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga.",
  cards: dedupeByTitle(
    COURSES.filter((c) => c.category === "teacher" || c.category === "advanced"),
  ).map(toCard),
};

const DEFAULT_CERT: ProgramsBlock = {
  eyebrow: "Regular Yoga Classes",
  heading: "Regular Yoga Courses",
  subhead:
    "Live weekday yoga classes — daily practice, mindful weight-loss, and advanced asana. No weekend classes.",
  cards: dedupeByTitle(COURSES.filter((c) => c.category === "yoga")).map(toCard),
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
      <div className="mx-auto flex max-w-[1200px] flex-col gap-24 page-px lg:gap-28">
        <ProgramsBlockView block={ttcBlock} variant="ttc" />
        <ProgramsBlockView block={certificationBlock} variant="cert" />
      </div>
    </section>
  );
}

const INITIAL_VISIBLE = 3;

function ProgramsBlockView({
  block,
  variant,
}: {
  block: ProgramsBlock;
  variant: "ttc" | "cert";
}) {
  const [showAll, setShowAll] = React.useState(false);
  const hasMore = block.cards.length > INITIAL_VISIBLE;
  const visibleCards = showAll ? block.cards : block.cards.slice(0, INITIAL_VISIBLE);

  return (
    <div className="flex flex-col items-center gap-10 lg:gap-12">
      <header className="flex flex-col items-center gap-4 text-center">
        <p className="text-mini uppercase text-text-brand">{block.eyebrow}</p>
        <h2 className="font-heading text-h4 sm:text-h2 text-text-secondary">
          {block.heading}
        </h2>
      </header>

      <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCards.map((card, idx) => (
          <li key={card.slug}>
            <ProgramListingCard card={card} variant={variant} featured={idx === 0} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className={cn(
            "inline-flex items-center justify-center rounded-full border border-brand-primary",
            "px-12 py-3 text-body-sm font-semibold text-brand-primary",
            "transition-colors duration-200 hover:bg-brand-primary hover:text-text-inverse",
          )}
        >
          {showAll ? "Show Less" : "More Courses"}
        </button>
      )}
    </div>
  );
}

function ProgramListingCard({
  card,
  variant,
  featured,
}: {
  card: ProgramCard;
  variant: "ttc" | "cert";
  featured: boolean;
}) {
  const isOnline = card.modality === "online";

  const formatChip = isOnline
    ? {
        icon: <Monitor className="h-3 w-3" strokeWidth={1.75} />,
        label: "Online",
      }
    : {
        icon: <Monitor className="h-3 w-3" strokeWidth={1.75} />,
        label: "Studio",
      };

  // Pricing comes straight from the catalog — no invented fallbacks. A card
  // with no price (or tiered "From …") shows exactly what the catalog says.
  const pricing = {
    price: card.price,
    originalPrice: card.originalPrice,
    discountLabel: getDiscountLabel(card),
  };

  return (
    <UiProgramCard
      title={card.title}
      href={card.href}
      imageSrc={card.thumbnail}
      imageAlt={card.title}
      meta={[
        {
          icon: <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />,
          label: card.duration,
        },
        formatChip,
        {
          icon: <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />,
          label: card.language ?? "English",
        },
      ]}
      cta="View Program"
      rating={5}
      reviewCount={30}
      centersLabel={isOnline ? undefined : "4 Centers"}
      featured={featured}
      {...pricing}
    />
  );
}
