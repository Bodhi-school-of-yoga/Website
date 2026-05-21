"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Serenity Lane", "Wellness District, City 400001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 98765 43210"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@bodhiyoga.com"],
  },
  {
    icon: Clock,
    title: "Studio Hours",
    details: ["Mon–Sat: 5:30 AM – 9:00 PM", "Sun: 7:00 AM – 2:00 PM"],
  },
];

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <Container>
        <SectionHeading
          title="Get in Touch"
          subtitle="We'd love to hear from you. Reach out to book a class or ask any questions."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <info.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{info.title}</h3>
                  {info.details.map((d) => (
                    <p key={d} className="text-sm text-muted-foreground">
                      {d}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardContent className="p-6">
                {submitted ? (
                  <div className="text-center py-8">
                    <h3 className="text-xl font-semibold text-primary">
                      Namaste!
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Thank you for reaching out. We&rsquo;ll get back to you
                      within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-1.5"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-1.5"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-1.5"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option>Book a Class</option>
                        <option>General Inquiry</option>
                        <option>Private Sessions</option>
                        <option>Corporate Yoga</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
