# THUNDEY Portfolio

A responsive personal portfolio for Aliyu Mohammed (Tunde), a junior frontend developer based in Lagos, Nigeria.

## Built with

- React
- Vite
- Tailwind CSS
- Supabase
- Web3Forms

## Features

- Dark navy and teal responsive design
- About, services, skills, and projects sections
- Text-only project showcase loaded from Supabase
- Downloadable CV
- Contact form powered by Web3Forms
- Responsive navigation and subtle animations
- Published and featured project filtering through Supabase

## Project data architecture

The public portfolio reads published project data from the Supabase `projects` table. A separate future application, `my-portfolio-admin`, will manage project creation, editing, publishing, and deletion. The two applications do not communicate directly:

```text
my-portfolio-admin → Supabase ← my-portfolio
```

The portfolio only performs public read requests. It does not include admin authentication or project write controls.

## Environment variables

Copy `.env.example` to `.env` and add the Supabase values and Web3Forms key:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_WEB3FORMS_ACCESS_KEY=your_access_key
```

Do not add real credentials to source control. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for the table schema, migration reference, and Row Level Security setup.

## Run locally

```bash
npm install
npm run dev
```

Run a production check with:

```bash
npm run build
```

## Project structure

- `src/components/` - reusable React sections and UI components
- `src/services/projects.js` - published and featured project queries
- `src/lib/supabase.js` - reusable Supabase client
- `src/types/project.js` - shared project shape documentation
- `src/data/projects.js` - migration reference for existing project content
- `public/cv.pdf` - downloadable CV
- `src/input.css` - Tailwind theme and animations
