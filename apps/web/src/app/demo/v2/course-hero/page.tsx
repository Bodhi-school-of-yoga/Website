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
        imageAlt="Yoga student practising on a mat"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Yoga Courses', href: '/yoga-courses' },
          { label: 'Online 300 Hour YTT', current: true },
        ]}
        title="Online 300 Hour Yoga Teacher Training — RYT 300"
        subtitle="Master the art of yoga in the air. Build strength, grace, and confidence while learning to teach this unique style."
        availabilityNote="Available in 4 Centers"
        availabilityHref="/yoga-courses/online-300-hour-ytt#centers"
        metaPills={[
          { icon: 'studio', label: 'Studio' },
          { icon: 'clock', label: '4:00 PM – 6:00 PM' },
          { icon: 'calendar', label: 'Weekdays / Weekends' },
        ]}
        priceLabel="Course fee"
        price="₹12,999"
        originalPrice="₹16,999"
        cta={{ label: 'Reserve Your Spot Now', href: '/enquire?course=online-300-hour-ytt' }}
      />
    </main>
  );
}
