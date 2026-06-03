import {
  CapabilitySection,
  PhilosophySection,
  PositioningSection,
  ReportsSection,
  ScoringSection,
  VisionSection,
  WorkflowSection,
} from "@/components/datx-content";
import { ArrowIcon } from "@/components/icons";
import { SampleAssessmentModal } from "@/components/sample-assessment-modal";
import { SiteHeader } from "@/components/site-header";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-datx-line bg-datx-black">
      <div className="absolute inset-0 bg-[linear-gradient(105deg,#060a10_15%,#09131f_58%,#0b1624_100%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-[46%] border-l border-datx-line/60 lg:block">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0,rgba(83,125,168,0.03)_1px,transparent_1px),linear-gradient(to_bottom,transparent_0,rgba(83,125,168,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute bottom-24 left-12 right-12 border border-datx-line bg-datx-panel/55 p-8">
          <p className="eyebrow">Institutional Framework</p>
          <div className="mt-10 space-y-6">
            {[
              "Treasury suitability",
              "Governance readiness",
              "Capital strategy analysis",
            ].map((item, index) => (
              <div className="flex items-center gap-5" key={item}>
                <span className="text-xs tabular-nums text-datx-blue">
                  0{index + 1}
                </span>
                <div className="h-px flex-1 bg-datx-line" />
                <p className="w-44 text-sm text-datx-mist">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-frame relative flex min-h-[760px] items-center pb-20 pt-36 lg:min-h-screen">
        <div className="max-w-3xl lg:max-w-[52%]">
          <p className="eyebrow">Treasury Strategy Intelligence</p>
          <h1 className="sr-only">DATX</h1>
          <Image
            alt=""
            aria-hidden="true"
            className="mt-8 h-auto w-[15.5rem] sm:w-[19.5rem] lg:w-[21rem]"
            height={94}
            priority
            src="/brand/datx-logo-white.png"
            width={343}
          />
          <p className="mt-9 text-xl font-light tracking-wide text-slate-200 sm:text-2xl">
            Digital Assets Treasury Platform
          </p>
          <p className="mt-8 max-w-2xl text-base leading-8 text-datx-mist sm:text-lg">
            DATX is a digital asset treasury strategy platform focused on
            helping public companies evaluate, design, and implement
            institutional-grade digital asset treasury frameworks through
            vetted execution partners.
          </p>
          <div className="mt-11 flex flex-col gap-4 sm:flex-row">
            <SampleAssessmentModal />
            <a className="button-secondary gap-2" href="#reports">
              Preview Details
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a className="button-secondary" href="#assessment">
              Request Assessment
            </a>
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
            Built for public company analysis
          </p>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-slate-400 lg:text-right">
          DATX provides treasury strategy analysis and institutional-style
          research only. Nothing on this website constitutes investment, legal,
          tax, or financial advice.
        </p>
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
        <VisionSection />
        <ScoringSection />
        <PhilosophySection />
        <ReportsSection />
        <PositioningSection />
        <WorkflowSection />
        <AssessmentSection />
      </main>
      <SiteFooter />
    </>
  );
}
