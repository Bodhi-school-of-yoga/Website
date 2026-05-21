import Link from "next/link";
import Container from "@/components/shared/container";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Studio: [
    { href: "/about", label: "About Us" },
    { href: "/classes", label: "Classes" },
    { href: "/instructors", label: "Instructors" },
    { href: "/contact", label: "Contact" },
  ],
  Practice: [
    { href: "/classes", label: "Hatha Yoga" },
    { href: "/classes", label: "Vinyasa Flow" },
    { href: "/classes", label: "Yin Yoga" },
    { href: "/classes", label: "Meditation" },
  ],
  Connect: [
    { href: "/blog", label: "Blog" },
    { href: "#", label: "Instagram" },
    { href: "#", label: "Facebook" },
    { href: "#", label: "YouTube" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-secondary/50 mt-auto">
      <Container className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-primary">
              Bodhi
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Find your balance. Transform your life through the ancient practice
              of yoga in a modern, welcoming space.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold mb-3">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Bodhi Yoga Studio. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
}
