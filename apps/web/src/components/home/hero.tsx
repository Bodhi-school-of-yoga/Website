"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/shared/container";

const offerings = [
  {
    label: "Yoga Teacher Training",
    description: "I want to teach Yoga & Pilate",
    href: "/teacher-courses",
  },
  {
    label: "Daily Yoga Classes",
    description: "I want to learn Yoga & Pilate",
    href: "/yoga-courses",
  },
  {
    label: "Wellness Workshops",
    description: "Looking for short Workshops",
    href: "/workshops",
  },
];



export default function Hero() {
  return (
    <section className="relative overflow-hidden ">
      {/* Decorative background shapes */}
     

      <Container className="relative">
        {/* Main hero content */}
        <div className="grid grid-cols-1 items-center gap-8 pt-8 pb-16 lg:grid-cols-2 lg:gap-12 lg:pt-12 lg:pb-20">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              बोधि &middot; The Awakening
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-[0.85] tracking-tight sm:text-5xl lg:text-[4.25rem] font-heading text-[#1D3E59]">
              A school for{" "}
              <br className="hidden sm:block" />
              teachers and a{" "}
              <br className="hidden sm:block" />
              <span className="relative inline-block text-[#009877]">
                home for seekers.

              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-[#47474791] sm:text-lg">
              Bodhi is a yoga teacher training institute and practice studio. We
              train future teachers, host workshops in health and wellness, and
              hold daily classes online and in person.
            </p>
          </motion.div>

          {/* Right: Hero image */}
         
        </div>
      </Container>

      {/* Bottom offerings bar */}
      {/* <div className="border-t bg-muted/40">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <div className="flex items-center py-4 sm:col-span-3">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                What do we offer
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {offerings.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex flex-col gap-1 py-5 sm:px-6 first:sm:pl-0 last:sm:pr-0 transition-colors"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {item.description}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </div> */}
    </section>
  );
}
