export const INDUSTRIES = [
  'Professional Services',
  'Healthcare & Medical',
  'Retail & eCommerce',
  'Hospitality & Food',
  'Construction & Trades',
  'Real Estate',
  'Education & Childcare',
  'Finance & Insurance',
  'Technology',
  'Other',
]

export const BUSINESS_MODELS = [
  'Service-based',
  'Product-based',
  'Hybrid (Products & Services)',
  'Subscription / Recurring',
  'Marketplace',
]

export const MARKETING_CHANNELS = [
  'Google Ads',
  'Meta Ads',
  'SEO',
  'Social Media',
  'Content',
  'Other',
]

export const GROWTH_PERIODS = [
  { value: '1', label: '1 month' },
  { value: '3', label: '3 months' },
  { value: '6', label: '6 months' },
  { value: '12', label: '12 months' },
]

export const CONSULTATION_TOPICS = [
  'Marketing strategy',
  'Google Ads & paid media',
  'SEO & organic growth',
  'Social media marketing',
  'Full growth plan',
]

export const DEFAULT_INPUTS = {
  industry: 'Professional Services',
  businessModel: 'Service-based',
  currentMonthlyRevenue: 30000,
  desiredMonthlyRevenue: 50000,
  avgRevenuePerCustomer: 500,
  currentMonthlyCustomers: 60,
  currentMarketingBudget: 2000,
  marketingChannels: ['Google Ads', 'Meta Ads'],
  costPerLead: 25,
  leadConversionRate: 10,
  grossProfitMargin: 50,
  agencyFees: 1000,
  growthPeriod: '3',
}

export const FIELD_TOOLTIPS = {
  industry:
    'Used for context only — projections are driven by your revenue and marketing inputs.',
  businessModel: 'How your business primarily earns revenue.',
  currentMonthlyRevenue: 'Average monthly revenue before growth initiatives (AUD).',
  desiredMonthlyRevenue: 'The monthly revenue target you want to model.',
  avgRevenuePerCustomer:
    'Average revenue from a new customer in the measurement period (not LTV unless you enter LTV).',
  currentMonthlyCustomers: 'Approximate customers or active clients per month.',
  currentMarketingBudget:
    'Paid media only — exclude agency retainers (enter those separately).',
  costPerLead: 'Average cost to acquire one marketing lead across channels.',
  leadConversionRate: 'Share of leads that become paying customers.',
  grossProfitMargin:
    'Revenue minus direct costs (COGS). ROI uses gross profit, not revenue.',
  agencyFees: 'Monthly agency, creative, or other non-ad marketing fees.',
  growthPeriod: 'Timeframe for reaching your revenue target.',
  marketingChannels: 'Channels you use or plan to use (planning context only).',
}
