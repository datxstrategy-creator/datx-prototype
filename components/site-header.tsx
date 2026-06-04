import Image from "next/image";
import Link from "next/link";
import { MobileNavigation } from "@/components/mobile-navigation";

const links = [
  { label: "Framework", href: "/#framework" },
  { label: "Reports", href: "/#reports" },
  { label: "Positioning", href: "/#positioning" },
  { label: "Workflow", href: "/#workflow" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 border-b border-datx-line/70">
      <div className="container-frame flex h-20 items-center justify-between">
        <Link href="/" aria-label="DATX home" className="flex items-center gap-5">
          <Image
            alt="DATX"
            className="h-auto w-[7.6rem] sm:w-[8.7rem]"
            height={94}
            priority
            src="/brand/datx-logo-white.png"
            width={343}
          />
          <span className="hidden border-l border-datx-line pl-4 text-xs text-slate-400 sm:block">
            Digital Assets Treasury Platform
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              className="text-sm text-slate-400 transition-colors hover:text-white"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          className="button-secondary hidden px-5 py-2.5 sm:inline-flex"
          href="/#assessment"
        >
          Request Assessment
        </Link>
        <MobileNavigation />
      </div>
    </header>
  );
}
