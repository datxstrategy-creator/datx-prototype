"use client";

import { useState } from "react";
import Link from "next/link";
import type { CompanyReport } from "./company-reports";

type ScoreCategory = {
  label: string;
  score: number;
  max: number;
};

const treasuryAssessmentHref = "/";

function confidenceStars(confidence: number) {
  return "★★★★★".slice(0, confidence) + "☆☆☆☆☆".slice(confidence);
}

function gradeTone(grade: string) {
  if (grade.startsWith("A")) {
    return "border-teal-300/45 bg-teal-400/12 text-teal-50";
  }

  if (grade.startsWith("B")) {
    return "border-sky-300/45 bg-sky-400/12 text-sky-50";
  }

  if (grade.startsWith("C")) {
    return "border-amber-300/45 bg-amber-400/12 text-amber-50";
  }

  return "border-red-300/45 bg-red-400/12 text-red-50";
}

function AssetBadge({ asset }: { asset: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-sm border border-orange-300/35 bg-orange-400/10 px-2.5 py-1.5 text-xs font-semibold text-orange-100">
      <span className="h-2 w-2 rounded-full bg-orange-400" />
      <span className="font-mono">{asset}</span>
    </span>
  );
}

function ScoreRadar({ categories }: { categories: ScoreCategory[] }) {
  const center = 90;
  const radius = 62;
  const labelRadius = 80;
  const points = categories.map((category, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / categories.length;
    const valueRadius = radius * (category.score / category.max);

    return {
      category,
      x: center + Math.cos(angle) * valueRadius,
      y: center + Math.sin(angle) * valueRadius,
      axisX: center + Math.cos(angle) * radius,
      axisY: center + Math.sin(angle) * radius,
      labelX: center + Math.cos(angle) * labelRadius,
      labelY: center + Math.sin(angle) * labelRadius,
    };
  });
  const polygon = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <figure className="rounded-sm border border-datx-line bg-[#07111d] p-4">
      <div className="flex items-center justify-between gap-3">
        <figcaption className="text-sm font-semibold text-white">
          TQS category radar
        </figcaption>
        <span className="text-xs text-slate-500">Normalized by category max</span>
      </div>
      <svg
        aria-label={`Radar chart for ${categories
          .map((category) => `${category.label}: ${category.score} of ${category.max}`)
          .join(", ")}`}
        className="mt-3 h-auto w-full max-w-[360px]"
        role="img"
        viewBox="0 0 180 180"
      >
        {[0.25, 0.5, 0.75, 1].map((step) => {
          const ring = points
            .map((point) => {
              const x = center + (point.axisX - center) * step;
              const y = center + (point.axisY - center) * step;
              return `${x},${y}`;
            })
            .join(" ");

          return (
            <polygon
              fill="none"
              key={step}
              points={ring}
              stroke="rgba(140,172,204,0.18)"
              strokeWidth="1"
            />
          );
        })}
        {points.map((point) => (
          <line
            key={point.category.label}
            stroke="rgba(140,172,204,0.2)"
            strokeWidth="1"
            x1={center}
            x2={point.axisX}
            y1={center}
            y2={point.axisY}
          />
        ))}
        <polygon
          fill="rgba(45, 212, 191, 0.18)"
          points={polygon}
          stroke="rgba(94, 234, 212, 0.82)"
          strokeWidth="2"
        />
        {points.map((point) => (
          <circle
            cx={point.x}
            cy={point.y}
            fill="#c9ad62"
            key={point.category.label}
            r="2.5"
          />
        ))}
        {points.map((point) => (
          <text
            className="fill-slate-400 text-[7px]"
            key={point.category.label}
            textAnchor={
              point.labelX < center - 6
                ? "end"
                : point.labelX > center + 6
                  ? "start"
                  : "middle"
            }
            x={point.labelX}
            y={point.labelY}
          >
            {point.category.label
              .replace("Treasury ", "")
              .replace(" & ", " + ")
              .replace("Operating Business Strength", "OBS")
              .replace("Governance + Risk Controls", "Gov + Risk")
              .replace("Execution + Transparency", "Execution")}
          </text>
        ))}
      </svg>
    </figure>
  );
}

function ScoreBars({ categories }: { categories: ScoreCategory[] }) {
  return (
    <div className="space-y-3">
      {categories.map((category) => {
        const percent = (category.score / category.max) * 100;

        return (
          <div
            className="rounded-sm border border-datx-line bg-[#07111d] p-3"
            key={category.label}
          >
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="text-slate-200">{category.label}</span>
              <span className="font-mono text-slate-300">
                {category.score} / {category.max}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-teal-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-datx-line bg-[#091522] p-5 shadow-panel">
      <h2 className="text-xl font-light text-white">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ReportEngagementCta({ publicMode }: { publicMode: boolean }) {
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  return (
    <section className="border border-datx-line bg-[#07111d] p-5 shadow-panel sm:p-6">
      <div className="flex flex-col gap-3 border-b border-datx-line pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Was this report useful?</p>
          {feedback ? (
            <p className="mt-1 text-xs text-slate-500">
              {publicMode ? "Feedback captured." : "Feedback captured for prototype evaluation."}
            </p>
          ) : null}
        </div>
        <div className="flex gap-2">
          {(["yes", "no"] as const).map((value) => (
            <button
              aria-pressed={feedback === value}
              className={`rounded-sm border px-4 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-datx-accent ${
                feedback === value
                  ? "border-datx-gold bg-datx-gold/15 text-white"
                  : "border-datx-line bg-[#091522] text-slate-300 hover:border-datx-blue hover:text-white"
              }`}
              key={value}
              onClick={() => setFeedback(value)}
              type="button"
            >
              {value === "yes" ? "Yes" : "No"}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-datx-accent">
              Is your company evaluating a digital asset treasury strategy?
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              DATX provides independent Treasury Quality Assessments, board-level
              treasury analysis, and access to strategic advisory and implementation
              support for qualified public companies.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
            <Link className="button-primary" href={treasuryAssessmentHref}>
              Request Treasury Assessment
            </Link>
            <Link
              className="inline-flex items-center justify-center px-1 py-2 text-sm font-medium text-datx-accent transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-datx-accent"
              href={treasuryAssessmentHref}
            >
              Learn about DATX Advisory →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CompanyReportTemplate({ report }: { report: CompanyReport }) {
  return (
    <CompanyReportContent
      basePath="/dat-tracker-prototype"
      publicMode={false}
      report={report}
    />
  );
}

export function CompanyReportContent({
  report,
  basePath,
  publicMode,
}: {
  report: CompanyReport;
  basePath: string;
  publicMode: boolean;
}) {
  const totalMax = report.categories.reduce((sum, category) => sum + category.max, 0);
  const totalScore = report.categories.reduce(
    (sum, category) => sum + category.score,
    0,
  );
  const obsMax = report.obsSubcategories.reduce((sum, item) => sum + item.max, 0);
  const obsScore = report.obsSubcategories.reduce((sum, item) => sum + item.score, 0);

  return (
    <main className="min-h-screen bg-datx-black text-slate-100">
      <section className="border-b border-datx-line bg-[#050910]">
        <div className="container-frame py-10 sm:py-14">
          {publicMode ? (
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-400">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link className="transition hover:text-white" href="/tracker">DATX Tracker</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-slate-200">{report.companyName} Company Report</li>
              </ol>
            </nav>
          ) : (
            <Link className="button-secondary mb-8" href={basePath}>Back to DAT Tracker</Link>
          )}
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
            <div>
              <p className="eyebrow">
                DATX Company Report · {publicMode ? "Public Data" : "Prototype Data"}
              </p>
              <h1 className="mt-4 text-4xl font-light tracking-tight text-white sm:text-5xl">
                {report.companyName}
              </h1>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="border border-datx-line bg-[#091522] px-2 py-1">
                  {report.ticker} · {report.exchange}
                </span>
                <span className="border border-datx-line bg-[#091522] px-2 py-1">
                  {report.country}
                </span>
                <span className="border border-datx-line bg-[#091522] px-2 py-1">
                  Treasury model: {report.treasuryModel}
                </span>
                <span className="border border-datx-line bg-[#091522] px-2 py-1">
                  Last reviewed: {report.lastReviewed}
                </span>
              </div>
              <div className="mt-4">
                <AssetBadge asset={report.primaryAsset} />
              </div>
            </div>

            <aside className="rounded-sm border border-datx-line bg-[#091522] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-datx-accent">
                DATX Treasury Quality Score™
              </p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-6xl font-semibold leading-none text-white">
                    {report.score}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">out of {report.maxScore}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex rounded-sm border px-3 py-2 text-xl font-semibold ${gradeTone(
                      report.grade,
                    )}`}
                  >
                    {report.grade}
                  </span>
                  <p className="mt-2 font-mono text-xs text-slate-300">
                    {confidenceStars(report.confidence)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Confidence {report.confidence}/5
                  </p>
                </div>
              </div>
            </aside>
          </div>
          <p className="mt-8 max-w-5xl border-t border-datx-line pt-5 text-sm leading-7 text-slate-400">
            {report.disclaimer}
          </p>
          {report.reviewNotice ? (
            <div className="mt-5 max-w-5xl border border-amber-300/30 bg-amber-400/10 p-4 text-sm leading-7 text-amber-100">
              <p className="font-semibold text-amber-50">Analyst review notice</p>
              <p className="mt-2 text-amber-100/85">{report.reviewNotice}</p>
            </div>
          ) : null}
        </div>
      </section>

      <div className="container-frame space-y-8 py-8 sm:py-10">
        <SectionCard title="Executive Summary">
          <p className="max-w-4xl text-lg leading-8 text-slate-200">
            {report.verdict.summary}
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {report.verdict.paragraphs.map((paragraph) => (
              <p className="text-sm leading-7 text-slate-400" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Main Scorecard">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-datx-line bg-[#0a1624] text-left text-xs uppercase tracking-[0.12em] text-slate-500">
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-right">Maximum</th>
                  <th className="px-4 py-3 text-right">Score</th>
                  <th className="px-4 py-3">Assessment</th>
                </tr>
              </thead>
              <tbody>
                {report.categories.map((category) => (
                  <tr className="border-b border-datx-line/70" key={category.label}>
                    <td className="px-4 py-3 text-slate-200">{category.label}</td>
                    <td className="px-4 py-3 text-right font-mono text-slate-300">
                      {category.max}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-white">
                      {category.score}
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {category.assessment}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-teal-300/35 bg-teal-400/5">
                  <td className="px-4 py-3 font-semibold text-white">Total</td>
                  <td className="px-4 py-3 text-right font-mono text-white">
                    {totalMax}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-white">
                    {totalScore}
                  </td>
                  <td className="px-4 py-3 text-teal-100">Grade {report.grade}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SectionCard>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <ScoreRadar categories={report.categories} />
          <SectionCard title="Numerical Breakdown">
            <ScoreBars categories={report.categories} />
          </SectionCard>
        </section>

        <div className="space-y-6">
          {report.categories.map((category, index) => {
            const isOperatingBusiness =
              category.label === "Operating Business Strength";

            return (
              <article
                className={`border border-datx-line bg-[#091522] shadow-panel ${
                  isOperatingBusiness
                    ? "p-6 ring-1 ring-teal-300/20 sm:p-7"
                    : "p-5"
                }`}
                key={category.label}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-datx-accent">
                  {index + 1}. {category.title}
                </p>
                <h2
                  className={`mt-3 font-light text-white ${
                    isOperatingBusiness ? "text-3xl" : "text-2xl"
                  }`}
                >
                  {category.title} — {category.score}/{category.max}
                </h2>
                <div
                  className={`mt-5 grid gap-5 ${
                    isOperatingBusiness ? "lg:grid-cols-[0.82fr_1.18fr]" : "lg:grid-cols-[1fr_0.72fr]"
                  }`}
                >
                  <div className="space-y-4">
                    {category.paragraphs.map((paragraph) => (
                      <p className="text-sm leading-7 text-slate-400" key={paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {isOperatingBusiness ? (
                    <div className="border border-teal-300/20 bg-[#07111d] p-4 sm:p-5">
                      <div className="flex flex-col gap-3 border-b border-datx-line pb-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-200">
                            OBS Subcategory Breakdown
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            How the underlying operating business supports the treasury strategy
                          </p>
                        </div>
                        <div className="shrink-0 border border-teal-300/25 bg-teal-400/10 px-3 py-2 text-left sm:text-right">
                          <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
                            Total OBS
                          </p>
                          <p className="font-mono text-lg font-semibold text-white">
                            {obsScore}/{obsMax}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {report.obsSubcategories.map((item) => {
                          const percent = (item.score / item.max) * 100;

                          return (
                            <section
                              className="border border-datx-line bg-[#0a1624] p-4"
                              key={item.label}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <h3 className="text-sm font-semibold leading-6 text-white">
                                  {item.label}
                                </h3>
                                <span className="shrink-0 font-mono text-sm text-teal-100">
                                  {item.score}/{item.max}
                                </span>
                              </div>
                              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                                <div
                                  className="h-full rounded-full bg-teal-300"
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                              <p className="mt-3 text-sm leading-6 text-slate-400">
                                {item.explanation}
                              </p>
                            </section>
                          );
                        })}
                      </div>
                    </div>
                  ) : category.bullets ? (
                    <ul className="space-y-2 border border-datx-line bg-[#07111d] p-4 text-sm leading-6 text-slate-300">
                      {category.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <p className="mt-5 border-t border-datx-line pt-4 text-sm leading-7 text-teal-100">
                  DATX assessment: {category.datxAssessment}
                </p>
              </article>
            );
          })}
        </div>

        <SectionCard title="Final DATX Verdict">
          <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
            <div className="border border-teal-300/25 bg-teal-400/5 p-5">
              <p className="font-mono text-5xl font-semibold text-white">
                {report.score}/{report.maxScore}
              </p>
              <p className="mt-3 text-lg text-teal-100">Grade {report.grade}</p>
              <p className="mt-2 text-sm text-slate-400">
                Confidence {report.confidence}/5
              </p>
            </div>
            <div>
              <p className="text-lg leading-8 text-slate-200">
                {report.verdict.summary}
              </p>
              {report.verdict.paragraphs.map((paragraph) => (
                <p className="mt-4 text-sm leading-7 text-slate-400" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </SectionCard>

        <section className="grid gap-4 lg:grid-cols-3">
          {[
            ["Key Strengths", report.strengths],
            ["Key Risks", report.risks],
            ["What Could Improve the Score", report.improvements],
          ].map(([title, items]) => (
            <div className="border border-datx-line bg-[#091522] p-5" key={title as string}>
              <h2 className="text-lg font-light text-white">{title as string}</h2>
              <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                {(items as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          ))}
        </section>

        <ReportEngagementCta publicMode={publicMode} />

        <section className="border-t border-datx-line pt-6 text-sm leading-7 text-slate-400">
          <p>{report.disclaimer}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="button-primary" href={basePath}>
              {publicMode ? "Back to Tracker" : "Back to DAT Tracker"}
            </Link>
            {publicMode ? (
              <Link className="button-secondary" href="/tracker/methodology">
                View TQS Methodology
              </Link>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
