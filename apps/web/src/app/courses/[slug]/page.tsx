import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDetail } from "@/components/course-detail";
import { COURSES, fetchCourseBySlug } from "@/data/courses-catalog";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await fetchCourseBySlug(slug);
  if (!course) return { title: "Course | Bodhi School of Yoga" };
  return {
    title: `${course.title} | Bodhi School of Yoga`,
    description: course.shortDescription,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await fetchCourseBySlug(slug);
  if (!course) notFound();

  return <CourseDetail course={course} />;
}
