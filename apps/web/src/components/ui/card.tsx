import * as React from "react";

import { cn } from "@/lib/utils";

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        // DESIGN.md `components.card`: surface-1 fill, border-border 1px, radius-md (12px),
        // padding 24px (via inner slots), subtext-1 body, hover surface-2 shift.
        "group/card flex flex-col gap-4 overflow-hidden rounded-lg bg-card text-card-foreground border border-border",
        "transition-colors duration-200 hover:bg-surface-2 dark:hover:bg-muted/40",
        "py-6 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0",
        "data-[size=sm]:gap-3 data-[size=sm]:py-4 data-[size=sm]:has-data-[slot=card-footer]:pb-0",
        "*:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg",
        className
      )}
      {...props}
    />
  );
}

function CardImage({
  className,
  alt = "",
  ...props
}: React.ComponentProps<"img">) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-slot="card-image"
      alt={alt}
      className={cn("h-48 w-full object-cover", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-lg px-6 group-data-[size=sm]/card:px-4",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        "[.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        // DESIGN.md: H5 / DM Sans / 1.5rem / 600. Card-sm drops to subtext-3.
        "font-heading text-h5 font-semibold tracking-tight text-foreground",
        "group-data-[size=sm]/card:text-subtext-3",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        // DESIGN.md: subtext-1 / DM Sans / 1rem / 400 over muted-foreground.
        "font-heading text-subtext-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-6 group-data-[size=sm]/card:px-4 text-card-foreground",
        className
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        // 24px (p-lg) padding; uses muted as a recessed footer surface.
        "flex items-center gap-3 rounded-b-lg border-t border-border bg-muted/40 px-6 py-4 group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:py-3",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardImage,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
