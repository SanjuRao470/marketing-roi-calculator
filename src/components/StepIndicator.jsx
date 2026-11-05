const STEPS = [
  { number: 1, title: 'Business information' },
  { number: 2, title: 'Marketing & growth goals' },
  { number: 3, title: 'Growth assumptions' },
]

export default function StepIndicator({ currentStep, onStepClick }) {
  return (
    <nav aria-label="Calculator steps" className="mb-8">
      <ol className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
        {STEPS.map((step, index) => {
          const isActive = currentStep === step.number
          const isComplete = currentStep > step.number
          return (
            <li key={step.number} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => onStepClick(step.number)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition sm:rounded-none sm:border-0 sm:border-b-2 sm:px-3 sm:py-4 ${
                  isActive
                    ? 'border-bmm-blue bg-bmm-blue-soft sm:border-b-bmm-blue sm:bg-transparent'
                    : isComplete
                      ? 'border-bmm-mint/40 bg-bmm-mint-soft/50 sm:border-b-bmm-mint sm:bg-transparent'
                      : 'border-bmm-border bg-white sm:border-b-slate-200 sm:bg-transparent'
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    isActive
                      ? 'bg-bmm-blue text-white'
                      : isComplete
                        ? 'bg-bmm-mint text-bmm-navy'
                        : 'bg-slate-100 text-bmm-muted'
                  }`}
                >
                  {isComplete ? '✓' : step.number}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-wide text-bmm-muted">
                    Step {step.number}
                  </span>
                  <span className="block truncate text-sm font-semibold text-bmm-navy">
                    {step.title}
                  </span>
                </span>
              </button>
              {index < STEPS.length - 1 && (
                <span
                  className="mx-1 hidden h-px flex-1 bg-slate-200 sm:block"
                  aria-hidden
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
