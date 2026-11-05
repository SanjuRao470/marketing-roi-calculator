import { IconFilter } from '../ui/Icons'

const STEPS = [
  { id: 1, label: 'Business' },
  { id: 2, label: 'Marketing' },
  { id: 3, label: 'Results' },
  { id: 4, label: 'Consultation' },
]

export default function StepProgress({ currentStep }) {
  return (
    <nav
      aria-label="Progress"
      className="flex items-center border-b border-bmm-line px-6 py-5 sm:px-8"
    >
      <ol className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-between">
        {STEPS.map((step, index) => {
          const done = currentStep > step.id
          const active = currentStep === step.id
          const reached = done || active
          return (
            <li key={step.id} className="flex flex-1 items-center">
              <div className="flex min-w-0 flex-col items-center gap-1.5">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    reached ? 'bg-bmm-blue text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {done ? (
                    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3.5 8.5L6.5 11.5L12.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    step.id
                  )}
                </span>
                <span
                  className={`text-[11px] font-semibold ${
                    active ? 'text-bmm-blue' : done ? 'text-bmm-ink' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`mx-1 hidden h-0.5 flex-1 sm:block ${
                    currentStep > step.id ? 'bg-bmm-blue' : 'bg-gray-200'
                  }`}
                  aria-hidden
                />
              )}
            </li>
          )
        })}
      </ol>
      {currentStep === 3 && (
        <button
          type="button"
          className="ml-2 hidden rounded-lg border border-bmm-line p-2 text-bmm-muted hover:bg-gray-50 sm:block"
          aria-label="Filter view"
        >
          <IconFilter />
        </button>
      )}
    </nav>
  )
}
