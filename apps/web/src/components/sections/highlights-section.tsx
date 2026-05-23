import * as React from "react";
import { Flower2, AlignCenter, Dumbbell, Leaf, Cpu, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { HighlightCard } from "@/components/ui/highlight-card";

// Maps item.icon string keys to lucide-react elements.
// Extend this map as new icon keys are introduced in content.
const ICON_RESOLVER: Record<string, React.ReactNode> = {
  yoga: <Flower2 className="h-6 w-6" strokeWidth={1.75} />,
  "align-center": <AlignCenter className="h-6 w-6" strokeWidth={1.75} />,
  strength: <Dumbbell className="h-6 w-6" strokeWidth={1.75} />,
  leaf: <Leaf className="h-6 w-6" strokeWidth={1.75} />,
  technology: <Cpu className="h-6 w-6" strokeWidth={1.75} />,
  people: <Users className="h-6 w-6" strokeWidth={1.75} />,
};

const DEFAULT_ICON = <Flower2 className="h-6 w-6" strokeWidth={1.75} />;

export type HighlightItem = {
  icon: string;
  title: string;
  body: string;
};

export type HighlightsSectionProps = {
  eyebrow: string;
  heading: string;
  items: HighlightItem[];
  className?: string;
};

export function HighlightsSection({
  eyebrow,
  heading,
  items,
  className,
}: HighlightsSectionProps) {
  return (
    <section
      className={cn(
        "w-full border-y border-border-2 bg-surface-0",
        "py-16 lg:py-20",
        className,
      )}
    >
      <div className="mx-auto max-w-[1340px] page-px">
        <div className="flex flex-col gap-1.5 mb-10">
          <p className="text-mini uppercase tracking-widest text-text-brand-deep">
            {eyebrow}
          </p>
          <h2 className="font-heading text-[34px] font-bold leading-tight text-text-secondary">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-[18px]">
          {items.map((item) => (
            <HighlightCard
              key={item.title}
              icon={ICON_RESOLVER[item.icon] ?? DEFAULT_ICON}
              title={item.title}
              body={item.body}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
