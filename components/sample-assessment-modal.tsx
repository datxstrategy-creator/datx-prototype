"use client";

import { useEffect, useState } from "react";

type SampleAssessmentModalProps = {
  className?: string;
  label?: string;
};

const samplePreviewCss = `
  .sample-preview {
    --bg: #07111f;
    --line: rgba(148, 163, 184, 0.18);
    --text: #f8fafc;
    --muted: #9fb0c6;
    --soft: #cbd5e1;
    --blue: #70a7ff;
    --accent: #8bd3ff;
    --green: #8ee6b5;
    --gold: #f5d38a;
    --panel: rgba(255,255,255,0.028);
    --panel-strong: rgba(112,167,255,0.065);
    box-sizing: border-box;
    min-height: 100%;
    background:
      radial-gradient(circle at top left, rgba(112, 167, 255, 0.16), transparent 34rem),
      linear-gradient(180deg, #07111f 0%, #081323 55%, #050b14 100%);
    color: var(--text);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    padding: 48px 18px;
  }

  .sample-preview *,
  .sample-preview *::before,
  .sample-preview *::after {
    box-sizing: border-box;
  }

  .sample-preview .wrap {
    width: min(1120px, 100%);
    margin: 0 auto;
  }

  .sample-preview .eyebrow {
    color: var(--blue);
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-size: 12px;
    font-weight: 700;
    margin: 0 0 14px;
  }

  .sample-preview .title-row {
    display: grid;
    gap: 18px;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;
    text-align: center;
    margin-bottom: 30px;
  }

  .sample-preview h1 {
    font-size: clamp(34px, 5vw, 62px);
    line-height: 0.97;
    margin: 0;
    font-weight: 520;
    letter-spacing: -0.04em;
  }

  .sample-preview .intro {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.75;
    max-width: 720px;
    margin: 0 auto;
  }

  .sample-preview .preview-card {
    border: 1px solid var(--line);
    background: linear-gradient(180deg, rgba(15, 33, 55, 0.92), rgba(8, 18, 32, 0.94));
    box-shadow: 0 24px 80px rgba(0,0,0,0.35);
    overflow: hidden;
  }

  .sample-preview .card-head {
    padding: 34px;
    border-bottom: 1px solid var(--line);
    text-align: center;
  }

  .sample-preview .company {
    font-size: clamp(28px, 4vw, 46px);
    font-weight: 420;
    line-height: 1.05;
    margin: 0;
    letter-spacing: -0.035em;
  }

  .sample-preview .ticker {
    color: var(--accent);
    font-weight: 700;
    margin-top: 10px;
    letter-spacing: 0.08em;
    font-size: 14px;
  }

  .sample-preview .grid {
    display: grid;
    grid-template-columns: 0.98fr 1.02fr;
    min-height: 420px;
  }

  .sample-preview .left,
  .sample-preview .right {
    padding: 32px;
  }

  .sample-preview .left {
    border-right: 1px solid var(--line);
    background: rgba(255,255,255,0.025);
  }

  .sample-preview .section {
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--line);
  }

  .sample-preview .section:last-child {
    border-bottom: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .sample-preview h2 {
    margin: 0 0 12px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .sample-preview h3 {
    margin: 0 0 10px;
    color: var(--text);
    font-size: 15px;
    font-weight: 650;
  }

  .sample-preview p {
    color: var(--muted);
    line-height: 1.75;
    margin: 0;
    font-size: 15px;
  }

  .sample-preview .score-card {
    border: 1px solid rgba(112,167,255,0.34);
    background: var(--panel-strong);
    padding: 22px;
    margin-bottom: 22px;
  }

  .sample-preview .score-head {
    display: flex;
    justify-content: space-between;
    gap: 18px;
    align-items: baseline;
    margin-bottom: 14px;
  }

  .sample-preview .score-title {
    font-size: 20px;
    color: var(--text);
    font-weight: 650;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    margin: 0;
  }

  .sample-preview .score-num {
    color: var(--green);
    font-size: 30px;
    font-weight: 520;
    white-space: nowrap;
  }

  .sample-preview .bar {
    height: 7px;
    background: rgba(148,163,184,0.16);
    overflow: hidden;
    margin-bottom: 18px;
  }

  .sample-preview .bar > span {
    display: block;
    height: 100%;
    width: 78%;
    background: linear-gradient(90deg, var(--blue), var(--accent));
  }

  .sample-preview .mini-label {
    color: var(--blue);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 11px;
    font-weight: 700;
    margin: 18px 0 8px;
  }

  .sample-preview .factor-list,
  .sample-preview .checklist,
  .sample-preview .exclusion-list {
    margin: 12px 0 0;
    padding: 0;
    list-style: none;
  }

  .sample-preview .factor-list li,
  .sample-preview .checklist li,
  .sample-preview .exclusion-list li {
    color: var(--soft);
    font-size: 14px;
    line-height: 1.45;
    display: flex;
    gap: 9px;
    margin-bottom: 10px;
  }

  .sample-preview .factor-list li:before,
  .sample-preview .checklist li:before {
    content: "";
    width: 13px;
    height: 1px;
    background: var(--blue);
    margin-top: 10px;
    flex: 0 0 auto;
  }

  .sample-preview .exclusion-list li:before {
    content: "";
    width: 13px;
    height: 1px;
    background: var(--gold);
    margin-top: 10px;
    flex: 0 0 auto;
  }

  .sample-preview .evidence-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
    border: 1px solid var(--line);
    background: rgba(0,0,0,0.16);
  }

  .sample-preview .evidence-table th,
  .sample-preview .evidence-table td {
    border-bottom: 1px solid rgba(148,163,184,0.13);
    padding: 12px;
    text-align: left;
    vertical-align: top;
    font-size: 13px;
    line-height: 1.5;
  }

  .sample-preview .evidence-table th {
    color: var(--soft);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 10px;
    background: rgba(255,255,255,0.03);
  }

  .sample-preview .evidence-table td {
    color: var(--muted);
  }

  .sample-preview .evidence-table tr:last-child td {
    border-bottom: 0;
  }

  .sample-preview .assessment-pill {
    display: inline-flex;
    margin-top: 16px;
    border: 1px solid rgba(142,230,181,0.3);
    background: rgba(142,230,181,0.07);
    color: var(--green);
    padding: 10px 12px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .sample-preview .full-score-note,
  .sample-preview .does-not-include {
    border: 1px solid var(--line);
    background: rgba(0,0,0,0.18);
    padding: 18px;
  }

  .sample-preview .does-not-include {
    border-color: rgba(245, 211, 138, 0.18);
    background: rgba(245, 211, 138, 0.045);
  }

  .sample-preview .positioning {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 14px;
    align-items: center;
    margin: 18px 0;
  }

  .sample-preview .position-box {
    border: 1px solid var(--line);
    padding: 16px;
    background: rgba(255,255,255,0.03);
    min-height: 94px;
  }

  .sample-preview .label {
    margin: 0 0 7px;
    color: var(--muted);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-weight: 700;
  }

  .sample-preview .position-box strong {
    display: block;
    color: var(--text);
    margin-top: 8px;
    font-size: 16px;
    line-height: 1.35;
  }

  .sample-preview .arrow {
    color: var(--blue);
    font-size: 24px;
    opacity: 0.9;
  }

  .sample-preview .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  .sample-preview .mini-panel {
    border: 1px solid var(--line);
    background: var(--panel);
    padding: 18px;
  }

  .sample-preview .benefit-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin: 18px 0 0;
    padding: 0;
    list-style: none;
  }

  .sample-preview .benefit-list li {
    border: 1px solid rgba(245, 211, 138, 0.16);
    background: rgba(245, 211, 138, 0.045);
    color: var(--soft);
    font-size: 13.5px;
    line-height: 1.45;
    padding: 12px;
  }

  .sample-preview .checklist,
  .sample-preview .exclusion-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4px 18px;
    margin-top: 16px;
  }

  .sample-preview .cta-row {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 34px;
    border-top: 1px solid var(--line);
    border-bottom: 3px solid #f5d38a;
    background: rgba(0,0,0,0.18);
  }

  .sample-preview .note {
    color: var(--muted);
    font-size: 14px;
    line-height: 1.7;
    margin: 0;
  }

  .sample-preview .button-primary {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 52px;
    padding: 0 28px;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.01em;
    background: var(--text);
    color: #07111f;
  }

  .sample-preview .disclaimer {
    padding: 22px 34px;
    border-top: 1px solid var(--line);
    color: #7f91a8;
    font-size: 12px;
    line-height: 1.7;
    background: rgba(0,0,0,0.16);
  }

  @media (max-width: 860px) {
    .sample-preview { padding: 28px 14px; }
    .sample-preview .title-row,
    .sample-preview .grid,
    .sample-preview .two-col {
      grid-template-columns: 1fr;
    }
    .sample-preview .card-head { padding: 24px; }
    .sample-preview .left {
      border-right: 0;
      border-bottom: 1px solid var(--line);
    }
    .sample-preview .left,
    .sample-preview .right {
      padding: 24px;
    }
    .sample-preview .positioning {
      grid-template-columns: 1fr;
    }
    .sample-preview .arrow {
      transform: rotate(90deg);
      text-align: center;
    }
    .sample-preview .checklist,
    .sample-preview .exclusion-list {
      grid-template-columns: 1fr;
    }
    .sample-preview .cta-row { padding: 24px; }
    .sample-preview .button-primary { width: 100%; }
    .sample-preview .score-head { display: block; }
    .sample-preview .score-num {
      display: block;
      margin-top: 8px;
    }
    .sample-preview .evidence-table th,
    .sample-preview .evidence-table td {
      padding: 10px;
    }
  }
`;

const samplePreviewHtml = `
  <main class="wrap">
    <div class="title-row">
      <div>
        <p class="eyebrow">DATX Public Intelligence Preview</p>
        <h1>Norwood Systems Ltd</h1>
        <div class="ticker">ASX:NOR</div>
      </div>
      <p class="intro">
        A boardroom-style preview showing how DATX identifies treasury opportunities, governance gaps, and potential narrative shifts before any digital asset strategy is considered.
      </p>
    </div>

    <section class="preview-card">
      <header class="card-head">
        <p class="eyebrow">Previewed Scorecard Category</p>
        <h2 class="company">Balance Sheet Strength</h2>
      </header>

      <div class="grid">
        <aside class="left">
          <div class="score-card">
            <div class="score-head">
              <h2 class="score-title">Balance Sheet Strength</h2>
              <div class="score-num">78 / 100</div>
            </div>

            <div class="bar"><span></span></div>

            <p class="mini-label">Evaluation Factors</p>
            <ul class="factor-list">
              <li>Cash reserves</li>
              <li>Debt obligations</li>
              <li>Liquidity profile</li>
              <li>Capital flexibility</li>
              <li>Treasury durability</li>
            </ul>

            <p class="mini-label">Evidence Snapshot</p>
            <table class="evidence-table">
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Preview-Level Evidence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cash Reserves</td>
                  <td>Public filings indicate sufficient flexibility for evaluation.</td>
                </tr>
                <tr>
                  <td>Debt Obligations</td>
                  <td>No obvious balance sheet stress identified during preview review.</td>
                </tr>
                <tr>
                  <td>Capital Flexibility</td>
                  <td>Demonstrated ability to access funding markets.</td>
                </tr>
              </tbody>
            </table>

            <p class="mini-label">Why Norwood Received 78</p>
            <p>
              This preview score is based on a limited review of publicly available balance sheet indicators, including cash position, debt burden, liquidity profile, recent capital market activity, and apparent treasury flexibility.
            </p>
            <p style="margin-top:12px;">
              Norwood demonstrates sufficient financial flexibility to evaluate alternative treasury strategies without obvious balance sheet stress.
            </p>
            <p style="margin-top:12px;">
              The score is reduced from institutional-grade levels because the company does not possess the scale, liquidity profile, or treasury depth typically associated with larger treasury adopters.
            </p>

            <div class="assessment-pill">DATX Preview Assessment: Above Average Balance Sheet Suitability</div>
          </div>

          <div class="full-score-note">
            <p class="mini-label" style="margin-top:0;">Full DATX Treasury Assessment</p>
            <p>
              The public preview reveals only one scorecard category. The full DATX Treasury Assessment evaluates five proprietary assessment categories.
            </p>
            <ul class="factor-list">
              <li>Balance Sheet Strength</li>
              <li>Capital Market Access</li>
              <li>Governance Readiness</li>
              <li>Strategic Alignment</li>
              <li>Execution Capability</li>
            </ul>
          </div>
        </aside>

        <div class="right">
          <section class="section">
            <h2>DATX Observation</h2>
            <p>
              Norwood Systems demonstrates several characteristics commonly associated with companies that may warrant evaluation of a digital asset treasury strategy. The company's technology-focused profile, access to public capital markets, and innovation-oriented positioning create strategic considerations that may justify further treasury assessment.
            </p>
          </section>

          <section class="section">
            <h2>Narrative Shift Analysis</h2>
            <div class="positioning">
              <div class="position-box">
                <p class="label">Current Position</p>
                <strong>Technology Operating Company</strong>
              </div>
              <div class="arrow">-&gt;</div>
              <div class="position-box">
                <p class="label">Potential Position</p>
                <strong>Technology Company With Disciplined Capital Allocation Strategy</strong>
              </div>
            </div>
            <p>
              Digital asset treasury strategies are increasingly being evaluated not only as financial decisions, but also as capital allocation, treasury governance, and investor positioning decisions.
            </p>
          </section>

          <section class="section">
            <div class="two-col">
              <div class="mini-panel">
                <h3>Primary Opportunity</h3>
                <p>
                  For certain companies, digital asset treasury evaluation may create an opportunity to reassess capital allocation strategy, investor positioning, and treasury flexibility.
                </p>
                <p style="margin-top:12px;">
                  As digital assets continue evolving beyond speculative instruments and into broader corporate finance infrastructure, companies that evaluate these developments early may be better positioned to understand future treasury opportunities and risks.
                </p>
                <ul class="benefit-list">
                  <li>Potential investor engagement</li>
                  <li>Potentially greater market visibility</li>
                  <li>Clearer strategic differentiation</li>
                  <li>Broader potential shareholder interest</li>
                  <li>Enhanced capital allocation credibility</li>
                  <li>Improved investor positioning</li>
                </ul>
              </div>

              <div class="mini-panel">
                <h3>Primary Constraint</h3>
                <p>
                  While the strategic case may warrant further exploration, implementation readiness appears less mature. Governance structures, treasury oversight procedures, custody considerations, reporting frameworks, risk controls, disclosure requirements, and board-level oversight would likely require further development before any treasury action should be considered.
                </p>
              </div>
            </div>
          </section>

          <section class="section">
            <h2>Key Boardroom Question</h2>
            <p>
              If digital assets continue becoming integrated into corporate treasury and capital markets, should Norwood establish a structured evaluation framework before broader adoption occurs?
            </p>
          </section>

          <section class="section does-not-include">
            <h2>What the Full DATX Treasury Assessment Unlocks</h2>
            <p>
              This public preview shows one example category only. The full DATX Treasury Assessment provides the complete board-grade analysis needed to evaluate whether a company is suitable for further digital asset treasury consideration.
            </p>
            <ul class="exclusion-list">
              <li>Complete five-category scorecard</li>
              <li>Full evidence file and confidence levels</li>
              <li>Governance readiness review</li>
              <li>Treasury evaluation gates</li>
              <li>Risk framework review</li>
              <li>Scenario and stress testing</li>
              <li>Treasury allocation archetypes</li>
              <li>DATX Red Team Memo</li>
              <li>Final DATX opinion</li>
              <li>Implementation roadmap</li>
            </ul>
          </section>
        </div>
      </div>

      <div class="cta-row">
        <a class="button-primary" href="mailto:datx.strategy@gmail.com?subject=Request%20DATX%20Treasury%20Assessment">Request DATX Treasury Assessment</a>
      </div>

      <footer class="disclaimer">
        This Public Intelligence Preview is provided for informational and educational purposes only. It does not constitute investment, legal, accounting, tax, financial, or regulatory advice. The full DATX Treasury Assessment evaluates whether a company may be suitable for further digital asset treasury consideration and does not constitute a recommendation to purchase, hold, or implement any specific digital asset strategy.
      </footer>
    </section>
  </main>
`;

export function SampleAssessmentModal({
  className = "button-primary gap-2",
  label = "View Sample Assessment",
}: SampleAssessmentModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button className={className} onClick={() => setIsOpen(true)} type="button">
        {label}
      </button>

      {isOpen ? (
        <div
          aria-label="DATX Public Intelligence Preview - Norwood Systems Ltd"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-5 backdrop-blur-sm sm:px-6"
          role="dialog"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative max-h-[92vh] w-full max-w-[1000px] overflow-hidden border border-datx-line bg-datx-black shadow-[0_28px_90px_rgba(0,0,0,0.5)]">
            <button
              aria-label="Close sample assessment"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-datx-line bg-datx-panel/95 text-xl leading-none text-slate-200 transition-colors hover:border-datx-gold hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-datx-gold"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              X
            </button>

            <div className="max-h-[92vh] overflow-y-auto">
              <style>{samplePreviewCss}</style>
              <div
                className="sample-preview"
                dangerouslySetInnerHTML={{ __html: samplePreviewHtml }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
