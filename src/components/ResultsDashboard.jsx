import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  SCENARIOS,
  computeScenarioProjections,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatRoas,
} from '../utils/calculations'
import LeadCaptureForm from './LeadCaptureForm'

function MetricCard({ label, value, highlight, sub }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? 'border-bmm-blue/30 bg-bmm-blue-soft'
          : 'border-bmm-border bg-white'
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-bmm-muted">
        {label}
      </p>
      <p
        className={`mt-1 font-display text-xl font-bold sm:text-2xl ${
          highlight ? 'text-bmm-blue' : 'text-bmm-navy'
        }`}
      >
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-bmm-muted">{sub}</p>}
    </div>
  )
}

function ChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-bmm-border bg-white px-3 py-2 text-xs shadow-card">
      {label && <p className="mb-1 font-semibold text-bmm-navy">{label}</p>}
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {formatter ? formatter(entry.value) : entry.value}
        </p>
      ))}
    </div>
  )
}

export default function ResultsDashboard({ inputs, projections, activeScenario, onScenarioChange }) {
  const revenueChartData = [
    { name: 'Current', value: projections.currentRevenue, fill: '#94A3B8' },
    { name: 'Target', value: projections.targetRevenue, fill: '#046BD2' },
    {
      name: 'Additional',
      value: projections.additionalRevenue,
      fill: '#03E78B',
    },
  ]

  const investmentData = [
    {
      name: 'Advertising',
      value: projections.advertisingInvestment,
      fill: '#046BD2',
    },
    { name: 'Agency fees', value: projections.agencyFees, fill: '#1E88E5' },
  ]

  const funnelData = [
    { stage: 'Leads', count: projections.requiredLeads, fill: '#8ED1FC' },
    {
      stage: 'Customers',
      count: projections.additionalCustomers,
      fill: '#046BD2',
    },
    {
      stage: 'Revenue',
      count: projections.projectedAdditionalRevenue / 1000,
      fill: '#03E78B',
      isRevenue: true,
    },
  ]

  const scenarioResults = SCENARIOS.map((scenario) => ({
    ...scenario,
    projections: computeScenarioProjections(inputs, scenario),
  }))

  const roiColor =
    projections.marketingRoi >= 0 ? 'text-bmm-mint' : 'text-red-500'

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-bmm-border bg-white p-5 shadow-card sm:p-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-bmm-blue">
              Live projections
            </p>
            <h2 className="font-display text-xl font-bold text-bmm-navy sm:text-2xl">
              Your growth ROI dashboard
            </h2>
          </div>
          <span className="rounded-full bg-bmm-mint-soft px-3 py-1 text-xs font-semibold text-bmm-navy">
            Updates as you type
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard
            label="Target additional revenue"
            value={formatCurrency(projections.additionalRevenue)}
          />
          <MetricCard
            label="Additional customers"
            value={formatNumber(projections.additionalCustomers, 0)}
          />
          <MetricCard
            label="Estimated leads required"
            value={formatNumber(projections.requiredLeads, 0)}
          />
          <MetricCard
            label="Total marketing investment"
            value={formatCurrency(projections.totalMarketingInvestment)}
            highlight
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard
            label="Advertising investment"
            value={formatCurrency(projections.advertisingInvestment)}
          />
          <MetricCard
            label="Additional marketing fees"
            value={formatCurrency(projections.agencyFees)}
          />
          <MetricCard
            label="Estimated marketing ROI"
            value={formatPercent(projections.marketingRoi)}
            sub="Based on gross profit"
          />
          <MetricCard
            label="Estimated ROAS"
            value={formatRoas(projections.roas)}
            sub="Revenue ÷ ad spend"
          />
        </div>

        <p className={`mt-4 text-center text-sm font-semibold ${roiColor}`}>
          Marketing ROI uses gross profit ({formatPercent(inputs.grossProfitMargin, 0)}{' '}
          margin), not top-line revenue alone.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-bmm-border bg-white p-5 shadow-card">
          <h3 className="font-display text-base font-bold text-bmm-navy">
            Revenue comparison
          </h3>
          <p className="mt-0.5 text-xs text-bmm-muted">
            Current vs target monthly revenue
          </p>
          <div className="mt-4 h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueChartData} barSize={48}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                />
                <RechartsTooltip
                  content={
                    <ChartTooltip formatter={(v) => formatCurrency(v)} />
                  }
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {revenueChartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-bmm-border bg-white p-5 shadow-card">
          <h3 className="font-display text-base font-bold text-bmm-navy">
            Marketing investment breakdown
          </h3>
          <p className="mt-0.5 text-xs text-bmm-muted">
            Advertising vs agency and other fees
          </p>
          <div className="mt-2 flex h-52 items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={investmentData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={72}
                  paddingAngle={4}
                >
                  {investmentData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip
                  content={
                    <ChartTooltip formatter={(v) => formatCurrency(v)} />
                  }
                />
              </PieChart>
            </ResponsiveContainer>
            <ul className="shrink-0 space-y-2 pr-2 text-xs">
              {investmentData.map((item) => (
                <li key={item.name} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: item.fill }}
                  />
                  <span className="text-bmm-muted">{item.name}</span>
                  <span className="font-semibold text-bmm-navy">
                    {formatCurrency(item.value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-bmm-border bg-white p-5 shadow-card">
        <h3 className="font-display text-base font-bold text-bmm-navy">
          Acquisition funnel
        </h3>
        <p className="mt-0.5 text-xs text-bmm-muted">
          Estimated leads → customers → additional revenue
        </p>
        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
          {funnelData.map((step, i) => (
            <div key={step.stage} className="flex items-center gap-2 sm:gap-4">
              <div
                className="relative flex min-w-[140px] flex-col items-center rounded-xl px-4 py-5 text-center text-white"
                style={{
                  background: step.fill,
                  width: `${100 - i * 12}%`,
                  maxWidth: 220,
                }}
              >
                <span className="text-xs font-medium uppercase opacity-90">
                  {step.stage}
                </span>
                <span className="font-display text-2xl font-bold">
                  {step.isRevenue
                    ? formatCurrency(projections.projectedAdditionalRevenue)
                    : formatNumber(step.count, 0)}
                </span>
              </div>
              {i < funnelData.length - 1 && (
                <span className="hidden text-bmm-muted sm:inline">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-bmm-border bg-white p-5 shadow-card">
        <h3 className="font-display text-base font-bold text-bmm-navy">
          Scenario comparison
        </h3>
        <p className="mt-0.5 text-xs text-bmm-muted">
          Compare conservative, expected and optimistic CPL / conversion
          assumptions
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {scenarioResults.map((scenario) => {
            const selected = activeScenario === scenario.id
            const p = scenario.projections
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => onScenarioChange(scenario.id)}
                className={`rounded-xl border p-4 text-left transition ${
                  selected
                    ? 'border-bmm-blue bg-bmm-blue-soft ring-2 ring-bmm-blue/20'
                    : 'border-bmm-border bg-slate-50 hover:border-bmm-blue/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-bmm-navy">
                    {scenario.label}
                  </span>
                  {selected && (
                    <span className="rounded-full bg-bmm-blue px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                      Active
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-bmm-muted">{scenario.description}</p>
                <dl className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-bmm-muted">Conversion</dt>
                    <dd className="font-semibold">{scenario.conversionRate}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-bmm-muted">Cost per lead</dt>
                    <dd className="font-semibold">
                      {formatCurrency(scenario.costPerLead)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-bmm-border pt-1.5">
                    <dt className="text-bmm-muted">Total investment</dt>
                    <dd className="font-semibold text-bmm-blue">
                      {formatCurrency(p.totalMarketingInvestment)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-bmm-muted">Marketing ROI</dt>
                    <dd
                      className={`font-semibold ${
                        p.marketingRoi >= 0 ? 'text-emerald-600' : 'text-red-500'
                      }`}
                    >
                      {formatPercent(p.marketingRoi)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-bmm-muted">ROAS</dt>
                    <dd className="font-semibold">{formatRoas(p.roas)}</dd>
                  </div>
                </dl>
              </button>
            )
          })}
        </div>
        <p className="mt-3 text-[11px] text-bmm-muted">
          Selecting a scenario updates your conversion rate and cost per lead in
          step 2. Validate assumptions with your historical campaign data before
          going live.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-bmm-blue/40 bg-bmm-blue-soft/40 p-5">
        <h3 className="font-display text-base font-bold text-bmm-navy">
          Recommended next steps
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-bmm-slate">
          <li className="flex gap-2">
            <span className="font-bold text-bmm-blue">1.</span>
            Review whether your lead cost and conversion assumptions match recent
            campaigns.
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-bmm-blue">2.</span>
            Compare scenarios to stress-test budget before committing spend.
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-bmm-blue">3.</span>
            Book a free strategy session with Blue Moon Marketing to turn
            projections into an actionable plan.
          </li>
        </ul>
      </div>

      <LeadCaptureForm />
    </div>
  )
}
