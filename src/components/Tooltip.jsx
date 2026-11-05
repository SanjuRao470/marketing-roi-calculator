import { useId, useState } from 'react'

export default function Tooltip({ content, children }) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <span className="relative inline-flex items-center">
      {children}
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        aria-label="More information"
        className="ml-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-bmm-border bg-white text-[10px] font-semibold text-bmm-muted transition hover:border-bmm-blue hover:text-bmm-blue"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        ?
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-lg border border-bmm-border bg-bmm-navy px-3 py-2 text-xs font-normal leading-relaxed text-white shadow-card-lg"
        >
          {content}
          <span className="absolute left-1/2 top-full -mt-px -translate-x-1/2 border-4 border-transparent border-t-bmm-navy" />
        </span>
      )}
    </span>
  )
}
