import { AccreditationsSection } from "@/components/sections/accreditations-section";

export default function AccreditationsDemoPage() {
  return (
    <main className="min-h-screen bg-background">
      <AccreditationsSection
        eyebrow="A Path to Wellness"
        heading="Recognizing the Global Impact of Yoga"
        description="Deepen your wisdom and elevate your yoga career with our specialized yoga certifications."
        items={[
          {
            logoSrc: "/images/accreditations/yoga-alliance-usa.png",
            logoAlt: "Yoga Alliance, USA logo",
            caption: "Yoga Alliance, USA (YA)",
          },
          {
            logoSrc: "/images/accreditations/aivetc.png",
            logoAlt: "AIVETC logo",
            caption: "AIVETC",
          },
          {
            logoSrc: "/images/accreditations/jyotish-yoga-sastra-university.png",
            logoAlt: "Jyotish Yoga Sastra University logo",
            caption: "Jyotish Yoga Sastra University",
          },
          {
            logoSrc: "/images/accreditations/rys-300.png",
            logoAlt: "Registered Yoga School 300 logo",
            caption: "Registered Yoga School – 300",
          },
          {
            logoSrc: "/images/accreditations/ministry-of-ayush.png",
            logoAlt: "Ministry of Ayush, Government of India logo",
            caption: "Ministry of Ayush, Government of India",
          },
          {
            logoSrc: "/images/accreditations/yoga-certification-board.png",
            logoAlt: "Yoga Certification Board logo",
            caption: "Yoga Certification Board",
          },
          {
            logoSrc: "/images/accreditations/pqms.png",
            logoAlt: "Professional Quality Management Services logo",
            caption: "Professional Quality Management Services",
          },
          {
            logoSrc: "/images/accreditations/rys-200.png",
            logoAlt: "Registered Yoga School 200 logo",
            caption: "Registered Yoga School – 200",
          },
        ]}
      />
    </main>
  );
}
