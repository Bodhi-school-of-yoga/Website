import type { Metadata } from "next";

import { CentersSection } from "@/components/sections/centers-section";
import { ClosingCtaSection } from "@/components/sections/closing-cta-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Our Centers — Bodhi School of Yoga",
  description: "Find a Bodhi center near you across India.",
};

const FOOTER_BRAND = {
  wordmark: "Bodhi",
  tagline: "A school for teachers, a home for seekers.\nPractice, taught honestly.",
  url: {
    label: "bodhischoolofyoga.com",
    href: "https://bodhischoolofyoga.com",
  },
};

const FOOTER_COLUMNS = [
  {
    heading: "School",
    links: [
      { label: "Teacher Training", href: "/teacher-training" },
      { label: "Workshops", href: "/workshops" },
      { label: "Classes", href: "/classes" },
      { label: "Faculty", href: "/faculty" },
      { label: "Lineage", href: "/lineage" },
    ],
  },
  {
    heading: "Stay close",
    links: [
      { label: "Newsletter", href: "/newsletter" },
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

const FOOTER_ADDRESS = {
  heading: "Visit",
  lines: ["The Practice Room,", "2nd floor, Quiet Lane", "City  ·  India"],
  action: {
    label: "Get directions →",
    href: "https://maps.google.com",
    external: true,
  },
};

const CLOSING_CTA_CARDS = [
  {
    title: "Free Trial Session",
    body: "50 Mins Session with the option of choosing from 10 slots in a day.",
    ctaLabel: "Join now",
    href: "/trial",
  },
  {
    title: "Speak to us",
    body: "Talk to a counsellor who can assess and offer recommendations.",
    ctaLabel: "Contact us",
    href: "/contact",
  },
  {
    title: "Take a Guided Path",
    body: "Our assessment will guide you toward the direction best suited to your experience.",
    ctaLabel: "Start now",
    href: "/assessment",
  },
];

export default function OurCentersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <CentersSection />
        <ClosingCtaSection
          eyebrow="Bodhi"
          headingLead="Begin where"
          headingAccent="you are."
          subhead="Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that."
          primaryCta={{ label: "Try a class, free", href: "/classes" }}
          cards={CLOSING_CTA_CARDS}
        />
      </main>
      <SiteFooter
        brand={FOOTER_BRAND}
        columns={FOOTER_COLUMNS}
        address={FOOTER_ADDRESS}
      />
    </>
  );
}
