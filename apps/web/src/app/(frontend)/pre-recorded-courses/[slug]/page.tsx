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
import { UnlockVideosCTAWithPayment } from "@/components/sections/unlock-videos-cta-with-payment";

import { PRE_RECORDED_COURSES, findCourse, type CourseLesson } from "../courses";

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

/** Turns a catalog lesson into a render-ready card, assigning a thumbnail + lock state. */
function toLessonCard(
  lesson: CourseLesson,
  index: number,
  state: "free" | "locked",
): VideoLessonCardProps {
  return {
    lessonLabel: lesson.lessonLabel,
    title: lesson.title,
    duration: lesson.duration,
    level: lesson.level,
    thumbnail: LESSON_THUMB(index),
    state,
    durationBadge: lesson.durationBadge,
  };
}

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

  const freePreviewLessons = course.freePreview.map((l, i) =>
    toLessonCard(l, i, "free"),
  );
  // Continue thumbnail rotation past the free-preview lessons so locked cards
  // don't repeat the same images.
  let lessonCursor = course.freePreview.length;
  const moduleSections = course.modules.map((mod) => {
    const lessons = mod.lessons.map((l) =>
      toLessonCard(l, lessonCursor++, "locked"),
    );
    return { title: mod.title, subtitle: mod.subtitle, lessons };
  });

  return (
    <main className="flex min-h-screen flex-col bg-surface-1">
      <SiteHeader tone="light" />

      <RecordedHeroWithBooking
        backgroundImage={course.image.src}
        backgroundAlt={course.image.alt}
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

      <UnlockVideosCTAWithPayment
        body={`The remaining 23 videos are unlocked after purchase. One-time payment of ${course.price} gives you lifetime access to all lessons.`}
        ctaLabel={`Unlock All 25 Videos — ${course.price}`}
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

      {moduleSections.map((mod) => (
        <ModuleSection
          key={mod.title}
          title={mod.title}
          subtitle={mod.subtitle}
          lessons={mod.lessons}
        />
      ))}

      <CourseIncludesSection
        title="Everything Included in Your Purchase"
        items={includesItems}
      />

      <SiteFooterBlock />
    </main>
  );
}
