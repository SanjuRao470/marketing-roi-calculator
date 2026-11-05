export default function BrandLogo({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-bmm-navy">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            d="M14 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 2a6 6 0 1 1-4.2 10.2A6 6 0 0 1 14 6z"
            fill="white"
          />
        </svg>
      </div>
      {!compact && (
        <div className="leading-none">
          <p className="text-[11px] font-extrabold tracking-[0.12em] text-bmm-ink">
            BLUE MOON
          </p>
          <p className="text-[10px] font-semibold tracking-[0.08em] text-bmm-blue">
            MARKETING
          </p>
        </div>
      )}
    </div>
  )
}

function ArrowUpRight() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 12L12 4M12 4H6M12 4v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SiteHeader({ onGetStarted }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-bmm-line/80 px-6 py-4 sm:px-8">
      <BrandLogo />
      <nav className="hidden items-center gap-8 text-sm font-medium text-bmm-muted md:flex">
        <a href="#services" className="hover:text-bmm-ink">
          Our services
        </a>
        <a href="#about" className="hover:text-bmm-ink">
          About us
        </a>
        <a href="#cases" className="hover:text-bmm-ink">
          Case studies
        </a>
      </nav>
      <button type="button" onClick={onGetStarted} className="btn-primary !py-2">
        Get started
        <ArrowUpRight />
      </button>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="flex flex-col items-start justify-between gap-2 border-t border-bmm-line px-6 py-4 text-[11px] text-bmm-muted sm:flex-row sm:items-center sm:px-8">
      <p className="font-semibold uppercase tracking-[0.14em]">
        Blue Moon Marketing · Grow with clarity
      </p>
      <p className="italic">Illustrative calculator prototype</p>
    </footer>
  )
}
