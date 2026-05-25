// Aerial Yoga Course — single typed data module driving the /courses/aerial-yoga page.
// Mirrors the data-driven pattern of apps/web/src/data/trainers.ts and is consumed by
// apps/web/src/app/courses/aerial-yoga/page.tsx (T8).
//
// Unresolved hrefs flagged by 02_interactions.json — visual-qa must verify these
// routes exist (or stub them) before launch:
//   1. /trainers/[slug]                 (T5 InstructorsSection cards)
//   2. /courses/weight-loss-coach       (PopularCoursesSection card 1)
//   3. /courses/mudra-therapy           (PopularCoursesSection card 2)
//   4. /courses/mat-pilates             (PopularCoursesSection card 3)
//   5. /try                             (ClosingCtaSection primary CTA)
//   6. /free-trial                      (ClosingCtaSection card 1)
//   7. /contact                         (ClosingCtaSection card 2)
//   8. /assessment                      (ClosingCtaSection card 3)

import type { BreadcrumbItem } from "@/components/ui/breadcrumb";
import type { CourseSectionNavItem } from "@/components/sections/course-section-nav";
import type { CourseMetaItem } from "@/components/sections/course-hero-section";

export type AerialYogaHighlightIcon =
  | "feather"
  | "spine"
  | "smile"
  | "leaf"
  | "rocket"
  | "people";

export type AerialYogaHighlightItem = {
  icon: AerialYogaHighlightIcon;
  title: string;
  body: string;
};

export type AerialYogaSyllabusModule = {
  n: string;
  title: string;
  body: string;
};

export type AerialYogaInstructor = {
  name: string;
  role: string;
  image: string;
  slug?: string;
};

export type AerialYogaFaq = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export type AerialYogaRelatedCourse = {
  title: string;
  duration: string;
  format: string;
  language: string;
  instructor: string;
  image: string;
  href: string;
};

export type AerialYogaClosingCard = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export type AerialYogaCourse = {
  slug: string;
  breadcrumb: BreadcrumbItem[];
  hero: {
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    meta: CourseMetaItem[];
    ctaLabel: string;
    ctaHref: string;
    heroImage: string;
  };
  tabs: CourseSectionNavItem[];
  overview: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  highlights: {
    eyebrow: string;
    heading: string;
    items: AerialYogaHighlightItem[];
  };
  syllabus: {
    eyebrow: string;
    heading: string;
    modules: AerialYogaSyllabusModule[];
  };
  preRequisites: {
    eyebrow: string;
    heading: string;
    items: string[];
    leftImage: string;
    rightImage: string;
  };
  instructors: {
    eyebrow: string;
    heading: string;
    people: AerialYogaInstructor[];
  };
  faqs: {
    eyebrow: string;
    heading: string;
    items: AerialYogaFaq[];
  };
  relatedCourses: {
    eyebrow: string;
    heading: string;
    subhead: string;
    courses: AerialYogaRelatedCourse[];
  };
  closingCta: {
    headingLead: string;
    headingAccent: string;
    subhead: string;
    primaryCta: { label: string; href: string };
    cards: AerialYogaClosingCard[];
  };
};

export const aerialYogaCourse: AerialYogaCourse = {
  slug: "aerial-yoga",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Yoga courses", href: "/courses" },
    { label: "Aerial Yoga Course", current: true },
  ],
  hero: {
    titleLead: "Aerial Yoga",
    titleAccent: "Course",
    subtitle:
      "Master the art of yoga in the air. Build strength, grace, and confidence while learning to teach this unique practice.",
    meta: [
      { icon: "calendar", label: "Sat & Sun" },
      { icon: "location", label: "Studio" },
      { icon: "clock", label: "4:00 – 6:00 PM" },
      { icon: "globe", label: "English" },
    ],
    ctaLabel: "Reserve Your Spot Now",
    ctaHref: "/enquire?course=aerial-yoga",
    heroImage: "/images/courses/aerial-yoga/hero.png",
  },
  tabs: [
    { label: "Overview", href: "#overview" },
    { label: "Highlights", href: "#highlights" },
    { label: "Curriculum", href: "#curriculum" },
    { label: "Eligibility", href: "#eligibility" },
    { label: "Overall", href: "#faq" },
  ],
  overview: {
    eyebrow: "OVERVIEW",
    heading: "Elevate Your Practice — Literally",
    paragraphs: [
      "Master the art of yoga in the air with our Aerial Yoga Teacher Training Course at Bodhi School of Yoga. Build strength, grace, and confidence while learning to teach this unique practice.",
      "You'll combine traditional yoga postures with graceful aerial movements — learning how inversions decompress the spine, build core stability, and create a deeply healing experience for your future students.",
    ],
  },
  highlights: {
    eyebrow: "HIGHLIGHTS",
    heading: "What You'll Gain",
    items: [
      {
        icon: "feather",
        title: "Yoga Meets Flight",
        body: "Combine traditional poses with graceful aerial movements.",
      },
      {
        icon: "spine",
        title: "Relieve & Realign",
        body: "Inversions decompress the spine and boost flexibility.",
      },
      {
        icon: "smile",
        title: "Therapeutic & Fun",
        body: "Enjoy emotional release through playful, healing practice.",
      },
      {
        icon: "leaf",
        title: "Build Strength",
        body: "Improve core stability, balance, and control.",
      },
      {
        icon: "rocket",
        title: "Teach with an Edge",
        body: "Gain a unique certification and grow your yoga career with a skill few teachers have.",
      },
      {
        icon: "people",
        title: "Join a Community",
        body: "Connect with passionate practitioners and expert teachers at Bodhi School of Yoga.",
      },
    ],
  },
  syllabus: {
    eyebrow: "CURRICULUM",
    heading: "Course Syllabus",
    modules: [
      {
        n: "01",
        title: "Rigging Essentials",
        body: "How to safely set up and use aerial hammocks",
      },
      {
        n: "02",
        title: "Aerial Sequences",
        body: "Beginner to advanced aerial yoga flows",
      },
      {
        n: "03",
        title: "Teaching Methodology",
        body: "Conducting private and group aerial sessions",
      },
      {
        n: "04",
        title: "Alignment & Anatomy in the Air",
        body: "How aerial postures impact muscles and joints",
      },
      {
        n: "05",
        title: "Contraindications & Safety",
        body: "Modifications for common conditions",
      },
      {
        n: "06",
        title: "Business of Aerial Yoga",
        body: "Building your brand and classes",
      },
    ],
  },
  preRequisites: {
    eyebrow: "ELIGIBILITY",
    heading: "Pre-Requisites",
    items: [
      "Basic understanding of yoga postures",
      "Physically fit to perform inversions and aerial movements",
      "Willingness to explore new boundaries of body and breath",
    ],
    leftImage: "/images/courses/aerial-yoga/prereq-left.png",
    rightImage: "/images/courses/aerial-yoga/prereq-right.png",
  },
  instructors: {
    eyebrow: "YOUR GUIDE",
    heading: "Meet Your Instructor's",
    people: [
      {
        name: "Atheesh Kumar",
        role: "Certified Aerial Yoga Instructor · Bodhi School of Yoga",
        image: "/images/trainers/atheesh-kumar.png",
        slug: "atheesh-kumar",
      },
      {
        name: "Sneha Shankar",
        role: "Certified Aerial Yoga Instructor · Bodhi School of Yoga",
        image: "/images/trainers/sneha-shankar.png",
        slug: "sneha-shankar",
      },
      {
        name: "VijayaRaghavan",
        role: "Certified Aerial Yoga Instructor · Bodhi School of Yoga",
        image: "/images/trainers/vijayaraghavan.png",
        slug: "vijaya-raghavan",
      },
      {
        name: "Prajakta Jadhav",
        role: "Certified Aerial Yoga Instructor · Bodhi School of Yoga",
        image: "/images/trainers/prajakta-jadhav.png",
        slug: "prajakta-jadhav",
      },
    ],
  },
  faqs: {
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "Do I need prior experience in aerial yoga?",
        answer:
          "No prior aerial yoga experience is required. A basic understanding of yoga postures and physical fitness to perform inversions and aerial movements is recommended.",
        defaultOpen: true,
      },
      {
        question: "Is this TTC Yoga Alliance certified?",
        answer:
          "Yes — Bodhi is a Yoga Alliance Registered School (RYS-200, RYS-300). Course certification details on enquiry.",
      },
      {
        question: "Will I get to practice on hammocks during training?",
        answer:
          "Yes. Every session is hands-on; you'll spend significant time practising on the aerial hammock under supervision.",
      },
      {
        question: "Can this course help me start my own aerial yoga classes?",
        answer:
          "Yes — the syllabus includes a dedicated 'Business of Aerial Yoga' module covering branding, pricing, and launching classes.",
      },
    ],
  },
  relatedCourses: {
    eyebrow: "TOP POPULAR YOGA COURSE",
    heading: "Lead to more courses from us",
    subhead:
      "Deepen your wisdom and elevate your yoga career with our specialized yoga certifications.",
    courses: [
      {
        title: "Online Weight Loss Coach Certification",
        duration: "4 weeks",
        format: "Online",
        language: "English",
        instructor: "Janardhan Durga Prasad",
        image: "/images/programs/weight-loss-coach.png",
        href: "/courses/weight-loss-coach",
      },
      {
        title: "Online Mudra Therapy Yoga Teacher Training",
        duration: "2 weeks",
        format: "Online",
        language: "English",
        instructor: "Prarthana Patel",
        image: "/images/programs/mudra-therapy.png",
        href: "/courses/mudra-therapy",
      },
      {
        title: "Online MAT Pilates Instructor Certification",
        duration: "4 weeks",
        format: "Online",
        language: "English",
        instructor: "Lakshmi Yalamudi",
        image: "/images/programs/mat-pilates.png",
        href: "/courses/mat-pilates",
      },
    ],
  },
  closingCta: {
    headingLead: "Begin where",
    headingAccent: "you are.",
    subhead:
      "Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that.",
    primaryCta: { label: "Try a class, free", href: "/try" },
    cards: [
      {
        title: "Free Trial Session",
        body: "50 Mins Session with the option of choosing from 10 slots in a day.",
        ctaLabel: "Join now",
        ctaHref: "/free-trial",
      },
      {
        title: "Speak to us",
        body: "Talk to counsellor who can assess and offer recommendations",
        ctaLabel: "Contact us",
        ctaHref: "/contact",
      },
      {
        title: "Take a Guided Path",
        body: "Our assessment will guide you take direction best suited based on your experience",
        ctaLabel: "Start now",
        ctaHref: "/assessment",
      },
    ],
  },
};
