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
  'LinkedIn Ads',
  'Email Marketing',
  'Content Marketing',
  'Social Media Organic',
  'TikTok Ads',
]

export const GROWTH_PERIODS = [
  { value: '1', label: '1 month' },
  { value: '3', label: '3 months' },
  { value: '6', label: '6 months' },
  { value: '12', label: '12 months' },
]

export const DEFAULT_INPUTS = {
  industry: 'Professional Services',
  businessModel: 'Service-based',
  currentMonthlyRevenue: 30000,
  avgRevenuePerCustomer: 500,
  currentMonthlyCustomers: 60,
  desiredMonthlyRevenue: 50000,
  currentMarketingBudget: 2000,
  marketingChannels: ['Google Ads', 'Meta Ads', 'SEO'],
  costPerLead: 25,
  leadConversionRate: 10,
  grossProfitMargin: 50,
  agencyFees: 1000,
  growthPeriod: '3',
}

export const FIELD_TOOLTIPS = {
  industry: 'Helps contextualise benchmarks — projections still use your custom inputs.',
  businessModel: 'How your business earns revenue (services, products, etc.).',
  currentMonthlyRevenue: 'Average revenue per month before growth initiatives.',
  avgRevenuePerCustomer: 'Typical revenue from one new customer in the period.',
  currentMonthlyCustomers: 'Approximate active customers or clients per month.',
  desiredMonthlyRevenue: 'Your revenue goal for the selected growth period.',
  currentMarketingBudget: 'What you currently spend on marketing each month.',
  marketingChannels: 'Channels you use or plan to use — for planning only.',
  costPerLead: 'Estimated average cost to acquire one marketing lead.',
  leadConversionRate: 'Percentage of leads that become paying customers.',
  grossProfitMargin: 'Share of revenue left after direct costs (COGS).',
  agencyFees: 'Monthly agency, creative, or other non-ad marketing fees.',
  growthPeriod: 'Timeframe over which you want to reach your revenue target.',
}
