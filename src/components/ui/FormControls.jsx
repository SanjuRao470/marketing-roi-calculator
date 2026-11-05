import { useId, useState } from 'react'
import { IconArrowLeft, IconArrowRight, IconMinus } from './Icons'

function FieldTooltip({ text }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  if (!text) return null
  return (
    <span className="relative ml-1 inline-flex">
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-bmm-line text-[10px] font-bold text-bmm-muted hover:border-bmm-blue hover:text-bmm-blue"
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
          className="absolute bottom-full left-1/2 z-20 mb-2 w-52 -translate-x-1/2 rounded-lg border border-bmm-line bg-bmm-ink px-3 py-2 text-left text-[11px] font-normal leading-snug text-white shadow-lg"
        >
          {text}
        </span>
      )}
    </span>
  )
}

function Label({ htmlFor, children, tooltip }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center text-sm font-medium text-bmm-ink"
    >
      {children}
      {tooltip && <FieldTooltip text={tooltip} />}
    </label>
  )
}

export function TextField({ id, label, value, onChange, placeholder, type = 'text', required }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-bmm-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
      />
    </div>
  )
}

export function SelectField({ id, label, tooltip, value, onChange, options }) {
  return (
    <div>
      <Label htmlFor={id} tooltip={tooltip}>
        {label}
      </Label>
      <div className="select-wrap">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field-input"
        >
          {options.map((opt) =>
            typeof opt === 'string' ? (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ) : (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ),
          )}
        </select>
      </div>
    </div>
  )
}

export function CurrencyField({ id, label, hint, tooltip, value, onChange, step = 1 }) {
  return (
    <div>
      <Label htmlFor={id} tooltip={tooltip}>
        {label}
      </Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-bmm-muted">
          $
        </span>
        <input
          id={id}
          type="number"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="field-input pl-7"
        />
      </div>
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-bmm-muted">{hint}</p>}
    </div>
  )
}

export function NumberField({ id, label, hint, tooltip, value, onChange, step = 1 }) {
  return (
    <div>
      <Label htmlFor={id} tooltip={tooltip}>
        {label}
      </Label>
      <input
        id={id}
        type="number"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="field-input"
      />
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-bmm-muted">{hint}</p>}
    </div>
  )
}

export function SliderField({
  id,
  label,
  tooltip,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  suffix = '%',
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Label htmlFor={id} tooltip={tooltip}>
          {label}
        </Label>
        <span className="text-sm font-semibold tabular-nums text-bmm-ink">
          {value}
          {suffix}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="accent-bmm-blue"
      />
    </div>
  )
}

export function ChannelCheckboxes({ options, selected, onChange }) {
  const toggle = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {options.map((option) => {
        const checked = selected.includes(option)
        return (
          <label
            key={option}
            className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition ${
              checked
                ? 'border-bmm-blue bg-bmm-blue-soft'
                : 'border-bmm-line bg-gray-50 hover:border-gray-300'
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(option)}
              className="h-4 w-4 rounded border-gray-300 text-bmm-blue focus:ring-bmm-blue"
            />
            <span className="font-medium text-bmm-ink">{option}</span>
          </label>
        )
      })}
    </div>
  )
}

export function StepIntro({ eyebrow, title, description }) {
  return (
    <div className="mb-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-bmm-blue">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-[1.65rem] font-bold leading-tight tracking-tight text-bmm-ink sm:text-[1.875rem]">
        {title}
      </h1>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bmm-muted">
          {description}
        </p>
      )}
    </div>
  )
}

export function FormActions({
  onBack,
  backLabel = 'Back',
  primaryLabel,
  onPrimary,
  showBack = true,
  backIcon = 'arrow',
}) {
  return (
    <div className="mt-10 flex flex-col-reverse gap-3 border-t border-bmm-line pt-6 sm:flex-row sm:items-center sm:justify-between">
      {showBack ? (
        <button type="button" onClick={onBack} className="btn-outline">
          {backIcon === 'minus' ? <IconMinus /> : <IconArrowLeft />}
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      <button type="button" onClick={onPrimary} className="btn-primary w-full sm:w-auto">
        {primaryLabel.replace(/\s→\s*$/, '')}
        {primaryLabel.includes('→') ? (
          <span aria-hidden>→</span>
        ) : (
          <IconArrowRight className="opacity-90" />
        )}
      </button>
    </div>
  )
}
