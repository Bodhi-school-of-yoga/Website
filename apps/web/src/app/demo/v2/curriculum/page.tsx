import Link from 'next/link';

import { CurriculumSection } from '@/components/sections-v2/curriculum-section';

export default function CurriculumDemoPage() {
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
      <CurriculumSection
        eyebrow="Curriculum"
        heading="Course Syllabus"
        items={[
          { image: '/images/courses/yoga-300-hour-ytt/hero.png', title: 'Aerial Sequences' },
          { image: '/images/courses/yoga-300-hour-ytt/hero.png', title: 'Pranayama & Breath' },
          { image: '/images/courses/yoga-300-hour-ytt/hero.png', title: 'Anatomy of Inversions' },
          { image: '/images/courses/yoga-300-hour-ytt/hero.png', title: 'Teaching Methodology' },
          { image: '/images/courses/yoga-300-hour-ytt/hero.png', title: 'Therapeutic Yoga' },
          { image: '/images/courses/yoga-300-hour-ytt/hero.png', title: 'Philosophy & Ethics' },
        ]}
        nextHref="#right-for-you"
      />
    </main>
  );
}
