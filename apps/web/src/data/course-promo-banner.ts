// Single source of truth for the course-page promo banner.
//
// The LAYOUT is fixed (a dark-green strip under the nav); only the CONTENT
// changes over time. Edit ./course-promo-banner.json to swap the message, add a
// link, or schedule a run window — nothing in the UI needs to change.
//
//   {
//     "active": true,                       // master on/off switch
//     "text": "This International Yoga Day…",// the message (required)
//     "href": "/courses/regular-yoga",      // optional — makes the strip a link
//     "linkLabel": "Claim offer",           // optional trailing call-to-action
//     "startsAt": "2026-06-15T00:00:00Z",   // optional — hide before this
//     "endsAt": "2026-06-22T23:59:59Z"      // optional — hide after this
//   }
//
// Set "active": false (or let the window lapse) to take it down.

import bannerData from "./course-promo-banner.json";

export type CoursePromoBanner = {
  active: boolean;
  text: string;
  href?: string | null;
  linkLabel?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
};

const raw = bannerData as CoursePromoBanner;

// Resolve whether the banner should show right now, honouring the on/off switch
// and the optional [startsAt, endsAt] window. Returns the banner data when live,
// otherwise null so callers can render nothing.
export function getActivePromoBanner(
  now: Date = new Date(),
): CoursePromoBanner | null {
  if (!raw.active || !raw.text?.trim()) return null;

  const t = now.getTime();
  if (raw.startsAt && t < new Date(raw.startsAt).getTime()) return null;
  if (raw.endsAt && t > new Date(raw.endsAt).getTime()) return null;

  return raw;
}
