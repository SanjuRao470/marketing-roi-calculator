/**
 * Core projection math for the Marketing ROI Calculator.
 * All monetary values are treated as numbers in the user's currency.
 */

export function computeProjections(inputs) {
  const currentRevenue = Number(inputs.currentMonthlyRevenue) || 0
  const targetRevenue = Number(inputs.desiredMonthlyRevenue) || 0
  const revenuePerCustomer = Number(inputs.avgRevenuePerCustomer) || 0
  const conversionRate = (Number(inputs.leadConversionRate) || 0) / 100
  const costPerLead = Number(inputs.costPerLead) || 0
  const grossMargin = (Number(inputs.grossProfitMargin) || 0) / 100
  const agencyFees = Number(inputs.agencyFees) || 0

  const additionalRevenue = Math.max(0, targetRevenue - currentRevenue)

  const additionalCustomers =
    revenuePerCustomer > 0 ? additionalRevenue / revenuePerCustomer : 0

  const requiredLeads =
    conversionRate > 0 ? additionalCustomers / conversionRate : 0

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
    advertisingInvestment,
    agencyFees,
    totalMarketingInvestment,
    projectedAdditionalRevenue,
    additionalGrossProfit,
    marketingRoi,
    roas,
    currentRevenue,
    targetRevenue,
  }
}

export const SCENARIOS = [
  {
    id: 'conservative',
    label: 'Conservative',
    conversionRate: 7,
    costPerLead: 30,
    description: 'Lower conversion, higher lead cost',
  },
  {
    id: 'expected',
    label: 'Expected',
    conversionRate: 10,
    costPerLead: 25,
    description: 'Baseline assumptions',
  },
  {
    id: 'optimistic',
    label: 'Optimistic',
    conversionRate: 13,
    costPerLead: 20,
    description: 'Strong conversion, efficient CPL',
  },
]

export function computeScenarioProjections(baseInputs, scenario) {
  return computeProjections({
    ...baseInputs,
    leadConversionRate: scenario.conversionRate,
    costPerLead: scenario.costPerLead,
  })
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

export function formatRoas(value) {
  return `${formatNumber(value, 1)}x`
}
