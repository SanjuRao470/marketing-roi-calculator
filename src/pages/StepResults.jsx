import { FormActions, StepIntro } from '../components/ui/FormControls'
import {
  SCENARIOS,
  computeScenarioProjections,
  formatCurrency,
  formatNumber,
  formatRoas,
} from '../utils/calculations'

function MetricTile({ label, value, sub, accent }) {
  return (
    <div className="rounded-xl border border-bmm-line bg-white p-4">
      <p className="text-xs text-bmm-muted">{label}</p>
      <p
        className={`mt-1 text-xl font-bold sm:text-2xl ${
          accent ? 'text-bmm-blue' : 'text-bmm-ink'
        }`}
      >
        {value}
      </p>
      {sub && <p className="mt-0.5 text-[11px] text-bmm-muted">{sub}</p>}
    </div>
  )
}

function RevenueBars({ current, target }) {
  const max = Math.max(current, target, 1)
  const rows = [
    { label: 'Current', value: current, split: true },
    { label: 'Target', value: target, split: false },
    { label: 'Projected', value: target, split: false },
  ]

  return (
    <div className="space-y-4">
      {rows.map((row) => {
        const width = `${(row.value / max) * 100}%`
        return (
          <div key={row.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-bmm-ink">{row.label}</span>
              <span className="text-bmm-muted">
                ${(row.value / 1000).toFixed(1)}k
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-gray-100">
              {row.split ? (
                <div className="flex h-full" style={{ width }}>
                  <div className="h-full flex-[0.62] bg-bmm-navy" />
                  <div className="h-full flex-1 bg-sky-300" />
                </div>
              ) : (
                <div
                  className="h-full rounded-full bg-bmm-blue"
                  style={{ width }}
                />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function FunnelList({ projections, conversionRate }) {
  const rows = [
    { label: 'Estimated leads', value: formatNumber(projections.requiredLeads, 0) },
    { label: 'Conversion rate', value: `${formatNumber(conversionRate, 0)}%` },
    {
      label: 'New customers',
      value: formatNumber(projections.additionalCustomers, 0),
    },
    {
      label: 'Revenue generated',
      value: formatCurrency(projections.projectedAdditionalRevenue),
    },
    { label: 'Advertising ROAS', value: formatRoas(projections.roas) },
  ]

  return (
    <dl className="divide-y divide-bmm-line">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between py-3 text-sm">
          <dt className="text-bmm-muted">{row.label}</dt>
          <dd className="font-semibold text-bmm-ink">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function StepResults({
  inputs,
  projections,
  onBack,
  onEdit,
  onConsult,
  activeScenario,
  onScenarioSelect,
}) {
  const scenarioRows = SCENARIOS.map((scenario) => ({
    ...scenario,
    projections: computeScenarioProjections(inputs, scenario),
  }))

  return (
    <>
      <StepIntro
        eyebrow="Your growth snapshot"
        title="Here's what your numbers could look like."
        description="These projections update instantly when you change your assumptions. They are estimates for planning — not guarantees."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <MetricTile
          label="Additional revenue target"
          value={formatCurrency(projections.additionalRevenue)}
          sub="Per month"
          accent
        />
        <MetricTile
          label="Required new customers"
          value={formatNumber(projections.additionalCustomers, 0)}
          sub="Per month"
        />
        <MetricTile
          label="Required leads"
          value={formatNumber(projections.requiredLeads, 0)}
          sub="Per month"
        />
        <MetricTile
          label="Estimated ad investment"
          value={formatCurrency(projections.advertisingInvestment)}
          sub="Per month"
        />
        <MetricTile
          label="Total marketing investment"
          value={formatCurrency(projections.totalMarketingInvestment)}
          sub="Including fees"
        />
        <MetricTile
          label="Projected marketing ROI"
          value={`${formatNumber(projections.marketingRoi, 1)}%`}
          sub="Gross-profit basis"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-bmm-line p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-bmm-ink">Revenue opportunity</h3>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-bmm-muted">
              Monthly view
            </span>
          </div>
          <RevenueBars
            current={projections.currentRevenue}
            target={projections.targetRevenue}
          />
          <p className="mt-4 text-[11px] leading-relaxed text-bmm-muted">
            Projected revenue assumes your conversion rate and lead costs remain
            consistent across the measurement period.
          </p>
        </div>

        <div className="rounded-xl border border-bmm-line p-5">
          <h3 className="mb-2 font-semibold text-bmm-ink">
            Lead-to-customer funnel
          </h3>
          <FunnelList
            projections={projections}
            conversionRate={inputs.leadConversionRate}
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-bmm-line p-5">
        <h3 className="font-semibold text-bmm-ink">Explore scenarios</h3>
        <p className="mt-1 text-xs text-bmm-muted">
          Compare the effect of different lead costs and conversion assumptions.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-bmm-line text-xs text-bmm-muted">
                <th className="pb-2 font-medium">Scenario</th>
                <th className="pb-2 font-medium">Conversion</th>
                <th className="pb-2 font-medium">Cost / lead</th>
                <th className="pb-2 font-medium">Ad budget</th>
              </tr>
            </thead>
            <tbody>
              {scenarioRows.map((row) => {
                const selected = activeScenario === row.id
                return (
                  <tr
                    key={row.id}
                    onClick={() => onScenarioSelect(row.id)}
                    className={`cursor-pointer border-b border-bmm-line last:border-0 ${
                      selected ? 'bg-bmm-blue-soft/50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="py-3 font-semibold text-bmm-ink">
                      {row.label}
                    </td>
                    <td className="py-3">{row.conversionRate}%</td>
                    <td className="py-3">{formatCurrency(row.costPerLead)}</td>
                    <td className="py-3 font-semibold">
                      {formatCurrency(row.projections.advertisingInvestment)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-bmm-muted">
        Estimates assume marketing-attributed growth within your selected period.
        Actual performance depends on offer quality, sales process, competition and
        channel mix. ROI is calculated on gross profit, not revenue alone.
      </p>

      <FormActions
        onBack={onBack}
        backLabel="← Edit assumptions"
        primaryLabel="Discuss my growth plan →"
        onPrimary={onConsult}
      />
    </>
  )
}
