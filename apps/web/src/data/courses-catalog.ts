// Typed loader for all Bodhi courses. Primary source: Strapi CMS.
// Fallback: `courses.json` (same directory) when CMS is unavailable.
//
// Course content is surfaced under /advanced-certifications/{online,offline},
// /teacher-courses/{online,offline}, /yoga-courses/{online,offline}, and
// the detail page at /courses/[slug].
//
// ─────────────────────────────────────────────────────────────────────────
//  HOW TO ADD / EDIT A COURSE
//  Use the Strapi CMS admin panel to create, edit, or delete courses.
//  Changes appear on the site automatically (within 60 s revalidation).
//  The local courses.json serves as a fallback when CMS is unreachable.
// ─────────────────────────────────────────────────────────────────────────

import coursesData from "./courses.json";
import { applyYogaDayOffer } from "./yoga-day-offer";
import {
  getCourses,
  getCourseBySlug as fetchStrapiCourseBySlug,
  type StrapiCourse,
} from "@/lib/strapi";

export type CourseCategory = "advanced" | "teacher" | "yoga";
export type CourseMode = "online" | "studio";

export type CourseMeta = { icon: string; label: string };
export type CourseHighlight = { icon: string; iconSrc?: string; title: string; body: string };
export type CourseCurriculumItem = { title: string; body: string };
export type CourseInstructor = { name: string; role: string; avatar: string };
export type CourseFaq = { question: string; answer: string; defaultOpen?: boolean };
// A single subscription tier — exactly the data the catalog holds. Both fields
// travel pre-formatted ("Monthly", "₹2,500"). Everything else the package UI
// needs (billing length, per-month rate, savings, best-value) is DERIVED from
// these two by `describePlan` below — never authored per course.
export type PricingPlan = { period: string; price: string };

export type Course = {
  slug: string;
  title: string;
  titleLead: string;
  titleAccent: string;
  category: CourseCategory;
  mode: CourseMode;
  // Display pricing. `price` is the live/offer price, `originalPrice` the
  // strikethrough. Optional: regular yoga classes fall back to the tier matrix
  // in /courses/[slug]. Strings are pre-formatted ("₹36,750", "$1,997") so the
  // currency symbol travels with the value.
  price?: string;
  originalPrice?: string;
  // Subscription/tiered pricing (e.g. regular yoga classes billed Monthly /
  // Quarterly / Yearly). When present, this is the real price model; `price`
  // is left empty and cards show "From <cheapest plan>".
  pricingPlans?: PricingPlan[];
  shortDescription: string;
  durationLabel: string;
  scheduleLabel: string;
  listingImage: string;
  heroImage: string;
  instructor: { initials: string; name: string };
  overview: string[];
  highlights: CourseHighlight[];
  curriculum: CourseCurriculumItem[];
  prerequisites: string[];
  instructors: CourseInstructor[];
  faqs: CourseFaq[];
  comingSoon?: boolean;
  availabilityNote?: string;
  timingLabel?: string;
};

// ---------------------------------------------------------------------------
// Catalog — sourced entirely from courses.json (edit that file to change data).
// ---------------------------------------------------------------------------

// Apply the International Yoga Day campaign discount (configured per category in
// ./yoga-day-offer.json) to a course's display pricing. The course's existing
// strikethrough `originalPrice` — or its `price` when there's no strikethrough —
// is treated as the FULL price; the campaign then recomputes the live `price`
// and `originalPrice` from the category's percent. Courses without a flat price
// (subscription tiers / unpriced) and categories with the discount off are left
// untouched. This is THE place the campaign is wired in — every listing, the
// homepage and the detail page read from COURSES, so they all inherit it.
function withCampaignPricing(course: Course): Course {
  const fullPrice = course.originalPrice ?? course.price;
  if (!fullPrice) return course;

  const applied = applyYogaDayOffer(fullPrice, course.category);
  if (!applied.discountLabel) return course; // campaign off for this category

  return {
    ...course,
    price: applied.price,
    originalPrice: applied.originalPrice,
  };
}

export const COURSES: Course[] = (coursesData as unknown as Course[]).map(
  withCampaignPricing,
);

// ---------------------------------------------------------------------------
// Strapi → Course adapter
// ---------------------------------------------------------------------------

function strapiToCourse(s: StrapiCourse): Course {
  return {
    slug: s.slug,
    title: s.title,
    titleLead: s.titleLead ?? "",
    titleAccent: s.titleAccent ?? "",
    category: s.category,
    mode: s.mode,
    price: s.price ?? undefined,
    originalPrice: s.originalPrice ?? undefined,
    pricingPlans: (s.pricingPlans ?? []).map((p) => ({
      period: p.period,
      price: p.price,
    })),
    shortDescription: s.shortDescription,
    durationLabel: s.durationLabel ?? "",
    scheduleLabel: s.scheduleLabel ?? "",
    timingLabel: s.timingLabel ?? undefined,
    listingImage: s.listingImage ?? "",
    heroImage: s.heroImage ?? "",
    instructor: {
      initials: s.instructorInitials ?? "",
      name: s.instructorName ?? "",
    },
    overview: s.overview ?? [],
    prerequisites: s.prerequisites ?? [],
    highlights: (s.highlights ?? []).map((h) => ({
      icon: h.icon ?? "",
      iconSrc: h.iconSrc ?? undefined,
      title: h.title,
      body: h.body,
    })),
    curriculum: (s.curriculum ?? []).map((c) => ({
      title: c.title,
      body: c.body,
    })),
    instructors: (s.instructors ?? []).map((i) => ({
      name: i.name,
      role: i.role ?? "",
      avatar: i.avatar ?? "",
    })),
    faqs: (s.faqs ?? []).map((f) => ({
      question: f.question,
      answer: f.answer,
      defaultOpen: f.defaultOpen ?? undefined,
    })),
    comingSoon: s.comingSoon ?? undefined,
    availabilityNote: s.availabilityNote ?? undefined,
  };
}

// ---------------------------------------------------------------------------
// Async API — CMS-first with local JSON fallback (used by server components)
// ---------------------------------------------------------------------------

export async function fetchAllCourses(): Promise<Course[]> {
  try {
    const res = await getCourses({ pageSize: 100 });
    if (res.data && res.data.length > 0) {
      return res.data.map(strapiToCourse).map(withCampaignPricing);
    }
  } catch {
    // Strapi unavailable — fall through to local data
  }
  return COURSES;
}

export async function fetchCoursesByCategoryAndMode(
  category: CourseCategory,
  mode: CourseMode,
): Promise<Course[]> {
  try {
    const res = await getCourses({ category, mode, pageSize: 100 });
    if (res.data && res.data.length > 0) {
      return res.data.map(strapiToCourse).map(withCampaignPricing);
    }
  } catch {
    // fall through
  }
  return COURSES.filter((c) => c.category === category && c.mode === mode);
}

export async function fetchCourseBySlug(
  slug: string,
): Promise<Course | undefined> {
  try {
    const raw = await fetchStrapiCourseBySlug(slug);
    if (raw) return withCampaignPricing(strapiToCourse(raw));
  } catch {
    // fall through
  }
  return COURSES.find((c) => c.slug === slug);
}

// ---------------------------------------------------------------------------
// Sync lookups (used by client components — reads from local JSON fallback)
// ---------------------------------------------------------------------------

export function getCoursesByCategoryAndMode(
  category: CourseCategory,
  mode: CourseMode,
): Course[] {
  return COURSES.filter((c) => c.category === category && c.mode === mode);
}

export function findCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

// Derive a "NN% OFF" badge from a course's offer vs original price. Returns
// undefined when there's no genuine discount (e.g. degree programmes priced in
// USD with no strikethrough).
export function getDiscountLabel(
  course: Pick<Course, "price" | "originalPrice">,
): string | undefined {
  if (!course.price || !course.originalPrice) return undefined;
  const toNum = (s: string) => Number(s.replace(/[^\d.]/g, ""));
  const now = toNum(course.price);
  const original = toNum(course.originalPrice);
  if (!now || !original || now >= original) return undefined;
  return `${Math.round((1 - now / original) * 100)}% OFF`;
}

// The price string to show on a card / hero. Returns the flat price, or
// "From <cheapest plan>" for tiered courses, or undefined when no price is set
// (so the UI shows nothing rather than an invented number).
export function getDisplayPrice(
  course: Pick<Course, "price" | "pricingPlans">,
): string | undefined {
  if (course.price) return course.price;
  if (course.pricingPlans && course.pricingPlans.length > 0) {
    return `From ${course.pricingPlans[0].price}`;
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Subscription plan economics — DERIVED, never authored.
// Given the catalog's raw {period, price} tiers, work out the billing length,
// the per-month rate, the savings vs paying month-to-month, and which tier is
// the best value. The package selector renders straight off this — no pricing
// numbers live in the component.
// ---------------------------------------------------------------------------
export type DescribedPlan = {
  period: string;
  price: string;
  months: number;
  /** Per-month rate, formatted (e.g. "₹833 / month"). */
  perMonthLabel: string;
  /** "billed for 12 months" / "billed monthly". */
  billingNote: string;
  /** "Save 67%" vs the month-to-month rate. Absent when there's nothing to save. */
  savingsLabel?: string;
  /** What this tier would cost at the monthly rate — the strikethrough. */
  referencePrice?: string;
  /** Lowest effective per-month cost across the tiers. */
  bestValue: boolean;
};

const planAmount = (s: string) => Number(s.replace(/[^\d.]/g, ""));
const planSymbol = (s: string) => s.match(/^\D+/)?.[0]?.trim() ?? "₹";

/**
 * Detect the Razorpay currency code from a pre-formatted price string.
 * "$1,997" → "USD", "₹36,750" → "INR". Defaults to INR.
 */
export function detectCurrency(priceStr: string): "INR" | "USD" {
  const trimmed = priceStr.trim();
  if (trimmed.startsWith("$") || /USD/i.test(trimmed)) return "USD";
  return "INR";
}

/**
 * Razorpay expects the amount in the smallest currency unit:
 * INR → paise (× 100), USD → cents (× 100).
 */
export function toSmallestUnit(priceStr: string): number {
  const num = Number(priceStr.replace(/[^\d.]/g, ""));
  return Math.round(num * 100);
}
const planFormat = (symbol: string, n: number) =>
  `${symbol}${Math.round(n).toLocaleString("en-IN")}`;

// Map a free-text billing period to a month count ("Quarterly" → 3, "Yearly" →
// 12, "6 Months" → 6). Falls back to 1 for monthly/unknown.
export function monthsForPeriod(period: string): number {
  const p = period.toLowerCase();
  const explicit = p.match(/(\d+)\s*month/);
  if (explicit) return Number(explicit[1]);
  if (/year|annual|12/.test(p)) return 12;
  if (/half[-\s]?year|semi/.test(p)) return 6;
  if (/quarter/.test(p)) return 3;
  return 1;
}

export function describePlans(plans: PricingPlan[]): DescribedPlan[] {
  if (plans.length === 0) return [];

  const enriched = plans.map((plan) => {
    const months = monthsForPeriod(plan.period);
    const amount = planAmount(plan.price);
    return { plan, months, amount, perMonth: months ? amount / months : amount };
  });

  // Baseline = the month-to-month rate (the 1-month tier, else the priciest
  // per-month tier). Savings are measured against it.
  const monthly = enriched.find((e) => e.months === 1);
  const baselinePerMonth = monthly
    ? monthly.perMonth
    : Math.max(...enriched.map((e) => e.perMonth));

  const cheapestPerMonth = Math.min(...enriched.map((e) => e.perMonth));

  return enriched.map(({ plan, months, amount, perMonth }) => {
    const symbol = planSymbol(plan.price);
    const savesPct =
      baselinePerMonth > 0
        ? Math.round((1 - perMonth / baselinePerMonth) * 100)
        : 0;
    const hasSavings = savesPct > 0;
    return {
      period: plan.period,
      price: plan.price,
      months,
      perMonthLabel: `${planFormat(symbol, perMonth)} / month`,
      billingNote: months <= 1 ? "billed monthly" : `billed for ${months} months`,
      savingsLabel: hasSavings ? `Save ${savesPct}%` : undefined,
      referencePrice: hasSavings
        ? planFormat(symbol, baselinePerMonth * months)
        : undefined,
      bestValue: perMonth === cheapestPerMonth && enriched.length > 1,
    };
  });
}

export function getRelatedCourses(course: Course, limit = 3): Course[] {
  return relatedFrom(COURSES, course, limit);
}

export async function fetchRelatedCourses(course: Course, limit = 3): Promise<Course[]> {
  const all = await fetchAllCourses();
  return relatedFrom(all, course, limit);
}

function relatedFrom(all: Course[], course: Course, limit: number): Course[] {
  const sameCatOtherMode = all.filter(
    (c) => c.slug !== course.slug && c.category === course.category && c.mode !== course.mode,
  );
  const sameCatSameMode = all.filter(
    (c) => c.slug !== course.slug && c.category === course.category && c.mode === course.mode,
  );
  const others = all.filter(
    (c) => c.slug !== course.slug && c.category !== course.category,
  );
  return [...sameCatOtherMode, ...sameCatSameMode, ...others].slice(0, limit);
}

// ---------------------------------------------------------------------------
// Category metadata for listing pages
// ---------------------------------------------------------------------------

export const CATEGORY_LABELS: Record<CourseCategory, string> = {
  advanced: "Advanced Certifications",
  teacher: "Teacher Courses",
  yoga: "Yoga Courses",
};

export const CATEGORY_BASE_PATH: Record<CourseCategory, string> = {
  advanced: "/advanced-certifications",
  teacher: "/teacher-courses",
  yoga: "/yoga-courses",
};

// Canonical URL for a course's detail page: nested under its category + mode
// listing route, e.g. /teacher-courses/online/200-hour-ytt-online. The catalog
// stores the studio mode as "studio" but its route segment is "offline".
export function courseModeSegment(mode: CourseMode): "online" | "offline" {
  return mode === "studio" ? "offline" : "online";
}

export function courseHref(
  course: Pick<Course, "category" | "mode" | "slug">,
): string {
  return `${CATEGORY_BASE_PATH[course.category]}/${courseModeSegment(
    course.mode,
  )}/${course.slug}`;
}

export const MODE_LABELS: Record<CourseMode, string> = {
  online: "Online",
  studio: "Studio",
};
