import { AccreditationsSection } from "@/components/sections/accreditations-section";
import { ExperienceHarmonyStatsBand } from "@/components/sections/experience-harmony-stats-band";
import { FounderQuoteSection } from "@/components/sections/founder-quote-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProgramsGridSection } from "@/components/sections/programs-grid-section";
import { SanskritMarqueeStrip } from "@/components/sections/sanskrit-marquee-strip";
import {
  TestimonialsSection,
  type TestimonialItem,
} from "@/components/sections/testimonials-section";
import { WhatWeDoSection } from "@/components/sections/what-we-do-section";
import { WhyBodhiSection } from "@/components/sections/why-bodhi-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

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

const ACCREDITATIONS = [
  {
    logoSrc: "/images/accreditations/yoga-alliance-usa.png",
    logoAlt: "Yoga Alliance, USA logo",
    caption: "Yoga Alliance, USA (YA)",
  },
  {
    logoSrc: "/images/accreditations/aivetc.png",
    logoAlt: "AIVETC logo",
    caption: "AIVETC",
  },
  {
    logoSrc: "/images/accreditations/jyotish-yoga-sastra-university.png",
    logoAlt: "Jyotish Yoga Sastra University logo",
    caption: "Jyotish Yoga Sastra University",
  },
  {
    logoSrc: "/images/accreditations/rys-300.png",
    logoAlt: "Registered Yoga School 300 logo",
    caption: "Registered Yoga School – 300",
  },
  {
    logoSrc: "/images/accreditations/ministry-of-ayush.png",
    logoAlt: "Ministry of Ayush, Government of India logo",
    caption: "Ministry of Ayush, Government of India",
  },
  {
    logoSrc: "/images/accreditations/yoga-certification-board.png",
    logoAlt: "Yoga Certification Board logo",
    caption: "Yoga Certification Board",
  },
  {
    logoSrc: "/images/accreditations/pqms.png",
    logoAlt: "Professional Quality Management Services logo",
    caption: "Professional Quality Management Services",
  },
  {
    logoSrc: "/images/accreditations/rys-200.png",
    logoAlt: "Registered Yoga School 200 logo",
    caption: "Registered Yoga School – 200",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <SanskritMarqueeStrip />
        <FounderQuoteSection />
        <ExperienceHarmonyStatsBand />
        <WhatWeDoSection />
        <WhyBodhiSection />
        <ProgramsGridSection />
        <AccreditationsSection
          heading="Recognizing the Global Impact of Yoga"
          description="Deepen your wisdom and elevate your yoga career with our specialized yoga certifications."
          items={ACCREDITATIONS}
        />
        <TestimonialsSection
          eyebrow="A Path to Wellness"
          heading="What our students say"
          testimonials={TESTIMONIALS}
          priorityFirst
        />
      </main>
      <SiteFooterBlock />
    </>
  );
}
