// Single source of truth for the International Yoga Day campaign discount.
//
// Set the discount ONCE in ./yoga-day-offer.json and it applies to EVERY course
// card across the whole site (home, listing pages, the detail page) — the live
// price, the strikethrough original, and the "NN% off" badge are all CALCULATED
// from it. The discount is categorised: each course category can carry its own
// percent, with `default` used as the fallback.
//
//   {
//     "active": true,
//     "default": 50,
//     "byCategory": { "advanced": 40, "teacher": 50, "yoga": 60 }
//   }
//
// Set a category to 0 (or "active": false) to disable the discount there.
//
// Pricing is wired in at the catalog layer (@/data/courses-catalog applies this
// to COURSES), so nothing else in the UI needs to change.

import offerData from "./yoga-day-offer.json";

// Kept loosely typed (string) on purpose so this module has no import cycle with
// courses-catalog — the catalog's CourseCategory values flow in as plain keys.
type RawOffer = {
  active?: boolean;
  default: number;
  byCategory?: Record<string, number>;
};

const raw = offerData as RawOffer;

export const YOGA_DAY_OFFER = {
  active: raw.active ?? true,
  default: raw.default,
  byCategory: raw.byCategory ?? {},
};

// Resolve the discount percent for a category (falls back to `default`).
// Returns 0 when the campaign is off — callers treat 0 as "no discount".
export function offerPercentFor(category?: string): number {
  if (!YOGA_DAY_OFFER.active) return 0;
  const fromCategory = category
    ? YOGA_DAY_OFFER.byCategory[category]
    : undefined;
  const pct = fromCategory ?? YOGA_DAY_OFFER.default;
  return pct > 0 && pct < 100 ? pct : 0;
}

export type AppliedPrice = {
  /** Discounted live price, formatted (e.g. "₹4,999"). */
  price: string;
  /** The full pre-discount price, formatted (the strikethrough). */
  originalPrice?: string;
  /** Badge copy, e.g. "50% off". Undefined when no discount applies. */
  discountLabel?: string;
};

const parseAmount = (s: string) => Number(s.replace(/[^\d.]/g, ""));
const symbolOf = (s: string) => s.match(/^\D+/)?.[0]?.trim() ?? "";
const formatAmount = (symbol: string, n: number) =>
  `${symbol}${Math.round(n).toLocaleString("en-IN")}`;

// Apply the campaign discount to a course's FULL price for the given category.
// Returns the discounted live price + the original (strikethrough) + the badge.
// When the category's discount is 0/off, or the input has no number, returns the
// price as-is with no badge.
export function applyYogaDayOffer(
  fullPrice: string,
  category?: string,
): AppliedPrice {
  const pct = offerPercentFor(category);
  const amount = parseAmount(fullPrice);
  const symbol = symbolOf(fullPrice);

  if (!pct || !amount) return { price: fullPrice };

  // Floor so a round full price discounts to a clean ".999"-style live price
  // (e.g. ₹9,999 at 50% → ₹4,999, not ₹5,000).
  const discounted = Math.floor(amount * (1 - pct / 100));
  return {
    price: formatAmount(symbol, discounted),
    originalPrice: fullPrice,
    discountLabel: `${pct}% off`,
  };
}
