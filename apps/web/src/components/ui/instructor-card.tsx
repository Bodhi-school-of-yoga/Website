import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export type InstructorCardProps = {
  name: string;
  role: string;
  avatar: string;
  className?: string;
};

export function InstructorCard({ name, role, avatar, className }: InstructorCardProps) {
  return (
    <article
      className={cn(
        "flex items-center gap-4 bg-surface-1 border border-border-1 shadow-card",
        "rounded-[19px] px-4 py-4 sm:gap-[14px] sm:pl-4 sm:pr-5 sm:py-[17px]",
        "h-[112px] w-[280px] sm:h-[126px] sm:w-[364px]",
        className,
      )}
    >
      <div className="relative size-[88px] shrink-0 overflow-hidden rounded-full border border-border-1 bg-surface-2 sm:size-[98px]">
        <Image
          src={avatar}
          alt={name}
          fill
          sizes="98px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="font-heading text-subtext-2 font-bold text-text-secondary leading-snug truncate">
          {name}
        </p>
        <p className="font-body text-body-sm font-normal text-text-tertiary leading-snug line-clamp-2">
          {role}
        </p>
      </div>
    </article>
  );
}
