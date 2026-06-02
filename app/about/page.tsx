import { CopyEmailButton } from "@/components/copy-email-button";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DATX",
  description:
    "About DATX, founder Christopher Nakayama, DATX mission, and contact details.",
};

const focusAreas = [
  "Treasury risk management",
  "Capital allocation discipline",
  "Governance readiness",
  "Strategic alignment",
  "Long-term shareholder value creation",
];

const founderEmphasis = [
  "Digital asset valuation",
  "Treasury strategy",
  "Token economics",
  "Blockchain infrastructure",
  "Public market adoption of digital assets",
];

const founderStats = [
  { value: "2017", label: "Entered Digital Assets" },
  { value: "9+", label: "Years Market Experience" },
  { value: "2", label: "Independent Research Platforms" },
];

const experienceHighlights = [
  "Since 2017 in Digital Assets",
  "Founder of JPMI",
  "Tokyo, Japan",
];

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-6 lg:px-10">{children}</div>;
}

function SectionCard({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <section className="py-5 sm:py-6" id={id}>
      <article className="surface overflow-hidden p-7 sm:p-10 lg:p-12">
        {children}
      </article>
    </section>
  );
}

function CardHeading({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function ListedItems({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          className="border border-datx-line bg-datx-navy/70 px-5 py-4 text-sm leading-6 text-slate-200"
          key={item}
        >
          <span className="mb-3 block h-px w-7 bg-datx-blue" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-datx-line bg-datx-black">
      <div className="absolute inset-0 bg-[linear-gradient(105deg,#060a10_15%,#09131f_62%,#0b1624_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0,rgba(83,125,168,0.025)_1px,transparent_1px),linear-gradient(to_bottom,transparent_0,rgba(83,125,168,0.04)_1px,transparent_1px)] bg-[size:88px_88px]" />
      <PageShell>
        <div className="relative flex min-h-[420px] items-end pb-14 pt-32 sm:min-h-[470px] sm:pb-16">
          <div className="max-w-3xl">
            <p className="eyebrow">About DATX</p>
            <h1 className="mt-6 text-4xl font-light tracking-tight text-white sm:text-6xl">
              About DATX
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-light leading-9 text-slate-200 sm:text-2xl">
              A Structured Approach to Digital Asset Treasury Strategy
            </p>
          </div>
        </div>
      </PageShell>
    </section>
  );
}

function AboutDatxSection() {
  return (
    <SectionCard id="about-datx">
      <CardHeading
        label="About DATX"
        title="A Structured Approach to Digital Asset Treasury Strategy"
      />
      <div className="mt-8 space-y-5">
        <p className="body-copy">
          DATX (Digital Asset Treasury Analysis) was created to help public
          companies evaluate whether a digital asset treasury strategy aligns
          with their financial position, governance framework, and long-term
          objectives.
        </p>
        <p className="body-copy">
          As digital assets become increasingly integrated into corporate
          finance, boards and management teams face a growing challenge:
        </p>
        <p className="border-l border-datx-blue bg-datx-navy/60 px-6 py-5 text-lg font-light leading-8 text-white">
          How can treasury innovation be evaluated objectively, responsibly, and
          strategically?
        </p>
        <p className="body-copy">
          DATX was developed to provide a structured framework for assessing
          treasury readiness, identifying implementation risks, and exploring
          potential digital asset allocation strategies through a
          governance-first lens.
        </p>
        <p className="body-copy">
          Rather than promoting speculation, DATX focuses on:
        </p>
      </div>
      <ListedItems items={focusAreas} />
      <p className="body-copy mt-8">
        Each assessment is designed to provide management teams and investors
        with a clear, repeatable evaluation process supported by publicly
        available information and transparent methodology.
      </p>
    </SectionCard>
  );
}

function FounderSection() {
  return (
    <SectionCard id="founder">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-datx-blue/60 bg-datx-navy text-lg font-medium tracking-[0.18em] text-white">
            CN
          </div>
          <div>
            <p className="eyebrow">Founder</p>
            <h2 className="mt-3 text-3xl font-light tracking-tight text-white sm:text-4xl">
              Christopher Nakayama
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {founderStats.map((stat) => (
          <div
            className="border border-datx-line bg-datx-navy/70 px-5 py-5"
            key={stat.label}
          >
            <p className="text-3xl font-light tabular-nums text-white">
              {stat.value}
            </p>
            <p className="mt-2 text-xs uppercase leading-5 tracking-[0.16em] text-datx-accent">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {experienceHighlights.map((highlight) => (
          <div
            className="border border-datx-line/80 bg-[#0a1522]/70 px-4 py-3 text-sm text-slate-200"
            key={highlight}
          >
            {highlight}
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-5">
        <p className="body-copy">
          Christopher Nakayama is a Tokyo-based digital asset analyst,
          researcher, and entrepreneur with nearly a decade of experience
          studying cryptocurrency markets, blockchain networks, and emerging
          digital asset ecosystems.
        </p>
        <p className="body-copy">
          Since entering the digital asset industry in 2017, Christopher has
          focused on identifying long-term technological and economic trends
          across the sector, with particular emphasis on:
        </p>
      </div>
      <ListedItems items={founderEmphasis} />
      <div className="mt-8 space-y-5">
        <p className="body-copy">
          His research spans multiple market cycles and includes early analysis
          of emerging digital asset networks before broader institutional
          recognition.
        </p>
        <p className="body-copy">
          Christopher is also the founder of Japan Physical Metals Index (JPMI),
          an independent market research initiative that tracks physical
          precious metals pricing and market inefficiencies within Japan.
        </p>
        <p className="body-copy">
          Through DATX, Christopher aims to bridge the gap between traditional
          corporate finance and the rapidly evolving digital asset economy by
          providing companies with practical, disciplined, and governance-focused
          treasury analysis.
        </p>
      </div>
    </SectionCard>
  );
}

function MissionSection() {
  return (
    <SectionCard id="mission">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">DATX Mission</p>
        <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">
          Our mission is simple:
        </h2>
        <p className="mt-8 border-y border-datx-line px-3 py-8 text-2xl font-light leading-10 text-white sm:text-3xl sm:leading-[3rem]">
          Help public companies evaluate digital asset treasury strategies with
          the same rigor applied to any major capital allocation decision.
        </p>
        <p className="body-copy mx-auto mt-7 max-w-2xl">
          We believe treasury innovation should be driven by data, governance,
          and long-term strategic thinking—not hype.
        </p>
      </div>
    </SectionCard>
  );
}

function ContactSection() {
  return (
    <SectionCard id="contact">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Contact</p>
        <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">
          DATX Strategy
        </h2>
        <p className="mt-5 text-sm leading-7 text-datx-mist">Tokyo, Japan</p>
        <div className="mt-8 border border-datx-line bg-datx-navy/70 p-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <a
            className="block break-all text-left text-sm leading-6 text-datx-accent transition-colors hover:text-white"
            href="mailto:datx.strategy@gmail.com"
          >
            datx.strategy@gmail.com
          </a>
          <div className="mt-4 sm:mt-0">
            <CopyEmailButton email="datx.strategy@gmail.com" />
          </div>
        </div>
      </div>
    </SectionCard>
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

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <AboutHero />
        <div className="border-b border-datx-line py-5 sm:py-7">
          <PageShell>
            <AboutDatxSection />
            <FounderSection />
            <MissionSection />
            <ContactSection />
          </PageShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
