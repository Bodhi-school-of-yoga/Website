import * as React from "react";

import {
  ClosingCtaSection,
  type ClosingCtaSectionProps,
} from "@/components/sections/closing-cta-section";
import {
  SiteFooter,
  type FooterAddressColumn,
  type FooterColumn,
  type SiteFooterProps,
} from "@/components/site-footer";

const DEFAULT_BRAND: SiteFooterProps["brand"] = {
  wordmark: "Bodhi",
  tagline:
    "A school for teachers, a home for seekers.\nPractice, taught honestly.",
  url: {
    label: "bodhischoolofyoga.com",
    href: "https://bodhischoolofyoga.com",
  },
};

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    heading: "Courses",
    links: [
      { label: "Teacher Courses — Online", href: "/teacher-courses/online" },
      { label: "Teacher Courses — Offline", href: "/teacher-courses/offline" },
      {
        label: "Advanced Certifications",
        href: "/advanced-certifications/online",
      },
      { label: "Yoga Courses", href: "/yoga-courses/online" },
      { label: "Pre-recorded Classes", href: "/pre-recorded-courses" },
      { label: "Workshops", href: "/workshops" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Trainers", href: "/our-trainers" },
      { label: "Our Centers", href: "/our-centers" },
      { label: "Blog", href: "/blog" },
      {
        label: "Tips for Yoga Teachers",
        href: "/tips-to-become-a-successful-yoga-teacher",
      },
    ],
  },
  {
    heading: "Stay close",
    links: [
      { label: "Contact Us", href: "/contact" },
      {
        label: "Instagram",
        href: "https://instagram.com/bodhischoolofyoga",
        external: true,
      },
      {
        label: "YouTube",
        href: "https://youtube.com/@bodhischoolofyoga",
        external: true,
      },
      { label: "Email us", href: "mailto:hello@bodhischoolofyoga.com" },
    ],
  },
];

const DEFAULT_ADDRESS: FooterAddressColumn = {
  heading: "Visit",
  lines: ["The Practice Room,", "2nd floor, Quiet Lane", "City  ·  India"],
  action: {
    label: "Get directions →",
    href: "https://maps.google.com",
    external: true,
  },
};

const DEFAULT_CTA: ClosingCtaSectionProps = {
  eyebrow: "Bodhi",
  headingLead: "Begin where",
  headingAccent: "you are.",
  subhead:
    "Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that.",
  primaryCta: { label: "Try a class, free", href: "/contact" },
};

export type SiteFooterBlockProps = {
  /** Override the closing-CTA copy/CTA. Omit to use the site default. */
  cta?: Partial<ClosingCtaSectionProps>;
  /** Set false to render only the footer (no closing CTA above). */
  showCta?: boolean;
  brand?: SiteFooterProps["brand"];
  columns?: FooterColumn[];
  address?: FooterAddressColumn;
};

export function SiteFooterBlock({
  cta,
  showCta = true,
  brand = DEFAULT_BRAND,
  columns = DEFAULT_COLUMNS,
  address = DEFAULT_ADDRESS,
}: SiteFooterBlockProps = {}) {
  const ctaProps: ClosingCtaSectionProps = { ...DEFAULT_CTA, ...cta };
  return (
    <>
      {showCta && <ClosingCtaSection {...ctaProps} />}
      <SiteFooter brand={brand} columns={columns} address={address} />
    </>
  );
}
