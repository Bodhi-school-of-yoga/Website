import { Calendar, Clock, Languages, User } from "lucide-react";

import { CourseCard } from "@/components/ui/course-card";

const FEATURES = [
  { icon: <Calendar className="size-5" />, label: "Sat & Sun" },
  { icon: <User className="size-5" />, label: "Studio" },
  { icon: <Clock className="size-5" />, label: "3 days" },
  { icon: <Languages className="size-5" />, label: "English" },
];

const STATS = [
  { value: "25", label: "Videos" },
  { value: "8h", label: "Content" },
  { value: "∞", label: "Access" },
];

// Static date 2 days, 18h, 38m from a reference instant so the countdown
// keeps roughly the Figma value on first paint. Adjust as needed.
const WORKSHOP_TARGET = new Date(
  Date.now() + (2 * 24 + 18) * 60 * 60 * 1000 + 38 * 60 * 1000 + 19 * 1000
);

export default function CourseCardDemoPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 p-8 bg-surface-2">
      <CourseCard
        image={{
          src: "/images/courses/prana.png",
          alt: "Group of students practicing yoga with a teacher guiding inversions",
        }}
        title={'Decoding "What is Prana?"'}
        description="Pay once. Access 25 expert-led video lessons at your own pace, forever. From beginner inversions to advanced flows."
        price="₹249"
        startsCaption="Starts in 3 days"
        ctaLabel="Book spot now"
        ctaHref="#"
        features={FEATURES}
      />

      <CourseCard
        variant="workshop"
        image={{
          src: "/images/courses/sciatica.png",
          alt: "Practitioner in an aerial-yoga inversion at a sunlit studio",
        }}
        title="Yoga for Sciatica"
        description="Pay once. Access 25 expert-led video lessons at your own pace, forever. From beginner inversions to advanced flows."
        price="₹499"
        ctaLabel="Purchase now"
        ctaHref="#"
        stats={STATS}
        countdownTarget={WORKSHOP_TARGET}
        countdownEyebrow="Workshop starting in"
      />
    </main>
  );
}
