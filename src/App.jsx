import { useMemo, useState } from 'react'
import MoonLogo from './components/MoonLogo'
import StepIndicator from './components/StepIndicator'
import {
  Step1Business,
  Step2Marketing,
  Step3Assumptions,
} from './components/CalculatorSteps'
import ResultsDashboard from './components/ResultsDashboard'
import { DEFAULT_INPUTS } from './data/formOptions'
import {
  SCENARIOS,
  computeProjections,
} from './utils/calculations'

const STEP_CONTENT = {
  1: Step1Business,
  2: Step2Marketing,
  3: Step3Assumptions,
}

export default function App() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS)
  const [currentStep, setCurrentStep] = useState(1)
  const [activeScenario, setActiveScenario] = useState('expected')

  const projections = useMemo(() => computeProjections(inputs), [inputs])

  const StepComponent = STEP_CONTENT[currentStep]

  const applyScenario = (scenarioId) => {
    const scenario = SCENARIOS.find((s) => s.id === scenarioId)
    if (!scenario) return
    setActiveScenario(scenarioId)
    setInputs((prev) => ({
      ...prev,
      leadConversionRate: scenario.conversionRate,
      costPerLead: scenario.costPerLead,
    }))
  }

  const goNext = () => setCurrentStep((s) => Math.min(3, s + 1))
  const goBack = () => setCurrentStep((s) => Math.max(1, s - 1))

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-bmm-navy text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <MoonLogo className="h-10 w-10" />
            <div>
              <p className="font-display text-lg font-bold leading-tight">
                Blue Moon Marketing
              </p>
              <p className="text-xs text-white/70">Growth ROI Calculator</p>
            </div>
          </div>
          <a
            href="https://www.bluemoonmarketing.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold transition hover:bg-white/10"
          >
            bluemoonmarketing.com.au
          </a>
        </div>
        <div className="border-t border-white/10 bg-gradient-to-r from-bmm-navy via-bmm-navy-light to-bmm-navy">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <span className="inline-block rounded-full bg-bmm-mint/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-bmm-mint">
              Interactive tool
            </span>
            <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl">
              Turn revenue goals into a clear marketing investment plan
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              Enter your business details, marketing budget and growth
              assumptions to see projected leads, customers, revenue, ROI and
              ROAS — then compare scenarios in seconds.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:items-start">
          <section className="rounded-2xl border border-bmm-border bg-white p-5 shadow-card sm:p-8 xl:sticky xl:top-6">
            <StepIndicator
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
            <StepComponent inputs={inputs} onChange={setInputs} />
            <div className="mt-8 flex flex-wrap gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-xl border border-bmm-border px-5 py-3 text-sm font-semibold text-bmm-navy transition hover:bg-slate-50"
                >
                  Back
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-xl bg-bmm-blue px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-bmm-blue-dark"
                >
                  Continue to step {currentStep + 1}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById('results-panel')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="rounded-xl bg-bmm-mint px-6 py-3 text-sm font-semibold text-bmm-navy shadow-md transition hover:brightness-95"
                >
                  View full results
                </button>
              )}
            </div>
          </section>

          <section id="results-panel" className="min-w-0">
            <ResultsDashboard
              inputs={inputs}
              projections={projections}
              activeScenario={activeScenario}
              onScenarioChange={applyScenario}
            />
          </section>
        </div>
      </main>

      <footer className="border-t border-bmm-border bg-white py-8 text-center text-xs text-bmm-muted">
        <p>
          © {new Date().getFullYear()} Blue Moon Marketing. Illustrative
          projections only — not financial advice or guaranteed outcomes.
        </p>
      </footer>
    </div>
  )
}
