const groups = [
  { label: 'Frontend', skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'] },
  { label: 'Application development', skills: ['Component architecture', 'Responsive design', 'API integration', 'State management', 'Form handling', 'Error handling'] },
  { label: 'Tools', skills: ['Git', 'GitHub', 'npm', 'VS Code', 'Vercel'] },
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="page-width scroll-mt-28 py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-teal-300">Tools I use</p>
          <h2 id="skills-heading" className="text-4xl font-semibold tracking-tighter md:text-6xl">Technical capabilities.</h2>
        </div>
        <div>
          <p className="max-w-xl leading-7 text-slate-300">A practical toolkit for building responsive interfaces, connecting product flows to data, and keeping frontend code maintainable.</p>
          <div className="mt-8 space-y-7">{groups.map(group => <div key={group.label}><h3 className="text-sm font-semibold text-slate-200">{group.label}</h3><ul className="mt-3 flex flex-wrap gap-3" aria-label={`${group.label} skills`}>{group.skills.map(skill => <li key={skill} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-teal-300 hover:text-teal-300">{skill}</li>)}</ul></div>)}</div>
        </div>
      </div>
    </section>
  );
}
