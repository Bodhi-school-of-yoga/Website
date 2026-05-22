import { Clock, Globe, Languages } from "lucide-react";

import { ProgramCard } from "@/components/ui/program-card";

const META = [
  { icon: <Clock className="size-3.5" />, label: "4 weeks" },
  { icon: <Globe className="size-3.5" />, label: "Online" },
  { icon: <Languages className="size-3.5" />, label: "English" },
];

export default function CardDemoPage() {
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-12">
          <p className="text-mini text-muted-foreground uppercase">
            Component preview
          </p>
          <h1 className="mt-2 font-heading text-h3 font-semibold text-foreground">
            ProgramCard — Figma node 1:246
          </h1>
          <p className="mt-3 text-subtext-2 text-muted-foreground max-w-2xl">
            Article variant rebuilt from the Bodhi landing-page handoff.
            Composes the shadcn Card slots with DESIGN.md tokens. Images and
            titles pulled directly from the Figma Programs section.
          </p>
        </header>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ProgramCard
            title="Pranayama & the nervous system"
            href="/programs/pranayama"
            imageSrc="/images/programs/pranayama.jpg"
            imageAlt="Practitioner exploring breathwork"
            meta={META}
            priority
          />

          <ProgramCard
            title="300 Hour Yoga Teacher Training Course — Online"
            href="/programs/ttc-300"
            imageSrc="/images/programs/ttc-300.jpg"
            imageAlt="Teacher training session in a sunlit studio"
            meta={META}
            priority
          />

          <ProgramCard
            title="Face Yoga Teacher Training Course"
            href="/programs/face-yoga"
            imageSrc="/images/programs/face-yoga.jpg"
            imageAlt="Close-up of a face yoga practice"
            meta={META}
            priority
          />
        </section>
      </div>
    </main>
  );
}
