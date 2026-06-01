'use client';

import { usePromoBanner } from './use-promo-banner';

/**
 * Flow spacer that reserves the height of the fixed promo bar so page content
 * never hides behind it. Height matches PromoBanner's min-height. Renders
 * nothing (no reserved space) wherever the bar is hidden — same route/active
 * rules as the bar, so they appear and disappear in lockstep.
 */
export function PromoBannerOffset() {
  const { visible } = usePromoBanner();
  if (!visible) return null;
  return <div aria-hidden className="h-[48px] sm:h-[40px]" />;
}
