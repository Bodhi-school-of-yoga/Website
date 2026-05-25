import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about-hero";
import {
  AboutPillarsSection,
  type PillarItem,
} from "@/components/sections/about-pillars-section";
import {
  AboutStatsBar,
  type StatItem,
} from "@/components/sections/about-stats-bar";
import {
  AboutStorySection,
  type StoryRow,
} from "@/components/sections/about-story-section";
import {
  AboutVisionMissionSection,
  type VisionMissionCard,
} from "@/components/sections/about-vision-mission-section";
import {
  TestimonialsSection,
  type TestimonialItem,
} from "@/components/sections/testimonials-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About — Bodhi School of Yoga",
  description:
    "Bodhi School of Yoga empowers women through traditional yoga and ayurveda — healing bodies, awakening leaders, and building a global sisterhood.",
};

const STATS: StatItem[] = [
  { value: 100, suffix: "K+", label: "Certified Trainers by 2030" },
  { value: 20, suffix: "+", label: "Centers Across India" },
  { value: 15, suffix: "+", label: "Years of Teaching" },
  { value: 10, suffix: "K+", label: "Students Transformed" },
];

const PILLARS: PillarItem[] = [
  {
    title: "Healing",
    body: "We are committed to bringing about physical, mental and emotional healing for every person in the world.",
  },
  {
    title: "Expert",
    body: "We teach pure yoga and ayurveda. No remixes or reinterpretations. Hatha. Vinyasa. Yin. Take your pick.",
  },
  {
    title: "Community",
    body: "We are a growing community of incredible variety. Age, sex, professions vary. The common thread? Love of healing and yoga.",
  },
];

const STORY_ROWS: StoryRow[] = [
  {
    title: "Our Legacy",
    body: [
      "Yoga is an eternal gift to humanity born in the sacred lands of Bharat thousands of years ago. It was created not only to nurture physical health but also to guide the soul towards clarity, compassion, and liberation.",
      "From ancient yoginis to present-day practitioners, women have always been an integral part of this legacy as seekers, as teachers, and as torchbearers of transformation.",
      "At Bodhi School of Yoga, we carry forward this rich tradition with deep respect and a bold vision: to empower women through the timeless power of yoga.",
      "As time evolves, so do we—but the essence of yoga remains our unshakable root.",
    ],
    imageSrc: "/images/about/legacy.jpg",
    imageAlt: "Women practising yoga in the tradition of Bharat",
    direction: "text-left",
  },
  {
    title: "Our Present",
    body: [
      "We live in times of great progress—and profound pain. As the world rushes ahead, many are left overwhelmed by stress, burnout, and emotional disconnect. Women, especially, carry the weight of homes, careers, and expectations—all while seeking space to breathe and be.",
      "In a world that often forgets to pause, we teach women to reconnect—with themselves, with peace, and with purpose.",
    ],
    imageSrc: "/images/about/present.jpg",
    imageAlt: "A modern Bodhi class in session",
    direction: "image-left",
  },
  {
    title: "The Future We Seek",
    body: [
      "At Bodhi School of Yoga, we believe yoga is not just a practice—it is a lifeline. We believe that when a woman is empowered through yoga, her entire family, community, and future generations benefit.",
      "Our mission is to create a global sisterhood of women who are physically vibrant, mentally resilient, emotionally balanced, and spiritually connected.",
    ],
    imageSrc: "/images/about/future.jpg",
    imageAlt: "A global sisterhood of yoga practitioners",
    direction: "text-left",
  },
  {
    title: "Trainers",
    body: [
      "At Bodhi School of Yoga, our trainers are not just instructors—they are dedicated disciples of the yogic lifestyle. Each trainer embodies the wisdom of traditional yoga, passionately guiding students toward physical vitality, mental clarity, and spiritual awakening.",
      "With deep-rooted discipline, compassion, and experience, they empower every learner to integrate yoga into daily life and walk the path of transformation with confidence.",
    ],
    imageSrc: "/images/about/trainers.jpg",
    imageAlt: "Bodhi trainers guiding a class",
    direction: "image-left",
  },
];

const VISION: VisionMissionCard = {
  eyebrow: "Our Vision",
  body: [
    "By 2030, Bodhi School of Yoga envisions a powerful global network of 100,000 internationally certified yoga trainers—all of them women—spreading holistic well-being across the world.",
    "We are committed to nurturing a culture of consciousness, compassion, and connection, beginning at the heart of every home.",
    "As we guide women to step into their inner strength, we also empower yoga trainers to achieve financial freedom and personal fulfillment by offering advanced training, tools, and opportunities to grow.",
    "At Bodhi, we don't just teach yoga—we awaken leaders, healers, and changemakers for a brighter, more balanced tomorrow.",
  ],
};

const MISSION: VisionMissionCard = {
  eyebrow: "Our Mission",
  body: [
    "At Bodhi School of Yoga, our mission is to deliver comprehensive, inclusive, and heart-centered yoga education that empowers individuals—especially women—to lead vibrant, meaningful lives.",
    "We aim to cultivate a deep connection between body, mind, and soul, while nurturing emotional resilience, mental clarity, and spiritual growth.",
    "Through thoughtfully designed programs and personalized guidance, we help every student unlock their inner Shakti (power) and step confidently into their purpose.",
    "Whether your goal is personal healing or a rewarding career, Bodhi is your space to grow, transform, and thrive.",
  ],
};

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "aanya",
    quote:
      "I came in to lose weight. I left able to teach a class — and a calmer person at home. The training is honest, and that's rare.",
    authorName: "Aanya",
    authorMeta: "TTC Cohort 11. Now Teaching in Goa",
    avatarSrc: "/images/testimonials/aanya.jpg",
    avatarAlt: "Aanya, TTC Cohort 11 graduate",
  },
  {
    id: "ravi",
    quote:
      "The back pain workshop did more in two days than two years of physiotherapy. I've recommended Bodhi to everyone I know.",
    authorName: "Ravi",
    authorMeta: "Workshop Participant",
    avatarSrc: "/images/testimonials/ravi.jpg",
    avatarAlt: "Ravi, back pain workshop participant",
  },
  {
    id: "lena",
    quote:
      "I practice with Bodhi online from Berlin. Six in the morning, India time. It's the most consistent thing in my week.",
    authorName: "Lena",
    authorMeta: "Online Student, 2 Years",
    avatarSrc: "/images/testimonials/lena.jpg",
    avatarAlt: "Lena, long-term online student",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <AboutHero
          eyebrow="About Bodhi School of Yoga"
          headline="Heal. Rise. Lead."
          subcopy="Every woman holds the power to heal, rise, and lead — and yoga is the path that makes this transformation real."
          ctaLabel="Join Our Classes"
          ctaHref="/classes"
        />
        <AboutStatsBar stats={STATS} />
        <AboutPillarsSection
          eyebrow="What We Stand For"
          headlineWords={["Healing", "Expert", "Community"]}
          pillars={PILLARS}
        />
        <AboutStorySection rows={STORY_ROWS} />
        <AboutVisionMissionSection vision={VISION} mission={MISSION} />
        <TestimonialsSection
          eyebrow="Testimonials"
          heading="What Our Clients Say"
          testimonials={TESTIMONIALS}
          priorityFirst
        />
      </main>
      <SiteFooterBlock
        cta={{
          headingLead: "Begin where",
          headingAccent: "you are.",
          subhead:
            "Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that.",
          primaryCta: { label: "Try a Class, Free", href: "/contact" },
        }}
      />
    </>
  );
}
