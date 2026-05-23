import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutPillarsSection } from "@/components/sections/about-pillars-section";
import { AboutStatsBar } from "@/components/sections/about-stats-bar";
import { AboutStorySection } from "@/components/sections/about-story-section";
import { AboutVisionMissionSection } from "@/components/sections/about-vision-mission-section";
import {
  TestimonialsSection,
  type TestimonialItem,
} from "@/components/sections/testimonials-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
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
      </main>
      <SiteFooterBlock cta={{ primaryCta: { label: "Try a class, free", href: "/classes" } }} />
    </>
  );
}
