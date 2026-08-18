import type { Metadata } from "next";
import Link from "next/link";

const title = "DATX TQS Methodology | Digital Asset Treasury Company Tracker";
const description =
  "How DATX evaluates digital asset treasury companies using Treasury Quality Score categories, confidence ratings, and operating-business strength subcategories.";
const baseUrl = "https://www.datxstrategy.com";
const url = `${baseUrl}/tracker/methodology`;
const methodology = {
  categories: [
    { label: "Treasury Rationale", max: 10 },
    { label: "Capital Structure", max: 10 },
    { label: "Funding & Capital Markets", max: 10 },
    { label: "Operating Business Strength", max: 10 },
    { label: "Liquidity & Resilience", max: 20 },
    { label: "Governance & Risk Controls", max: 15 },
    { label: "Execution & Transparency", max: 15 },
    { label: "Shareholder Alignment", max: 10 },
  ],
  operatingBusinessSubcategories: [
    { label: "Profitability & Cash Generation", max: 3 },
    { label: "Strategic Fit", max: 3 },
    { label: "Business Diversification", max: 2 },
    { label: "Operating Track Record", max: 2 },
  ],
  disclaimer:
    "The DATX Treasury Quality Score™ evaluates the quality, resilience, governance, and long-term sustainability of a digital asset treasury strategy. It is not a prediction of share-price performance or investment advice.",
};

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "DATX",
    type: "article",
    images: [
      {
        url: `${baseUrl}/brand/datx-logo-white.png`,
        alt: "DATX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${baseUrl}/brand/datx-logo-white.png`],
  },
};

export default function TrackerMethodologyPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "DATX Tracker", item: `${baseUrl}/tracker` },
      { "@type": "ListItem", position: 2, name: "TQS Methodology", item: url },
    ],
  };

  return (
    <main className="min-h-screen bg-datx-black text-slate-100">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <section className="border-b border-datx-line bg-[#050910]">
        <div className="container-frame py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link className="transition hover:text-white" href="/tracker">DATX Tracker</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-200">TQS Methodology</li>
            </ol>
          </nav>
          <p className="eyebrow">DATX TQS Methodology</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-light tracking-tight text-white sm:text-5xl">
            Treasury Quality Score™ methodology
          </h1>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-400">
            TQS evaluates treasury strategy quality, resilience, governance,
            execution, capital structure, and long-term sustainability. It is not
            a share-price target, valuation opinion, trading signal, legal
            opinion, tax opinion, or investment recommendation.
          </p>
        </div>
      </section>

      <div className="container-frame space-y-8 py-8 sm:py-10">
        <section className="border border-datx-line bg-[#091522] p-5 shadow-panel">
          <h2 className="text-xl font-light text-white">Eight-category framework</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {methodology.categories.map((category) => (
              <div
                className="flex items-center justify-between border border-datx-line bg-[#07111d] px-4 py-3"
                key={category.label}
              >
                <span className="text-sm text-slate-300">{category.label}</span>
                <span className="font-mono text-sm text-datx-gold">
                  {category.max}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-datx-line bg-[#091522] p-5 shadow-panel">
          <h2 className="text-xl font-light text-white">
            Operating Business Strength subcategories
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {methodology.operatingBusinessSubcategories.map((category) => (
              <div
                className="flex items-center justify-between border border-datx-line bg-[#07111d] px-4 py-3"
                key={category.label}
              >
                <span className="text-sm text-slate-300">{category.label}</span>
                <span className="font-mono text-sm text-datx-gold">
                  {category.max}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-datx-line bg-[#091522] p-5">
            <h2 className="text-lg font-light text-white">Grade interpretation</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              85-100: A · 75-84: B+ · 65-74: B · 50-64: C · Below 50: D.
              Supplied company grades are preserved while DATX grade labels are
              still being calibrated.
            </p>
          </div>
          <div className="border border-datx-line bg-[#091522] p-5">
            <h2 className="text-lg font-light text-white">Confidence rating</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Confidence reflects data completeness, disclosure quality, recency,
              and the separation between observable facts and analyst judgment.
            </p>
          </div>
        </section>

        <section className="border-t border-datx-line pt-5 text-sm leading-7 text-slate-400">
          <p>{methodology.disclaimer}</p>
          <p className="mt-3 text-xs leading-6 text-slate-500">
            Updated weekly on Tuesdays.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Crypto prices use one synchronized snapshot from 18 Aug 2026 at
            05:24 UTC. Equity market caps use the latest completed common
            reference close, 17 Aug 2026, with international values converted
            to USD using 17 Aug reference FX rates. Treasury NAV is direct
            verified corporate crypto holdings multiplied by those prices;
            unsupported quantities remain Pending verification and are excluded
            from the aggregate. mNAV is market capitalization divided by
            Treasury NAV.
          </p>
        </section>
      </div>
    </main>
  );
}
