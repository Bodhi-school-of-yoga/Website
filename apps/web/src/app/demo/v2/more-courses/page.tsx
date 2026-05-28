import Link from 'next/link';

import { MoreCoursesSection } from '@/components/sections-v2/more-courses-section';

export default function MoreCoursesDemoPage() {
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
      <MoreCoursesSection
        eyebrow="Top Popular Yoga Course"
        heading="Lead to more courses from us"
        subheading="Deepen your wisdom and elevate your yoga career with our specialized yoga certifications."
        items={[
          {
            image: '/images/courses/yoga-300-hour-ytt/hero.png',
            title: 'Online Weight Loss Coach Certification',
            href: '/yoga-courses/weight-loss-coach-certification',
            duration: '4 weeks',
            format: 'Online',
            language: 'English',
            author: 'Janardhan Durga Prasad',
            initials: 'JD',
          },
          {
            image: '/images/courses/yoga-300-hour-ytt/hero.png',
            title: 'Online Mudra Therapy Yoga Teacher Training',
            href: '/yoga-courses/mudra-therapy-yoga-teacher-training',
            duration: '2 weeks',
            format: 'Online',
            language: 'English',
            author: 'Prarthana Patel',
            initials: 'PP',
          },
          {
            image: '/images/courses/yoga-300-hour-ytt/hero.png',
            title: 'Online MAT Pilates Instructor Certification',
            href: '/yoga-courses/mat-pilates-instructor-certification',
            duration: '4 weeks',
            format: 'Online',
            language: 'English',
            author: 'Lakshmi Yalamudi',
            initials: 'LY',
          },
        ]}
      />
    </main>
  );
}
