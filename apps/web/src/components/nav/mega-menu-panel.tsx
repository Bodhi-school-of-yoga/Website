"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Flower2,
  GraduationCap,
  MapPin,
  MessageCircle,
  PersonStanding,
  Sparkles,
  User,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { NavMenuLink } from "@/components/site-header.nav-menu";
import type { MegaMenuColumn } from "./nav-types";

const ICONS = {
  User,
  Users,
  Flower2,
  Sparkles,
  CalendarDays,
  PersonStanding,
  BookOpen,
  MapPin,
  GraduationCap,
  MessageCircle,
} as const;

type IconName = keyof typeof ICONS;

export type MegaMenuPanelProps = {
  columns: MegaMenuColumn[];
  className?: string;
};

export function MegaMenuPanel({ columns, className }: MegaMenuPanelProps) {
  return (
    <div
      className={cn(
        "w-[860px] max-w-[calc(100vw-48px)] rounded-3xl border border-border-2 bg-surface-1 p-6",
        "shadow-[0_19px_30px_-4px_rgba(136,136,136,0.18)]",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {columns.map((column) => (
          <div key={column.heading} className="flex flex-col gap-4">
            <h3 className="font-heading text-mini font-bold uppercase tracking-[0.16em] text-text-brand-deep/70">
              {column.heading}
            </h3>
            <ul className="flex flex-col gap-1">
              {column.items.map((item) => {
                const Icon = ICONS[item.icon as IconName];
                return (
                  <li key={item.href}>
                    <NavMenuLink
                      render={<Link href={item.href} />}
                      closeOnClick
                      className="group/mega-item flex items-start gap-3 rounded-xl p-2 hover:bg-surface-2/70"
                    >
                      <span
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-2 bg-surface-1",
                          "transition-colors group-hover/mega-item:border-border-3/60",
                        )}
                      >
                        {Icon ? (
                          <Icon
                            className="size-[18px] text-text-brand-deep"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        ) : null}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="font-sans text-body-md font-semibold leading-tight text-text-secondary">
                          {item.title}
                        </span>
                        <span className="font-heading line-clamp-2 text-body-sm text-text-tertiary">
                          {item.subtitle}
                        </span>
                      </span>
                    </NavMenuLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
