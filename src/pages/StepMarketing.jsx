import {
  ChannelCheckboxes,
  CurrencyField,
  FormActions,
  SelectField,
  SliderField,
  StepIntro,
} from '../components/ui/FormControls'
import { GROWTH_PERIODS, MARKETING_CHANNELS } from '../data/formOptions'

export default function StepMarketing({ inputs, onChange, onBack, onNext }) {
  const set = (key) => (value) => onChange({ ...inputs, [key]: value })

  return (
    <>
      <StepIntro
        eyebrow="Step 02 — Marketing assumptions"
        title="Let's map your marketing investment."
        description="Adjust these assumptions to explore how marketing activity could contribute to your growth target."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <CurrencyField
          id="currentMarketingBudget"
          label="Current monthly advertising budget (AUD)"
          hint="Paid media spend only; excludes agency fees."
          value={inputs.currentMarketingBudget}
          onChange={set('currentMarketingBudget')}
          step={100}
        />
        <CurrencyField
          id="agencyFees"
          label="Monthly agency / other marketing fees (AUD)"
          value={inputs.agencyFees}
          onChange={set('agencyFees')}
          step={100}
        />
        <CurrencyField
          id="costPerLead"
          label="Estimated cost per lead (AUD)"
          hint="Use your own campaign data where available."
          value={inputs.costPerLead}
          onChange={set('costPerLead')}
        />
        <SliderField
          id="leadConversionRate"
          label="Lead-to-customer conversion rate"
          value={inputs.leadConversionRate}
          onChange={set('leadConversionRate')}
          min={1}
          max={40}
          step={0.5}
        />
        <SliderField
          id="grossProfitMargin"
          label="Gross profit margin"
          value={inputs.grossProfitMargin}
          onChange={set('grossProfitMargin')}
          min={5}
          max={95}
          step={1}
        />
        <SelectField
          id="growthPeriod"
          label="Growth measurement period"
          value={inputs.growthPeriod}
          onChange={set('growthPeriod')}
          options={GROWTH_PERIODS}
        />
      </div>

      <div className="mt-8">
        <p className="mb-3 text-sm font-medium text-bmm-ink">
          Which marketing channels are relevant?
        </p>
        <ChannelCheckboxes
          options={MARKETING_CHANNELS}
          selected={inputs.marketingChannels}
          onChange={set('marketingChannels')}
        />
      </div>

      <p className="mt-6 text-xs leading-relaxed text-bmm-muted">
        Benchmarks are starting points only. You can edit every assumption to
        reflect your business, industry and historical performance.
      </p>

      <FormActions
        onBack={onBack}
        primaryLabel="Calculate my growth →"
        onPrimary={onNext}
      />
    </>
  )
}
