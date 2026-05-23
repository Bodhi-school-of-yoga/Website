import * as React from "react";

import { cn } from "@/lib/utils";
import {
  DepartmentHeadCard,
  type DepartmentHeadTone,
} from "@/components/ui/department-head-card";

export type DepartmentHead = {
  name: string;
  role: string;
  portrait: string;
  tone?: DepartmentHeadTone;
};

export type TrainersDepartmentHeadsProps = {
  eyebrow?: string;
  title?: string;
  heads?: DepartmentHead[];
  className?: string;
};

const DEFAULT_HEADS: DepartmentHead[] = [
  {
    name: "Prarthana Patel",
    role: "head of online certification courses and prenatal",
    portrait: "/images/trainers/prarthana-patel.png",
    tone: "mint",
  },
  {
    name: "Sujana Shergill",
    role: "head of online ytt",
    portrait: "/images/trainers/sujana-shergill.png",
    tone: "dark",
  },
  {
    name: "Janardhan Durga Prasad",
    role: "head - learning & development",
    portrait: "/images/trainers/janardhan-durga-prasad.png",
    tone: "lime",
  },
  {
    name: "Lakshmi Yalamudi",
    role: "head - pilates & yoga studio",
    portrait: "/images/trainers/lakshmi-yalamudi.png",
    tone: "mint",
  },
  {
    name: "Harsh Rungta",
    role: "head academics",
    portrait: "/images/trainers/harsh-rungta.png",
    tone: "dark",
  },
  {
    name: "Vyshnavie Vasasali",
    role: "head - support",
    portrait: "/images/trainers/vyshnavie-vasasali.png",
    tone: "lime",
  },
  {
    name: "Eeena Chawla",
    role: "head - face yoga",
    portrait: "/images/trainers/eeena-chawla.png",
    tone: "mint",
  },
  {
    name: "Archana Kulkarni",
    role: "head of therapeutic yoga",
    portrait: "/images/trainers/archana-kulkarni.png",
    tone: "dark",
  },
];

export function TrainersDepartmentHeads({
  eyebrow = "Leadership",
  title = "Department Heads",
  heads = DEFAULT_HEADS,
  className,
}: TrainersDepartmentHeadsProps) {
  return (
    <section
      className={cn(
        "w-full bg-surface-1 page-px py-16 sm:py-20 lg:py-24",
        className,
      )}
    >
      <div className="mx-auto max-w-[1340px]">
        <div className="flex flex-col gap-3">
          <p
            className={cn(
              "text-mini font-semibold uppercase",
              "text-[#005564]",
              "tracking-[0.16em]",
            )}
          >
            {eyebrow}
          </p>
          <h2
            className={cn(
              "font-heading font-bold text-text-secondary",
              "text-h4 sm:text-h3 lg:text-[44px] lg:leading-[1.2]",
            )}
          >
            {title}
          </h2>
        </div>

        <div
          className={cn(
            "mt-10 grid gap-x-6 gap-y-12",
            "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
          )}
        >
          {heads.map((h) => (
            <DepartmentHeadCard
              key={h.name}
              name={h.name}
              role={h.role}
              portrait={h.portrait}
              tone={h.tone}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
