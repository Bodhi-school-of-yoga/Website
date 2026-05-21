"use client";

import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
} from "@tanstack/react-query";
import { fetchAPI } from "./strapi";
import type {
  YogaClass,
  Instructor,
  BlogPost,
  Testimonial,
  StrapiResponse,
} from "@/types/strapi";

function useStrapiQuery<T>(
  key: QueryKey,
  path: string,
  params: Record<string, string | number | boolean> = {},
  options?: Omit<UseQueryOptions<StrapiResponse<T>>, "queryKey" | "queryFn">,
) {
  return useQuery<StrapiResponse<T>>({
    queryKey: key,
    queryFn: () => fetchAPI<T>(path, params),
    ...options,
  });
}

export function useClasses() {
  return useStrapiQuery<YogaClass[]>(
    ["classes"],
    "/yoga-classes",
    { populate: "*" },
  );
}

export function useClassBySlug(slug: string) {
  return useStrapiQuery<YogaClass[]>(
    ["class", slug],
    "/yoga-classes",
    { "filters[slug][$eq]": slug, populate: "*" },
  );
}

export function useInstructors() {
  return useStrapiQuery<Instructor[]>(
    ["instructors"],
    "/instructors",
    { populate: "*" },
  );
}

export function useInstructorBySlug(slug: string) {
  return useStrapiQuery<Instructor[]>(
    ["instructor", slug],
    "/instructors",
    { "filters[slug][$eq]": slug, populate: "*" },
  );
}

export function useBlogPosts(page = 1, pageSize = 9) {
  return useStrapiQuery<BlogPost[]>(
    ["blog", page],
    "/blog-posts",
    {
      populate: "*",
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
      sort: "publishedAt:desc",
    },
  );
}

export function useBlogPostBySlug(slug: string) {
  return useStrapiQuery<BlogPost[]>(
    ["blog-post", slug],
    "/blog-posts",
    { "filters[slug][$eq]": slug, populate: "*" },
  );
}

export function useTestimonials() {
  return useStrapiQuery<Testimonial[]>(
    ["testimonials"],
    "/testimonials",
    { populate: "*" },
  );
}
