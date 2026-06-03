"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { usePromoBanner } from "@/components/ui/use-promo-banner";

const posts = [
  {
    title: "5 Morning Yoga Poses to Start Your Day Right",
    slug: "morning-yoga-poses",
    excerpt:
      "Begin each day with energy and intention. These five simple poses take only 10 minutes and set a positive tone for your entire day.",
    category: "Practice",
    date: "2025-05-10",
  },
  {
    title: "The Science Behind Pranayama: Why Breathwork Matters",
    slug: "science-behind-pranayama",
    excerpt:
      "Research is catching up with what yogis have known for centuries. Discover how controlled breathing transforms your nervous system.",
    category: "Wellness",
    date: "2025-05-03",
  },
  {
    title: "Yoga for Desk Workers: Undo the Damage",
    slug: "yoga-for-desk-workers",
    excerpt:
      "Sitting all day takes a toll on your body. These targeted stretches and poses can help counteract the effects of prolonged sitting.",
    category: "Practice",
    date: "2025-04-25",
  },
  {
    title: "Understanding the Eight Limbs of Yoga",
    slug: "eight-limbs-of-yoga",
    excerpt:
      "Asana is just one of eight limbs described by Patanjali. Explore the complete framework that makes yoga a path, not just a workout.",
    category: "Philosophy",
    date: "2025-04-18",
  },
  {
    title: "Nutrition Tips for a Balanced Yoga Lifestyle",
    slug: "nutrition-yoga-lifestyle",
    excerpt:
      "What you eat profoundly impacts your practice. Learn about Sattvic eating principles and how to fuel your body for yoga.",
    category: "Wellness",
    date: "2025-04-10",
  },
  {
    title: "How to Build a Home Practice That Sticks",
    slug: "build-home-practice",
    excerpt:
      "Consistency beats intensity. Practical strategies for establishing and maintaining a daily yoga routine at home.",
    category: "Practice",
    date: "2025-04-02",
  },
];

export default function BlogContent() {
  const { visible: bannerVisible } = usePromoBanner();
  return (
    <section className={`${bannerVisible ? "pt-44" : "pt-32"} pb-20 bg-gradient-to-b from-primary/5 to-background`}>
      <Container>
        <SectionHeading
          title="From the Mat"
          subtitle="Insights, tips, and stories to deepen your practice and enrich your life."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">
                    {post.excerpt}
                  </p>
                  <Button
                    render={<Link href={`/blog/${post.slug}`} />}
                    variant="ghost"
                    size="sm"
                    className="mt-4 w-fit p-0 h-auto text-primary hover:text-primary/80"
                  >
                    Read More <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
