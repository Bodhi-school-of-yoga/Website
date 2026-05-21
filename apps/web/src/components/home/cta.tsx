"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";

export default function CTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Start Your Yoga Journey Today
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Your first class is on us. Experience the Bodhi difference and
            discover what your practice can become.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              render={<Link href="/contact" />}
              size="lg"
              variant="secondary"
            >
              Book Free Trial
            </Button>
            <Button
              render={<Link href="/classes" />}
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              View Schedule
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
