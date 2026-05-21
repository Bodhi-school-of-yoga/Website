import axios from "axios";
import type { StrapiResponse } from "@/types/strapi";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337",
  headers: { "Content-Type": "application/json" },
});

export async function fetchAPI<T>(
  path: string,
  params: Record<string, string | number | boolean> = {},
): Promise<StrapiResponse<T>> {
  const { data } = await api.get<StrapiResponse<T>>(`/api${path}`, { params });
  return data;
}

export function getStrapiMedia(url: string | undefined | null): string {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}${url}`;
}

export default api;
