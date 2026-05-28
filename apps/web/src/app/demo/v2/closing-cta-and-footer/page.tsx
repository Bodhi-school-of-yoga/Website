import Link from 'next/link';
import { ClosingCtaAndFooter } from '@/components/sections-v2/closing-cta-and-footer';

export default function ClosingCtaAndFooterDemoPage() {
  return (
    <main className="min-h-screen bg-surface-1">
      <div className="page-px mx-auto w-full max-w-[1340px] pt-6 pb-10">
        <Link
          href="/demo/v2"
          className="inline-flex items-center gap-2 text-mini uppercase tracking-wider text-text-tertiary hover:text-text-primary motion-safe:transition-colors"
        >
          <span aria-hidden>←</span> Back to demos
        </Link>
      </div>

      <ClosingCtaAndFooter
        cta={{
          wordmark: 'Bodhi',
          headingLead: 'Begin where',
          headingAccent: 'you are.',
          subheading:
            "Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that.",
          primary: { label: 'Try a class, free', href: '/yoga-courses' },
        }}
        footer={{
          logoHref: '/',
          wordmark: 'Bodhi',
          brandTagline:
            'A school for teachers, a home for seekers.\nPractice, taught honestly.',
          websiteLabel: 'bodhischoolofyoga.com',
          websiteHref: 'https://bodhischoolofyoga.com',
          linkColumns: [
            {
              heading: 'School',
              links: [
                { label: 'Teacher Training', href: '/teacher-training' },
                { label: 'Workshops', href: '/workshops' },
                { label: 'Classes', href: '/classes' },
                { label: 'Faculty', href: '/faculty' },
                { label: 'Lineage', href: '/lineage' },
              ],
            },
            {
              heading: 'Visit',
              links: [
                { label: 'The Practice Room,', href: '/centers' },
                { label: '2nd floor, Quiet Lane', href: '/centers' },
                { label: 'City  · India', href: '/centers' },
                { label: 'Get directions →', href: '/centers' },
              ],
            },
            {
              heading: 'Stay close',
              links: [
                { label: 'Newsletter', href: '/newsletter' },
                { label: 'Instagram', href: '#' },
                { label: 'YouTube', href: '#' },
                { label: 'Email us', href: 'mailto:hello@bodhi.school' },
              ],
            },
          ],
          copyright:
            '© Bodhi School of Yoga  ·  Yoga Alliance Registered School (RYS-200, RYS-300)',
          signoff: 'Designed quietly. Practised daily.',
        }}
      />
    </main>
  );
}
