import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FaqSection } from "@/components/sections/faq-section";
import { FooterBrandCta } from "@/components/sections/footer-brand-cta";
import { WorkshopAboutSection } from "@/components/sections/workshop-about-section";
import { WorkshopBenefitsSection } from "@/components/sections/workshop-benefits-section";
import { WorkshopDetailHero } from "@/components/sections/workshop-detail-hero";
import { WorkshopFacilitatorSection } from "@/components/sections/workshop-facilitator-section";
import { WorkshopScheduleSection } from "@/components/sections/workshop-schedule-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

type WorkshopData = {
  slug: string;
  titleAccent: string;
  title: string;
  subtitle: string;
  startsAt: string;
  heroImage: string;
  heroImageAlt: string;
  attendees: number;
  primaryCtaLabel: string;
  booking: {
    eyebrow: string;
    price: string;
    priceStrike?: string;
    saveNote?: string;
    chips: { emoji: string; label: string }[];
    ctaLabel: string;
    guaranteeNote: string;
  };
};

const SHARED_ABOUT = {
  eyebrow: "About This Workshop",
  titleLead: "A Day to",
  titleAccent: "Return to Yourself",
  body: "This immersive one-day workshop is crafted for anyone seeking deeper wellbeing. Drawing from Ayurveda, yogic science, and sound healing traditions.",
  image: {
    src: "/images/workshop-detail/about-group.png",
    alt: "Yoga students practicing together in a sunlit hall",
  },
  features: [
    {
      emoji: "🌬️",
      title: "Pranayama & Breathwork",
      body: "Rewire your nervous system with breath practices that calm, energize, and restore.",
    },
    {
      emoji: "🎵",
      title: "Sound Healing Immersion",
      body: "Tibetan bowls, tuning forks, and vocal toning to release stored stress.",
    },
    {
      emoji: "🌱",
      title: "Plant-Based Nourishment",
      body: "Learn how Satvic foods directly support mental clarity and emotional balance.",
    },
  ],
};

const SHARED_BENEFITS = {
  eyebrow: "Benefits",
  title: "What You'll Walk Away With",
  subtitle:
    "Six transformative modules designed to give you practical tools you can use every single day.",
  benefits: [
    {
      number: "01",
      title: "The Science of Prana",
      body: "Understand life force energy and how breath directly controls your mental and physical state.",
    },
    {
      number: "02",
      title: "Sound as Medicine",
      body: "Experience how specific frequencies affect brainwave patterns, reduce cortisol, and restore balance.",
    },
    {
      number: "03",
      title: "Gut-Brain Harmony",
      body: "Discover the food-mood connection and how the gut microbiome shapes your everyday wellbeing.",
    },
    {
      number: "04",
      title: "Morning Ritual Mastery",
      body: "Build a personalized morning protocol using Ayurvedic principles that takes under 20 minutes.",
    },
    {
      number: "05",
      title: "Emotional Alchemy",
      body: "Learn somatic techniques to process and release stored emotions from the body — gently and safely.",
    },
    {
      number: "06",
      title: "Integration & Daily Practice",
      body: "Create your own sustainable 30-day plan using the tools from this workshop, with weekly check-ins.",
    },
  ],
};

const SHARED_SCHEDULE = {
  eyebrow: "Workshop Day",
  title: "Your Day, Session by Session",
  items: [
    {
      time: "9:00 AM",
      title: "🙏 Welcome Circle & Intentions",
      body: "Arrive, settle, and set your personal intention for the day. Brief introduction to the day's philosophy.",
    },
    {
      time: "9:30 AM",
      title: "🌬️ Morning Pranayama Session",
      body: "Guided breathwork sequence to awaken the body. Nadi Shodhana, Kapalbhati, and Bhramari.",
    },
    {
      time: "11:00 AM",
      title: "📖 The Science of Healing",
      body: "Deep dive into Ayurvedic body types, gut health, and how to identify what your unique body needs.",
    },
    {
      time: "12:30 PM",
      title: "☀️ Mindful Lunch Break",
      body: "Guided practice of conscious eating. Learn to prepare a simple sattvic meal live.",
    },
  ],
  sideImage: {
    src: "/images/workshop-detail/schedule-side.png",
    alt: "Yoga practitioner holding a handstand pose at sunset",
  },
};

const SHARED_FACILITATOR = {
  eyebrow: "Your Guide",
  title: "Meet Your Facilitator",
  body: "With over 15 years of dedicated practice and teaching, our facilitator has guided thousands of students across India and internationally through transformative healing journeys. Trained in classical Ayurveda, Yoga Nidra, and Sound Healing, she brings both depth of knowledge and extraordinary warmth to every session.",
  avatar: {
    src: "/images/workshop-detail/facilitator-avatar.png",
    alt: "Portrait of the workshop facilitator",
  },
  chips: [
    "Certified Ayurvedic Practitioner",
    "Sound Healing Facilitator",
    "Yoga Alliance RYT-500",
    "15+ Years Teaching",
  ],
};

const SHARED_FAQS = [
  {
    question: "Do I need any prior experience in yoga or meditation?",
    answer:
      "Absolutely not! This workshop is designed for complete beginners and experienced practitioners alike. Every session is explained from the ground up, and modifications are always offered. The only prerequisite is an open mind and a genuine desire to learn.",
    defaultOpen: true,
  },
  {
    question: "Will I get a recording if I can't attend live?",
    answer:
      "Yes — every session is recorded and you'll get access to the full replay library for 30 days after the workshop. You can revisit any segment as often as you like during that window.",
  },
  {
    question: "What do I need to prepare or bring?",
    answer:
      "A yoga mat, a cushion or bolster, comfortable clothing, and a notebook. We'll email a short prep guide a week before the workshop so you arrive ready.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "We offer a 100% money-back guarantee within 7 days of the workshop date if you feel it wasn't a fit. Just email us and we'll process the refund — no questions asked.",
  },
  {
    question: "Can I pay in installments or is group pricing available?",
    answer:
      "Yes to both. Reach out before booking and we'll set up a two-part payment plan, or share a group discount if you're enrolling 3 or more people together.",
  },
];

const WORKSHOPS: Record<string, WorkshopData> = {
  "prana-vidya-level-1-webinar": {
    slug: "prana-vidya-level-1-webinar",
    titleAccent: "Prana Vidya",
    title: "Level 1 webinar",
    subtitle:
      "A transformative journey into traditional healing practices — combining breathwork, sound therapy, and mindful movement",
    startsAt: "2026-06-07T09:00:00+05:30",
    heroImage: "/images/workshop-detail/hero-bg.png",
    heroImageAlt: "A group of yoga students lying on mats in a sunlit studio",
    attendees: 1,
    primaryCtaLabel: "Buy a spot",
    booking: {
      eyebrow: "Workshop cost",
      price: "200",
      priceStrike: "₹500",
      saveNote: "₹300",
      chips: [
        { emoji: "📅", label: "Saturday, 7 June 2025" },
        { emoji: "⏰", label: "9:00 AM – 5:00 PM IST" },
        { emoji: "🎥", label: "Live on Zoom + 30-day replay" },
        { emoji: "📚", label: "Workbook PDF included" },
        { emoji: "🌐", label: "Hindi & English" },
        { emoji: "👤", label: "Limited to 60 participants" },
      ],
      ctaLabel: "Reserve My Seat Now",
      guaranteeNote: "🛡️ 100% money-back if you're not satisfied",
    },
  },
  "decoding-what-is-prana": {
    slug: "decoding-what-is-prana",
    titleAccent: "Decoding",
    title: '"What is Prana?"',
    subtitle:
      "A transformative journey into traditional healing practices — combining breathwork, sound therapy, and mindful movement",
    startsAt: "2026-06-07T09:00:00+05:30",
    heroImage: "/images/workshop-detail/hero-bg.png",
    heroImageAlt: "Yoga teacher leading a breathwork session",
    attendees: 1,
    primaryCtaLabel: "Buy a spot",
    booking: {
      eyebrow: "Workshop cost",
      price: "249",
      priceStrike: "₹500",
      saveNote: "₹251",
      chips: [
        { emoji: "📅", label: "Sat & Sun" },
        { emoji: "📍", label: "Studio" },
        { emoji: "⏰", label: "3 days" },
        { emoji: "🌐", label: "English" },
        { emoji: "🎥", label: "Live + replay" },
        { emoji: "👤", label: "Limited to 60 participants" },
      ],
      ctaLabel: "Book spot now",
      guaranteeNote: "🛡️ 100% money-back if you're not satisfied",
    },
  },
};

export async function generateStaticParams() {
  return Object.keys(WORKSHOPS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const workshop = WORKSHOPS[slug];
  if (!workshop) return { title: "Workshop | Bodhi School of Yoga" };
  return {
    title: `${workshop.titleAccent} ${workshop.title} | Bodhi School of Yoga`,
    description: workshop.subtitle,
  };
}

export default async function WorkshopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workshop = WORKSHOPS[slug];
  if (!workshop) notFound();

  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <WorkshopDetailHero
          backgroundImage={workshop.heroImage}
          backgroundAlt={workshop.heroImageAlt}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Workshops", href: "/workshops" },
            { label: `${workshop.titleAccent} ${workshop.title}` },
          ]}
          titleAccent={workshop.titleAccent}
          title={workshop.title}
          subtitle={workshop.subtitle}
          startsAt={workshop.startsAt}
          attendees={workshop.attendees}
          primaryCtaLabel={workshop.primaryCtaLabel}
          primaryCtaHref="#reserve"
          booking={{
            eyebrow: workshop.booking.eyebrow,
            price: workshop.booking.price,
            priceStrike: workshop.booking.priceStrike,
            saveNote: workshop.booking.saveNote,
            chips: workshop.booking.chips.map((chip) => ({
              icon: (
                <span aria-hidden="true" className="text-[15px] leading-none">
                  {chip.emoji}
                </span>
              ),
              label: chip.label,
            })),
            ctaLabel: workshop.booking.ctaLabel,
            ctaHref: "#reserve",
            guaranteeNote: workshop.booking.guaranteeNote,
          }}
        />

        <WorkshopAboutSection {...SHARED_ABOUT} />

        <WorkshopBenefitsSection {...SHARED_BENEFITS} />

        <WorkshopScheduleSection {...SHARED_SCHEDULE} />

        <WorkshopFacilitatorSection {...SHARED_FACILITATOR} />

        <FaqSection
          eyebrow="Have Questions?"
          heading="Frequently Asked Questions"
          items={SHARED_FAQS}
        />

        <FooterBrandCta
          brand="Bodhi"
          heading="Begin where you are."
          body="Whether you want to teach, heal a specific thing, or simply move and breathe with"
          ctaLabel="Try a class, free"
          ctaHref="/try-a-class"
        />
      </main>
      <SiteFooterBlock showCta={false} />
    </>
  );
}
