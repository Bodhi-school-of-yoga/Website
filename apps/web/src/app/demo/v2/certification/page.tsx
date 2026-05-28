'use client';

import Link from 'next/link';
import { CertificationSection } from '@/components/sections-v2/certification-section';

export default function CertificationDemoPage() {
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

      <CertificationSection
        eyebrow="Certification"
        heading="Certification of 300 Hour Yoga Teacher Training"
        body="Becoming a Yoga Trainer entails dedicating oneself to the Yoga practice. The goal of the Level 3 Certification Course is to instil in pupils the spirit of a Yogi. Upon completion, participants receive an international yoga teacher certification for RYT300."
        footerCaption="Gain a unique certification and grow your yoga career with a skill few teachers have."
      />
    </main>
  );
}
