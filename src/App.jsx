import { useCallback, useMemo, useState } from 'react'
import CalculatorShell from './components/layout/CalculatorShell'
import LandingPage from './pages/LandingPage'
import StepBusiness from './pages/StepBusiness'
import StepConsultation from './pages/StepConsultation'
import StepMarketing from './pages/StepMarketing'
import StepResults from './pages/StepResults'
import { DEFAULT_INPUTS } from './data/formOptions'
import {
  SCENARIOS,
  computeProjections,
  matchScenario,
} from './utils/calculations'

export default function App() {
  const [view, setView] = useState('landing')
  const [step, setStep] = useState(1)
  const [inputs, setInputs] = useState(DEFAULT_INPUTS)
  const [activeScenario, setActiveScenario] = useState('expected')

  const projections = useMemo(() => computeProjections(inputs), [inputs])

  const updateInputs = useCallback((next) => {
    setInputs(next)
    const matched = matchScenario(next)
    if (matched) setActiveScenario(matched)
  }, [])

  const startCalculator = () => {
    setView('calculator')
    setStep(1)
  }

  const restart = () => {
    setInputs(DEFAULT_INPUTS)
    setActiveScenario('expected')
    setStep(1)
    setView('landing')
  }

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

  if (view === 'landing') {
    return <LandingPage onStart={startCalculator} />
  }

  let content
  if (step === 1) {
    content = (
      <StepBusiness
        inputs={inputs}
        onChange={updateInputs}
        onBack={() => setView('landing')}
        onNext={() => setStep(2)}
      />
    )
  } else if (step === 2) {
    content = (
      <StepMarketing
        inputs={inputs}
        onChange={updateInputs}
        onBack={() => setStep(1)}
        onNext={() => setStep(3)}
      />
    )
  } else if (step === 3) {
    content = (
      <StepResults
        inputs={inputs}
        projections={projections}
        activeScenario={activeScenario}
        onScenarioSelect={applyScenario}
        onBack={() => setStep(2)}
        onConsult={() => setStep(4)}
      />
    )
  } else {
    content = (
      <StepConsultation
        inputs={inputs}
        projections={projections}
        onBack={() => setStep(3)}
        onRestart={restart}
      />
    )
  }

  return (
    <CalculatorShell step={step} onGetStarted={() => setStep(1)}>
      {content}
    </CalculatorShell>
  )
}
