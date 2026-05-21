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

export type ProgramCardProps = {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt?: string;
  meta?: ProgramCardMetaItem[];
  cta?: string;
  className?: string;
};

export function ProgramCard({
  title,
  href,
  imageSrc,
  imageAlt = "",
  meta = [],
  cta = "View Program",
  className,
}: ProgramCardProps) {
  return (
    <Card
      className={cn(
        // Article-variant chrome from Figma 1:246: 24px-ish radius, white card,
        // hairline border, soft floating shadow, no hover bg shift.
        "rounded-2xl border-border-1 shadow-card hover:bg-card",
        "gap-0 py-0 overflow-hidden",
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
          className="object-cover"
        />
      </div>

      <CardHeader className="gap-3 px-8 pt-6">
        <CardTitle className="text-h5 leading-tight">{title}</CardTitle>

        {meta.length > 0 && (
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

      <CardContent className="px-8 pt-0 pb-0" />

      <CardFooter
        className={cn(
          // Dashed divider per Figma; transparent fill (no muted bg here).
          "mx-8 mt-4 mb-6 px-0 py-0 pt-4",
          "rounded-none border-0 border-t border-dashed border-foreground/20 bg-transparent"
        )}
      >
        <Link
          href={href}
          className={cn(
            "inline-flex items-center gap-1.5 font-sans text-body-sm font-medium",
            "text-brand-primary transition-opacity hover:opacity-80",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm"
          )}
        >
          {cta}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  );
}
