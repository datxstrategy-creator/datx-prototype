"use client";

import { ChangeEvent, useMemo, useState } from "react";

type Method = "manual" | "upload";
type SelectLevel = "low" | "moderate" | "high";

type FormState = {
  companyName: string;
  ticker: string;
  exchange: string;
  country: string;
  industry: string;
  cashBalance: number;
  totalDebt: number;
  marketCap: number;
  annualRevenue: number;
  annualCashBurn: number;
  sharesOutstanding: number;
  governanceReadiness: SelectLevel;
  strategicFit: SelectLevel;
  executionComplexity: SelectLevel;
};

type ComponentScore = {
  name: string;
  points: number;
  max: number;
  grade: string;
  note: string;
};

const initialForm: FormState = {
  companyName: "Example Listed Company",
  ticker: "DATX",
  exchange: "NASDAQ",
  country: "United States",
  industry: "Enterprise software",
  cashBalance: 10000000,
  totalDebt: 2500000,
  marketCap: 85000000,
  annualRevenue: 22000000,
  annualCashBurn: 3000000,
  sharesOutstanding: 42000000,
  governanceReadiness: "moderate",
  strategicFit: "high",
  executionComplexity: "moderate",
};

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const scenarioColors = {
  cash: "#9bb8d2",
  allocation20: "#c9ad62",
  allocation40: "#65a9d6",
  allocation60: "#7bc3a5",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function scoreToGrade(score: number, max: number) {
  const ratio = max === 0 ? 0 : score / max;

  if (ratio >= 0.9) return "A";
  if (ratio >= 0.8) return "B";
  if (ratio >= 0.65) return "C";
  if (ratio >= 0.5) return "D";
  return "F";
}

function levelScore(level: SelectLevel, max: number, inverted = false) {
  const ratios: Record<SelectLevel, number> = inverted
    ? { low: 1, moderate: 0.65, high: 0.25 }
    : { low: 0.35, moderate: 0.68, high: 1 };

  return Math.round(max * ratios[level]);
}

function calculateScores(form: FormState) {
  const runwayYears =
    form.annualCashBurn <= 0 ? 6 : form.cashBalance / form.annualCashBurn;
  const debtToCash =
    form.cashBalance <= 0 ? Number.POSITIVE_INFINITY : form.totalDebt / form.cashBalance;
  const cashToMarketCap =
    form.marketCap <= 0 ? 0 : form.cashBalance / form.marketCap;
  const cashToRevenue =
    form.annualRevenue <= 0 ? 0 : form.cashBalance / form.annualRevenue;

  const cashRunway = Math.round(clamp((runwayYears / 5) * 20, 0, 20));
  const debtPressure = Math.round(clamp((1 - debtToCash / 2) * 15, 0, 15));
  const treasuryFlexibility = Math.round(
    clamp((cashToMarketCap / 0.25) * 10, 0, 10) +
      clamp((cashToRevenue / 0.75) * 10, 0, 10),
  );
  const strategicFit = levelScore(form.strategicFit, 20);
  const governance = levelScore(form.governanceReadiness, 15);
  const execution = levelScore(form.executionComplexity, 10, true);

  const components: ComponentScore[] = [
    {
      name: "Cash runway",
      points: cashRunway,
      max: 20,
      grade: scoreToGrade(cashRunway, 20),
      note:
        form.annualCashBurn <= 0
          ? "Positive or neutral burn profile."
          : `${runwayYears.toFixed(1)} years of runway implied by current cash and burn.`,
    },
    {
      name: "Debt pressure",
      points: debtPressure,
      max: 15,
      grade: scoreToGrade(debtPressure, 15),
      note: `${(debtToCash * 100).toFixed(0)}% debt-to-cash burden.`,
    },
    {
      name: "Treasury flexibility",
      points: treasuryFlexibility,
      max: 20,
      grade: scoreToGrade(treasuryFlexibility, 20),
      note: "Composite of cash versus market capitalization and annual revenue.",
    },
    {
      name: "Strategic fit",
      points: strategicFit,
      max: 20,
      grade: scoreToGrade(strategicFit, 20),
      note: `${form.strategicFit} digital asset alignment selected.`,
    },
    {
      name: "Governance readiness",
      points: governance,
      max: 15,
      grade: scoreToGrade(governance, 15),
      note: `${form.governanceReadiness} board, policy, and controls readiness selected.`,
    },
    {
      name: "Execution complexity",
      points: execution,
      max: 10,
      grade: scoreToGrade(execution, 10),
      note: `${form.executionComplexity} implementation complexity selected.`,
    },
  ];

  const total = components.reduce((sum, component) => sum + component.points, 0);

  return {
    components,
    total,
    grade: scoreToGrade(total, 100),
    runwayYears,
    debtToCash,
    cashToMarketCap,
  };
}

function getRecommendation(score: number) {
  if (score >= 80) {
    return "Strong candidate for further digital asset treasury evaluation";
  }

  if (score >= 60) {
    return "Potential candidate, requires governance and risk review";
  }

  if (score >= 40) {
    return "Monitor only, not ready for immediate implementation";
  }

  return "Not suitable under current financial conditions";
}

function buildScenarios(cashBalance: number) {
  const allocations = [
    { key: "cash", label: "Cash purchasing power", allocation: 0, color: scenarioColors.cash },
    { key: "allocation20", label: "20% digital asset allocation", allocation: 0.2, color: scenarioColors.allocation20 },
    { key: "allocation40", label: "40% digital asset allocation", allocation: 0.4, color: scenarioColors.allocation40 },
    { key: "allocation60", label: "60% digital asset allocation", allocation: 0.6, color: scenarioColors.allocation60 },
  ];

  return allocations.map((scenario) => {
    const points = Array.from({ length: 11 }, (_, year) => {
      const cashPortion =
        cashBalance * (1 - scenario.allocation) * Math.pow(0.97, year);
      const assetPortion =
        cashBalance * scenario.allocation * Math.pow(1.18, year);

      return {
        year,
        value: cashPortion + assetPortion,
      };
    });

    return { ...scenario, points };
  });
}

function toPath(points: { year: number; value: number }[], maxValue: number) {
  const width = 620;
  const height = 260;
  const left = 44;
  const right = 20;
  const top = 18;
  const bottom = 34;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;

  return points
    .map((point, index) => {
      const x = left + (point.year / 10) * chartWidth;
      const y = top + chartHeight - (point.value / maxValue) * chartHeight;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function RiskFlags({
  runwayYears,
  debtToCash,
  cashToMarketCap,
  form,
}: {
  runwayYears: number;
  debtToCash: number;
  cashToMarketCap: number;
  form: FormState;
}) {
  const flags = [
    runwayYears < 2 ? "Limited runway under current burn assumptions" : null,
    debtToCash > 1 ? "Debt exceeds cash balance" : null,
    cashToMarketCap < 0.05 ? "Cash position is small relative to market capitalization" : null,
    form.governanceReadiness === "low" ? "Governance readiness requires material work" : null,
    form.executionComplexity === "high" ? "High execution complexity may slow implementation" : null,
  ].filter(Boolean);

  if (flags.length === 0) {
    flags.push("No major rule-based risk flags triggered by current inputs");
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {flags.map((flag) => (
        <div
          key={flag}
          className="border border-datx-line bg-[#07101a] px-4 py-3 text-sm text-datx-mist"
        >
          {flag}
        </div>
      ))}
    </div>
  );
}

function ScenarioChart({ cashBalance }: { cashBalance: number }) {
  const scenarios = buildScenarios(Math.max(cashBalance, 0));
  const maxValue = Math.max(
    1,
    ...scenarios.flatMap((scenario) => scenario.points.map((point) => point.value)),
  );
  const cashEnding = scenarios[0].points[10].value;

  return (
    <div className="surface p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-datx-accent">
            Scenario Engine
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            10-year treasury value projection
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-datx-mist">
          Cash erodes at 3% annually. Allocated digital assets compound at an
          18% base-case CAGR while unallocated cash still erodes.
        </p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <svg
          className="min-w-[620px]"
          viewBox="0 0 620 260"
          role="img"
          aria-label="10-year DATX treasury scenario chart"
        >
          {[0.25, 0.5, 0.75, 1].map((tick) => (
            <g key={tick}>
              <line
                x1="44"
                x2="600"
                y1={18 + 208 - tick * 208}
                y2={18 + 208 - tick * 208}
                stroke="#203246"
                strokeWidth="1"
              />
              <text
                x="0"
                y={22 + 208 - tick * 208}
                fill="#7f93a7"
                fontSize="11"
              >
                {moneyFormatter.format(maxValue * tick)}
              </text>
            </g>
          ))}
          <line x1="44" x2="600" y1="226" y2="226" stroke="#38506a" />
          {[0, 2, 4, 6, 8, 10].map((year) => (
            <text
              key={year}
              x={44 + (year / 10) * 556}
              y="250"
              fill="#7f93a7"
              fontSize="11"
              textAnchor="middle"
            >
              Y{year}
            </text>
          ))}
          {scenarios.map((scenario) => (
            <path
              key={scenario.key}
              d={toPath(scenario.points, maxValue)}
              fill="none"
              stroke={scenario.color}
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {scenarios.map((scenario) => {
          const ending = scenario.points[10].value;
          const delta = ending - cashEnding;

          return (
            <div key={scenario.key} className="border border-datx-line bg-[#07101a] p-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: scenario.color }}
                />
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-datx-accent">
                  {scenario.label}
                </p>
              </div>
              <p className="mt-3 text-lg font-semibold text-white">
                {moneyFormatter.format(ending)}
              </p>
              <p className="mt-1 text-xs text-datx-mist">
                {scenario.key === "cash"
                  ? "Baseline after cash erosion"
                  : `${moneyFormatter.format(delta)} versus cash-only`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function EngineClient() {
  const [method, setMethod] = useState<Method>("manual");
  const [form, setForm] = useState<FormState>(initialForm);
  const [hasRun, setHasRun] = useState(false);
  const [fileName, setFileName] = useState("");

  const result = useMemo(() => calculateScores(form), [form]);
  const recommendation = getRecommendation(result.total);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateNumber(key: keyof FormState, value: string) {
    const parsed = Number(value);
    updateField(key, Number.isFinite(parsed) ? Math.max(parsed, 0) : 0);
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    setFileName(event.target.files?.[0]?.name ?? "");
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-datx-line bg-datx-black/80 backdrop-blur">
        <div className="container-frame flex h-16 items-center justify-between">
          <div>
            <p className="text-lg font-semibold tracking-[0.18em] text-white">DATX</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-datx-accent">
              Treasury Intelligence Engine
            </p>
          </div>
          <div className="hidden text-right text-xs uppercase tracking-[0.14em] text-datx-mist sm:block">
            Public Prototype
          </div>
        </div>
      </header>

      <section className="container-frame py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-datx-gold">
              Rules-based MVP
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              DATX Treasury Intelligence Engine
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-datx-mist">
              A standalone prototype for screening public companies against
              digital asset treasury readiness factors using deterministic,
              manually entered data.
            </p>
          </div>

          <div className="surface grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-datx-accent">
                Current score
              </p>
              <p className="mt-2 text-4xl font-semibold text-white">
                {result.total}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-datx-accent">
                Letter grade
              </p>
              <p className="mt-2 text-4xl font-semibold text-datx-gold">
                {result.grade}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-datx-accent">
                Company
              </p>
              <p className="mt-3 text-sm font-medium text-white">
                {form.companyName}
              </p>
              <p className="text-xs text-datx-mist">
                {form.ticker} / {form.exchange}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="surface p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              {(["manual", "upload"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMethod(option)}
                  className={`h-11 flex-1 rounded-sm border px-4 text-sm font-medium transition-colors ${
                    method === option
                      ? "border-datx-gold bg-datx-gold text-datx-black"
                      : "border-datx-line bg-[#07101a] text-datx-mist hover:border-datx-blue"
                  }`}
                >
                  {option === "manual" ? "Manual input" : "Upload report / presentation"}
                </button>
              ))}
            </div>

            {method === "upload" ? (
              <div className="mt-6 border border-dashed border-datx-line bg-[#07101a] p-5">
                <p className="text-lg font-semibold text-white">
                  Upload annual report or investor presentation
                </p>
                <p className="mt-2 text-sm leading-6 text-datx-mist">
                  AI extraction will be added in a future version. For this
                  prototype, please use manual inputs.
                </p>
                <label className="mt-5 flex min-h-32 cursor-pointer flex-col items-center justify-center border border-datx-line bg-datx-panel-soft p-5 text-center transition-colors hover:border-datx-blue">
                  <span className="text-sm font-medium text-white">
                    {fileName || "Select a PDF file"}
                  </span>
                  <span className="mt-2 text-xs text-datx-mist">
                    Placeholder only, no extraction will run
                  </span>
                  <input
                    className="sr-only"
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleFile}
                  />
                </label>
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="companyName">
                  Company name
                </label>
                <input
                  id="companyName"
                  className="field"
                  value={form.companyName}
                  onChange={(event) => updateField("companyName", event.target.value)}
                />
              </div>
              <div>
                <label className="label" htmlFor="ticker">
                  Ticker
                </label>
                <input
                  id="ticker"
                  className="field"
                  value={form.ticker}
                  onChange={(event) => updateField("ticker", event.target.value.toUpperCase())}
                />
              </div>
              <div>
                <label className="label" htmlFor="exchange">
                  Exchange
                </label>
                <input
                  id="exchange"
                  className="field"
                  value={form.exchange}
                  onChange={(event) => updateField("exchange", event.target.value)}
                />
              </div>
              <div>
                <label className="label" htmlFor="country">
                  Country / jurisdiction
                </label>
                <input
                  id="country"
                  className="field"
                  value={form.country}
                  onChange={(event) => updateField("country", event.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="industry">
                  Industry
                </label>
                <input
                  id="industry"
                  className="field"
                  value={form.industry}
                  onChange={(event) => updateField("industry", event.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["cashBalance", "Cash balance"],
                ["totalDebt", "Total debt / liabilities"],
                ["marketCap", "Market cap"],
                ["annualRevenue", "Annual revenue"],
                ["annualCashBurn", "Annual cash burn"],
                ["sharesOutstanding", "Shares outstanding"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="label" htmlFor={key}>
                    {label}
                  </label>
                  <input
                    id={key}
                    className="field"
                    type="number"
                    min="0"
                    value={form[key as keyof FormState]}
                    onChange={(event) =>
                      updateNumber(key as keyof FormState, event.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["governanceReadiness", "Governance readiness"],
                ["strategicFit", "Digital asset strategic fit"],
                ["executionComplexity", "Execution complexity"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="label" htmlFor={key}>
                    {label}
                  </label>
                  <select
                    id={key}
                    className="field"
                    value={form[key as keyof FormState]}
                    onChange={(event) =>
                      updateField(key as keyof FormState, event.target.value as never)
                    }
                  >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setHasRun(true)}
              className="mt-7 h-12 w-full rounded-sm bg-slate-100 px-5 text-sm font-semibold text-datx-black transition-colors hover:bg-white"
            >
              Run DATX Analysis
            </button>
          </section>

          <section className="space-y-6">
            <div className="surface p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-datx-accent">
                    Overall DATX Treasury Readiness Score
                  </p>
                  <div className="mt-3 flex items-end gap-3">
                    <span className="text-6xl font-semibold text-white">
                      {result.total}
                    </span>
                    <span className="pb-2 text-lg text-datx-mist">/ 100</span>
                  </div>
                </div>
                <div className="flex h-24 w-24 items-center justify-center border border-datx-line bg-[#07101a] text-4xl font-semibold text-datx-gold">
                  {result.grade}
                </div>
              </div>
              <div className="mt-6 border border-datx-line bg-[#07101a] p-4">
                <p className="text-sm font-medium text-white">{recommendation}</p>
                <p className="mt-2 text-sm leading-6 text-datx-mist">
                  {hasRun
                    ? `${form.companyName} shows a ${result.grade} readiness profile. The model weighs liquidity runway, debt pressure, treasury flexibility, strategic alignment, governance maturity, and implementation complexity.`
                    : "Adjust inputs and run the analysis to generate a deterministic prototype assessment."}
                </p>
              </div>
            </div>

            <div className="surface p-5 sm:p-6">
              <h2 className="text-xl font-semibold text-white">Component scorecard</h2>
              <div className="mt-5 space-y-3">
                {result.components.map((component) => (
                  <div key={component.name} className="border border-datx-line bg-[#07101a] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-white">{component.name}</p>
                        <p className="mt-1 text-xs text-datx-mist">{component.note}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">
                          {component.points}/{component.max}
                        </p>
                        <p className="text-sm text-datx-gold">Grade {component.grade}</p>
                      </div>
                    </div>
                    <div className="mt-3 h-2 bg-datx-line">
                      <div
                        className="h-2 bg-datx-gold"
                        style={{ width: `${(component.points / component.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface p-5 sm:p-6">
              <h2 className="text-xl font-semibold text-white">Risk flags</h2>
              <div className="mt-4">
                <RiskFlags
                  runwayYears={result.runwayYears}
                  debtToCash={result.debtToCash}
                  cashToMarketCap={result.cashToMarketCap}
                  form={form}
                />
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6">
          <ScenarioChart cashBalance={form.cashBalance} />
        </div>

        <footer className="mt-8 border-t border-datx-line py-6 text-sm leading-6 text-datx-mist">
          <p>
            DATX Engine output is for informational and educational purposes only
            and does not constitute financial, investment, legal, or tax advice.
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-datx-accent">
            Standalone prototype. No external APIs. No AI extraction implemented.
          </p>
        </footer>
      </section>
    </main>
  );
}
