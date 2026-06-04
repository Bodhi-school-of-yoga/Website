'use client';

import * as React from 'react';

import { PromoBanner } from './promo-banner';
import { usePromoBanner } from './use-promo-banner';

/**
 * Site-wide promo strip. Rendered globally (outside SiteHeader) and pinned just
 * below the fixed nav, tracking the nav's scroll-shrink so it stays glued to its
 * bottom edge. Renders nothing when inactive or on an excluded route (see
 * usePromoBanner). PromoBannerOffset reserves matching top space.
 */
export function PromoBannerBar() {
  const { banner } = usePromoBanner();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!banner) return null;

  // Mirror SiteHeader's height so the bar sits flush under the nav at rest and
  // while scrolled.
  const top = scrolled
    ? 'top-[68px] sm:top-[72px] lg:top-[76px]'
    : 'top-[76px] sm:top-[80px] lg:top-[88px]';

  return (
    <PromoBanner
      banner={banner}
      className={`fixed inset-x-0  z-40 ${top} motion-safe:transition-[top] motion-safe:duration-300`}
    />
  );
}
