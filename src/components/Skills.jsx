const skills = ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'Git', 'GitHub', 'API integration'];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="page-width scroll-mt-28 py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-teal-300">Tools I use</p>
          <h2 id="skills-heading" className="text-4xl font-semibold tracking-tighter md:text-6xl">Always learning.</h2>
        </div>
        <div>
          <p className="max-w-xl leading-7 text-slate-300">These are the tools and technologies I use to turn ideas into reliable interfaces, with more being added as I grow.</p>
          <ul className="mt-8 flex flex-wrap gap-3" aria-label="Skills and technologies">
            {skills.map(skill => <li key={skill} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-teal-300 hover:text-teal-300">{skill}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
