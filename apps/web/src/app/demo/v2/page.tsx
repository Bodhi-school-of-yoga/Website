import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bodhi — Component Demos (v2)',
};

type DemoLink = {
  href: string;
  label: string;
  description: string;
};

const demos: DemoLink[] = [
  {
    href: '/demo/v2/course-hero',
    label: 'Course Hero',
    description: 'Top hero with breadcrumb, title, price and enroll CTA.',
  },
  {
    href: '/demo/v2/course-overview',
    label: 'Course Overview',
    description: 'Two-column overview with stats and intro copy.',
  },
  {
    href: '/demo/v2/highlights',
    label: 'Highlights',
    description: 'Grid of key course highlights and value props.',
  },
  {
    href: '/demo/v2/curriculum',
    label: 'Curriculum',
    description: 'Modules and lessons grouped by training phase.',
  },
  {
    href: '/demo/v2/right-for-you',
    label: 'Is It Right For You?',
    description: 'Audience fit list with persona-driven bullets.',
  },
  {
    href: '/demo/v2/certification',
    label: 'Certification',
    description: 'Credential, accreditation and what you receive.',
  },
  {
    href: '/demo/v2/testimonials',
    label: 'Testimonials',
    description: 'Student quotes and outcomes from past cohorts.',
  },
  {
    href: '/demo/v2/prerequisites',
    label: 'Pre-Requisites',
    description: 'Eligibility, prior training and equipment notes.',
  },
  {
    href: '/demo/v2/instructors',
    label: 'Instructors',
    description: 'Teacher profiles with bios and specialities.',
  },
  {
    href: '/demo/v2/faq',
    label: 'FAQ',
    description: 'Common questions about enrollment and the course.',
  },
  {
    href: '/demo/v2/more-courses',
    label: 'More Courses',
    description: 'Cross-sell strip of related Bodhi programs.',
  },
  {
    href: '/demo/v2/closing-cta-and-footer',
    label: 'Closing CTA + Footer',
    description: 'Final call-to-action paired with the site footer.',
  },
];

export default function DemoV2IndexPage() {
  return (
    <main className="min-h-screen bg-surface-1">
      <div className="page-px mx-auto w-full max-w-[1340px] py-section">
        <header className="mb-10 flex flex-col gap-3">
          <p className="text-mini uppercase tracking-wider text-text-tertiary">
            Bodhi · Components
          </p>
          <h1 className="text-h2 text-text-primary">Component Demos (v2)</h1>
          <p className="text-h5 text-text-tertiary max-w-[720px]">
            Preview each section of the new course page in isolation. Each card
            opens a standalone demo route.
          </p>
        </header>

        <ul
          role="list"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {demos.map((demo) => (
            <li key={demo.href}>
              <Link
                href={demo.href}
                className="group block h-full rounded-2xl border border-border-subtle bg-surface-2 p-6 outline-none transition motion-safe:hover:-translate-y-0.5 hover:border-border-strong focus-visible:ring-2 focus-visible:ring-text-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
              >
                <div className="flex h-full flex-col gap-3">
                  <span className="text-mini uppercase tracking-wider text-text-tertiary">
                    {demo.href}
                  </span>
                  <h2 className="text-h4 text-text-primary">{demo.label}</h2>
                  <p className="text-mini text-text-tertiary">
                    {demo.description}
                  </p>
                  <span
                    aria-hidden
                    className="mt-auto inline-flex items-center gap-1 text-mini uppercase tracking-wider text-text-brand"
                  >
                    Open demo <span>→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
