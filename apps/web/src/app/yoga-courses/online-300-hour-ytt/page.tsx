import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { CourseHeroSection } from "@/components/sections/course-hero-section";
import { CourseSectionNav } from "@/components/sections/course-section-nav";
import { CourseOverviewSection } from "@/components/sections/course-overview-section";
import { HighlightsSection } from "@/components/sections/highlights-section";
import { CurriculumSection } from "@/components/sections/curriculum-section";
import { CourseEligibilitySection } from "@/components/sections/course-eligibility-section";
import { CertificationBannerSection } from "@/components/sections/certification-banner-section";
import { PreRequisitesSection } from "@/components/sections/pre-requisites-section";
import { InstructorsSection } from "@/components/sections/instructors-section";
import { FaqSection } from "@/components/sections/faq-section";
import { PopularCoursesSection } from "@/components/sections/popular-courses-section";
import { ClosingCtaSection } from "@/components/sections/closing-cta-section";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";


export const metadata: Metadata = {
  title: "Online 300 Hour Yoga Teacher Training — RYT 300",
  description:
    "Deepen your practice and master the art of teaching with Bodhi's flagship 300 Hour Yoga Teacher Training Course. Built for graduates of a 200 Hour YTT — refines your skills, expands your knowledge, prepares you to teach at an advanced level.",
};

export default function Online300HourYttPage() {
  return (
    <main className="flex min-h-screen flex-col bg-surface-1">
      <SiteHeader />

      <CourseHeroSection
        breadcrumb="Home  /  Yoga courses  /  Online 300 hour yoga teacher training course ryt 300"
        titleLead="Online 300 Hour Yoga Teacher"
        titleAccent="Training — RYT 300"
        subtitle="Deepen your practice and master the art of teaching with our flagship 300 Hour Yoga Teacher Training Course. Designed for committed yogis, this course refines your skills, expands your knowledge, and prepares you to teach at an advanced level."
        meta={[
          { icon: "calendar", label: "Sat & Sun" },
          { icon: "location", label: "Studio" },
          { icon: "clock", label: "4:00 PM – 6:00 PM" },
          { icon: "globe", label: "English" },
        ]}
        ctaLabel="Reserve Your Spot Now"
        ctaHref="/enquire?course=online-300-hour-ytt"
        heroImage="/images/courses/yoga-300-hour-ytt/hero.png"
      />

      <CourseSectionNav
        items={[
          { label: "Overview", href: "#overview" },
          { label: "Highlights", href: "#highlights" },
          { label: "Circulum", href: "#curriculum" },
          { label: "Eligibility", href: "#eligibility" },
          { label: "Overall", href: "#instructors" },
        ]}
      />

      <RevealOnScroll as="section" id="overview" className="scroll-mt-[160px]">
        <CourseOverviewSection
          eyebrow="Overview"
          heading="Deepen Your Practice, Advance Your Teaching"
          paragraphs={[
            "Our 300 Hour Yoga Teacher Training Course at Bodhi School of Yoga is built for graduates of a 200 Hour YTT who are ready to take their practice and teaching to the next level. Through immersive learning, you'll deepen your understanding of advanced asana, anatomy, philosophy, and teaching methodology.",
            "You'll gain the confidence to design intelligent classes, work with diverse student populations, and embody yoga as both a science and a way of life. By the end, you'll graduate as a Registered Yoga Teacher (RYT 500) with Yoga Alliance, ready to teach with depth, clarity, and authority.",
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
              title: "Yoga Meets Insight",
              body: "Combine traditional yoga with deeper philosophical understanding.",
            },
            {
              icon: "align-center",
              title: "Refine & Realign",
              body: "Master alignment, advanced asana, and pranayama techniques.",
            },
            {
              icon: "strength",
              title: "Build Strength",
              body: "Improve core stability, balance, and control in advanced practice.",
            },
            {
              icon: "leaf",
              title: "Teach with an Edge",
              body: "Lead intelligent, inclusive classes and gain RYT 500 certification.",
            },
            {
              icon: "technology",
              title: "Therapeutic & Fun",
              body: "Apply yoga therapy principles and adapt practices to diverse students.",
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
              body: "Advanced sequencing and class design.",
            },
            {
              title: "Aerial Sequences",
              body: "Mastery of advanced asana variations.",
            },
            {
              title: "Teaching Methodology",
              body: "Adapting yoga for diverse student groups.",
            },
            {
              title: "Alignment & Anatomy",
              body: "Functional anatomy applied to teaching.",
            },
          ]}
          nextHref="#eligibility"
        />
      </RevealOnScroll>

      <section id="eligibility" className="scroll-mt-[160px]">
        <CourseEligibilitySection
          eyebrow="Eligibility"
          heading="Is This Course Right For You?"
          items={[
            "200 Hour YTT certificate from a Yoga Alliance accredited school",
            "Age 18 or older",
            "Consistent personal practice (6 months post 200 Hr)",
            "Genuine interest in deepening teaching skills",
            "Commitment to attend all training hours",
            "Open mind and readiness to grow personally",
            "Willingness to engage with anatomy and philosophy",
            "Stable internet for online sessions",
          ]}
          leftImage="/images/courses/yoga-300-hour-ytt/eligibility.png"
          rightImage="/images/courses/yoga-300-hour-ytt/eligibility.png"
          leftImageAlt="Yoga student meditating in lotus pose"
          rightImageAlt="Yoga student meditating in lotus pose"
        />
      </section>

      <section id="certification" className="scroll-mt-[160px]">
        <CertificationBannerSection
          eyebrow="Certification"
          heading="Certification of 300 Hour Yoga Teacher Training"
          panelHeading="Globally Recognised"
          panelParagraphs={[
            "On successful completion of the programme, you'll receive Bodhi's 300 Hour Yoga Teacher Training certificate — registerable with Yoga Alliance to earn the RYT 500 designation, accepted globally as a mark of advanced teaching credibility.",
            "Your certificate confirms not just hours of training, but the depth of practice, the breadth of curriculum, and the authority Bodhi-trained teachers carry into every studio they lead.",
          ]}
        />
      </section>

      <section id="pre-requisites" className="scroll-mt-[160px]">
        <PreRequisitesSection
          eyebrow="Eligibility"
          heading="Pre-Requisites"
          items={[
            "Completion of a 200 Hour Yoga Teacher Training from a Yoga Alliance certified school.",
            "At least 6 months of consistent personal practice after your 200 Hr.",
            "Commitment to attend all training hours — live and recorded.",
            "Open mind and willingness to engage with anatomy and philosophy.",
            "A yoga mat, props, and a quiet practice space.",
            "Stable internet connection for the online classroom.",
          ]}
          leftImage="/images/courses/yoga-300-hour-ytt/prereq-left.png"
          rightImage="/images/courses/yoga-300-hour-ytt/prereq-right.png"
          leftImageAlt="Yoga student practicing a balance pose"
          rightImageAlt="Yoga student practicing meditation"
        />
      </section>

      <RevealOnScroll
        as="section"
        id="instructors"
        className="scroll-mt-[160px]"
      >
        <InstructorsSection
          eyebrow="Instructors"
          heading="Meet Your Instructor's"
          instructors={[
            {
              name: "Atheesh Kumar",
              role: "Founder & Lead Teacher",
              avatar: "/images/trainers/atheesh-kumar.png",
            },
            {
              name: "Sneha Bhandari",
              role: "Senior Faculty",
              avatar: "/images/trainers/sneha-shankar.png",
            },
            {
              name: "Vijay Raghavan",
              role: "Asana & Philosophy",
              avatar: "/images/trainers/vijayaraghavan.png",
            },
            {
              name: "Prajakta",
              role: "Anatomy & Alignment",
              avatar: "/images/trainers/prajakta-jadhav.png",
            },
          ]}
          nextHref="#faq"
        />
      </RevealOnScroll>

      <RevealOnScroll as="section" id="faq" className="scroll-mt-[160px]">
        <FaqSection
          eyebrow="FAQs"
          heading="Frequently Asked Questions"
          items={[
            {
              question: "Is the 200 Hour YTT a strict requirement?",
              answer:
                "Yes. The 300 Hour course is the second stage of teacher training — without the 200 Hour foundation, advanced material will not land. We can guide you to our 200 Hour course first.",
              defaultOpen: true,
            },
            {
              question: "Can I do this course fully online?",
              answer:
                "Yes — the programme runs as a hybrid. Live online sessions plus recorded modules. Studio days are optional but recommended.",
            },
            {
              question: "How is this course assessed?",
              answer:
                "Through attendance, a teaching practicum, written reflections on philosophy and anatomy, and a final teach-back assessed by lead faculty.",
            },
            {
              question: "Will I be RYT 500 after this?",
              answer:
                "Yes — after submitting your 200 Hr + 300 Hr certificates to Yoga Alliance, you can register as a RYT 500.",
            },
          ]}
        />
      </RevealOnScroll>

      <RevealOnScroll as="section" id="more-courses">
        <PopularCoursesSection
          eyebrow="More courses"
          heading="Lead to more courses from us"
          subhead="Continue your practice with another Bodhi-led training. Each programme is built on the same eight-limbed lineage and taught by our core faculty."
          courses={[
            {
              title: "Online Weight Loss Coach Certification",
              image: "/images/programs/weight-loss-coach.png",
              meta: [
                { icon: "clock", label: "12 weeks" },
                { icon: "monitor", label: "Online" },
              ],
              instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
              ctaLabel: "Enrol Now",
              ctaHref: "/yoga-courses/online-weight-loss-coach",
            },
            {
              title: "Online Mudra Therapy Yoga Teacher Training",
              image: "/images/programs/mudra-therapy.png",
              meta: [
                { icon: "clock", label: "8 weeks" },
                { icon: "monitor", label: "Online" },
              ],
              instructor: { initials: "PP", name: "Prarthana Patel" },
              ctaLabel: "Enrol Now",
              ctaHref: "/yoga-courses/online-mudra-therapy-ytt",
            },
            {
              title: "Online MAT Pilates Instructor Certification",
              image: "/images/programs/mat-pilates.png",
              meta: [
                { icon: "clock", label: "10 weeks" },
                { icon: "monitor", label: "Online" },
              ],
              instructor: { initials: "LY", name: "Lakshmi Yalamudi" },
              ctaLabel: "Enrol Now",
              ctaHref: "/yoga-courses/online-mat-pilates",
            },
          ]}
        />
      </RevealOnScroll>

      <ClosingCtaSection
        eyebrow="Bodhi"
        headingLead="Begin where"
        headingAccent="you are."
        subhead="One steady practice, taught with care. Reserve your seat in the next cohort — your training begins on the mat."
        primaryCta={{
          label: "Reserve Your Spot Now",
          href: "/enquire?course=online-300-hour-ytt",
        }}
        theme="dark"
      />

      <SiteFooterBlock showCta={false} />
    </main>
  );
}
