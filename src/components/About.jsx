export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="page-width scroll-mt-28 py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal-300">A little about me</p>
          <h2 id="about-heading" className="mt-5 text-4xl font-semibold tracking-tighter md:text-6xl">Building with curiosity.</h2>
        </div>
        <div className="space-y-6 text-lg leading-8 text-slate-300">
          <p>I’m a frontend developer who enjoys turning ideas into clean, responsive, and useful web experiences. I learn best by building real projects, solving problems, and improving each version of my work.</p>
          <p>I care about thoughtful interfaces, accessible interactions, and writing code that is simple to understand and maintain.</p>
          <a href="#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300 transition-colors hover:text-teal-200">See the projects</a>
        </div>
      </div>
      <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
        <article className="rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Currently learning</p>
          <h3 className="mt-4 text-xl font-semibold">Growing every build.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">Improving my React skills, learning TypeScript, and practising API integration.</p>
        </article>
        <article className="rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">My approach</p>
          <h3 className="mt-4 text-xl font-semibold">Learn by making.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">I turn concepts into working projects so every challenge becomes part of my experience.</p>
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
