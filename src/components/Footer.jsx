export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="page-width flex flex-col justify-between gap-3 py-7 text-xs text-slate-400 sm:flex-row sm:items-center">
        <p className="font-semibold tracking-[-0.04em] text-slate-200">THUNDEY</p>
        <p>© {new Date().getFullYear()} Tunde. Built with React and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
