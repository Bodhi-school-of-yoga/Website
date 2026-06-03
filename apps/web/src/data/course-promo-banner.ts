// Single source of truth for the course-page promo banner.
//
// The LAYOUT is fixed (a dark-green strip under the nav); only the CONTENT
// changes over time. Edit ./course-promo-banner.json to swap the message, add a
// link, or schedule a run window — nothing in the UI needs to change.
//
//   {
//     "active": true,                       // master on/off switch
//     "startsAt": "2026-06-15T00:00:00Z",   // optional — hide before this
//     "endsAt": "2026-06-22T23:59:59Z",     // optional — hide after this
//     "text": "This International Yoga Day…",// the DEFAULT message (required)
//     "href": "/yoga-day",                  // optional — makes the strip a link
//     "linkLabel": "Claim offer",           // optional trailing call-to-action
//     "overrides": [                        // optional — per-route messages
//       {
//         "routes": ["/yoga-courses/offline", "/yoga-courses/online"],
//         "text": "…membership offer…",     // shown only on those routes
//         "href": "/yoga-day",
//         "linkLabel": null
//       }
//     ]
//   }
//
// `text`/`href`/`linkLabel` at the top level are the site-wide default. Each
// entry in `overrides` swaps that content for the listed routes (matched by
// exact path or `/route/`-prefix), so e.g. the regular-yoga listing pages can
// keep their own membership message while every other page shows the default.
//
// Set "active": false (or let the window lapse) to take it down everywhere.

import bannerData from "./course-promo-banner.json";

// The display content of a single banner variant.
export type CoursePromoBanner = {
  text: string;
  href?: string | null;
  linkLabel?: string | null;
};

type PromoBannerOverride = CoursePromoBanner & {
  routes: string[];
};

type PromoBannerConfig = CoursePromoBanner & {
  active: boolean;
  startsAt?: string | null;
  endsAt?: string | null;
  overrides?: PromoBannerOverride[];
};

const raw = bannerData as PromoBannerConfig;

// Whether the banner is live right now, honouring the on/off switch and the
// optional [startsAt, endsAt] window. Independent of which route we're on.
function isLive(now: Date): boolean {
  if (!raw.active || !raw.text?.trim()) return false;

  const t = now.getTime();
  if (raw.startsAt && t < new Date(raw.startsAt).getTime()) return false;
  if (raw.endsAt && t > new Date(raw.endsAt).getTime()) return false;

  return true;
}

// Strip config-only fields down to the display content.
function toBanner(b: CoursePromoBanner): CoursePromoBanner {
  return { text: b.text, href: b.href ?? null, linkLabel: b.linkLabel ?? null };
}

// Resolve the default (site-wide) banner when live, else null.
export function getActivePromoBanner(
  now: Date = new Date(),
): CoursePromoBanner | null {
  return isLive(now) ? toBanner(raw) : null;
}

// Resolve the banner for a specific route: a matching override's content when
// the path is listed, otherwise the default. Returns null when not live.
export function getPromoBannerForPath(
  pathname: string,
  now: Date = new Date(),
): CoursePromoBanner | null {
  if (!isLive(now)) return null;

  const override = (raw.overrides ?? []).find((o) =>
    o.routes.some((r) => pathname === r || pathname.startsWith(`${r}/`)),
  );

  return toBanner(override ?? raw);
}
