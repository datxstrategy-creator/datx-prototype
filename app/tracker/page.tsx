import type { Metadata } from "next";
import { Suspense } from "react";
import {
  DatTrackerPrototype,
  type CompanyRecord,
  type ScoreCategory,
} from "../dat-tracker-prototype/tracker-client";

const title = "Digital Asset Treasury Company Tracker™ | DATX";
const description =
  "Independent research, Treasury Quality Scores (TQS), and market intelligence for public digital asset treasury companies.";
const baseUrl = "https://www.datxstrategy.com";
const url = `${baseUrl}/tracker`;
const publishedReports = [
  { name: "Strategy", slug: "strategy" },
  { name: "DigitalX", slug: "digitalx" },
  { name: "Metaplanet", slug: "metaplanet" },
  { name: "gumi Inc.", slug: "gumi" },
];

const tqsFramework = [
  ["Treasury Rationale", 10],
  ["Capital Structure", 10],
  ["Funding & Capital Markets", 10],
  ["Operating Business Strength", 10],
  ["Liquidity & Resilience", 20],
  ["Governance & Risk Controls", 15],
  ["Execution & Transparency", 15],
  ["Shareholder Alignment", 10],
] as const;

function categories(scores: number[]): ScoreCategory[] {
  return tqsFramework.map(([label, max], index) => ({
    label,
    score: scores[index],
    max,
  }));
}

const companies: CompanyRecord[] = [
  {
    slug: "strategy",
    name: "Strategy",
    ticker: "MSTR",
    exchange: "NASDAQ",
    country: "United States",
    asset: "Bitcoin",
    assetLabel: "BTC",
    holdingsAsOf: "8 Nov 2026",
    holdingInputs: {"BTC": 850364},
    dataNote: "Issuer-reported treasury balance.",
    holdings: "850,364 BTC",
    treasuryNav: "$63.97B",
    treasuryNavValue: 63.967058727,
    marketCap: "$53.06B",
    marketCapValue: 53.06,
    mnav: "0.83x",
    marketCapSource: "https://stockanalysis.com/stocks/mstr/market-cap/",
    model: "Levered Bitcoin treasury platform",
    sources: [
      {
        label: "Strategy Form 8-K",
        url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526452693/mstr-20261109.htm",
        date: "9 Nov 2026",
      },
    ],
    rating: {
      status: "rated",
      score: 84,
      grade: "A",
      confidence: 5,
      lastReviewed: "18 Aug 2026",
      categories: categories([10, 8, 10, 6, 16, 12, 14, 8]),
      analystSummary:
        "Strategy remains the benchmark for capital-market innovation and large-scale Bitcoin treasury execution. Its exceptional access to funding and clear treasury rationale are offset by single-asset concentration, capital-stack complexity, recurring senior claims, and key-person dependence.",
      treasuryModel: "Capital markets-led Bitcoin accumulation",
      strengths: [
        "Clear treasury rationale with long operating history as a public Bitcoin holder.",
        "Deep capital-market access and multiple funding channels.",
        "High transparency around holdings and treasury execution.",
      ],
      risks: [
        "Single-asset concentration and high sensitivity to Bitcoin drawdowns.",
        "Complex capital stack with recurring senior claims.",
        "Key-person and narrative dependence remain material.",
      ],
      improvements: [
        "Reduce capital-stack complexity over time.",
        "Broaden governance disclosure around treasury stress scenarios.",
      ],
    },
  },
  {
    slug: "digitalx",
    name: "DigitalX",
    ticker: "DCC",
    exchange: "ASX",
    country: "Australia",
    asset: "Bitcoin",
    assetLabel: "BTC",
    holdingsAsOf: "30 Sep 2026",
    holdingInputs: {"BTC": 221.8},
    dataNote: "Includes 30 BTC held directly and approximately 191.8 BTC of exposure through DigitalX Bitcoin Fund units. The report gives no current SOL quantity.",
    holdings: "≈ 221.8 BTC including fund exposure",
    treasuryNav: "≈ $16.7M",
    treasuryNavValue: 0.016684495,
    marketCap: "≈ $24.53M",
    marketCapValue: 0.024528636,
    mnav: "1.47x",
    marketCapSource: "https://stockanalysis.com/quote/asx/DCC/market-cap/",
    model: "Operating company with digital asset treasury",
    sources: [
      {
        label: "DigitalX September quarterly report",
        url: "https://financialfilings.com/filings/digitalx-limited/interim-quarterly-report/2026/74893960/",
        date: "29 Oct 2026",
      },
    ],
    rating: {
      status: "rated",
      score: 82,
      grade: "A-",
      confidence: 4,
      lastReviewed: "18 Aug 2026",
      categories: categories([9, 8, 8, 9, 16, 12, 12, 8]),
      operatingBusinessSubcategories: [
        { label: "Profitability & Cash Generation", score: 2, max: 3 },
        { label: "Strategic Fit", score: 3, max: 3 },
        { label: "Business Diversification", score: 2, max: 2 },
        { label: "Operating Track Record", score: 2, max: 2 },
      ],
      analystSummary:
        "DigitalX combines an established digital-asset operating business with conservative capital management and strong strategic fit. Its smaller treasury limits scale, but diversified operations and multi-cycle experience improve resilience relative to more leveraged treasury vehicles.",
      treasuryModel: "Digital asset operating company with treasury allocation",
      strengths: [
        "Strong strategic fit between operations and treasury assets.",
        "Conservative capital posture relative to more leveraged vehicles.",
        "Multi-cycle operating experience in digital assets.",
      ],
      risks: [
        "Smaller treasury scale limits market visibility.",
        "Liquidity and analyst coverage remain more limited than mega-cap peers.",
      ],
      improvements: [
        "Expand treasury reporting granularity.",
        "Demonstrate repeatable operating cash generation across cycles.",
      ],
    },
  },
  {
    slug: "metaplanet",
    name: "Metaplanet",
    ticker: "3350",
    exchange: "Tokyo",
    country: "Japan",
    asset: "Bitcoin",
    assetLabel: "BTC",
    holdingsAsOf: "30 Sep 2026",
    holdingInputs: {"BTC": 44000},
    dataNote: "The company tracker still shows 44,000 BTC as current.",
    holdings: "44,000 BTC",
    treasuryNav: "$3.31B",
    treasuryNavValue: 3.3098186,
    marketCap: "≈ $1.90B",
    marketCapValue: 1.902284507,
    mnav: "0.57x",
    marketCapSource: "https://stockanalysis.com/quote/tyo/3350/market-cap/",
    model: "Asia-focused Bitcoin treasury company",
    sources: [
      {
        label: "Metaplanet Bitcoin Strategy Tracker",
        url: "https://analytics.metaplanet.jp/?tab=shares",
        date: "5 Oct 2026",
      },
    ],
    rating: {
      status: "rated",
      score: 79,
      grade: "B+",
      confidence: 5,
      lastReviewed: "18 Aug 2026",
      categories: categories([10, 9, 10, 4, 14, 11, 13, 8]),
      operatingBusinessSubcategories: [
        { label: "Profitability & Cash Generation", score: 1, max: 3 },
        { label: "Strategic Fit", score: 1, max: 3 },
        { label: "Business Diversification", score: 1, max: 2 },
        { label: "Operating Track Record", score: 1, max: 2 },
      ],
      analystSummary:
        "Metaplanet has rapidly established itself as Asia’s leading Bitcoin Treasury Company through exceptional capital-market execution, innovative financing, and one of the clearest treasury philosophies in the sector.",
      treasuryModel: "Bitcoin Treasury",
      strengths: [
        "BTC Yield KPI.",
        "Active capital-market execution.",
        "Equity-financing innovation.",
        "Strong investor communication.",
      ],
      risks: [
        "Liquidity remains heavily tied to Bitcoin market conditions.",
        "Continued capital-market access remains important.",
        "The legacy operating business contributes relatively little compared with the Bitcoin treasury.",
      ],
      improvements: [
        "More detailed treasury-risk metrics.",
        "Explicit leverage targets.",
        "Published concentration limits.",
        "Formal treasury-governance framework.",
      ],
    },
  },
  {
    slug: "gumi",
    name: "gumi Inc.",
    ticker: "3903",
    exchange: "Tokyo",
    country: "Japan",
    asset: "Multi-Asset",
    assetLabel: "BTC / XRP",
    holdingsAsOf: "31 Jul 2026",
    holdingInputs: {"BTC": 112, "XRP": 1979448},
    dataNote: "Consolidated BTC and XRP holdings only. gumi also discloses material balances in assets outside DATX coverage, so its basic mNAV uses a partial crypto portfolio. The shareholder BTC/XRP benefit is separate.",
    holdings: "112 BTC + 1,979,448 XRP",
    treasuryNav: "$10.6M",
    treasuryNavValue: 0.010596249,
    marketCap: "≈ $51.54M",
    marketCapValue: 0.051536297,
    mnav: "4.86x",
    marketCapSource: "https://stockanalysis.com/quote/tyo/3903/market-cap/",
    model: "Blockchain operating company with BTC and XRP exposure",
    sources: [
      {
        label: "gumi consolidated results and crypto holdings table",
        url: "https://financialfilings.com/filings/gumi-inc/earnings-release/2026/59758349/",
        date: "11 Sep 2026",
      },
    ],
    rating: {
      status: "rated",
      score: 76,
      grade: "B+",
      confidence: 4,
      lastReviewed: "18 Aug 2026",
      categories: categories([8, 8, 7, 9, 13, 11, 12, 8]),
      operatingBusinessSubcategories: [
        { label: "Profitability & Cash Generation", score: 2, max: 3 },
        { label: "Strategic Fit", score: 3, max: 3 },
        { label: "Business Diversification", score: 2, max: 2 },
        { label: "Operating Track Record", score: 2, max: 2 },
      ],
      analystSummary:
        "gumi presents one of Japan’s most strategically coherent digital asset treasury models by integrating XRP into an established blockchain and gaming ecosystem rather than treating it as a standalone speculative reserve asset.",
      treasuryModel: "XRP Treasury",
      strengths: [
        "Strategic partnership with SBI.",
        "Public treasury disclosures.",
        "Active treasury oversight.",
        "Innovative covered-call strategy.",
      ],
      risks: [
        "Treasury execution remains in its early stages.",
        "The company remains exposed to digital-asset volatility, particularly through XRP.",
        "Long-term effectiveness has yet to be demonstrated across a full market cycle.",
      ],
      improvements: [
        "Formal treasury-allocation policies.",
        "Concentration limits.",
        "Published treasury-risk metrics.",
        "Treasury-specific KPIs.",
      ],
    },
  },
  {
    slug: "bitmine-immersion",
    name: "BitMine Immersion Technologies",
    ticker: "BMNR",
    exchange: "NYSE",
    country: "United States",
    asset: "Multi-Asset",
    assetLabel: "ETH / BTC",
    holdingsAsOf: "8 Nov 2026",
    holdingInputs: {"ETH": 6070092, "BTC": 216},
    dataNote: "Issuer-reported treasury balance.",
    holdings: "6,070,092 ETH + 216 BTC",
    treasuryNav: "$12.95B",
    treasuryNavValue: 12.954649298,
    marketCap: "$11.21B",
    marketCapValue: 11.21,
    mnav: "0.87x",
    marketCapSource: "https://stockanalysis.com/stocks/bmnr/market-cap/",
    model: "Ethereum treasury and mining infrastructure",
    rating: { status: "pending" },
    sources: [
      {
        label: "Bitmine treasury update",
        url: "https://www.prnewswire.com/apac/news-releases/bitmine-immersion-technologies-bmnr-announces-eth-holdings-reach-6-07-million-tokens-and-total-crypto-and-total-cash--marketable-securities-holdings-of-14-3-billion-302932985.html",
        date: "9 Nov 2026",
      },
    ],
  },
  {
    slug: "sharplink-gaming",
    name: "SharpLink Gaming",
    ticker: "SBET",
    exchange: "NASDAQ",
    country: "United States",
    asset: "Ethereum",
    assetLabel: "ETH",
    holdingsAsOf: "2 Nov 2026",
    holdingInputs: {"ETH": 895117},
    dataNote: "Uses the issuer’s November 2 treasury balance.",
    holdings: "≈ 895,117 ETH",
    treasuryNav: "≈ $1.91B",
    treasuryNavValue: 1.907941886,
    marketCap: "$1.33B",
    marketCapValue: 1.33,
    mnav: "0.70x",
    marketCapSource: "https://stockanalysis.com/stocks/sbet/market-cap/",
    model: "Ethereum treasury vehicle",
    rating: { status: "pending" },
    sources: [
      {
        label: "Sharplink third-quarter results",
        url: "https://www.globenewswire.com/de/news-release/2026/11/09/3398374/0/en/sharplink-reports-third-quarter-2026-financial-and-operating-results.html",
        date: "9 Nov 2026",
      },
    ],
  },
  {
    slug: "sol-strategies",
    name: "Sol Strategies",
    ticker: "STKE",
    exchange: "NASDAQ",
    country: "Canada",
    asset: "Solana",
    assetLabel: "SOL",
    holdingsAsOf: "30 Jun 2026",
    holdingInputs: {"SOL": 460000},
    dataNote: "Company treasury balance. Delegated customer SOL is separate.",
    holdings: "≈ 460,000 SOL",
    treasuryNav: "≈ $39.8M",
    treasuryNavValue: 0.039813,
    marketCap: "$46.02M",
    marketCapValue: 0.04602,
    mnav: "1.16x",
    marketCapSource: "https://stockanalysis.com/stocks/stke/market-cap/",
    model: "Solana treasury and validator exposure",
    rating: { status: "pending" },
    sources: [
      {
        label: "SOL Strategies fiscal third-quarter results",
        url: "https://cms.solstrategies.io/sol-strategies-reports-fiscal-q3-2026-results/",
        date: "17 Aug 2026",
      },
    ],
  },
  {
    slug: "defi-development",
    name: "DeFi Development Corp.",
    ticker: "DFDV",
    exchange: "NASDAQ",
    country: "United States",
    asset: "Solana",
    assetLabel: "SOL",
    holdingsAsOf: "6 Nov 2026",
    holdingInputs: {"SOL": 2609829},
    dataNote: "Issuer-reported SOL and SOL equivalents.",
    holdings: "≈ 2,609,829 SOL and equivalents",
    treasuryNav: "≈ $225.9M",
    treasuryNavValue: 0.2258807,
    marketCap: "$112.22M",
    marketCapValue: 0.11222,
    mnav: "0.50x",
    marketCapSource: "https://stockanalysis.com/stocks/dfdv/market-cap/",
    model: "Solana accumulation and ecosystem exposure",
    rating: { status: "pending" },
    sources: [
      {
        label: "DeFi Development Form 8-K exhibit",
        url: "https://www.sec.gov/Archives/edgar/data/1805526/000180552626000158/dfdv-exx991_11926.htm",
        date: "9 Nov 2026",
      },
    ],
  },
  {
    slug: "bitcoin-group",
    name: "Bitcoin Group SE",
    ticker: "ADE",
    exchange: "Xetra",
    country: "Germany",
    asset: "Bitcoin",
    assetLabel: "BTC",
    holdingsAsOf: "30 Jun 2026",
    holdingInputs: {},
    dataNote: "The issuer reported approximately €199 million in proprietary crypto and disclosed fair values by asset. Token quantities remain pending verification.",
    holdings: "Pending verification",
    treasuryNav: "Pending verification",
    treasuryNavValue: 0.0,
    marketCap: "≈ $131.41M",
    marketCapValue: 0.13140582,
    mnav: "Unavailable",
    marketCapSource: "https://stockanalysis.com/quote/etr/ADE/market-cap/",
    model: "Operating company with Bitcoin balance sheet",
    rating: { status: "pending" },
    sources: [
      {
        label: "Bitcoin Group SE half-year report",
        url: "https://bitcoingroup.com/en/publications/financial-reports/",
        date: "29 Sep 2026",
      },
    ],
  },
  {
    slug: "strive",
    name: "Strive, Inc.",
    ticker: "ASST",
    exchange: "NASDAQ",
    country: "United States",
    asset: "Bitcoin",
    assetLabel: "BTC",
    holdingsAsOf: "6 Nov 2026",
    holdingInputs: {"BTC": 43153},
    dataNote: "Issuer-reported treasury balance.",
    holdings: "43,153 BTC",
    treasuryNav: "$3.25B",
    treasuryNavValue: 3.246104592,
    marketCap: "$2.73B",
    marketCapValue: 2.73,
    mnav: "0.84x",
    marketCapSource: "https://stockanalysis.com/stocks/asst/market-cap/",
    model: "Bitcoin treasury platform",
    rating: { status: "pending" },
    sources: [
      {
        label: "Strive Form 8-K",
        url: "https://www.sec.gov/Archives/edgar/data/1920406/000162828026071888/asst-20261109.htm",
        date: "9 Nov 2026",
      },
    ],
  },
  {
    slug: "u-turn",
    name: "Upexi",
    ticker: "UPXI",
    exchange: "NASDAQ",
    country: "United States",
    asset: "Solana",
    assetLabel: "SOL",
    holdingsAsOf: "30 Jun 2026",
    holdingInputs: {"SOL": 2340150},
    dataNote: "The annual report’s crypto asset rollforward states the fiscal year-end balance.",
    holdings: "2,340,150 SOL",
    treasuryNav: "$202.5M",
    treasuryNavValue: 0.202539983,
    marketCap: "$55.06M",
    marketCapValue: 0.05506,
    mnav: "0.27x",
    marketCapSource: "https://stockanalysis.com/stocks/upxi/market-cap/",
    model: "Solana treasury strategy",
    rating: { status: "pending" },
    sources: [
      {
        label: "Upexi Form 10-K",
        url: "https://www.sec.gov/Archives/edgar/data/1775194/000147793226005668/upxi_10k.htm",
        date: "17 Sep 2026",
      },
    ],
  },
  {
    slug: "worksport",
    name: "Worksport",
    ticker: "WKSP",
    exchange: "NASDAQ",
    country: "United States",
    asset: "Multi-Asset",
    assetLabel: "BTC / XRP",
    holdingInputs: {},
    dataNote: "Current BTC and XRP units remain pending verification.",
    holdings: "Pending verification",
    treasuryNav: "Pending verification",
    treasuryNavValue: 0.0,
    marketCap: "$4.65M",
    marketCapValue: 0.00465,
    mnav: "Unavailable",
    marketCapSource: "https://stockanalysis.com/stocks/wksp/market-cap/",
    model: "Operating company with dual-asset reserve",
    rating: { status: "pending" },
    sources: [
      {
        label: "Worksport Form 10-Q",
        url: "https://www.sec.gov/Archives/edgar/data/1096275/000143774926026997/wksp20260630_10q.htm",
        date: "11 Aug 2026",
      },
    ],
  },
  {
    slug: "hyperscale-data",
    name: "Hyperscale Data",
    ticker: "GPUS",
    exchange: "NYSE American",
    country: "United States",
    asset: "Bitcoin",
    assetLabel: "BTC",
    holdingsAsOf: "1 Nov 2026",
    holdingInputs: {"BTC": 211.4639},
    dataNote: "Includes reported Bitcoin held by subsidiaries. Cash and restricted cash are separate.",
    holdings: "211.4639 BTC",
    treasuryNav: "$15.9M",
    treasuryNavValue: 0.015906981,
    marketCap: "$32.31M",
    marketCapValue: 0.03231,
    mnav: "2.03x",
    marketCapSource: "https://stockanalysis.com/stocks/gpus/market-cap/",
    model: "Infrastructure company with Bitcoin treasury allocation",
    rating: { status: "pending" },
    sources: [
      {
        label: "Hyperscale Data treasury release",
        url: "https://www.prnewswire.com/news-releases/hyperscale-data-held-approximately-50-6-million-of-bitcoin-cash-and-restricted-cash-as-of-november-1--2026--302927361.html",
        date: "3 Nov 2026",
      },
    ],
  },
  {
    slug: "evernorth",
    name: "Evernorth Holdings",
    ticker: "XRPN",
    exchange: "NASDAQ",
    country: "United States",
    asset: "XRP",
    assetLabel: "XRP",
    holdingsAsOf: "9 Oct 2026",
    holdingInputs: {"XRP": 473000000},
    dataNote: "Issuer-confirmed closing balance. Nasdaq trading began on 12 October 2026.",
    holdings: "≈ 473,000,000 XRP",
    treasuryNav: "≈ $518.8M",
    treasuryNavValue: 0.5188337,
    marketCap: "$567.38M",
    marketCapValue: 0.56738,
    mnav: "1.09x",
    marketCapSource: "https://stockanalysis.com/stocks/xrpn/market-cap/",
    model: "XRP treasury and institutional deployment",
    rating: { status: "pending" },
    sources: [
      {
        label: "Evernorth prospectus filed with the SEC",
        url: "https://www.sec.gov/Archives/edgar/data/2092592/000162828026068609/xrpn-20261030.htm",
        date: "30 Oct 2026",
      },
    ],
  },
];

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
    type: "website",
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

export default function TrackerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: publishedReports.length,
      itemListElement: publishedReports.map((report, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: report.name,
        url: `${baseUrl}/tracker/companies/${report.slug}`,
      })),
    },
  };

  const tetherComparison = (
    <section id="tether" className="container-frame py-4" aria-labelledby="tether-heading">
      <div className="border border-datx-line bg-datx-panel/60 p-5">
        <p className="text-xs uppercase tracking-wider text-slate-400">Private company comparison</p>
        <h2 id="tether-heading" className="mt-2 text-lg text-white">Tether</h2>
        <p className="mt-2 font-mono text-datx-accent">≈ 150,000 BTC</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          CEO-reported estimate disclosed on 3 November 2026, covering USDT reserves
          and separate corporate holdings. The 30 September BDO attestation lists
          $8.37 billion in reserve BTC, implying approximately 100,060 BTC. That
          reserve figure is part of the broader estimate and is shown separately for
          context. Tether is excluded from the public-company aggregate and TQS.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-datx-accent">
          <a href="https://www.coindesk.com/business/2026/11/03/tether-holds-150-000-bitcoin-worth-usd11-5-billion-ceo-paolo-ardoino-says">CEO disclosure coverage</a>
          <a href="https://tether.io/news/tether-generates-1-5-billion-in-q3-net-operating-profit-as-reserve-buffer-doubles-to-almost-8-billion/">Q3 reserve attestation</a>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <Suspense
        fallback={
          <main className="min-h-screen bg-datx-black text-slate-100">
            <div className="container-frame py-14">Loading DATX tracker...</div>
          </main>
        }
      >
        <DatTrackerPrototype
          basePath="/tracker"
          companies={companies}
          comparison={tetherComparison}
          publicMode
        />
      </Suspense>
      <section id="holdings-sources" className="container-frame pb-8" aria-labelledby="holdings-sources-heading">
        <details className="border border-datx-line bg-datx-panel/60 p-5">
          <summary id="holdings-sources-heading" className="cursor-pointer text-sm font-semibold text-white">
            Holdings sources and qualifications
          </summary>
          <p className="mt-3 text-sm text-slate-300">
            USD crypto valuation uses the <a className="text-datx-accent" href="https://coinmarketcap.com/historical/20261109/">9 November CoinMarketCap snapshot</a>.
            Market caps are from 9 November, with local currencies converted using the
            <a className="text-datx-accent" href="https://data.ecb.europa.eu/data/datasets/EXR"> ECB reference rates</a>.
          </p>
          <ul className="mt-3 space-y-3 text-sm text-slate-300">
            {companies.map((company) => (
              <li key={company.slug}>
                <span className="font-semibold text-slate-100">{company.name}</span>
                {company.dataNote && <p>{company.dataNote}</p>}
                {company.sources?.map((source) => (
                  <p key={source.url}><a className="text-datx-accent" href={source.url}>{source.label}</a> · {source.date}</p>
                ))}
                {company.marketCapSource && (
                  <p><a className="text-datx-accent" href={company.marketCapSource}>Market cap source</a> · 9 Nov 2026</p>
                )}
              </li>
            ))}
          </ul>
        </details>
      </section>
    </>
  );
}
