// TrainerProfileCard — trainer card primitive with two variants.
// variant="card" (default): rectangular 3:4 portrait + name + role + years/city meta row.
// variant="avatar": circular portrait + centered name + centered role (no meta, no border).
// Optionally wraps in a Next.js Link when `slug` or `href` is provided.
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type TrainerProfileCardProps = {
  name: string;
  city: string;
  variant?: "card" | "avatar";
  // canonical
  role?: string;
  years?: number | string;
  image?: string;
  imageAlt?: string;
  slug?: string;
  href?: string;
  className?: string;
  // deprecated aliases (back-compat)
  /** @deprecated use `role` */
  specialty?: string;
  /** @deprecated use `years` */
  yearsTeaching?: number | string;
  /** @deprecated use `image` */
  portrait?: string;
  /** @deprecated use `imageAlt` */
  portraitAlt?: string;
};

export function TrainerProfileCard({
  name,
  city,
  variant = "card",
  role,
  years,
  image,
  imageAlt,
  slug,
  href,
  className,
  specialty,
  yearsTeaching,
  portrait,
  portraitAlt,
}: TrainerProfileCardProps) {
  const resolvedRole = role ?? specialty;
  const resolvedYears = years ?? yearsTeaching;
  const resolvedImage = image ?? portrait;
  const resolvedAlt = imageAlt ?? portraitAlt ?? name;

  if (
    resolvedRole === undefined ||
    resolvedYears === undefined ||
    resolvedImage === undefined
  ) {
    return null;
  }

  const linkHref = href ?? (slug ? `/trainers/${slug}` : undefined);

  if (variant === "avatar") {
    const avatarBase = cn(
      "group flex w-full flex-col items-center gap-3",
      "motion-safe:transition-transform motion-safe:duration-200",
      "motion-safe:hover:-translate-y-0.5",
      className,
    );

    const avatarContent = (
      <>
        <div className="relative aspect-square w-full overflow-hidden rounded-full">
          <Image
            src={resolvedImage}
            alt={resolvedAlt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 16vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.05]"
          />
        </div>
        <div className="flex flex-col items-center text-center">
          <h3 className="text-[16px] font-semibold leading-tight text-text-secondary">
            {name}
          </h3>
          <p className="mt-1 text-[12px] leading-snug text-text-brand-deep">
            {resolvedRole}
          </p>
        </div>
      </>
    );

    if (linkHref) {
      return (
        <Link
          href={linkHref}
          className={cn(
            avatarBase,
            "rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-4 focus-visible:ring-offset-surface-1",
          )}
        >
          {avatarContent}
        </Link>
      );
    }

    return <article className={avatarBase}>{avatarContent}</article>;
  }

  const baseClasses = cn(
    "group flex w-full flex-col gap-3 overflow-hidden rounded-2xl",
    "bg-surface-1 border border-border-2",
    "pb-[18px]",
    "motion-safe:transition-all motion-safe:duration-200",
    "motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_36px_-22px_rgba(10,79,69,0.25)]",
    className,
  );

  const content = (
    <>
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={resolvedImage}
          alt={resolvedAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-col gap-[6px] px-[18px]">
        <h3 className="text-[18px] font-semibold leading-tight text-text-secondary">
          {name}
        </h3>
        <p className="text-[13px] leading-tight text-text-brand-deep">
          {resolvedRole}
        </p>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-text-tertiary">
          <span>• {resolvedYears} years teaching</span>
          <span>• {city}</span>
        </div>
      </div>
    </>
  );

  if (linkHref) {
    return (
      <Link
        href={linkHref}
        className={cn(
          baseClasses,
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1",
        )}
      >
        {content}
      </Link>
    );
  }

  return <article className={baseClasses}>{content}</article>;
}
