export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="page-width scroll-mt-28 py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal-300">A little about me</p>
          <h2 id="about-heading" className="mt-5 text-4xl font-semibold tracking-tighter md:text-6xl">Thoughtful interfaces, built to work.</h2>
        </div>
        <div className="space-y-6 text-lg leading-8 text-slate-300">
          <p>I’m a frontend developer who turns product ideas into clean, responsive, and useful web experiences with React and modern frontend tools.</p>
          <p>I care about accessible interactions, clear visual hierarchy, and code that is simple to understand, reuse, and maintain.</p>
          <a href="#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300 transition-colors hover:text-teal-200">See the projects</a>
        </div>
      </div>
      <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
        <article className="rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Focus</p>
          <h3 className="mt-4 text-xl font-semibold">Reliable user flows.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">Interfaces that make important actions clear, responsive, and easy to complete.</p>
        </article>
        <article className="rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">My approach</p>
          <h3 className="mt-4 text-xl font-semibold">Build with intent.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">I break down product needs into reusable components and maintainable implementation.</p>
        </article>
        <article className="rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Based in</p>
          <h3 className="mt-4 text-xl font-semibold">Lagos, Nigeria.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">Open to meaningful collaborations, freelance opportunities, and frontend roles.</p>
        </article>
      </div>
    </section>
  );
}
