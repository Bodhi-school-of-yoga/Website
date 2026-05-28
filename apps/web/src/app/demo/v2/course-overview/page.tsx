import Link from 'next/link';

import { CourseOverview } from '@/components/sections-v2/course-overview';

export default function CourseOverviewDemoPage() {
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
      <CourseOverview
        eyebrow="Overview"
        heading="Deepen Your Practice, Advance Your Teaching"
        paragraphs={[
          "The online 300-hour YTT improves a trainer's comprehension of core yoga principles and teachings.",
          'After completing this advanced course, you will be certified as a RYT300 international yoga trainer.',
          'This 300 Hour TTC is accredited and recognised by Yoga Alliance.',
        ]}
      />
    </main>
  );
}
