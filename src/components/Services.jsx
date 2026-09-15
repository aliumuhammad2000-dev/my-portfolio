const services = [
  { title: 'Frontend development', description: 'Building responsive, interactive interfaces with React and modern frontend tools.' },
  { title: 'Responsive design', description: 'Creating mobile-first layouts that feel natural across screen sizes.' },
  { title: 'UI implementation', description: 'Turning designs and ideas into clean, accessible, functional web pages.' },
  { title: 'API integration', description: 'Connecting interfaces to APIs so users can work with useful, live data.' },
];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="page-width scroll-mt-28 py-20 md:py-28">
      <div className="mb-10 md:mb-14">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-teal-300">What I can do</p>
        <h2 id="services-heading" className="text-4xl font-semibold tracking-tighter md:text-6xl">Ways I can help.</h2>
      </div>
      <div className="grid gap-x-10 gap-y-0 md:grid-cols-2">
        {services.map((service, index) => (
          <article key={service.title} className="border-t border-white/10 py-7">
            <div className="flex items-start justify-between gap-6">
              <h3 className="text-xl font-semibold capitalize">{service.title}</h3>
              <span className="text-sm text-teal-300">0{index + 1}</span>
            </div>
            <p className="mt-3 max-w-md leading-7 text-slate-300">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
