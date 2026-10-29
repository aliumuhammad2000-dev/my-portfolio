import { supabase } from '../lib/supabase.js';
import { projects as localProjects } from '../data/projects.js';

function mapProject(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    short_description: row.short_description,
    description: row.description,
    github_url: row.github_url,
    live_url: row.live_url,
    technologies: Array.isArray(row.technologies) ? row.technologies : [],
    featured: row.featured,
    published: row.published,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add the required environment variables.');
  }

  return supabase;
}

async function queryProjects(query) {
  const { data, error } = await query;

  if (error) {
    throw new Error('Unable to load projects right now.');
  }

  return (data ?? []).map(mapProject);
}

export async function getPublishedProjects() {
  const client = requireSupabase();

  return queryProjects(
    client
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false }),
  );
}

export async function getFeaturedProjects() {
  // Keep the public showcase deterministic and aligned with the reviewed portfolio.
  // Supabase remains available for the admin/content workflow through the other service methods.
  return localProjects;
}

export async function getProjectBySlug(slug) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    throw new Error('Unable to load this project right now.');
  }

  return data ? mapProject(data) : null;
}
