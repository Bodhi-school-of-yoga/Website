import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Clock, Globe } from "lucide-react";

import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ReactNode> = {
  calendar: <CalendarDays className="h-6 w-6" strokeWidth={1.75} />,
  location: <MapPin className="h-6 w-6" strokeWidth={1.75} />,
  clock: <Clock className="h-6 w-6" strokeWidth={1.75} />,
  globe: <Globe className="h-6 w-6" strokeWidth={1.75} />,
};

export type CourseMetaItem = {
  icon: string;
  label: string;
};

export type CourseHeroSectionProps = {
  breadcrumb: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  meta: CourseMetaItem[];
  ctaLabel: string;
  ctaHref: string;
  heroImage: string;
  className?: string;
};

export function CourseHeroSection({
  breadcrumb,
  titleLead,
  titleAccent,
  subtitle,
  meta,
  ctaLabel,
  ctaHref,
  heroImage,
  className,
}: CourseHeroSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-brand-lite",
        "pt-32 pb-20 lg:pt-36 lg:pb-24",
        className,
      )}
    >
      <div className="mx-auto max-w-[1340px] page-px">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex flex-col lg:flex-1 lg:max-w-[640px]">
            <p className="text-mini text-text-tertiary">{breadcrumb}</p>

            <h1 className="mt-6 font-heading font-bold leading-[1.06] text-[44px] sm:text-[56px] lg:text-[68px]">
              <span className="block text-text-brand">{titleLead}</span>
              <span className="block text-text-primary">{titleAccent}</span>
            </h1>

            <p className="mt-6 max-w-md font-body text-subtext-2 text-text-tertiary">
              {subtitle}
            </p>

            <Link
              href={ctaHref}
              className={cn(
                "mt-10 inline-flex w-fit items-center justify-center rounded-lg px-8 py-3.5",
                "bg-brand-primary text-text-inverse",
                "text-subtext-3 font-semibold",
                "transition-opacity duration-200 hover:opacity-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
              )}
            >
              {ctaLabel}
            </Link>

            <ul className="mt-12 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
              {meta.slice(0, 4).map((item) => (
                <li
                  key={item.label}
                  className={cn(
                    "flex flex-col items-center justify-center gap-3",
                    "h-[104px] w-full sm:w-[110px]",
                    "rounded-[17px] border border-border-1 bg-surface-1/80",
                    "px-3 py-4 text-center",
                  )}
                >
                  <span className="text-text-brand">
                    {ICON_MAP[item.icon] ?? <CalendarDays className="h-6 w-6" strokeWidth={1.75} />}
                  </span>
                  <span className="text-body-sm font-semibold text-text-secondary">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={cn(
              "relative w-full overflow-hidden rounded-2xl bg-surface-2",
              "aspect-[4/5]",
              "lg:w-[44%] lg:max-w-[520px] lg:shrink-0",
            )}
          >
            <Image
              src={heroImage}
              alt={`${titleLead} ${titleAccent}`}
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
