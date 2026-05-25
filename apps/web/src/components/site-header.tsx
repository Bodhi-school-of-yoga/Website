"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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
  tone?: "dark" | "light";
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

const underlineSweep =
  "relative pb-1 after:pointer-events-none after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100 data-[popup-open]:after:scale-x-100";

export function SiteHeader({
  wordmark = "Bodhi",
  tagline = "School of Yoga",
  navLinks = DEFAULT_NAV_LINKS,
  ctaLabel = "Enquire Now",
  ctaHref = "/contact",
  onSearchClick,
  tone = "dark",
  className,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const inverted = tone === "light" && !scrolled && !mobileOpen;

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
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        y: { type: "spring", stiffness: 260, damping: 30, mass: 0.6 },
        opacity: { duration: 0.4, ease: "easeOut" },
      }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || mobileOpen
          ? "bg-background/85 backdrop-blur-md shadow-[0_1px_0_0_rgb(0_0_0/0.04)]"
          : "bg-transparent",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1340px] items-center justify-between gap-6 nav-px transition-[height] duration-300 xl:gap-10",
          scrolled ? "h-[72px] sm:h-[76px]" : "h-[88px] sm:h-[92px]",
        )}
      >
        <Link
          href="/"
          aria-label={`${wordmark} — home`}
          className="group flex shrink-0 flex-col items-start leading-none"
        >
          <span
            className={cn(
              "font-heading italic font-normal leading-none transition-[transform,color,font-size] duration-300",
              scrolled ? "text-h5" : "text-h5 sm:text-h4",
              "group-hover:scale-[1.02]",
              inverted ? "text-text-inverse" : "text-black",
            )}
            style={{ transformOrigin: "left center" }}
          >
            {wordmark}
          </span>
          <span
            className={cn(
              "mt-1.5 font-sans font-semibold text-mini uppercase transition-[opacity,transform] duration-300",
              scrolled
                ? "-translate-y-1 opacity-0"
                : "translate-y-0 opacity-100",
              inverted ? "text-text-inverse/70" : "text-black/60",
            )}
          >
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
                    <NavMenuTrigger
                      className={cn(
                        "font-sans text-body-sm font-medium transition-colors",
                        inverted ? "text-text-inverse" : "text-black",
                        underlineSweep,
                      )}
                    >
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
                    <NavMenuTrigger
                      className={cn(
                        "font-sans text-body-sm font-medium transition-colors",
                        inverted ? "text-text-inverse" : "text-black",
                        underlineSweep,
                      )}
                    >
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
                    className={cn(
                      "inline-flex shrink-0 items-center whitespace-nowrap font-sans text-body-sm font-medium transition-colors",
                      inverted ? "text-text-inverse" : "text-black",
                      underlineSweep,
                    )}
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
              "flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95",
              inverted
                ? "text-text-inverse hover:bg-white/10"
                : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
            )}
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </button>

          <Link
            href={ctaHref}
            className={cn(
              "hidden h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-[36px] px-8",
              "bg-brand-shade hover:bg-[#86d5c4] font-sans text-body-sm font-semibold",
              "text-text-primary transition-[transform,filter,box-shadow] duration-200",
            
        
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
              "relative flex h-11 w-11 items-center justify-center rounded-full xl:hidden transition-colors",
              inverted
                ? "text-text-inverse hover:bg-white/10"
                : "text-foreground/80 hover:bg-foreground/5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <X className="h-5 w-5" strokeWidth={1.75} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Menu className="h-5 w-5" strokeWidth={1.75} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-[88px] z-40 bg-foreground/30 backdrop-blur-sm xl:hidden"
              aria-hidden
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className={cn(
                "fixed inset-y-0 right-0 z-50 flex w-full max-w-[380px] flex-col bg-background shadow-[-24px_0_48px_-24px_rgba(0,0,0,0.18)]",
                "pt-[88px] xl:hidden",
              )}
            >
              <nav
                aria-label="Mobile"
                className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 pb-8 pt-6"
              >
                {navLinks.map((link, i) => {
                  const reveal = {
                    initial: { opacity: 0, x: 24 },
                    animate: { opacity: 1, x: 0 },
                    transition: {
                      delay: 0.08 + i * 0.045,
                      duration: 0.28,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    },
                  };

                  if (link.kind === "panel" && link.dropdownKey) {
                    const items = COURSE_DROPDOWNS[link.dropdownKey].items;
                    return (
                      <motion.div key={link.label} {...reveal}>
                        <details className="group">
                          <summary
                            className={cn(
                              "flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3",
                              "font-sans text-subtext-2 font-medium text-text-primary transition-colors hover:bg-foreground/5",
                            )}
                          >
                            <span>{link.label}</span>
                            <ChevronDown
                              className="size-4 text-foreground/60 transition-transform duration-300 group-open:rotate-180"
                              strokeWidth={1.75}
                            />
                          </summary>
                          <ul className="ml-3 flex flex-col gap-1 border-l border-border-2 py-1 pl-3">
                            {items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block rounded-lg px-3 py-2 text-body-md text-text-secondary transition-colors hover:bg-foreground/5"
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </motion.div>
                    );
                  }
                  if (link.kind === "mega") {
                    return (
                      <motion.div key={link.label} {...reveal}>
                        <details className="group">
                          <summary
                            className={cn(
                              "flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3",
                              "font-sans text-subtext-2 font-medium text-text-primary transition-colors hover:bg-foreground/5",
                            )}
                          >
                            <span>{link.label}</span>
                            <ChevronDown
                              className="size-4 text-foreground/60 transition-transform duration-300 group-open:rotate-180"
                              strokeWidth={1.75}
                            />
                          </summary>
                          <div className="ml-3 flex flex-col gap-3 border-l border-border-2 py-2 pl-3">
                            {ABOUT_MEGA_MENU.map((column) => (
                              <div
                                key={column.heading}
                                className="flex flex-col gap-1"
                              >
                                <h4 className="px-3 text-mini font-extrabold uppercase tracking-[0.18em] text-text-brand-deep/60">
                                  {column.heading}
                                </h4>
                                <ul className="flex flex-col">
                                  {column.items.map((item) => (
                                    <li key={item.href}>
                                      <Link
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block rounded-lg px-3 py-2 text-body-md text-text-secondary transition-colors hover:bg-foreground/5"
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
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div key={link.label} {...reveal}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between rounded-lg px-3 py-3 font-sans text-subtext-2 font-medium text-text-primary transition-colors hover:bg-foreground/5"
                      >
                        <span>{link.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + navLinks.length * 0.045,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={ctaHref}
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-shade px-8 text-body-sm font-semibold text-text-primary transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-[1.05] active:translate-y-0"
                  >
                    {ctaLabel}
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
