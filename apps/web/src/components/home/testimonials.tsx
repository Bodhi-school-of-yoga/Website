"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";

const testimonials = [
  {
    name: "Priya Sharma",
    quote:
      "Bodhi has completely transformed my relationship with yoga. The instructors are incredibly knowledgeable and caring.",
    rating: 5,
  },
  {
    name: "James Chen",
    quote:
      "As a beginner, I was nervous to start. The welcoming environment at Bodhi made all the difference. I've been practicing for a year now!",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    quote:
      "The Vinyasa Flow classes are my favorite. They've helped me build strength and find peace during a stressful period in my life.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <Container>
        <SectionHeading
          title="What Our Students Say"
          subtitle="Hear from the community that practices with us every day."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-semibold">{t.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
