// ProgramCard — card presenting a yoga course with image, title, optional
// rating row, dot-separated meta chips and a mint footer CTA band.

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Star } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ProgramCardMetaItem = {
  icon: React.ReactNode;
  label: string;
};

export type ProgramCardInstructor = {
  name: string;
  avatar?: string;
  initials?: string;
};

export type ProgramCardModeBadge = {
  label: "Online" | "Offline";
  icon?: React.ReactNode;
};

export type ProgramCardVariant = "course" | "article";

export type ProgramCardProps = {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt?: string;
  meta?: ProgramCardMetaItem[];
  cta?: string;
  className?: string;
  priority?: boolean;
  instructor?: ProgramCardInstructor;
  variant?: ProgramCardVariant;
  modeBadge?: ProgramCardModeBadge;
  /** 1-5 — when set together with reviewCount, shows star row + count. */
  rating?: number;
  reviewCount?: number;
  /**
   * Trailing meta chip with location pin — only used for offline/studio
   * courses. Pass e.g. `"4 Centers"`. Omit on online programmes.
   */
  centersLabel?: string;
  /** Shows the "Most Popular" pill in the top-right of the image. */
  featured?: boolean;
  /** Current/live price, already formatted (e.g. "₹14,999"). */
  price?: string;
  /** Original price shown struck-through to signal a discount. */
  originalPrice?: string;
  /** Discount badge label (e.g. "25% OFF"). */
  discountLabel?: string;
};

function StarRating({ rating, reviewCount }: { rating: number; reviewCount?: number }) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-[9px]">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            aria-hidden="true"
            className={cn(
              "size-[16.7px]",
              i < rounded ? "fill-[#FFB400] text-[#FFB400]" : "fill-border-2 text-border-2",
            )}
            strokeWidth={0}
          />
        ))}
      </div>
      {typeof reviewCount === "number" && (
        <span className="font-sans text-[12px] font-medium tracking-[0.12px] text-text-secondary">
          {reviewCount} Reviews
        </span>
      )}
      <span className="sr-only">Rated {rounded} out of 5</span>
    </div>
  );
}

export function ProgramCard({
  title,
  href,
  imageSrc,
  imageAlt = "",
  meta = [],
  cta = "View Program",
  className,
  priority = false,
  variant = "course",
  modeBadge,
  rating,
  reviewCount,
  centersLabel,
  featured = false,
  price,
  originalPrice,
  discountLabel,
}: ProgramCardProps) {
  const isArticle = variant === "article";

  // For the course variant, append the trailing "Centers" chip if provided.
  const metaItems = React.useMemo<ProgramCardMetaItem[]>(() => {
    if (isArticle || !centersLabel) return meta;
    return [
      ...meta,
      {
        icon: <MapPin className="h-3 w-3" strokeWidth={1.75} />,
        label: centersLabel,
      },
    ];
  }, [meta, centersLabel, isArticle]);

  const cardInner = (
    <Card
      className={cn(
        "rounded-2xl border-border-1 shadow-card hover:bg-card",
        "gap-0 py-0 overflow-hidden h-full",
        "group transition-[transform,box-shadow] duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg",
        "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:transform-none",
        className,
      )}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "472 / 237" }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:transform-none"
          priority={priority}
        />

        {!isArticle && featured && (
          <span
            className={cn(
              "absolute right-3.5 top-3.5 z-10",
              "inline-flex items-center gap-1.5",
              "rounded-full bg-surface-1 px-2 py-1.5 pl-2 pr-2.5",
              "shadow-[0_4px_10px_rgba(0,0,0,0.25)]",
            )}
          >
            <Star
              aria-hidden="true"
              className="size-3.5 fill-[#FFB400] text-[#FFB400]"
              strokeWidth={0}
            />
            <span className="font-sans text-[12px] font-medium tracking-[0.12px] text-text-primary">
              Most Popular
            </span>
          </span>
        )}

        {modeBadge && (
          <span
            className={cn(
              "absolute top-3 right-3 z-10",
              "inline-flex items-center gap-1.5",
              "rounded-full bg-surface-1 px-3 py-1 backdrop-blur",
              "text-mini uppercase tracking-wide text-text-primary",
            )}
          >
            {modeBadge.icon && (
              <span aria-hidden="true" className="flex items-center ">
                {modeBadge.icon}
              </span>
            )}
            {modeBadge.label}
          </span>
        )}
      </div>

      <CardHeader className={cn("gap-3 px-7 pt-6", isArticle && "px-8")}>
        <CardTitle
          className={cn(
            "text-h5 leading-tight",
            isArticle && "font-heading text-text-brand-deep",
          )}
        >
          {title}
        </CardTitle>

        {!isArticle && typeof rating === "number" && (
          <StarRating rating={rating} reviewCount={reviewCount} />
        )}

        {!isArticle && metaItems.length > 0 && (
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {metaItems.map((item, i) => (
              <React.Fragment key={`${item.label}-${i}`}>
                <li className="flex items-center gap-1.5 font-sans text-[12px] font-medium tracking-[0.12px] text-text-secondary">
                  <span className="flex size-3 shrink-0 items-center justify-center text-text-secondary/80">
                    {item.icon}
                  </span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </li>
                {i < metaItems.length - 1 && (
                  <li
                    aria-hidden="true"
                    className="size-[3px] shrink-0 rounded-full bg-warm/50"
                  />
                )}
              </React.Fragment>
            ))}
          </ul>
        )}
      </CardHeader>

      {!isArticle && (
        <>
          <CardContent className="px-7 pt-0 pb-6">
            {price && (
              <div className="mt-4 flex items-baseline gap-2.5">
                <span className="font-heading text-[22px] font-extrabold leading-none text-text-brand tracking-tight">
                  {price}
                </span>
                {originalPrice && (
                  <span className="font-sans text-[14px] font-medium text-text-tertiary line-through">
                    {originalPrice}
                  </span>
                )}
                {discountLabel && (
                  <span className="ml-auto inline-flex items-center rounded-full bg-brand-primary/10 px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.6px] text-brand-primary">
                    {discountLabel}
                  </span>
                )}
              </div>
            )}
          </CardContent>

          {/* Mint footer CTA band — full-width, brightens on card hover. */}
          <CardFooter
            className={cn(
              "mt-auto px-7 py-0",
              "rounded-none border-0 bg-transparent",
            )}
          >
            <Link
              href={href}
              className={cn(
                "group/cta -mx-7 flex w-[calc(100%+3.5rem)] items-center justify-center gap-2 py-4",
                "bg-brand-primary/10 text-brand-primary",
                "transition-colors duration-200 ease-in-out",
                "group-hover:bg-brand-primary/100 group-hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                "font-heading text-[14.27px] font-semibold tracking-[0.0878px]",
              )}
              aria-label={`${cta}: ${title}`}
            >
              <span>{cta}</span>
              <ArrowRight
                className="size-3.5 transition-transform duration-200 ease-in-out group-hover/cta:translate-x-0.5 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:transform-none"
                aria-hidden="true"
              />
            </Link>
          </CardFooter>
        </>
      )}

      {isArticle && <CardContent className="px-8 pt-0 pb-6" />}
    </Card>
  );

  if (isArticle) {
    return (
      <Link
        href={href}
        aria-label={title}
        className={cn(
          "block rounded-2xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
      >
        {cardInner}
      </Link>
    );
  }

  return cardInner;
}
