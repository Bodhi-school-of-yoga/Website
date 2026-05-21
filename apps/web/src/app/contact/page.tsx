import type { Metadata } from "next";
import ContactContent from "@/components/contact/contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Bodhi Yoga Studio. Book a class, ask a question, or visit our studio.",
};

export default function ContactPage() {
  return <ContactContent />;
}
