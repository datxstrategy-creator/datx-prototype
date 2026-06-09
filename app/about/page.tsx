import { CopyEmailButton } from "@/components/copy-email-button";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DATX",
  description:
    "About DATX, an independent treasury intelligence platform for public company digital asset treasury strategy evaluation.",
};

const datxProvides = [
  "Treasury readiness assessment",
  "Governance and risk review",
  "Allocation strategy analysis",
  "Investor positioning analysis",
  "Implementation partner coordination",
];

const datxDoesNotProvide = [
  "Brokerage services",
  "Custody services",
  "Legal advice",
  "Accounting advice",
  "Asset management",
  "Trading execution",
];

const datxCapabilities = [
  "Treasury readiness assessment",
  "Governance review",
  "Allocation strategy analysis",
  "Risk and investor positioning analysis",
  "Strategic treasury intelligence",
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
        <div className="relative flex min-h-[390px] items-end pb-14 pt-32 sm:min-h-[440px] sm:pb-16">
          <div className="max-w-3xl">
            <p className="eyebrow">About DATX</p>
            <h1 className="mt-6 text-4xl font-light tracking-tight text-white sm:text-6xl">
              About DATX
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-light leading-9 text-slate-200 sm:text-2xl">
              Independent treasury intelligence for public companies evaluating
              digital asset treasury strategies.
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
      <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
        About DATX
      </h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-5">
          <p className="body-copy">
            DATX is an independent treasury intelligence platform that helps
            public companies evaluate digital asset treasury strategies with
            institutional discipline.
          </p>
          <p className="body-copy">
            DATX supports boards and management teams as they assess whether a
            digital asset allocation is suitable, defensible, and executable
            before capital, reputation, or shareholder trust is placed at risk.
          </p>
          <p className="body-copy">
            The platform focuses on treasury readiness, governance requirements,
            allocation strategy, risk profile, and investor positioning so
            leadership teams can make a structured capital allocation decision.
          </p>
        </div>
        <div className="border-l border-datx-blue bg-datx-navy/60 px-6 py-5">
          <p className="text-sm uppercase tracking-[0.18em] text-datx-accent">
            Core Evaluation Question
          </p>
          <p className="mt-4 text-lg font-light leading-8 text-white">
            Is a digital asset treasury strategy suitable for this company?
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function WhatDatxDoesSection() {
  return (
    <SectionCard id="what-datx-does">
      <CardHeading label="What DATX Does" title="What DATX Does" />
      <div className="mt-8 space-y-5">
        <p className="body-copy">
          DATX produces company-specific treasury intelligence for public
          issuers considering whether, how, and under what constraints a digital
          asset treasury strategy could be evaluated.
        </p>
        <p className="body-copy">
          Assessments are designed to clarify strategic rationale, governance
          readiness, capital allocation parameters, downside risk, and investor
          communication requirements before implementation decisions are made.
        </p>
      </div>
      <ListedItems items={datxCapabilities} />
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
          and long-term strategic thinking.
        </p>
      </div>
    </SectionCard>
  );
}

function ContactSection() {
  return (
    <SectionCard id="contact">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">
          Contact DATX
        </h2>
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

function RoleScopeSection() {
  return (
    <SectionCard id="role-operating-scope">
      <CardHeading
        label="DATX Role & Operating Scope"
        title="Independent analysis with clearly defined boundaries"
      />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <p className="body-copy">
          DATX is an independent treasury intelligence platform focused on
          helping public companies evaluate whether digital asset treasury
          strategies are appropriate, defensible, and executable before risking
          capital, reputation, or shareholder trust.
        </p>
        <p className="body-copy">
          DATX provides research, assessment, governance analysis, and strategic
          treasury intelligence. DATX does not provide brokerage, custody,
          legal, accounting, or investment management services.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="border border-datx-line bg-datx-navy/40 p-6">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-datx-accent">
            What DATX Provides
          </h3>
          <ListedItems items={datxProvides} />
        </div>
        <div className="border border-datx-line bg-datx-navy/40 p-6">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
            DATX Does Not Provide
          </h3>
          <ListedItems items={datxDoesNotProvide} />
        </div>
      </div>

      <div className="mt-10 border-l border-datx-blue pl-6">
        <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-white">
          Implementation Support
        </h3>
        <p className="body-copy mt-5">
          Where implementation support is required, DATX may facilitate
          introductions to vetted execution, custody, legal, accounting, and
          strategic advisory partners. Final implementation decisions remain the
          responsibility of the client.
        </p>
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

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <AboutHero />
        <div className="border-b border-datx-line py-5 sm:py-7">
          <PageShell>
            <AboutDatxSection />
            <WhatDatxDoesSection />
            <MissionSection />
            <RoleScopeSection />
            <ContactSection />
          </PageShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
