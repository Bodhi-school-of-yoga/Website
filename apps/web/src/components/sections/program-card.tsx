// ProgramCard — reusable card used by ProgramsGridSection on the dark band.
// Image top, mode pill + meta row + title + "View Program" link below.
// Hover: lifts -2px, dark shadow, image scales to 1.03. Entrance animation
// is owned by the parent stagger (not handled here).

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type ProgramCardMode = "Online" | "Offline" | "Hybrid";

export type ProgramCardImage = {
  src: string;
  alt: string;
};

export type ProgramCardCta = {
  label: string;
  href: string;
};

export type ProgramCardProps = {
  image: ProgramCardImage;
  title: string;
  duration: string;
  mode: ProgramCardMode;
  language: string;
  cta: ProgramCardCta;
  modeBadge?: boolean;
  className?: string;
};

export function ProgramCard({
  image,
  title,
  duration,
  mode,
  language,
  cta,
  modeBadge = true,
  className,
}: ProgramCardProps) {
  return (
    <article
      className={cn(
        // Light card surface against the brand-dark band.
        "group flex h-full flex-col overflow-hidden rounded-2xl bg-surface-cream",
        "border border-border-2 shadow-card",
        // Hover lift + dark-shadow variant (rgba is shadow-color spec; flagged exception).
        "transition-all duration-300 ease-out hover:-translate-y-0.5",
        "hover:shadow-[0_10px_28px_-12px_rgba(0,0,0,0.5)]",
        "motion-reduce:transition-none motion-reduce:hover:transform-none",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-surface-2",
          // Soft image zoom on group hover.
          "[&_img]:transition-transform [&_img]:duration-[600ms] [&_img]:ease-out",
          "group-hover:[&_img]:scale-[1.03]",
          "motion-reduce:[&_img]:transition-none motion-reduce:group-hover:[&_img]:scale-100",
        )}
        style={{ aspectRatio: "3 / 2" }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {modeBadge && (
          <span
            className={cn(
              "absolute left-3 top-3 z-10 inline-flex items-center",
              "rounded-full bg-surface-1 px-3 py-1",
              "text-mini uppercase text-text-primary",
            )}
          >
            {mode}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-mini text-text-tertiary">
          <span>{duration}</span>
          <span aria-hidden className="px-1.5">
            ·
          </span>
          <span>{mode}</span>
          <span aria-hidden className="px-1.5">
            ·
          </span>
          <span>{language}</span>
        </p>

        <h3 className="text-h5 text-text-primary">{title}</h3>

        <Link
          href={cta.href}
          className={cn(
            "mt-auto inline-flex items-center gap-1.5 pt-2 text-body-sm text-text-brand",
            "[&_svg]:transition-transform [&_svg]:duration-200",
            "group-hover:[&_svg]:translate-x-0.5",
            "motion-reduce:[&_svg]:transition-none motion-reduce:group-hover:[&_svg]:translate-x-0",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 rounded-sm",
          )}
        >
          {cta.label}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export default ProgramCard;
