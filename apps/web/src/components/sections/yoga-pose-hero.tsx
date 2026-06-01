// YogaPoseHero — detail-page hero for a single yoga pose.
// Two-column gradient band: content (breadcrumb, names, intro, meta chips) on
// the left, the pose photo on the right. Stacks on mobile.
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export type YogaPoseHeroProps = {
  name: string;
  sanskrit: string;
  intro: string;
  difficulty: string;
  categoryLabel: string;
  chakra?: string | null;
  image?: string | null;
  breadcrumb: { label: string; href?: string }[];
  className?: string;
};

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-black/[0.06] bg-surface-1/70 px-5 py-3 backdrop-blur">
      <span className="text-mini uppercase tracking-widest text-text-tertiary">
        {label}
      </span>
      <span className="text-body-sm font-semibold text-text-primary">
        {value}
      </span>
    </div>
  );
}

export function YogaPoseHero({
  name,
  sanskrit,
  intro,
  difficulty,
  categoryLabel,
  chakra,
  image,
  breadcrumb,
  className,
}: YogaPoseHeroProps) {
  return (
    <section
      className={cn(
        "w-full bg-[linear-gradient(to_bottom,var(--color-brand-lite)_0%,#ffffff_100%)]",
        "pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1200px] page-px">
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap text-body-sm text-text-secondary">
            {breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1;
              return (
                <React.Fragment key={`${item.label}-${index}`}>
                  <BreadcrumbItem>
                    {item.href && !isLast ? (
                      <BreadcrumbLink
                        render={<Link href={item.href} />}
                        className="text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-text-primary">
                        {item.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator className="text-text-tertiary/70">
                      /
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Content */}
          <div className="flex flex-col items-start">
            <p className="text-mini uppercase tracking-widest text-text-brand">
              {categoryLabel}
            </p>
            <h1 className="mt-3 font-heading text-h2 text-text-primary lg:text-h1">
              {name}
            </h1>
            <p className="mt-2 font-heading text-h5 italic text-text-tertiary">
              {sanskrit}
            </p>

            <p className="mt-6 max-w-[560px] text-body-md text-text-secondary">
              {intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <MetaChip label="Difficulty" value={difficulty} />
              <MetaChip label="Category" value={categoryLabel} />
              {chakra ? <MetaChip label="Chakra" value={chakra} /> : null}
            </div>
          </div>

          {/* Pose photo */}
          <div className="relative w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-black/[0.06] bg-surface-2 shadow-[0_24px_60px_-24px_rgba(0,40,44,0.35)]">
              {image ? (
                <Image
                  src={`/images/yoga-poses/${image}`}
                  alt={`${name} (${sanskrit}) demonstration`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--color-brand-primary)_0%,var(--color-brand-dark)_100%)] px-8 text-center">
                  <span className="font-heading text-h3 text-text-inverse/95">
                    {sanskrit}
                  </span>
                </div>
              )}
              <span className="absolute left-5 top-5 rounded-full bg-surface-1/90 px-4 py-1.5 text-mini uppercase tracking-widest text-text-brand backdrop-blur">
                {difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
