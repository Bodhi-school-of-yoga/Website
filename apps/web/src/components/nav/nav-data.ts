import type { DropdownContent, MegaMenuColumn } from "./nav-types";
import { getCoursesByCategoryAndMode } from "@/data/courses-catalog";

// All hrefs below point to pages that exist in apps/web/src/app/.
// When adding new menu items, also add the matching page.tsx route.

// Live course counts sourced from the catalog so the nav dropdown always
// reflects what's actually available. "Offline - in studio" maps to mode "studio".
const courseCount = (
  category: "advanced" | "teacher" | "yoga",
  mode: "online" | "studio",
) => getCoursesByCategoryAndMode(category, mode).length;

export const ABOUT_MEGA_MENU: MegaMenuColumn[] = [
  {
    heading: "Who we are",
    items: [
      {
        icon: "User",
        title: "About us",
        subtitle: "Our story and lineage",
        href: "/about",
      },
      {
        icon: "Flower2",
        title: "Yogic Lifestyle",
        subtitle: "Beyond the mat",
        href: "/about#pillars",
      },
      {
        icon: "Users",
        title: "Our Trainers",
        subtitle: "Meet the faculty",
        href: "/our-trainers",
      },
      {
        icon: "Sparkles",
        title: "Empowering Yogapreneurs",
        subtitle: "For aspiring teachers",
        href: "/about#vision",
      },
    ],
  },
  {
    heading: "Blogs & events",
    items: [
      {
        icon: "CalendarDays",
        title: "Events & Workshops",
        subtitle: "Upcoming gatherings",
        href: "/workshops",
      },
      {
        icon: "BookOpen",
        title: "Blogs & Insights",
        subtitle: "Reads from our teachers",
        href: "/blog",
      },
      {
        icon: "Flower2",
        title: "Yoga Poses",
        subtitle: "Asana library & guides",
        href: "/yoga-poses",
      },
    ],
  },
  {
    heading: "Help & resources",
    items: [
      {
        icon: "MapPin",
        title: "Our Centers",
        subtitle: "Studio locations",
        href: "/our-centers",
      },
      {
        icon: "GraduationCap",
        title: "Tips to become a successful yoga teacher",
        subtitle: "Career guidance",
        href: "/tips-to-become-a-successful-yoga-teacher",
      },
      {
        icon: "MessageCircle",
        title: "Contact Us",
        subtitle: "We'd love to hear from you",
        href: "/contact",
      },
    ],
  },
];

export const COURSE_DROPDOWNS: Record<
  "teacher" | "yoga",
  DropdownContent
> = {
  teacher: {
    items: [
      {
        title: "Online courses",
        subtitle: "At Comfort of your home",
        count: courseCount("teacher", "online"),
        href: "/teacher-courses/online",
        image: "/images/programs/face-yoga.jpg",
        icon: "Laptop",
      },
      {
        title: "Offline courses- in studio",
        subtitle: "We have 20+ studios",
        count: courseCount("teacher", "studio"),
        href: "/teacher-courses/offline",
        image: "/images/programs/bala-yoga-teacher-training.jpg",
        icon: "Building2",
      },
      {
        title: "Advanced Certifications",
        subtitle: "We have 20+ studios",
        href: "/advanced-certifications",
        image: "/images/programs/pranayama.jpg",
        icon: "Award",
        subItems: [
          {
            title: "Online certification",
            subtitle: "Learn from anywhere",
            count: courseCount("advanced", "online"),
            href: "/advanced-certifications/online",
            image: "/images/programs/face-yoga.jpg",
            icon: "Laptop",
          },
          {
            title: "Offline certification- in studio",
            subtitle: "Hands-on training",
            count: courseCount("advanced", "studio"),
            href: "/advanced-certifications/offline",
            image: "/images/programs/bala-yoga-teacher-training.jpg",
            icon: "Building2",
          },
        ],
      },
    ],
  },
  yoga: {
    items: [
      {
        title: "Online Classes",
        subtitle: "At Comfort of your home",
        count: courseCount("yoga", "online"),
        href: "/yoga-courses/online",
        image: "/images/programs/face-yoga.jpg",
        icon: "Laptop",
      },
      {
        title: "Offline - in studio",
        subtitle: "We have 20+ studios",
        count: courseCount("yoga", "studio"),
        href: "/yoga-courses/offline",
        image: "/images/programs/bala-yoga-teacher-training.jpg",
        icon: "Building2",
      },
    ],
  },
};
