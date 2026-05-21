"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";

const previewClasses = [
  {
    title: "Hatha Yoga",
    level: "All Levels",
    duration: 60,
    description: "A gentle introduction to the most basic yoga postures.",
    slug: "hatha-yoga",
  },
  {
    title: "Vinyasa Flow",
    level: "Intermediate",
    duration: 75,
    description: "Dynamic movement synchronized with breath for strength and flexibility.",
    slug: "vinyasa-flow",
  },
  {
    title: "Yin Yoga",
    level: "All Levels",
    duration: 90,
    description: "Slow-paced with postures held for longer periods, targeting deep connective tissues.",
    slug: "yin-yoga",
  },
  {
    title: "Morning Meditation",
    level: "Beginner",
    duration: 30,
    description: "Start your day with clarity through guided breathing and meditation.",
    slug: "morning-meditation",
  },
];

export default function ClassesPreview() {
  return (
    <section className="py-20 bg-secondary/30">
      <Container>
        <SectionHeading
          title="Our Classes"
          subtitle="Discover the practice that's right for you."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewClasses.map((cls, i) => (
            <motion.div
              key={cls.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <Badge variant="secondary" className="w-fit mb-3">
                    {cls.level}
                  </Badge>
                  <h3 className="text-lg font-semibold">{cls.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">
                    {cls.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1.5 h-4 w-4" />
                    {cls.duration} min
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button render={<Link href="/classes" />} variant="outline">
            View All Classes <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
