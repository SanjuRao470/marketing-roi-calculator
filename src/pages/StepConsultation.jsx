import { useState } from 'react'
import {
  SelectField,
  StepIntro,
  TextField,
} from '../components/ui/FormControls'
import { IconArrowLeft, IconRefresh } from '../components/ui/Icons'
import { CONSULTATION_TOPICS } from '../data/formOptions'
import { formatCurrency, formatNumber } from '../utils/calculations'

export default function StepConsultation({
  inputs,
  projections,
  onBack,
  onRestart,
}) {
  const [form, setForm] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    topic: CONSULTATION_TOPICS[0],
    agreed: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.agreed) return
    setSubmitted(true)
  }

  return (
    <>
      <StepIntro
        eyebrow="Your next move"
        title="Let's turn your growth goals into a strategy."
        description="Share a few details and we'll follow up to discuss your scenario, validate assumptions and outline practical next steps."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-xl border border-bmm-line p-5 shadow-card lg:col-span-3">
          <h2 className="text-sm font-semibold text-bmm-ink">
            Request a strategy consultation
          </h2>
          {submitted ? (
            <div className="mt-6 rounded-lg bg-bmm-blue-soft px-4 py-6 text-center">
              <p className="font-semibold text-bmm-ink">Request received</p>
              <p className="mt-2 text-sm text-bmm-muted">
                A Blue Moon Marketing specialist will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  id="name"
                  label="Full name *"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                />
                <TextField
                  id="business"
                  label="Business name"
                  placeholder="Your business"
                  value={form.business}
                  onChange={(v) => setForm({ ...form, business: v })}
                />
                <TextField
                  id="email"
                  label="Business email *"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  required
                />
                <TextField
                  id="phone"
                  label="Phone number"
                  placeholder="+61"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                />
              </div>
              <SelectField
                id="topic"
                label="What would you like help with?"
                value={form.topic}
                onChange={(v) => setForm({ ...form, topic: v })}
                options={CONSULTATION_TOPICS}
              />
              <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-bmm-muted">
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-bmm-blue focus:ring-bmm-blue"
                  required
                />
                I agree to be contacted about my enquiry and acknowledge the
                website privacy policy.
              </label>
              <button type="submit" className="btn-primary w-full">
                Request my consultation →
              </button>
            </form>
          )}
        </div>

        <aside className="rounded-xl bg-gray-50 p-5 lg:col-span-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-bmm-blue">
            Your estimate
          </p>
          <p className="mt-3 text-[2rem] font-bold tabular-nums leading-none text-bmm-ink">
            {formatCurrency(inputs.desiredMonthlyRevenue)}
          </p>
          <p className="mt-1 text-xs text-bmm-muted">Desired monthly revenue</p>

          <dl className="mt-6 space-y-0 divide-y divide-bmm-line border-t border-bmm-line text-sm">
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-bmm-muted">Additional revenue target</dt>
              <dd className="font-semibold tabular-nums">
                {formatCurrency(projections.additionalRevenue)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-bmm-muted">Estimated leads needed</dt>
              <dd className="font-semibold tabular-nums">
                {formatNumber(projections.requiredLeads, 0)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-bmm-muted">Estimated monthly investment</dt>
              <dd className="font-semibold tabular-nums">
                {formatCurrency(projections.totalMarketingInvestment)}
              </dd>
            </div>
          </dl>

          <div className="mt-5 rounded-lg border border-bmm-line bg-white p-4 text-xs leading-relaxed text-bmm-muted">
            Bring these assumptions to your consultation. A specialist can help
            validate your numbers against your industry, audience, campaign
            history and sales capacity.
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-bmm-muted">
            Blue Moon Marketing · Australian digital marketing and business growth
            partner.
          </p>
        </aside>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button type="button" onClick={onBack} className="btn-outline">
          <IconArrowLeft />
          Back to results
        </button>
        <button type="button" onClick={onRestart} className="btn-outline">
          Start again
          <IconRefresh />
        </button>
      </div>
    </>
  )
}
