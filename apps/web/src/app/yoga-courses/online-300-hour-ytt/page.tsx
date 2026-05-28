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
        breadcrumb="Home  /  Yoga courses"
        titleLead="Online 300 Hour Yoga Teacher"
        titleAccent="Training — RYT 300"
        subtitle="Master the art of yoga in the air. Build strength, grace, and confidence while learning to teach this unique practice."
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
          { label: "Curriculum", href: "#curriculum" },
          { label: "Eligibility", href: "#eligibility" },
          { label: "Overall", href: "#instructors" },
        ]}
      />

      <RevealOnScroll as="section" id="overview" className="scroll-mt-[160px]">
        <CourseOverviewSection
          eyebrow="Overview"
          heading="Deepen Your Practice, Advance Your Teaching"
          paragraphs={[
            "The online 300-hour YTT improves a trainer's comprehension of core yoga principles and teachings covered in the RYT200 TTC worldwide yoga certification programme. Our yoga teacher training module equips students with more sophisticated yoga techniques in line with current trends, allowing them to instruct their students with confidence in the future.",
            "After completing this advanced course, you will be certified as a RYT300 international yoga trainer and will be able to launch a successful career.",
            "This 300 Hour TTC offered by Bodhi School of Yoga is accredited and recognised by Yoga Alliance. On a journey of self-discovery and profound transformation, our 300-Hour Yoga Teacher Training Course is carefully curated—designed to elevate both your personal practice and teaching skills.",
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
              icon: "leaf",
              title: "Therapeutic & Fun",
              body: "Enjoy emotional release through playful, healing practice.",
            },
            {
              icon: "strength",
              title: "Build Strength",
              body: "Improve core stability, balance, and control.",
            },
            {
              icon: "technology",
              title: "Teach with an Edge",
              body: "Gain a unique certification and grow your yoga career with a skill few teachers have.",
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
          ]}
          nextHref="#eligibility"
        />
      </RevealOnScroll>

      <section id="eligibility" className="scroll-mt-[160px]">
        <CourseEligibilitySection
          eyebrow="Eligibility"
          heading="Is This Course Right For You?"
          items={[
            "RYT200 TTC completion from Bodhi or any other institute",
            "Age group: 18–55 years",
            "Enthusiastic housewives, fitness trainers, dance instructors, etc.",
            "Anybody passionate to become a professional yoga instructor",
            "Anybody who wants to be self employed",
            "Anybody who wants to become financially independent",
            "Anybody who is striving to stay in shape",
            "Anybody who is ardent to serve the society",
          ]}
          leftImage="/images/courses/yoga-300-hour-ytt/eligibility.png"
          rightImage="/online-300.png"
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
            "Becoming a Yoga Trainer entails dedicating oneself to the Yoga practice. It's all about putting Yoga's philosophy and expertise into practice on a daily basis. The goal is to become a powerful individual who, by their presence, emanates the Yoga philosophy. It is a road of bravery, devotion, and physical and mental self-discipline.",
            "The goal of the Level 3 Yoga Teacher Training Certification Course is to instil in pupils the spirit of a Yogi. This programme is suitable for active yoga practitioners, and upon completion, participants will get an international yoga teacher certification for RYT300.",
          ]}
        />
      </section>

      <section id="pre-requisites" className="scroll-mt-[160px]">
        <PreRequisitesSection
          eyebrow="Eligibility"
          heading="Pre-Requisites"
          items={[
            "Basic understanding of yoga postures.",
            "Completion of a 200 Hour Yoga Teacher Training (RYT-200).",
            "Physically fit to perform inversions and aerial movements.",
            "Minimum 6 months of consistent personal yoga practice.",
            "Willingness to explore new boundaries of body and breath.",
            "Commitment to complete the full course duration and assignments.",
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
          heading="Meet Your Instructors"
          instructors={[
            {
              name: "Atheesh Kumar",
              role: "Certified Aerial Yoga Instructor · Bodhi School of Yoga",
              avatar: "/images/trainers/atheesh-kumar.png",
            },
            {
              name: "Sneha Shankar",
              role: "Certified Aerial Yoga Instructor · Bodhi School of Yoga",
              avatar: "/images/trainers/sneha-shankar.png",
            },
            {
              name: "VijayaRaghavan",
              role: "Certified Aerial Yoga Instructor · Bodhi School of Yoga",
              avatar: "/images/trainers/vijayaraghavan.png",
            },
            {
              name: "Prajakta Jadhav",
              role: "Certified Aerial Yoga Instructor · Bodhi School of Yoga",
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
              question: "Do I need prior experience in aerial yoga?",
              answer:
                "No prior aerial yoga experience is required. A basic understanding of yoga postures and physical fitness to perform inversions is sufficient to join this course.",
              defaultOpen: true,
            },
            {
              question: "Is this TTC Yoga Alliance certified?",
              answer:
                "Yes — Bodhi School of Yoga is a Yoga Alliance Registered School. Graduates of this 300 Hour TTC can register with Yoga Alliance and earn the RYT 300 / RYT 500 designation.",
            },
            {
              question: "Will I get to practice on hammocks during training?",
              answer:
                "Yes — every session is hands-on. You'll practice rigging, transitions, and aerial sequencing on the hammock from day one of the training.",
            },
            {
              question: "Can this course help me start my own aerial yoga classes?",
              answer:
                "Absolutely. The teaching methodology module covers studio setup, class pricing, marketing, and safety paperwork so you can launch and lead your own aerial classes with confidence.",
            },
          ]}
        />
      </RevealOnScroll>

      <RevealOnScroll as="section" id="more-courses">
        <PopularCoursesSection
          eyebrow="More courses"
          heading="Lead to more courses from us"
          subhead="Deepen your wisdom and elevate your yoga career with our specialized yoga certifications."
          courses={[
            {
              title: "Online Weight Loss Coach Certification",
              image: "/images/programs/weight-loss-coach.png",
              meta: [
                { icon: "clock", label: "4 Weeks" },
                { icon: "monitor", label: "Online" },
                { icon: "globe", label: "English" },
              ],
              instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
              ctaLabel: "View Program",
              ctaHref: "/yoga-courses/online-weight-loss-coach",
            },
            {
              title: "Online Mudra Therapy Yoga Teacher Training",
              image: "/images/programs/mudra-therapy.png",
              meta: [
                { icon: "clock", label: "2 Weeks" },
                { icon: "monitor", label: "Online" },
                { icon: "globe", label: "English" },
              ],
              instructor: { initials: "PP", name: "Prarthana Patel" },
              ctaLabel: "View Program",
              ctaHref: "/yoga-courses/online-mudra-therapy-ytt",
            },
            {
              title: "Online MAT Pilates Instructor Certification",
              image: "/images/programs/mat-pilates.png",
              meta: [
                { icon: "clock", label: "4 Weeks" },
                { icon: "monitor", label: "Online" },
                { icon: "globe", label: "English" },
              ],
              instructor: { initials: "LY", name: "Lakshmi Yalamudi" },
              ctaLabel: "View Program",
              ctaHref: "/yoga-courses/online-mat-pilates",
            },
          ]}
        />
      </RevealOnScroll>

      <ClosingCtaSection
        eyebrow="Bodhi"
        headingLead="Begin where"
        headingAccent="you are."
        subhead="Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week—there's a door at Bodhi for that."
        primaryCta={{
          label: "Try a Class, Free",
          href: "/enquire?intent=try-a-class",
        }}
        theme="dark"
      />

      <SiteFooterBlock showCta={false} />
    </main>
  );
}
