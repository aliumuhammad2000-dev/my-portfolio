import portrait from '../../images/my photo.jpg';

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="page-width scroll-mt-28 pb-10 pt-14 md:pt-24">
      <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
        <div className="animate-rise">
          <p className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-slate-300"><span className="h-px w-8 bg-teal-300" />Hello, I'm Tunde</p>
          <h1 id="hero-heading" className="animate-rise animate-rise-delay-1 text-[clamp(3rem,7vw,6.5rem)] leading-[0.98] font-semibold tracking-[-0.065em]">Frontend<br /><span className="text-teal-300">Developer.</span></h1>
          <p className="animate-rise animate-rise-delay-2 mt-8 max-w-lg text-lg leading-8 text-slate-300">I turn ideas into thoughtful web experiences. Built with care, made to work beautifully on every screen.</p>
          <div className="animate-rise animate-rise-delay-3 mt-10 flex flex-wrap gap-4">
            <a className="rounded-full bg-teal-300 px-7 py-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-teal-200" href="https://github.com/aliumuhammad2000-dev?tab=repositories">Explore my GitHub</a>
            <a className="rounded-full border border-slate-600 px-7 py-4 text-sm font-medium transition-colors hover:border-teal-300 hover:text-teal-300" href="mailto:aliumuhammad2000@gmail.com">Get in touch</a>
            <a className="rounded-full border border-slate-600 px-7 py-4 text-sm font-medium transition-colors hover:border-teal-300 hover:text-teal-300" href="/cv.pdf" download="Aliyu-Mohammed-Tunde-CV.pdf">Download CV</a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="animate-float absolute inset-0 rounded-4xl border border-teal-300/25" aria-hidden="true" />
          <figure className="relative overflow-hidden rounded-3xl bg-[#151e30]">
            <img src={portrait} alt="Tunde, frontend developer" className="aspect-4/5 w-full object-cover object-top" fetchPriority="high" />
            <figcaption className="flex items-center justify-between gap-3 border-t border-white/10 px-6 py-5"><span className="text-sm font-medium">A little curiosity. A lot of building.</span><span className="text-xl text-teal-300" aria-hidden="true">✳</span></figcaption>
          </figure>
        </div>
      </div>
      <div className="mt-16 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 text-xs text-slate-400 md:mt-24 md:flex-row md:items-center">
        <p className="uppercase tracking-[0.2em]">Based in Lagos, Nigeria</p>
        <ul aria-label="Technologies I work with" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
          {['Typescript', 'React', 'JavaScript', 'Tailwind CSS'].map(skill => <li key={skill}>{skill}</li>)}
        </ul>
      </div>
    </section>
  );
}
