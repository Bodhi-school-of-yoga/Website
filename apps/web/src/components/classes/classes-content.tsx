"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";

type Level = "all" | "beginner" | "intermediate" | "advanced" | "all-levels";

const classes = [
  {
    title: "Hatha Yoga",
    slug: "hatha-yoga",
    level: "all-levels" as const,
    duration: 60,
    instructor: "Ananya Desai",
    schedule: "Mon, Wed, Fri — 7:00 AM",
    description:
      "A gentle, foundational practice focusing on basic postures, alignment, and breathing. Perfect for building a strong yoga foundation.",
  },
  {
    title: "Vinyasa Flow",
    slug: "vinyasa-flow",
    level: "intermediate" as const,
    duration: 75,
    instructor: "Rohan Kapoor",
    schedule: "Tue, Thu — 6:30 AM & 6:00 PM",
    description:
      "Dynamic sequences linking breath to movement. Builds strength, flexibility, and cardiovascular endurance.",
  },
  {
    title: "Yin Yoga",
    slug: "yin-yoga",
    level: "all-levels" as const,
    duration: 90,
    instructor: "Maya Reddy",
    schedule: "Mon, Wed — 7:00 PM",
    description:
      "Slow-paced with postures held for 3-5 minutes. Targets deep connective tissues, ligaments, and joints for improved flexibility.",
  },
  {
    title: "Morning Meditation",
    slug: "morning-meditation",
    level: "beginner" as const,
    duration: 30,
    instructor: "Ananya Desai",
    schedule: "Daily — 6:00 AM",
    description:
      "Start your day with guided meditation and pranayama. Cultivate mindfulness and set a peaceful tone for your day.",
  },
  {
    title: "Power Yoga",
    slug: "power-yoga",
    level: "advanced" as const,
    duration: 60,
    instructor: "Rohan Kapoor",
    schedule: "Tue, Thu, Sat — 8:00 AM",
    description:
      "An intense, fitness-based approach to vinyasa. Designed to build internal heat, stamina, strength, and flexibility.",
  },
  {
    title: "Restorative Yoga",
    slug: "restorative-yoga",
    level: "beginner" as const,
    duration: 75,
    instructor: "Maya Reddy",
    schedule: "Fri — 7:00 PM, Sun — 10:00 AM",
    description:
      "A deeply relaxing practice using props to support the body in passive poses. Ideal for recovery and stress relief.",
  },
];

const filters: { value: Level; label: string }[] = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "all-levels", label: "Open Level" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export default function ClassesContent() {
  const [activeFilter, setActiveFilter] = useState<Level>("all");

  const filtered =
    activeFilter === "all"
      ? classes
      : classes.filter((c) => c.level === activeFilter);

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <SectionHeading
            title="Our Classes"
            subtitle="From gentle Hatha to dynamic Vinyasa, find the practice that speaks to you."
          />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => (
              <Button
                key={f.value}
                size="sm"
                variant={activeFilter === f.value ? "default" : "outline"}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </Button>
            ))}
          </div>

          {/* Class grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((cls) => (
                <motion.div
                  key={cls.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{cls.level}</Badge>
                        <span className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3.5 w-3.5" />
                          {cls.duration} min
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold">{cls.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground flex-1">
                        {cls.description}
                      </p>
                      <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                        <p className="flex items-center">
                          <User className="mr-1.5 h-3.5 w-3.5" />
                          {cls.instructor}
                        </p>
                        <p>{cls.schedule}</p>
                      </div>
                      <Button render={<Link href="/contact" />} variant="outline" size="sm" className="mt-4 w-full">
                        Book Now <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Container>
      </section>
    </>
  );
}
