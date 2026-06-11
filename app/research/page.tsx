import { SiteHeader } from "@/components/site-header";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DATX Research | Digital Asset Treasury Strategy",
  description:
    "Independent research on digital asset treasury strategy, corporate treasury allocation, governance, and public company digital asset adoption.",
};

const featuredArticle = {
  title: "What Is a Digital Asset Treasury Strategy?",
  href: "/research/what-is-a-digital-asset-treasury-strategy",
  description:
    "A practical framework for boards, CFOs, investors, and public company management teams evaluating digital assets as part of corporate treasury policy.",
  themes: [
    "Treasury mandate and liquidity profile",
    "Board oversight and delegated authority",
    "Capital allocation capacity and constraints",
    "Custody, controls, reporting, and audit readiness",
    "Investor narrative and disclosure discipline",
  ],
};

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
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div>
            <p className="eyebrow">Featured Article</p>
            <h2 className="mt-5 text-3xl font-light tracking-tight text-white sm:text-4xl">
              Institutional research for treasury decision-makers
            </h2>
            <p className="body-copy mt-6">
              DATX Research is structured as an article index for public company
              leaders evaluating digital asset treasury models, governance, and
              capital allocation questions.
            </p>
          </div>

          <Link
            className="surface block p-7 transition-colors duration-200 hover:border-datx-blue sm:p-10 lg:p-12"
            href={featuredArticle.href}
          >
            <p className="eyebrow">Featured Article</p>
            <h3 className="mt-5 text-3xl font-light leading-tight text-white sm:text-4xl">
              {featuredArticle.title}
            </h3>
            <p className="body-copy mt-6">{featuredArticle.description}</p>
            <div className="mt-8 border-l border-datx-blue bg-datx-navy/60 px-6 py-5">
              <p className="text-sm uppercase tracking-[0.18em] text-datx-accent">
                Analytical Focus
              </p>
              <ul className="mt-5 space-y-3">
                {featuredArticle.themes.map((theme) => (
                  <li
                    className="flex gap-3 text-sm leading-6 text-slate-200"
                    key={theme}
                  >
                    <span className="mt-2 h-px w-4 shrink-0 bg-datx-blue" />
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
            <span className="mt-8 inline-flex text-sm font-medium text-datx-accent transition-colors">
              Read article
            </span>
          </Link>
        </div>
      </PageShell>
    </section>
  );
}

function LatestResearchSection() {
  return (
    <section className="section-space border-b border-datx-line" id="latest">
      <PageShell>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Latest Research</p>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">
              Published Analysis
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Current DATX research articles are published as standalone pages so
            future research can scale without turning the landing page into a
            long-form archive.
          </p>
        </div>

        <div className="mt-11 grid gap-5 lg:grid-cols-3">
          <Link
            className="surface block border-datx-blue/40 p-7 transition-colors duration-200 hover:border-datx-blue"
            href={featuredArticle.href}
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-datx-blue">
              Research Article
            </p>
            <h3 className="mt-8 text-xl font-light leading-8 text-white">
              {featuredArticle.title}
            </h3>
            <p className="mt-5 text-sm leading-7 text-datx-mist">
              A foundational DATX article on treasury readiness, governance,
              capital allocation, risk management, and investor positioning.
            </p>
            <span className="mt-8 inline-flex text-sm font-medium text-datx-accent">
              Read article
            </span>
          </Link>
        </div>
      </PageShell>
    </section>
  );
}

function ComingSoonSection() {
  return (
    <section className="section-space" id="coming-soon">
      <PageShell>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Coming Soon</p>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">
              Case Study Pipeline
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Future articles will be published on dedicated research URLs rather
            than appended to this index.
          </p>
        </div>

        <div className="mt-11 grid gap-5 lg:grid-cols-2">
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
        <LatestResearchSection />
        <ComingSoonSection />
      </main>
      <SiteFooter />
    </>
  );
}
