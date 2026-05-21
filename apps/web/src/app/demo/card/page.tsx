import { Clock, Globe, Languages, User } from "lucide-react";

import { ProgramCard } from "@/components/ui/program-card";

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
            Article variant rebuilt from the Bodhi landing-page handoff. Composes
            the shadcn Card slots with DESIGN.md tokens.
          </p>
        </header>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ProgramCard
            title="Pranayama & the nervous system"
            href="/programs/pranayama"
            imageSrc="/img1.png"
            imageAlt="Yoga practitioner in tree pose"
            meta={[
              { icon: <Clock className="size-3.5" />, label: "4 weeks" },
              { icon: <Globe className="size-3.5" />, label: "Online" },
              { icon: <Languages className="size-3.5" />, label: "English" },
            ]}
          />

          <ProgramCard
            title="Yin foundations for deep release"
            href="/programs/yin-foundations"
            imageSrc="/img2.png"
            imageAlt="Restorative yoga setup"
            meta={[
              { icon: <Clock className="size-3.5" />, label: "6 weeks" },
              { icon: <User className="size-3.5" />, label: "Beginner" },
              { icon: <Languages className="size-3.5" />, label: "English" },
            ]}
          />

          <ProgramCard
            title="Vinyasa flow & breath integration"
            href="/programs/vinyasa-flow"
            imageSrc="/img3.png"
            imageAlt="Vinyasa flow session"
            meta={[
              { icon: <Clock className="size-3.5" />, label: "8 weeks" },
              { icon: <Globe className="size-3.5" />, label: "Hybrid" },
              { icon: <Languages className="size-3.5" />, label: "EN / HI" },
            ]}
          />
        </section>
      </div>
    </main>
  );
}
