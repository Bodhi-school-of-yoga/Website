// ListingHeroDecoration — the right-edge artwork from the Figma listing-hero
// (node 819:17571): a mint star-burst with a yoga-pose cutout in front.
// Passed to <ListingHero decoration={...} />; the hero hides it below `lg`.

import Image from "next/image";

export function ListingHeroDecoration() {
  return (
    <div className="relative h-full w-[380px]">
      {/* Mint star-burst (own gradient fill) behind the figure, sitting low so
          it bleeds off the bottom of the band and reads as a partial accent. */}
      <div
        className="absolute right-[-70px] bottom-[-110px] h-[380px] w-[380px] bg-contain bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/advanced-online-star.svg')" }}
      />
      {/* Yoga-pose cutout, anchored to the bottom so the feet meet the bottom
          edge of the hero section. */}
      <Image
        src="/images/hero/advanced-online-pose.png"
        alt=""
        width={404}
        height={410}
        priority
        className="absolute right-[-15px] bottom-0 h-[300px] w-auto max-w-none object-contain"
      />
    </div>
  );
}
