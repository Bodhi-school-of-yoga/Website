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
        eyebrow="More Courses"
        heading="Explore More Bodhi Programs"
        subheading="Deepen your wisdom and elevate your yoga career with our specialized yoga certifications."
        items={[
          {
            image: '/images/courses/yoga-300-hour-ytt/hero.png',
            title: 'Weight Loss Coach Certification',
            subtitle: 'Online Weight Loss Coach Certification',
            href: '/yoga-courses/weight-loss-coach-certification',
          },
          {
            image: '/images/courses/yoga-300-hour-ytt/hero.png',
            title: 'MAT Pilates Instructor Certification',
            subtitle: 'Online MAT Pilates Instructor Certification',
            href: '/yoga-courses/mat-pilates-instructor-certification',
          },
          {
            image: '/images/courses/yoga-300-hour-ytt/hero.png',
            title: 'Aerial Yoga Teacher Training',
            subtitle: 'Online Aerial Yoga Teacher Training',
            href: '/yoga-courses/aerial-yoga-teacher-training',
          },
        ]}
      />
    </main>
  );
}
