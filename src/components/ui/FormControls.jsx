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

export function SelectField({ id, label, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-bmm-ink">
        {label}
      </label>
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
  )
}

export function CurrencyField({ id, label, hint, value, onChange, step = 1 }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-bmm-ink">
        {label}
      </label>
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
      {hint && <p className="mt-1.5 text-xs text-bmm-muted">{hint}</p>}
    </div>
  )
}

export function NumberField({ id, label, hint, value, onChange, step = 1 }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-bmm-ink">
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="field-input"
      />
      {hint && <p className="mt-1.5 text-xs text-bmm-muted">{hint}</p>}
    </div>
  )
}

export function SliderField({ id, label, value, onChange, min = 0, max = 100, step = 1, suffix = '%' }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-bmm-ink">
          {label}
        </label>
        <span className="text-sm font-semibold text-bmm-ink">
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
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-bmm-blue"
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
                ? 'border-bmm-blue bg-bmm-blue-soft/60'
                : 'border-bmm-line bg-white hover:border-gray-300'
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
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-bmm-blue">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-bmm-ink sm:text-3xl">
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

export function FormActions({ onBack, backLabel = '← Back', primaryLabel, onPrimary, showBack = true }) {
  return (
    <div className="mt-10 flex flex-col-reverse gap-3 border-t border-bmm-line pt-6 sm:flex-row sm:items-center sm:justify-between">
      {showBack ? (
        <button type="button" onClick={onBack} className="btn-outline">
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      <button type="button" onClick={onPrimary} className="btn-primary w-full sm:w-auto">
        {primaryLabel}
      </button>
    </div>
  )
}
