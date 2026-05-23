import { SiteHeader } from "@/components/site-header";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { TrainersHero } from "@/components/sections/trainers-hero";
import { TrainersPullQuoteBand } from "@/components/sections/trainers-pull-quote-band";
import { TrainersMeetAll } from "@/components/sections/trainers-meet-all";
import { ClosingCtaSection } from "@/components/sections/closing-cta-section";

export const metadata = {
  title: "Our Trainers — Bodhi School of Yoga",
  description:
    "Yoga is not just a series of poses and techniques. Meet the teachers who lead by example at Bodhi School of Yoga.",
};

export default function OurTrainersPage() {
  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <TrainersHero />
        <TrainersPullQuoteBand />
        <TrainersMeetAll />
        <ClosingCtaSection
          theme="light"
          eyebrow="Bodhi"
          headingLead="Begin where"
          headingAccent="you are."
          subhead="Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that."
          primaryCta={{ label: "Try a class, free", href: "/book" }}
          cards={[
            {
              title: "Free Trial Session",
              body: "50 mins session with the option of choosing from 10 slots in a day.",
              ctaLabel: "Join now",
              href: "/book",
            },
            {
              title: "Speak to us",
              body: "Talk to a counsellor who can assess and offer recommendations.",
              ctaLabel: "Contact us",
              href: "/contact",
            },
            {
              title: "Take a Guided Path",
              body: "Our assessment will guide you to a direction best suited to your experience.",
              ctaLabel: "Start now",
              href: "/paths",
            },
          ]}
        />
      </main>
      <SiteFooterBlock showCta={false} />
    </>
  );
}
