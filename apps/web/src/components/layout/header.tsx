"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import Container from "@/components/shared/container";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type DropdownSubItem = {
  title: string;
  description: string;
  courseCount: number;
  href: string;
  image: string;
};

type DropdownNavItem = {
  label: string;
  href: string;
  subItems: DropdownSubItem[];
};

const dropdownItems: DropdownNavItem[] = [
  {
    label: "Teacher Courses",
    href: "/teacher-courses",
    subItems: [
      {
        title: "Online Courses",
        description: "At Comfort of your home",
        courseCount: 8,
        href: "/teacher-courses/online",
        image: "/img1.png",
      },
      {
        title: "Offline - in studio",
        description: "We have 20+ studios",
        courseCount: 8,
        href: "/teacher-courses/offline",
        image: "/img2.png",
      },
      {
        title: "Pre-recorded classes",
        description: "access anytime, anywhere",
        courseCount: 8,
        href: "/teacher-courses/pre-recorded",
        image: "/img3.png",
      },
    ],
  },
  {
    label: "Advanced Certifications",
    href: "/advanced-certifications",
    subItems: [
      {
        title: "Online Certifications",
        description: "Learn from anywhere",
        courseCount: 6,
        href: "/advanced-certifications/online",
        image: "/img1.png",
      },
      {
        title: "In-studio Certifications",
        description: "Hands-on training",
        courseCount: 4,
        href: "/advanced-certifications/in-studio",
        image: "/img2.png",
      },
    ],
  },
  {
    label: "Yoga Courses",
    href: "/yoga-courses",
    subItems: [
      {
        title: "Online Courses",
        description: "At Comfort of your home",
        courseCount: 10,
        href: "/yoga-courses/online",
        image: "/img1.png",
      },
      {
        title: "Offline - in studio",
        description: "We have 20+ studios",
        courseCount: 12,
        href: "/yoga-courses/offline",
        image: "/img2.png",
      },
      {
        title: "Pre-recorded classes",
        description: "access anytime, anywhere",
        courseCount: 6,
        href: "/yoga-courses/pre-recorded",
        image: "/img3.png",
      },
    ],
  },
];

const plainLinks = [
  { label: "Workshops", href: "/workshops" },
  { label: "Our Centers", href: "/centers" },
  { label: "About Bodhi", href: "/about" },
];

function DropdownItem({ item }: { item: DropdownSubItem }) {
  return (
    <NavigationMenuLink
      href={item.href}
      className="flex items-start gap-3 rounded-lg p-3 transition-colors bg-transparent hover:bg-muted"
    >
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-ui text-sm font-medium text-text-primary">
          {item.title}
        </span>
        <span className="font-ui text-xs text-text-tertiary">
          {item.description}
        </span>
        <span className="mt-1 font-ui text-xs text-text-tertiary/70">
          {item.courseCount} Courses
        </span>
      </div>
    </NavigationMenuLink>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white">
      <Container className="flex items-center justify-between gap-10 py-3">
        {/* Logo */}
        <Link href="/" className="flex flex-col shrink-0 leading-none">
          <span className="font-display italic font-normal text-[32px] leading-none tracking-[-0.011em] text-black">
            Bodhi
          </span>
          <span className="mt-1 font-tagline font-semibold text-[12px] uppercase tracking-[0.246em] text-black/60">
            School of Yoga
          </span>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-x-[39px]">
            {dropdownItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuTrigger className="bg-transparent font-ui text-[17px] font-medium text-black hover:bg-transparent hover:text-black data-popup-open:bg-transparent px-0 h-auto gap-2">
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-[300px] p-2">
                  <div className="flex flex-col gap-1">
                    {item.subItems.map((subItem) => (
                      <DropdownItem key={subItem.title} item={subItem} />
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            {plainLinks.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink
                  href={item.href}
                  className="inline-flex items-center font-ui text-[17px] font-medium text-black hover:text-black transition-colors px-0 h-auto bg-transparent"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side: Search + CTA */}
        <div className="hidden lg:flex items-center gap-[10px] shrink-0">
          <button
            className="flex items-center justify-center size-11 rounded-full text-text-primary hover:bg-black/5 transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" strokeWidth={2} />
          </button>
          <Link
            href="/enquire"
            className="inline-flex h-11 items-center justify-center rounded-[36px] bg-brand-shade px-8 font-ui text-[14px] font-semibold tracking-[0.019em] text-text-primary transition-[transform,filter] duration-150 hover:brightness-[1.05] active:scale-[0.98]"
          >
            Enquire Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t bg-white"
          >
            <nav className="flex flex-col p-4 gap-1">
              {dropdownItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 font-ui text-[15px] font-medium text-text-primary hover:bg-black/5 transition-colors rounded-md"
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </Link>
              ))}
              {plainLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 font-ui text-[15px] font-medium text-text-primary hover:bg-black/5 transition-colors rounded-md"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 mt-3 pt-3 border-t px-3">
                <button
                  className="flex items-center justify-center size-10 rounded-full text-text-primary hover:bg-black/5 transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
                <Link
                  href="/enquire"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-[36px] bg-brand-shade px-6 font-ui text-[14px] font-semibold text-text-primary transition-[transform,filter] duration-150 hover:brightness-[1.05] active:scale-[0.98]"
                >
                  Enquire Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
