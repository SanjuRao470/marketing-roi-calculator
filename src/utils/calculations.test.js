import { describe, expect, it } from 'vitest'
import {
  EXAMPLE_INPUTS,
  SCENARIOS,
  computeProjections,
  computeScenarioProjections,
} from './calculations'

describe('computeProjections — proposal example', () => {
  it('matches calculation methodology from section 5', () => {
    const p = computeProjections(EXAMPLE_INPUTS)

    expect(p.additionalRevenue).toBe(20000)
    expect(p.additionalCustomers).toBe(40)
    expect(p.requiredLeads).toBe(400)
    expect(p.advertisingInvestment).toBe(10000)
    expect(p.totalMarketingInvestment).toBe(11000)
    expect(p.projectedAdditionalRevenue).toBe(20000)
    expect(p.marketingRoi).toBeCloseTo(-9.090909, 4)
    expect(p.roas).toBe(2)
  })
})

describe('scenario ad budgets (Figma table)', () => {
  const base = {
    ...EXAMPLE_INPUTS,
    currentMonthlyCustomers: 60,
  }

  it('conservative row uses $17,160 ad budget', () => {
    const s = SCENARIOS[0]
    const p = computeScenarioProjections(base, s)
    expect(p.advertisingInvestment).toBe(17160)
  })

  it('expected row uses $10,000 ad budget', () => {
    const s = SCENARIOS[1]
    const p = computeScenarioProjections(base, s)
    expect(p.advertisingInvestment).toBe(10000)
  })

  it('optimistic row uses $6,160 ad budget', () => {
    const s = SCENARIOS[2]
    const p = computeScenarioProjections(base, s)
    expect(p.advertisingInvestment).toBe(6160)
  })
})

describe('edge cases', () => {
  it('returns zero leads when target equals current revenue', () => {
    const p = computeProjections({
      ...EXAMPLE_INPUTS,
      desiredMonthlyRevenue: 30000,
    })
    expect(p.requiredLeads).toBe(0)
    expect(p.advertisingInvestment).toBe(0)
  })

  it('updates live when conversion rate changes', () => {
    const low = computeProjections({ ...EXAMPLE_INPUTS, leadConversionRate: 7 })
    const high = computeProjections({ ...EXAMPLE_INPUTS, leadConversionRate: 13 })
    expect(low.requiredLeads).toBeGreaterThan(high.requiredLeads)
    expect(low.advertisingInvestment).toBeGreaterThan(high.advertisingInvestment)
  })
})
