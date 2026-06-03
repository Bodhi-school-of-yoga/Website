import type { VideoTestimonial } from "@/components/sections/video-testimonials-section";

/**
 * Canonical list of YouTube Shorts video testimonials.
 *
 * Used by every "What our students say" section (home, about, course detail,
 * yoga-day landing) so the testimonials look and behave identically everywhere.
 * Add a single entry here and it shows up across the whole site.
 */
export const TESTIMONIAL_VIDEOS: VideoTestimonial[] = [
  { id: "v1", videoId: "AW3aFUzQcxI" },
  { id: "v2", videoId: "d7STLMg7Qb0" },
  { id: "v3", videoId: "PA44LkdEFSg" },
  { id: "v4", videoId: "2mV-YeTXs1U", name: "International YTT Testimonial" },
  { id: "v5", videoId: "jwQEb1Ijo-Y", name: "Regular Yoga Student Testimonial" },
  { id: "v6", videoId: "y-Js_zNn62o" },
  { id: "v7", videoId: "L0a-uSo1P_8" },
];
