# Supabase setup

The public portfolio reads published project records from Supabase. A separate future application named `my-portfolio-admin` will manage project records. This repository does not contain authentication or write operations.

## 1. Create the table

Run this SQL in the Supabase SQL editor:

```sql
create extension if not exists pgcrypto;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text not null,
  description text,
  github_url text,
  live_url text,
  technologies text[] not null default '{}',
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

The table intentionally has no image, thumbnail, cover image, or storage fields. Projects are text-only.

## 2. Enable public read access

The browser uses Supabase’s anonymous key, so Row Level Security should allow the `anon` role to read only published projects. The following policy has already been created in the current database. Do not run the `create policy` statement again there; use it as a reference when setting up another environment.

```sql
alter table public.projects enable row level security;

grant select on public.projects to anon;
revoke insert, update, delete on public.projects from anon;
revoke select, insert, update, delete on public.projects from authenticated;

create policy "Public can read published projects"
on public.projects
for select
to anon
using (published = true);
```

If the policy already exists, do not recreate it. Check existing policies in Supabase under **Authentication → Policies** or with:

```sql
select policyname, roles, cmd
from pg_policies
where schemaname = 'public' and tablename = 'projects';
```

Do not create public insert, update, or delete policies. The future admin application should use a separately authorized server-side write path or a narrowly scoped admin policy; do not grant write access to every authenticated user.

## 3. Configure the portfolio

Copy `.env.example` to `.env` and fill in the Supabase project values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Only use the public anon key in this frontend. Never add a Supabase service-role key to `.env`, source files, or the repository.

## 4. Migrate the current projects

Create one row for each project currently shown in the portfolio. The existing content is preserved below as a migration reference:

| Title | Slug | Technologies | Featured | Published |
| --- | --- | --- | --- | --- |
| Online Bookstore | `online-bookstore` | React, Tailwind CSS, JavaScript | true | true |
| Thundey Store | `thundey-store` | HTML, Tailwind CSS, JavaScript | true | true |
| Royalty Parfait | `royalty-parfait` | HTML, Tailwind CSS, JavaScript | true | true |
| Thundey Blog Template | `thundey-blog-template` | HTML, Tailwind CSS, JavaScript | true | true |
| Thundey Track | `thundey-track` | React, Tailwind CSS, REST API, Lucide React | true | true |
| Thundey GitHub Explorer | `thundey-github-explorer` | React, Tailwind CSS, JavaScript, REST API | true | true |

Copy each project’s existing description, GitHub URL, and live URL from `src/data/projects.js` into the matching Supabase row. That file is retained only as a migration reference; the public site no longer imports it.

### Safe migration SQL

Run this after creating the table. It can be run again without creating duplicate rows because `slug` is unique. The `on conflict` clause updates the migrated content for that slug.

```sql
insert into public.projects (
  title,
  slug,
  short_description,
  technologies,
  github_url,
  live_url,
  featured,
  published
)
values
  (
    'Online Bookstore',
    'online-bookstore',
    'A responsive bookstore where readers can browse books, explore details, and manage a shopping cart.',
    array['React', 'Tailwind CSS', 'JavaScript'],
    'https://github.com/aliumuhammad2000-dev/online-bookstore',
    'https://online-bookstore-cyan-two.vercel.app/',
    true,
    true
  ),
  (
    'Thundey Store',
    'thundey-store',
    'An e-commerce website for exploring products and enjoying a simple shopping experience.',
    array['HTML', 'Tailwind CSS', 'JavaScript'],
    'https://github.com/aliumuhammad2000-dev/my-store',
    'https://thundeystore.netlify.app/',
    true,
    true
  ),
  (
    'Royalty Parfait',
    'royalty-parfait',
    'A focused ordering experience for discovering and ordering your favourite parfait.',
    array['HTML', 'Tailwind CSS', 'JavaScript'],
    'https://github.com/aliumuhammad2000-dev/royalty-parfait',
    'https://royaltiesparfait.netlify.app/',
    true,
    true
  ),
  (
    'Thundey Blog Template',
    'thundey-blog-template',
    'A flexible blog template designed for developers to customise and extend.',
    array['HTML', 'Tailwind CSS', 'JavaScript'],
    'https://github.com/aliumuhammad2000-dev/blog-template',
    'https://thundeyblogtemplate.netlify.app/',
    true,
    true
  ),
  (
    'Thundey Track',
    'thundey-track',
    'A responsive job application tracker for practicing React, CRUD workflows, and REST API integration.',
    array['React', 'Tailwind CSS', 'REST API', 'Lucide React'],
    'https://github.com/aliumuhammad2000-dev/thundey-tracker',
    'https://thundey-tracker.vercel.app/',
    true,
    true
  ),
  (
    'Thundey GitHub Explorer',
    'thundey-github-explorer',
    'A React app for discovering GitHub developers and repositories through the GitHub REST API.',
    array['React', 'Tailwind CSS', 'JavaScript', 'REST API'],
    'https://github.com/aliumuhammad2000-dev/Thundey-github-explorer',
    'https://thundey-github-explorer.vercel.app/',
    true,
    true
  )
on conflict (slug) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  technologies = excluded.technologies,
  github_url = excluded.github_url,
  live_url = excluded.live_url,
  featured = excluded.featured,
  published = excluded.published,
  updated_at = now();
```

## Runtime flow

```text
Supabase projects table
        ↓
src/services/projects.js
        ↓
Projects component
        ↓
Text-only project cards
```

The portfolio requests only rows where `published = true` and `featured = true` for the homepage selected-work section. Unpublished projects are never displayed publicly.

## Verification record

The owner manually confirmed the following integration checks after configuring Supabase:

- All six projects load from Supabase.
- Setting `featured` to `false` hides a project from Selected work; restoring `true` shows it again.
- Setting `published` to `false` hides a project; restoring `true` shows it again.
- Editing `short_description` updates the portfolio after refreshing.

Project edits appear on the next data fetch, including a page refresh. These checks were confirmed manually and were not independently repeated by this code change.
