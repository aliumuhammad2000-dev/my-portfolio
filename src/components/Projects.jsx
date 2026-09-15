import { projects } from '../data/projects.js';

function ProjectItem({ project }) {
  return (
    <article className="group py-8">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-teal-300 md:text-3xl">{project.name}</h3>
        <p className="mt-3 max-w-2xl leading-7 text-slate-300">{project.description}</p>
        <ul aria-label={`${project.name} technologies`} className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map(technology => <li key={technology} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">{technology}</li>)}
        </ul>
      </div>
      <div className="mt-6 flex gap-5 text-sm">
        <a href={project.liveDemo} target="_blank" rel="noreferrer" className="text-slate-300 transition-colors hover:text-teal-300">Live demo</a>
        <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-300 transition-colors hover:text-teal-300">GitHub</a>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="page-width scroll-mt-28 py-20 md:py-28">
      <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-teal-300">Selected work</p>
          <h2 id="projects-heading" className="text-4xl font-semibold tracking-tighter md:text-6xl">Projects I've worked on.</h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-slate-400">A collection of projects I've built while learning, experimenting, and solving real problems.</p>
      </div>
      <div className="grid gap-x-10 md:grid-cols-2">
        {projects.map(project => <ProjectItem key={project.id} project={project} />)}
      </div>
    </section>
  );
}
