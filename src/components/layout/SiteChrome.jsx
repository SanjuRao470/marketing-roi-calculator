import { IconArrowUpRight } from '../ui/Icons'

export default function BrandLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-bmm-navy">
        <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
          <path
            d="M15.5 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm0 2a5.5 5.5 0 1 1-3.9 9.4A5.5 5.5 0 0 1 15.5 6.5Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="leading-none">
        <p className="text-[11px] font-extrabold tracking-[0.14em] text-bmm-ink">
          BLUE MOON
        </p>
        <p className="mt-0.5 text-[10px] font-bold tracking-[0.06em] text-bmm-blue">
          MARKETING
        </p>
      </div>
    </div>
  )
}

export function SiteHeader({ onGetStarted }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-bmm-line px-6 py-4 sm:px-8">
      <BrandLogo />
      <nav className="hidden flex-1 items-center justify-center gap-8 text-[13px] font-medium text-bmm-muted md:flex">
        <a href="https://www.bluemoonmarketing.com.au/" className="hover:text-bmm-ink">
          Our services
        </a>
        <a href="https://www.bluemoonmarketing.com.au/" className="hover:text-bmm-ink">
          About us
        </a>
        <a href="https://www.bluemoonmarketing.com.au/" className="hover:text-bmm-ink">
          Case studies
        </a>
      </nav>
      <button type="button" onClick={onGetStarted} className="btn-primary shrink-0 !px-4 !py-2">
        Get started
        <IconArrowUpRight />
      </button>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="flex flex-col items-start justify-between gap-2 border-t border-bmm-line px-6 py-4 text-[11px] text-bmm-muted-light sm:flex-row sm:items-center sm:px-8">
      <p className="font-semibold uppercase tracking-[0.12em] text-bmm-muted">
        Blue Moon Marketing · Grow with clarity
      </p>
      <p className="italic">Illustrative calculator prototype</p>
    </footer>
  )
}
