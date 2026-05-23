import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type DurationPillProps = {
  value: string;
  className?: string;
};

function DurationPill({ value, className }: DurationPillProps) {
  return (
    <span
      className={cn(
        "rounded-full bg-white/85 backdrop-blur-sm px-2 py-0.5",
        "text-mini text-text-primary",
        className
      )}
    >
      {value}
    </span>
  );
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type VideoLessonCardProps = {
  lessonLabel: string;
  title: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  thumbnail: string;
  thumbnailAlt?: string;
  state: "free" | "locked";
  durationBadge?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function VideoLessonCard({
  lessonLabel,
  title,
  duration,
  level,
  thumbnail,
  thumbnailAlt,
  state,
  durationBadge,
  href,
  onClick,
  className,
}: VideoLessonCardProps) {
  const isFree = state === "free";
  const resolvedHref =
    href ?? (isFree ? `/classes/${slugify(title)}` : "#unlock");

  return (
    <Link
      href={resolvedHref}
      onClick={onClick}
      className={cn(
        "group block overflow-hidden rounded-2xl",
        "bg-surface-1 border border-border-1 shadow-card",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg",
        "active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
        <Image
          src={thumbnail}
          alt={thumbnailAlt ?? title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {isFree && (
          <>
            <Badge
              variant="secondary"
              className="absolute top-2 left-2 z-10"
            >
              Free
            </Badge>
            <span
              className={cn(
                "absolute inset-0 z-[5] flex items-center justify-center",
                "pointer-events-none"
              )}
            >
              <Play
                className={cn(
                  "size-10 text-text-inverse drop-shadow",
                  "transition-all duration-300",
                  "scale-100 group-hover:scale-110"
                )}
                aria-hidden="true"
              />
            </span>
          </>
        )}

        {!isFree && (
          <>
            <span
              aria-hidden="true"
              className="absolute inset-0 z-[5] bg-black/40"
            />
            <span
              className={cn(
                "absolute inset-0 z-10 flex items-center justify-center",
                "pointer-events-none"
              )}
            >
              <Lock
                className={cn(
                  "size-8 text-text-inverse",
                  "transition-all duration-300",
                  "opacity-85 group-hover:opacity-100"
                )}
                aria-hidden="true"
              />
            </span>
          </>
        )}

        {durationBadge && (
          <DurationPill
            value={durationBadge}
            className="absolute bottom-2 right-2 z-10"
          />
        )}
      </div>

      <div className="flex flex-col gap-2 px-4 py-4">
        <p className="text-mini text-text-tertiary uppercase tracking-wider">
          {lessonLabel}
        </p>
        <h3 className="text-body-sm text-text-primary line-clamp-2">
          {title}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <Badge variant="outline">{level}</Badge>
          <span className="text-mini text-text-tertiary">{duration}</span>
        </div>
      </div>
    </Link>
  );
}
