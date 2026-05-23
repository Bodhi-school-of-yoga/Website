import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export type DepartmentHeadTone = "mint" | "dark" | "lime";

export type DepartmentHeadCardProps = {
  name: string;
  role: string;
  portrait: string;
  tone?: DepartmentHeadTone;
  portraitAlt?: string;
  className?: string;
};

const toneClass: Record<DepartmentHeadTone, string> = {
  mint: "bg-mint-pale",
  dark: "bg-brand-green-darkest",
  lime: "bg-lime-soft",
};

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
