import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RelatedPosesSection } from "@/components/sections/related-poses-section";
import { YogaPoseDetailBody } from "@/components/sections/yoga-pose-detail-body";
import { YogaPoseHero } from "@/components/sections/yoga-pose-hero";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import {
  poses,
  getPose,
  getCategoryLabel,
  getRelatedPoses,
} from "@/data/yoga-poses";

type PageParams = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return poses.map((p) => ({ category: p.categorySlug, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { category, slug } = await params;
  const pose = getPose(category, slug);
  if (!pose) return { title: "Yoga Pose | Bodhi School of Yoga" };
  return {
    title: `${pose.name} (${pose.sanskrit}) | Bodhi School of Yoga`,
    description: pose.intro.slice(0, 155),
  };
}

export default async function YogaPoseDetailPage({ params }: PageParams) {
  const { category, slug } = await params;
  const pose = getPose(category, slug);
  if (!pose) notFound();

  const categoryLabel = getCategoryLabel(pose.categorySlug);
  const related = getRelatedPoses(pose);

  return (
    <>
      <SiteHeader tone="dark" />
      <main>
        <YogaPoseHero
          name={pose.name}
          sanskrit={pose.sanskrit}
          intro={pose.intro}
          difficulty={pose.difficulty}
          categoryLabel={categoryLabel}
          chakra={pose.chakra}
          image={pose.image}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Yoga Poses", href: "/yoga-poses" },
            { label: categoryLabel, href: `/yoga-poses#${pose.categorySlug}` },
            { label: pose.name },
          ]}
        />

        <YogaPoseDetailBody
          name={pose.name}
          steps={pose.steps}
          benefits={pose.benefits}
          tips={pose.tips}
          contraindications={pose.contraindications}
          variations={pose.variations}
        />

        <RelatedPosesSection poses={related} />
      </main>
      <SiteFooterBlock />
    </>
  );
}
