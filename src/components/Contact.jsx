import { useState } from 'react';

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');

  function handleChange(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: accessKey, ...form }),
      });
      const result = await response.json();
      if (!result.success) throw new Error('Submission failed');
      setForm(initialForm);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="page-width scroll-mt-28 py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-teal-300">Let's connect</p>
          <h2 id="contact-heading" className="text-4xl font-semibold tracking-tighter md:text-6xl">Let's build something great together.</h2>
          <p className="mt-6 max-w-md leading-7 text-slate-300">Have a question, an idea, or an opportunity? Send a message or reach out directly.</p>
          <div className="mt-8 space-y-2 text-sm text-slate-300">
            <p><span className="text-slate-400">Email</span><br /><a className="transition-colors hover:text-teal-300" href="mailto:aliumuhammad2000@gmail.com">aliumuhammad2000@gmail.com</a></p>
            <p className="pt-3"><span className="text-slate-400">Location</span><br />Lagos, Nigeria</p>
          </div>
          <div className="mt-8 flex gap-5 text-sm">
            <a href="https://github.com/aliumuhammad2000-dev" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-teal-300">GitHub</a>
            <a href="https://www.linkedin.com/in/aliyu-mohammed2209/" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-teal-300">LinkedIn</a>
            <a href="https://x.com/Thundeyhally" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-teal-300">X</a>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-slate-300">Your name</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required autoComplete="name" className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-3 text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-teal-300" placeholder="Tunde" />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-slate-300">Email address</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-3 text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-teal-300" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm text-slate-300">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows="6" className="w-full resize-y rounded-xl border border-slate-700 bg-transparent px-4 py-3 text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-teal-300" placeholder="Tell me about your project..." />
          </div>
          <button type="submit" disabled={status === 'sending'} className="rounded-full bg-teal-300 px-7 py-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-teal-200 disabled:cursor-wait disabled:opacity-60">{status === 'sending' ? 'Sending...' : 'Send message'}</button>
          {status === 'success' && <p role="status" className="text-sm text-teal-300">Message sent successfully. I'll get back to you soon.</p>}
          {status === 'error' && <p role="alert" className="text-sm text-rose-300">The form is not configured yet. Please email me directly for now.</p>}
        </form>
      </div>
    </section>
  );
}
