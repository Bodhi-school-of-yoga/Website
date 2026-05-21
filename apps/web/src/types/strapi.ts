// ----- Strapi generic response types -----

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: StrapiPagination;
  };
}

// ----- Content Types -----

export interface YogaClass {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "all-levels";
  duration: number;
  schedule: string;
  image?: StrapiImage;
  instructor?: Instructor;
  createdAt: string;
  updatedAt: string;
}

export interface Instructor {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  bio: string;
  specialization: string;
  experience: number;
  photo?: StrapiImage;
  classes?: YogaClass[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  coverImage?: StrapiImage;
  author?: Instructor;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: number;
  documentId: string;
  name: string;
  quote: string;
  rating: number;
  avatar?: StrapiImage;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  id: number;
  siteName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    twitter?: string;
  };
}
