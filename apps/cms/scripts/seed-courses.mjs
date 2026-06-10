#!/usr/bin/env node

// Seed all courses from the web app's courses.json into Strapi CMS.
//
// Usage:
//   1. Start Strapi: cd apps/cms && npm run develop
//   2. Create a full-access API token in Strapi admin → Settings → API Tokens
//   3. Run: STRAPI_API_TOKEN=<token> node apps/cms/scripts/seed-courses.mjs
//
// The script POSTs each course via the REST API. Existing courses (matched by
// slug) are skipped so the script is safe to re-run.

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error(
    "ERROR: Set STRAPI_API_TOKEN env var. Create one in Strapi admin → Settings → API Tokens.",
  );
  process.exit(1);
}

// Load courses from web app's JSON
const coursesPath = resolve(
  __dirname,
  "../../web/src/data/courses.json",
);
const courses = JSON.parse(readFileSync(coursesPath, "utf-8"));

console.log(`Found ${courses.length} courses in courses.json`);

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
};

async function courseExists(slug) {
  const url = `${STRAPI_URL}/api/courses?filters[slug][$eq]=${encodeURIComponent(slug)}`;
  const res = await fetch(url, { headers });
  if (!res.ok) return false;
  const json = await res.json();
  return json.data && json.data.length > 0;
}

async function createCourse(course) {
  // Map from web app's Course shape to Strapi's flat + component shape
  const payload = {
    title: course.title,
    titleLead: course.titleLead || "",
    titleAccent: course.titleAccent || "",
    slug: course.slug,
    category: course.category,
    mode: course.mode,
    price: course.price || null,
    originalPrice: course.originalPrice || null,
    shortDescription: course.shortDescription,
    durationLabel: course.durationLabel || "",
    scheduleLabel: course.scheduleLabel || "",
    timingLabel: course.timingLabel || null,
    listingImage: course.listingImage || "",
    heroImage: course.heroImage || "",
    instructorInitials: course.instructor?.initials || "",
    instructorName: course.instructor?.name || "",
    overview: course.overview || [],
    prerequisites: course.prerequisites || [],
    comingSoon: course.comingSoon || false,
    availabilityNote: course.availabilityNote || null,
    // Repeatable components
    highlights: (course.highlights || []).map((h) => ({
      icon: h.icon || "",
      iconSrc: h.iconSrc || null,
      title: h.title,
      body: h.body,
    })),
    curriculum: (course.curriculum || []).map((c) => ({
      title: c.title,
      body: c.body,
    })),
    instructors: (course.instructors || []).map((i) => ({
      name: i.name,
      role: i.role || "",
      avatar: i.avatar || "",
    })),
    faqs: (course.faqs || []).map((f) => ({
      question: f.question,
      answer: f.answer,
      defaultOpen: f.defaultOpen || false,
    })),
    pricingPlans: (course.pricingPlans || []).map((p) => ({
      period: p.period,
      price: p.price,
    })),
  };

  const res = await fetch(`${STRAPI_URL}/api/courses`, {
    method: "POST",
    headers,
    body: JSON.stringify({ data: payload }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to create "${course.slug}": ${res.status} — ${body}`);
  }

  return res.json();
}

async function publishCourse(documentId) {
  const res = await fetch(
    `${STRAPI_URL}/api/courses/${documentId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({ data: { publishedAt: new Date().toISOString() } }),
    },
  );
  if (!res.ok) {
    const body = await res.text();
    console.warn(`  Warning: could not publish ${documentId}: ${res.status} — ${body}`);
  }
}

async function main() {
  let created = 0;
  let skipped = 0;

  for (const course of courses) {
    const exists = await courseExists(course.slug);
    if (exists) {
      console.log(`  SKIP  ${course.slug} (already exists)`);
      skipped++;
      continue;
    }

    try {
      const result = await createCourse(course);
      const docId = result.data?.documentId;
      console.log(`  CREATE  ${course.slug}`);

      // Auto-publish so courses appear on the site immediately
      if (docId) {
        await publishCourse(docId);
        console.log(`  PUBLISH ${course.slug}`);
      }

      created++;
    } catch (err) {
      console.error(`  ERROR  ${course.slug}: ${err.message}`);
    }
  }

  console.log(`\nDone. Created: ${created}, Skipped: ${skipped}, Total: ${courses.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
