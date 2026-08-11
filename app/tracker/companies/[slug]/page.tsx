import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  companyReports,
  type CompanyReport,
} from "../../../dat-tracker-prototype/company-reports";
import { CompanyReportContent } from "../../../dat-tracker-prototype/company-report-template";

const baseUrl = "https://datxstrategy.com";

export function generateStaticParams() {
  return Object.keys(companyReports).map((slug) => ({ slug }));
}

function reportMetadata(report: CompanyReport): Metadata {
  const title = `${report.companyName} TQS Company Report | DATX Tracker`;
  const description = `${report.companyName} DATX Treasury Quality Score™ company report and category analysis.`;
  const url = `${baseUrl}/tracker/companies/${report.slug}`;

  return {
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
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = companyReports[slug];

  if (!report) {
    return {
      title: "DATX Company Report",
    };
  }

  return reportMetadata(report);
}

export default async function CompanyReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = companyReports[slug];

  if (!report) {
    notFound();
  }

  return <CompanyReportContent basePath="/tracker" publicMode report={report} />;
}
