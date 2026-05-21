import { fetchAPI, getStrapiMedia } from "./strapi";
import type {
  YogaClass,
  Instructor,
  BlogPost,
  Testimonial,
} from "@/types/strapi";

// Server-side data fetching functions for use in Server Components and SSR.
// These fall back gracefully when Strapi is unreachable.

export async function getClasses(): Promise<YogaClass[]> {
  try {
    const res = await fetchAPI<YogaClass[]>("/yoga-classes", {
      populate: "*",
      sort: "title:asc",
    });
    return res.data;
  } catch {
    return [];
  }
}

export async function getClassBySlug(
  slug: string,
): Promise<YogaClass | null> {
  try {
    const res = await fetchAPI<YogaClass[]>("/yoga-classes", {
      "filters[slug][$eq]": slug,
      populate: "*",
    });
    return res.data[0] ?? null;
  } catch {
    return null;
  }
}

export async function getInstructors(): Promise<Instructor[]> {
  try {
    const res = await fetchAPI<Instructor[]>("/instructors", {
      populate: "*",
      sort: "name:asc",
    });
    return res.data;
  } catch {
    return [];
  }
}

export async function getBlogPosts(
  page = 1,
  pageSize = 9,
): Promise<{ posts: BlogPost[]; total: number }> {
  try {
    const res = await fetchAPI<BlogPost[]>("/blog-posts", {
      populate: "*",
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
      sort: "publishedAt:desc",
    });
    return {
      posts: res.data,
      total: res.meta.pagination?.total ?? 0,
    };
  } catch {
    return { posts: [], total: 0 };
  }
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  try {
    const res = await fetchAPI<BlogPost[]>("/blog-posts", {
      "filters[slug][$eq]": slug,
      populate: "*",
    });
    return res.data[0] ?? null;
  } catch {
    return null;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetchAPI<Testimonial[]>("/testimonials", {
      populate: "*",
    });
    return res.data;
  } catch {
    return [];
  }
}

export { getStrapiMedia };
