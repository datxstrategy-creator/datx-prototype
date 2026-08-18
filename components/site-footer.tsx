const socialLinkClassName =
  "inline-flex h-10 w-10 items-center justify-center text-slate-300 transition-colors duration-200 hover:text-datx-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-datx-accent";

type SiteFooterProps = {
  research?: boolean;
};

export function SiteFooter({ research = false }: SiteFooterProps) {
  return (
    <footer className="border-t border-datx-line">
      <div className="container-frame flex flex-col gap-9 py-10 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-[0.25em] text-white">
            DATX
          </p>
          <p className="mt-4 text-sm text-datx-mist">
            © 2026 DATX. All rights reserved.
          </p>
          <p className="mt-4 text-sm text-datx-mist">
            Built for public company treasury analysis.
          </p>
        </div>
        <div className="flex max-w-2xl flex-col items-start gap-5 lg:items-end lg:text-right">
          <p className="text-sm leading-7 text-slate-400">
            {research ? (
              <>
                DATX provides treasury strategy analysis and institutional-style
                research for public company decision-makers evaluating digital
                asset treasury policy.
              </>
            ) : (
              <>
                DATX provides treasury strategy analysis and institutional-style
                research only. Nothing on this website constitutes investment,
                legal, tax, or financial advice.
              </>
            )}
          </p>
          <div className="flex items-center gap-1">
            <a
              aria-label="DATX on X"
              className={`${socialLinkClassName} text-3xl leading-none`}
              href="https://x.com/DATX_strategy"
              rel="noopener noreferrer"
              target="_blank"
            >
              𝕏
            </a>
            <a
              aria-label="DATX on LinkedIn"
              className={socialLinkClassName}
              href="https://www.linkedin.com/company/datx-strategy/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
