type ScoreCategory = {
  label: string;
  score: number;
  max: number;
};

export type ReportSubcategory = {
  label: string;
  max: number;
  score: number;
  explanation: string;
};

export type ReportCategory = ScoreCategory & {
  assessment: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  datxAssessment: string;
};

export type CompanyReport = {
  slug: string;
  companyName: string;
  ticker: string;
  exchange: string;
  country: string;
  treasuryModel: string;
  primaryAsset: string;
  lastReviewed: string;
  score: number;
  maxScore: number;
  grade: string;
  confidence: number;
  disclaimer: string;
  categories: ReportCategory[];
  obsSubcategories: ReportSubcategory[];
  verdict: {
    summary: string;
    paragraphs: string[];
  };
  strengths: string[];
  risks: string[];
  improvements: string[];
};

export const companyReports: Record<string, CompanyReport> = {
  strategy: {
    slug: "strategy",
    companyName: "Strategy",
    ticker: "MSTR",
    exchange: "NASDAQ",
    country: "United States",
    treasuryModel: "Bitcoin Treasury",
    primaryAsset: "BTC",
    lastReviewed: "16 July 2026",
    score: 84,
    maxScore: 100,
    grade: "A",
    confidence: 5,
    disclaimer:
      "The DATX Treasury Quality Score™ evaluates the quality, resilience, governance, execution, shareholder alignment, and long-term sustainability of a digital asset treasury strategy. It is not a prediction of share-price performance or investment advice.",
    categories: [
      {
        label: "Treasury Rationale",
        title: "Treasury Rationale",
        max: 10,
        score: 10,
        assessment: "Outstanding",
        paragraphs: [
          "Strategy has the clearest and most established digital asset treasury thesis in the public markets.",
          "The company pioneered the modern corporate Bitcoin treasury model and has progressively reorganized its identity around Bitcoin accumulation, Bitcoin per diluted share, capital-market access, long-term reserve-asset exposure, and shareholder value creation through treasury execution.",
          "The objective is explicit and has remained remarkably consistent.",
          "Strategy is not treating Bitcoin as a temporary allocation or an experimental balance-sheet position. Bitcoin is central to the company’s corporate strategy, financing model, and investor proposition.",
        ],
        datxAssessment:
          "The rationale is clear, coherent, deeply embedded, and communicated consistently. Full score.",
      },
      {
        label: "Capital Structure",
        title: "Capital Structure",
        max: 10,
        score: 8,
        assessment: "Strong but complex",
        paragraphs: [
          "Strategy has developed one of the most sophisticated capital structures in the digital asset sector.",
          "This structure allows Strategy to access multiple pools of capital and avoid dependence on a single form of financing.",
          "However, structural sophistication is not the same as structural simplicity.",
        ],
        bullets: [
          "common equity",
          "convertible debt",
          "preferred equity",
          "perpetual preferred securities",
          "Digital Credit instruments",
          "senior claims ahead of common shareholders",
          "recurring preferred obligations",
          "refinancing considerations",
          "greater analytical complexity",
          "less transparency for ordinary investors attempting to understand residual value",
        ],
        datxAssessment:
          "The structure is powerful and deliberately constructed, but its complexity creates genuine risk. Two points are withheld because common shareholders own an increasingly complicated residual claim.",
      },
      {
        label: "Funding & Capital Markets",
        title: "Funding & Capital Markets",
        max: 10,
        score: 10,
        assessment: "Industry-leading",
        paragraphs: [
          "This is arguably Strategy’s greatest competitive advantage.",
          "Each financing channel serves a different strategic function.",
          "Unlike early MicroStrategy, today’s Strategy is not reliant on one lender, one security type, or one narrow pool of investors.",
          "It has effectively created an expanding capital-market ecosystem around its Bitcoin treasury.",
          "The company has also demonstrated an unusual ability to raise capital at scale while continuing to expand its Bitcoin holdings.",
        ],
        bullets: [
          "common-equity markets",
          "at-the-market issuance",
          "convertible debt",
          "preferred capital",
          "institutional credit markets",
          "purpose-built Bitcoin-linked securities",
        ],
        datxAssessment:
          "No public digital asset treasury company currently matches Strategy’s funding access, instrument innovation, or ability to convert market demand into treasury capacity.",
      },
      {
        label: "Operating Business Strength",
        title: "Operating Business Strength",
        max: 10,
        score: 6,
        assessment: "Adequate",
        paragraphs: [
          "Strategy retains an operating software business, but the company’s economic identity and market valuation are now overwhelmingly associated with its Bitcoin treasury and capital-market strategy.",
          "Strategy has a real operating business and a substantial public-company track record, but its economic concentration prevents a higher OBS score.",
        ],
        datxAssessment:
          "Strategy has a real operating business and a substantial public-company track record, but its economic concentration prevents a higher OBS score.",
      },
      {
        label: "Liquidity & Resilience",
        title: "Liquidity & Resilience",
        max: 20,
        score: 16,
        assessment: "Strong",
        paragraphs: [
          "Strategy benefits from an enormous Bitcoin reserve, substantial USD liquidity, deep institutional recognition, broad access to capital markets, multiple financing channels, and a large and liquid public equity.",
          "These factors make it significantly more resilient than most digital asset treasury companies.",
          "However, resilience must be judged under adverse conditions.",
          "The Bitcoin reserve is highly valuable, but it is also the principal source of market risk.",
          "If Bitcoin weakened for several years while financing conditions tightened, Strategy’s flexibility would diminish.",
        ],
        bullets: [
          "a prolonged Bitcoin drawdown",
          "reduced equity-market demand",
          "compressed valuation premiums",
          "declining access to new capital",
          "continuing preferred and debt-related obligations",
        ],
        datxAssessment:
          "Strategy is exceptionally resilient relative to peers, but its resilience remains closely tied to Bitcoin and continued capital-market access.",
      },
      {
        label: "Governance & Risk Controls",
        title: "Governance & Risk Controls",
        max: 15,
        score: 12,
        assessment: "Strong",
        paragraphs: [
          "Strategy provides frequent public disclosures and communicates extensively regarding Bitcoin holdings, financing transactions, capital-market instruments, treasury performance, key treasury metrics, and corporate objectives.",
          "The company’s strategy is unusually visible and its reporting cadence is strong.",
          "However, governance risk remains concentrated around Michael Saylor.",
          "His leadership, conviction, and capital-market vision have been central to Strategy’s success. They also create key-person dependence, strategic concentration, narrative dependence, and limited evidence that the treasury philosophy would remain unchanged without him.",
          "Additional public detail around treasury stress testing, leverage limits, and long-term defensive thresholds would strengthen the score.",
        ],
        datxAssessment:
          "Governance and disclosure are strong, but the company remains heavily identified with one individual and one dominant strategic thesis.",
      },
      {
        label: "Execution & Transparency",
        title: "Execution & Transparency",
        max: 15,
        score: 14,
        assessment: "Outstanding",
        paragraphs: [
          "Strategy has executed at a scale no other public digital asset treasury company has matched.",
          "It has accumulated approximately 843,775 BTC while simultaneously creating new financing instruments and expanding its investor base.",
          "The company has not merely announced a strategy. It has built an entire capital-market model around it.",
          "The only point withheld reflects the fact that Strategy has not yet operated at its present scale through a prolonged crypto winter combined with severely restricted financing markets.",
          "Managing a treasury of more than 800,000 BTC is fundamentally different from managing one of 100,000 BTC.",
        ],
        bullets: [
          "consistent treasury expansion",
          "repeated access to capital",
          "clear transaction disclosure",
          "strong investor communication",
          "development of new Bitcoin-linked securities",
          "adaptation of financing methods as market conditions change",
        ],
        datxAssessment:
          "Near-industry-leading execution with one remaining unanswered question: resilience at full scale through an extended adverse cycle.",
      },
      {
        label: "Shareholder Alignment",
        title: "Shareholder Alignment",
        max: 10,
        score: 8,
        assessment: "Strong but mixed",
        paragraphs: [
          "Strategy explicitly focuses on long-term shareholder value and Bitcoin exposure per share.",
          "Common shareholders no longer own a simple software company with Bitcoin on its balance sheet.",
          "They own the residual equity beneath a sophisticated and expanding capital structure.",
          "That does not make the strategy inherently unattractive, but it makes shareholder alignment more conditional.",
        ],
        bullets: [
          "clear treasury objectives",
          "active capital allocation",
          "transparent reporting",
          "focus on accretive financing",
          "development of metrics that consider per-share outcomes rather than treasury size alone",
          "common-share dilution",
          "convertible securities",
          "preferred claims",
          "recurring senior obligations",
          "capital-stack complexity",
          "the difference between total Bitcoin growth and residual value per common share",
        ],
        datxAssessment:
          "Management is clearly focused on creating shareholder value, but common-equity holders absorb significant dilution and structural complexity.",
      },
    ],
    obsSubcategories: [
      {
        label: "Profitability & Cash Generation",
        max: 3,
        score: 1,
        explanation:
          "The software business provides revenue and operational continuity, but it is not the primary economic engine supporting the current scale of the treasury strategy. Expansion depends more heavily on capital-market access than internally generated operating cash.",
      },
      {
        label: "Strategic Fit",
        max: 3,
        score: 3,
        explanation:
          "Strategy has fully aligned its corporate identity, investor base, capital strategy, and treasury policy around Bitcoin.",
      },
      {
        label: "Business Diversification",
        max: 2,
        score: 0,
        explanation:
          "The company is highly concentrated economically and narratively around Bitcoin. The software business provides limited operational diversification but does not materially offset Bitcoin and capital-market exposure.",
      },
      {
        label: "Operating Track Record",
        max: 2,
        score: 2,
        explanation:
          "Strategy has operated as a public company for decades and has executed its Bitcoin treasury model across multiple market conditions.",
      },
    ],
    verdict: {
      summary:
        "Strategy remains the benchmark for large-scale corporate Bitcoin treasury execution and capital-market innovation.",
      paragraphs: [
        "Its strongest qualities are the clarity of its treasury rationale, unrivalled funding access, execution record, and extensive public disclosure. The company has created a treasury and financing model that other public companies actively study and imitate.",
        "Its principal weaknesses are not a lack of strategy or execution. They are the consequences of success at scale: extreme Bitcoin concentration, an increasingly complicated capital stack, recurring senior obligations, dilution risk, key-person dependence, and dependence on continued capital-market access.",
      ],
    },
    strengths: [
      "Clearest corporate Bitcoin treasury thesis",
      "Industry-leading capital-market innovation",
      "Exceptional access to funding",
      "Proven large-scale execution",
      "Strong transparency and reporting",
      "High institutional recognition",
    ],
    risks: [
      "Single-asset concentration",
      "Capital-stack complexity",
      "Preferred and senior obligations",
      "Common-share dilution",
      "Key-person dependence",
      "Sensitivity to prolonged Bitcoin drawdowns",
      "Dependence on functioning capital markets",
      "Regulatory uncertainty",
    ],
    improvements: [
      "Sustained resilience through a prolonged Bitcoin bear market.",
      "Lower capital-stack complexity over time.",
      "Stronger recurring cash coverage of senior obligations.",
      "More explicit treasury stress-testing disclosures.",
      "Reduced dependence on individual leadership.",
      "Continued per-share accretion without excessive common-equity dilution.",
      "Greater economic diversification beyond Bitcoin-linked activity.",
    ],
  },
  digitalx: {
    slug: "digitalx",
    companyName: "DigitalX",
    ticker: "DCC",
    exchange: "ASX",
    country: "Australia",
    treasuryModel: "Multi-Asset Treasury",
    primaryAsset: "Multi-Asset",
    lastReviewed: "16 July 2026",
    score: 82,
    maxScore: 100,
    grade: "A-",
    confidence: 4,
    disclaimer:
      "The DATX Treasury Quality Score™ evaluates the quality, resilience, governance, execution, shareholder alignment, and long-term sustainability of a digital asset treasury strategy. It is not a prediction of share-price performance or investment advice.",
    categories: [
      {
        label: "Treasury Rationale",
        title: "Treasury Rationale",
        max: 10,
        score: 9,
        assessment: "Excellent",
        paragraphs: [
          "DigitalX demonstrates a clear and institutionally coherent digital asset treasury rationale.",
          "The company is not approaching digital assets as a disconnected balance-sheet experiment. Its treasury strategy sits alongside an established digital-asset operating business, creating a direct connection between corporate identity, market expertise, investor expectations, and treasury allocation.",
          "The rationale is strongest because DigitalX already operates within the digital asset ecosystem. Treasury exposure is therefore easier to understand as part of the company’s broader strategic positioning than it would be for an unrelated operating company.",
          "One point is withheld because DigitalX’s treasury rationale is balanced rather than singular. The company’s strategy is compelling, but it does not have the same single-asset clarity or capital-market identity as the largest dedicated treasury vehicles.",
        ],
        datxAssessment:
          "DigitalX has a highly credible treasury rationale supported by operating-company fit, sector expertise, and investor alignment. The rationale is strong, though less singular than a pure-play treasury platform.",
      },
      {
        label: "Capital Structure",
        title: "Capital Structure",
        max: 10,
        score: 8,
        assessment: "Strong",
        paragraphs: [
          "DigitalX maintains a comparatively conservative capital posture relative to more leveraged digital asset treasury companies.",
          "The company’s treasury strategy does not appear dependent on a highly complex stack of preferred instruments, convertible securities, recurring senior obligations, or aggressive balance-sheet leverage.",
          "This simplicity improves transparency for shareholders and reduces the risk that treasury gains are offset by structural claims ahead of common equity.",
          "Two points are withheld because DigitalX remains a smaller public company with more limited capital-market scale. Its capital structure is cleaner than many peers, but it does not yet provide the same breadth of financing flexibility available to larger treasury companies.",
        ],
        bullets: [
          "conservative capital posture",
          "limited capital-stack complexity",
          "clearer residual exposure for common shareholders",
          "smaller public-company scale",
          "more limited financing flexibility than larger peers",
        ],
        datxAssessment:
          "DigitalX benefits from capital-structure simplicity and a lower leverage profile, but its smaller scale limits the depth and flexibility of its financing platform.",
      },
      {
        label: "Funding & Capital Markets",
        title: "Funding & Capital Markets",
        max: 10,
        score: 8,
        assessment: "Strong",
        paragraphs: [
          "DigitalX has access to public equity markets and benefits from a listed-company structure, but its funding capacity is naturally smaller than the largest global treasury platforms.",
          "The company’s digital asset operating profile gives it a credible capital-market narrative. Investors can understand the connection between the operating business, treasury exposure, and long-term sector positioning.",
          "However, funding access remains more limited than companies with larger market capitalizations, deeper institutional coverage, and more liquid securities.",
          "DigitalX’s capital-market strength is therefore meaningful but measured. It can support a disciplined treasury strategy, but the company is unlikely to match the financing velocity or instrument innovation of larger treasury peers.",
        ],
        bullets: [
          "listed public-company access",
          "credible digital asset market narrative",
          "smaller market capitalization",
          "more limited analyst and institutional coverage",
          "less demonstrated access to large-scale treasury financing",
        ],
        datxAssessment:
          "DigitalX has a credible funding profile for its size and strategy, but the company’s capital-market access remains more constrained than larger and more liquid treasury issuers.",
      },
      {
        label: "Operating Business Strength",
        title: "Operating Business Strength",
        max: 10,
        score: 9,
        assessment: "Excellent",
        paragraphs: [
          "DigitalX’s operating business is a central reason the company scores highly in this category.",
          "Unlike treasury companies whose operating businesses are incidental or economically overshadowed, DigitalX has an established digital-asset operating profile that supports the strategic logic of its treasury allocation.",
          "The company’s operations provide sector experience, market continuity, business diversification, and a clearer bridge between treasury policy and corporate identity.",
          "One point is withheld because DigitalX remains a smaller listed company and must continue demonstrating repeatable operating cash generation across market cycles.",
        ],
        datxAssessment:
          "DigitalX has one of the stronger operating-business profiles among public digital asset treasury companies because its treasury strategy is supported by an established digital-asset operating business and multi-cycle sector experience.",
      },
      {
        label: "Liquidity & Resilience",
        title: "Liquidity & Resilience",
        max: 20,
        score: 16,
        assessment: "Strong",
        paragraphs: [
          "DigitalX benefits from a more balanced risk profile than highly levered single-asset treasury companies.",
          "The company’s smaller treasury scale limits absolute market visibility, but it also reduces the pressure to constantly access large amounts of external capital in order to sustain the strategy.",
          "Resilience is supported by operating-business continuity, digital asset sector expertise, and a treasury approach that appears less dependent on aggressive leverage.",
          "The principal constraints are scale, liquidity, and market coverage. DigitalX’s public equity and treasury profile are less liquid and less institutionally followed than those of the largest global treasury companies.",
        ],
        bullets: [
          "operating-business continuity",
          "multi-asset treasury exposure",
          "more conservative capital posture",
          "smaller market capitalization",
          "more limited share liquidity and institutional coverage",
        ],
        datxAssessment:
          "DigitalX is resilient relative to many smaller treasury companies because its strategy is supported by real operations and a less aggressive capital structure, but liquidity and market scale remain important constraints.",
      },
      {
        label: "Governance & Risk Controls",
        title: "Governance & Risk Controls",
        max: 15,
        score: 12,
        assessment: "Strong",
        paragraphs: [
          "DigitalX benefits from operating within a public-company governance framework and from having sector-specific experience in digital assets.",
          "The company’s treasury strategy appears more naturally connected to internal expertise than strategies adopted by companies with no digital asset operating background.",
          "That said, public reporting could become more granular as the treasury strategy matures. Investors would benefit from clearer disclosures around treasury mandate, risk limits, custody practices, liquidity planning, and allocation framework.",
          "The score reflects a strong governance foundation with room for more explicit treasury-specific risk controls and reporting depth.",
        ],
        datxAssessment:
          "DigitalX has credible governance foundations and relevant sector expertise, but the score would improve with more detailed treasury policy disclosure and recurring risk-control reporting.",
      },
      {
        label: "Execution & Transparency",
        title: "Execution & Transparency",
        max: 15,
        score: 12,
        assessment: "Strong",
        paragraphs: [
          "DigitalX has demonstrated meaningful execution by combining a listed operating company with a digital asset treasury strategy.",
          "The company’s execution strength comes from strategic fit, operating continuity, and multi-cycle experience rather than from the scale of its treasury accumulation.",
          "Transparency is adequate for this assessment, but DigitalX would benefit from more detailed and standardized treasury reporting over time.",
          "The score reflects strong execution for the company’s size while acknowledging that its public treasury disclosure, scale, and market visibility remain below the leading global treasury platforms.",
        ],
        bullets: [
          "clear connection between operations and treasury strategy",
          "multi-cycle digital asset operating experience",
          "listed-company disclosure framework",
          "smaller treasury scale",
          "opportunity for more granular treasury reporting",
        ],
        datxAssessment:
          "DigitalX has executed a credible and strategically coherent treasury model, but additional reporting granularity would improve transparency and comparability for investors.",
      },
      {
        label: "Shareholder Alignment",
        title: "Shareholder Alignment",
        max: 10,
        score: 8,
        assessment: "Strong but mixed",
        paragraphs: [
          "DigitalX’s shareholder alignment is supported by the natural fit between its operating business, investor base, and digital asset treasury exposure.",
          "Shareholders are not being asked to underwrite a treasury strategy unrelated to the company’s identity. The strategy is consistent with DigitalX’s sector positioning and can enhance the company’s public-market narrative.",
          "Alignment is also supported by a less complex capital structure than many larger treasury vehicles.",
          "Two points are withheld because smaller-company liquidity, limited coverage, and evolving treasury disclosures can make shareholder outcomes more dependent on market sentiment and execution consistency.",
        ],
        bullets: [
          "strong fit with corporate identity",
          "clearer investor expectations than unrelated treasury adopters",
          "less capital-stack complexity",
          "smaller-company liquidity constraints",
          "need for continued treasury disclosure maturity",
        ],
        datxAssessment:
          "DigitalX appears well aligned with shareholders conceptually, but stronger recurring disclosure and continued operating execution would further improve confidence in long-term alignment.",
      },
    ],
    obsSubcategories: [
      {
        label: "Profitability & Cash Generation",
        max: 3,
        score: 2,
        explanation:
          "DigitalX’s operating business supports continuity and provides a more credible operating base than companies built primarily around treasury exposure, but the company must continue demonstrating repeatable operating cash generation across cycles.",
      },
      {
        label: "Strategic Fit",
        max: 3,
        score: 3,
        explanation:
          "DigitalX has strong strategic fit because its digital asset treasury strategy aligns directly with its operating business, investor positioning, and sector expertise.",
      },
      {
        label: "Business Diversification",
        max: 2,
        score: 2,
        explanation:
          "The company benefits from an established digital-asset operating business that provides meaningful diversification beyond treasury holdings alone.",
      },
      {
        label: "Operating Track Record",
        max: 2,
        score: 2,
        explanation:
          "DigitalX has multi-cycle experience operating in the digital asset sector as a listed public company.",
      },
    ],
    verdict: {
      summary:
        "DigitalX demonstrates one of the most balanced digital asset treasury strategies among publicly listed companies.",
      paragraphs: [
        "DigitalX combines an established digital-asset operating business with conservative capital management and strong strategic fit. Its smaller treasury limits scale, but diversified operations and multi-cycle experience improve resilience relative to more leveraged treasury vehicles.",
        "The company’s strongest attributes are its operating-business relevance, treasury-strategy fit, conservative capital posture, and digital asset sector experience. Its main limitations are smaller public-market scale, more limited liquidity and coverage, and the need for more granular treasury reporting as the strategy matures.",
      ],
    },
    strengths: [
      "Strong strategic fit between operations and treasury assets.",
      "Conservative capital posture relative to more leveraged vehicles.",
      "Multi-cycle operating experience in digital assets.",
      "Meaningful business diversification relative to pure treasury vehicles.",
      "Clearer shareholder rationale than unrelated treasury adopters.",
    ],
    risks: [
      "Smaller treasury scale limits market visibility.",
      "Liquidity and analyst coverage remain more limited than mega-cap peers.",
      "Treasury reporting could become more granular.",
      "Operating cash generation must continue to prove repeatability across cycles.",
      "Multi-asset exposure may be harder for some investors to evaluate than a single-asset strategy.",
    ],
    improvements: [
      "Expand treasury reporting granularity.",
      "Demonstrate repeatable operating cash generation across cycles.",
      "Publish clearer treasury allocation and risk-control frameworks.",
      "Increase investor education around the multi-asset treasury model.",
      "Continue improving liquidity and institutional coverage.",
    ],
  },
  metaplanet: {
    slug: "metaplanet",
    companyName: "Metaplanet",
    ticker: "3350",
    exchange: "TSE",
    country: "Japan",
    treasuryModel: "Bitcoin Treasury",
    primaryAsset: "BTC",
    lastReviewed: "16 July 2026",
    score: 79,
    maxScore: 100,
    grade: "B+",
    confidence: 5,
    disclaimer:
      "The DATX Treasury Quality Score™ evaluates the quality, resilience, governance, execution, shareholder alignment, and long-term sustainability of a digital asset treasury strategy. It is not a prediction of share-price performance or investment advice.",
    categories: [
      {
        label: "Treasury Rationale",
        title: "Treasury Rationale",
        max: 10,
        score: 10,
        assessment: "Outstanding",
        paragraphs: [
          "Metaplanet possesses one of the clearest treasury strategies among all public companies.",
          "Management has publicly stated that Bitcoin is its primary treasury reserve asset and measures corporate performance using BTC Yield, making treasury performance central to capital allocation decisions.",
          "The company aims to continually increase Bitcoin per share through disciplined financing while educating the Japanese market about Bitcoin adoption.",
          "Unlike many companies experimenting with digital assets, Metaplanet has fully aligned its corporate identity around becoming Asia’s leading Bitcoin Treasury Company.",
        ],
        datxAssessment:
          "Metaplanet possesses one of the clearest treasury strategies among all public companies and has fully aligned its corporate identity around becoming Asia’s leading Bitcoin Treasury Company.",
      },
      {
        label: "Capital Structure",
        title: "Capital Structure",
        max: 10,
        score: 9,
        assessment: "Excellent",
        paragraphs: [
          "Metaplanet has demonstrated sophisticated capital raising through equity-linked financing, enabling rapid Bitcoin accumulation while preserving financial flexibility.",
          "Large equity issuance creates shareholder dilution risk, although management attempts to offset this through BTC Yield growth.",
        ],
        bullets: [
          "Innovative equity financing",
          "Strategic warrant issuance",
          "Ability to raise substantial capital",
          "Avoids excessive traditional debt",
          "Large equity issuance creates shareholder dilution risk",
        ],
        datxAssessment:
          "Metaplanet has demonstrated sophisticated capital raising while preserving financial flexibility, with dilution risk remaining the principal weakness.",
      },
      {
        label: "Funding & Capital Markets",
        title: "Funding & Capital Markets",
        max: 10,
        score: 10,
        assessment: "Outstanding",
        paragraphs: [
          "Metaplanet has become one of the most innovative treasury financing companies globally.",
          "Its financing strategy increasingly resembles Strategy’s institutional treasury model while adapting it to Japanese capital markets.",
        ],
        bullets: [
          "BTC Yield KPI",
          "Active capital-market execution",
          "Equity-financing innovation",
          "Zero-coupon bond issuance",
          "Strong investor communication",
          "Rapid access to capital markets",
        ],
        datxAssessment:
          "Metaplanet has become one of the most innovative treasury financing companies globally, adapting an institutional treasury model to Japanese capital markets.",
      },
      {
        label: "Operating Business Strength",
        title: "Operating Business Strength",
        max: 10,
        score: 4,
        assessment: "Limited",
        paragraphs: [
          "The legacy operating business contributes relatively little compared with the size of the Bitcoin treasury.",
          "Most investor attention is now focused on treasury execution rather than operating cash generation.",
          "Bitcoin has become the primary corporate strategy rather than a complement to the underlying operating business.",
        ],
        datxAssessment:
          "Metaplanet scores lower in Operating Business Strength because the operating business now plays a relatively limited role in supporting the treasury strategy.",
      },
      {
        label: "Liquidity & Resilience",
        title: "Liquidity & Resilience",
        max: 20,
        score: 14,
        assessment: "Strong but conditional",
        paragraphs: [
          "Metaplanet benefits from a large Bitcoin reserve, excellent access to capital, strong investor demand, and growing treasury scale.",
          "Liquidity remains heavily tied to Bitcoin market conditions and continued capital-market access.",
          "The business has relatively limited operating cash flow outside its treasury strategy.",
        ],
        bullets: [
          "Large Bitcoin reserve",
          "Excellent access to capital",
          "Strong investor demand",
          "Growing treasury scale",
          "Liquidity tied to Bitcoin market conditions",
          "Continued capital-market access remains important",
        ],
        datxAssessment:
          "Metaplanet has strong liquidity and treasury scale, but resilience remains closely tied to Bitcoin market conditions and capital-market access.",
      },
      {
        label: "Governance & Risk Controls",
        title: "Governance & Risk Controls",
        max: 15,
        score: 11,
        assessment: "Strong with room to improve",
        paragraphs: [
          "Metaplanet benefits from experienced leadership, clear strategic communication, transparent treasury disclosures, and public KPI reporting through BTC Yield.",
          "Areas for improvement include more detailed treasury-risk metrics, explicit leverage targets, published concentration limits, and a formal treasury-governance framework.",
        ],
        bullets: [
          "Experienced leadership",
          "Clear strategic communication",
          "Transparent treasury disclosures",
          "Public KPI reporting through BTC Yield",
          "More detailed treasury-risk metrics",
          "Explicit leverage targets",
          "Published concentration limits",
          "Formal treasury-governance framework",
        ],
        datxAssessment:
          "Metaplanet communicates its strategy clearly and reports through BTC Yield, but more formalized treasury-risk metrics and governance targets would strengthen the score.",
      },
      {
        label: "Execution & Transparency",
        title: "Execution & Transparency",
        max: 15,
        score: 13,
        assessment: "Excellent",
        paragraphs: [
          "Metaplanet has executed one of the fastest Bitcoin treasury expansions globally.",
          "Execution quality is among the strongest in the industry.",
        ],
        bullets: [
          "Consistent Bitcoin acquisitions",
          "Transparent announcements",
          "Frequent investor presentations",
          "Clear treasury messaging",
          "Excellent capital execution",
        ],
        datxAssessment:
          "Metaplanet has executed one of the fastest Bitcoin treasury expansions globally, with execution quality among the strongest in the industry.",
      },
      {
        label: "Shareholder Alignment",
        title: "Shareholder Alignment",
        max: 10,
        score: 8,
        assessment: "Strong",
        paragraphs: [
          "Management explicitly measures success using Bitcoin-per-share growth rather than absolute Bitcoin accumulation.",
          "This aligns treasury expansion with shareholder outcomes.",
          "Future improvements could include Treasury NAV per Share, Treasury Return on Capital, Digital Asset Value per Share, and additional treasury-performance metrics.",
        ],
        bullets: [
          "Treasury NAV per Share",
          "Treasury Return on Capital",
          "Digital Asset Value per Share",
          "Additional treasury-performance metrics",
        ],
        datxAssessment:
          "Metaplanet’s use of Bitcoin-per-share growth aligns treasury expansion with shareholder outcomes, with room to broaden treasury-performance metrics.",
      },
    ],
    obsSubcategories: [
      {
        label: "Profitability & Cash Generation",
        max: 3,
        score: 1,
        explanation:
          "The legacy operating business contributes relatively little compared with the size of the Bitcoin treasury. Most investor attention is now focused on treasury execution rather than operating cash generation.",
      },
      {
        label: "Strategic Fit",
        max: 3,
        score: 1,
        explanation:
          "Bitcoin has become the primary corporate strategy rather than a complement to the underlying operating business. Unlike DigitalX, treasury activities are no longer naturally integrated into diversified operating revenue.",
      },
      {
        label: "Business Diversification",
        max: 2,
        score: 1,
        explanation:
          "Metaplanet retains limited operating diversification, with its legacy hotel operations representing a much smaller component of the business following its strategic pivot.",
      },
      {
        label: "Operating Track Record",
        max: 2,
        score: 1,
        explanation:
          "While the company itself has decades of corporate history, its Bitcoin treasury strategy is still relatively young compared with longer-established operating businesses.",
      },
    ],
    verdict: {
      summary:
        "Metaplanet has rapidly established itself as Asia’s leading Bitcoin Treasury Company through exceptional capital-market execution, innovative financing, and one of the clearest treasury philosophies in the sector.",
      paragraphs: [
        "Its use of BTC Yield as a core performance metric and disciplined approach to Bitcoin accumulation demonstrate institutional-quality treasury management.",
        "However, unlike DigitalX, Strategy, or more diversified financial businesses, Metaplanet’s operating business now plays a relatively limited role in supporting the treasury strategy. As a result, the company scores lower in Operating Business Strength despite ranking among the industry’s leaders in treasury execution.",
      ],
    },
    strengths: [
      "One of the clearest treasury strategies among public companies.",
      "BTC Yield KPI.",
      "Active capital-market execution.",
      "Equity-financing innovation.",
      "Zero-coupon bond issuance.",
      "Strong investor communication.",
      "Rapid access to capital markets.",
      "Excellent capital execution.",
    ],
    risks: [
      "Large equity issuance creates shareholder dilution risk.",
      "Liquidity remains heavily tied to Bitcoin market conditions.",
      "Continued capital-market access remains important.",
      "The business has relatively limited operating cash flow outside its treasury strategy.",
      "The Bitcoin treasury strategy is still relatively young compared with longer-established operating businesses.",
    ],
    improvements: [
      "More detailed treasury-risk metrics.",
      "Explicit leverage targets.",
      "Published concentration limits.",
      "Formal treasury-governance framework.",
      "Treasury NAV per Share.",
      "Treasury Return on Capital.",
      "Digital Asset Value per Share.",
      "Additional treasury-performance metrics.",
    ],
  },
  gumi: {
    slug: "gumi",
    companyName: "gumi Inc.",
    ticker: "3903",
    exchange: "TSE",
    country: "Japan",
    treasuryModel: "XRP Treasury",
    primaryAsset: "XRP",
    lastReviewed: "16 July 2026",
    score: 76,
    maxScore: 100,
    grade: "B+",
    confidence: 4,
    disclaimer:
      "The DATX Treasury Quality Score™ evaluates the quality, resilience, governance, execution, shareholder alignment, and long-term sustainability of a digital asset treasury strategy. It is not a prediction of share-price performance or investment advice.",
    categories: [
      {
        label: "Treasury Rationale",
        title: "Treasury Rationale",
        max: 10,
        score: 8,
        assessment: "Strong",
        paragraphs: [
          "gumi’s treasury strategy aligns closely with its long-standing involvement in blockchain technology, Web3 gaming, digital asset investments, and its strategic relationship with SBI Holdings.",
          "Unlike companies adopting digital assets solely for treasury diversification, XRP naturally complements gumi’s existing ecosystem and broader blockchain strategy.",
          "The treasury therefore supports the company’s existing business rather than replacing it.",
          "The XRP treasury strategy remains relatively new and has not yet demonstrated a long-term capital-allocation track record.",
        ],
        datxAssessment:
          "gumi’s treasury rationale is strong because XRP naturally complements the company’s existing blockchain ecosystem, though the strategy remains relatively new.",
      },
      {
        label: "Capital Structure",
        title: "Capital Structure",
        max: 10,
        score: 8,
        assessment: "Strong",
        paragraphs: [
          "gumi’s capital structure supports treasury growth without excessive financial engineering.",
          "Capital-raising capabilities remain more limited than larger treasury-focused companies such as Strategy or Metaplanet.",
        ],
        bullets: [
          "Conservative financing",
          "Limited leverage",
          "Straightforward capital structure",
          "Treasury growth without excessive financial engineering",
          "More limited capital-raising capabilities than larger treasury-focused companies",
        ],
        datxAssessment:
          "gumi has a conservative and straightforward capital structure, but does not yet have the same capital-raising scale as larger treasury-focused peers.",
      },
      {
        label: "Funding & Capital Markets",
        title: "Funding & Capital Markets",
        max: 10,
        score: 7,
        assessment: "Good",
        paragraphs: [
          "gumi benefits significantly from its relationship with SBI Holdings.",
          "However, the company has not yet demonstrated the same capital-market innovation or fundraising scale as leading treasury companies.",
        ],
        bullets: [
          "Institutional credibility",
          "Strong Japanese financial network",
          "Blockchain-industry relationships",
          "Access to strategic partners",
          "Less demonstrated capital-market innovation than leading treasury companies",
          "Less demonstrated fundraising scale than leading treasury companies",
        ],
        datxAssessment:
          "gumi benefits from institutional credibility and strategic relationships, but its funding profile remains less developed than leading treasury companies.",
      },
      {
        label: "Operating Business Strength",
        title: "Operating Business Strength",
        max: 10,
        score: 9,
        assessment: "Excellent",
        paragraphs: [
          "gumi generates recurring revenue through its gaming business, blockchain initiatives, and investment activities.",
          "Although earnings can fluctuate with the gaming industry, the company maintains a genuine operating business beyond treasury assets.",
          "Blockchain technology, Web3 gaming, digital assets, and XRP all naturally complement the company’s existing strategy.",
          "The treasury reinforces the operating business rather than distracting from it.",
        ],
        datxAssessment:
          "gumi has strong Operating Business Strength because its treasury strategy is integrated into an established gaming, blockchain, and digital asset ecosystem.",
      },
      {
        label: "Liquidity & Resilience",
        title: "Liquidity & Resilience",
        max: 20,
        score: 13,
        assessment: "Adequate",
        paragraphs: [
          "gumi’s operating business provides recurring revenue, and the treasury complements existing operations.",
          "The company has lower leverage than many treasury companies and benefits from multiple business segments.",
          "The company remains exposed to digital-asset volatility, particularly through XRP.",
          "Its treasury strategy is still in the early stages of development.",
        ],
        bullets: [
          "Operating business provides recurring revenue",
          "Treasury complements existing operations",
          "Lower leverage than many treasury companies",
          "Multiple business segments",
          "Exposure to digital-asset volatility, particularly through XRP",
          "Treasury strategy remains early",
        ],
        datxAssessment:
          "gumi benefits from operating-business resilience and lower leverage, but XRP volatility and the early stage of the treasury strategy constrain the score.",
      },
      {
        label: "Governance & Risk Controls",
        title: "Governance & Risk Controls",
        max: 15,
        score: 11,
        assessment: "Strong with room to improve",
        paragraphs: [
          "gumi benefits from its strategic partnership with SBI, public treasury disclosures, active treasury oversight, an innovative covered-call strategy, and strong corporate governance.",
          "Future improvements could include formal treasury-allocation policies, concentration limits, and published treasury-risk metrics.",
        ],
        bullets: [
          "Strategic partnership with SBI",
          "Public treasury disclosures",
          "Active treasury oversight",
          "Innovative covered-call strategy",
          "Strong corporate governance",
          "Formal treasury-allocation policies",
          "Concentration limits",
          "Published treasury-risk metrics",
        ],
        datxAssessment:
          "gumi has a credible governance base and active treasury oversight, with further upside from more formal treasury policies and risk metrics.",
      },
      {
        label: "Execution & Transparency",
        title: "Execution & Transparency",
        max: 15,
        score: 12,
        assessment: "Strong",
        paragraphs: [
          "gumi has communicated its treasury strategy clearly and introduced a differentiated approach through covered-call income generation.",
          "However, execution remains in its early stages.",
          "The long-term effectiveness of the treasury strategy has yet to be demonstrated across a full market cycle.",
        ],
        datxAssessment:
          "gumi has communicated clearly and introduced a differentiated covered-call approach, but the strategy remains early and needs a longer execution record.",
      },
      {
        label: "Shareholder Alignment",
        title: "Shareholder Alignment",
        max: 10,
        score: 8,
        assessment: "Strong",
        paragraphs: [
          "The treasury strategy supports the existing operating business rather than replacing it.",
          "Management appears focused on creating long-term shareholder value instead of pursuing short-term market attention.",
          "Future improvements could include introducing treasury-specific KPIs such as Digital Asset Value per Share, Treasury Return on Capital, Treasury NAV per Share, and Treasury Growth Rate.",
        ],
        bullets: [
          "Digital Asset Value per Share",
          "Treasury Return on Capital",
          "Treasury NAV per Share",
          "Treasury Growth Rate",
        ],
        datxAssessment:
          "gumi’s treasury strategy supports the existing operating business and appears aligned with long-term shareholder value, with room to add treasury-specific KPIs.",
      },
    ],
    obsSubcategories: [
      {
        label: "Profitability & Cash Generation",
        max: 3,
        score: 2,
        explanation:
          "gumi generates recurring revenue through its gaming business, blockchain initiatives, and investment activities. Although earnings can fluctuate with the gaming industry, the company maintains a genuine operating business beyond treasury assets.",
      },
      {
        label: "Strategic Fit",
        max: 3,
        score: 3,
        explanation:
          "Blockchain technology, Web3 gaming, digital assets, and XRP all naturally complement the company’s existing strategy. The treasury reinforces the operating business rather than distracting from it.",
      },
      {
        label: "Business Diversification",
        max: 2,
        score: 2,
        explanation:
          "Revenue and assets are diversified across mobile gaming, Web3 gaming, venture investments, blockchain subsidiaries, and digital asset initiatives. This diversification improves long-term resilience.",
      },
      {
        label: "Operating Track Record",
        max: 2,
        score: 2,
        explanation:
          "gumi has operated successfully for many years through multiple gaming cycles while expanding into blockchain technology well before the current treasury trend.",
      },
    ],
    verdict: {
      summary:
        "gumi presents one of Japan’s most strategically coherent digital asset treasury models by integrating XRP into an established blockchain and gaming ecosystem rather than treating it as a standalone speculative reserve asset.",
      paragraphs: [
        "Its long-standing blockchain expertise, partnership with SBI Holdings, diversified operating business, and conservative capital structure provide a solid foundation for future treasury development.",
        "While the treasury strategy remains relatively young and execution has yet to be proven over a full market cycle, the company’s strong Operating Business Strength and natural strategic alignment distinguish it from many newer treasury companies. As treasury disclosures, performance metrics, and long-term execution mature, gumi has the potential to become one of Asia’s strongest examples of an integrated digital asset treasury strategy.",
      ],
    },
    strengths: [
      "XRP naturally complements gumi’s existing ecosystem and broader blockchain strategy.",
      "Strategic partnership with SBI.",
      "Public treasury disclosures.",
      "Active treasury oversight.",
      "Innovative covered-call strategy.",
      "Strong corporate governance.",
      "Diversified operating business across gaming, Web3, investments, subsidiaries, and digital asset initiatives.",
    ],
    risks: [
      "The XRP treasury strategy remains relatively new.",
      "The strategy has not yet demonstrated a long-term capital-allocation track record.",
      "The company remains exposed to digital-asset volatility, particularly through XRP.",
      "Execution remains in its early stages.",
      "The long-term effectiveness of the treasury strategy has yet to be demonstrated across a full market cycle.",
    ],
    improvements: [
      "Formal treasury-allocation policies.",
      "Concentration limits.",
      "Published treasury-risk metrics.",
      "Digital Asset Value per Share.",
      "Treasury Return on Capital.",
      "Treasury NAV per Share.",
      "Treasury Growth Rate.",
    ],
  },
};
