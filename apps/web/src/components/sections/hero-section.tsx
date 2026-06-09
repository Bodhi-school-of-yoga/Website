"use client";

// HeroSection — homepage hero. Desktop layout is anchored to the 1920px Figma
// design (node 1:32). All horizontal positions, image size, and the watermark
// are expressed in vw of 1920 (see .hero-1920 utility in globals.css) so the
// design holds at 1920 and compresses proportionally on smaller desktops.
// Typography uses Bodhi tokens (text-h1 / text-hero-eyebrow / text-hero-sub)
// which scale through --u-display / --u-text, both anchored at 1920.
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { usePromoBanner } from "@/components/ui/use-promo-banner";
import { Separator } from "../ui/separator";

export type HeroOfferChip = {
  eyebrow: string;
  label: string;
  href: string;
  buttonColor: string;
  /** When true, clicking opens an online/offline choice dialog instead of navigating directly. */
  showModeDialog?: boolean;
  /** Identifies which dialog variant to show (e.g. "teacher" or "yoga"). */
  dialogVariant?: "teacher" | "yoga";
};

export type HeroSectionProps = {
  eyebrow?: string;
  headlineLead?: string;
  headlineAccent?: string;
  subcopy?: string;
  photoSrc?: string;
  photoAlt?: string;
  watermark?: string;
  offerLabel?: string;
  offers?: HeroOfferChip[];
  className?: string;
};

const DEFAULT_OFFERS: HeroOfferChip[] = [
  {
    eyebrow: "yoga teacher training",
    label: "I want to teach Yoga & Pilates",
    href: "/teacher-courses/online",
    buttonColor: "#008498",
    showModeDialog: true,
    dialogVariant: "teacher",
  },
  {
    eyebrow: "daily yoga classes",
    label: "I want to learn Yoga & Pilates",
    href: "/yoga-courses/online",
    buttonColor: "#0d9800",
    showModeDialog: true,
    dialogVariant: "yoga",
  },
  {
    eyebrow: "wellness workshops",
    label: "Looking for short Workshops",
    href: "/workshops",
    buttonColor: "#009877",
  },
];

const DEFAULTS = {
  eyebrow: "बोधि  ·  The awakening",
  headlineLead: "Yoga for Self",
  headlineAccent: "Yoga for Teaching",
  subcopy:
    "Discover a premium yoga and wellness experience offering teacher training, regular practice, and therapy sessions through immersive online and offline programs.",
  photoSrc: "/images/hero/foreground.png",
  photoAlt: "A student in seated meditation pose at Bodhi studio.",
  watermark: "बोधि",
  offerLabel: "what do we offer",
};

export function HeroSection({
  eyebrow = DEFAULTS.eyebrow,
  headlineLead = DEFAULTS.headlineLead,
  headlineAccent = DEFAULTS.headlineAccent,
  subcopy = DEFAULTS.subcopy,
  photoSrc = DEFAULTS.photoSrc,
  photoAlt = DEFAULTS.photoAlt,
  watermark = DEFAULTS.watermark,
  offerLabel = DEFAULTS.offerLabel,
  offers = DEFAULT_OFFERS,
  className,
}: HeroSectionProps) {
  const { visible: bannerVisible } = usePromoBanner();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogVariant, setDialogVariant] = React.useState<"teacher" | "yoga">("teacher");

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden md:pt-0 pt-8",
        "bg-[linear-gradient(to_bottom,var(--color-brand-lite)_0%,#ffffff_100%)]",
        className,
      )}
    >
      <HeroDesktop
        eyebrow={eyebrow}
        headlineLead={headlineLead}
        headlineAccent={headlineAccent}
        subcopy={subcopy}
        photoSrc={photoSrc}
        photoAlt={photoAlt}
        watermark={watermark}
        offerLabel={offerLabel}
        offers={offers}
        bannerVisible={bannerVisible}
        onOfferDialogOpen={(variant) => { setDialogVariant(variant); setDialogOpen(true); }}
      />
      <HeroMobile
        eyebrow={eyebrow}
        headlineLead={headlineLead}
        headlineAccent={headlineAccent}
        subcopy={subcopy}
        photoSrc={photoSrc}
        photoAlt={photoAlt}
        offerLabel={offerLabel}
        offers={offers}
        bannerVisible={bannerVisible}
        onOfferDialogOpen={(variant) => { setDialogVariant(variant); setDialogOpen(true); }}
      />
      <CourseModeDialog open={dialogOpen} onOpenChange={setDialogOpen} variant={dialogVariant} />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Desktop (lg+) — 1920-anchored layout.
// ---------------------------------------------------------------------------

type DesktopProps = Required<
  Pick<
    HeroSectionProps,
    | "eyebrow"
    | "headlineLead"
    | "headlineAccent"
    | "subcopy"
    | "photoSrc"
    | "photoAlt"
    | "watermark"
    | "offerLabel"
    | "offers"
  >
> & { bannerVisible: boolean; onOfferDialogOpen: (variant: "teacher" | "yoga") => void };

function HeroDesktop({
  eyebrow,
  headlineLead,
  headlineAccent,
  subcopy,
  photoSrc,
  photoAlt,
  watermark,
  offerLabel,
  offers,
  bannerVisible,
  onOfferDialogOpen,
}: DesktopProps) {
  return (
    <div
      className={cn(
        "hero-1920",
        "relative hidden lg:block",
        bannerVisible ? "pt-[80px]" : "pt-[2rem]",
        "min-h-(--hero-min-h)",
      )}
    >
      <HeroWatermark text={watermark} />
      <HeroImage src={photoSrc} alt={photoAlt} />

      <div
        className={cn(
          "relative z-20",
          "pl-[12rem] pr-(--hero-gutter)",
          "pt-(--hero-text-pt) pb-12",
        )}
      >
        <HeroEyebrow text={eyebrow} />
        <HeroHeadline lead={headlineLead} accent={headlineAccent} />
        <HeroSubhead text={subcopy} />
        <HeroOfferRow label={offerLabel} offers={offers} onOfferDialogOpen={onOfferDialogOpen} />
      </div>
    </div>
  );
}

function HeroWatermark({ text }: { text: string }) {
  // Exact Figma spec (node 1:37): Fraunces 520px / 442px line-height (85%) /
  // -20.8px letter-spacing (-0.04em) / color #038F9F at 10% opacity.
  // Fraunces lacks Devanagari glyphs so the browser falls back to a system
  // Devanagari face — same behavior as Figma.
  return (
    <span
      aria-hidden
      lang="hi"
      className={cn(
        "pointer-events-none absolute z-0 select-none whitespace-nowrap",
        "left-(--hero-watermark-x) top-[10rem]",
        "font-normal not-italic",
        "leading-[0.85] tracking-[-0.04em]",
        "text-(length:--hero-watermark-w)",
        "text-(--color-brand-teal) opacity-10",
      )}
      style={{
        fontFamily: 'Fraunces, "Noto Sans Devanagari", system-ui, sans-serif',
      }}
    >
      {text}
    </span>
  );
}

function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-10",
        "-bottom-18 -right-32",
        " h-[80vh] w-[80vw] ",
      )}
    >
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="vw"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}

function HeroEyebrow({ text }: { text: string }) {
  return (
    <p
      className={cn(
        "uppercase whitespace-nowrap font-semibold text-xs",
        "text-hero-eyebrow",
        "text-(--color-text-brand-emerald)",
      )}
    >
      {text}
    </p>
  );
}

function HeroHeadline({ lead, accent }: { lead: string; accent: string }) {
  return (
    <h1
      className={cn(
        "mt-[1.46vw]",                       // 28 / 1920
        "max-w-(--hero-headline-w)",
        "font-heading text-hero-headline",
      )}
    >
      <span className="text-text-primary">{lead}</span>
      <br/>
      <span className="text-text-brand">{accent}</span>
    </h1>
  );
}

function HeroSubhead({ text }: { text: string }) {
  return (
    <p
      className={cn(
        "mt-[1.30vw]",                       // 25 / 1920
        "max-w-(--hero-sub-w)",
        "text-hero-sub",
        "text-(--color-text-subdued)",
      )}
    >
      {text}
    </p>
  );
}

function HeroOfferRow({
  label,
  offers,
  onOfferDialogOpen,
}: {
  label: string;
  offers: HeroOfferChip[];
  onOfferDialogOpen: (variant: "teacher" | "yoga") => void;
}) {
  return (
    <div className="relative z-30 mt-24">
      <p
        className={cn(
          "mb-4 uppercase",
          "text-xs font-semibold",
          "text-(--color-text-brand-emerald)",
        )}
      >
        {label}
      </p>
      <ul
        className={cn(
          "grid grid-cols-3 ",
          "gap-4",
          "max-w-(--hero-chips-max-w)",
        )}
      >
        {offers.map((offer) => (
          <li key={offer.label}>
            <HeroOfferChipCard offer={offer} variant="desktop" onDialogOpen={onOfferDialogOpen} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile / tablet (< lg) — stacked flow, tokens compressed by --u-text.
// ---------------------------------------------------------------------------

type MobileProps = Omit<DesktopProps, "watermark">;

function HeroMobile({
  eyebrow,
  headlineLead,
  headlineAccent,
  subcopy,
  photoSrc,
  photoAlt,
  offerLabel,
  offers,
  bannerVisible,
  onOfferDialogOpen,
}: MobileProps) {
  return (
    <div className="relative lg:hidden">
      <div
        className={cn(
          "mx-auto w-full max-w-[720px]",
          "px-5 sm:px-8",
          bannerVisible ? "pt-[112px] pb-10 sm:pt-[128px] mt-7" : "pt-16 pb-10 sm:pt-20 mt-7",
        )}
      >
        <p
          className={cn(
            "uppercase",
            "text-hero-eyebrow",
            "text-[color:var(--color-text-brand-emerald)]",
          )}
        >
          {eyebrow}
        </p>

        <h1
          className={cn(
            "mt-4 font-heading font-bold flex flex-col gap-2",
            // Figma mobile hero spec: 2.21888rem / 700 / 2.08831rem (94.118%)
            "text-[2.21888rem] leading-[2.08831rem]",
          )}
        >
          <span className="text-text-primary">{headlineLead}</span>
          <span className="text-text-brand">{headlineAccent}</span>
        </h1>

        <p
          className={cn(
            "mt-5",
            "text-subtext-1",
            "text-[color:var(--color-text-subdued)]",
          )}
        >
          {subcopy}
        </p>

     

        <div className="mt-10">
          <p
            className={cn(
              "mb-4 uppercase",
              "text-hero-eyebrow",
              "text-[color:var(--color-text-brand-emerald)]",
            )}
          >
            {offerLabel}
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {offers.map((offer) => (
              <li key={offer.label}>
                <HeroOfferChipCard offer={offer} variant="mobile" onDialogOpen={onOfferDialogOpen} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Offer chip — matches Figma workshop card (node 1:611): rounded white card
// with eyebrow + title and a 44px circular arrow button.
// ---------------------------------------------------------------------------

function HeroOfferChipCard({
  offer,
  variant,
  onDialogOpen,
}: {
  offer: HeroOfferChip;
  variant: "desktop" | "mobile";
  onDialogOpen: (variant: "teacher" | "yoga") => void;
}) {
  const isDesktop = variant === "desktop";

  const sharedClassName = cn(
    // layout
    "group flex items-center justify-between gap-6 w-full text-left",
    isDesktop
      ? "h-[var(--hero-chip-h)] min-h-[80px] px-3"
      : "min-h-[88px] px-[22px] py-3",
    // shape + surface
    "rounded-[1.3rem]",
    "bg-surface-1 border border-[color:rgba(123,123,123,0.20)]",
    "shadow-[var(--shadow-chip)]",
    // motion
    "transition-all duration-300",
    "hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.18)]",
    // focus
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
  );

  const inner = (
    <>
      <div className="flex min-w-0 flex-col gap-[2px]">
        <span
          className={cn(
            "uppercase whitespace-nowrap font-semibold text-sm",
            isDesktop ? "text-hero-chip-eyebrow" : "text-hero-eyebrow",
            "text-[color:var(--color-text-brand-emerald)]",
          )}
        >
          {offer.eyebrow}
        </span>
        <span
          className={cn(
            "text-text-primary text-[16px] font-semibold",
            isDesktop ? "text-hero-chip-title" : "text-subtext-3 leading-tight",
          )}
        >
          {offer.label}
        </span>
      </div>

      <span
        aria-hidden
        className={cn(
          "shrink-0 flex items-center justify-center rounded-full",
          isDesktop
            ? "w-[var(--hero-chip-btn)] h-[var(--hero-chip-btn)] min-w-[36px] min-h-[36px]"
            : "h-11 w-11",
          "text-text-inverse transition-transform duration-300",
          "group-hover:translate-x-0.5",
        )}
        style={{ backgroundColor: offer.buttonColor }}
      >
        <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
      </span>
    </>
  );

  if (offer.showModeDialog) {
    return (
      <button type="button" onClick={() => onDialogOpen(offer.dialogVariant ?? "teacher")} className={sharedClassName}>
        {inner}
      </button>
    );
  }

  return (
    <Link href={offer.href} className={sharedClassName}>
      {inner}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Online / Offline course-mode choice dialog
// ---------------------------------------------------------------------------

const TEACHER_MODE_OPTIONS = [
  {
    title: "Online Courses",
    subtitle: "At Comfort of your home",
    count: "9 Courses",
    href: "/teacher-courses/online",
    image: "/images/programs/teacher-online-200-hour-ytt.jpg",
  },
  {
    title: "Offline - in studio",
    subtitle: "We have 20+ studios",
    count: "9 Courses",
    href: "/teacher-courses/offline",
    image: "/images/programs/daily-regular-yoga-offline.jpg",
  },
];

const YOGA_MODE_OPTIONS = [
  {
    title: "Online Classes",
    subtitle: "At Comfort of your home",
    count: "9 Courses",
    href: "/yoga-courses/online",
    image: "/images/programs/teacher-online-200-hour-ytt.jpg",
  },
  {
    title: "Offline - in studio",
    subtitle: "We have 20+ studios",
    count: "9 Courses",
    href: "/yoga-courses/offline",
    image: "/images/programs/daily-regular-yoga-offline.jpg",
  },
];

function CourseModeDialog({
  open,
  onOpenChange,
  variant,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: "teacher" | "yoga";
}) {
  const router = useRouter();
  const options = variant === "yoga" ? YOGA_MODE_OPTIONS : TEACHER_MODE_OPTIONS;
  const title = variant === "yoga"
    ? "How would you like to join our Yoga Classes?"
    : "How would you like to join our Teacher Training?";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
            "transition-opacity duration-200",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
        />
        <Dialog.Popup
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[480px]",
            "-translate-x-1/2 -translate-y-1/2",
            "rounded-2xl bg-white px-5 py-4 sm:px-4 shadow-md",
            "transition-all duration-200",
            "data-starting-style:opacity-0 data-starting-style:scale-95",
            "data-ending-style:opacity-0 data-ending-style:scale-95",
          )}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <Dialog.Title className="font-heading text-[18px] font-bold text-text-primary">
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-0 text-[15px] text-text-tertiary">
                At Comfort of your home
              </Dialog.Description>

            </div>
            <Dialog.Close
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                "text-text-tertiary hover:bg-surface-2 hover:text-text-primary",
                "transition-colors duration-150",
              )}
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {options.map((option) => (
              <button
                key={option.href}
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  router.push(option.href);
                }}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-xl",
                  "border border-neutral-200 bg-[#F7F7F7]",
                  
                )}
              >
                <div className="relative h-28 w-full overflow-hidden">
                  <Image
                    src={option.image}
                    alt={option.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-3 py-3 text-left">
                  <p className="text-[16px] font-bold text-text-primary">
                    {option.title}
                  </p>
                  <p className="mt-0.5 text-[14px] text-text-tertiary">
                    {option.subtitle}
                  </p>
                  <p className="mt-1 text-xs font-medium text-[color:var(--color-text-brand-emerald)]">
                    {option.count}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
