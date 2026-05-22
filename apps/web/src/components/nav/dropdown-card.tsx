"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, Laptop, PlayCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { NavMenuLink } from "@/components/site-header.nav-menu";
import type { DropdownItem } from "./nav-types";

const ICONS = {
  Laptop,
  Building2,
  PlayCircle,
} as const;

type IconName = keyof typeof ICONS;

export type DropdownCardProps = {
  items: DropdownItem[];
  className?: string;
};

export function DropdownCard({ items, className }: DropdownCardProps) {
  return (
    <div
      className={cn(
        "w-[360px] max-w-[calc(100vw-48px)] rounded-2xl border border-border-2 bg-surface-1 p-3",
        "shadow-[0_21px_30px_-12px_rgba(136,136,136,0.22)]",
        className,
      )}
    >
      <ul className="flex flex-col">
        {items.map((item, index) => {
          const Icon = ICONS[item.icon as IconName];
          return (
            <li key={item.href}>
              <NavMenuLink
                render={<Link href={item.href} />}
                closeOnClick
                className="group/dropdown-item flex items-center gap-3 rounded-xl p-2 hover:bg-surface-2/70"
              >
                <span className="relative block h-[60px] w-[88px] shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                  {Icon ? (
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <Icon
                        className="size-5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </span>
                  ) : null}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="font-sans text-subtext-1 font-semibold leading-tight text-text-secondary">
                    {item.title}
                  </span>
                  <span className="font-heading text-body-sm text-text-tertiary">
                    {item.subtitle}
                  </span>
                  <span className="font-heading text-mini font-bold uppercase tracking-[0.08em] text-text-brand">
                    {item.count} Courses
                  </span>
                </span>
              </NavMenuLink>
              {index < items.length - 1 ? (
                <hr className="my-1 border-t border-border-2" />
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
