'use client';

import Link from 'next/link';
import { FaqSection } from '@/components/sections-v2/faq-section';

export default function FaqDemoPage() {
  return (
    <main className="min-h-screen bg-surface-1">
      <div className="page-px pt-8 pb-6">
        <Link
          href="/demo/v2"
          className="text-mini text-text-tertiary uppercase tracking-[0.18em] hover:text-text-primary transition-colors"
        >
          ← Back to demos
        </Link>
      </div>

      <FaqSection
        eyebrow="FAQ"
        heading="Frequently Asked Questions"
        items={[
          {
            question: 'Is this TTC Yoga Alliance certified?',
            answer:
              "Yes, Bodhi's 300-hour TTC is fully accredited by Yoga Alliance (RYS-300).",
          },
          {
            question: 'Do I need prior experience in aerial yoga?',
            answer:
              'No prior aerial yoga experience is required. A basic understanding of yoga postures and physical fitness to perform inversions is sufficient.',
          },
          {
            question: 'Can this course help me start my own aerial yoga classes?',
            answer:
              'Absolutely — upon RYT300 certification you can run your own studio classes and workshops worldwide.',
          },
          {
            question: 'What is the duration and schedule?',
            answer:
              'The online program runs for 12 weeks with flexible live sessions and recorded modules.',
          },
        ]}
      />
    </main>
  );
}
