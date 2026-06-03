import { AccreditationsSection } from "@/components/sections/accreditations-section";
import { ExperienceHarmonyStatsBand } from "@/components/sections/experience-harmony-stats-band";
import { FounderQuoteSection } from "@/components/sections/founder-quote-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProgramsGridSection } from "@/components/sections/programs-grid-section";
import { SanskritMarqueeStrip } from "@/components/sections/sanskrit-marquee-strip";
import { VideoTestimonialsSection } from "@/components/sections/video-testimonials-section";
import { TESTIMONIAL_VIDEOS } from "@/data/testimonial-videos";
import { WhatWeDoSection } from "@/components/sections/what-we-do-section";
import { WhyBodhiSection } from "@/components/sections/why-bodhi-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

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
      <main className=" md:mt-0">
        <HeroSection />
        <SanskritMarqueeStrip />
        <FounderQuoteSection />
        <ExperienceHarmonyStatsBand />
        <WhyBodhiSection />
        <ProgramsGridSection />
        <AccreditationsSection
          heading="We are recognised across the world"
          description="Deepen your wisdom and elevate your yoga career with our specialized yoga certifications."
          items={ACCREDITATIONS}
        />
        <VideoTestimonialsSection
          eyebrow="TESTIMONIALS"
          heading="What our students say"
          testimonials={TESTIMONIAL_VIDEOS}
        />
      </main>
   <SiteFooterBlock />
    </>
  );
}
