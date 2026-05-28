"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, ChevronRight, Laptop, PlayCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { NavMenuLink } from "@/components/site-header.nav-menu";
import type { DropdownItem, DropdownSubItem } from "./nav-types";

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
        "w-[330px] max-w-[calc(100vw-48px)] rounded-2xl border border-border-2 bg-surface-1 px-3 py-2",
        "shadow-[0_21px_30px_-12px_rgba(136,136,136,0.22)]",
        className,
      )}
    >
      <ul className="flex flex-col">
        {items.map((item, index) => (
          <li key={item.href}>
            {item.subItems && item.subItems.length > 0 ? (
              <DropdownRowWithSubmenu item={item} />
            ) : (
              <DropdownRow item={item} />
            )}
            {index < items.length - 1 ? (
              <hr className="my-1 border-t border-border-2" />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DropdownRow({ item }: { item: DropdownItem }) {
  return (
    <NavMenuLink
      render={<Link href={item.href} />}
      closeOnClick
      className="group/dropdown-item flex items-center gap-3 rounded-xl p-2 hover:bg-surface-2/70"
    >
      <RowThumbnail src={item.image} />
      <RowText
        title={item.title}
        subtitle={item.subtitle}
        count={item.count}
      />
    </NavMenuLink>
  );
}

function DropdownRowWithSubmenu({ item }: { item: DropdownItem }) {
  const [open, setOpen] = React.useState(false);
  const closeTimerRef = React.useRef<number | null>(null);

  const openNow = React.useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(true);
  }, []);

  const closeSoon = React.useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => setOpen(false), 120);
  }, []);

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={closeSoon}
    >
      <NavMenuLink
        render={<Link href={item.href} />}
        closeOnClick
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "group/dropdown-item flex items-center gap-3 rounded-xl p-2 transition-colors",
          "hover:bg-surface-2/70",
          open && "bg-surface-2/70",
        )}
      >
        <RowThumbnail src={item.image} />
        <RowText
          title={item.title}
          subtitle={item.subtitle}
          count={item.count}
        />
        <ChevronRight
          className="size-4 shrink-0 text-text-tertiary"
          strokeWidth={2}
          aria-hidden
        />
      </NavMenuLink>

      {open ? (
        <div
          className={cn(
            "absolute left-full top-0 z-10 ml-6 w-[240px] max-w-[calc(100vw-48px)]",
            "rounded-2xl border border-border-2 bg-surface-1 px-3 py-2",
            "shadow-[0_21px_30px_-12px_rgba(136,136,136,0.22)]",
            "animate-in fade-in slide-in-from-left-2 duration-150",
          )}
          role="menu"
        >
          <ul className="flex flex-col">
            {item.subItems!.map((sub, i) => (
              <li key={sub.href}>
                <SubmenuRow item={sub} />
                {i < item.subItems!.length - 1 ? (
                  <hr className="my-1 border-t border-border-2" />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function SubmenuRow({ item }: { item: DropdownSubItem }) {
  return (
    <NavMenuLink
      render={<Link href={item.href} />}
      closeOnClick
      className="group/submenu-item flex flex-col gap-0.5 rounded-xl p-2 hover:bg-surface-2/70"
    >
      <span className="font-sans text-subtext-1 font-semibold leading-tight text-text-secondary">
        {item.title}
      </span>
      {item.count !== undefined ? (
        <span className="font-heading text-mini font-medium uppercase text-text-brand">
          {item.count} Courses
        </span>
      ) : null}
    </NavMenuLink>
  );
}

function RowThumbnail({ src }: { src: string }) {
  return (
    <span className="relative block h-[60px] w-[88px] shrink-0 overflow-hidden rounded-lg">
      <Image src={src} alt="" fill sizes="88px" className="object-cover" />
    </span>
  );
}

function RowText({
  title,
  subtitle,
  count,
}: {
  title: string;
  subtitle: string;
  count?: number;
}) {
  return (
    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
      <span className="font-sans text-subtext-1 font-semibold leading-tight text-text-secondary">
        {title}
      </span>
      <span className="font-medium text-body-sm text-text-tertiary">
        {subtitle}
      </span>
      {count !== undefined ? (
        <span className="font-heading text-mini font-medium uppercase text-text-brand">
          {count} Courses
        </span>
      ) : null}
    </span>
  );
}
