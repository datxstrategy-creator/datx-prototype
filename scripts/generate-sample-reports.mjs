import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const reports = [
  {
    filename: "datx-report-001-norwood-systems.pdf",
    reference: "DATX Report #001",
    company: "Norwood Systems Ltd | ASX:NOR",
    scope: "Treasury suitability and strategic positioning assessment",
  },
  {
    filename: "datx-report-002-ai-media-technologies.pdf",
    reference: "DATX Report #002",
    company: "Ai-Media Technologies | ASX:AIM",
    scope: "Capital flexibility and governance readiness analysis",
  },
];

function escapePdfText(value) {
  return value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function createReportPdf(report) {
  const lines = [
    ["DATX", 25, 760],
    ["DIGITAL ASSETS TREASURY PLATFORM", 10, 730],
    ["PREMIUM TREASURY READINESS REPORT", 11, 672],
    [report.reference, 18, 636],
    [report.company, 14, 606],
    ["ILLUSTRATIVE SAMPLE REPORT", 9, 574],
    ["Assessment Scope", 12, 514],
    [report.scope, 10, 489],
    ["Review Domains", 12, 440],
    ["Balance sheet flexibility  |  Governance readiness  |  Capital strategy", 10, 415],
    ["Strategic positioning  |  Execution considerations  |  Risk review", 10, 394],
    ["Important Notice", 12, 325],
    ["This sample is provided to illustrate DATX research presentation only.", 9, 299],
    ["It does not constitute investment, legal, tax, or financial advice.", 9, 280],
    ["Any implementation would remain subject to corporate governance and diligence.", 9, 261],
    ["DATX | Built for public company analysis", 9, 78],
  ];

  const content = [
    "BT",
    "0.86 0.9 0.94 rg",
    ...lines.flatMap(([line, size, y]) => [
      `/F1 ${size} Tf`,
      `72 ${y} Td`,
      `(${escapePdfText(line)}) Tj`,
      `-72 -${y} Td`,
    ]),
    "ET",
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 4 0 R >> >> >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return pdf;
}

const outputDirectory = join(process.cwd(), "public", "reports");
await mkdir(outputDirectory, { recursive: true });

await Promise.all(
  reports.map((report) =>
    writeFile(join(outputDirectory, report.filename), createReportPdf(report)),
  ),
);
