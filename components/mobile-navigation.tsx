"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SampleAssessmentModal } from "@/components/sample-assessment-modal";

const mobileLinks = [
  { label: "Framework", href: "/#framework" },
  { label: "Reports", href: "/#reports" },
  { label: "Network", href: "/#network" },
  { label: "Workflow", href: "/#workflow" },
  { label: "About", href: "/about" },
  { label: "Request Assessment", href: "/#assessment" },
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
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="relative z-20 flex h-11 w-11 items-center justify-center border border-datx-line bg-datx-panel/90 text-slate-100 transition-colors hover:border-datx-blue hover:bg-[#101e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-datx-accent"
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
          className="fixed inset-0 z-10 overflow-y-auto bg-datx-black shadow-panel"
          id="mobile-navigation"
        >
          <nav
            aria-label="Mobile primary"
            className="container-frame flex min-h-full flex-col justify-between pb-8 pt-28"
          >
            <div>
              <p className="eyebrow">Navigation</p>
              <div className="mt-6 divide-y divide-datx-line border-y border-datx-line">
                {mobileLinks.map((link) => (
                  <Link
                    className="flex items-center justify-between py-4 text-base font-light text-slate-100 transition-colors hover:text-white"
                    href={link.href}
                    key={link.href}
                    onClick={closeAfterNavigation}
                  >
                    <span>{link.label}</span>
                    <span
                      className="h-px w-7 bg-datx-blue"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8 border-t border-datx-line pt-6">
              <SampleAssessmentModal
                className="button-secondary w-full justify-center px-4 py-3"
                label="View Sample Assessment"
              />
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
