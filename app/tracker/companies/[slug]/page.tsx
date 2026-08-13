import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  companyReports,
  type CompanyReport,
} from "../../../dat-tracker-prototype/company-reports";
import { CompanyReportContent } from "../../../dat-tracker-prototype/company-report-template";

const baseUrl = "https://www.datxstrategy.com";

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

  const url = `${baseUrl}/tracker/companies/${report.slug}`;
  const description = `${report.companyName} DATX Treasury Quality Score™ company report and category analysis.`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "DATX Tracker", item: `${baseUrl}/tracker` },
        { "@type": "ListItem", position: 2, name: `${report.companyName} Company Report`, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${report.companyName} TQS Company Report`,
      description,
      url,
      mainEntityOfPage: url,
      dateModified: "2026-07-16",
      author: { "@type": "Organization", name: "DATX", url: baseUrl },
      publisher: {
        "@type": "Organization",
        name: "DATX",
        url: baseUrl,
        logo: { "@type": "ImageObject", url: `${baseUrl}/brand/datx-logo-white.png` },
      },
      about: {
        "@type": "Organization",
        name: report.companyName,
        tickerSymbol: `${report.exchange}:${report.ticker}`,
      },
    },
  ];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <CompanyReportContent basePath="/tracker" publicMode report={report} />
    </>
  );
}
