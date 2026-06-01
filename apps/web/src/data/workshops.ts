// Typed loader for the Bodhi workshops catalogue.
//
// The content lives in ./workshops.json — that is the file to edit when you
// release, update, or remove a workshop. This module only adds TypeScript
// types, the shared Bodhi teacher/FAQ defaults, and small lookup helpers.

import data from "./workshops.json";

export type IconKey =
  | "video"
  | "clock"
  | "calendar"
  | "globe"
  | "laptop"
  | "award"
  | "layers"
  | "infinity";

export type ListingFeature = { icon: IconKey; label: string };
export type Chip = { emoji: string; label: string };
export type AboutFeature = { emoji: string; title: string; body: string };
export type Benefit = { number: string; title: string; body: string };
export type ScheduleItem = { time: string; title: string; body: string };
export type FaqItem = { question: string; answer: string; defaultOpen?: boolean };

export type WorkshopAbout = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  imageAlt: string;
  features: AboutFeature[];
};

export type WorkshopBenefits = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Benefit[];
};

export type WorkshopSchedule = {
  eyebrow: string;
  title: string;
  items: ScheduleItem[];
};

export type WorkshopFacilitator = {
  eyebrow: string;
  title: string;
  body: string;
  avatar: { src: string; alt: string };
  chips: string[];
};

export type WorkshopBooking = {
  eyebrow: string;
  price: string;
  priceStrike: string | null;
  saveNote: string | null;
  ctaLabel: string;
  guaranteeNote: string;
  chips: Chip[];
};

export type Workshop = {
  slug: string;
  category: string;
  title: string;
  titleAccent: string;
  titleMain: string;
  image: string;
  heroImage: string;
  shortDescription: string;
  subtitle: string;
  price: string;
  originalPrice: string | null;
  taxNote: string | null;
  startsCaption: string;
  /** ISO date driving the detail-page countdown. Optional — defaults applied in the page. */
  startsAt?: string | null;
  ctaLabel: string;
  listingFeatures: ListingFeature[];
  booking: WorkshopBooking;
  about: WorkshopAbout;
  benefits: WorkshopBenefits;
  schedule: WorkshopSchedule | null;
  // "bodhi" → shared Bodhi instructor; an object → custom; null → hide the section.
  facilitator: WorkshopFacilitator | "bodhi" | null;
  faqs: FaqItem[] | null;
};

// Shared Bodhi School of Yoga teacher/host details (bodhiworkshops.com).
// A workshop with `facilitator: null` in the JSON falls back to this.
export const BODHI_FACILITATOR: WorkshopFacilitator = {
  eyebrow: "Your Guide",
  title: "Learn With Bodhi School of Yoga",
  body: "Bodhi School of Yoga has guided 1000+ transformations over 5+ years of teaching. A certified team with deep experience in helping people lead healthy, happy lives — backed by personal chat support to resolve all your doubts along the way.",
  avatar: {
    src: "/images/workshop-detail/facilitator-avatar.png",
    alt: "Bodhi School of Yoga",
  },
  chips: [
    "1000+ Transformations",
    "5+ Years of Experience",
    "9.1 Average Rating",
    "10K+ on Social Media",
  ],
};

// Shared FAQs. A workshop with `faqs: null` in the JSON falls back to this.
export const BODHI_FAQS: FaqItem[] = [
  {
    question: "Do I Need Any Prior Experience?",
    answer:
      "Not at all. Our programs are designed for complete beginners and experienced practitioners alike. Everything is explained from the ground up, with personal chat support to resolve any doubts.",
    defaultOpen: true,
  },
  {
    question: "Will I Get a Recording if I Can't Attend Live?",
    answer:
      "Yes — sessions are recorded and you'll get access to the replay so you can revisit any segment as often as you like during your access window.",
  },
  {
    question: "Is There Support if I Get Stuck?",
    answer:
      "Absolutely. You get seamless online personal chat support to resolve all your doubts throughout the program.",
  },
  {
    question: "Will I Receive a Certificate?",
    answer:
      "Our teacher training courses include certification on completion, so you can confidently teach what you've learned.",
  },
  {
    question: "Is There a Refund Policy?",
    answer:
      "We offer a money-back guarantee if you feel the program wasn't the right fit. Just email us within the eligible window and we'll process your refund.",
  },
];

export const workshops: Workshop[] = (data.workshops as unknown) as Workshop[];

export function getWorkshop(slug: string): Workshop | null {
  return workshops.find((w) => w.slug === slug) ?? null;
}

// Resolves the instructor for a workshop. Returns null when there is no
// instructor, so the page can hide the section entirely.
export function getFacilitator(w: Workshop): WorkshopFacilitator | null {
  if (w.facilitator === "bodhi") return BODHI_FACILITATOR;
  return w.facilitator ?? null;
}

export function getFaqs(w: Workshop): FaqItem[] {
  return w.faqs ?? BODHI_FAQS;
}
