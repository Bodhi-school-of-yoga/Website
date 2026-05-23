import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Bodhi's globals.css adds custom typography sizes (text-h1..h5, text-body-md/sm,
// text-mini, text-subtext-1..3) and custom text-color tokens (text-text-primary,
// text-text-inverse, text-text-brand, …). Both sets use the `text-` prefix, so
// default tailwind-merge collapses them into the same conflict group and drops
// whichever class appeared first — most commonly the color when combined with a
// font-size. Extending the font-size and text-color groups teaches twMerge to
// keep one of each.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "body-md",
            "body-sm",
            "mini",
            "subtext-1",
            "subtext-2",
            "subtext-3",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "text-primary",
            "text-secondary",
            "text-tertiary",
            "text-brand",
            "text-brand-deep",
            "text-inverse",
            "text-teal-deep",
            "text-teal-dark",
            "text-mint-shade",
            "text-mint-pale",
            "text-cyan",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
