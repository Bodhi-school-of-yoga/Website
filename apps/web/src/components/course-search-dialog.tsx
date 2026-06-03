"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  CATEGORY_LABELS,
  COURSES,
  MODE_LABELS,
  courseHref,
  getDisplayPrice,
  type Course,
} from "@/data/courses-catalog";

type CourseSearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

// Lightweight, dependency-free fuzzy-ish match: every whitespace-separated term
// in the query must appear somewhere in the course's searchable text. Results
// are scored so title matches rank above description/category matches.
function searchCourses(query: string): Course[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);

  return COURSES.map((course) => {
    const title = course.title.toLowerCase();
    const haystack = [
      course.title,
      course.shortDescription,
      CATEGORY_LABELS[course.category],
      MODE_LABELS[course.mode],
      course.instructor?.name ?? "",
      course.durationLabel,
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const term of terms) {
      if (!haystack.includes(term)) return { course, score: -1 };
      if (title.includes(term)) score += 2;
      else score += 1;
    }
    // Boost an exact title prefix match.
    if (title.startsWith(q)) score += 3;
    return { course, score };
  })
    .filter((r) => r.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.course);
}

export function CourseSearchDialog({ open, onClose }: CourseSearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const results = React.useMemo(() => searchCourses(query), [query]);

  // Reset state and focus the input each time the dialog opens.
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      // Focus after the open animation has begun painting.
      const id = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  // Keep the active index in range as results change.
  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Lock body scroll while open.
  React.useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const goToCourse = React.useCallback(
    (course: Course) => {
      onClose();
      router.push(courseHref(course));
    },
    [onClose, router],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const course = results[activeIndex];
      if (course) goToCourse(course);
    }
  };

  const hasQuery = query.trim().length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-foreground/40 backdrop-blur-sm px-4 pt-[14vh] sm:pt-[16vh]"
          onClick={onClose}
          aria-hidden={false}
        >
          <motion.div
            key="search-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Search courses"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            className="w-full max-w-[640px] overflow-hidden rounded-2xl bg-background shadow-[0_24px_64px_-16px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center gap-3 border-b border-border-2 px-5 py-4">
              <Search
                className="h-5 w-5 shrink-0 text-foreground/50"
                strokeWidth={1.75}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses…"
                aria-label="Search courses"
                className="h-7 w-full bg-transparent font-sans text-subtext-2 text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={onClose}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="max-h-[52vh] overflow-y-auto py-2">
              {!hasQuery && (
                <p className="px-5 py-6 text-center font-sans text-body-sm text-text-tertiary">
                  Start typing to find a course by name, type or instructor.
                </p>
              )}

              {hasQuery && results.length === 0 && (
                <p className="px-5 py-6 text-center font-sans text-body-sm text-text-tertiary">
                  No courses match “{query.trim()}”.
                </p>
              )}

              {results.map((course, index) => {
                const price = getDisplayPrice(course);
                const active = index === activeIndex;
                return (
                  <button
                    key={course.slug}
                    type="button"
                    onClick={() => goToCourse(course)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      "flex w-full items-center gap-4 px-5 py-3 text-left transition-colors",
                      active ? "bg-foreground/[0.06]" : "hover:bg-foreground/[0.04]",
                    )}
                  >
                    <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-foreground/5">
                      {course.listingImage && (
                        <Image
                          src={course.listingImage}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-sans text-body-md font-medium text-text-primary">
                        {course.title}
                      </span>
                      <span className="mt-0.5 block truncate font-sans text-body-sm text-text-tertiary">
                        {CATEGORY_LABELS[course.category]} ·{" "}
                        {MODE_LABELS[course.mode]}
                        {price ? ` · ${price}` : ""}
                      </span>
                    </span>
                    {active && (
                      <CornerDownLeft
                        className="h-4 w-4 shrink-0 text-foreground/40"
                        strokeWidth={1.75}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
