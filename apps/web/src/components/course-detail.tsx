import { SiteHeader } from "@/components/site-header";
import { CourseHeroWithBooking } from "@/components/sections-v2/course-hero-with-booking";
import { CourseHero } from "@/components/sections-v2/course-hero";
import { CourseOverview } from "@/components/sections-v2/course-overview";
import {
  HighlightsSection,
  type HighlightIconName,
} from "@/components/sections-v2/highlights-section";
import { CurriculumSection } from "@/components/sections-v2/curriculum-section";
import { CourseEligibilitySection } from "@/components/sections-v2/course-eligibility-section";
import { CertificationSection } from "@/components/sections-v2/certification-section";
import { VideoTestimonialsSection } from "@/components/sections/video-testimonials-section";
import { TESTIMONIAL_VIDEOS } from "@/data/testimonial-videos";
import { PrerequisitesSection } from "@/components/sections-v2/prerequisites-section";
import { InstructorsSection } from "@/components/sections-v2/instructors-section";
import { FaqSection } from "@/components/sections-v2/faq-section";
import { MoreCoursesSection } from "@/components/sections-v2/more-courses-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { CourseTabBar } from "@/components/sections-v2/course-tab-bar";

import {
  CATEGORY_LABELS,
  MODE_LABELS,
  CATEGORY_BASE_PATH,
  courseHref,
  getRelatedCourses,
  detectCurrency,
  toSmallestUnit,
  type Course,
} from "@/data/courses-catalog";

const VALID_ICONS: ReadonlySet<HighlightIconName> = new Set([
  "yoga",
  "align-center",
  "leaf",
  "strength",
  "technology",
  "people",
  "award",
  "hands",
]);

function toHighlightIcon(name: string): HighlightIconName {
  return VALID_ICONS.has(name as HighlightIconName)
    ? (name as HighlightIconName)
    : "technology";
}

export function CourseDetail({ course }: { course: Course }) {
  const related = getRelatedCourses(course, 3);
  const modeLabel = MODE_LABELS[course.mode];

  // Derived dynamic content (per-course, no manual catalog edits required) -----

  // Pricing — read straight from the catalog (courses.json), the single source
  // of truth. No invented fallbacks: a course with no price shows no price.
  const price = course.price;
  const original = course.originalPrice;
  // Booking amount: the flat price, else the cheapest plan, else 0.
  const bookingPriceStr = price ?? course.pricingPlans?.[0]?.price ?? "0";
  // Detect currency from the price string — "$1,997" → USD, "₹36,750" → INR.
  const currency = detectCurrency(bookingPriceStr);

  // Eligibility checklist — bigger than prerequisites; if catalog has many we
  // show up to 8, otherwise pad with sensible defaults aligned with the
  // course mode/category.
  const eligibilityFallback = [
    `Age 18 – 55`,
    `Open to ${modeLabel.toLowerCase()} learners`,
    "Aspiring yoga instructors",
    "Anyone striving to stay in shape",
    "Anyone who wants to be self-employed",
    "Anyone passionate about serving the community",
  ];
  const eligibilityChecklist = (() => {
    const merged = [...course.prerequisites, ...eligibilityFallback];
    const seen = new Set<string>();
    const out: string[] = [];
    for (const item of merged) {
      if (seen.has(item)) continue;
      seen.add(item);
      out.push(item);
      if (out.length === 8) break;
    }
    return out;
  })();

  // Certification body — per-course wording derived from title + category.
  const certificationHeading =
    course.category === "advanced"
      ? `Certification of ${course.title}`
      : course.category === "teacher"
      ? `${course.title} — Yoga Alliance Certified`
      : `Recognised Certification — ${course.title}`;
  const certificationBody =
    `Complete the ${course.title} successfully and receive a Bodhi ` +
    `School of Yoga certificate, accredited by Yoga Alliance. Use it to ` +
    `register with Yoga Alliance, advance your teaching career, or simply ` +
    `mark a meaningful milestone in your practice.`;

  return (
    <main className="flex min-h-screen flex-col bg-surface-1 overflow-x-clip">
      <SiteHeader />

      {course.comingSoon ? (
        <CourseHero
          backgroundImage={course.heroImage}
          imageAlt={`${course.title} — promo`}
          breadcrumb={[
            { label: "Home", href: "/" },
            {
              label: CATEGORY_LABELS[course.category],
              href: CATEGORY_BASE_PATH[course.category],
            },
            { label: course.title, current: true },
          ]}
          title={`${course.titleLead} ${course.titleAccent}`}
          subtitle={course.shortDescription}
          comingSoon
          metaPills={[
            { iconSrc: "/icon/course1.svg", label: modeLabel },
            { iconSrc: "/icon/course2.svg", label: course.durationLabel },
            { iconSrc: "/icon/course3.svg", label: course.scheduleLabel },
          ]}
          priceLabel=""
          cta={{ label: "Enquire Now", href: "/contact" }}
        />
      ) : (
        <CourseHeroWithBooking
          backgroundImage={course.heroImage}
          imageAlt={`${course.title} — promo`}
          breadcrumb={[
            { label: "Home", href: "/" },
            {
              label: CATEGORY_LABELS[course.category],
              href: CATEGORY_BASE_PATH[course.category],
            },
            { label: course.title, current: true },
          ]}
          title={`${course.titleLead} ${course.titleAccent}`}
          subtitle={course.shortDescription}
          availabilityNote={course.availabilityNote}
          metaPills={[
            { iconSrc: "/icon/course1.svg", label: modeLabel },
            { iconSrc: "/icon/course2.svg", label: course.durationLabel },
            { iconSrc: "/icon/course3.svg", label: course.scheduleLabel },
            ...(course.timingLabel
              ? [{ iconSrc: "/icon/course2.svg", label: course.timingLabel }]
              : []),
          ]}
          priceLabel="Starts at"
          price={price}
          originalPrice={original || undefined}
          pricingPlans={course.pricingPlans}
          ctaLabel="Reserve Your Spot Now"
          courseName={course.title}
          amountInPaise={toSmallestUnit(bookingPriceStr)}
          razorpayKey={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ""}
          currency={currency}
          batches={[
            {
              label: `Next batch — ${course.scheduleLabel}`,
              value: "next",
            },
            { label: "Following batch", value: "following" },
          ]}
          timeSlots={[
            { label: "Morning · 6:00 AM – 8:00 AM IST", value: "morning" },
            { label: "Evening · 6:00 PM – 8:00 PM IST", value: "evening" },
          ]}
        />
      )}

      <CourseTabBar
        tabs={[
          { label: "Overview", sectionId: "overview" },
          { label: "Highlights", sectionId: "highlights" },
          { label: "Curriculum", sectionId: "curriculum" },
          { label: "Eligibility", sectionId: "right-for-you" },
          { label: "Overall", sectionId: "testimonials" },
        ]}
      />

      <section id="overview" className="scroll-mt-[160px]">
        <CourseOverview
          eyebrow="Overview"
          heading={course.title}
          paragraphs={course.overview}
        />
      </section>

      <section id="highlights" className="scroll-mt-[160px]">
        <HighlightsSection
          eyebrow="Highlights"
          heading="What You'll Gain"
          items={course.highlights.map((h) => ({
            icon: toHighlightIcon(h.icon),
            iconSrc: h.iconSrc,
            title: h.title,
            body: h.body,
          }))}
        />
      </section>

      <section id="curriculum" className="scroll-mt-[160px]">
        <CurriculumSection
          eyebrow="Curriculum"
          heading="Course Syllabus"
          items={course.curriculum.map((c) => ({
            title: c.title,
            description: c.body,
          }))}
          nextHref="#right-for-you"
        />
      </section>

      <section id="right-for-you" className="scroll-mt-[160px]">
        <CourseEligibilitySection
          eyebrow="Eligibility"
          heading="Is This Course Right For You?"
          checklist={eligibilityChecklist}
          sideImage={course.listingImage}
          imageAlt={`${course.title} — practice in session`}
        />
      </section>

      <section id="certification" className="scroll-mt-[160px]">
        <CertificationSection
          eyebrow="Certification"
          heading={certificationHeading}
          panelHeading="Globally Recognised"
          body={certificationBody}
          footerCaption={`Issued by Bodhi School of Yoga · Yoga Alliance RYS · ${course.title}`}
        />
      </section>

      <section id="testimonials" className="scroll-mt-[160px]">
        <VideoTestimonialsSection
          eyebrow="Testimonials"
          heading="What People Are Saying?"
          testimonials={TESTIMONIAL_VIDEOS}
        />
      </section>

      <section id="pre-requisites" className="scroll-mt-[160px]">
        <PrerequisitesSection
          eyebrow="Pre-Requisites"
          heading="Before You Begin"
          checklist={course.prerequisites}
        />
      </section>

      <section id="instructors" className="scroll-mt-[160px]">
        <InstructorsSection
          eyebrow="Your Guide"
          heading="Meet Your Instructors"
          items={course.instructors.map((i) => ({
            avatar: i.avatar,
            name: i.name,
            role: i.role,
          }))}
          nextHref="#faq"
        />
      </section>

      <section id="faq" className="scroll-mt-[160px]">
        <FaqSection
          eyebrow="FAQs"
          heading="Frequently Asked Questions"
          items={course.faqs.map((f) => ({
            question: f.question,
            answer: f.answer,
          }))}
        />
      </section>

      {related.length > 0 ? (
        <section id="more-courses" className="scroll-mt-[160px]">
          <MoreCoursesSection
            eyebrow="More courses"
            heading="Continue Your Journey"
            subheading="Deepen your wisdom and elevate your yoga career with our specialised programmes."
            items={related.map((c) => ({
              image: c.listingImage,
              title: c.title,
              href: courseHref(c),
              duration: c.durationLabel,
              format: MODE_LABELS[c.mode],
              language: "English",
              author: c.instructor.name,
              initials: c.instructor.initials,
              ctaLabel: "View Program",
            }))}
          />
        </section>
      ) : null}

      <SiteFooterBlock />
    </main>
  );
}
