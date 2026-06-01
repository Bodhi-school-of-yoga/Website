// DepartmentHeadCard — profile card for a department head with photo, name, and bio.

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export type DepartmentHeadTone = "mint" | "dark" | "lime";

export type DepartmentHeadCardProps = {
  name: string;
  role: string;
  /** Optional. When omitted the card keeps its slot and shows a placeholder. */
  portrait?: string;
  tone?: DepartmentHeadTone;
  portraitAlt?: string;
  className?: string;
};

const toneClass: Record<DepartmentHeadTone, string> = {
  mint: "bg-mint-pale",
  dark: "bg-brand-green-darkest",
  lime: "bg-lime-soft",
};

// Icon tint per tone so the placeholder glyph stays legible on light + dark boxes.
const placeholderIconClass: Record<DepartmentHeadTone, string> = {
  mint: "text-brand-green-darkest/40",
  dark: "text-white/45",
  lime: "text-brand-green-darkest/40",
};

function PhotoSlotIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <circle cx="8.5" cy="9.5" r="1.75" />
      <path d="M3.5 17.5 9 12l4 4 3-2.5 4.5 4" />
    </svg>
  );
}

export function DepartmentHeadCard({
  name,
  role,
  portrait,
  tone = "mint",
  portraitAlt = "",
  className,
}: DepartmentHeadCardProps) {
  return (
    <article className={cn("flex w-full flex-col", className)}>
      <div className="relative w-full">
        {portrait ? (
          <>
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 bottom-0 rounded-[22px]",
                "h-[70%]",
                toneClass[tone],
              )}
            />
            <div className="relative mx-auto aspect-square w-[93%] overflow-hidden">
              <Image
                src={portrait}
                alt={portraitAlt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </>
        ) : (
          <div
            className={cn(
              "mx-auto flex aspect-square w-[93%] items-center justify-center rounded-[22px]",
              toneClass[tone],
            )}
          >
            <PhotoSlotIcon
              className={cn("h-12 w-12", placeholderIconClass[tone])}
            />
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <h3 className="font-heading text-subtext-3 font-bold text-text-secondary">
          {name}
        </h3>
        <p
          className={cn(
            "text-mini font-normal uppercase",
            "text-text-teal-deep",
            "tracking-[0.08em]",
          )}
        >
          {role}
        </p>
      </div>
    </article>
  );
}
