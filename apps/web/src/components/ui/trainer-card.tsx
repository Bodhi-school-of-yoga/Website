// TrainerCard — compact card showing a trainer's photo, name, speciality, and social link.

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export type TrainerCardProps = {
  name: string;
  portrait: string;
  portraitAlt?: string;
  className?: string;
};

export function TrainerCard({
  name,
  portrait,
  portraitAlt = "",
  className,
}: TrainerCardProps) {
  return (
    <article
      className={cn(
        "flex w-full flex-col items-center gap-4",
        "rounded-[16px] border border-border-2 bg-surface-1",
        "px-4 py-5",
        className,
      )}
    >
      <div className="relative aspect-square w-[72%] overflow-hidden rounded-full">
        <Image
          src={portrait}
          alt={portraitAlt}
          fill
          sizes="(max-width: 768px) 33vw, 16vw"
          className="object-cover"
        />
      </div>

      <h3 className="text-body-md font-semibold text-text-secondary text-center">
        {name}
      </h3>
    </article>
  );
}
