import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";
import type { Metadata } from "next";
import { researchArticles } from "../research-articles";

const article = researchArticles.metaplanetCaseStudy;

export const metadata: Metadata = {
  title: `${article.title} | DATX Research`,
  description: article.description,
};

const assessmentScores = [
  { category: "Treasury Vision", score: "10 / 10" },
  { category: "Capital Markets Execution", score: "9 / 10" },
  { category: "Balance Sheet Strategy", score: "9 / 10" },
  { category: "Governance Readiness", score: "8 / 10" },
  { category: "Risk Management", score: "7 / 10" },
  { category: "Long-Term Sustainability", score: "8 / 10" },
];

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-6 lg:px-10">{children}</div>;
}

function ArticleHero() {
  return (
    <section className="relative overflow-hidden border-b border-datx-line bg-datx-black">
      <div className="absolute inset-0 bg-[linear-gradient(105deg,#060a10_15%,#09131f_62%,#0b1624_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0,rgba(83,125,168,0.025)_1px,transparent_1px),linear-gradient(to_bottom,transparent_0,rgba(83,125,168,0.04)_1px,transparent_1px)] bg-[size:88px_88px]" />
      <PageShell>
        <div className="relative flex min-h-[430px] items-end pb-14 pt-32 sm:min-h-[480px] sm:pb-16">
          <div className="max-w-4xl">
            <Link
              className="eyebrow transition-colors hover:text-white"
              href="/research"
            >
              DATX Research
            </Link>
            <h1 className="mt-6 text-4xl font-light tracking-tight text-white sm:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-xl font-light leading-9 text-slate-200 sm:text-2xl">
              Lessons for Public Companies Evaluating a Digital Asset Treasury
              Strategy
            </p>
          </div>
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
      <h2 className="text-2xl font-light text-white sm:text-3xl">{title}</h2>
      <div className="mt-5 space-y-5 text-base leading-8 text-datx-mist">
        {children}
      </div>
    </section>
  );
}

function ArticleSubsection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div>
      <h3 className="text-xl font-light text-white">{title}</h3>
      <div className="mt-4 space-y-5 text-base leading-8 text-datx-mist">
        {children}
      </div>
    </div>
  );
}

function ArticleBody() {
  return (
    <section className="section-space border-b border-datx-line">
      <PageShell>
        <article className="surface p-7 sm:p-10 lg:p-12">
          <div className="border-b border-datx-line pb-8">
            <p className="eyebrow">Case Study</p>
            <h2 className="mt-4 text-3xl font-light leading-tight text-white sm:text-4xl">
              {article.title}
            </h2>
            <p className="mt-4 text-sm font-medium text-slate-500">
              Published: {article.publicationDate}
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Lessons for Public Companies Evaluating a Digital Asset Treasury
              Strategy
            </p>
          </div>

          <div className="mt-10 space-y-11">
            <section className="space-y-5 text-base leading-8 text-datx-mist">
              <p>
                Over the past two years, few listed companies have attracted as
                much attention in the digital asset sector as Metaplanet.
                Originally known as a Japanese operating company, the firm has
                transformed itself into one of the world&apos;s largest
                corporate Bitcoin holders through an aggressive treasury
                strategy.
              </p>
              <p>
                While much of the media has focused on Bitcoin purchases and
                share price performance, the more important story is the
                strategic framework behind the transition.
              </p>
              <p>
                For executives, CFOs and boards considering digital assets, the
                real question is not whether to copy Metaplanet, but rather:
              </p>
              <p className="border-l border-datx-blue bg-datx-navy/60 px-6 py-5 text-lg leading-8 text-white">
                What lessons can other public companies learn from its treasury
                transformation?
              </p>
            </section>

            <ArticleSection title="Background">
              <p>
                Before becoming widely recognized as a Bitcoin treasury
                company, Metaplanet operated as a conventional listed business
                within Japan.
              </p>
              <p>
                Like many listed companies, management faced a difficult capital
                allocation environment:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Persistent currency debasement concerns
                </li>
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Limited returns on idle cash reserves
                </li>
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  A changing global monetary environment
                </li>
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Increasing investor interest in digital assets
                </li>
              </ul>
              <p>
                Rather than viewing Bitcoin purely as a speculative investment,
                management repositioned it as a long-term treasury reserve
                asset.
              </p>
              <p>
                This represented a fundamental shift in corporate treasury
                philosophy.
              </p>
              <p>
                Instead of allowing excess capital to remain entirely in cash or
                low-yield instruments, the company began evaluating Bitcoin as a
                strategic balance sheet asset.
              </p>
            </ArticleSection>

            <ArticleSection title="Why Bitcoin?">
              <p>
                The decision was never simply about purchasing cryptocurrency.
              </p>
              <p>
                It reflected a broader treasury strategy built around several
                key objectives.
              </p>
              <ArticleSubsection title="Treasury Diversification">
                <p>
                  Corporate treasuries have traditionally relied on cash,
                  government bonds and short-term instruments.
                </p>
                <p>
                  While these assets provide stability, they may gradually lose
                  purchasing power during prolonged periods of monetary
                  expansion.
                </p>
                <p>
                  Bitcoin offered an alternative reserve asset with
                  fundamentally different monetary characteristics.
                </p>
              </ArticleSubsection>
              <ArticleSubsection title="Scarcity">
                <p>
                  Unlike fiat currencies, Bitcoin has a fixed maximum supply.
                </p>
                <p>
                  Supporters argue that this scarcity may provide long-term
                  protection against monetary debasement.
                </p>
                <p>
                  Whether or not one agrees with that thesis, it introduces
                  diversification characteristics unavailable through
                  traditional cash holdings.
                </p>
              </ArticleSubsection>
              <ArticleSubsection title="Strategic Positioning">
                <p>
                  Adopting Bitcoin also differentiated Metaplanet from many
                  traditional listed companies.
                </p>
                <p>
                  The strategy significantly increased international investor
                  awareness while repositioning the company within an emerging
                  institutional asset class.
                </p>
              </ArticleSubsection>
              <ArticleSubsection title="Long-Term Capital Allocation">
                <p>
                  Rather than treating Bitcoin as a short-term trading asset,
                  management framed acquisitions as part of a long-term treasury
                  strategy.
                </p>
                <p>This distinction is important.</p>
                <p>
                  Corporate treasury management differs fundamentally from
                  speculative investing.
                </p>
              </ArticleSubsection>
            </ArticleSection>

            <ArticleSection title="Capital Raising">
              <p>
                Perhaps the most overlooked aspect of Metaplanet&apos;s
                transformation is how the treasury strategy was financed.
              </p>
              <p>
                Accumulating a significant Bitcoin position requires access to
                capital.
              </p>
              <p>
                Rather than relying solely on existing cash balances, the
                company utilized a range of capital market tools, including
                equity financing and debt issuance, while communicating its
                treasury strategy to shareholders and the market.
              </p>
              <p>This illustrates an important principle.</p>
              <p>
                A successful digital asset treasury strategy is not defined
                solely by asset purchases.
              </p>
              <p>
                It also depends on maintaining access to capital markets and
                preserving investor confidence throughout different market
                cycles.
              </p>
            </ArticleSection>

            <ArticleSection title="Treasury Execution">
              <p>
                Execution has been one of the defining characteristics of
                Metaplanet&apos;s approach.
              </p>
              <p>
                Instead of making a single purchase, the company steadily
                expanded its holdings over time as financing opportunities
                became available.
              </p>
              <p>
                This disciplined accumulation strategy allowed management to
                continuously build exposure while adapting to changing market
                conditions.
              </p>
              <p>
                Rather than attempting to perfectly time the market, treasury
                growth became part of an ongoing capital allocation process.
              </p>
            </ArticleSection>

            <ArticleSection title="Market Reaction">
              <p>The market response extended well beyond Bitcoin itself.</p>
              <p>
                Metaplanet rapidly became one of the most closely followed
                digital asset treasury companies globally.
              </p>
              <p>The strategy generated:</p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Increased international investor awareness
                </li>
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Greater market liquidity
                </li>
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Higher institutional visibility
                </li>
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Significant media coverage
                </li>
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Expanded analyst attention
                </li>
              </ul>
              <p>
                While share price performance has naturally reflected
                Bitcoin&apos;s volatility, investor interest increasingly
                focused on the company&apos;s treasury strategy rather than
                solely its operating business.
              </p>
            </ArticleSection>

            <ArticleSection title="Risks">
              <p>No treasury strategy is without risk.</p>
              <p>
                A balanced assessment must also consider potential challenges.
              </p>
              <ArticleSubsection title="Bitcoin Price Volatility">
                <p>Bitcoin remains a highly volatile asset.</p>
                <p>
                  Large price swings can materially affect reported balance
                  sheet values and investor sentiment.
                </p>
              </ArticleSubsection>
              <ArticleSubsection title="Capital Raising Risk">
                <p>
                  Future treasury expansion depends upon continued access to
                  capital markets.
                </p>
                <p>
                  If financing conditions deteriorate, growth strategies may
                  become more difficult to execute.
                </p>
              </ArticleSubsection>
              <ArticleSubsection title="Governance">
                <p>
                  Boards adopting digital asset strategies require strong
                  governance frameworks.
                </p>
                <p>
                  Risk management, custody, internal controls and treasury
                  oversight become increasingly important as digital asset
                  exposure grows.
                </p>
              </ArticleSubsection>
              <ArticleSubsection title="Regulatory and Accounting Complexity">
                <p>Digital asset regulation continues to evolve globally.</p>
                <p>
                  Accounting standards, disclosure requirements and taxation
                  remain areas requiring careful consideration.
                </p>
              </ArticleSubsection>
            </ArticleSection>

            <ArticleSection title="DATX Assessment">
              <p>
                Rather than asking whether every public company should replicate
                Metaplanet&apos;s strategy, DATX evaluates the underlying
                characteristics that contributed to its execution.
              </p>
              <div>
                <h3 className="text-xl font-light text-white">
                  DATX Treasury Strategy Assessment
                </h3>
                <div className="mt-5 overflow-x-auto border border-datx-line">
                  <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                    <thead className="bg-datx-navy/80 text-xs uppercase tracking-[0.16em] text-datx-accent">
                      <tr>
                        <th className="border-b border-datx-line px-5 py-4 font-medium">
                          Category
                        </th>
                        <th className="border-b border-datx-line px-5 py-4 text-right font-medium">
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessmentScores.map((item) => (
                        <tr className="border-b border-datx-line last:border-b-0" key={item.category}>
                          <td className="px-5 py-4 text-datx-mist">
                            {item.category}
                          </td>
                          <td className="px-5 py-4 text-right text-white">
                            {item.score}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ArticleSection>

            <ArticleSection title="Overall DATX Assessment">
              <p className="text-2xl font-light text-white">51 / 60</p>
              <p>
                Metaplanet demonstrates a highly structured treasury strategy
                supported by disciplined execution, capital market access and a
                clearly articulated long-term vision.
              </p>
              <p>
                The strategy is ambitious and carries meaningful execution risk,
                but it also illustrates how digital assets can become part of a
                broader corporate treasury framework when accompanied by
                appropriate governance and financing capabilities.
              </p>
              <p>
                Importantly, the company&apos;s experience should not be
                interpreted as a universal template.
              </p>
              <p>
                Every listed company possesses different financial resources,
                governance structures, shareholder expectations and strategic
                objectives.
              </p>
            </ArticleSection>

            <ArticleSection title="Looking Ahead">
              <p>
                As more public companies evaluate digital asset treasury
                strategies, the central question will increasingly shift from:
              </p>
              <p className="text-lg italic text-slate-200">
                &quot;Should companies own digital assets?&quot;
              </p>
              <p>to</p>
              <p className="text-lg italic text-slate-200">
                &quot;Which companies are actually positioned to implement such
                a strategy responsibly?&quot;
              </p>
              <p>
                This distinction forms the foundation of the upcoming{" "}
                <strong className="font-medium text-white">
                  DATX Treasury Intelligence Engine
                </strong>
                .
              </p>
              <p>
                Rather than providing generic commentary, the platform will
                assess publicly listed companies using a structured framework
                covering:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Balance sheet strength
                </li>
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Liquidity and treasury flexibility
                </li>
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Governance readiness
                </li>
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Strategic fit
                </li>
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Implementation complexity
                </li>
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Risk factors
                </li>
                <li className="flex gap-3">
                  <span className="mt-4 h-px w-4 shrink-0 bg-datx-blue" />
                  Treasury scenario analysis
                </li>
              </ul>
              <p>
                The objective is not to recommend whether a company should
                purchase Bitcoin or any other digital asset.
              </p>
              <p>
                Instead, DATX seeks to provide institutional-quality analysis
                that helps boards, executives and investors evaluate whether a
                digital asset treasury strategy aligns with a company&apos;s
                financial position, governance capabilities and long-term
                objectives.
              </p>
              <p>
                As digital asset adoption continues to expand across global
                capital markets, structured analysis—not speculation—will become
                increasingly valuable.
              </p>
            </ArticleSection>
          </div>
        </article>
      </PageShell>
    </section>
  );
}

export default function MetaplanetCaseStudyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ArticleHero />
        <ArticleBody />
      </main>
      <SiteFooter research />
    </>
  );
}
