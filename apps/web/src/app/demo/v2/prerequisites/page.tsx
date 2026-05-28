import Link from 'next/link';

import { PrerequisitesSection } from '@/components/sections-v2/prerequisites-section';

export default function PrerequisitesDemoPage() {
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
      <PrerequisitesSection
        eyebrow="Eligibility"
        heading="Pre-Requisites"
        checklist={[
          'RYT200 TTC completion from Bodhi or any other institute',
          'Physically fit to perform inversions and aerial movements',
          'Willingness to explore new boundaries of body and breath',
        ]}
        sideImage="/images/courses/yoga-300-hour-ytt/prereq-right.png"
        imageAlt="Yoga student demonstrating an aerial pose"
      />
    </main>
  );
}
