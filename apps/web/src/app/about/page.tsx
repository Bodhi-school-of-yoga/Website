import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutPillarsSection } from "@/components/sections/about-pillars-section";
import { AboutStatsBar } from "@/components/sections/about-stats-bar";
import { AboutStorySection } from "@/components/sections/about-story-section";
import { AboutVisionMissionSection } from "@/components/sections/about-vision-mission-section";
import { ClosingCtaSection } from "@/components/sections/closing-cta-section";
import {
  TestimonialsSection,
  type TestimonialItem,
} from "@/components/sections/testimonials-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About — Bodhi School of Yoga",
  description:
    "Learn about Bodhi Yoga Studio — our story, philosophy, and commitment to mindful practice.",
};

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "aanya",
    quote:
      "I came in to lose weight. I left able to teach a class — and a calmer person at home. The training is honest, and that's rare.",
    authorName: "Aanya",
    authorMeta: "TTC Cohort 11. Now teaching in Goa.",
    avatarSrc: "/images/testimonials/aanya.jpg",
    avatarAlt: "Aanya, TTC Cohort 11 graduate",
  },
  {
    id: "ravi",
    quote:
      "The back pain workshop did more in two days than two years of physiotherapy. I've recommended Bodhi to everyone I know.",
    authorName: "Ravi",
    authorMeta: "Workshop participant",
    avatarSrc: "/images/testimonials/ravi.jpg",
    avatarAlt: "Ravi, back pain workshop participant",
  },
  {
    id: "lena",
    quote:
      "I practice with Bodhi online from Berlin. Six in the morning, India time. It's the most consistent thing in my week.",
    authorName: "Lena",
    authorMeta: "Online student, 2 years",
    avatarSrc: "/images/testimonials/lena.jpg",
    avatarAlt: "Lena, long-term online student",
  },
];

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

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <AboutHero />
        <AboutStatsBar />
        <AboutPillarsSection />
        <AboutStorySection />
        <AboutVisionMissionSection />
        <TestimonialsSection
          eyebrow="A Path to Wellness"
          heading="What our students say"
          testimonials={TESTIMONIALS}
          priorityFirst
        />
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
