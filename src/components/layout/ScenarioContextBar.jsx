import { formatCurrency, formatNumber, formatRoas } from '../../utils/calculations'

export default function ScenarioContextBar({ inputs, projections, step }) {
  const showMarketing = step >= 2
  const showProjections = step >= 2 && projections

  return (
    <div
      className="mb-6 rounded-lg border border-bmm-blue/20 bg-bmm-blue-soft px-4 py-3 text-xs text-bmm-muted"
      aria-live="polite"
    >
      <p className="mb-2 font-semibold uppercase tracking-wide text-bmm-blue">
        Your scenario (updates live)
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5">
        <span>
          <span className="text-bmm-muted">Revenue </span>
          <span className="font-semibold tabular-nums text-bmm-ink">
            {formatCurrency(inputs.currentMonthlyRevenue)}
          </span>
          <span className="text-bmm-muted"> → </span>
          <span className="font-semibold tabular-nums text-bmm-blue">
            {formatCurrency(inputs.desiredMonthlyRevenue)}
          </span>
        </span>
        <span>
          <span className="text-bmm-muted">Customers </span>
          <span className="font-semibold tabular-nums text-bmm-ink">
            {formatNumber(inputs.currentMonthlyCustomers, 0)}
          </span>
        </span>
        <span>
          <span className="text-bmm-muted">ARPU </span>
          <span className="font-semibold tabular-nums text-bmm-ink">
            {formatCurrency(inputs.avgRevenuePerCustomer)}
          </span>
        </span>
        {showMarketing && (
          <>
            <span>
              <span className="text-bmm-muted">Ad budget </span>
              <span className="font-semibold tabular-nums text-bmm-ink">
                {formatCurrency(inputs.currentMarketingBudget)}
              </span>
            </span>
            <span>
              <span className="text-bmm-muted">CPL </span>
              <span className="font-semibold tabular-nums text-bmm-ink">
                {formatCurrency(inputs.costPerLead)}
              </span>
            </span>
            <span>
              <span className="text-bmm-muted">Conv. </span>
              <span className="font-semibold tabular-nums text-bmm-ink">
                {formatNumber(inputs.leadConversionRate, 1)}%
              </span>
            </span>
          </>
        )}
        {showProjections && (
          <>
            <span>
              <span className="text-bmm-muted">Leads needed </span>
              <span className="font-semibold tabular-nums text-bmm-ink">
                {formatNumber(projections.requiredLeads, 0)}
              </span>
            </span>
            <span>
              <span className="text-bmm-muted">Total investment </span>
              <span className="font-semibold tabular-nums text-bmm-ink">
                {formatCurrency(projections.totalMarketingInvestment)}
              </span>
            </span>
            <span>
              <span className="text-bmm-muted">ROI </span>
              <span className="font-semibold tabular-nums text-bmm-ink">
                {formatNumber(projections.marketingRoi, 1)}%
              </span>
            </span>
            <span>
              <span className="text-bmm-muted">ROAS </span>
              <span className="font-semibold tabular-nums text-bmm-ink">
                {formatRoas(projections.roas, 2)}
              </span>
            </span>
          </>
        )}
      </div>
    </div>
  )
}
