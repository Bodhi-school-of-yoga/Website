import Link from 'next/link';
import { CourseHero } from '@/components/sections-v2/course-hero';

export default function CourseHeroDemoPage() {
  return (
    <main className="min-h-screen bg-surface-1">
      <div className="page-px mx-auto w-full max-w-[1340px] pt-6">
        <Link
          href="/demo/v2"
          className="inline-flex items-center gap-2 text-mini uppercase tracking-wider text-text-tertiary hover:text-text-primary motion-safe:transition-colors"
        >
          <span aria-hidden>←</span> Back to demos
        </Link>
      </div>

      <CourseHero
        backgroundImage="/images/courses/yoga-300-hour-ytt/hero.png"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Yoga Courses', href: '/yoga-courses' },
          { label: 'Online 300 Hour YTT', current: true },
        ]}
        title="Online 300 Hour Yoga Teacher Training — RYT 300"
        priceLabel="Course fee"
        price="₹12,999"
        cta={{ label: 'Enroll Now', href: '/enquire?course=online-300-hour-ytt' }}
      />
    </main>
  );
}
