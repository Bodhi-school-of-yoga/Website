"use client";

// TeacherTipsVideoGallery — responsive grid of YouTube "tip" videos with a
// click-to-play lightbox. Thumbnails are static (cheap); the YouTube iframe is
// mounted only when a video is opened, so the page stays fast on load.

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";

import type { TeacherTipVideo } from "@/data/teacher-tips-videos";
import { cn } from "@/lib/utils";

export type TeacherTipsVideoGalleryProps = {
  eyebrow?: string;
  videos: TeacherTipVideo[];
  /** How many cards to show before the first "Load more". */
  initialCount?: number;
  /** How many more cards each "Load more" reveals. */
  batchSize?: number;
  className?: string;
};

function thumbnail(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

function VideoTipCard({
  video,
  index,
  onPlay,
}: {
  video: TeacherTipVideo;
  index: number;
  onPlay: () => void;
}) {
  return (
    // CSS-based entrance (tw-animate-css) — runs on every mount, so cards
    // revealed later via "Load more" always fade in. A framer scroll/mount
    // reveal stranded cards that mounted outside the viewport. A tiny
    // per-column delay keeps a soft cascade across each row.
    <li
      className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both motion-reduce:animate-none"
      style={{ animationDelay: `${(index % 3) * 60}ms` }}
    >
      <button
        type="button"
        onClick={onPlay}
        aria-label={`Play video: ${video.title}`}
        className={cn(
          "group flex h-full w-full flex-col overflow-hidden rounded-2xl text-left",
          "border border-brand-shade/30 bg-surface-1 shadow-card",
          "transition-[transform,box-shadow] duration-200 ease-in-out",
          "hover:-translate-y-0.5 hover:shadow-lg",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:transform-none",
        )}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={thumbnail(video.youtubeId)}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            // YouTube hqdefault has black bars; scale gently to fill the frame.
            className="scale-[1.35] object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.42] motion-reduce:transition-none motion-reduce:transform-none"
            priority={index < 3}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent transition-opacity duration-200 group-hover:from-black/45"
          />
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-10 flex items-center justify-center",
            )}
          >
            <span
              className={cn(
                "flex size-14 items-center justify-center rounded-full",
                "bg-surface-1/95 shadow-[0_6px_20px_rgba(0,0,0,0.25)] backdrop-blur-sm",
                "transition-transform duration-200 ease-in-out group-hover:scale-110",
                "motion-reduce:transition-none motion-reduce:transform-none",
              )}
            >
              <Play
                className="size-6 translate-x-[1px] fill-brand-primary text-brand-primary"
                strokeWidth={0}
              />
            </span>
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-6 py-5">
          <h3 className="font-heading text-h5 leading-tight text-text-primary line-clamp-2">
            {video.title}
          </h3>
          <span
            className={cn(
              "mt-auto inline-flex items-center gap-1.5 pt-1",
              "text-mini uppercase tracking-wider text-text-brand",
              "transition-colors duration-200 group-hover:text-text-brand-deep",
            )}
          >
            <Play className="size-3 fill-current" strokeWidth={0} aria-hidden="true" />
            Watch now
          </span>
        </div>
      </button>
    </li>
  );
}

function VideoLightbox({
  video,
  onClose,
}: {
  video: TeacherTipVideo;
  onClose: () => void;
}) {
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className={cn(
            "absolute -top-12 right-0 flex size-10 items-center justify-center rounded-full",
            "bg-surface-1/15 text-text-inverse backdrop-blur-sm",
            "transition-colors duration-200 hover:bg-surface-1/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
          )}
        >
          <X className="size-5" />
        </button>

        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <p className="mt-4 text-center font-heading text-h5 text-text-inverse">
          {video.title}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function TeacherTipsVideoGallery({
  eyebrow,
  videos,
  initialCount = 12,
  batchSize = 12,
  className,
}: TeacherTipsVideoGalleryProps) {
  const [active, setActive] = React.useState<TeacherTipVideo | null>(null);
  const [visible, setVisible] = React.useState(initialCount);

  const shown = videos.slice(0, visible);
  const remaining = videos.length - shown.length;

  return (
    <section className={cn("bg-surface-1 py-16 md:py-20 lg:py-24", className)}>
      <div className="container mx-auto max-w-7xl px-4">
        {eyebrow && (
          <p className="mb-10 text-center text-mini uppercase tracking-widest text-text-brand">
            {eyebrow}
          </p>
        )}

        <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((video, index) => (
            <VideoTipCard
              key={video.youtubeId}
              video={video}
              index={index}
              onPlay={() => setActive(video)}
            />
          ))}
        </ul>

        {remaining > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + batchSize)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-7 py-3.5",
                "bg-brand-primary font-heading text-[15px] font-semibold text-text-inverse",
                "shadow-card transition-[transform,background-color] duration-200 ease-in-out",
                "hover:-translate-y-0.5 hover:bg-brand-primary/90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:transform-none",
              )}
            >
              Load more videos
              <span className="text-text-inverse/70">({remaining})</span>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <VideoLightbox video={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
