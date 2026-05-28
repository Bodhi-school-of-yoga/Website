"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";

import { cn } from "@/lib/utils";

function NavMenu({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="nav-menu"
      className={cn(
        "relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      <NavMenuPositioner />
    </NavigationMenuPrimitive.Root>
  );
}

function NavMenuList({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="nav-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-8 xl:gap-[39px]",
        className,
      )}
      {...props}
    />
  );
}

function NavMenuItem({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="nav-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

function NavMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="nav-menu-trigger"
      className={cn(
        "group inline-flex shrink-0 items-center gap-[7px] whitespace-nowrap bg-transparent text-subtext-2 font-medium text-text-secondary outline-none",
        "transition-opacity hover:opacity-70 data-[popup-open]:opacity-70",
        "focus-visible:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className="size-[14px] opacity-70 transition-transform duration-200 group-data-[popup-open]:rotate-180"
        strokeWidth={2}
        aria-hidden
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

export type NavMenuContentProps = NavigationMenuPrimitive.Content.Props;

function NavMenuContent({
  className,
  ...props
}: NavMenuContentProps) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="nav-menu-content"
      className={cn(
        "w-auto p-0 outline-none",
        "transition-[opacity,transform] duration-150 ease-out",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        "data-[motion=from-end]:slide-in-from-right-4 data-[motion=from-start]:slide-in-from-left-4",
        "data-[motion=to-end]:slide-out-to-right-4 data-[motion=to-start]:slide-out-to-left-4",
        "data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in",
        "data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out",
        "motion-reduce:transition-none motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}

export type NavMenuPositionerProps = {
  side?: NavigationMenuPrimitive.Positioner.Props["side"];
  sideOffset?: NavigationMenuPrimitive.Positioner.Props["sideOffset"];
  align?: NavigationMenuPrimitive.Positioner.Props["align"];
  className?: string;
};

function NavMenuPositioner({
  side = "bottom",
  sideOffset = 12,
  align = "end",
  className,
}: NavMenuPositionerProps) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-[calc(100vw-48px)]",
          "transition-[top,left,right,bottom] duration-200 ease-out",
          "data-instant:transition-none",
          className,
        )}
      >
        <NavigationMenuPrimitive.Popup
          className={cn(
            "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) overflow-visible bg-transparent outline-none",
            "transition-[opacity,transform] duration-150 ease-out",
            "data-starting-style:opacity-0 data-starting-style:scale-[0.98]",
            "data-ending-style:opacity-0 data-ending-style:scale-[0.98] data-ending-style:duration-100",
            "motion-reduce:transition-none motion-reduce:transform-none",
          )}
        >
          <NavigationMenuPrimitive.Viewport className="relative size-full overflow-visible" />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}

function NavMenuLink({
  className,
  ...props
}: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="nav-menu-link"
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

export {
  NavMenu,
  NavMenuList,
  NavMenuItem,
  NavMenuTrigger,
  NavMenuContent,
  NavMenuLink,
  NavMenuPositioner,
};
