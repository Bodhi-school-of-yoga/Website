// PoseCard — a single yoga-pose tile for the listing grid.
//
// When the pose has no photo (the default for the archived library), the card
// renders an on-brand typographic panel built from the Sanskrit name so the
// grid stays visually rich without external images.
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type PoseCardProps = {
  href: string;
  name: string;
  sanskrit: string;
  categoryLabel: string;
  difficulty: string;
  image?: string | null;
  imageAlt?: string;
  className?: string;
};

// Per-category accent gradient for the photo-less panel, drawn from the Bodhi
// brand palette (globals.css). Falls back to the primary brand gradient.
const CATEGORY_ACCENT: Record<string, string> = {
  "standing-yoga-pose":
    "bg-[linear-gradient(135deg,var(--color-brand-primary)_0%,var(--color-brand-green-deep)_100%)]",
  "supine-yoga-pose":
    "bg-[linear-gradient(135deg,var(--color-brand-teal)_0%,var(--color-brand-teal-deep)_100%)]",
  "balancing-yoga-pose":
    "bg-[linear-gradient(135deg,var(--color-brand-mid)_0%,var(--color-brand-green-darkest)_100%)]",
};

export function PoseCard({
  href,
  name,
  sanskrit,
  categoryLabel,
  difficulty,
  image,
  imageAlt,
  categorySlug,
  className,
}: PoseCardProps & { categorySlug: string }) {
  const accent =
    CATEGORY_ACCENT[categorySlug] ??
    "bg-[linear-gradient(135deg,var(--color-brand-primary)_0%,var(--color-brand-dark)_100%)]";

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[22px]",
        "border border-black/[0.08] bg-surface-1",
        "shadow-[0_4px_8.2px_0_rgba(226,226,226,0.25)]",
        "transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_0_rgba(0,40,44,0.12)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {image ? (
          <Image
            src={`/images/yoga-poses/${image}`}
            alt={imageAlt ?? name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center px-6 text-center",
              accent,
            )}
          >
            <span
              aria-hidden="true"
              className="font-heading text-[1.75rem] leading-tight text-text-inverse/95 sm:text-[2rem]"
            >
              {sanskrit}
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-surface-1/90 px-3 py-1 text-mini uppercase tracking-widest text-text-brand backdrop-blur">
          {difficulty}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-6 py-6">
        <p className="text-mini uppercase tracking-widest text-text-tertiary">
          {categoryLabel}
        </p>
        <h3 className="font-heading text-h5 text-text-primary">{name}</h3>
        <p className="text-body-sm italic text-text-tertiary">{sanskrit}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-body-sm font-semibold text-text-brand">
          View pose
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
