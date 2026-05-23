import { SiteHeader } from "@/components/site-header";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { TrainersHero } from "@/components/sections/trainers-hero";
import { TrainersPullQuoteBand } from "@/components/sections/trainers-pull-quote-band";
import { TrainersFounderSection } from "@/components/sections/trainers-founder-section";
import { TrainersDepartmentHeads } from "@/components/sections/trainers-department-heads";
import { TrainersMeetAll } from "@/components/sections/trainers-meet-all";

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
        <TrainersFounderSection />
        <TrainersDepartmentHeads />
        <TrainersMeetAll />
      </main>
      <SiteFooterBlock />
    </>
  );
}
