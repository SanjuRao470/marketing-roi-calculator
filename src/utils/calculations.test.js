import { describe, expect, it } from 'vitest'
import { DEFAULT_INPUTS } from '../data/formOptions'
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
    const p = computeScenarioProjections(base, SCENARIOS[0])
    expect(p.advertisingInvestment).toBe(17160)
  })

  it('expected row uses $10,000 ad budget', () => {
    const p = computeScenarioProjections(base, SCENARIOS[1])
    expect(p.advertisingInvestment).toBe(10000)
  })

  it('optimistic row uses $6,160 ad budget', () => {
    const p = computeScenarioProjections(base, SCENARIOS[2])
    expect(p.advertisingInvestment).toBe(6160)
  })
})

describe('data flow across wizard steps', () => {
  it('recalculates when step 1 revenue target changes', () => {
    const base = computeProjections(DEFAULT_INPUTS)
    expect(base.additionalRevenue).toBe(20000)

    const updated = computeProjections({
      ...DEFAULT_INPUTS,
      desiredMonthlyRevenue: 60000,
    })
    expect(updated.additionalRevenue).toBe(30000)
    expect(updated.requiredLeads).toBe(600)
    expect(updated.totalMarketingInvestment).toBe(16000)
  })

  it('recalculates when step 2 conversion rate changes', () => {
    const lowConv = computeProjections({
      ...DEFAULT_INPUTS,
      leadConversionRate: 5,
    })
    const highConv = computeProjections({
      ...DEFAULT_INPUTS,
      leadConversionRate: 20,
    })
    expect(lowConv.requiredLeads).toBeGreaterThan(highConv.requiredLeads)
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
})
