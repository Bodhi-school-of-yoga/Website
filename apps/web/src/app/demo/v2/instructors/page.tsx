'use client';

import Link from 'next/link';
import { InstructorsSection } from '@/components/sections-v2/instructors-section';

export default function InstructorsDemoPage() {
  return (
    <main className="min-h-screen bg-surface-1">
      <div className="page-px pt-8">
        <Link
          href="/demo/v2"
          className="text-mini text-text-tertiary uppercase tracking-[0.18em] hover:text-text-primary transition-colors"
        >
          ← Back to demos
        </Link>
      </div>

      <InstructorsSection
        eyebrow="Faculty"
        heading="Meet Your Instructors"
        items={[
          {
            avatar: '/images/trainers/prarthana-patel.png',
            name: 'Prarthana Patel',
            role: 'Certified Aerial Yoga Instructor · Bodhi',
          },
          {
            avatar: '/images/trainers/ashok-vankineni.png',
            name: 'Ashok Vankineni',
            role: 'Senior Yoga Trainer · Bodhi',
          },
          {
            avatar: '/images/trainers/lakshmi-yalamudi.png',
            name: 'Lakshmi Yalamudi',
            role: 'Yoga Therapist · Bodhi',
          },
          {
            avatar: '/images/trainers/atheesh-kumar.png',
            name: 'Atheesh Kumar',
            role: 'Lead Faculty · Bodhi',
          },
        ]}
        nextHref="#faq"
      />
    </main>
  );
}
