import {
  TestimonialsSection,
  type TestimonialItem,
} from "@/components/sections/testimonials-section";

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "aanya",
    quote:
      "I came in to lose weight. I left able to teach a class — and a calmer person at home. The training is honest, and that's rare.",
    authorName: "Aanya",
    authorMeta: "TTC Cohort 11. Now teaching in Goa.",
    avatarSrc: "/images/testimonials/aanya.jpg",
    avatarAlt: "Aanya, TTC Cohort 11 graduate",
  },
  {
    id: "ravi",
    quote:
      "The back pain workshop did more in two days than two years of physiotherapy. I've recommended Bodhi to everyone I know.",
    authorName: "Ravi",
    authorMeta: "Workshop participant",
    avatarSrc: "/images/testimonials/ravi.jpg",
    avatarAlt: "Ravi, back pain workshop participant",
  },
  {
    id: "lena",
    quote:
      "I practice with Bodhi online from Berlin. Six in the morning, India time. It's the most consistent thing in my week.",
    authorName: "Lena",
    authorMeta: "Online student, 2 years",
    avatarSrc: "/images/testimonials/lena.jpg",
    avatarAlt: "Lena, long-term online student",
  },
];

export default function TestimonialDemoPage() {
  return (
    <main className="min-h-screen bg-background">
      <TestimonialsSection
        eyebrow="A Path to Wellness"
        heading="What our clients say"
        testimonials={TESTIMONIALS}
        priorityFirst
      />
    </main>
  );
}
