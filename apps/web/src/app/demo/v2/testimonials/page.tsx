'use client';

import Link from 'next/link';
import { TestimonialsSection } from '@/components/sections-v2/testimonials-section';

export default function TestimonialsDemoPage() {
  return (
    <main className="min-h-screen bg-surface-1">
      <div className="page-px pt-8">
        <Link
          href="/demo/v2"
          className="text-mini text-text-tertiary uppercase tracking-[1.8px] hover:text-text-primary transition-colors"
        >
          ← Back to demos
        </Link>
      </div>

      <TestimonialsSection
        eyebrow="Your Guide"
        heading="What People Are Saying?"
        items={[
          {
            avatar: '/images/trainers/prajakta-jadhav.png',
            quote:
              'It could tell my past self that I’d someday quit packaged food, shed laugh - chips were my weakness! I can now distinguish what’s good for my body and treat it like a temple, not a trash can.',
            name: 'Anjilina Kalita',
            role: '27, Guwahati',
          },
          {
            avatar: '/images/trainers/sneha-shankar.png',
            quote:
              'It could tell my past self that I’d someday quit packaged food, shed laugh - chips were my weakness! I can now distinguish what’s good for my body and treat it like a temple, not a trash can.',
            name: 'Sharada Sampathkumar',
            role: '49, Bengaluru',
          },
          {
            quote:
              'It could tell my past self that I’d someday quit packaged food, shed laugh - chips were my weakness! I can now distinguish what’s good for my body and treat it like a temple, not a trash can.',
            name: 'Anjilina Kalita',
            role: '27, Guwahati',
          },
          {
            avatar: '/images/trainers/muskan-jain.png',
            quote:
              'It could tell my past self that I’d someday quit packaged food, shed laugh - chips were my weakness! I can now distinguish what’s good for my body and treat it like a temple, not a trash can.',
            name: 'Anjilina Kalita',
            role: '27, Guwahati',
          },
          {
            quote:
              'It could tell my past self that I’d someday quit packaged food, shed laugh - chips were my weakness! I can now distinguish what’s good for my body and treat it like a temple, not a trash can.',
            name: 'Sharada Sampathkumar',
            role: '49, Bengaluru',
          },
        ]}
      />
    </main>
  );
}
