export const researchArticles = {
  digitalAssetTreasuryStrategy: {
    title: "What Is a Digital Asset Treasury Strategy?",
    href: "/research/what-is-a-digital-asset-treasury-strategy",
    publicationDate: "May 27, 2026",
    publishedMeta: "Published • May 27, 2026",
    description:
      "A practical framework for boards, CFOs, investors, and public company management teams evaluating digital assets as part of corporate treasury policy.",
  },
  metaplanetCaseStudy: {
    title:
      "Metaplanet Case Study: From Operating Company to Bitcoin Treasury Pioneer",
    href: "/research/metaplanet-case-study-from-operating-company-to-bitcoin-treasury-pioneer",
    publicationDate: "July 3, 2026",
    publishedMeta: "Published • July 3, 2026",
    description:
      "Lessons for public companies evaluating a digital asset treasury strategy through Metaplanet's treasury transformation.",
  },
} as const;

export const publishedResearchArticles = [
  researchArticles.digitalAssetTreasuryStrategy,
  researchArticles.metaplanetCaseStudy,
] as const;
