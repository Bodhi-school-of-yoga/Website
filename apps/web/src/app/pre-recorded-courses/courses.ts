export type PreRecordedCourse = {
  slug: string;
  title: string;
  titleLines: [string, string];
  image: { src: string; alt: string };
  description: string;
  price: string;
  priceStrike: string;
  saveBadge: string;
};

export const PRE_RECORDED_COURSES: PreRecordedCourse[] = [
  {
    slug: "yoga-for-sciatica",
    title: "Yoga for Sciatica",
    titleLines: ["Yoga for", "Sciatica"],
    image: {
      src: "/images/pre-recorded/yoga-for-sciatica.png",
      alt: "Students practising aerial yoga in a sunlit studio",
    },
    description:
      "Pay once. Access 25 expert-led video lessons at your own pace, forever. From beginner inversions to advanced flows.",
    price: "₹499",
    priceStrike: "₹999",
    saveBadge: "50% Off",
  },
  {
    slug: "decoding-what-is-prana",
    title: "Decoding “What is Prana?”",
    titleLines: ["Decoding", "What is Prana?"],
    image: {
      src: "/images/pre-recorded/decoding-prana.png",
      alt: "Yoga teacher guiding a class in pranayama practice",
    },
    description:
      "Pay once. Access 25 expert-led video lessons at your own pace, forever. From beginner inversions to advanced flows.",
    price: "₹499",
    priceStrike: "₹999",
    saveBadge: "50% Off",
  },
  {
    slug: "protein-in-indian-diets",
    title: "Protein in Indian Diets: Myths and Facts",
    titleLines: ["Protein in", "Indian Diets"],
    image: {
      src: "/images/pre-recorded/protein-indian-diets.png",
      alt: "Yogi in a flowing asana at sunrise",
    },
    description:
      "Pay once. Access 25 expert-led video lessons at your own pace, forever. From beginner inversions to advanced flows.",
    price: "₹499",
    priceStrike: "₹999",
    saveBadge: "50% Off",
  },
  {
    slug: "know-about-hatha-yoga",
    title: "Know About Hatha Yoga",
    titleLines: ["Know About", "Hatha Yoga"],
    image: {
      src: "/images/pre-recorded/hatha-yoga.png",
      alt: "Student seated in lotus pose mid-practice",
    },
    description:
      "Pay once. Access 25 expert-led video lessons at your own pace, forever. From beginner inversions to advanced flows.",
    price: "₹499",
    priceStrike: "₹999",
    saveBadge: "50% Off",
  },
];

export function findCourse(slug: string): PreRecordedCourse | undefined {
  return PRE_RECORDED_COURSES.find((c) => c.slug === slug);
}
