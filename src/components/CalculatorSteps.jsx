import {
  MultiSelectField,
  NumberField,
  SelectField,
} from './FormFields'
import { FIELD_TOOLTIPS } from '../data/formOptions'
import {
  BUSINESS_MODELS,
  GROWTH_PERIODS,
  INDUSTRIES,
  MARKETING_CHANNELS,
} from '../data/formOptions'

export function Step1Business({ inputs, onChange }) {
  const set = (key) => (value) => onChange({ ...inputs, [key]: value })

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <SelectField
        id="industry"
        label="Business industry"
        tooltip={FIELD_TOOLTIPS.industry}
        value={inputs.industry}
        onChange={set('industry')}
        options={INDUSTRIES}
      />
      <SelectField
        id="businessModel"
        label="Business model"
        tooltip={FIELD_TOOLTIPS.businessModel}
        value={inputs.businessModel}
        onChange={set('businessModel')}
        options={BUSINESS_MODELS}
      />
      <NumberField
        id="currentMonthlyRevenue"
        label="Current monthly revenue"
        tooltip={FIELD_TOOLTIPS.currentMonthlyRevenue}
        value={inputs.currentMonthlyRevenue}
        onChange={set('currentMonthlyRevenue')}
        prefix="$"
        step={1000}
      />
      <NumberField
        id="avgRevenuePerCustomer"
        label="Average revenue per new customer"
        tooltip={FIELD_TOOLTIPS.avgRevenuePerCustomer}
        value={inputs.avgRevenuePerCustomer}
        onChange={set('avgRevenuePerCustomer')}
        prefix="$"
        step={50}
      />
      <div className="sm:col-span-2">
        <NumberField
          id="currentMonthlyCustomers"
          label="Current monthly customers"
          tooltip={FIELD_TOOLTIPS.currentMonthlyCustomers}
          value={inputs.currentMonthlyCustomers}
          onChange={set('currentMonthlyCustomers')}
          step={1}
        />
      </div>
    </div>
  )
}

export function Step2Marketing({ inputs, onChange }) {
  const set = (key) => (value) => onChange({ ...inputs, [key]: value })

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <NumberField
        id="desiredMonthlyRevenue"
        label="Desired monthly revenue"
        tooltip={FIELD_TOOLTIPS.desiredMonthlyRevenue}
        value={inputs.desiredMonthlyRevenue}
        onChange={set('desiredMonthlyRevenue')}
        prefix="$"
        step={1000}
      />
      <NumberField
        id="currentMarketingBudget"
        label="Current monthly marketing budget"
        tooltip={FIELD_TOOLTIPS.currentMarketingBudget}
        value={inputs.currentMarketingBudget}
        onChange={set('currentMarketingBudget')}
        prefix="$"
        step={100}
      />
      <div className="sm:col-span-2">
        <MultiSelectField
          label="Marketing channels"
          tooltip={FIELD_TOOLTIPS.marketingChannels}
          options={MARKETING_CHANNELS}
          selected={inputs.marketingChannels}
          onChange={set('marketingChannels')}
        />
      </div>
      <NumberField
        id="costPerLead"
        label="Estimated cost per lead"
        tooltip={FIELD_TOOLTIPS.costPerLead}
        value={inputs.costPerLead}
        onChange={set('costPerLead')}
        prefix="$"
        step={1}
      />
      <NumberField
        id="leadConversionRate"
        label="Lead-to-customer conversion rate"
        tooltip={FIELD_TOOLTIPS.leadConversionRate}
        value={inputs.leadConversionRate}
        onChange={set('leadConversionRate')}
        suffix="%"
        step={0.5}
        max={100}
      />
    </div>
  )
}

export function Step3Assumptions({ inputs, onChange }) {
  const set = (key) => (value) => onChange({ ...inputs, [key]: value })

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <NumberField
        id="grossProfitMargin"
        label="Average gross profit margin"
        tooltip={FIELD_TOOLTIPS.grossProfitMargin}
        value={inputs.grossProfitMargin}
        onChange={set('grossProfitMargin')}
        suffix="%"
        step={1}
      />
      <NumberField
        id="agencyFees"
        label="Agency and other marketing fees"
        tooltip={FIELD_TOOLTIPS.agencyFees}
        value={inputs.agencyFees}
        onChange={set('agencyFees')}
        prefix="$"
        step={100}
      />
      <div className="sm:col-span-2">
        <SelectField
          id="growthPeriod"
          label="Desired growth period"
          tooltip={FIELD_TOOLTIPS.growthPeriod}
          value={inputs.growthPeriod}
          onChange={set('growthPeriod')}
          options={GROWTH_PERIODS}
        />
      </div>
      <div className="sm:col-span-2 rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
        <strong className="font-semibold">Disclaimer:</strong> Projections use
        your inputs only and are illustrative — not guaranteed results. Revenue,
        gross profit, marketing ROI and ROAS are estimated separately.
      </div>
    </div>
  )
}
