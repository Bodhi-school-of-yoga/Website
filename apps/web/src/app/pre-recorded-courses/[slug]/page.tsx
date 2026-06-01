import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { RecordedHeroWithBooking } from "@/components/sections/recorded-hero-with-booking";
import type { BreadcrumbItemData as BreadcrumbItem } from "@/components/ui/breadcrumb";
import { FilterChipBar } from "@/components/ui/filter-chip-bar";
import { FreePreviewSection } from "@/components/sections/free-preview-section";
import { UnlockVideosCTA } from "@/components/sections/unlock-videos-cta";
import { ModuleSection } from "@/components/sections/module-section";
import {
  CourseIncludesSection,
  type IncludeItem,
} from "@/components/sections/course-includes-section";
import type { VideoLessonCardProps } from "@/components/ui/video-lesson-card";

import { PRE_RECORDED_COURSES, findCourse } from "../courses";

const RECORDED_BASE = "/images/recorded-classes";
const THUMB_POOL = [
  `${RECORDED_BASE}/lesson-00.png`,
  `${RECORDED_BASE}/lesson-01.png`,
  `${RECORDED_BASE}/lesson-02.png`,
  `${RECORDED_BASE}/lesson-03.png`,
  `${RECORDED_BASE}/lesson-04.png`,
  `${RECORDED_BASE}/lesson-05.png`,
  `${RECORDED_BASE}/lesson-06.png`,
];
const LESSON_THUMB = (i: number) => THUMB_POOL[i % THUMB_POOL.length];

const freePreviewLessons: VideoLessonCardProps[] = [
  {
    lessonLabel: "Lesson 01",
    title: "Welcome & What to Expect",
    duration: "12 min",
    level: "Beginner",
    thumbnail: LESSON_THUMB(0),
    state: "free",
    durationBadge: "12:30",
  },
  {
    lessonLabel: "Lesson 02",
    title: "Setting Up Your Hammock Safely",
    duration: "18 min",
    level: "Beginner",
    thumbnail: LESSON_THUMB(1),
    state: "free",
    durationBadge: "18:45",
  },
];

const module1Lessons: VideoLessonCardProps[] = [
  {
    lessonLabel: "Lesson 03",
    title: "Understanding Your Body in the Air",
    duration: "22 min",
    level: "Beginner",
    thumbnail: LESSON_THUMB(2),
    state: "locked",
    durationBadge: "22:10",
  },
  {
    lessonLabel: "Lesson 04",
    title: "First Inversion — Supported Backbend",
    duration: "19 min",
    level: "Beginner",
    thumbnail: LESSON_THUMB(3),
    state: "locked",
    durationBadge: "19:00",
  },
  {
    lessonLabel: "Lesson 05",
    title: "Aerial Child's Pose & Recovery",
    duration: "25 min",
    level: "Beginner",
    thumbnail: LESSON_THUMB(4),
    state: "locked",
    durationBadge: "25:20",
  },
  {
    lessonLabel: "Lesson 06",
    title: "Spinal Decompression Flow",
    duration: "28 min",
    level: "Beginner",
    thumbnail: LESSON_THUMB(5),
    state: "locked",
    durationBadge: "28:00",
  },
];

const module2Lessons: VideoLessonCardProps[] = [
  {
    lessonLabel: "Lesson 09",
    title: "Aerial Warrior Sequence",
    duration: "30 min",
    level: "Intermediate",
    thumbnail: LESSON_THUMB(6),
    state: "locked",
    durationBadge: "30:15",
  },
  {
    lessonLabel: "Lesson 10",
    title: "Hip Opening & Flexibility Flow",
    duration: "22 min",
    level: "Intermediate",
    thumbnail: LESSON_THUMB(0),
    state: "locked",
    durationBadge: "22:40",
  },
  {
    lessonLabel: "Lesson 11",
    title: "Core Strength in the Hammock",
    duration: "35 min",
    level: "Intermediate",
    thumbnail: LESSON_THUMB(1),
    state: "locked",
    durationBadge: "35:00",
  },
  {
    lessonLabel: "Lesson 12",
    title: "Restorative Aerial Session",
    duration: "27 min",
    level: "Intermediate",
    thumbnail: LESSON_THUMB(2),
    state: "locked",
    durationBadge: "27:50",
  },
];

const module3Lessons: VideoLessonCardProps[] = [
  {
    lessonLabel: "Lesson 17",
    title: "Full Inversion — Aerial Headstand",
    duration: "38 min",
    level: "Advanced",
    thumbnail: LESSON_THUMB(3),
    state: "locked",
    durationBadge: "38:00",
  },
  {
    lessonLabel: "Lesson 18",
    title: "Dynamic Silk Flow Sequence",
    duration: "42 min",
    level: "Advanced",
    thumbnail: LESSON_THUMB(4),
    state: "locked",
    durationBadge: "42:00",
  },
  {
    lessonLabel: "Lesson 25",
    title: "Final Class & What's Next",
    duration: "29 min",
    level: "Advanced",
    thumbnail: LESSON_THUMB(5),
    state: "locked",
    durationBadge: "29:30",
  },
];

const includesItems: IncludeItem[] = [
  { title: "25 HD video lessons", sub: "Lifetime access to all lessons.", iconKey: "video" },
  { title: "8+ hours of expert instruction", sub: "Watch anytime, at your pace.", iconKey: "clock" },
  { title: "PDF practice guides", sub: "Notes for every module.", iconKey: "pdf" },
  { title: "Completion certificate", sub: "Shareable on LinkedIn.", iconKey: "certificate" },
  { title: "Downloadable videos", sub: "Learn offline, anywhere.", iconKey: "download" },
  { title: "Community access", sub: "Student WhatsApp group.", iconKey: "community" },
  { title: "All devices", sub: "Phone, tablet, laptop, TV.", iconKey: "devices" },
  { title: "Free future updates", sub: "New videos added regularly.", iconKey: "sparkles" },
];

export function generateStaticParams() {
  return PRE_RECORDED_COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = findCourse(slug);
  if (!course) return { title: "Pre-recorded course | Bodhi School of Yoga" };
  return {
    title: `${course.title} | Bodhi School of Yoga`,
    description: course.description,
  };
}

export default async function PreRecordedCourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = findCourse(slug);
  if (!course) notFound();

  return (
    <main className="flex min-h-screen flex-col bg-surface-1">
      <SiteHeader tone="light" />

      <RecordedHeroWithBooking
        backgroundImage="/images/recorded-classes/hero-bg.png"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Pre-recorded courses", href: "/pre-recorded-courses" },
          { label: course.title, current: true },
        ] satisfies BreadcrumbItem[]}
        titleLines={course.titleLines}
        lede={course.description}
        startsAt="2026-06-15T10:00:00+05:30"
        countdownEyebrow="Workshop starting in"
        primaryCtaLabel="Buy a Spot"
        pricing={{
          eyebrow: "Workshop Cost",
          priceCurrent: course.price,
          priceOriginal: course.priceStrike,
          discountBadge: `Save ${course.saveBadge}`,
          benefits: [
            { label: "Sat & Sun", icon: "calendar" },
            { label: "Studio", icon: "location" },
            { label: "3 days", icon: "clock" },
            { label: "English", icon: "globe" },
            { label: "Live + replay", icon: "play" },
            { label: "Limited to 60 participants", icon: "users" },
          ],
          cta: {
            label: "Book spot now",
          },
          trustNote: "🔒 100% money-back if you're not satisfied",
        }}
        courseName={course.title}
        amountInPaise={Number(course.price.replace(/[^0-9]/g, "")) * 100}
        razorpayKey={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ""}
        batches={[
          { label: "8th June – 31st July", value: "jun-8-jul-31" },
          { label: "1st Aug – 30th Sep", value: "aug-1-sep-30" },
        ]}
        timeSlots={[
          { label: "7:00 AM – 9:00 AM", value: "7am-9am" },
          { label: "4:00 PM – 6:00 PM", value: "4pm-6pm" },
        ]}
      />

      <div className=" max-w-full bg-[#000000a2]   -mt-16 mb-2 pt-4 relative z-20 flex justify-start">
        <div className=" rounded-full -mt-2 p-2  inline-flex ml-12">
          <FilterChipBar tabs={["All Videos", "Free"]} defaultIndex={0} />
        </div>
      </div>

      <FreePreviewSection
        title="Free Preview — Watch Before You Buy"
        subtitle="2 videos unlocked so you know what to expect."
        lessons={freePreviewLessons}
      />

      <UnlockVideosCTA
        body={`The remaining 23 videos are unlocked after purchase. One-time payment of ${course.price} gives you lifetime access to all lessons.`}
        ctaLabel={`Unlock All 25 Videos — ${course.price}`}
      />

      <ModuleSection
        title="Module 1 — Foundations (Lessons 3–8)"
        subtitle="Core concepts, safe entry and exit, basic inversions."
        lessons={module1Lessons}
      />

      <ModuleSection
        title="Module 2 — Building Confidence (Lessons 9–16)"
        subtitle="Standing poses, hip openers, strength sequences."
        lessons={module2Lessons}
      />

      <ModuleSection
        title="Module 3 — Advanced Flows (Lessons 17–25)"
        subtitle="Full inversions, dynamic sequences, teaching techniques."
        lessons={module3Lessons}
      />

      <CourseIncludesSection
        title="Everything Included in Your Purchase"
        items={includesItems}
      />

      <SiteFooterBlock />
    </main>
  );
}
