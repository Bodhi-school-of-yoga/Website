const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Media format returned by Strapi
export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

// Strapi content types
export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  slug: string;
  cover: StrapiImage | null;
  author: StrapiAuthor | null;
  category: StrapiCategory | null;
  blocks: StrapiBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface StrapiAuthor {
  id: number;
  documentId: string;
  name: string;
  email: string | null;
  avatar: StrapiImage | null;
}

export interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
}

export type StrapiBlock =
  | { __component: "shared.rich-text"; id: number; body: string }
  | { __component: "shared.media"; id: number; file: StrapiImage }
  | { __component: "shared.quote"; id: number; title: string; body: string }
  | { __component: "shared.slider"; id: number; files: StrapiImage[] };

export interface StrapiGlobal {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string;
  favicon: StrapiImage | null;
  defaultSeo: {
    metaTitle: string;
    metaDescription: string;
    shareImage: StrapiImage | null;
  } | null;
}

export interface StrapiAbout {
  id: number;
  documentId: string;
  title: string;
  blocks: StrapiBlock[];
}

/**
 * Get the full URL for a Strapi media asset.
 * Handles both relative paths (/uploads/...) and absolute URLs.
 */
export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Core fetch wrapper for the Strapi REST API (v5).
 */
async function fetchStrapi<T>(
  path: string,
  params?: Record<string, string>,
  options?: { revalidate?: number },
): Promise<StrapiResponse<T>> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: options?.revalidate ?? 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText} — ${path}`);
  }

  return res.json();
}

// ─── Articles ────────────────────────────────────────────────────────

export async function getArticles(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}) {
  const queryParams: Record<string, string> = {
    "populate[cover]": "true",
    "populate[category]": "true",
    "populate[author]": "true",
    "sort[0]": "createdAt:desc",
    "pagination[page]": String(params?.page ?? 1),
    "pagination[pageSize]": String(params?.pageSize ?? 25),
    "status": "published",
  };

  if (params?.category) {
    queryParams["filters[category][slug][$eq]"] = params.category;
  }

  return fetchStrapi<StrapiArticle[]>("/articles", queryParams);
}

export async function getArticleBySlug(slug: string) {
  const res = await fetchStrapi<StrapiArticle[]>("/articles", {
    "filters[slug][$eq]": slug,
    "populate[cover]": "true",
    "populate[category]": "true",
    "populate[author]": "true",
    "populate[blocks]": "true",
    "status": "published",
  });

  return res.data?.[0] ?? null;
}

// ─── Categories ──────────────────────────────────────────────────────

export async function getCategories() {
  return fetchStrapi<StrapiCategory[]>("/categories", {
    "sort[0]": "name:asc",
  });
}

// ─── Authors ─────────────────────────────────────────────────────────

export async function getAuthors() {
  return fetchStrapi<StrapiAuthor[]>("/authors", {
    "populate[avatar]": "true",
  });
}

// ─── Global ──────────────────────────────────────────────────────────

export async function getGlobal() {
  return fetchStrapi<StrapiGlobal>("/global", {
    "populate[favicon]": "true",
    "populate[defaultSeo][populate]": "*",
  });
}

// ─── About ───────────────────────────────────────────────────────────

export async function getAbout() {
  return fetchStrapi<StrapiAbout>("/about", {
    "populate[blocks]": "true",
    "status": "published",
  });
}

// ─── Courses ────────────────────────────────────────────────────────

export interface StrapiCourseHighlight {
  id: number;
  icon: string | null;
  iconSrc: string | null;
  title: string;
  body: string;
}

export interface StrapiCourseCurriculumItem {
  id: number;
  title: string;
  body: string;
}

export interface StrapiCourseInstructor {
  id: number;
  name: string;
  role: string | null;
  avatar: string | null;
}

export interface StrapiCourseFaq {
  id: number;
  question: string;
  answer: string;
  defaultOpen: boolean | null;
}

export interface StrapiCoursePricingPlan {
  id: number;
  period: string;
  price: string;
}

export interface StrapiCourse {
  id: number;
  documentId: string;
  title: string;
  titleLead: string | null;
  titleAccent: string | null;
  slug: string;
  category: "advanced" | "teacher" | "yoga";
  mode: "online" | "studio";
  price: string | null;
  originalPrice: string | null;
  pricingPlans: StrapiCoursePricingPlan[];
  shortDescription: string;
  durationLabel: string | null;
  scheduleLabel: string | null;
  timingLabel: string | null;
  listingImage: string | null;
  heroImage: string | null;
  instructorInitials: string | null;
  instructorName: string | null;
  overview: string[] | null;
  prerequisites: string[] | null;
  highlights: StrapiCourseHighlight[];
  curriculum: StrapiCourseCurriculumItem[];
  instructors: StrapiCourseInstructor[];
  faqs: StrapiCourseFaq[];
  comingSoon: boolean | null;
  availabilityNote: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

const COURSE_POPULATE: Record<string, string> = {
  "populate[highlights]": "true",
  "populate[curriculum]": "true",
  "populate[instructors]": "true",
  "populate[faqs]": "true",
  "populate[pricingPlans]": "true",
};

export async function getCourses(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  mode?: string;
}) {
  const queryParams: Record<string, string> = {
    ...COURSE_POPULATE,
    "sort[0]": "createdAt:desc",
    "pagination[page]": String(params?.page ?? 1),
    "pagination[pageSize]": String(params?.pageSize ?? 100),
    "status": "published",
  };

  if (params?.category) {
    queryParams["filters[category][$eq]"] = params.category;
  }
  if (params?.mode) {
    queryParams["filters[mode][$eq]"] = params.mode;
  }

  return fetchStrapi<StrapiCourse[]>("/courses", queryParams);
}

export async function getCourseBySlug(slug: string) {
  const res = await fetchStrapi<StrapiCourse[]>("/courses", {
    "filters[slug][$eq]": slug,
    ...COURSE_POPULATE,
    "status": "published",
  });

  return res.data?.[0] ?? null;
}
