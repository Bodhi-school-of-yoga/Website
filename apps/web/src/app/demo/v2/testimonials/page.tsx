'use client';

import Link from 'next/link';
import { TestimonialsSection } from '@/components/sections-v2/testimonials-section';

export default function TestimonialsDemoPage() {
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

      <TestimonialsSection
        eyebrow="Testimonials"
        heading="What People Are Saying?"
        items={[
          {
            avatar: '/images/trainers/prajakta-jadhav.png',
            quote: "If you're unsure, just attend — it could change your life!",
            name: 'Prajakta Jadhav',
            role: 'Certified Aerial Yoga Instructor · Bodhi',
          },
          {
            avatar: '/images/trainers/sneha-shankar.png',
            quote:
              'The instructors made every concept land. I left with confidence and clarity.',
            name: 'Sneha Shankar',
            role: 'RYT 300 Graduate · Bodhi',
          },
          {
            avatar: '/images/trainers/muskan-jain.png',
            quote:
              'Bodhi blends tradition and practical teaching better than any program I have tried.',
            name: 'Muskan Jain',
            role: 'Yoga Therapist · Bodhi',
          },
          {
            avatar: '/images/trainers/eeena-chawla.png',
            quote:
              'The aerial modules opened a whole new dimension of my practice.',
            name: 'Eeena Chawla',
            role: 'Aerial Yoga Instructor · Bodhi',
          },
        ]}
      />
    </main>
  );
}
