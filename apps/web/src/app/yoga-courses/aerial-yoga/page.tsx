import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { CourseHeroSection } from "@/components/sections/course-hero-section";
import { CourseSectionNav } from "@/components/sections/course-section-nav";
import { CourseOverviewSection } from "@/components/sections/course-overview-section";
import { HighlightsSection } from "@/components/sections/highlights-section";
import { CurriculumSection } from "@/components/sections/curriculum-section";
import { PreRequisitesSection } from "@/components/sections/pre-requisites-section";
import { InstructorsSection } from "@/components/sections/instructors-section";
import { FaqSection } from "@/components/sections/faq-section";
import { PopularCoursesSection } from "@/components/sections/popular-courses-section";
import { ClosingCtaSection } from "@/components/sections/closing-cta-section";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

const ASSET = (name: string) => `/figma/node-1-7667/${name}`;
const TEACHER_ASSET = (name: string) => `/figma/node-1-8326/${name}`;

export const metadata: Metadata = {
  title: "Aerial Yoga Course — Bodhi School of Yoga",
  description:
    "Master the art of yoga in the air. Build strength, grace, and confidence as you learn aerial yoga sequences with the support of hammocks.",
};

export default function AerialYogaCoursePage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface-1">
      <SiteHeader />

      <CourseHeroSection
        breadcrumb="Home  /  Yoga courses  /  Aerial Yoga Course"
        titleLead="Aerial Yoga"
        titleAccent="Course"
        subtitle="Master the art of yoga in the air. Build strength, grace, and confidence as you learn aerial yoga sequences using the support of hammocks — a unique and therapeutic practice for all levels."
        meta={[
          { icon: "calendar", label: "Sat & Sun" },
          { icon: "location", label: "Studio" },
          { icon: "clock", label: "4:00 PM – 6:00 PM" },
          { icon: "globe", label: "English" },
        ]}
        ctaLabel="Reserve Your Spot Now"
        ctaHref="/enquire?course=aerial-yoga"
        heroImage={ASSET("imgrectangle161124051.png")}
      />

      <CourseSectionNav
        items={[
          { label: "Overview", href: "#overview" },
          { label: "Highlights", href: "#highlights" },
          { label: "Circulum", href: "#curriculum" },
          { label: "Eligibility", href: "#pre-requisites" },
          { label: "Overall", href: "#instructors" },
        ]}
      />

      <RevealOnScroll as="section" id="overview" className="scroll-mt-[160px]">
        <CourseOverviewSection
          eyebrow="Overview"
          heading="Elevate Your Practice — Literally"
          paragraphs={[
            "Master the art of yoga in the air with Bodhi's Aerial Yoga Course. Build strength, grace, and confidence while exploring this unique and therapeutic style of practice with the support of aerial hammocks.",
            "You'll combine traditional yoga postures with graceful aerial movements — learning how inversions decompress the spine, build core stability, and create a deeply healing experience for body and mind.",
          ]}
        />
      </RevealOnScroll>

      <RevealOnScroll
        as="section"
        id="highlights"
        className="scroll-mt-[160px]"
      >
        <HighlightsSection
          eyebrow="Highlights"
          heading="What You'll Gain"
          items={[
            {
              icon: "yoga",
              title: "Yoga Meets Flight",
              body: "Combine traditional poses with graceful aerial movements.",
            },
            {
              icon: "align-center",
              title: "Relieve & Realign",
              body: "Inversions decompress the spine and boost flexibility.",
            },
            {
              icon: "strength",
              title: "Build Strength",
              body: "Improve core stability, balance, and control.",
            },
            {
              icon: "leaf",
              title: "Therapeutic & Fun",
              body: "Enjoy emotional release through playful, healing practice.",
            },
            {
              icon: "technology",
              title: "Teach with an Edge",
              body: "Gain a unique credential and grow your yoga career with a skill few teachers have.",
            },
            {
              icon: "people",
              title: "Join a Community",
              body: "Connect with passionate practitioners and expert teachers at Bodhi School of Yoga.",
            },
          ]}
        />
      </RevealOnScroll>

      <RevealOnScroll
        as="section"
        id="curriculum"
        className="scroll-mt-[160px]"
      >
        <CurriculumSection
          eyebrow="Curriculum"
          heading="Course Syllabus"
          items={[
            {
              title: "Rigging Essentials",
              body: "How to safely set up and use aerial hammocks.",
            },
            {
              title: "Aerial Sequences",
              body: "Beginner to advanced aerial yoga flows.",
            },
            {
              title: "Teaching Methodology",
              body: "Conducting private and group aerial sessions.",
            },
            {
              title: "Alignment & Anatomy in the Air",
              body: "How aerial postures impact muscles and joints.",
            },
            {
              title: "Contraindications & Safety",
              body: "Modifications for common conditions.",
            },
            {
              title: "Business of Aerial Yoga",
              body: "Building your brand and classes.",
            },
          ]}
          nextHref="#pre-requisites"
        />
      </RevealOnScroll>

      <section id="pre-requisites" className="scroll-mt-[160px]">
        <PreRequisitesSection
          eyebrow="Eligibility"
          heading="Pre-Requisites"
          items={[
            "Basic understanding of yoga postures.",
            "Physically fit to perform inversions and aerial movements.",
            "Willingness to explore new boundaries of body and breath.",
            "Comfortable working with hammocks and at moderate heights.",
            "Stable health — no recent surgeries or vertigo conditions.",
            "Open mind and a willingness to play.",
          ]}
          leftImage={ASSET("imgrectangle161124055.png")}
          rightImage={ASSET("imgrectangle161124054.png")}
          leftImageAlt="Aerial yoga practitioner inverted in a hammock"
          rightImageAlt="Aerial yoga class in session"
        />
      </section>

      <RevealOnScroll
        as="section"
        id="instructors"
        className="scroll-mt-[160px]"
      >
        <InstructorsSection
          eyebrow="Your Guide"
          heading="Meet Your Instructor's"
          instructors={[
            {
              name: "Atheesh Kumar",
              role: "Certified Aerial Yoga Instructor",
              avatar: ASSET("imgbackground.png"),
            },
            {
              name: "Sneha Shankar",
              role: "Certified Aerial Yoga Instructor",
              avatar: ASSET("imgbackground1.png"),
            },
            {
              name: "Vijaya Raghavan",
              role: "Certified Aerial Yoga Instructor",
              avatar: ASSET("imgbackground2.png"),
            },
            {
              name: "Prajakta Jadhav",
              role: "Certified Aerial Yoga Instructor",
              avatar: ASSET("imgbackground3.png"),
            },
          ]}
          nextHref="#faq"
        />
      </RevealOnScroll>

      <RevealOnScroll as="section" id="faq" className="scroll-mt-[160px]">
        <FaqSection
          eyebrow="FAQ"
          heading="Frequently Asked Questions"
          items={[
            {
              question: "Do I need prior experience in aerial yoga?",
              answer:
                "No prior aerial yoga experience is required. A basic understanding of yoga postures and physical fitness to perform inversions is sufficient to join this course.",
              defaultOpen: true,
            },
            {
              question: "Is this course Yoga Alliance recognised?",
              answer:
                "Bodhi is a Yoga Alliance Registered School (RYS-200, RYS-300). The Aerial Yoga Course counts toward your continuing-education hours.",
            },
            {
              question: "Will I practice on hammocks during the course?",
              answer:
                "Yes — every session is hands-on. You'll practice rigging, transitions, and sequencing on the hammock from day one.",
            },
            {
              question:
                "Can this course help me start my own aerial yoga classes?",
              answer:
                "Absolutely. The 'Business of Aerial Yoga' module covers studio setup, class pricing, marketing, and safety paperwork so you can teach with confidence.",
            },
          ]}
        />
      </RevealOnScroll>

      <RevealOnScroll as="section" id="more-courses">
        <PopularCoursesSection
          eyebrow="More courses"
          heading="Lead to more courses from us"
          subhead="Deepen your practice with another Bodhi programme. Each course is taught by core faculty and grounded in classical lineage."
          courses={[
            {
              title: "Online Weight Loss Coach Certification",
              image: TEACHER_ASSET("course-weight-loss.png"),
              meta: [
                { icon: "clock", label: "12 weeks" },
                { icon: "monitor", label: "Online" },
              ],
              instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
              ctaLabel: "Enrol Now",
              ctaHref: "/yoga-courses/aerial-yoga",
            },
            {
              title: "Online Mudra Therapy Yoga Teacher Training",
              image: TEACHER_ASSET("course-mudra-therapy.png"),
              meta: [
                { icon: "clock", label: "8 weeks" },
                { icon: "monitor", label: "Online" },
              ],
              instructor: { initials: "PP", name: "Prarthana Patel" },
              ctaLabel: "Enrol Now",
              ctaHref: "/yoga-courses/online-300-hour-ytt",
            },
            {
              title: "Online MAT Pilates Instructor Certification",
              image: TEACHER_ASSET("course-mat-pilates.png"),
              meta: [
                { icon: "clock", label: "10 weeks" },
                { icon: "monitor", label: "Online" },
              ],
              instructor: { initials: "LY", name: "Lakshmi Yalamudi" },
              ctaLabel: "Enrol Now",
              ctaHref: "/yoga-courses/aerial-yoga",
            },
          ]}
        />
      </RevealOnScroll>

      <ClosingCtaSection
        eyebrow="Bodhi"
        headingLead="Begin where"
        headingAccent="you are."
        subhead="One steady practice, taught with care. Whether you want to teach, heal, or simply breathe with people once a week — there's a door at Bodhi for that."
        primaryCta={{
          label: "Try a class, free",
          href: "/enquire?intent=try-a-class",
        }}
        theme="dark"
      />

      <SiteFooterBlock showCta={false} />
    </main>
  );
}
