# THUNDEY Portfolio

A responsive personal portfolio for Aliyu Mohammed (Tunde), a junior frontend developer based in Lagos, Nigeria.

## Built with

- React
- Vite
- Tailwind CSS
- Web3Forms

## Features

- Dark navy and teal responsive design
- About, services, skills, and projects sections
- Text-only project showcase with live and GitHub links
- Downloadable CV
- Contact form powered by Web3Forms
- Responsive navigation and subtle animations

## Run locally

```bash
npm install
npm run dev
```

Create a `.env` file in the project root for the contact form:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_access_key
```

Run a production check with:

```bash
npm run build
```

## Project structure

- `src/components/` - reusable React sections and UI components
- `src/data/projects.js` - project information
- `public/cv.pdf` - downloadable CV
- `src/input.css` - Tailwind theme and animations
