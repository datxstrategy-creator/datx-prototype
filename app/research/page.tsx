import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DATX Research | Digital Asset Treasury Strategy",
  description:
    "Independent research on digital asset treasury strategy, corporate treasury allocation, governance, and public company digital asset adoption.",
};

const articleThemes = [
  "Treasury mandate and liquidity profile",
  "Board oversight and delegated authority",
  "Capital allocation capacity and constraints",
  "Custody, controls, reporting, and audit readiness",
  "Investor narrative and disclosure discipline",
];

const comingSoonArticles = [
  {
    title: "Metaplanet Case Study: From Operating Company to Bitcoin Treasury Pioneer",
    description:
      "A forthcoming review of how a listed operating company repositioned around a digital asset treasury model.",
  },
  {
    title: "DigitalX Case Study: Australia’s Public Market Bitcoin Treasury Strategy",
    description:
      "A forthcoming case study on public market positioning, governance, and treasury strategy in Australia.",
  },
];

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">{children}</div>;
}

function ResearchHero() {
  return (
    <section className="relative overflow-hidden border-b border-datx-line bg-datx-black">
      <div className="absolute inset-0 bg-[linear-gradient(105deg,#060a10_15%,#09131f_62%,#0b1624_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0,rgba(83,125,168,0.025)_1px,transparent_1px),linear-gradient(to_bottom,transparent_0,rgba(83,125,168,0.04)_1px,transparent_1px)] bg-[size:88px_88px]" />
      <PageShell>
        <div className="relative flex min-h-[430px] items-end pb-14 pt-32 sm:min-h-[480px] sm:pb-16">
          <div className="max-w-4xl">
            <p className="eyebrow">DATX Research</p>
            <h1 className="mt-6 text-4xl font-light tracking-tight text-white sm:text-6xl">
              DATX Research
            </h1>
            <p className="mt-6 max-w-3xl text-xl font-light leading-9 text-slate-200 sm:text-2xl">
              Independent analysis on digital asset treasury strategy, public
              company capital allocation, governance, and emerging treasury
              models.
            </p>
          </div>
        </div>
      </PageShell>
    </section>
  );
}

function FeaturedArticleSection() {
  return (
    <section className="section-space border-b border-datx-line" id="featured">
      <PageShell>
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
          <div>
            <p className="eyebrow">Featured Article</p>
            <h2 className="mt-5 text-3xl font-light tracking-tight text-white sm:text-4xl">
              What Is a Digital Asset Treasury Strategy?
            </h2>
            <p className="body-copy mt-6">
              A practical framework for boards, CFOs, investors, and public
              company management teams evaluating digital assets as part of
              corporate treasury policy.
            </p>
            <div className="mt-8 border-l border-datx-blue bg-datx-navy/60 px-6 py-5">
              <p className="text-sm uppercase tracking-[0.18em] text-datx-accent">
                Analytical Focus
              </p>
              <ul className="mt-5 space-y-3">
                {articleThemes.map((theme) => (
                  <li className="flex gap-3 text-sm leading-6 text-slate-200" key={theme}>
                    <span className="mt-2 h-px w-4 shrink-0 bg-datx-blue" />
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <article className="surface p-7 sm:p-10 lg:p-12">
            <div className="border-b border-datx-line pb-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-datx-blue">
                Original DATX Article
              </p>
              <h3 className="mt-4 text-3xl font-light leading-tight text-white sm:text-4xl">
                What Is a Digital Asset Treasury Strategy?
              </h3>
            </div>

            <div className="mt-9 space-y-10">
              <ArticleSection title="Definition">
                <p>
                  A digital asset treasury strategy is a formal corporate
                  framework for evaluating, acquiring, holding, governing, and
                  reporting digital assets on a company balance sheet. It is not
                  simply an asset purchase. It is a treasury policy decision
                  that should connect capital allocation, liquidity management,
                  governance, controls, disclosure, custody, accounting, and
                  investor communication.
                </p>
                <p>
                  For a public company, the strategy must be understood as part
                  of the broader treasury mandate. It should clarify why digital
                  assets are being considered, what role they may serve, how
                  exposure will be limited or expanded, which risks are
                  acceptable, and how management will remain accountable to the
                  board and shareholders.
                </p>
              </ArticleSection>

              <ArticleSection title="Why Public Companies Are Evaluating Digital Assets">
                <p>
                  Public companies are evaluating digital assets because
                  treasury strategy is no longer limited to cash preservation
                  alone. Inflation exposure, low real returns on idle capital,
                  changing investor expectations, and the maturation of digital
                  asset market infrastructure have widened the capital
                  allocation discussion.
                </p>
                <p>
                  For some issuers, digital assets may be assessed as strategic
                  reserve assets. For others, they may support market
                  positioning, investor engagement, or alignment with technology
                  and financial innovation themes. The rationale varies by
                  company, and the strongest cases begin with a clear link
                  between the treasury decision and the issuer&apos;s financial
                  profile, operating model, and shareholder base.
                </p>
              </ArticleSection>

              <ArticleSection title="Treasury Readiness">
                <p>
                  Treasury readiness starts with balance sheet capacity. A
                  company should understand its working capital needs, cash burn
                  profile, debt obligations, covenant limitations, liquidity
                  runway, and access to capital before considering any strategic
                  reserve allocation.
                </p>
                <p>
                  Readiness also includes operational preparedness. Management
                  teams need defined custody workflows, transaction approval
                  processes, valuation methods, reporting cadence, accounting
                  review, insurance considerations, and continuity planning. A
                  digital asset treasury strategy that cannot be administered
                  reliably is not ready for public company execution.
                </p>
              </ArticleSection>

              <ArticleSection title="Governance Requirements">
                <p>
                  Governance is the central requirement. Boards should establish
                  the purpose of the strategy, approve risk parameters, define
                  delegated authority, and determine how frequently management
                  will report on exposure, performance, controls, and market
                  developments.
                </p>
                <p>
                  Effective governance should address allocation limits,
                  eligible assets, custody arrangements, counterparty exposure,
                  execution procedures, conflicts of interest, disclosure
                  controls, and escalation triggers. The objective is not to
                  slow decision-making; it is to make sure decisions can be
                  defended under scrutiny.
                </p>
              </ArticleSection>

              <ArticleSection title="Capital Allocation Considerations">
                <p>
                  Capital allocation analysis should compare digital asset
                  exposure with other possible uses of corporate capital,
                  including operating investment, debt reduction, dividends,
                  buybacks, acquisitions, and cash reserves. The question is not
                  whether digital assets are interesting. The question is
                  whether they fit the company&apos;s capital priorities and risk
                  capacity.
                </p>
                <p>
                  A disciplined strategy defines allocation size, funding
                  source, deployment pace, rebalancing approach, liquidity
                  buffers, and conditions for review. It also separates
                  strategic reserve decisions from short-term market timing.
                  That distinction is important for boards and investors
                  evaluating the durability of the policy.
                </p>
              </ArticleSection>

              <ArticleSection title="Risk Management">
                <p>
                  Digital asset treasury risk includes price volatility,
                  liquidity risk, custody failure, cybersecurity exposure,
                  counterparty risk, regulatory uncertainty, tax and accounting
                  complexity, impairment or valuation treatment, and reputation
                  risk. These risks do not make a strategy impossible, but they
                  do require explicit treatment.
                </p>
                <p>
                  Risk management should define what can go wrong, who monitors
                  each risk, what data is reviewed, which thresholds trigger
                  action, and how the company communicates during periods of
                  market stress. Public companies should expect investors,
                  auditors, regulators, and counterparties to examine the
                  control environment around any material treasury position.
                </p>
              </ArticleSection>

              <ArticleSection title="Investor Positioning">
                <p>
                  A digital asset treasury strategy can affect how investors
                  interpret a company. It may broaden relevance with digital
                  asset and technology-oriented investors, but it may also
                  create questions about volatility, strategic focus, and
                  governance discipline.
                </p>
                <p>
                  Investor positioning should therefore be intentional.
                  Management should be able to explain the treasury objective,
                  allocation framework, control structure, and relationship to
                  the operating business. A clear narrative helps the market
                  understand the strategy as a capital allocation framework
                  rather than a promotional event.
                </p>
              </ArticleSection>

              <ArticleSection title="Why Strategy Must Be Company-Specific">
                <p>
                  No single digital asset treasury model applies to every
                  issuer. A cash-rich operating company, a capital-light
                  technology business, a resource issuer, a holding company, and
                  a turnaround situation all face different constraints. Market
                  capitalization, liquidity, shareholder composition, regulatory
                  environment, capital access, and management credibility all
                  matter.
                </p>
                <p>
                  The same allocation that appears manageable for one company
                  may be inappropriate for another. Strategy must be built from
                  the company outward: first the mandate, then the balance
                  sheet, then governance, then sizing, then communication.
                </p>
              </ArticleSection>

              <ArticleSection title="DATX Perspective">
                <p>
                  DATX views digital asset treasury strategy as an institutional
                  capital allocation discipline. The most credible strategies
                  are not driven by hype, asset promotion, or imitation. They
                  are built through structured analysis of readiness,
                  governance, financial capacity, strategic rationale, and
                  investor positioning.
                </p>
                <p>
                  In the DATX framework, the core question is simple: is this
                  strategy suitable, defensible, and executable for this
                  specific public company? When that question is answered with
                  evidence, boards and management teams can evaluate digital
                  asset treasury policy with the same rigor applied to any major
                  capital allocation decision.
                </p>
              </ArticleSection>
            </div>
          </article>
        </div>
      </PageShell>
    </section>
  );
}

function ArticleSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section>
      <h4 className="text-xl font-light text-white">{title}</h4>
      <div className="mt-4 space-y-4 text-base leading-8 text-datx-mist">
        {children}
      </div>
    </section>
  );
}

function ArticleCardsSection() {
  return (
    <section className="section-space" id="articles">
      <PageShell>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Article Cards</p>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">
              Research Library
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            DATX Research will expand with company case studies and governance
            analysis for public market treasury models.
          </p>
        </div>

        <div className="mt-11 grid gap-5 lg:grid-cols-3">
          <article className="surface border-datx-blue/40 p-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-datx-blue">
              Featured
            </p>
            <h3 className="mt-8 text-xl font-light leading-8 text-white">
              What Is a Digital Asset Treasury Strategy?
            </h3>
            <p className="mt-5 text-sm leading-7 text-datx-mist">
              A foundational DATX article on treasury readiness, governance,
              capital allocation, risk management, and investor positioning.
            </p>
            <a
              className="mt-8 inline-flex text-sm font-medium text-datx-accent transition-colors hover:text-white"
              href="#featured"
            >
              Read article
            </a>
          </article>

          {comingSoonArticles.map((article) => (
            <article className="surface p-7" key={article.title}>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Coming Soon
              </p>
              <h3 className="mt-8 text-xl font-light leading-8 text-white">
                {article.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-datx-mist">
                {article.description}
              </p>
            </article>
          ))}
        </div>
      </PageShell>
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
            research for public company decision-makers evaluating digital
            asset treasury policy.
          </p>
          <a
            aria-label="DATX on X"
            className="inline-flex h-10 w-10 items-center justify-center text-3xl leading-none text-slate-300 transition-colors duration-200 hover:text-datx-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-datx-accent"
            href="https://x.com/DATX_strategy"
            rel="noopener noreferrer"
            target="_blank"
          >
            𝕏
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function ResearchPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ResearchHero />
        <FeaturedArticleSection />
        <ArticleCardsSection />
      </main>
      <SiteFooter />
    </>
  );
}
