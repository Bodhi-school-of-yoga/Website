"use client";

import { motion } from "framer-motion";
import { Heart, Users, Award, Calendar } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";

const stats = [
  { icon: Calendar, value: "10+", label: "Years of Practice" },
  { icon: Users, value: "5,000+", label: "Students Trained" },
  { icon: Award, value: "15+", label: "Certified Instructors" },
  { icon: Heart, value: "20+", label: "Weekly Classes" },
];

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold sm:text-5xl">Our Story</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Bodhi was founded with a simple belief: yoga should be accessible
              to everyone. What started as a small studio has grown into a
              thriving community united by the pursuit of balance and well-being.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold">Our Philosophy</h2>
              <div className="mt-1 h-1 w-16 rounded-full bg-primary" />
              <p className="mt-6 text-muted-foreground leading-relaxed">
                At Bodhi, we honor the ancient roots of yoga while embracing a
                modern, inclusive approach. We believe that every body is a yoga
                body, and every breath is a chance to begin again.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our name, &ldquo;Bodhi,&rdquo; means awakening or
                enlightenment. It reflects our mission: to help each student
                awaken to their own potential through mindful movement,
                breathwork, and meditation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-gradient-to-br from-primary/10 to-warm/10 p-8 lg:p-12"
            >
              <blockquote className="text-lg italic text-foreground/80">
                &ldquo;Yoga is not about touching your toes. It&rsquo;s about
                what you learn on the way down.&rdquo;
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-primary">
                — Jigar Gor, Founder
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-20 bg-secondary/30">
        <Container>
          <SectionHeading
            title="Bodhi by the Numbers"
            subtitle="A decade of dedication to our students and community."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
