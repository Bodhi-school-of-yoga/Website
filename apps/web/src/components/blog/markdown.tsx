// Minimal markdown renderer for blog bodies — no external dependencies.
//
// Supported syntax (see src/data/blog-posts.ts):
//   ## Heading        -> h2
//   ### Heading       -> h3
//   - item            -> unordered list (consecutive lines grouped)
//   1. item           -> ordered list (consecutive lines grouped)
//   > quote           -> blockquote (consecutive lines grouped)
//   **bold**          -> <strong> (inline)
//   blank line        -> paragraph break
//
// Pure/stateless, so it can render inside a Server Component.

import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] };

function parse(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4) });
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3) });
      i++;
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Blockquote
    if (trimmed.startsWith(">")) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        parts.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "quote", text: parts.join(" ") });
      continue;
    }

    // Paragraph (consume until blank line / next block marker)
    const parts: string[] = [trimmed];
    i++;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (
        next === "" ||
        next.startsWith("#") ||
        next.startsWith(">") ||
        /^[-*]\s+/.test(next) ||
        /^\d+\.\s+/.test(next)
      ) {
        break;
      }
      parts.push(next);
      i++;
    }
    blocks.push({ type: "p", text: parts.join(" ") });
  }

  return blocks;
}

/** Renders inline **bold** within a string. */
function inline(text: string): ReactNode {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return segments.map((seg, idx) => {
    if (seg.startsWith("**") && seg.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-text-primary">
          {seg.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={idx}>{seg}</Fragment>;
  });
}

export function Markdown({ content }: { content: string }) {
  const blocks = parse(content);
  const firstParagraphIdx = blocks.findIndex((b) => b.type === "p");

  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={idx}
                className="font-heading text-h4 text-text-primary mt-12 first:mt-0 scroll-mt-28"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={idx}
                className="font-heading text-h5 text-text-primary mt-8 scroll-mt-28"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p
                key={idx}
                className={cn(
                  "text-body-md leading-relaxed text-text-secondary",
                  idx === firstParagraphIdx &&
                    "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-heading first-letter:text-[3.25rem] first-letter:font-bold first-letter:leading-[0.7] first-letter:text-text-brand",
                )}
              >
                {inline(block.text)}
              </p>
            );
          case "quote":
            return (
              <blockquote
                key={idx}
                className="border-l-4 border-brand-primary bg-surface-cream rounded-r-xl px-6 py-5 font-heading text-subtext-2 italic text-text-primary"
              >
                {inline(block.text)}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={idx} className="space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="relative pl-7 text-body-md leading-relaxed text-text-secondary"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-2.5 h-2 w-2 rounded-full bg-brand-primary"
                    />
                    {inline(item)}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={idx} className="space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="relative pl-9 text-body-md leading-relaxed text-text-secondary"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-lite text-mini font-semibold text-text-brand-deep"
                    >
                      {j + 1}
                    </span>
                    {inline(item)}
                  </li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default Markdown;
