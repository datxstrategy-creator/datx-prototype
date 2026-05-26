const links = [
  { label: "Framework", href: "#framework" },
  { label: "Reports", href: "#reports" },
  { label: "Positioning", href: "#positioning" },
  { label: "Workflow", href: "#workflow" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 border-b border-datx-line/70">
      <div className="container-frame flex h-20 items-center justify-between">
        <a href="#" aria-label="DATX home" className="flex items-baseline gap-4">
          <span className="text-xl font-semibold tracking-[0.28em] text-white">
            DATX
          </span>
          <span className="hidden border-l border-datx-line pl-4 text-xs text-slate-400 sm:block">
            Digital Assets Treasury Platform
          </span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              className="text-sm text-slate-400 transition-colors hover:text-white"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a className="button-secondary hidden px-5 py-2.5 sm:inline-flex" href="#assessment">
          Request Assessment
        </a>
      </div>
    </header>
  );
}
