/**
 * Marketing ROI projection engine (AUD).
 * Lead counts use ceiling for planning-style integer leads (matches Figma scenario table).
 */

export function computeProjections(inputs) {
  const currentRevenue = Number(inputs.currentMonthlyRevenue) || 0
  const targetRevenue = Number(inputs.desiredMonthlyRevenue) || 0
  const revenuePerCustomer = Number(inputs.avgRevenuePerCustomer) || 0
  const conversionRatePct = Number(inputs.leadConversionRate) || 0
  const conversionRate = conversionRatePct / 100
  const costPerLead = Number(inputs.costPerLead) || 0
  const grossMargin = (Number(inputs.grossProfitMargin) || 0) / 100
  const agencyFees = Number(inputs.agencyFees) || 0

  const additionalRevenue = Math.max(0, targetRevenue - currentRevenue)

  const additionalCustomersRaw =
    revenuePerCustomer > 0 ? additionalRevenue / revenuePerCustomer : 0
  const additionalCustomers = additionalCustomersRaw

  const requiredLeadsRaw =
    conversionRate > 0 ? additionalCustomersRaw / conversionRate : 0
  const requiredLeads =
    additionalCustomersRaw > 0 ? Math.ceil(requiredLeadsRaw) : 0

  const advertisingInvestment = requiredLeads * costPerLead
  const totalMarketingInvestment = advertisingInvestment + agencyFees

  const projectedAdditionalRevenue = additionalCustomers * revenuePerCustomer

  const additionalGrossProfit = projectedAdditionalRevenue * grossMargin

  const marketingRoi =
    totalMarketingInvestment > 0
      ? ((additionalGrossProfit - totalMarketingInvestment) /
          totalMarketingInvestment) *
        100
      : 0

  const roas =
    advertisingInvestment > 0
      ? projectedAdditionalRevenue / advertisingInvestment
      : 0

  return {
    additionalRevenue,
    additionalCustomers,
    requiredLeads,
    requiredLeadsRaw,
    advertisingInvestment,
    agencyFees,
    totalMarketingInvestment,
    projectedAdditionalRevenue,
    additionalGrossProfit,
    marketingRoi,
    roas,
    currentRevenue,
    targetRevenue,
    projectedTotalRevenue: currentRevenue + projectedAdditionalRevenue,
  }
}

export const SCENARIOS = [
  {
    id: 'conservative',
    label: 'Conservative',
    conversionRate: 7,
    costPerLead: 30,
  },
  {
    id: 'expected',
    label: 'Expected',
    conversionRate: 10,
    costPerLead: 25,
  },
  {
    id: 'optimistic',
    label: 'Optimistic',
    conversionRate: 13,
    costPerLead: 20,
  },
]

export function computeScenarioProjections(baseInputs, scenario) {
  return computeProjections({
    ...baseInputs,
    leadConversionRate: scenario.conversionRate,
    costPerLead: scenario.costPerLead,
  })
}

export function matchScenario(inputs) {
  return (
    SCENARIOS.find(
      (s) =>
        s.conversionRate === inputs.leadConversionRate &&
        s.costPerLead === inputs.costPerLead,
    )?.id ?? null
  )
}

export function formatCurrency(value, currency = 'AUD') {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value || 0)
}

export function formatNumber(value, decimals = 0) {
  return new Intl.NumberFormat('en-AU', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value || 0)
}

export function formatPercent(value, decimals = 2) {
  return `${formatNumber(value, decimals)}%`
}

export function formatRoas(value, decimals = 2) {
  return `${formatNumber(value, decimals)}x`
}

export const EXAMPLE_INPUTS = {
  currentMonthlyRevenue: 30000,
  desiredMonthlyRevenue: 50000,
  avgRevenuePerCustomer: 500,
  leadConversionRate: 10,
  costPerLead: 25,
  grossProfitMargin: 50,
  agencyFees: 1000,
}
