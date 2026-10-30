import { supabase } from "../lib/supabase.js";
import { projectDetails } from "../data/project-details.js";

const signedImageFunctionUrl =
  import.meta.env.VITE_SUPABASE_FUNCTIONS_URL ||
  (import.meta.env.VITE_SUPABASE_URL
    ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/public-project-images`
    : null);

function mapProject(row, images = []) {
  const cover = images.find((image) => image.kind === "cover");
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    short_description: row.short_description,
    description: row.description,
    details:
      Array.isArray(row.details) && row.details.length > 0
        ? row.details
        : (projectDetails[row.slug] ?? []),
    github_url: row.github_url,
    live_url: row.live_url,
    technologies: Array.isArray(row.technologies) ? row.technologies : [],
    featured: row.featured,
    published: row.published,
    created_at: row.created_at,
    updated_at: row.updated_at,
    image: cover?.url ?? null,
    image_expires_at: cover?.expires_at ?? null,
    screenshots: images.filter((image) => image.kind === "screenshot"),
  };
}

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Add the required environment variables.",
    );
  }
  return supabase;
}

async function queryProjects(query) {
  const { data, error } = await query;
  if (error) throw new Error("Unable to load projects right now.");
  return data ?? [];
}

async function getSignedImages(slug) {
  if (!signedImageFunctionUrl)
    throw new Error("The public image service is not configured.");
  const response = await fetch(
    `${signedImageFunctionUrl}?slug=${encodeURIComponent(slug)}`,
  );
  if (!response.ok) throw new Error("Unable to load project images right now.");
  const payload = await response.json();
  return Array.isArray(payload.images) ? payload.images : [];
}

async function withSignedImages(rows) {
  return Promise.all(
    rows.map(async (row) => mapProject(row, await getSignedImages(row.slug))),
  );
}

export async function getPublishedProjects() {
  const rows = await queryProjects(
    requireSupabase()
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false }),
  );
  return withSignedImages(rows);
}

export async function getFeaturedProjects() {
  const rows = await queryProjects(
    requireSupabase()
      .from("projects")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("created_at", { ascending: false }),
  );
  return withSignedImages(rows);
}

export async function getProjectBySlug(slug) {
  const { data, error } = await requireSupabase()
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw new Error("Unable to load this project right now.");
  if (!data) return null;
  return mapProject(data, await getSignedImages(data.slug));
}
