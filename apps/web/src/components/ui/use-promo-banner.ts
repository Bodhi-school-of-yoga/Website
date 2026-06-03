'use client';

import { usePathname } from 'next/navigation';

import {
  getPromoBannerForPath,
  type CoursePromoBanner,
} from '@/data/course-promo-banner';

// Routes that must NOT show the promo bar — chiefly the Yoga Day page itself,
// which is where the banner links to (no point advertising it on its own page).
const HIDDEN_PREFIXES = ['/yoga-day'];

/**
 * Single source of truth for whether the site-wide promo bar shows on the
 * current route. Combines the JSON active/window check with the route excludes.
 * Both the fixed bar and the layout spacer read this so they appear/disappear
 * together.
 */
export function usePromoBanner(): {
  banner: CoursePromoBanner | null;
  visible: boolean;
} {
  const pathname = usePathname() ?? '';
  const banner = getPromoBannerForPath(pathname);

  const excluded = HIDDEN_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  const visible = Boolean(banner) && !excluded;

  return { banner: visible ? banner : null, visible };
}
