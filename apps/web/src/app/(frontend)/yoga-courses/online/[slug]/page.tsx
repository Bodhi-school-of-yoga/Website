import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDetail } from "@/components/course-detail";
import {
  COURSES,
  findCourseBySlug,
  type CourseCategory,
  type CourseMode,
} from "@/data/courses-catalog";

// This route only serves yoga courses in online mode; a slug that resolves to
// a course outside that slice 404s so each course has one canonical URL.
const CATEGORY: CourseCategory = "yoga";
const MODE: CourseMode = "online";

export function generateStaticParams() {
  return COURSES.filter(
    (c) => c.category === CATEGORY && c.mode === MODE,
  ).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = findCourseBySlug(slug);
  if (!course) return { title: "Course | Bodhi School of Yoga" };
  return {
    title: `${course.title} | Bodhi School of Yoga`,
    description: course.shortDescription,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = findCourseBySlug(slug);
  if (!course || course.category !== CATEGORY || course.mode !== MODE) {
    notFound();
  }

  return <CourseDetail course={course} />;
}
