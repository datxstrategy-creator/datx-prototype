"use client";

import { useEffect, useId, useState } from "react";

type SampleAssessmentModalProps = {
  className?: string;
  label?: string;
};

const assessmentCategories = [
  {
    score: "7.4 / 10",
    title: "Overall DATX Candidate Score",
    copy: "Moderate to strong strategic fit, subject to governance readiness, capital allocation discipline, and staged implementation planning.",
  },
  {
    score: "7.8",
    title: "Balance Sheet Flexibility",
    copy: "Norwood Systems Ltd presents a profile that may support structured treasury review, with further diligence required around liquidity runway and allocation capacity.",
  },
  {
    score: "7.6",
    title: "Narrative Strength",
    copy: "The company has a technology-oriented market narrative that may align with digital asset treasury positioning if framed conservatively and institutionally.",
  },
  {
    score: "6.9",
    title: "Governance & Execution Readiness",
    copy: "Execution would require board-level mandate clarity, custody review, risk controls, disclosure planning, and phased deployment parameters.",
  },
];

const reviewDomains = [
  "Treasury suitability",
  "Governance readiness",
  "Strategic allocation modeling",
  "Balance sheet flexibility",
  "Investor narrative alignment",
  "Execution considerations",
];

const strategicObservations = [
  "Norwood Systems Ltd may be an appropriate candidate for a deeper DATX Treasury Assessment if management is evaluating reserve diversification or strategic digital asset exposure.",
  "Any allocation framework should be conservative, staged, and explicitly subordinated to liquidity preservation and operating continuity.",
  "The strongest strategic rationale would likely come from combining treasury diversification with a clear public company governance framework.",
];

export function SampleAssessmentModal({
  className = "button-primary gap-2",
  label = "View Sample Assessment",
}: SampleAssessmentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

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
    <>
      <button className={className} onClick={() => setIsOpen(true)} type="button">
        {label}
      </button>

      {isOpen ? (
        <div
          aria-labelledby={titleId}
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-5 backdrop-blur-sm sm:px-6"
          role="dialog"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative max-h-[92vh] w-full max-w-[960px] overflow-hidden border border-datx-line bg-datx-black shadow-[0_28px_90px_rgba(0,0,0,0.5)]">
            <button
              aria-label="Close sample assessment"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-datx-line bg-datx-panel/95 text-xl leading-none text-slate-200 transition-colors hover:border-datx-gold hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-datx-gold"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              X
            </button>

            <div className="max-h-[92vh] overflow-y-auto">
              <div className="border-b border-datx-line bg-[linear-gradient(105deg,#060a10_0%,#09131f_64%,#0d1928_100%)] px-6 pb-10 pt-12 sm:px-10 lg:px-12">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-datx-gold">
                  DATX Public Intelligence Preview
                </p>
                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_14rem] lg:items-end">
                  <div>
                    <p className="text-sm text-datx-mist">DATX Report #001</p>
                    <h2
                      className="mt-3 text-3xl font-light tracking-tight text-white sm:text-5xl"
                      id={titleId}
                    >
                      Norwood Systems Ltd
                    </h2>
                    <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-datx-gold">
                      ASX:NOR
                    </p>
                  </div>
                  <div className="border border-datx-line bg-datx-panel/80 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Assessment Scope
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-200">
                      Treasury suitability and strategic positioning assessment
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-9 sm:px-10 lg:px-12">
                <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                      Illustrative Sample Report
                    </p>
                    <h3 className="mt-5 text-2xl font-light text-white">
                      Public treasury intelligence preview
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-datx-mist">
                    This sample is provided to illustrate DATX research
                    presentation only. It does not constitute investment, legal,
                    tax, or financial advice. Any implementation would remain
                    subject to corporate governance and diligence.
                  </p>
                </section>

                <section className="mt-10 grid gap-px overflow-hidden border border-datx-line bg-datx-line sm:grid-cols-2">
                  {assessmentCategories.map((category) => (
                    <article className="bg-datx-panel p-6" key={category.title}>
                      <p className="text-2xl font-light tabular-nums text-white">
                        {category.score}
                      </p>
                      <h4 className="mt-5 text-sm font-medium uppercase tracking-[0.16em] text-datx-gold">
                        {category.title}
                      </h4>
                      <p className="mt-4 text-sm leading-7 text-datx-mist">
                        {category.copy}
                      </p>
                    </article>
                  ))}
                </section>

                <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
                  <div className="border border-datx-line bg-[#0a1522]/70 p-6 sm:p-7">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                      Review Domains
                    </p>
                    <div className="mt-6 divide-y divide-datx-line border-y border-datx-line">
                      {reviewDomains.map((domain, index) => (
                        <div
                          className="grid grid-cols-[3rem_1fr] items-center gap-4 py-4"
                          key={domain}
                        >
                          <span className="text-xs tabular-nums tracking-widest text-datx-blue">
                            0{index + 1}
                          </span>
                          <p className="text-sm leading-6 text-slate-200">
                            {domain}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-datx-line bg-datx-panel/70 p-6 sm:p-7">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                      Strategic Observations
                    </p>
                    <ul className="mt-6 space-y-5">
                      {strategicObservations.map((observation) => (
                        <li
                          className="flex gap-3 text-sm leading-7 text-datx-mist"
                          key={observation}
                        >
                          <span className="mt-3 h-px w-5 shrink-0 bg-datx-gold" />
                          {observation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section className="mt-10 border border-datx-line bg-datx-navy p-6 sm:p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-datx-gold">
                    Important Notice
                  </p>
                  <p className="mt-5 text-sm leading-7 text-datx-mist">
                    This public report previews the DATX approach to treasury
                    suitability, governance posture, strategic allocation design,
                    and balance sheet flexibility while reserving full diligence
                    and implementation planning for formal assessment
                    engagements.
                  </p>
                </section>
              </div>

              <div className="border-t border-datx-line px-6 py-7 sm:px-10 lg:px-12">
                <div className="mb-7 h-px w-full bg-datx-gold" />
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-7 text-slate-400">
                    DATX | Built for public company analysis
                  </p>
                  <a
                    className="button-primary bg-datx-gold text-datx-black hover:bg-[#e0c47a]"
                    href="mailto:datx.strategy@gmail.com?subject=DATX%20Treasury%20Assessment"
                  >
                    Request DATX Treasury Assessment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
