import type { DropdownContent, MegaMenuColumn } from "./nav-types";

// TODO: routes referenced below that may not yet be implemented:
// /faculty, /poses, /blog, /centers, /contact, /blog/become-a-teacher,
// /teacher-courses/{online,offline,pre-recorded},
// /advanced-certifications/{online,in-studio,pre-recorded},
// /yoga-courses/{online,offline,pre-recorded}

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
        href: "/faculty",
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
        icon: "PersonStanding",
        title: "Yoga Poses",
        subtitle: "Asana library",
        href: "/poses",
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
        href: "/centers",
      },
      {
        icon: "GraduationCap",
        title: "Tips to become a successful yoga teacher",
        subtitle: "Career guidance",
        href: "/blog/become-a-teacher",
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
  "teacher" | "advanced" | "yoga",
  DropdownContent
> = {
  teacher: {
    items: [
      {
        title: "Online Courses",
        subtitle: "At the comfort of your home",
        count: 8,
        href: "/teacher-courses/online",
        image: "/images/programs/face-yoga.jpg",
        icon: "Laptop",
      },
      {
        title: "Offline — in studio",
        subtitle: "We have 20+ studios",
        count: 8,
        href: "/teacher-courses/offline",
        image: "/images/programs/bala-yoga-teacher-training.jpg",
        icon: "Building2",
      },
      {
        title: "Pre-recorded classes",
        subtitle: "Access anytime, anywhere",
        count: 8,
        href: "/teacher-courses/pre-recorded",
        image: "/images/programs/pranayama.jpg",
        icon: "PlayCircle",
      },
    ],
  },
  advanced: {
    items: [
      {
        title: "Online Certifications",
        subtitle: "Learn from anywhere",
        count: 6,
        href: "/advanced-certifications/online",
        image: "/images/programs/face-yoga.jpg",
        icon: "Laptop",
      },
      {
        title: "In-studio Certifications",
        subtitle: "Hands-on training",
        count: 4,
        href: "/advanced-certifications/in-studio",
        image: "/images/programs/bala-yoga-teacher-training.jpg",
        icon: "Building2",
      },
      {
        title: "Pre-recorded modules",
        subtitle: "Self-paced deep dives",
        count: 5,
        href: "/advanced-certifications/pre-recorded",
        image: "/images/programs/pranayama.jpg",
        icon: "PlayCircle",
      },
    ],
  },
  yoga: {
    items: [
      {
        title: "Online Courses",
        subtitle: "At the comfort of your home",
        count: 10,
        href: "/yoga-courses/online",
        image: "/images/programs/face-yoga.jpg",
        icon: "Laptop",
      },
      {
        title: "Offline — in studio",
        subtitle: "We have 20+ studios",
        count: 12,
        href: "/yoga-courses/offline",
        image: "/images/programs/bala-yoga-teacher-training.jpg",
        icon: "Building2",
      },
      {
        title: "Pre-recorded classes",
        subtitle: "Access anytime, anywhere",
        count: 6,
        href: "/yoga-courses/pre-recorded",
        image: "/images/programs/pranayama.jpg",
        icon: "PlayCircle",
      },
    ],
  },
};
