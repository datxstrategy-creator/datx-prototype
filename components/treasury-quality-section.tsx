import Link from "next/link";
import { companyReports } from "@/app/dat-tracker-prototype/company-reports";
import { SectionHeading } from "@/components/section-heading";

export function TreasuryQualitySection() {
  const report = companyReports.strategy;

  return (
    <section
      className="section-space border-b border-datx-line bg-datx-navy"
      aria-label="Treasury Quality Score"
    >
      <div className="container-frame grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <SectionHeading
            label="TREASURY QUALITY SCORE"
            title="Two companies can hold the same amount of Bitcoin and have completely different treasury quality."
          />
          <p className="body-copy mt-6">
            The DATX Treasury Quality Score evaluates the strength and
            sustainability of a public company’s digital asset treasury
            strategy—not simply the value of the assets it holds.
          </p>
          <p className="body-copy mt-5">
            TQS examines the underlying business, balance-sheet resilience,
            treasury structure, financing risk, governance and execution
            discipline to produce a comparable score out of 100.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link className="button-primary text-center" href="/tracker">
              Explore the TQS Tracker
            </Link>
            <Link
              className="button-secondary text-center"
              href="/tracker/companies/strategy"
            >
              View the Full MSTR Report
            </Link>
          </div>
        </div>
        <article className="surface min-w-0 border-t-2 border-t-datx-blue p-6 sm:p-8">
          <p className="text-xs font-medium leading-6 tracking-wide text-datx-accent">
            Featured TQS Analysis · Strategy (MSTR)
          </p>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-b border-datx-line pb-6">
            <div>
              <h3 className="text-3xl font-light tracking-tight text-white">
                {report.companyName}
              </h3>
              <p className="mt-2 text-sm tracking-wide text-datx-accent">
                {report.ticker} · {report.exchange}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-datx-mist">
                Overall TQS
              </p>
              <p className="mt-2 tabular-nums text-white">
                <span className="text-5xl font-light">{report.score}</span>
                <span className="ml-2 text-sm text-datx-mist">
                  / {report.maxScore}
                </span>
              </p>
            </div>
          </div>
          <dl className="mt-2 divide-y divide-datx-line">
            {report.categories.map((category) => (
              <div
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3"
                key={category.label}
              >
                <dt className="text-sm leading-6 text-datx-mist">
                  {category.label}
                </dt>
                <dd className="whitespace-nowrap text-sm tabular-nums text-white">
                  {category.score} / {category.max}
                </dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </section>
  );
}
