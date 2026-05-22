import type { Metadata } from "next";

import { AccreditationsSection } from "@/components/sections/accreditations-section";
import { ClosingCtaSection } from "@/components/sections/closing-cta-section";
import { MarketingHero } from "@/components/sections/marketing-hero";
import {
  PopularCoursesSection,
  type PopularCourse,
} from "@/components/sections/popular-courses-section";
import {
  TestimonialsSection,
  type TestimonialItem,
} from "@/components/sections/testimonials-section";
import { WhyBodhiSection } from "@/components/sections/why-bodhi-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Offline Yoga Teacher Training Courses | Bodhi School of Yoga",
  description:
    "Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that.",
};

const FEATURED_COURSES: PopularCourse[] = [
  {
    title: "Bala Yoga Teacher Training",
    image: "/images/programs/bala-yoga-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "globe", label: "Offline" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/programs/certifications/bala-yoga",
  },
  {
    title: "Face Yoga Teacher Training",
    image: "/images/programs/face-yoga-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "monitor", label: "Online" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/programs/certifications/face-yoga",
  },
  {
    title: "Mudra Therapy Yoga Teacher Training",
    image: "/images/programs/pranayama-nervous-system.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "monitor", label: "Online" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/programs/certifications/mudra-therapy",
  },
  {
    title: "MAT Pilates Instructor Certification",
    image: "/images/programs/mat-pilates-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "globe", label: "Offline" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/programs/certifications/mat-pilates-instructor",
  },
  {
    title: "Weight Loss Coach Certification",
    image: "/images/programs/weight-loss-coach-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "monitor", label: "Online" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/programs/certifications/weight-loss-coach",
  },
];

const TOP_POPULAR_COURSES: PopularCourse[] = [
  {
    title: "Pranayama for the Nervous System",
    image: "/images/programs/pranayama-nervous-system.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "monitor", label: "Online" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/programs/certifications/pranayama",
  },
  {
    title: "300 Hour Yoga Teacher Training",
    image: "/images/programs/300-hour-yoga-teacher-training-online.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "monitor", label: "Online" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/programs/certifications/300-hour-ttc",
  },
  {
    title: "Face Yoga Teacher Training",
    image: "/images/programs/face-yoga-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "monitor", label: "Online" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/programs/certifications/face-yoga",
  },
  {
    title: "Weight Loss Coach Certification",
    image: "/images/programs/weight-loss-coach-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "monitor", label: "Online" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/programs/certifications/weight-loss-coach",
  },
  {
    title: "Bala Yoga Teacher Training",
    image: "/images/programs/bala-yoga-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "monitor", label: "Online" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/programs/certifications/bala-yoga",
  },
  {
    title: "MAT Pilates Instructor Certification",
    image: "/images/programs/mat-pilates-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "monitor", label: "Online" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/programs/certifications/mat-pilates-instructor",
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

export default function OfflineCoursesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <MarketingHero
          eyebrow="Yoga Teacher Training"
          headline="Become The Teacher You Were Meant To Be"
          subtitle="Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that."
          backgroundImage="/images/hero/hero-photo.jpg"
        />
        <PopularCoursesSection
          eyebrow="Certification Yoga Courses"
          heading="Deepen your wisdom and elevate your yoga career with our specialized yoga certifications."
          subhead=""
          courses={FEATURED_COURSES}
        />
        <PopularCoursesSection
          eyebrow="Top Popular Yoga Course"
          heading="Yoga Teacher Training Courses"
          subhead="Deepen your wisdom and elevate your yoga career with our specialized yoga certifications."
          courses={TOP_POPULAR_COURSES}
        />
        <AccreditationsSection
          heading="Recognizing the Global Impact of Yoga"
          description="Deepen your wisdom and elevate your yoga career with our specialized yoga certifications."
          items={ACCREDITATIONS}
        />
        <WhyBodhiSection />
        <ClosingCtaSection
          eyebrow="Bodhi"
          headingLead="Begin where"
          headingAccent="you are."
          subhead="Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that."
          primaryCta={{ label: "Try a class, free", href: "/trial" }}
          cards={CLOSING_CTA_CARDS}
        />
        <TestimonialsSection
          eyebrow="A Path to Wellness"
          heading="What our students say"
          testimonials={TESTIMONIALS}
          priorityFirst
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
