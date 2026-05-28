import type { DropdownContent, MegaMenuColumn } from "./nav-types";

// All hrefs below point to pages that exist in apps/web/src/app/.
// When adding new menu items, also add the matching page.tsx route.

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
        title: "Online Courses",
        subtitle: "At Comfort of your home",
        count: 9,
        href: "/teacher-courses/online",
        image: "/images/programs/face-yoga.jpg",
        icon: "Laptop",
      },
      {
        title: "Offline - in studio",
        subtitle: "We have 20+ studios",
        count: 9,
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
            title: "Online Courses",
            subtitle: "Learn from anywhere",
            count: 9,
            href: "/advanced-certifications/online",
            image: "/images/programs/face-yoga.jpg",
            icon: "Laptop",
          },
          {
            title: "Offine - in studio",
            subtitle: "Hands-on training",
            count: 9,
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
        title: "Online Courses",
        subtitle: "At Comfort of your home",
        count: 9,
        href: "/yoga-courses/online",
        image: "/images/programs/face-yoga.jpg",
        icon: "Laptop",
      },
      {
        title: "Offline - in studio",
        subtitle: "We have 20+ studios",
        count: 9,
        href: "/yoga-courses/offline",
        image: "/images/programs/bala-yoga-teacher-training.jpg",
        icon: "Building2",
      },
    ],
  },
};
