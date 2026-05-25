"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavMenuLink } from "@/components/site-header.nav-menu";
import type { MegaMenuColumn } from "./nav-types";

const ICONS: Record<string, string> = {
  User: "/icon/Aboutus.svg",
  Flower2: "/icon/YogicLifestyle.svg",
  Users: "/icon/Ourtrainer.svg",
  Sparkles: "/icon/Empowering.svg",
  CalendarDays: "/icon/Event.svg",
  BookOpen: "/icon/Blog.svg",
  MapPin: "/icon/Ourcenter.svg",
  GraduationCap: "/icon/YogaTeacher.svg",
  MessageCircle: "/icon/Contactus.svg",
};

export type MegaMenuPanelProps = {
  columns: MegaMenuColumn[];
  className?: string;
};

export function MegaMenuPanel({ columns, className }: MegaMenuPanelProps) {
  return (
    <div
      className={cn(
        "w-[900px] max-w-[calc(100vw-48px)] rounded-3xl about-navbar-back px-5 py-4",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {columns.map((column) => (
          <div key={column.heading} className="flex flex-col gap-4">
            <h3 className="font-heading text-mini font-bold uppercase tracking-[0.16em] text-text-brand-deep/70">
              {column.heading}
            </h3>
            <ul className="flex flex-col gap-1 p-0 -ml-2">
              {column.items.map((item) => (
                <li key={item.href}>
                  <NavMenuLink
                    render={<Link href={item.href} />}
                    closeOnClick
                    className="group/mega-item flex items-start gap-3 rounded-xl p-2 hover:bg-surface-2/70"
                  >
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-lg border border-border-2 bg-white",
                        "transition-colors group-hover/mega-item:border-border-3/60",
                      )}
                    >
                      {ICONS[item.icon] && (
                        <Image
                          src={ICONS[item.icon]}
                          alt=""
                          width={18}
                          height={18}
                          aria-hidden
                        />
                      )}
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
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
