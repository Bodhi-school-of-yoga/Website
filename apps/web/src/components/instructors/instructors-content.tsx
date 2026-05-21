"use client";

import { motion } from "framer-motion";
import { Award, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";

const instructors = [
  {
    name: "Ananya Desai",
    slug: "ananya-desai",
    specialization: "Hatha & Meditation",
    experience: 15,
    bio: "Ananya discovered yoga during her travels through India over 15 years ago. A certified E-RYT 500, she specializes in Hatha yoga and guided meditation, blending ancient techniques with modern mindfulness practices.",
  },
  {
    name: "Rohan Kapoor",
    slug: "rohan-kapoor",
    specialization: "Vinyasa & Power Yoga",
    experience: 10,
    bio: "Rohan brings a dynamic energy to every class. With a background in sports science and a decade of yoga teaching, he creates challenging yet accessible sequences that build strength and endurance.",
  },
  {
    name: "Maya Reddy",
    slug: "maya-reddy",
    specialization: "Yin & Restorative",
    experience: 12,
    bio: "Maya's gentle, nurturing approach makes her classes a sanctuary for healing. She holds advanced certifications in Yin Yoga and therapeutic yoga, helping students find deep relaxation and recovery.",
  },
  {
    name: "Arjun Mehta",
    slug: "arjun-mehta",
    specialization: "Ashtanga & Pranayama",
    experience: 8,
    bio: "Arjun studied Ashtanga yoga in Mysore, India under renowned teachers. His disciplined yet compassionate teaching style guides students through the traditional Ashtanga series with precision and care.",
  },
];

export default function InstructorsContent() {
  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <Container>
        <SectionHeading
          title="Meet Our Instructors"
          subtitle="Passionate, certified professionals dedicated to guiding your practice."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {instructors.map((inst, i) => (
            <motion.div
              key={inst.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar placeholder */}
                    <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                      {inst.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold">{inst.name}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {inst.specialization}
                      </Badge>
                      <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Award className="mr-1 h-3.5 w-3.5" />
                          Certified
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3.5 w-3.5" />
                          {inst.experience}+ years
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {inst.bio}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
