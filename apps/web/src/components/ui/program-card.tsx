// ProgramCard — card presenting a yoga program with image, title, description, and CTA link.

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
};

export function ProgramCard({
  title,
  href,
  imageSrc,
  imageAlt = "",
  meta = [],
  cta = "View Program",
  className,
  priority = false,
  instructor,
  variant = "course",
  modeBadge,
}: ProgramCardProps) {
  const isArticle = variant === "article";

  const cardInner = (
    <Card
      className={cn(
        // Article-variant chrome from Figma 1:246: 24px-ish radius, white card,
        // hairline border, soft floating shadow, no hover bg shift.
        "rounded-2xl border-border-1 shadow-card hover:bg-card",
        "gap-0 py-0 overflow-hidden",
        // Hover affordances (task-2): group-scoped lift + shadow upgrade.
        "group transition-[transform,box-shadow] duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg",
        "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:transform-none",
        className
      )}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "413 / 235" }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:transform-none"
          priority={priority}
        />
        {modeBadge && (
          <span
            className={cn(
              "absolute top-3 right-3 z-10",
              "inline-flex items-center gap-1.5",
              "rounded-full bg-surface-1 px-3 py-1 backdrop-blur",
              "text-mini uppercase tracking-wide text-text-primary"
            )}
          >
            {modeBadge.icon && (
              <span aria-hidden="true" className="flex items-center">
                {modeBadge.icon}
              </span>
            )}
            {modeBadge.label}
          </span>
        )}
      </div>

      <CardHeader className="gap-3 px-8 pt-6">
        <CardTitle
          className={cn(
            "text-h5 leading-tight",
            isArticle && "font-heading text-text-brand-deep"
          )}
        >
          {title}
        </CardTitle>

        {!isArticle && meta.length > 0 && (
          <ul className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
            {meta.map((item, i) => (
              <React.Fragment key={item.label}>
                <li className="flex items-center gap-1.5 font-heading text-body-sm font-medium text-muted-foreground">
                  <span className="flex size-3.5 shrink-0 items-center justify-center text-muted-foreground/80">
                    {item.icon}
                  </span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </li>
                {i < meta.length - 1 && (
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
          <CardContent className="px-8 pt-0 pb-0" />

          <CardFooter
            className={cn(
              // Dashed divider per Figma; transparent fill (no muted bg here).
              "mx-8 mt-4 mb-6 px-0 py-0 pt-4 flex-col items-start gap-3",
              "rounded-none border-0 border-t border-dashed border-foreground/20 bg-transparent"
            )}
          >
            {instructor && (
              <div className="flex items-center gap-2">
                {instructor.avatar ? (
                  <Image
                    src={instructor.avatar}
                    alt={instructor.name}
                    width={28}
                    height={28}
                    className="size-7 rounded-full object-cover"
                  />
                ) : (
                  <span
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-lite font-sans text-[10px] font-semibold text-text-brand"
                    aria-hidden="true"
                  >
                    {instructor.initials ?? instructor.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span className="font-sans text-body-sm text-text-secondary">
                  {instructor.name}
                </span>
              </div>
            )}
            <Link
              href={href}
              className={cn(
                "group/cta inline-flex items-center gap-1.5 font-sans text-body-sm font-medium",
                "text-brand-primary transition-opacity hover:opacity-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm"
              )}
            >
              {cta}
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
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
      >
        {cardInner}
      </Link>
    );
  }

  return cardInner;
}
