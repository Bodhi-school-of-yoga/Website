export type CourseLesson = {
  lessonLabel: string;
  title: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationBadge: string;
};

export type CourseModule = {
  title: string;
  subtitle: string;
  lessons: CourseLesson[];
};

export type PreRecordedCourse = {
  slug: string;
  title: string;
  titleLines: [string, string];
  image: { src: string; alt: string };
  description: string;
  price: string;
  priceStrike: string;
  saveBadge: string;
  /** Two free sample lessons shown before purchase. */
  freePreview: CourseLesson[];
  /** Locked lesson modules revealed after purchase. */
  modules: CourseModule[];
};

export const PRE_RECORDED_COURSES: PreRecordedCourse[] = [
  {
    slug: "21-days-face-yoga-challenge",
    title: "21 days face yoga challenge",
    titleLines: ["21 Days Face", "Yoga Challenge"],
    image: {
      src: "/images/pre-recorded/face-yoga-challenge.jpg",
      alt: "Instructor guiding a face yoga session in a sunlit studio",
    },
    description:
      "Pay once. Access 25 expert-led video lessons at your own pace, forever. From gentle warm-ups to advanced face-sculpting flows.",
    price: "₹499",
    priceStrike: "₹999",
    saveBadge: "50% Off",
    freePreview: [
      {
        lessonLabel: "Lesson 01",
        title: "Welcome & Your 21-Day Roadmap",
        duration: "8 min",
        level: "Beginner",
        durationBadge: "08:10",
      },
      {
        lessonLabel: "Lesson 02",
        title: "Facial Anatomy & Daily Warm-Up",
        duration: "14 min",
        level: "Beginner",
        durationBadge: "14:20",
      },
    ],
    modules: [
      {
        title: "Module 1 — Foundations (Lessons 3–8)",
        subtitle: "Relaxation, warm-ups and the basics of facial muscle work.",
        lessons: [
          { lessonLabel: "Lesson 03", title: "Forehead & Brow Smoothing", duration: "16 min", level: "Beginner", durationBadge: "16:00" },
          { lessonLabel: "Lesson 04", title: "Eye-Area Firming Exercises", duration: "18 min", level: "Beginner", durationBadge: "18:30" },
          { lessonLabel: "Lesson 05", title: "Cheek Lift Fundamentals", duration: "20 min", level: "Beginner", durationBadge: "20:10" },
          { lessonLabel: "Lesson 06", title: "Jaw & Lower-Face Release", duration: "17 min", level: "Beginner", durationBadge: "17:25" },
        ],
      },
      {
        title: "Module 2 — Building Definition (Lessons 9–16)",
        subtitle: "Targeted toning for cheeks, jawline and neck.",
        lessons: [
          { lessonLabel: "Lesson 09", title: "Sculpting the Jawline", duration: "22 min", level: "Intermediate", durationBadge: "22:00" },
          { lessonLabel: "Lesson 10", title: "Neck Firming & Posture", duration: "19 min", level: "Intermediate", durationBadge: "19:15" },
          { lessonLabel: "Lesson 11", title: "Lip & Smile-Line Toning", duration: "21 min", level: "Intermediate", durationBadge: "21:40" },
          { lessonLabel: "Lesson 12", title: "Under-Eye Depuffing Flow", duration: "18 min", level: "Intermediate", durationBadge: "18:05" },
        ],
      },
      {
        title: "Module 3 — Advanced Glow (Lessons 17–25)",
        subtitle: "Full-face flows, lymphatic drainage and gua sha rituals.",
        lessons: [
          { lessonLabel: "Lesson 17", title: "Full-Face Lifting Flow", duration: "26 min", level: "Advanced", durationBadge: "26:00" },
          { lessonLabel: "Lesson 18", title: "Lymphatic Drainage Massage", duration: "24 min", level: "Advanced", durationBadge: "24:30" },
          { lessonLabel: "Lesson 25", title: "Your Daily 5-Minute Glow Ritual", duration: "12 min", level: "Advanced", durationBadge: "12:00" },
        ],
      },
    ],
  },
  {
    slug: "21-days-weight-loss-challenge",
    title: "21 days weight loss challenge",
    titleLines: ["21 Days Weight", "Loss Challenge"],
    image: {
      src: "/images/pre-recorded/weight-loss-challenge.jpg",
      alt: "Before and after results from the 21 day weight loss challenge",
    },
    description:
      "Pay once. Access 25 expert-led video lessons at your own pace, forever. From foundational flows to fat-burning power sequences.",
    price: "₹499",
    priceStrike: "₹999",
    saveBadge: "50% Off",
    freePreview: [
      {
        lessonLabel: "Lesson 01",
        title: "Welcome & How the 21-Day Plan Works",
        duration: "9 min",
        level: "Beginner",
        durationBadge: "09:00",
      },
      {
        lessonLabel: "Lesson 02",
        title: "Breath, Core & Safe Warm-Up",
        duration: "15 min",
        level: "Beginner",
        durationBadge: "15:10",
      },
    ],
    modules: [
      {
        title: "Module 1 — Foundations (Lessons 3–8)",
        subtitle: "Sun salutations, standing poses and building stamina.",
        lessons: [
          { lessonLabel: "Lesson 03", title: "Sun Salutation Basics", duration: "18 min", level: "Beginner", durationBadge: "18:00" },
          { lessonLabel: "Lesson 04", title: "Standing Strength Poses", duration: "20 min", level: "Beginner", durationBadge: "20:20" },
          { lessonLabel: "Lesson 05", title: "Core Activation Flow", duration: "19 min", level: "Beginner", durationBadge: "19:00" },
          { lessonLabel: "Lesson 06", title: "Gentle Cardio Vinyasa", duration: "22 min", level: "Beginner", durationBadge: "22:15" },
        ],
      },
      {
        title: "Module 2 — Fat-Burning Flows (Lessons 9–16)",
        subtitle: "Dynamic sequences that raise the heart rate and build heat.",
        lessons: [
          { lessonLabel: "Lesson 09", title: "Power Vinyasa Sequence", duration: "30 min", level: "Intermediate", durationBadge: "30:00" },
          { lessonLabel: "Lesson 10", title: "Hip & Belly Burn Flow", duration: "24 min", level: "Intermediate", durationBadge: "24:40" },
          { lessonLabel: "Lesson 11", title: "Strength & Balance Circuit", duration: "28 min", level: "Intermediate", durationBadge: "28:00" },
          { lessonLabel: "Lesson 12", title: "Twist & Detox Flow", duration: "23 min", level: "Intermediate", durationBadge: "23:30" },
        ],
      },
      {
        title: "Module 3 — Advanced Burn (Lessons 17–25)",
        subtitle: "High-intensity flows, endurance work and recovery.",
        lessons: [
          { lessonLabel: "Lesson 17", title: "Advanced Power Flow", duration: "32 min", level: "Advanced", durationBadge: "32:00" },
          { lessonLabel: "Lesson 18", title: "Full-Body HIIT Yoga", duration: "27 min", level: "Advanced", durationBadge: "27:20" },
          { lessonLabel: "Lesson 25", title: "Cool-Down & Maintaining Results", duration: "16 min", level: "Advanced", durationBadge: "16:00" },
        ],
      },
    ],
  },
];

export function findCourse(slug: string): PreRecordedCourse | undefined {
  return PRE_RECORDED_COURSES.find((c) => c.slug === slug);
}
