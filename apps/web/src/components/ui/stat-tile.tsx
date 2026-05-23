import * as React from "react";

import { cn } from "@/lib/utils";

type StatTileTone = "light" | "glass";

interface StatTileProps {
  value: React.ReactNode;
  label: string;
  tone?: StatTileTone;
  className?: string;
}

const toneStyles: Record<
  StatTileTone,
  { container: string; value: string; label: string }
> = {
  light: {
    container: "bg-surface-0 border border-border-1 opacity-[0.92]",
    value: "text-text-brand",
    label: "text-text-tertiary",
  },
  // TODO: replace bg-black/40 + border-white/20 with semantic
  // surface-glass-dark / border-glass-dark tokens once added to globals.css.
  glass: {
    container: "bg-black/40 backdrop-blur-2xl border border-white/20",
    value: "text-text-inverse",
    label: "text-text-inverse/65",
  },
};

function StatTile({ value, label, tone = "light", className }: StatTileProps) {
  const styles = toneStyles[tone];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1",
        "w-[110px] h-[90px]",
        "rounded-[17px] shrink-0",
        styles.container,
        className
      )}
    >
      <span
        className={cn(
          "font-heading font-medium text-h5 leading-none",
          styles.value
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "font-sans font-medium text-mini uppercase",
          styles.label
        )}
      >
        {label}
      </span>
    </div>
  );
}

export { StatTile };
export type { StatTileProps, StatTileTone };
