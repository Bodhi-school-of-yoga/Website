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
          heading: 'Begin where you are.',
          subheading:
            "Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that.",
          primary: { label: 'Explore Programs', href: '/yoga-courses' },
          secondary: { label: 'Talk to us', href: '/enquire?course=online-300-hour-ytt' },
        }}
        footer={{
          logoHref: '/',
          brandTagline:
            'A school for teachers, a home for seekers. Practice, taught honestly.',
          subtagline: 'Designed quietly. Practised daily.',
          linkColumns: [
            {
              heading: 'Programs',
              links: [
                { label: 'Teacher Training', href: '/teacher-training' },
                { label: 'Workshops', href: '/workshops' },
                { label: 'Classes', href: '/classes' },
              ],
            },
            {
              heading: 'About',
              links: [
                { label: 'Faculty', href: '/faculty' },
                { label: 'Lineage', href: '/lineage' },
                { label: 'Get directions', href: '/centers' },
              ],
            },
            {
              heading: 'Stay in touch',
              links: [
                { label: 'Newsletter', href: '/newsletter' },
                { label: 'Instagram', href: '#' },
                { label: 'YouTube', href: '#' },
                { label: 'Email us', href: 'mailto:hello@bodhi.school' },
              ],
            },
          ],
          copyright:
            '© Bodhi School of Yoga · Yoga Alliance Registered School (RYS-200, RYS-300)',
          socials: {
            instagram: '#',
            youtube: '#',
            email: 'mailto:hello@bodhi.school',
          },
        }}
      />
    </main>
  );
}
