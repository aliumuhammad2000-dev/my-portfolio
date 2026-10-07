import { useEffect, useState } from 'react';
import { getFeaturedProjects } from '../services/projects.js';

function ProjectItem({ project }) {
  return (
    <article className="group py-8">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-teal-300 md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-2xl leading-7 text-slate-300">
          {project.short_description}
        </p>
        <ul aria-label={`${project.title} technologies`} className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <li
              className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
              key={technology}
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>
      {(project.live_url || project.github_url) && (
        <div className="mt-6 flex gap-5 text-sm">
          {project.live_url && (
            <a
              className="text-slate-300 transition-colors hover:text-teal-300"
              href={project.live_url}
              rel="noreferrer"
              target="_blank"
            >
              Live demo
            </a>
          )}
          {project.github_url && (
            <a
              className="text-slate-300 transition-colors hover:text-teal-300"
              href={project.github_url}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;

    getFeaturedProjects()
      .then((items) => {
        if (!active) return;
        setProjects(items);
        setStatus('success');
      })
      .catch(() => {
        if (active) setStatus('error');
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="page-width scroll-mt-28 py-20 md:py-28">
      <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-teal-300">
            Selected work
          </p>
          <h2 id="projects-heading" className="text-4xl font-semibold tracking-tighter md:text-6xl">
            Projects I've worked on.
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-slate-400">
          A collection of projects I've built while learning, experimenting, and solving real problems.
        </p>
      </div>

      {status === 'loading' && (
        <p className="py-8 text-slate-400" role="status">
          Loading projects...
        </p>
      )}
      {status === 'error' && (
        <p className="py-8 text-slate-400" role="alert">
          Unable to load projects right now.
        </p>
      )}
      {status === 'success' && projects.length === 0 && (
        <p className="py-8 text-slate-400">No projects available yet.</p>
      )}
      {status === 'success' && projects.length > 0 && (
        <div className="grid gap-x-10 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              className={`animate-rise animate-rise-delay-${Math.min(index + 1, 3)}`}
              key={project.id}
            >
              <ProjectItem project={project} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
