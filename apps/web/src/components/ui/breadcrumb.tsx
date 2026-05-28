import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex items-center gap-1.5 text-sm text-muted-foreground whitespace-nowrap overflow-x-auto scrollbar-none",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn("transition-colors hover:text-foreground", className),
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? (
        <ChevronRightIcon />
      )}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="sr-only">More</span>
    </span>
  )
}

/** Data shape used by page-level breadcrumb arrays. */
type BreadcrumbItemData = {
  label: string;
  href?: string;
  current?: boolean;
};

type SimpleBreadcrumbProps = {
  items: BreadcrumbItemData[];
  tone?: "light" | "inverse";
  separator?: "slash" | "chevron";
  className?: string;
};

/** High-level breadcrumb built on shadcn primitives — drop-in for the old API. */
function SimpleBreadcrumb({
  items,
  tone = "inverse",
  separator = "slash",
  className,
}: SimpleBreadcrumbProps) {
  const isInverse = tone === "inverse";
  const linkColor = isInverse ? "text-text-inverse/80 hover:text-text-inverse" : "text-text-secondary hover:text-text-primary";
  const currentColor = isInverse ? "text-text-inverse" : "text-text-primary";
  const sepColor = isInverse ? "text-text-inverse/50" : "text-text-tertiary";

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className={cn("text-body-sm", isInverse ? "text-text-inverse/80" : "text-text-secondary")}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.current ?? isLast;
          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {item.href && !isCurrent ? (
                  <BreadcrumbLink href={item.href} className={linkColor}>
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className={currentColor}>
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className={sepColor}>
                  {separator === "chevron" ? <ChevronRightIcon /> : "/"}
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  SimpleBreadcrumb,
  type BreadcrumbItemData,
}
