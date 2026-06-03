// ListingHeroDecoration — the right-edge artwork from the Figma listing-hero
// (node 819:17571): a mint star-burst with a yoga-pose cutout in front.
// Passed to <ListingHero decoration={...} />; the hero hides it below `lg`.
//
// The pose figure varies by course family via the `variant` prop (additive,
// opt-in). `advanced` keeps the original artwork so the advanced-certification
// pages stay unchanged; `regular` and `teacher` swap in their own cutouts.

import Image from "next/image";

export type ListingHeroDecorationVariant = "advanced" | "regular" | "teacher";

type PoseConfig = {
  src: string;
  /** Intrinsic pixel size of the source PNG (drives aspect ratio). */
  width: number;
  height: number;
  /** Per-variant size + anchor so each pose's base meets the band edge. */
  className: string;
};

const POSE_BY_VARIANT: Record<ListingHeroDecorationVariant, PoseConfig> = {
  advanced: {
    src: "/images/hero/advanced-online-pose.png",
    width: 404,
    height: 410,
    className: "right-[80px] bottom-[-20px] h-[270px]",
  },
  regular: {
    src: "/images/programs/daily-regular-hero.png",
    width: 351,
    height: 285,
    className: "right-[125px] bottom-[-20px] h-[220px]",
  },
  teacher: {
    src: "/images/programs/teacher-become-hero.png",
    width: 290,
    height: 372,
    className: "right-[140px] bottom-[-14px] h-[280px]",
  },
};

export function ListingHeroDecoration({
  variant = "advanced",
}: {
  variant?: ListingHeroDecorationVariant;
}) {
  const pose = POSE_BY_VARIANT[variant];

  return (
    <div className="relative h-full w-[380px]">
      {/* Mint star-burst (own gradient fill) behind the figure, sitting low so
          it bleeds off the bottom of the band and reads as a partial accent. */}
      <div
        className="absolute right-[70px] bottom-[-80px] h-[320px] w-[320px] bg-contain bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/advanced-online-star.svg')" }}
      />
      {/* Yoga-pose cutout, anchored to the bottom so the feet meet the bottom
          edge of the hero section. */}
      <Image
        src={pose.src}
        alt=""
        width={pose.width}
        height={pose.height}
        priority
        className={`absolute w-auto max-w-none object-contain ${pose.className}`}
      />
    </div>
  );
}
