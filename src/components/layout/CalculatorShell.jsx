import { SiteFooter, SiteHeader } from './SiteChrome'
import StepProgress from './StepProgress'

export default function CalculatorShell({ step, onGetStarted, children }) {
  return (
    <div className="min-h-screen bg-bmm-canvas px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-shell overflow-hidden rounded-4xl bg-white shadow-shell">
        <SiteHeader onGetStarted={onGetStarted} />
        <StepProgress currentStep={step} />
        <div className="px-6 py-8 sm:px-10 sm:py-10">{children}</div>
        <SiteFooter />
      </div>
    </div>
  )
}
