import { useRef, useState } from 'react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'GitHub', href: 'https://github.com/aliumuhammad2000-dev' },
  { label: "Let's talk", href: 'mailto:aliumuhammad2000@gmail.com' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef(null);

  function handleKeyDown(event) {
    if (event.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
      menuButton.current?.focus();
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1120]/95 backdrop-blur" onKeyDown={handleKeyDown}>
      <nav aria-label="Main navigation" className="page-width flex min-h-24 flex-wrap items-center justify-between gap-4 py-5">
        <a href="#home" onClick={() => setIsMenuOpen(false)} aria-label="THUNDEY home" className="text-xl font-extrabold tracking-[-0.06em]">THUNDEY<span className="text-teal-300">.</span></a>
        <button ref={menuButton} type="button" aria-expanded={isMenuOpen} aria-controls="navigation-links" onClick={() => setIsMenuOpen(open => !open)} className="rounded-full border border-white/20 px-5 py-2 text-sm md:hidden">
          {isMenuOpen ? 'Close −' : 'Menu +'}
        </button>
        <ul id="navigation-links" className={`${isMenuOpen ? 'flex' : 'hidden'} w-full flex-col gap-2 md:flex md:w-auto md:flex-row md:items-center md:gap-9`}>
          {links.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setIsMenuOpen(false)} className={`block rounded-full px-4 py-3 text-sm font-medium transition-colors ${link.href.startsWith('mailto:') ? 'bg-teal-300 text-slate-950 hover:bg-teal-200' : 'text-slate-300 hover:text-teal-300'}`}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
