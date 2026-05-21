"use client";

import { motion } from "framer-motion";
import { Heart, Leaf, Sun, Wind } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";

const features = [
  {
    icon: Leaf,
    title: "Mindful Practice",
    description:
      "Our classes blend traditional wisdom with modern techniques for a holistic yoga experience.",
  },
  {
    icon: Heart,
    title: "All Levels Welcome",
    description:
      "Whether you're a beginner or an advanced practitioner, our classes adapt to your journey.",
  },
  {
    icon: Sun,
    title: "Expert Instructors",
    description:
      "Learn from certified instructors with decades of combined experience and deep knowledge.",
  },
  {
    icon: Wind,
    title: "Calm Environment",
    description:
      "Our studio is designed to be a sanctuary — a peaceful space for your practice to flourish.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-background">
      <Container>
        <SectionHeading
          title="Why Bodhi?"
          subtitle="Experience yoga the way it was meant to be — mindful, inclusive, and transformative."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-xl border bg-card p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
