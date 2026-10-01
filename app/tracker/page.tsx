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
    holdingInputs: {"BTC": 847666},
    dataNote: "Holdings and market values use the approved human-audited 30 Sep 2026 manifest. Historical source links are retained for reference; they were not rechecked for this implementation.",
    holdings: "847,666 BTC",
    treasuryNav: "$70.96B",
    treasuryNavValue: 70.96235919,
    marketCap: "$53.97B",
    marketCapValue: 53.96943006,
    mnav: "0.76x",
    model: "Levered Bitcoin treasury platform",
    sources: [
      {
        label: "Strategy SEC filing",
        url: "https://www.sec.gov/Archives/edgar/data/1050446/000119312526237907/mstr-ex99_1.htm",
        date: "18 Aug 2026",
      },
      {
        label: "CoinGecko public-company treasury data",
        url: "https://www.coingecko.com/en/treasuries/companies/strategy",
        date: "18 Aug 2026",
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
    asset: "Multi-Asset",
    assetLabel: "BTC / SOL",
    holdingInputs: {"BTC": 284, "SOL": 20423},
    dataNote: "Holdings and market values use the approved human-audited 30 Sep 2026 manifest. Historical source links are retained for reference; they were not rechecked for this implementation.",
    holdings: "284 BTC + 20,423 SOL",
    treasuryNav: "$26.2M",
    treasuryNavValue: 0.026189671,
    marketCap: "≈ $34.83M",
    marketCapValue: 0.03483,
    mnav: "1.33x",
    model: "Operating company with digital asset treasury",
    sources: [
      {
        label: "DigitalX Bitcoin Treasury page",
        url: "https://www.digitalx.com/bitcoin-treasury/",
        date: "18 Aug 2026",
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
    holdingInputs: {"BTC": 43000},
    dataNote: "Holdings and market values use the approved human-audited 30 Sep 2026 manifest. Historical source links are retained for reference; they were not rechecked for this implementation.",
    holdings: "43,000 BTC",
    treasuryNav: "$3.60B",
    treasuryNavValue: 3.599745,
    marketCap: "≈ $2.05B",
    marketCapValue: 2.05,
    mnav: "0.57x",
    model: "Asia-focused Bitcoin treasury company",
    sources: [
      {
        label: "Metaplanet treasury dashboard",
        url: "https://treasury.metaplanet.jp/",
        date: "18 Aug 2026",
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
    holdingInputs: {},
    dataNote: "Holdings remain pending verification and are excluded from aggregate Treasury NAV. The shareholder BTC/XRP benefit program is not corporate treasury holdings.",
    holdings: "Pending verification",
    treasuryNav: "Pending verification",
    treasuryNavValue: 0.0,
    marketCap: "≈ $92.1M",
    marketCapValue: 0.0921,
    mnav: "Pending verification",
    model: "Blockchain operating company with BTC and XRP exposure",
    sources: [
      {
        label: "CoinGecko public-company treasury data",
        url: "https://www.coingecko.com/en/treasuries/companies/gumi-inc",
        date: "11 Aug 2026",
      },
      {
        label: "gumi IR information",
        url: "https://gu3.co.jp/ir/information/",
        date: "18 Aug 2026",
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
    exchange: "NYSE American",
    country: "United States",
    asset: "Ethereum",
    assetLabel: "ETH",
    holdingInputs: {"ETH": 6001302, "BTC": 213},
    dataNote: "Holdings and market values use the approved human-audited 30 Sep 2026 manifest. Historical source links are retained for reference; they were not rechecked for this implementation.",
    holdings: "6,001,302 ETH + 213 BTC",
    treasuryNav: "$16.16B",
    treasuryNavValue: 16.162173857,
    marketCap: "$14.58B",
    marketCapValue: 14.583774178,
    mnav: "0.90x",
    model: "Ethereum treasury and mining infrastructure",
    rating: { status: "pending" },
    sources: [
      {
        label: "BitMine public holdings release",
        url: "https://www.prnewswire.com/news-releases/bitmine-immersion-technologies-bmnr-announces-eth-holdings-reach-5-82-million-tokens-and-total-crypto-and-total-cash-holdings-of-11-4-billion-302852583.html",
        date: "17 Aug 2026",
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
    holdingInputs: {"ETH": 892127},
    dataNote: "Holdings and market values use the approved human-audited 30 Sep 2026 manifest. Historical source links are retained for reference; they were not rechecked for this implementation.",
    holdings: "892,127 ETH",
    treasuryNav: "$2.40B",
    treasuryNavValue: 2.399946528,
    marketCap: "$1.95B",
    marketCapValue: 1.946796754,
    mnav: "0.81x",
    model: "Ethereum treasury vehicle",
    rating: { status: "pending" },
    sources: [
      {
        label: "SharpLink Form 8-K",
        url: "https://www.sec.gov/Archives/edgar/data/1981535/000149315226031202/form8-k.htm",
        date: "30 Jun 2026",
      },
      {
        label: "SharpLink public dashboard",
        url: "https://www.sharplink.com/dashboard?lang=en_US",
        date: "18 Aug 2026",
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
    holdingInputs: {"SOL": 460017},
    dataNote: "Holdings and market values use the approved human-audited 30 Sep 2026 manifest. Historical source links are retained for reference; they were not rechecked for this implementation.",
    holdings: "460,017 SOL",
    treasuryNav: "$54.4M",
    treasuryNavValue: 0.05438781,
    marketCap: "≈ $66.2M",
    marketCapValue: 0.0662,
    mnav: "1.22x",
    model: "Solana treasury and validator exposure",
    rating: { status: "pending" },
    sources: [
      {
        label: "SOL Strategies monthly business update",
        url: "https://www.newsfilecorp.com/release/303711/SOL-Strategies-June-2026-Monthly-Business-Update",
        date: "2 Jul 2026",
      },
      {
        label: "StockAnalysis market data",
        url: "https://stockanalysis.com/stocks/stke/statistics/",
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
    holdingInputs: {"SOL": 2490304},
    dataNote: "Holdings and market values use the approved human-audited 30 Sep 2026 manifest. Historical source links are retained for reference; they were not rechecked for this implementation.",
    holdings: "2,490,304 SOL",
    treasuryNav: "$294.4M",
    treasuryNavValue: 0.294428642,
    marketCap: "$146.9M",
    marketCapValue: 0.14687487,
    mnav: "0.50x",
    model: "Solana accumulation and ecosystem exposure",
    rating: { status: "pending" },
    sources: [
      {
        label: "DeFi Development Corp. public disclosure",
        url: "https://www.sec.gov/Archives/edgar/data/1805526/000180552626000031/dfdv-exx991.htm",
        date: "13 May 2026",
      },
      {
        label: "StockAnalysis market data",
        url: "https://stockanalysis.com/stocks/dfdv/statistics/",
        date: "17 Aug 2026",
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
    holdingInputs: {},
    dataNote: "Holdings remain pending verification and are excluded from aggregate Treasury NAV.",
    holdings: "Pending verification",
    treasuryNav: "Pending verification",
    treasuryNavValue: 0.0,
    marketCap: "≈ $150M",
    marketCapValue: 0.15,
    mnav: "Pending verification",
    model: "Operating company with Bitcoin balance sheet",
    rating: { status: "pending" },
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
    holdingInputs: {"BTC": 27462},
    dataNote: "Holdings and market values use the approved human-audited 30 Sep 2026 manifest. Historical source links are retained for reference; they were not rechecked for this implementation.",
    holdings: "27,462 BTC",
    treasuryNav: "$2.30B",
    treasuryNavValue: 2.29898133,
    marketCap: "$2.21B",
    marketCapValue: 2.213861454,
    mnav: "0.96x",
    model: "Bitcoin treasury platform",
    rating: { status: "pending" },
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
        date: "17 Aug 2026",
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
    holdingInputs: {"SOL": 2340000},
    dataNote: "Holdings and market values use the approved human-audited 30 Sep 2026 manifest. Historical source links are retained for reference; they were not rechecked for this implementation. Holdings are approximate; the calculation input is 2,340,000 SOL.",
    holdings: "Approximately 2.34 million SOL",
    treasuryNav: "≈ $276.7M",
    treasuryNavValue: 0.2766582,
    marketCap: "$74.7M",
    marketCapValue: 0.074677794,
    mnav: "≈ 0.27x",
    model: "Solana treasury strategy",
    rating: { status: "pending" },
    sources: [
      {
        label: "Upexi Form 10-Q",
        url: "https://ir.upexi.com/sec-filings/all-sec-filings/content/0001477932-26-003001/0001477932-26-003001.pdf",
        date: "12 May 2026",
      },
      {
        label: "StockAnalysis market data",
        url: "https://stockanalysis.com/stocks/upxi/statistics/",
        date: "17 Aug 2026",
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
    dataNote: "Holdings remain pending verification and are excluded from aggregate Treasury NAV.",
    holdings: "Pending verification",
    treasuryNav: "Pending verification",
    treasuryNavValue: 0.0,
    marketCap: "$7.1M",
    marketCapValue: 0.007075479,
    mnav: "Pending verification",
    model: "Operating company with dual-asset reserve",
    rating: { status: "pending" },
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
        date: "17 Aug 2026",
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
    holdingInputs: {"BTC": 219.0652},
    dataNote: "Holdings and market values use the approved human-audited 30 Sep 2026 manifest. Historical source links are retained for reference; they were not rechecked for this implementation.",
    holdings: "219.0652 BTC",
    treasuryNav: "$18.3M",
    treasuryNavValue: 0.018339043,
    marketCap: "$78.2M",
    marketCapValue: 0.078173032,
    mnav: "4.26x",
    model: "Infrastructure company with Bitcoin treasury allocation",
    rating: { status: "pending" },
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
        date: "17 Aug 2026",
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
