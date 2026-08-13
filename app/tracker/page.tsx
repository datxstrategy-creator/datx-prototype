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
    holdings: "843,775 BTC",
    treasuryNav: "$54.07B",
    treasuryNavValue: 54.069498,
    marketCap: "$33.98B",
    marketCapValue: 33.98,
    mnav: "0.63x",
    model: "Levered Bitcoin treasury platform",
    sources: [
      {
        label: "Strategy SEC filing",
        url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526237907/mstr-ex99_1.htm",
        date: "26 May 2026",
      },
      {
        label: "CoinGecko public-company treasury data",
        url: "https://www.coingecko.com/en/treasuries/companies/strategy",
        date: "11 Aug 2026",
      },
    ],
    rating: {
      status: "rated",
      score: 84,
      grade: "A",
      confidence: 5,
      lastReviewed: "16 Jul 2026",
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
    asset: "Multi-Asset",
    assetLabel: "BTC / SOL",
    holdings: "503 BTC + 20,423 SOL",
    treasuryNav: "$33.8M",
    treasuryNavValue: 0.033786083,
    marketCap: "$29.0M",
    marketCapValue: 0.02903,
    mnav: "0.86x",
    model: "Operating company with digital asset treasury",
    dataNote:
      "DigitalX treasury holdings reviewed from public treasury sources. USD value uses crypto prices as of 11 Aug 2026, approximately 03:38 UTC.",
    sources: [
      {
        label: "DigitalX Bitcoin Treasury page",
        url: "https://www.digitalx.com/bitcoin-treasury/",
        date: "11 Aug 2026",
      },
      {
        label: "CoinGecko public-company treasury data",
        url: "https://www.coingecko.com/en/treasuries/companies/digitalx",
        date: "11 Aug 2026",
      },
      {
        label: "The Block treasury data",
        url: "https://www.theblock.co/treasuries/dcc.ax",
        date: "11 Aug 2026",
      },
    ],
    rating: {
      status: "rated",
      score: 82,
      grade: "A-",
      confidence: 4,
      lastReviewed: "16 Jul 2026",
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
    holdings: "43,000 BTC",
    treasuryNav: "$2.76B",
    treasuryNavValue: 2.75544,
    marketCap: "$1.70B",
    marketCapValue: 1.7,
    mnav: "0.62x",
    model: "Asia-focused Bitcoin treasury company",
    dataNote:
      "Metaplanet holdings reviewed from public treasury sources. USD value uses crypto prices as of 11 Aug 2026, approximately 03:38 UTC.",
    sources: [
      {
        label: "Metaplanet treasury dashboard",
        url: "https://treasury.metaplanet.jp/",
        date: "11 Aug 2026",
      },
      {
        label: "CoinGecko public-company treasury data",
        url: "https://www.coingecko.com/en/treasuries/companies/metaplanet",
        date: "11 Aug 2026",
      },
    ],
    rating: {
      status: "rated",
      score: 79,
      grade: "B+",
      confidence: 5,
      lastReviewed: "16 Jul 2026",
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
    holdings: "80 BTC + XRP exposure pending verification",
    treasuryNav: "Pending verification",
    treasuryNavValue: 0,
    marketCap: "$82.2M",
    marketCapValue: 0.08217,
    mnav: "Pending verification",
    model: "Blockchain operating company with BTC and XRP exposure",
    dataNote:
      "gumi holdings data and analysis are under analyst review. The current XRP quantity and complete crypto portfolio remain pending verification.",
    sources: [
      {
        label: "CoinGecko public-company treasury data",
        url: "https://www.coingecko.com/en/treasuries/companies/gumi-inc",
        date: "11 Aug 2026",
      },
      {
        label: "gumi IR information",
        url: "https://gu3.co.jp/ir/information/",
        date: "11 Aug 2026",
      },
      {
        label: "TSE/Minkabu XRP disclosure index",
        url: "https://minkabu.jp/stock/3903/news/4324385",
        date: "29 Aug 2025",
      },
    ],
    rating: {
      status: "rated",
      score: 76,
      grade: "B+",
      confidence: 4,
      lastReviewed: "16 Jul 2026",
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
    exchange: "NYSE American",
    country: "United States",
    asset: "Ethereum",
    assetLabel: "ETH",
    holdings: "5,777,468 ETH + 207 BTC",
    treasuryNav: "$10.87B",
    treasuryNavValue: 10.868031676,
    marketCap: "$9.45B",
    marketCapValue: 9.45,
    mnav: "0.87x",
    model: "Ethereum treasury and mining infrastructure",
    rating: { status: "pending" },
    dataNote:
      "Holdings reviewed from BitMine public release. USD value uses crypto prices as of 11 Aug 2026, approximately 03:38 UTC.",
    sources: [
      {
        label: "BitMine public holdings release",
        url: "https://www.prnewswire.com/news-releases/bitmine-immersion-technologies-bmnr-announces-eth-holdings-reach-5-78-million-tokens-and-total-crypto-and-total-cash-holdings-of-11-5-billion-302829332.html",
        date: "20 Jul 2026",
      },
      {
        label: "CoinGecko public-company treasury data",
        url: "https://www.coingecko.com/en/treasuries/companies/bitmine?coin=ethereum",
        date: "11 Aug 2026",
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
    holdings: "886,725 ETH",
    treasuryNav: "$1.67B",
    treasuryNavValue: 1.666006882,
    marketCap: "$1.27B",
    marketCapValue: 1.27,
    mnav: "0.76x",
    model: "Ethereum treasury vehicle",
    rating: { status: "pending" },
    dataNote:
      "SharpLink holdings reviewed from public company disclosures. USD value uses crypto prices as of 11 Aug 2026, approximately 03:38 UTC.",
    sources: [
      {
        label: "SharpLink Form 8-K",
        url: "https://www.sec.gov/Archives/edgar/data/1981535/000149315226031202/form8-k.htm",
        date: "30 Jun 2026",
      },
      {
        label: "SharpLink public dashboard",
        url: "https://www.sharplink.com/dashboard?lang=en_US",
        date: "11 Aug 2026",
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
    holdings: "460,017 SOL",
    treasuryNav: "$35.0M",
    treasuryNavValue: 0.035007294,
    marketCap: "$39.3M",
    marketCapValue: 0.03933,
    mnav: "1.12x",
    model: "Solana treasury and validator exposure",
    rating: { status: "pending" },
    dataNote:
      "Primary ticker updated to STKE / NASDAQ. SOL Strategies also trades as HODL / CSE. USD value uses crypto prices as of 11 Aug 2026, approximately 03:38 UTC.",
    sources: [
      {
        label: "SOL Strategies monthly business update",
        url: "https://www.newsfilecorp.com/release/303711/SOL-Strategies-June-2026-Monthly-Business-Update",
        date: "2 Jul 2026",
      },
      {
        label: "StockAnalysis market data",
        url: "https://stockanalysis.com/stocks/stke/statistics/",
        date: "11 Aug 2026",
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
    holdings: "2,294,576 SOL",
    treasuryNav: "$174.7M",
    treasuryNavValue: 0.174657234,
    marketCap: "$81.9M",
    marketCapValue: 0.08192,
    mnav: "0.47x",
    model: "Solana accumulation and ecosystem exposure",
    rating: { status: "pending" },
    dataNote:
      "Holdings reviewed from DeFi Development Corp. public disclosure. USD value uses crypto prices as of 11 Aug 2026, approximately 03:38 UTC.",
    sources: [
      {
        label: "DeFi Development Corp. public disclosure",
        url: "https://www.sec.gov/Archives/edgar/data/1805526/000180552626000031/dfdv-exx991.htm",
        date: "13 May 2026",
      },
      {
        label: "StockAnalysis market data",
        url: "https://stockanalysis.com/stocks/dfdv/statistics/",
        date: "11 Aug 2026",
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
    holdings: "3,605 BTC · Pending verification",
    treasuryNav: "$231.0M",
    treasuryNavValue: 0.2310084,
    marketCap: "$134.8M",
    marketCapValue: 0.1348,
    mnav: "0.58x",
    model: "Operating company with Bitcoin balance sheet",
    rating: { status: "pending" },
    dataNote:
      "Exact BTC quantity is sourced from third-party treasury trackers and remains pending company verification. Included in approximate aggregate with source treatment disclosed.",
    sources: [
      {
        label: "Bitcoin Group annual report release",
        url: "https://cdn.financialreports.eu/financialreports/media/filings/4517/2026/RNS/4517_rns_2026-06-26_edda2190-d560-43e3-956b-096eab9cb62c.html",
        date: "26 Jun 2026",
      },
      {
        label: "BitcoinTreasuries public-company data",
        url: "https://bitcointreasuries.net/public-companies/bitcoin-group",
        date: "11 Aug 2026",
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
    holdings: "19,921 BTC",
    treasuryNav: "$1.28B",
    treasuryNavValue: 1.27653768,
    marketCap: "$1.00B",
    marketCapValue: 1,
    mnav: "0.78x",
    model: "Bitcoin treasury platform",
    rating: { status: "pending" },
    dataNote:
      "Strive replaced Semler Scientific following completion of the Semler acquisition. USD value uses crypto prices as of 11 Aug 2026, approximately 03:38 UTC.",
    sources: [
      {
        label: "Strive acquisition completion release",
        url: "https://investors.strive.com/news-events/news-releases/news-details/2026/Strive-Announces-the-Completion-of-Semler-Scientific-Acquisition/default.aspx",
        date: "16 Jan 2026",
      },
      {
        label: "Strive Bitcoin holdings disclosure",
        url: "https://ebs.publicnow.com/view/B2FED2E07987FBB0156ED78F6C4DFF3DA3DBB53B",
        date: "20 Jul 2026",
      },
      {
        label: "StockAnalysis market data",
        url: "https://stockanalysis.com/stocks/asst/market-cap/",
        date: "11 Aug 2026",
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
    holdings: "2,400,000 SOL",
    treasuryNav: "$182.6M",
    treasuryNavValue: 0.1824,
    marketCap: "$61.9M",
    marketCapValue: 0.0619,
    mnav: "0.34x",
    model: "Solana treasury strategy",
    rating: { status: "pending" },
    dataNote:
      "Holdings reviewed from Upexi public treasury dashboard. USD value uses crypto prices as of 11 Aug 2026, approximately 03:38 UTC.",
    sources: [
      {
        label: "Upexi treasury dashboard",
        url: "https://www.upexi.com/?trk=organization_guest_main-feed-card-text",
        date: "11 Aug 2026",
      },
      {
        label: "StockAnalysis market data",
        url: "https://stockanalysis.com/stocks/upxi/statistics/",
        date: "11 Aug 2026",
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
    holdings: "BTC/XRP strategy pending verification",
    treasuryNav: "Pending verification",
    treasuryNavValue: 0,
    marketCap: "$9.3M",
    marketCapValue: 0.00933,
    mnav: "Pending verification",
    model: "Operating company with dual-asset reserve",
    rating: { status: "pending" },
    dataNote:
      "Worksport has disclosed a BTC/XRP strategy, but exact BTC holdings and complete treasury NAV remain pending verification.",
    sources: [
      {
        label: "Worksport crypto treasury adoption release",
        url: "https://investors.worksport.com/post/worksport-wksp-to-adopt-cryptocurrency-bitcoin-and-xrp-for-corporate-treasury",
        date: "5 Dec 2024",
      },
      {
        label: "Worksport initial purchases release",
        url: "https://investors.worksport.com/post/worksport-wksp-initiates-bitcoin-btc-ripple-xrp-purchases-as-part-of-strategic-move-to-hedge-inflation-and-embrace-cryptocurrency-adoption",
        date: "29 Jan 2025",
      },
      {
        label: "ChartExchange market data",
        url: "https://chartexchange.com/symbol/nasdaq-wksp/",
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
    holdings: "560.0363 BTC · Last disclosed 27 Jan 2026",
    treasuryNav: "$35.9M",
    treasuryNavValue: 0.035887126,
    marketCap: "$63.0M",
    marketCapValue: 0.06301,
    mnav: "1.76x",
    model: "Infrastructure company with Bitcoin treasury allocation",
    rating: { status: "pending" },
    dataNote:
      "BTC quantity is the last exact public disclosure found, dated 27 Jan 2026. Later public updates disclosed combined cash and Bitcoin value without a refreshed BTC count.",
    sources: [
      {
        label: "Hyperscale Bitcoin treasury launch release",
        url: "https://www.prnewswire.com/news-releases/hyperscale-data-launches-100-million-bitcoin-treasury-strategy-as-part-of-ongoing-transformation-into-pure-play-ai-and-digital-asset-company-302556096.html",
        date: "15 Sep 2025",
      },
      {
        label: "Hyperscale BTC quantity release",
        url: "https://www.morningstar.com/news/pr-newswire/20260127sf71568/hyperscale-data-bitcoin-treasury-at-5600363-bitcoin",
        date: "27 Jan 2026",
      },
      {
        label: "Hyperscale SEC public update",
        url: "https://www.sec.gov/Archives/edgar/data/896493/000121465926005744/ex99_1.htm",
        date: "7 May 2026",
      },
      {
        label: "StockAnalysis market data",
        url: "https://stockanalysis.com/stocks/gpus/",
        date: "11 Aug 2026",
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
        <DatTrackerPrototype basePath="/tracker" companies={companies} publicMode />
      </Suspense>
    </>
  );
}
