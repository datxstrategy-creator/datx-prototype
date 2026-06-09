import {
  CapabilitySection,
  PhilosophySection,
  ReportsSection,
  ScoringSection,
  StrategicNetworkSection,
  VisionSection,
  WorkflowSection,
} from "@/components/datx-content";
import { SampleAssessmentModal } from "@/components/sample-assessment-modal";
import { SiteHeader } from "@/components/site-header";

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-datx-line bg-datx-black">
      <div className="absolute inset-0 bg-[linear-gradient(105deg,#060a10_15%,#09131f_58%,#0b1624_100%)]" />
      <div className="container-frame relative flex min-h-[520px] items-center pb-14 pt-28 sm:min-h-[560px] lg:min-h-[620px]">
        <div className="w-full max-w-5xl">
          <h1 className="max-w-4xl text-4xl font-light tracking-tight text-white sm:text-6xl lg:text-7xl">
            Digital asset treasury assessments for public companies
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
            DATX helps boards and management teams evaluate whether a digital
            asset treasury strategy is suitable, defensible, and executable
            before capital is put at risk.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-datx-mist sm:text-lg">
            We assess treasury readiness, governance risk, allocation scenarios,
            and investor positioning.
          </p>
          <div className="mt-11 flex flex-col gap-4 sm:flex-row">
            <a className="button-primary" href="#assessment">
              Request Treasury Assessment
            </a>
            <SampleAssessmentModal className="button-secondary gap-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AssessmentSection() {
  return (
    <section className="section-space" id="assessment">
      <div className="container-frame">
        <div className="relative overflow-hidden border border-datx-line bg-datx-navy px-7 py-14 sm:px-14 sm:py-16 lg:px-20">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-datx-line bg-[linear-gradient(135deg,transparent,rgba(83,125,168,0.07))] lg:block" />
          <div className="relative max-w-3xl">
            <p className="eyebrow">Engage DATX</p>
            <h2 className="mt-5 text-3xl font-light text-white sm:text-4xl">
              Request a DATX Treasury Assessment
            </h2>
            <p className="body-copy mt-6">
              Evaluate whether your company may be suitable for a structured
              digital asset treasury strategy.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                className="button-primary"
                href="mailto:datx.strategy@gmail.com?subject=DATX%20Treasury%20Assessment"
              >
                Request Treasury Assessment
              </a>
            </div>
            <p className="mt-6 text-sm leading-6 text-slate-400">
              Direct contact:{" "}
              <a
                className="text-datx-accent transition-colors hover:text-white"
                href="mailto:datx.strategy@gmail.com"
              >
                datx.strategy@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-datx-line">
      <div className="container-frame flex flex-col gap-9 py-10 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-[0.25em] text-white">
            DATX
          </p>
          <p className="mt-4 text-sm text-datx-mist">
            © 2026 DATX. All rights reserved.
          </p>
          <p className="mt-4 text-sm text-datx-mist">
            Built for public company treasury analysis.
          </p>
        </div>
        <div className="flex max-w-2xl flex-col items-start gap-5 lg:items-end lg:text-right">
          <p className="text-sm leading-7 text-slate-400">
            DATX provides treasury strategy analysis and institutional-style
            research only. Nothing on this website constitutes investment,
            legal, tax, or financial advice.
          </p>
          <a
            className="inline-flex items-center gap-2 border-b border-datx-blue/40 pb-1 text-sm font-medium text-datx-accent transition-colors duration-200 hover:border-datx-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-datx-accent"
            href="https://x.com/DATX_strategy"
            rel="noopener noreferrer"
            target="_blank"
          >
            𝕏 Follow DATX on X
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <CapabilitySection />
        <StrategicNetworkSection />
        <VisionSection />
        <ScoringSection />
        <PhilosophySection />
        <ReportsSection />
        <WorkflowSection />
        <AssessmentSection />
      </main>
      <SiteFooter />
    </>
  );
}
