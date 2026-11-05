import Tooltip from './Tooltip'

function FieldLabel({ label, tooltip, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center text-sm font-medium text-bmm-navy"
    >
      <Tooltip content={tooltip}>{label}</Tooltip>
    </label>
  )
}

export function SelectField({ id, label, tooltip, value, onChange, options }) {
  return (
    <div>
      <FieldLabel label={label} tooltip={tooltip} htmlFor={id} />
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-bmm-border bg-white px-4 py-3 text-sm text-bmm-navy shadow-sm outline-none transition focus:border-bmm-blue focus:ring-2 focus:ring-bmm-blue/20"
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

export function NumberField({
  id,
  label,
  tooltip,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  step = 1,
}) {
  return (
    <div>
      <FieldLabel label={label} tooltip={tooltip} htmlFor={id} />
      <div className="relative flex items-center">
        {prefix && (
          <span className="pointer-events-none absolute left-4 text-sm font-medium text-bmm-muted">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={`w-full rounded-xl border border-bmm-border bg-white py-3 text-sm text-bmm-navy shadow-sm outline-none transition focus:border-bmm-blue focus:ring-2 focus:ring-bmm-blue/20 ${
            prefix ? 'pl-9 pr-4' : suffix ? 'pl-4 pr-10' : 'px-4'
          }`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 text-sm font-medium text-bmm-muted">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

export function MultiSelectField({ label, tooltip, options, selected, onChange }) {
  const toggle = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div>
      <div className="mb-2 flex items-center text-sm font-medium text-bmm-navy">
        <Tooltip content={tooltip}>{label}</Tooltip>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                active
                  ? 'border-bmm-blue bg-bmm-blue text-white shadow-sm'
                  : 'border-bmm-border bg-white text-bmm-slate hover:border-bmm-blue/40'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}
