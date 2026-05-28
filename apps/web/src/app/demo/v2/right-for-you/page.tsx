import Link from 'next/link';

import { CourseEligibilitySection } from '@/components/sections-v2/course-eligibility-section';

export default function RightForYouDemoPage() {
  return (
    <main className="min-h-screen bg-surface-1">
      <div className="page-px pt-8">
        <Link
          href="/demo/v2"
          className="text-mini uppercase text-text-tertiary hover:text-text-primary"
        >
          ← Back to demos
        </Link>
      </div>
      <CourseEligibilitySection
        eyebrow="Eligibility"
        heading="Is This Course Right for You?"
        checklist={[
          'RYT200 TTC completion from Bodhi or any other institute',
          'Physically fit to perform inversions and aerial movements',
          'Willingness to explore new boundaries of body and breath',
          'Enthusiastic housewives, fitness trainers, dance instructors, etc.',
          'Anybody passionate to become a professional yoga instructor',
        ]}
        sideImage="/images/courses/yoga-300-hour-ytt/eligibility.png"
        imageAlt="Yoga student practicing an inversion pose"
      />
    </main>
  );
}
