'use client';

import Link from 'next/link';
import { AlignCenter, Dumbbell, Feather, HeartPulse, Leaf } from 'lucide-react';
import { HighlightsSection } from '@/components/sections-v2/highlights-section';

export default function HighlightsDemoPage() {
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

      <HighlightsSection
        eyebrow="Highlights"
        heading="What You'll Gain"
        items={[
          {
            icon: Feather,
            title: 'Yoga Meets Flight',
            body: 'Combine traditional poses with graceful aerial movements.',
          },
          {
            icon: AlignCenter,
            title: 'Relieve & Realign',
            body: 'Inversions decompress the spine and boost flexibility.',
          },
          {
            icon: Dumbbell,
            title: 'Build Strength',
            body: 'Improve core stability, balance, and control.',
          },
          {
            icon: Leaf,
            title: 'Therapeutic & Fun',
            body: 'Enjoy emotional release through playful, healing practice.',
          },
          {
            icon: HeartPulse,
            title: 'Heart, Body, Breath',
            body: 'A complete practice for body and mind.',
            emphasis: true,
          },
        ]}
      />
    </main>
  );
}
