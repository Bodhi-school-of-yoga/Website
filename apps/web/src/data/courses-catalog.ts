// Typed loader over the single source of truth for all Bodhi courses:
// `courses.json` (same directory). Course content is surfaced under
// /advanced-certifications/{online,offline}, /teacher-courses/{online,offline},
// and /yoga-courses/{online,offline}. Each entry powers both the listing card
// and the dynamic detail page at /courses/[slug].
//
// ─────────────────────────────────────────────────────────────────────────
//  HOW TO ADD / EDIT A COURSE
//  1. Open ./courses.json and copy an existing course object.
//  2. Change `slug` (must be unique — it becomes /courses/<slug>), `title`,
//     `category` ("advanced" | "teacher" | "yoga"), `mode` ("online" | "studio").
//  3. Set pricing: `price` is the live/offer price, `originalPrice` the
//     strikethrough. Both are pre-formatted strings ("₹36,750", "$1,997").
//     Omit both to fall back to the tier price matrix (regular yoga classes).
//  4. Fill the content arrays (overview, highlights, curriculum, faqs, …).
//  Nothing else to wire — listing pages and the detail page read from here.
// ─────────────────────────────────────────────────────────────────────────

import coursesData from "./courses.json";

export type CourseCategory = "advanced" | "teacher" | "yoga";
export type CourseMode = "online" | "studio";

export type CourseMeta = { icon: string; label: string };
export type CourseHighlight = { icon: string; iconSrc?: string; title: string; body: string };
export type CourseCurriculumItem = { title: string; body: string };
export type CourseInstructor = { name: string; role: string; avatar: string };
export type CourseFaq = { question: string; answer: string; defaultOpen?: boolean };

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
  pricingPlans?: { period: string; price: string }[];
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
};

// ---------------------------------------------------------------------------
// Catalog — sourced entirely from courses.json (edit that file to change data).
// ---------------------------------------------------------------------------

export const COURSES: Course[] = coursesData as unknown as Course[];

// ---------------------------------------------------------------------------
// Lookups
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

export function getRelatedCourses(course: Course, limit = 3): Course[] {
  // Prefer same category and opposite mode, then same category same mode, then anything.
  const sameCatOtherMode = COURSES.filter(
    (c) => c.slug !== course.slug && c.category === course.category && c.mode !== course.mode,
  );
  const sameCatSameMode = COURSES.filter(
    (c) => c.slug !== course.slug && c.category === course.category && c.mode === course.mode,
  );
  const others = COURSES.filter(
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

export const MODE_LABELS: Record<CourseMode, string> = {
  online: "Online",
  studio: "Studio",
};
