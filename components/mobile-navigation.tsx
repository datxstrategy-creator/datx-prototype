"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SampleAssessmentModal } from "@/components/sample-assessment-modal";

const mobileLinks = [
  { label: "About", href: "/about" },
  { label: "Request Assessment", href: "/#assessment" },
  { label: "Contact", href: "/about#contact" },
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const closeAfterNavigation = () => {
    window.setTimeout(() => setIsOpen(false), 0);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="flex h-11 w-11 items-center justify-center border border-datx-line bg-datx-panel/70 text-slate-100 transition-colors hover:border-datx-blue hover:bg-[#101e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-datx-accent"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="relative h-4 w-5" aria-hidden="true">
          <span
            className={`absolute left-0 h-px w-5 bg-current transition-transform duration-200 ${
              isOpen ? "top-2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-2 h-px w-5 bg-current transition-opacity duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-px w-5 bg-current transition-transform duration-200 ${
              isOpen ? "top-2 -rotate-45" : "top-4"
            }`}
          />
        </span>
      </button>

      {isOpen ? (
        <div
          className="absolute inset-x-0 top-20 border-y border-datx-line bg-datx-black/95 shadow-panel backdrop-blur-md"
          id="mobile-navigation"
        >
          <nav aria-label="Mobile primary" className="container-frame py-5">
            <div className="grid gap-2">
              {mobileLinks.map((link) => (
                <Link
                  className="border border-datx-line bg-datx-panel/45 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-datx-blue hover:bg-[#101e2e]"
                  href={link.href}
                  key={link.href}
                  onClick={closeAfterNavigation}
                >
                  {link.label}
                </Link>
              ))}
              <SampleAssessmentModal
                className="button-secondary mt-2 w-full px-4 py-3"
                label="Sample Assessment"
              />
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
