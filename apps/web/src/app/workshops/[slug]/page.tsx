import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FaqSection } from "@/components/sections/faq-section";
import { WorkshopAboutSection } from "@/components/sections/workshop-about-section";
import { WorkshopBenefitsSection } from "@/components/sections/workshop-benefits-section";
import { WorkshopHeroWithBooking } from "@/components/sections/workshop-hero-with-booking";
import { WorkshopFacilitatorSection } from "@/components/sections/workshop-facilitator-section";
import { WorkshopScheduleSection } from "@/components/sections/workshop-schedule-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import {
  workshops,
  getWorkshop,
  getFacilitator,
  getFaqs,
} from "@/data/workshops";

export function generateStaticParams() {
  return workshops.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const workshop = getWorkshop(slug);
  if (!workshop) return { title: "Workshop | Bodhi School of Yoga" };
  return {
    title: `${workshop.title} | Bodhi School of Yoga`,
    description: workshop.subtitle,
  };
}

export default async function WorkshopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workshop = getWorkshop(slug);
  if (!workshop) notFound();

  const { about, benefits, schedule } = workshop;
  const facilitator = getFacilitator(workshop);
  const faqs = getFaqs(workshop);
  // Countdown target: per-workshop date from the JSON, or a sensible default.
  const startsAt = workshop.startsAt ?? "2026-06-15T09:00:00+05:30";

  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <WorkshopHeroWithBooking
          backgroundImage={`/images/workshop-detail/${workshop.heroImage}`}
          backgroundAlt={`${workshop.title} workshop`}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Workshops", href: "/workshops" },
            { label: workshop.title },
          ]}
          titleAccent={workshop.titleAccent}
          title={workshop.titleMain}
          subtitle={workshop.subtitle}
          startsAt={startsAt}
          attendees={1}
          primaryCtaLabel={workshop.booking.ctaLabel}
          booking={{
            eyebrow: workshop.booking.eyebrow,
            price: workshop.booking.price,
            priceStrike: workshop.booking.priceStrike ?? undefined,
            saveNote: workshop.booking.saveNote ?? undefined,
            chips: workshop.booking.chips.map((chip) => ({
              icon: (
                <span aria-hidden="true" className="text-[15px] leading-none">
                  {chip.emoji}
                </span>
              ),
              label: chip.label,
            })),
            ctaLabel: workshop.booking.ctaLabel,
            guaranteeNote: workshop.booking.guaranteeNote,
          }}
          workshopName={workshop.title}
          amountInPaise={Number(workshop.booking.price) * 100}
          razorpayKey={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ""}
          batches={[
            { label: "8th June – 31st July", value: "jun-8-jul-31" },
            { label: "1st Aug – 30th Sep", value: "aug-1-sep-30" },
          ]}
          timeSlots={[
            { label: "7:00 AM – 9:00 AM", value: "7am-9am" },
            { label: "4:00 PM – 6:00 PM", value: "4pm-6pm" },
          ]}
        />

        <WorkshopAboutSection
          eyebrow={about.eyebrow}
          titleLead={about.titleLead}
          titleAccent={about.titleAccent}
          body={about.body}
          image={{
            src: "/images/workshop-detail/about-group.png",
            alt: about.imageAlt,
          }}
          features={about.features}
        />

        <WorkshopBenefitsSection
          eyebrow={benefits.eyebrow}
          title={benefits.title}
          subtitle={benefits.subtitle}
          benefits={benefits.items}
        />

        {schedule ? (
          <WorkshopScheduleSection
            eyebrow={schedule.eyebrow}
            title={schedule.title}
            items={schedule.items}
            sideImage={{
              src: "/images/workshop-detail/schedule-side.png",
              alt: `${workshop.title} schedule`,
            }}
          />
        ) : null}

        {facilitator ? <WorkshopFacilitatorSection {...facilitator} /> : null}

        <FaqSection
          eyebrow="Have Questions?"
          heading="Frequently Asked Questions"
          items={faqs}
        />
      </main>
      <SiteFooterBlock />
    </>
  );
}
