"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
  type KeyboardEvent as ReactKeyboardEvent,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";

export type AssetFilter =
  | "All Assets"
  | "Bitcoin"
  | "Ethereum"
  | "Solana"
  | "XRP"
  | "Multi-Asset";

export type ScoreCategory = {
  label: string;
  score: number;
  max: number;
};

export type OperatingBusinessSubcategory = {
  label: string;
  score: number;
  max: number;
};

export type TqsRating = {
  status: "rated";
  score: number;
  grade: string;
  confidence: number;
  lastReviewed: string;
  categories: ScoreCategory[];
  operatingBusinessSubcategories?: OperatingBusinessSubcategory[];
  analystSummary: string;
  treasuryModel: string;
  strengths: string[];
  risks: string[];
  improvements: string[];
};

export type PendingRating = {
  status: "pending";
};

export type CompanyRecord = {
  slug: string;
  name: string;
  ticker: string;
  exchange: string;
  country: string;
  asset: AssetFilter;
  assetLabel: string;
  holdings: string;
  treasuryNav: string;
  treasuryNavValue: number;
  marketCap: string;
  marketCapValue: number;
  mnav: string;
  model: string;
  rating: TqsRating | PendingRating;
  dataNote?: string;
  sources?: {
    label: string;
    url: string;
    date: string;
  }[];
};

const assetFilters: AssetFilter[] = [
  "All Assets",
  "Bitcoin",
  "Ethereum",
  "Solana",
  "XRP",
  "Multi-Asset",
];

const methodology = {
  categories: [
    { label: "Treasury Rationale", max: 10 },
    { label: "Capital Structure", max: 10 },
    { label: "Funding & Capital Markets", max: 10 },
    { label: "Operating Business Strength", max: 10 },
    { label: "Liquidity & Resilience", max: 20 },
    { label: "Governance & Risk Controls", max: 15 },
    { label: "Execution & Transparency", max: 15 },
    { label: "Shareholder Alignment", max: 10 },
  ],
  operatingBusinessSubcategories: [
    { label: "Profitability & Cash Generation", max: 3 },
    { label: "Strategic Fit", max: 3 },
    { label: "Business Diversification", max: 2 },
    { label: "Operating Track Record", max: 2 },
  ],
  disclaimer:
    "The DATX Treasury Quality Score™ evaluates the quality, resilience, governance, and long-term sustainability of a digital asset treasury strategy. It is not a prediction of share-price performance or investment advice.",
};

type SortKey =
  | "company"
  | "ticker"
  | "model"
  | "country"
  | "asset"
  | "holdings"
  | "treasuryNav"
  | "marketCap"
  | "mnav"
  | "tqs";

type SortState = {
  key: SortKey;
  direction: "asc" | "desc";
};

const allCountries = "All Countries";
const allGrades = "All Grades";
const allModels = "All Treasury Models";
const confidenceHelp =
  "Confidence reflects the amount, quality, and maturity of publicly available evidence supporting the rating.";
const tqsHelp =
  "DATX Treasury Quality Score™ evaluates treasury strategy quality, resilience, governance, execution, and long-term sustainability.";
const pendingHelp =
  "TQS Pending means DATX has not completed a public Treasury Quality Score for this company.";
const treasuryAssessmentHref = "/";
const defaultTrackerBasePath = "/dat-tracker-prototype";

function getRatingScore(company: CompanyRecord) {
  return company.rating.status === "rated" ? company.rating.score : -1;
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

  if (grade.startsWith("D")) {
    return "border-red-300/45 bg-red-400/12 text-red-50";
  }

  return "border-amber-400/40 bg-amber-400/12 text-amber-100";
}

function assetTheme(asset: AssetFilter) {
  switch (asset) {
    case "Bitcoin":
      return {
        color: "bg-orange-400",
        text: "text-orange-100",
        border: "border-orange-300/35",
        bg: "bg-orange-400/10",
        symbol: "BTC",
      };
    case "Ethereum":
      return {
        color: "bg-indigo-300",
        text: "text-indigo-100",
        border: "border-indigo-300/35",
        bg: "bg-indigo-400/10",
        symbol: "ETH",
      };
    case "Solana":
      return {
        color: "bg-emerald-300",
        text: "text-emerald-100",
        border: "border-emerald-300/35",
        bg: "bg-emerald-400/10",
        symbol: "SOL",
      };
    case "XRP":
      return {
        color: "bg-slate-200",
        text: "text-slate-100",
        border: "border-slate-300/35",
        bg: "bg-slate-400/10",
        symbol: "XRP",
      };
    case "Multi-Asset":
      return {
        color: "bg-datx-gold",
        text: "text-amber-100",
        border: "border-datx-gold/35",
        bg: "bg-datx-gold/10",
        symbol: "MIX",
      };
    default:
      return {
        color: "bg-datx-accent",
        text: "text-datx-mist",
        border: "border-datx-accent/35",
        bg: "bg-datx-accent/10",
        symbol: "DAT",
      };
  }
}

function modelPill(company: CompanyRecord) {
  if (company.asset === "Bitcoin") {
    return company.model.includes("Operating") ? "Operating Company" : "Bitcoin Treasury";
  }

  if (company.asset === "Ethereum") {
    return "Ethereum Treasury";
  }

  if (company.asset === "Solana") {
    return company.model.includes("validator") ? "Validator Strategy" : "Ecosystem Treasury";
  }

  if (company.asset === "XRP") {
    return company.model.includes("active") ? "Treasury + Yield" : "XRP Treasury";
  }

  return "Multi-Asset";
}

function hasVerifiedHolding(company: CompanyRecord) {
  const holdings = company.holdings.toLowerCase();

  return !holdings.includes("prototype") && !holdings.includes("pending");
}

function confidenceStars(confidence: number) {
  return "★★★★★".slice(0, confidence) + "☆☆☆☆☆".slice(confidence);
}

function parseMnav(value: string) {
  return Number(value.replace("x", "")) || 0;
}

function isPendingVerification(value: string) {
  return value.toLowerCase() === "pending verification";
}

function compareCompany(a: CompanyRecord, b: CompanyRecord, key: SortKey) {
  switch (key) {
    case "company":
      return a.name.localeCompare(b.name);
    case "ticker":
      return a.ticker.localeCompare(b.ticker);
    case "model":
      return modelPill(a).localeCompare(modelPill(b));
    case "country":
      return a.country.localeCompare(b.country);
    case "asset":
      return a.assetLabel.localeCompare(b.assetLabel);
    case "treasuryNav":
      return a.treasuryNavValue - b.treasuryNavValue;
    case "marketCap":
      return a.marketCapValue - b.marketCapValue;
    case "mnav":
      return parseMnav(a.mnav) - parseMnav(b.mnav);
    case "tqs":
      return getRatingScore(a) - getRatingScore(b);
    case "holdings":
    default:
      return a.holdings.localeCompare(b.holdings);
  }
}

function SortButton({
  label,
  sortKey,
  sort,
  onSort,
  align = "left",
  emphasis = false,
}: {
  label: string;
  sortKey: SortKey;
  sort: SortState;
  onSort: (key: SortKey) => void;
  align?: "left" | "center" | "right";
  emphasis?: boolean;
}) {
  const active = sort.key === sortKey;

  return (
    <button
      className={`inline-flex w-full items-center gap-1 text-left uppercase tracking-[0.12em] transition hover:text-white ${
        emphasis ? "text-[12px] font-semibold text-slate-100" : "text-[11px] font-semibold text-slate-400"
      } ${
        align === "right" ? "justify-end text-right" : ""
      } ${align === "center" ? "justify-center text-center" : ""}`}
      onClick={() => onSort(sortKey)}
      type="button"
    >
      <span className={emphasis ? "whitespace-nowrap" : undefined}>{label}</span>
      <span aria-hidden="true" className={active ? "text-datx-gold" : ""}>
        {active ? (sort.direction === "asc" ? "▲" : "▼") : "↕"}
      </span>
    </button>
  );
}

function TqsInfoTooltip() {
  const tooltipId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pointerOpenRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  const updatePosition = useCallback(() => {
    const trigger = buttonRef.current;

    if (!trigger || typeof window === "undefined") {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const width = Math.min(320, window.innerWidth - 24);
    const left = Math.min(
      Math.max(12, rect.left + rect.width / 2 - width / 2),
      window.innerWidth - width - 12,
    );

    setPosition({
      left,
      top: rect.bottom + 8,
    });
  }, []);

  const showTooltip = useCallback(() => {
    updatePosition();
    setOpen(true);
  }, [updatePosition]);

  const togglePointerTooltip = useCallback(() => {
    updatePosition();
    setOpen(!pointerOpenRef.current);
  }, [updatePosition]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const handleResize = () => updatePosition();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize, true);
    };
  }, [open, updatePosition]);

  return (
    <>
      <button
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        aria-label="Explain DATX Treasury Quality Score"
        className="inline-flex h-[18px] w-[18px] items-center justify-center bg-transparent text-[17px] font-medium leading-none text-white/75 transition duration-150 hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-datx-accent"
        onBlur={() => setOpen(false)}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (event.detail === 0) {
            showTooltip();
          } else {
            togglePointerTooltip();
          }
        }}
        onFocus={showTooltip}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.stopPropagation();
            showTooltip();
          }
        }}
        onMouseEnter={showTooltip}
        onMouseLeave={() => setOpen(false)}
        onMouseDown={() => {
          pointerOpenRef.current = open;
        }}
        onPointerDown={() => {
          pointerOpenRef.current = open;
        }}
        ref={buttonRef}
        type="button"
      >
        ⓘ
      </button>
      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed z-[80] w-[min(320px,calc(100vw-24px))] border border-datx-line bg-[#07111d] p-3 text-left shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
              id={tooltipId}
              role="tooltip"
              style={{ left: position.left, top: position.top }}
            >
              <p className="text-sm font-semibold text-white">
                Treasury Quality Score (TQS)
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                DATX’s independent 0–100 assessment of a public company’s digital
                asset treasury strategy, including resilience, governance,
                execution, operating strength, and shareholder alignment.
              </p>
              <p className="mt-2 text-xs leading-5 text-teal-100">
                Higher scores indicate stronger overall treasury quality.
              </p>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function TqsSortHeader({
  sort,
  onSort,
}: {
  sort: SortState;
  onSort: (key: SortKey) => void;
}) {
  const active = sort.key === "tqs";

  return (
    <div className="flex w-full items-center justify-center">
      <button
        className="inline-flex items-center justify-center gap-1 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-100 transition hover:text-white"
        onClick={() => onSort("tqs")}
        type="button"
      >
        <span className="whitespace-nowrap">DATX TQS</span>
        <span aria-hidden="true" className={active ? "text-datx-gold" : ""}>
          {active ? (sort.direction === "asc" ? "▲" : "▼") : "↕"}
        </span>
      </button>
      <span className="ml-2 inline-flex items-center">
        <TqsInfoTooltip />
      </span>
    </div>
  );
}

function ModelPill({ company }: { company: CompanyRecord }) {
  return (
    <span
      className="inline-flex max-w-full items-center whitespace-normal rounded-sm border border-datx-line bg-[#0b1725] px-2 py-1 text-[11px] font-medium leading-snug text-slate-300 lg:whitespace-nowrap"
      title={company.model}
    >
      {modelPill(company)}
    </span>
  );
}

function multiAssetTooltip(company: CompanyRecord) {
  const allocation = company.assetLabel
    .split("/")
    .map((item) => item.trim())
    .filter((item) => item && item !== "Multi-Asset");
  const holdingsText =
    allocation.length > 0
      ? `Holdings include ${allocation.join(", ")} and additional digital assets.`
      : "Holdings include BTC and additional digital assets.";

  return `Multi-Asset Treasury\n\n${holdingsText} See the company report for the full allocation.`;
}

function AssetBadge({ company }: { company: CompanyRecord }) {
  const theme = assetTheme(company.asset);
  const isMultiAsset = company.asset === "Multi-Asset";
  const displayLabel = isMultiAsset ? "Multi-Asset" : company.assetLabel;
  const title = isMultiAsset ? multiAssetTooltip(company) : company.assetLabel;

  return (
    <span
      className={`inline-flex min-w-[90px] max-w-full items-center justify-center gap-2 overflow-hidden rounded-sm border px-2.5 py-1.5 text-xs font-semibold ${theme.border} ${theme.bg} ${theme.text}`}
      title={title}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${theme.color}`} />
      <span className="min-w-0 truncate whitespace-nowrap text-center text-slate-300">
        {displayLabel}
      </span>
    </span>
  );
}

function HoldingsDisplay({ company }: { company: CompanyRecord }) {
  const verified = hasVerifiedHolding(company);
  const pending = company.holdings.toLowerCase().includes("pending");

  return (
    <div className="text-sm">
      <p className={verified ? "font-medium text-slate-100" : "text-slate-300"}>
        {company.holdings}
      </p>
      {verified ? (
        <p className="mt-1 font-mono text-xs text-slate-500">≈ {company.treasuryNav}</p>
      ) : pending ? (
        <p
          aria-label="Pending verification"
          className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500"
          title="Pending verification"
        >
          Pending
        </p>
      ) : (
        <p className="mt-1 text-xs text-slate-500">Prototype / pending verification</p>
      )}
    </div>
  );
}

function NumericStatusValue({ value }: { value: string }) {
  if (!isPendingVerification(value)) {
    return <>{value}</>;
  }

  return (
    <span
      aria-label="Pending verification"
      className="inline-flex max-w-full items-center justify-center whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500"
      title="Pending verification"
    >
      Pending
    </span>
  );
}

function TqsBadge({
  company,
  compact = false,
}: {
  company: CompanyRecord;
  compact?: boolean;
}) {
  if (company.rating.status === "pending") {
    return (
      <span
        className="inline-flex items-center justify-center text-center text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 transition hover:text-slate-300"
        title={pendingHelp}
      >
        TQS Pending
      </span>
    );
  }

  return (
    <span
      aria-label={`DATX Treasury Quality Score ${company.rating.score}, grade ${company.rating.grade}, confidence ${company.rating.confidence} out of 5`}
      className={`inline-flex min-w-[82px] flex-col items-center rounded-sm border px-3 py-2 text-center shadow-[0_10px_30px_rgba(0,0,0,0.18)] ${gradeTone(
        company.rating.grade,
      )}`}
      title={`${tqsHelp} ${confidenceHelp}`}
    >
      <span className="font-mono text-2xl font-semibold leading-none">
        {company.rating.score}
      </span>
      <span className="mt-1 text-sm font-semibold leading-none">
        {company.rating.grade}
      </span>
      {!compact ? (
        <span
          aria-label={`Confidence ${company.rating.confidence} out of 5`}
          className="mt-1 font-mono text-[11px] leading-none text-current/75"
        >
          {confidenceStars(company.rating.confidence)}
        </span>
      ) : null}
    </span>
  );
}

function ScoreRadar({ rating }: { rating: TqsRating }) {
  const center = 90;
  const radius = 62;
  const labelRadius = 80;
  const points = rating.categories.map((category, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / rating.categories.length;
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
        aria-label={`Radar chart for ${rating.categories
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
            textAnchor={point.labelX < center - 6 ? "end" : point.labelX > center + 6 ? "start" : "middle"}
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

function ScoreBars({ rating }: { rating: TqsRating }) {
  return (
    <div className="space-y-3">
      {rating.categories.map((category) => {
        const percent = (category.score / category.max) * 100;

        return (
          <div className="rounded-sm border border-datx-line bg-[#07111d] p-3" key={category.label}>
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

function ModalShell({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeOnEscape = useCallback(
    (key: string, preventDefault: () => void) => {
      if (key === "Escape" || key === "Esc" || key === "ESC") {
        preventDefault();
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusTarget = () => {
      (closeRef.current ?? dialogRef.current)?.focus();
    };
    const animationFrame = window.requestAnimationFrame(focusTarget);
    const focusTimer = window.setTimeout(focusTarget, 60);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(focusTimer);
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      let closedWithEscape = false;
      closeOnEscape(event.key, () => {
        closedWithEscape = true;
        event.preventDefault();
      });

      if (closedWithEscape) {
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [closeOnEscape]);

  return (
    <div
      aria-labelledby="datx-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-5 backdrop-blur-sm sm:py-8"
      onKeyDownCapture={(event: ReactKeyboardEvent<HTMLDivElement>) =>
        closeOnEscape(event.key, () => event.preventDefault())
      }
      onKeyUpCapture={(event: ReactKeyboardEvent<HTMLDivElement>) =>
        closeOnEscape(event.key, () => event.preventDefault())
      }
      role="dialog"
    >
      <button
        aria-label="Close modal backdrop"
        className="fixed inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      <div
        ref={dialogRef}
        className="relative w-full max-w-5xl border border-datx-line bg-[#07111d] shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
        tabIndex={-1}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-datx-line bg-[#07111d]/95 px-5 py-4 backdrop-blur sm:px-7">
          <h2
            className="text-xl font-light tracking-tight text-white sm:text-2xl"
            id="datx-modal-title"
          >
            {title}
          </h2>
          <button
            ref={closeRef}
            autoFocus
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-datx-line text-xl text-slate-300 transition hover:border-datx-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-datx-accent"
            onClick={onClose}
            type="button"
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ScorecardModal({
  company,
  basePath,
  publicMode,
  onClose,
  onOpenMethodology,
}: {
  company: CompanyRecord;
  basePath: string;
  publicMode: boolean;
  onClose: () => void;
  onOpenMethodology: () => void;
}) {
  const rating = company.rating.status === "rated" ? company.rating : null;
  const [obsOpen, setObsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!rating) {
    return null;
  }

  const shareUrl =
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}${basePath}?company=${company.slug}`;
  const analysisCards: Array<{ title: string; items: string[] }> = [
    { title: "Key Strengths", items: rating.strengths },
    { title: "Key Risks", items: rating.risks },
    { title: "What Could Improve", items: rating.improvements },
  ];
  const fullReportHref =
    company.slug === "strategy" ||
    company.slug === "digitalx" ||
    company.slug === "metaplanet" ||
    company.slug === "gumi"
      ? `${basePath}/companies/${company.slug}`
      : undefined;

  async function copyShareLink() {
    if (!shareUrl) {
      return;
    }

    await navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <ModalShell title={`${company.name} TQS Scorecard`} onClose={onClose}>
      <div className="space-y-6 p-5 sm:p-7">
        <header className="flex flex-col gap-5 border-b border-datx-line pb-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-datx-accent">
              Digital Asset Treasury Companies ·{" "}
              {publicMode ? "TQS scorecard" : "Prototype scorecard"}
            </p>
            <h3 className="mt-2 text-2xl font-light text-white">{company.name}</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="border border-datx-line bg-[#091522] px-2 py-1">
                {company.ticker} · {company.exchange}
              </span>
              <span className="border border-datx-line bg-[#091522] px-2 py-1">
                {company.country}
              </span>
              <span className="border border-datx-line bg-[#091522] px-2 py-1">
                Last reviewed {rating.lastReviewed}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <ModelPill company={company} />
              <AssetBadge company={company} />
            </div>
          </div>
          <div className="w-full rounded-sm border border-datx-line bg-[#091522] p-4 lg:max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-datx-accent">
              DATX Treasury Quality Score™
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-6xl font-semibold leading-none text-white">
                  {rating.score}
                </p>
                <p className="mt-2 text-xs text-slate-500">out of 100</p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex rounded-sm border px-3 py-2 text-xl font-semibold ${gradeTone(
                    rating.grade,
                  )}`}
                  title="Grade bands translate the 100-point TQS into a compact research label."
                >
                  {rating.grade}
                </span>
                <p
                  className="mt-2 font-mono text-xs text-slate-300"
                  title={confidenceHelp}
                >
                  {confidenceStars(rating.confidence)}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">{tqsHelp}</p>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-5">
            <ScoreRadar rating={rating} />
            <div className="border border-datx-line bg-[#091522] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-datx-accent">
                DATX Analyst Summary
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {rating.analystSummary}
              </p>
            </div>
            <div className="border border-datx-line bg-[#091522] p-4">
              <h3 className="text-sm font-semibold text-white">Numerical Snapshot</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["Holdings", company.holdings],
                  ["Treasury NAV", company.treasuryNav],
                  ["Market Cap", company.marketCap],
                  ["mNAV", company.mnav],
                ].map(([label, value]) => (
                  <div key={label} className="border-t border-datx-line pt-3">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-1 text-sm text-slate-100">
                      <NumericStatusValue value={value} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <section>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-datx-accent">
                    Numerical Breakdown
                  </p>
                  <h3 className="mt-2 text-lg font-light text-white">
                    Eight-category TQS breakdown
                  </h3>
                </div>
                <span className="text-sm text-slate-400">
                  {rating.treasuryModel}
                </span>
              </div>
              <ScoreBars rating={rating} />
            </section>

            {rating.operatingBusinessSubcategories ? (
              <section className="border border-teal-300/25 bg-teal-400/5">
                <button
                  aria-expanded={obsOpen}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-teal-300/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-datx-accent"
                  onClick={() => setObsOpen((open) => !open)}
                  type="button"
                >
                  <span>
                    Operating Business Strength
                    <span className="ml-2 text-xs font-normal text-slate-500">
                      subcategory detail
                    </span>
                  </span>
                  <span aria-hidden="true">{obsOpen ? "−" : "+"}</span>
                </button>
                {obsOpen ? (
                  <div className="grid gap-3 border-t border-teal-300/20 p-4 sm:grid-cols-2">
                    {rating.operatingBusinessSubcategories.map((item) => (
                      <div
                        className="flex items-center justify-between border border-datx-line bg-[#07111d] px-3 py-3 text-sm"
                        key={item.label}
                      >
                        <span className="text-slate-300">{item.label}</span>
                        <span className="font-mono text-teal-200">
                          {item.score} / {item.max}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>
            ) : null}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {analysisCards.map(({ title, items }) => (
            <div className="border border-datx-line bg-[#091522] p-4" key={title}>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-400">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="border-t border-datx-line pt-5 text-sm leading-7 text-slate-400">
          <p className="font-semibold text-slate-200">Methodology note</p>
          <p className="mt-2">{methodology.disclaimer}</p>
          <p className="mt-3 text-xs text-slate-500">
            {company.dataNote ??
              (publicMode
                ? "DATX scorecard using supplied public research data."
                : "Prototype scorecard using supplied DATX sample data.")}
          </p>
        </section>

        <footer className="flex flex-col gap-3 border-t border-datx-line pt-5 sm:flex-row sm:flex-wrap">
          {fullReportHref ? (
            <a className="button-secondary" href={fullReportHref}>
              View Full Company Report
            </a>
          ) : (
            <button
              className="inline-flex cursor-not-allowed items-center justify-center rounded-sm border border-datx-line bg-slate-700/10 px-6 py-3.5 text-sm font-medium text-slate-500"
              disabled
              type="button"
            >
              Full Company Report Coming Soon
            </button>
          )}
          <button className="button-secondary" type="button">
            Compare Companies
          </button>
          <button className="button-secondary" onClick={onOpenMethodology} type="button">
            View Methodology
          </button>
          <button className="button-secondary" onClick={copyShareLink} type="button">
            {copied ? "Copied Link" : "Copy Share Link"}
          </button>
          <button className="button-primary sm:ml-auto" onClick={onClose} type="button">
            Close
          </button>
        </footer>
      </div>
    </ModalShell>
  );
}

function MethodologyModal({
  publicMode,
  onClose,
}: {
  publicMode: boolean;
  onClose: () => void;
}) {
  return (
    <ModalShell title="DATX TQS Methodology" onClose={onClose}>
      <div className="space-y-8 p-5 sm:p-7">
        <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-datx-accent">
              What TQS Measures
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              TQS evaluates treasury strategy quality, resilience, governance,
              execution, capital structure, and long-term sustainability.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-datx-accent">
              What TQS Does Not Measure
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              TQS is not a share-price target, valuation opinion, trading signal,
              legal opinion, tax opinion, or investment recommendation.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-light text-white">Eight-category framework</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {methodology.categories.map((category) => (
              <div
                className="flex items-center justify-between border border-datx-line bg-[#091522] px-4 py-3"
                key={category.label}
              >
                <span className="text-sm text-slate-300">{category.label}</span>
                <span className="font-mono text-sm text-datx-gold">
                  {category.max}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-light text-white">
            Operating Business Strength subcategories
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {methodology.operatingBusinessSubcategories.map((category) => (
              <div
                className="flex items-center justify-between border border-datx-line bg-[#091522] px-4 py-3"
                key={category.label}
              >
                <span className="text-sm text-slate-300">{category.label}</span>
                <span className="font-mono text-sm text-datx-gold">
                  {category.max}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-datx-line bg-[#091522] p-4">
            <h3 className="text-sm font-semibold text-white">Grade interpretation</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              85-100: A · 75-84: B+ · 65-74: B · 50-64: C · Below 50: D.
              Supplied company grades are preserved while DATX grade labels are
              still being calibrated.
            </p>
          </div>
          <div className="border border-datx-line bg-[#091522] p-4">
            <h3 className="text-sm font-semibold text-white">Confidence rating</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Confidence reflects data completeness, disclosure quality, recency,
              and the separation between observable facts and analyst judgment.
            </p>
          </div>
          <div className="border border-datx-line bg-[#091522] p-4">
            <h3 className="text-sm font-semibold text-white">
              Data and judgment separation
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Numerical treasury data and analyst-scored qualitative categories
              are treated separately so assumptions remain visible.
              {publicMode
                ? " Crypto prices are as of 11 Aug 2026, approximately 03:38 UTC."
                : ""}
            </p>
          </div>
          <div className="border border-datx-line bg-[#091522] p-4">
            <h3 className="text-sm font-semibold text-white">Review frequency</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              {publicMode
                ? "Public records use a static review date and refresh after material treasury, financing, governance, or disclosure events."
                : "Prototype records use a static review date. Production reviews would refresh after material treasury, financing, governance, or disclosure events."}
            </p>
          </div>
        </section>

        <section className="border-t border-datx-line pt-5 text-sm leading-7 text-slate-400">
          <p>{methodology.disclaimer}</p>
        </section>
      </div>
    </ModalShell>
  );
}

function PriorityCoverageModal({
  company,
  publicMode,
  onClose,
}: {
  company: CompanyRecord;
  publicMode: boolean;
  onClose: () => void;
}) {
  return (
    <ModalShell title="Full DATX Report Coming Soon" onClose={onClose}>
      <div className="space-y-5 p-5 sm:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-datx-accent">
            Priority Coverage · {publicMode ? "Coverage workflow" : "Prototype workflow"}
          </p>
          <h3 className="mt-2 text-2xl font-light text-white">{company.name}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            DATX is expanding independent coverage of public digital asset
            treasury companies.
          </p>
        </div>

        <section className="border border-datx-line bg-[#091522] p-4">
          <p className="text-sm font-semibold text-white">
            Would you like your company to be reviewed?
          </p>
          <p className="mt-3 text-xs leading-6 text-slate-500">
            Investors and company representatives may also nominate a company for
            review.
          </p>
        </section>

        <footer className="flex flex-col gap-3 border-t border-datx-line pt-5 sm:flex-row sm:items-center">
          <a className="button-primary" href={treasuryAssessmentHref}>
            Request Priority Coverage
          </a>
          <button className="button-secondary" onClick={onClose} type="button">
            Close
          </button>
        </footer>
      </div>
    </ModalShell>
  );
}

function TrackerAssessmentCta() {
  return (
    <section className="border-t border-datx-line bg-[#07111d] p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-datx-accent">
            For Public Companies
          </p>
          <h3 className="mt-2 text-lg font-light text-white">
            Considering a digital asset treasury strategy?
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Request an independent DATX Treasury Assessment to evaluate treasury
            rationale, capital structure, resilience, governance, execution,
            operating strength, and shareholder alignment.
          </p>
        </div>
        <a className="button-primary shrink-0" href={treasuryAssessmentHref}>
          Request Treasury Assessment →
        </a>
      </div>
    </section>
  );
}

export function DatTrackerPrototype({
  companies,
  basePath = defaultTrackerBasePath,
  publicMode = false,
}: {
  companies: CompanyRecord[];
  basePath?: string;
  publicMode?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [asset, setAsset] = useState<AssetFilter>("All Assets");
  const [country, setCountry] = useState(allCountries);
  const [grade, setGrade] = useState(allGrades);
  const [model, setModel] = useState(allModels);
  const [sort, setSort] = useState<SortState>({ key: "tqs", direction: "desc" });
  const [methodologyOpen, setMethodologyOpen] = useState(false);
  const [priorityCoverageCompany, setPriorityCoverageCompany] =
    useState<CompanyRecord | null>(null);
  const openedByClickRef = useRef(false);

  const activeCompanySlug = searchParams.get("company");
  const activeCompany = companies.find(
    (company) =>
      company.slug === activeCompanySlug && company.rating.status === "rated",
  );

  const countries = useMemo(
    () => [allCountries, ...Array.from(new Set(companies.map((item) => item.country))).sort()],
    [companies],
  );
  const grades = useMemo(
    () => [
      allGrades,
      ...Array.from(
        new Set(
          companies
            .filter((item) => item.rating.status === "rated")
            .map((item) =>
              item.rating.status === "rated" ? item.rating.grade : allGrades,
            ),
        ),
      ).sort(),
      "TQS Pending",
    ],
    [companies],
  );
  const models = useMemo(
    () => [allModels, ...Array.from(new Set(companies.map((item) => item.model))).sort()],
    [companies],
  );
  const filterControls: Array<{
    id: string;
    label: string;
    value: string;
    setter: (next: string) => void;
    options: string[];
  }> = [
    {
      id: "datx-country-filter",
      label: "Country",
      value: country,
      setter: setCountry,
      options: countries,
    },
    {
      id: "datx-grade-filter",
      label: "Grade",
      value: grade,
      setter: setGrade,
      options: grades,
    },
    {
      id: "datx-model-filter",
      label: "Treasury Model",
      value: model,
      setter: setModel,
      options: models,
    },
  ];

  const filteredCompanies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return companies
      .filter((company) => {
        const matchesSearch =
          !normalizedQuery ||
          [
            company.name,
            company.ticker,
            company.exchange,
            company.country,
            company.asset,
            company.assetLabel,
            company.model,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesAsset = asset === "All Assets" || company.asset === asset;
        const matchesCountry = country === allCountries || company.country === country;
        const matchesGrade =
          grade === allGrades ||
          (grade === "TQS Pending" && company.rating.status === "pending") ||
          (company.rating.status === "rated" && company.rating.grade === grade);
        const matchesModel = model === allModels || company.model === model;

        return (
          matchesSearch &&
          matchesAsset &&
          matchesCountry &&
          matchesGrade &&
          matchesModel
        );
      })
      .sort((a, b) => {
        const direction = sort.direction === "asc" ? 1 : -1;
        return compareCompany(a, b, sort.key) * direction;
      });
  }, [asset, companies, country, grade, model, query, sort]);

  const summary = useMemo(() => {
    const ratedCount = companies.filter((item) => item.rating.status === "rated").length;
    const nav = companies.reduce((sum, item) => sum + item.treasuryNavValue, 0);

    return {
      companiesTracked: companies.length,
      assetsRepresented: new Set(companies.map((item) => item.asset)).size,
      aggregateNav: `$${nav.toFixed(1)}B`,
      ratedCount,
    };
  }, [companies]);

  const setCompanyInUrl = useCallback(
    (slug: string) => {
      openedByClickRef.current = true;
      router.push(`${pathname}?company=${slug}`, { scroll: false });
    },
    [pathname, router],
  );

  const closeCompanyModal = useCallback(() => {
    if (openedByClickRef.current) {
      openedByClickRef.current = false;
      router.back();
    } else {
      router.replace(pathname, { scroll: false });
    }
  }, [pathname, router]);

  function handleSort(key: SortKey) {
    setSort((current) =>
      current.key === key
        ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "desc" },
    );
  }

  function handleRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  }

  function handleRowKeyUp(event: KeyboardEvent<HTMLTableRowElement>, company: CompanyRecord) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (company.rating.status === "rated") {
        setCompanyInUrl(company.slug);
      }
    }
  }

  return (
    <main className="min-h-screen bg-datx-black text-slate-100">
      <section className="border-b border-datx-line bg-[#050910]">
        <div className="container-frame py-4 sm:py-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <Image
                alt="DATX"
                className="h-auto w-24 sm:w-28"
                height={94}
                priority
                src="/brand/datx-logo-white.png"
                width={343}
              />
              <h1 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                Digital Asset Treasury Company Tracker™
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-datx-mist sm:text-base">
                Independent research, Treasury Quality Scores (TQS), and market
                intelligence for public digital asset treasury companies.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500 sm:text-sm">
                {[
                  [summary.companiesTracked, "Public Companies"],
                  [summary.assetsRepresented, "Treasury Assets"],
                  [
                    summary.aggregateNav,
                    publicMode
                      ? "Approx. Aggregate Treasury NAV"
                      : "Aggregate Treasury NAV",
                  ],
                  [summary.ratedCount, "Full TQS Reports"],
                ].map(([value, label], index) => (
                  <div className="flex items-center gap-3" key={label}>
                    {index > 0 ? (
                      <span
                        aria-hidden="true"
                        className="hidden h-3 w-px bg-datx-line sm:block"
                      />
                    ) : null}
                    <p className="whitespace-nowrap">
                      <span className="font-mono text-sm font-semibold text-white sm:text-base">
                        {value}
                      </span>{" "}
                      <span>{label}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 sm:flex-row lg:flex-col lg:items-end">
              <button
                className="button-secondary"
                onClick={() => setMethodologyOpen(true)}
                type="button"
              >
                Methodology
              </button>
              <div className="border border-datx-line bg-datx-panel/60 px-3 py-2 text-xs text-slate-400">
                {publicMode
                  ? "Data reviewed: 11 Aug 2026 · Updated weekly on Tuesdays · Public sources"
                  : "Last updated: 16 Jul 2026 · Prototype data"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-frame py-1.5 sm:py-2">
        <div className="border border-datx-line bg-[#07111d] shadow-panel">
          <div className="border-b border-datx-line p-2.5">
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-base font-light text-white sm:text-lg">
                  Digital Asset Treasury Companies
                </h2>
                <p className="text-xs text-slate-500">
                  {filteredCompanies.length} of {companies.length} shown
                </p>
              </div>
            </div>
            <label className="block">
              <span className="sr-only">Search companies</span>
              <input
                className="h-8 w-full rounded-none border border-datx-line bg-[#050b13] px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-datx-accent"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search company, ticker, country, asset, or model"
                type="search"
                value={query}
              />
            </label>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <div className="flex flex-wrap gap-1.5">
                {assetFilters.map((item) => (
                  <button
                    className={`rounded-sm border px-2.5 py-1 text-xs font-semibold transition ${
                      asset === item
                        ? "border-datx-gold bg-datx-gold/15 text-white"
                        : "border-datx-line bg-datx-panel/45 text-slate-300 hover:border-datx-blue"
                    }`}
                    key={item}
                    onClick={() => setAsset(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
              {filterControls.map((control) => (
                <select
                  aria-label={control.label}
                  id={control.id}
                  className={`h-7 rounded-sm border border-datx-line bg-[#050b13] px-2 text-xs text-slate-200 outline-none focus:border-datx-accent ${
                    control.id === "datx-model-filter"
                      ? "min-w-[176px] sm:min-w-[210px]"
                      : "min-w-[118px]"
                  }`}
                  key={control.id}
                  onChange={(event) => control.setter(event.target.value)}
                  value={control.value}
                >
                  {control.options.map((option) => (
                    <option key={option} value={option}>
                      {option === allCountries
                        ? "Country: All"
                        : option === allGrades
                          ? "Grade: All"
                          : option === allModels
                            ? "Treasury Model: All"
                            : option}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1120px] table-fixed border-collapse">
              <colgroup>
                <col className="w-[140px]" />
                <col className="w-[160px]" />
                <col className="w-[100px]" />
                <col className="w-[85px]" />
                <col className="w-[105px]" />
                <col className="w-[130px]" />
                <col className="w-[110px]" />
                <col className="w-[110px]" />
                <col className="w-[65px]" />
                <col className="w-[115px]" />
              </colgroup>
              <thead className="sticky top-0 z-10 bg-[#0a1624]">
                <tr className="border-b border-datx-line">
                  {[
                    ["Company", "company", "left"],
                    ["Treasury Model", "model", "left"],
                    ["Ticker / Exchange", "ticker", "left"],
                    ["Country", "country", "left"],
                    ["Treasury Asset", "asset", "left"],
                    ["Holdings", "holdings", "left"],
                    ["Treasury NAV", "treasuryNav", "right"],
                    ["Market Cap", "marketCap", "right"],
                    ["mNAV", "mnav", "right"],
                    ["DATX TQS", "tqs", "right"],
                  ].map(([label, key, align]) => (
                    <th
                      className={`px-4 py-3 ${key === "tqs" ? "bg-teal-400/5" : ""}`}
                      key={key as string}
                      scope="col"
                    >
                      {key === "tqs" ? (
                        <TqsSortHeader onSort={handleSort} sort={sort} />
                      ) : (
                        <SortButton
                          align={align as "left" | "right"}
                          label={label as string}
                          onSort={handleSort}
                          sort={sort}
                          sortKey={key as SortKey}
                        />
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => {
                  const rated = company.rating.status === "rated";

                  return (
                    <tr
                      aria-label={
                        rated
                          ? `Open ${company.name} scorecard`
                          : `${company.name} scorecard pending`
                      }
                      className={`group border-b border-datx-line/70 transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-datx-accent ${
                        rated
                          ? "cursor-pointer hover:bg-[#0d1d2e] hover:shadow-[inset_3px_0_0_rgba(94,234,212,0.55)]"
                          : "hover:bg-[#0a1624]"
                      }`}
                      key={company.slug}
                      onClick={() => {
                        if (rated) {
                          setCompanyInUrl(company.slug);
                        }
                      }}
                      onKeyDown={handleRowKeyDown}
                      onKeyUp={(event) => handleRowKeyUp(event, company)}
                      tabIndex={rated ? 0 : -1}
                    >
                      <td className="px-3 py-3">
                        <div className="min-w-0">
                          <p className="font-medium leading-snug text-white">
                            {company.name}
                          </p>
                        </div>
                      </td>
                      <td className="min-w-0 px-3 py-3">
                        <ModelPill company={company} />
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">
                        <span className="font-semibold text-slate-100">
                          {company.ticker}
                        </span>
                        <span className="mt-1 block text-xs text-slate-500">
                          {company.exchange}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">
                        {company.country}
                      </td>
                      <td className="min-w-0 px-4 py-3">
                        <AssetBadge company={company} />
                      </td>
                      <td className="px-4 py-3">
                        <HoldingsDisplay company={company} />
                      </td>
                      <td
                        className={`px-4 py-3 font-mono text-sm text-slate-100 ${
                          isPendingVerification(company.treasuryNav)
                            ? "text-center"
                            : "text-right"
                        }`}
                      >
                        <NumericStatusValue value={company.treasuryNav} />
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-sm text-slate-100">
                        {company.marketCap}
                      </td>
                      <td
                        className={`px-4 py-3 font-mono text-sm text-slate-100 ${
                          isPendingVerification(company.mnav)
                            ? "text-center"
                            : "text-right"
                        }`}
                      >
                        <NumericStatusValue value={company.mnav} />
                      </td>
                      <td
                        className={`bg-teal-400/[0.03] px-4 py-3 ${
                          rated ? "text-right" : "text-center"
                        }`}
                      >
                        <button
                          aria-label={
                            rated
                              ? `Open ${company.name} DATX Treasury Quality Score scorecard`
                              : `Request priority coverage for ${company.name}. ${pendingHelp}`
                          }
                          className={`cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-datx-accent ${
                            rated ? "" : "inline-flex w-full justify-center"
                          }`}
                          onClick={(event) => {
                            event.stopPropagation();
                            if (rated) {
                              setCompanyInUrl(company.slug);
                            } else {
                              setPriorityCoverageCompany(company);
                            }
                          }}
                          type="button"
                        >
                          <TqsBadge company={company} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredCompanies.length === 0 ? (
                  <tr>
                    <td className="px-4 py-10 text-center text-sm text-slate-400" colSpan={10}>
                      No companies match the current filters.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 p-4 lg:hidden">
            {filteredCompanies.map((company) => {
              const rated = company.rating.status === "rated";
              const cardClassName = `w-full border border-datx-line bg-[#091522] p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-datx-accent ${
                rated ? "hover:border-datx-accent hover:bg-[#0d1d2e]" : ""
              }`;
              const cardContent = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium leading-snug text-white">
                        {company.name}
                      </p>
                    </div>
                    <div className="shrink-0">
                      {rated ? (
                        <TqsBadge compact company={company} />
                      ) : (
                        <button
                          aria-label={`Request priority coverage for ${company.name}. ${pendingHelp}`}
                          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-datx-accent"
                          onClick={() => setPriorityCoverageCompany(company)}
                          type="button"
                        >
                          <TqsBadge compact company={company} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <AssetBadge company={company} />
                    <span className="text-sm text-slate-400">
                      {company.ticker} · {company.exchange}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="col-span-2">
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                        Treasury Model
                      </p>
                      <div className="mt-1">
                        <ModelPill company={company} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                        Holdings
                      </p>
                      <div className="mt-1 text-sm text-slate-400">
                        <HoldingsDisplay company={company} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                        Country
                      </p>
                      <p className="mt-1 text-slate-200">{company.country}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                        Treasury NAV
                      </p>
                      <p className="mt-1 font-mono text-slate-100">
                        <NumericStatusValue value={company.treasuryNav} />
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                        mNAV
                      </p>
                      <p className="mt-1 font-mono text-slate-100">
                        <NumericStatusValue value={company.mnav} />
                      </p>
                    </div>
                  </div>
                </>
              );

              return rated ? (
                <button
                  className={cardClassName}
                  key={company.slug}
                  onClick={() => setCompanyInUrl(company.slug)}
                  type="button"
                >
                  {cardContent}
                </button>
              ) : (
                <div className={cardClassName} key={company.slug}>
                  {cardContent}
                </div>
              );
            })}
            {filteredCompanies.length === 0 ? (
              <div className="border border-datx-line bg-[#091522] p-5 text-sm text-slate-400">
                No companies match the current filters.
              </div>
            ) : null}
          </div>

          <TrackerAssessmentCta />
        </div>
      </section>

      {activeCompany ? (
        <ScorecardModal
          basePath={basePath}
          company={activeCompany}
          publicMode={publicMode}
          onClose={closeCompanyModal}
          onOpenMethodology={() => setMethodologyOpen(true)}
        />
      ) : null}

      {methodologyOpen ? (
        <MethodologyModal
          publicMode={publicMode}
          onClose={() => setMethodologyOpen(false)}
        />
      ) : null}

      {priorityCoverageCompany ? (
        <PriorityCoverageModal
          company={priorityCoverageCompany}
          publicMode={publicMode}
          onClose={() => setPriorityCoverageCompany(null)}
        />
      ) : null}
    </main>
  );
}
