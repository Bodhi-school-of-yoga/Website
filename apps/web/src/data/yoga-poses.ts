// Typed loader for the Bodhi yoga-poses library.
//
// The content lives in ./yoga-poses.json — that is the file to edit when you
// add, update, or remove a pose. This module only adds TypeScript types and
// small lookup helpers used by the listing and detail pages.

import data from "./yoga-poses.json";

export type PoseCategory = {
  slug: string;
  label: string;
  description: string;
};

export type YogaPose = {
  slug: string;
  categorySlug: string;
  name: string;
  sanskrit: string;
  difficulty: string;
  /** Stimulated chakra(s), or null when the source page names none. */
  chakra: string | null;
  /** Filename in /public/images/yoga-poses, or null for the typographic fallback. */
  image: string | null;
  intro: string;
  steps: string[];
  benefits: string[];
  tips: string[];
  contraindications: string[];
  variations: string[];
  /** Slugs of related poses; the loader fills gaps with same-category poses. */
  related: string[];
};

export const categories: PoseCategory[] = data.categories as PoseCategory[];
export const poses: YogaPose[] = (data.poses as unknown) as YogaPose[];

export function getCategory(slug: string): PoseCategory | null {
  return categories.find((c) => c.slug === slug) ?? null;
}

export function getCategoryLabel(slug: string): string {
  return getCategory(slug)?.label ?? slug;
}

export function getPose(categorySlug: string, slug: string): YogaPose | null {
  return (
    poses.find((p) => p.slug === slug && p.categorySlug === categorySlug) ?? null
  );
}

export function getPoseBySlug(slug: string): YogaPose | null {
  return poses.find((p) => p.slug === slug) ?? null;
}

export function getPosesByCategory(categorySlug: string): YogaPose[] {
  return poses.filter((p) => p.categorySlug === categorySlug);
}

export function posePath(pose: Pick<YogaPose, "categorySlug" | "slug">): string {
  return `/yoga-poses/${pose.categorySlug}/${pose.slug}`;
}

// Resolves up to `limit` related poses for a detail page. Honours the explicit
// `related` slugs first, then fills any gap with other poses from the same
// category, so the "Related Poses" section is always populated.
export function getRelatedPoses(pose: YogaPose, limit = 3): YogaPose[] {
  const seen = new Set<string>([pose.slug]);
  const result: YogaPose[] = [];

  const push = (candidate: YogaPose | null) => {
    if (!candidate || seen.has(candidate.slug) || result.length >= limit) return;
    seen.add(candidate.slug);
    result.push(candidate);
  };

  pose.related.forEach((slug) => push(getPoseBySlug(slug)));
  getPosesByCategory(pose.categorySlug).forEach(push);
  poses.forEach(push);

  return result;
}
