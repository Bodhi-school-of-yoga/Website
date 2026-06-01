import Link from 'next/link';

import {
  getActivePromoBanner,
  type CoursePromoBanner,
} from '@/data/course-promo-banner';

export type PromoBannerProps = {
  /** Pass explicit data to override the JSON source (e.g. for previews). */
  banner?: CoursePromoBanner | null;
  className?: string;
};

// Split the message on **emphasis** markers so the JSON stays a single editable
// string while key figures (e.g. **75%**, **₹2000**) render larger + in mint —
// matching the Figma banner (18px base, 24px emphasis).
function renderText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    if (m) {
      return (
        <span
          key={i}
          className="text-brand-shade text-[14px] font-semibold leading-none sm:text-[17px]"
        >
          {m[1]}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/**
 * Fixed-layout promo strip under the nav. Content is data-driven via
 * data/course-promo-banner.json (see getActivePromoBanner) — the layout never
 * changes, only the message/link/run-window do. Renders nothing when inactive.
 */
export function PromoBanner({ banner, className }: PromoBannerProps) {
  const data = banner !== undefined ? banner : getActivePromoBanner();
  if (!data) return null;

  const content = (
    <p className="mx-auto flex max-w-[940px] flex-wrap items-baseline justify-center gap-x-1.5 gap-y-0.5 text-center text-[12px] font-semibold leading-snug sm:text-[15px]">
      {renderText(data.text)}
      {data.href && data.linkLabel ? (
        <span className="ml-1 font-bold text-brand-shade underline-offset-4">
          {data.linkLabel}
        </span>
      ) : null}
    </p>
  );

  const base = [
    'flex min-h-[48px] w-full items-center bg-brand-primary text-text-inverse sm:min-h-[40px]',
    className ?? '',
  ].join(' ');

  if (data.href) {
    return (
      <Link
        href={data.href}
        aria-label={`${data.text.replace(/\*\*/g, '')}${
          data.linkLabel ? ` — ${data.linkLabel}` : ''
        }`}
        className={`${base} page-px py-2.5 transition-colors hover:bg-brand-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-shade`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div role="region" aria-label="Promotion" className={`${base} page-px py-2.5`}>
      {content}
    </div>
  );
}
