"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavMenu,
  NavMenuContent,
  NavMenuItem,
  NavMenuLink,
  NavMenuList,
  NavMenuTrigger,
} from "@/components/site-header.nav-menu";
import { DropdownCard } from "@/components/nav/dropdown-card";
import { MegaMenuPanel } from "@/components/nav/mega-menu-panel";
import { ABOUT_MEGA_MENU, COURSE_DROPDOWNS } from "@/components/nav/nav-data";

export type CourseDropdownKey = "teacher" | "advanced" | "yoga";

export type HeaderNavLink = {
  label: string;
  href: string;
  kind?: "mega" | "panel";
  dropdownKey?: CourseDropdownKey;
};

export type SiteHeaderProps = {
  wordmark?: string;
  tagline?: string;
  navLinks?: HeaderNavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  onSearchClick?: () => void;
  className?: string;
};

const DEFAULT_NAV_LINKS: HeaderNavLink[] = [
  {
    label: "Teacher Courses",
    href: "/teacher-courses",
    kind: "panel",
    dropdownKey: "teacher",
  },
  {
    label: "Advanced Certifications",
    href: "/advanced-certifications",
    kind: "panel",
    dropdownKey: "advanced",
  },
  {
    label: "Yoga Courses",
    href: "/yoga-courses",
    kind: "panel",
    dropdownKey: "yoga",
  },
  { label: "Workshops", href: "/workshops" },
  { label: "Our Centers", href: "/our-centers" },
  { label: "About Bodhi", href: "/about", kind: "mega" },
];

export function SiteHeader({
  wordmark = "Bodhi",
  tagline = "School of Yoga",
  navLinks = DEFAULT_NAV_LINKS,
  ctaLabel = "Enquire Now",
  ctaHref = "/enquire",
  onSearchClick,
  className,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || mobileOpen
          ? "bg-background/85 backdrop-blur-md shadow-[0_1px_0_0_rgb(0_0_0/0.04)]"
          : "bg-transparent",
        className,
      )}
    >
      <div className="mx-auto flex h-[88px] max-w-[1340px] items-center justify-between gap-6 px-6 sm:h-[92px] sm:px-8 lg:px-10 xl:gap-10">
        <Link
          href="/"
          aria-label={`${wordmark} — home`}
          className="flex shrink-0 flex-col items-start leading-none"
        >
          <span
            className="font-display italic font-normal text-[28px] leading-none tracking-[-0.011em] text-black sm:text-[32px]"
          >
            {wordmark}
          </span>
          <span className="mt-1.5 font-tagline font-semibold text-[12px] uppercase tracking-[0.246em] text-black/60">
            {tagline}
          </span>
        </Link>

        <NavMenu
          delay={50}
          closeDelay={120}
          aria-label="Primary"
          className="hidden whitespace-nowrap xl:flex"
        >
          <NavMenuList>
            {navLinks.map((link) => {
              if (link.kind === "panel" && link.dropdownKey) {
                return (
                  <NavMenuItem key={link.label}>
                    <NavMenuTrigger className="font-ui text-[17px] font-medium text-black">
                      {link.label}
                    </NavMenuTrigger>
                    <NavMenuContent>
                      <DropdownCard
                        items={COURSE_DROPDOWNS[link.dropdownKey].items}
                      />
                    </NavMenuContent>
                  </NavMenuItem>
                );
              }
              if (link.kind === "mega") {
                return (
                  <NavMenuItem key={link.label}>
                    <NavMenuTrigger className="font-ui text-[17px] font-medium text-black">
                      {link.label}
                    </NavMenuTrigger>
                    <NavMenuContent>
                      <MegaMenuPanel columns={ABOUT_MEGA_MENU} />
                    </NavMenuContent>
                  </NavMenuItem>
                );
              }
              return (
                <NavMenuItem key={link.label}>
                  <NavMenuLink
                    render={<Link href={link.href} />}
                    className="inline-flex shrink-0 items-center whitespace-nowrap font-ui text-[17px] font-medium text-black transition-opacity hover:opacity-70 focus-visible:opacity-70"
                  >
                    {link.label}
                  </NavMenuLink>
                </NavMenuItem>
              );
            })}
          </NavMenuList>
        </NavMenu>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Search"
            onClick={onSearchClick}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full",
              "text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
            )}
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </button>

          <Link
            href={ctaHref}
            className={cn(
              "hidden h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-[36px] px-8",
              "bg-brand-shade font-ui text-[14px] font-semibold tracking-[0.019em]",
              "text-text-primary transition-[transform,filter] duration-150",
              "hover:brightness-[1.05] active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
              "sm:inline-flex",
            )}
          >
            {ctaLabel}
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full xl:hidden",
              "text-foreground/80 transition-colors hover:bg-foreground/5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
            )}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav
            aria-label="Mobile"
            className="mx-auto flex max-w-[1340px] flex-col gap-1 border-t border-foreground/10 px-6 py-6 sm:px-8"
          >
            {navLinks.map((link) => {
              if (link.kind === "panel" && link.dropdownKey) {
                const items = COURSE_DROPDOWNS[link.dropdownKey].items;
                return (
                  <details key={link.label} className="group">
                    <summary
                      className={cn(
                        "flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3",
                        "font-sans text-base font-medium text-foreground transition-colors hover:bg-foreground/5",
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className="size-4 text-foreground/60 transition-transform group-open:rotate-180"
                        strokeWidth={1.75}
                      />
                    </summary>
                    <ul className="ml-3 flex flex-col gap-1 border-l border-border-2 py-1 pl-3">
                      {items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-lg px-3 py-2 text-body-md text-text-secondary hover:bg-foreground/5"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                );
              }
              if (link.kind === "mega") {
                return (
                  <details key={link.label} className="group">
                    <summary
                      className={cn(
                        "flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3",
                        "font-sans text-base font-medium text-foreground transition-colors hover:bg-foreground/5",
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className="size-4 text-foreground/60 transition-transform group-open:rotate-180"
                        strokeWidth={1.75}
                      />
                    </summary>
                    <div className="ml-3 flex flex-col gap-3 border-l border-border-2 py-2 pl-3">
                      {ABOUT_MEGA_MENU.map((column) => (
                        <div key={column.heading} className="flex flex-col gap-1">
                          <h4 className="px-3 text-mini font-extrabold uppercase tracking-[0.18em] text-text-brand-deep/60">
                            {column.heading}
                          </h4>
                          <ul className="flex flex-col">
                            {column.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block rounded-lg px-3 py-2 text-body-md text-text-secondary hover:bg-foreground/5"
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>
                );
              }
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 font-sans text-base font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <Link
              href={ctaHref}
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex h-12 items-center justify-center rounded-full bg-brand-shade px-8 text-body-sm font-semibold text-text-primary transition-colors hover:bg-brand-shade/85"
            >
              {ctaLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
