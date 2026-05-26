"use client";

import { useState } from "react";

const sampleReports: Record<string, any> = {
  "ASX:NOR": {
    company: "Norwood Systems Ltd",
    ticker: "ASX:NOR",
    score: "7.5 / 10",
    rating: "Viable but elevated risk",
    summary:
      "Norwood Systems Ltd is a small-cap ASX-listed technology company with weak financials but potential for a conservative digital asset treasury strategy.",
  },
};

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [report, setReport] = useState<any | null>(null);

  function generateReport() {
    const key = ticker.toUpperCase().trim();
    setReport(sampleReports[key] || null);
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-4 pb-16">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto text-center mb-6">
        <h1 className="text-4xl font-bold mb-4">DATX</h1>

        <p className="text-gray-400 mb-4">
          DATX evaluates public companies for digital asset treasury strategies —
          delivering a score, strategic insight, and allocation framework in seconds.
        </p>
      </div>

      {/* INPUT */}
      <div className="max-w-md mx-auto flex gap-2 mb-8">
        <input
          className="flex-1 p-3 rounded bg-gray-900 border border-gray-700 text-white"
          placeholder="Enter ticker (ASX:NOR)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button
          onClick={generateReport}
          className="bg-blue-600 px-4 rounded hover:bg-blue-500"
        >
          Generate
        </button>
      </div>

      {/* REPORT PREVIEW */}
      {report && (
        <div className="max-w-md mx-auto bg-white text-black p-6 rounded-xl shadow-xl mb-8">
          <h2 className="text-xl font-bold">{report.company}</h2>
          <p className="mt-2">Score: {report.score}</p>
          <p className="mt-1 text-sm text-gray-500">{report.rating}</p>
          <p className="mt-4 text-gray-700">{report.summary}</p>
        </div>
      )}

      {/* LOCKED FULL REPORT */}
      {report && (
        <div className="max-w-4xl mx-auto mb-12 rounded-2xl border border-blue-900/50 bg-gray-950 p-6 shadow-2xl">
          
          {/* HEADER */}
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold tracking-widest text-blue-400">
              FULL DATX REPORT LOCKED
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              Unlock the complete treasury strategy report
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Includes balance sheet analysis, DATX scorecard, allocation framework,
              capital strategy, scenario analysis, risks, and conclusion.
            </p>
          </div>

          {/* LOCKED CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <LockedCard title="Balance Sheet Snapshot">
              Cash, assets, liabilities, equity, and financial health interpretation.
            </LockedCard>

            <LockedCard title="DATX Scorecard">
              Narrative strength, balance sheet flexibility, investor appeal, and strategic fit.
            </LockedCard>

            <LockedCard title="Treasury Allocation">
              BTC, ETH, digital assets, and cash allocation with rationale.
            </LockedCard>

            <LockedCard title="Capital Strategy">
              Suggested capital raise structure and deployment strategy.
            </LockedCard>

            <LockedCard title="Narrative Shift">
              Repositioning the company as a digital asset treasury story.
            </LockedCard>

            <LockedCard title="Scenario Analysis">
              Bear, base, and bull case outcomes over a 3-year horizon.
            </LockedCard>

            <LockedCard title="Key Risks">
              Liquidity, dilution, volatility, and regulatory considerations.
            </LockedCard>

            <LockedCard title="Conclusion">
              Final suitability assessment and execution considerations.
            </LockedCard>

          </div>

          {/* $49 REPORT CTA */}
          <div className="mt-8 rounded-xl border border-blue-800 bg-blue-950/40 p-5 text-center">
            <p className="text-lg font-bold">Full Report — $49</p>
            <p className="mt-2 text-sm text-gray-300">
              Download the complete DATX PDF report for {report.company}.
            </p>

            <button className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500">
              Unlock Full Report
            </button>

            <p className="mt-3 text-xs text-gray-500">
              Payment integration coming soon. Prototype only.
            </p>
          </div>

          {/* 🔥 ADVISORY SECTION */}
          <div className="mt-5 rounded-xl border border-gray-800 bg-gray-900 p-5 text-center">
            <p className="text-lg font-bold">DATX Strategy Session — $299</p>

            <p className="mt-2 text-sm text-gray-300">
              Book a direct advisory session to review the DATX report, discuss treasury strategy options,
              and explore next steps.
            </p>

            <ul className="mt-4 text-left text-sm text-gray-400 max-w-md mx-auto space-y-2">
              <li>• 30–45 minute strategy discussion</li>
              <li>• Review of DATX score and positioning</li>
              <li>• Treasury allocation walkthrough</li>
              <li>• Capital strategy and execution pathways</li>
            </ul>

            <button className="mt-5 rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200">
              Book Strategy Session
            </button>

            <p className="mt-3 text-xs text-gray-500">
              Strategic discussion only. Not financial, legal, or investment advice.
            </p>
          </div>

        </div>
      )}

      {/* FEATURES */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <h3 className="text-base font-semibold mb-2">DATX Score</h3>
          <p className="text-gray-400 text-sm">
            Evaluate treasury strategy suitability using financial and strategic signals.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <h3 className="text-base font-semibold mb-2">Balance Sheet Insight</h3>
          <p className="text-gray-400 text-sm">
            Understand liquidity, capital structure, and financial flexibility.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <h3 className="text-base font-semibold mb-2">Treasury Allocation</h3>
          <p className="text-gray-400 text-sm">
            View a structured digital asset allocation framework.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-24 text-center opacity-70">
        <p className="text-xs">
          Built for public company analysis • AI-assisted • Not financial advice
        </p>
      </div>

    </main>
  );
}

function LockedCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900 p-5">
      <div className="absolute right-4 top-4 rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
        Locked
      </div>

      <h3 className="pr-20 text-base font-semibold">{title}</h3>
      <p className="mt-3 text-sm text-gray-400 blur-[1px]">{children}</p>
    </div>
  );
}