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
  primaryCta: { label: "Enquire Now", href: "/contact" },
};

// ---------------------------------------------------------------------------
// Home-page columns spec (T9)
//
// The home page uses a different footer shape (Brand + 3 columns:
// School / Visit / Stay close) per Figma 1:619. External hrefs MUST stay
// in sync with the defaults above — Instagram, YouTube, Get directions,
// Newsletter and Email URLs are copied verbatim from DEFAULT_COLUMNS /
// DEFAULT_ADDRESS so the two surfaces never drift apart.
// ---------------------------------------------------------------------------

const PRESERVED_INSTAGRAM_HREF = DEFAULT_COLUMNS[2].links[1].href; // https://instagram.com/bodhischoolofyoga
const PRESERVED_YOUTUBE_HREF = DEFAULT_COLUMNS[2].links[2].href; // https://youtube.com/@bodhischoolofyoga
const PRESERVED_EMAIL_HREF = DEFAULT_COLUMNS[2].links[3].href; // mailto:hello@bodhischoolofyoga.com
const PRESERVED_NEWSLETTER_HREF = DEFAULT_COLUMNS[2].links[0].href; // /contact (existing "Contact Us" link doubles as the newsletter target)
const PRESERVED_DIRECTIONS_HREF = DEFAULT_ADDRESS.action!.href; // https://maps.google.com

export const HOME_FOOTER_BRAND: SiteFooterProps["brand"] = {
  wordmark: "Arihanrt",
  tagline:
    "A school for teachers, a home for seekers. Practice, taught honestly.",
  url: "bodhischoolofyoga.com",
};

export const HOME_FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "School",
    links: [
      { label: "Teacher Training", href: "/teacher-courses/online" },
      { label: "Workshops", href: "/workshops" },
      { label: "Classes", href: "/yoga-courses/online" },
      { label: "Faculty", href: "/our-trainers" },
      { label: "Lineage", href: "/about" },
    ],
  },
  {
    heading: "Visit",
    lines: ["The Practice Room,", "2nd floor, Quiet Lane", "City  ·  India"],
    links: [
      {
        label: "Get directions →",
        href: PRESERVED_DIRECTIONS_HREF,
        external: true,
      },
    ],
  },
  {
    heading: "Stay close",
    links: [
      { label: "Newsletter", href: PRESERVED_NEWSLETTER_HREF },
      {
        label: "Instagram",
        href: PRESERVED_INSTAGRAM_HREF,
        external: true,
      },
      {
        label: "YouTube",
        href: PRESERVED_YOUTUBE_HREF,
        external: true,
      },
      { label: "Email us", href: PRESERVED_EMAIL_HREF },
    ],
  },
];

export const HOME_FOOTER_LEGAL = {
  copyright:
    "© Bodhi School of Yoga  ·  Yoga Alliance Registered School (RYS-200, RYS-300)",
  tagline: "Designed quietly. Practised daily.",
} as const;

export type SiteFooterBlockProps = {
  /** Override the closing-CTA copy/CTA. Omit to use the site default. */
  cta?: Partial<ClosingCtaSectionProps>;
  /** Set false to render only the footer (no closing CTA above). */
  showCta?: boolean;
  brand?: SiteFooterProps["brand"];
  columns?: FooterColumn[];
  address?: FooterAddressColumn;
  /** Legal bar overrides — copyright (left) and tagline (right). */
  legal?: { copyright?: string; tagline?: string };
};

export function SiteFooterBlock({
  cta,
  showCta = true,
  brand = HOME_FOOTER_BRAND,
  columns = HOME_FOOTER_COLUMNS,
  address,
  legal,
}: SiteFooterBlockProps = {}) {
  const ctaProps: ClosingCtaSectionProps = { ...DEFAULT_CTA, ...cta };
  return (
    <>
      {showCta && <ClosingCtaSection {...ctaProps} />}
      <SiteFooter
        brand={brand}
        columns={columns}
        address={address}
        legalLeft={legal?.copyright}
        legalRight={legal?.tagline}
      />
    </>
  );
}
