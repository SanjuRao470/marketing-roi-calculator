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
