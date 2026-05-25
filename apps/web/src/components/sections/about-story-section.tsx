// AboutStorySection — two-column narrative section on the About page pairing brand story copy with an image.
import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export type StoryRow = {
  title: string;
  body: string | string[];
  imageSrc: string;
  imageAlt: string;
  direction: "text-left" | "image-left";
};

export type AboutStorySectionProps = {
  rows?: StoryRow[];
  className?: string;
};

const DEFAULT_ROWS: StoryRow[] = [
  {
    title: "Our Legacy",
    body: "Founded in the tradition of holistic practice, Bodhi has trained thousands of students across India and 15+ countries — carrying forward a lineage that blends ancient wisdom with modern living.",
    imageSrc: "/images/about/legacy.jpg",
    imageAlt: "Students practising in a sunlit studio",
    direction: "text-left",
  },
  {
    title: "Our Present",
    body: "Today we run year-round teacher trainings, daily classes, and curated workshops — guided by master teachers and a growing community of practitioners learning together.",
    imageSrc: "/images/about/present.jpg",
    imageAlt: "Outdoor yoga practice on a green lawn",
    direction: "image-left",
  },
  {
    title: "The Future we seek",
    body: "We are building a quiet network of teachers, students, and centers — committed to depth, care, and the long arc of practice. Less noise. More presence.",
    imageSrc: "/images/about/future.jpg",
    imageAlt: "Yogi at sunrise by the ocean",
    direction: "text-left",
  },
  {
    title: "Trainers",
    body: "Our trainers come from decades of practice and study — therapists, scholars, and lineage holders. Every program is shaped by their hands-on attention.",
    imageSrc: "/images/about/trainers.jpg",
    imageAlt: "Group of Bodhi trainers",
    direction: "image-left",
  },
];

export function AboutStorySection({
  rows = DEFAULT_ROWS,
  className,
}: AboutStorySectionProps) {
  return (
    <section
      id="story"
      className={cn(
        "w-full bg-surface-1 py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl page-px">
        <div className="flex flex-col gap-y-16 lg:gap-y-24">
          {rows.map((row) => {
            const imageOrder =
              row.direction === "image-left" ? "lg:order-1" : "lg:order-2";
            const textOrder =
              row.direction === "image-left" ? "lg:order-2" : "lg:order-1";
            return (
              <article
                key={row.title}
                className={cn(
                  "grid grid-cols-1 items-center gap-8",
                  "lg:grid-cols-12 lg:gap-12",
                )}
              >
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden rounded-[28px] bg-surface-2",
                    "lg:col-span-5",
                    imageOrder,
                  )}
                >
                  <Image
                    src={row.imageSrc}
                    alt={row.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className={cn(
                    "flex flex-col gap-4",
                    "lg:col-span-7",
                    textOrder,
                  )}
                >
                  <h2
                    className={cn(
                      "font-heading text-text-primary",
                      "text-h4 sm:text-h3 lg:text-h2",
                    )}
                  >
                    {row.title}
                  </h2>
                  {(Array.isArray(row.body) ? row.body : [row.body]).map(
                    (paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-subtext-1 leading-relaxed text-text-tertiary"
                      >
                        {paragraph}
                      </p>
                    ),
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
