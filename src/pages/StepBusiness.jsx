import {
  CurrencyField,
  FormActions,
  NumberField,
  SelectField,
  StepIntro,
} from '../components/ui/FormControls'
import { BUSINESS_MODELS, INDUSTRIES } from '../data/formOptions'

export default function StepBusiness({ inputs, onChange, onBack, onNext }) {
  const set = (key) => (value) => onChange({ ...inputs, [key]: value })

  return (
    <>
      <StepIntro
        eyebrow="Step 01 — Your business"
        title="Let's understand where you are today."
        description="Start with a few details about your business. This helps us model a relevant growth scenario."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id="industry"
          label="What industry are you in?"
          value={inputs.industry}
          onChange={set('industry')}
          options={INDUSTRIES}
        />
        <SelectField
          id="businessModel"
          label="Business model"
          value={inputs.businessModel}
          onChange={set('businessModel')}
          options={BUSINESS_MODELS}
        />
        <CurrencyField
          id="currentMonthlyRevenue"
          label="Current monthly revenue (AUD)"
          hint="Your average revenue in a typical month."
          value={inputs.currentMonthlyRevenue}
          onChange={set('currentMonthlyRevenue')}
          step={1000}
        />
        <CurrencyField
          id="desiredMonthlyRevenue"
          label="Desired monthly revenue (AUD)"
          hint="The monthly revenue you want to work towards."
          value={inputs.desiredMonthlyRevenue}
          onChange={set('desiredMonthlyRevenue')}
          step={1000}
        />
        <CurrencyField
          id="avgRevenuePerCustomer"
          label="Average revenue per new customer (AUD)"
          hint="Average initial customer revenue, not lifetime value unless specified."
          value={inputs.avgRevenuePerCustomer}
          onChange={set('avgRevenuePerCustomer')}
          step={50}
        />
        <NumberField
          id="currentMonthlyCustomers"
          label="Current monthly customers"
          value={inputs.currentMonthlyCustomers}
          onChange={set('currentMonthlyCustomers')}
        />
      </div>

      <FormActions
        onBack={onBack}
        backLabel="← Back"
        primaryLabel="Continue to marketing →"
        onPrimary={onNext}
      />
    </>
  )
}
