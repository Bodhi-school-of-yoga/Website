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
          {
            title: 'Rigging Essentials',
            description: 'How to safely set up and use aerial hammocks',
          },
          {
            title: 'Aerial Sequences',
            description: 'Beginner to advanced aerial yoga flows',
          },
          {
            title: 'Teaching Methodology',
            description: 'Conducting private and group aerial sessions',
          },
          {
            title: 'Alignment & Anatomy in the Air',
            description: 'How aerial postures impact muscles and joints',
          },
          {
            title: 'Contraindications & Safety',
            description: 'Modifications for common conditions',
          },
          {
            title: 'Pranayama & Breath',
            description: 'Breath techniques to anchor every flow',
          },
        ]}
        nextHref="#right-for-you"
      />
    </main>
  );
}
