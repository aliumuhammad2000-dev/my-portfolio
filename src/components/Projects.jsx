import { useEffect, useState } from "react";
import { getFeaturedProjects } from "../services/projects.js";

function ProjectItem({ project }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/3 transition-colors hover:border-teal-300/40">
      {project.image ? (
        <div className="overflow-hidden border-b border-white/10 bg-slate-900">
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            className="aspect-video w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      ) : null}
      <div>
        <div className="flex items-start justify-between gap-4 p-6 pb-0 md:p-7 md:pb-0">
          <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-teal-300 md:text-3xl">
            {project.title}
          </h3>
          <span className="rounded-full border border-teal-300/30 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-teal-300">
            Featured
          </span>
        </div>
        <p className="mt-3 max-w-2xl px-6 leading-7 text-slate-300 md:px-7">
          {project.short_description}
        </p>
        {project.details?.length ? (
          <ul className="mt-5 grid gap-2 px-6 text-sm text-slate-400 sm:grid-cols-2 md:px-7">
            {project.details.map((detail) => (
              <li key={detail} className="flex gap-2">
                <span className="text-teal-300" aria-hidden="true">
                  ↳
                </span>
                {detail}
              </li>
            ))}
          </ul>
        ) : null}
        {project.screenshots?.length ? (
          <div className="mt-5 flex gap-2 overflow-x-auto px-6 md:px-7">
            {project.screenshots.map((screenshot) => (
              <img
                key={screenshot.id}
                src={screenshot.url}
                alt={screenshot.alt_text || `${project.title} screenshot`}
                className="h-16 w-24 shrink-0 rounded-lg border border-slate-700 object-cover object-top"
                loading="lazy"
              />
            ))}
          </div>
        ) : null}
        <ul
          aria-label={`${project.title} technologies`}
          className="mt-5 flex flex-wrap gap-2 px-6 md:px-7"
        >
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
        <div className="mt-7 flex flex-wrap gap-3 px-6 pb-6 text-sm md:px-7 md:pb-7">
          {project.live_url && (
            <a
              className="rounded-full bg-teal-300 px-4 py-2 font-semibold text-slate-950 transition-colors hover:bg-teal-200"
              href={project.live_url}
              rel="noreferrer"
              target="_blank"
            >
              Live demo ↗
            </a>
          )}
          {project.github_url && (
            <a
              className="rounded-full border border-slate-600 px-4 py-2 text-slate-300 transition-colors hover:border-teal-300 hover:text-teal-300"
              href={project.github_url}
              rel="noreferrer"
              target="_blank"
            >
              Source code ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;

    const load = () =>
      getFeaturedProjects()
        .then((items) => {
          if (!active) return items;
          setProjects(items);
          setStatus("success");
          return items;
        })
        .catch((error) => {
          if (active) setStatus("error");
          throw error;
        });

    void load().catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const expiries = projects
      .flatMap((project) => [
        project.image_expires_at,
        ...(project.screenshots || []).map((image) => image.expires_at),
      ])
      .filter(Boolean)
      .map((value) => Date.parse(value))
      .filter(Number.isFinite);
    if (!expiries.length) return undefined;
    const refreshIn = Math.max(
      1000,
      Math.min(...expiries) - Date.now() - 30000,
    );
    const timer = window.setTimeout(() => window.location.reload(), refreshIn);
    return () => window.clearTimeout(timer);
  }, [projects]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="page-width scroll-mt-28 py-20 md:py-28"
    >
      <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-teal-300">
            Selected work
          </p>
          <h2
            id="projects-heading"
            className="text-4xl font-semibold tracking-tighter md:text-6xl"
          >
            Selected projects.
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-slate-400">
          Functional interfaces and web applications that show how I work with
          responsive UI, APIs, state, and reusable components.
        </p>
      </div>

      {status === "loading" && (
        <p className="py-8 text-slate-400" role="status">
          Loading projects...
        </p>
      )}
      {status === "error" && (
        <p className="py-8 text-slate-400" role="alert">
          Unable to load projects right now.
        </p>
      )}
      {status === "success" && projects.length === 0 && (
        <p className="py-8 text-slate-400">No projects available yet.</p>
      )}
      {status === "success" && projects.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
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
