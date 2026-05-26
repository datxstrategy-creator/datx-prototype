import { ArrowIcon, DocumentIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";

const capabilities = [
  {
    title: "Treasury Readiness Analysis",
    description:
      "Evaluate whether a public company may be suitable for a digital asset treasury strategy.",
  },
  {
    title: "Balance Sheet Assessment",
    description:
      "Assess liquidity, treasury flexibility, governance readiness, and strategic positioning.",
  },
  {
    title: "Allocation Framework Modeling",
    description:
      "Develop structured treasury allocation scenarios using governance-aware frameworks.",
  },
  {
    title: "Strategic Positioning",
    description:
      "Evaluate how treasury strategies may affect investor positioning and market narrative.",
  },
];

const objectives = [
  "Optimize capital allocation",
  "Strengthen strategic market positioning",
  "Diversify treasury reserves",
  "Broaden engagement with digital asset and technology-focused investor audiences",
];

const scoreCategories = [
  "Balance Sheet Flexibility",
  "Narrative Strength",
  "Strategic Alignment",
  "Investor Appeal Potential",
  "Governance & Execution Readiness",
  "Capital Strategy Feasibility",
];

const scoreRanges = [
  { range: "8.0-10.0", interpretation: "Strong strategic fit" },
  {
    range: "6.0-7.9",
    interpretation: "Moderate fit with execution considerations",
  },
  {
    range: "4.0-5.9",
    interpretation: "Limited fit or elevated strategic risk",
  },
  {
    range: "Below 4.0",
    interpretation: "Poor candidate for a digital asset treasury strategy",
  },
];

const principles = [
  "Conservative treasury construction",
  "Governance-aware implementation",
  "Phased capital deployment",
  "Strategic reserve diversification",
  "Liquidity preservation",
  "Long-term strategic flexibility",
];

const reports = [
  {
    number: "DATX Report #001",
    company: "Norwood Systems Ltd",
    ticker: "ASX:NOR",
    href: "/reports/datx-report-001-norwood-systems.pdf",
    focus: "Treasury suitability and strategic positioning assessment",
  },
  {
    number: "DATX Report #002",
    company: "Ai-Media Technologies",
    ticker: "ASX:AIM",
    href: "/reports/datx-report-002-ai-media-technologies.pdf",
    focus: "Capital flexibility and governance readiness analysis",
  },
];

const exclusions = [
  "Broker",
  "Custodian",
  "Legal advisor",
  "Asset manager",
  "Trading platform",
];

const deliverables = [
  "Treasury strategy analysis",
  "Qualification assessment",
  "Allocation modeling",
  "Strategic risk and narrative evaluation",
  "Institutional-grade treasury research",
];

const phases = [
  {
    name: "Initial DATX Assessment",
    items: [
      "Treasury suitability screening",
      "Preliminary DATX score",
      "Strategic observations",
    ],
  },
  {
    name: "Premium Treasury Readiness Report",
    items: [
      "Treasury framework analysis",
      "Governance review",
      "Allocation modeling",
      "Risk assessment",
    ],
  },
  {
    name: "Strategic Advisory & Implementation",
    items: [
      "Governance structuring",
      "Custody coordination",
      "Capital strategy",
      "Treasury implementation support via vetted execution partners",
    ],
  },
];

function ListedItems({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 space-y-4">
      {items.map((item) => (
        <li className="flex gap-3 text-sm leading-6 text-datx-mist" key={item}>
          <span className="mt-2 h-px w-4 shrink-0 bg-datx-blue" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CapabilitySection() {
  return (
    <section className="section-space border-b border-datx-line" id="capabilities">
      <div className="container-frame">
        <SectionHeading
          description="DATX combines balance sheet review, capital strategy analysis, and governance considerations into an informed institutional assessment."
          label="What DATX Does"
          title="Structured analysis for treasury decision-makers"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((capability, index) => (
            <article
              className="surface min-h-60 p-7 transition-colors duration-200 hover:border-[#29425c]"
              key={capability.title}
            >
              <p className="text-xs font-medium tracking-[0.18em] text-datx-blue">
                0{index + 1}
              </p>
              <h3 className="mt-9 text-lg font-medium leading-7 text-white">
                {capability.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-datx-mist">
                {capability.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function VisionSection() {
  return (
    <section className="section-space border-b border-datx-line" id="vision">
      <div className="container-frame grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeading
            label="Core Vision"
            title="Treasury intelligence designed for public companies"
          />
          <p className="body-copy mt-7">
            DATX provides structured treasury analysis designed to evaluate and
            support the development of digital asset treasury strategies for
            public companies.
          </p>
          <p className="body-copy mt-5">
            The objective is not speculative asset promotion, but the
            development of disciplined, governance-aware treasury frameworks
            tailored to each company&apos;s financial profile, strategic
            positioning, and long-term objectives.
          </p>
        </div>
        <div className="surface p-8 sm:p-10">
          <p className="eyebrow">Platform Objectives</p>
          <ListedItems items={objectives} />
        </div>
      </div>
    </section>
  );
}

export function ScoringSection() {
  return (
    <section className="section-space border-b border-datx-line" id="framework">
      <div className="container-frame">
        <SectionHeading
          description="A consistent analytical framework supports initial qualification and identifies areas requiring deeper review before implementation is considered."
          label="DATX Candidate Scoring Framework"
          title="A disciplined view of strategic suitability"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface overflow-hidden">
            <div className="border-b border-datx-line px-7 py-5">
              <p className="text-sm font-medium text-slate-200">
                Assessment categories
              </p>
            </div>
            <div className="grid sm:grid-cols-2">
              {scoreCategories.map((category, index) => (
                <div
                  className="flex min-h-24 items-center gap-5 border-b border-datx-line px-7 py-5 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0 sm:[&:nth-child(odd)]:border-r"
                  key={category}
                >
                  <span className="text-xs tracking-widest text-datx-blue">
                    0{index + 1}
                  </span>
                  <span className="text-sm leading-6 text-slate-200">
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="surface p-7 sm:p-8">
            <p className="eyebrow">Score Interpretation</p>
            <div className="mt-7 space-y-1">
              {scoreRanges.map((score) => (
                <div
                  className="grid gap-2 border-b border-datx-line py-5 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[7.5rem_1fr]"
                  key={score.range}
                >
                  <p className="text-lg font-light tabular-nums text-white">
                    {score.range}
                  </p>
                  <p className="text-sm leading-6 text-datx-mist">
                    {score.interpretation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PhilosophySection() {
  return (
    <section className="section-space border-b border-datx-line" id="philosophy">
      <div className="container-frame grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-20">
        <SectionHeading
          description="Digital asset treasury consideration requires mandate clarity, measured exposure, oversight controls, and preservation of corporate optionality."
          label="Treasury Philosophy"
          title="Disciplined construction before deployment"
        />
        <div className="grid gap-px overflow-hidden border border-datx-line bg-datx-line sm:grid-cols-2">
          {principles.map((principle) => (
            <div className="bg-datx-panel px-6 py-7" key={principle}>
              <span className="mb-5 block h-px w-8 bg-datx-blue" />
              <p className="text-sm leading-6 text-slate-200">{principle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReportsSection() {
  return (
    <section className="section-space border-b border-datx-line" id="reports">
      <div className="container-frame">
        <SectionHeading
          description="Illustrative reporting formats demonstrating how DATX structures treasury readiness analysis for listed-company contexts."
          label="Sample Reports"
          title="Premium Treasury Readiness Reports"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {reports.map((report) => (
            <article className="surface group p-7 sm:p-9" key={report.number}>
              <div className="flex items-start justify-between gap-5 border-b border-datx-line pb-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-datx-accent">
                    Premium Treasury Readiness Report
                  </p>
                  <p className="mt-6 text-sm text-datx-mist">{report.number}</p>
                  <h3 className="mt-3 text-2xl font-light text-white">
                    {report.company}
                  </h3>
                  <p className="mt-2 text-sm font-medium tracking-wide text-datx-accent">
                    {report.ticker}
                  </p>
                </div>
                <DocumentIcon className="h-10 w-10 shrink-0 text-datx-blue" />
              </div>
              <p className="mt-7 text-sm leading-7 text-datx-mist">
                {report.focus}
              </p>
              <a
                className="button-secondary mt-8 w-full gap-2 sm:w-auto"
                download
                href={report.href}
              >
                Download PDF
                <ArrowIcon className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PositioningSection() {
  return (
    <section className="section-space border-b border-datx-line" id="positioning">
      <div className="container-frame">
        <SectionHeading
          description="Clear boundaries support responsible corporate decision-making and establish the role DATX is designed to perform."
          label="Operating Scope & Strategic Positioning"
          title="Research and strategy analysis, with defined limits"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="surface p-8 sm:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
              DATX does not operate as
            </p>
            <ListedItems items={exclusions} />
          </div>
          <div className="surface border-datx-blue/50 p-8 sm:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-datx-accent">
              DATX provides
            </p>
            <ListedItems items={deliverables} />
          </div>
        </div>
        <p className="mt-8 border-l border-datx-blue pl-6 text-sm leading-7 text-datx-mist">
          Where appropriate, implementation support may be coordinated through
          vetted execution partners, subject to the company&apos;s own
          governance, diligence, and approval processes.
        </p>
      </div>
    </section>
  );
}

export function WorkflowSection() {
  return (
    <section className="section-space border-b border-datx-line" id="workflow">
      <div className="container-frame">
        <SectionHeading
          centered
          label="Advisory Workflow"
          title="A staged path from assessment to implementation"
        />
        <div className="relative mt-14 grid gap-5 lg:grid-cols-3">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-datx-line lg:block" />
          {phases.map((phase, index) => (
            <article className="surface relative p-7 sm:p-8" key={phase.name}>
              <div className="relative mb-8 inline-flex h-16 w-16 flex-col items-center justify-center border border-datx-line bg-datx-navy">
                <span className="text-[10px] uppercase tracking-widest text-datx-blue">
                  Phase
                </span>
                <span className="mt-1 text-lg font-light text-white">
                  0{index + 1}
                </span>
              </div>
              <h3 className="min-h-14 text-lg font-medium leading-7 text-white">
                {phase.name}
              </h3>
              <ListedItems items={phase.items} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
