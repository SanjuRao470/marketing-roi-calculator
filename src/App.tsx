import { useMemo, useState } from 'react'
import './App.css'

function parseAmount(raw: string): number | null {
  const trimmed = raw.trim()
  if (trimmed === '') return 0
  const value = Number(trimmed)
  return Number.isFinite(value) ? value : null
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

function formatRatio(value: number): string {
  return `${value.toFixed(2)}×`
}

export default function App() {
  const [spend, setSpend] = useState('10000')
  const [revenue, setRevenue] = useState('25000')
  const [otherCosts, setOtherCosts] = useState('0')

  const spendValue = parseAmount(spend)
  const revenueValue = parseAmount(revenue)
  const otherCostsValue = parseAmount(otherCosts)

  const invalid =
    spendValue === null || revenueValue === null || otherCostsValue === null

  const metrics = useMemo(() => {
    if (
      invalid ||
      spendValue === null ||
      revenueValue === null ||
      otherCostsValue === null
    ) {
      return null
    }

    const profit = revenueValue - spendValue - otherCostsValue
    const roi =
      spendValue === 0 ? null : ((profit / spendValue) * 100)
    const roas = spendValue === 0 ? null : revenueValue / spendValue

    return { profit, roi, roas }
  }, [invalid, spendValue, revenueValue, otherCostsValue])

  return (
    <div className="app">
      <header className="header">
        <h1>Marketing ROI Calculator</h1>
        <p>
          Estimate return on ad spend using campaign revenue, marketing spend,
          and optional fulfillment costs.
        </p>
      </header>

      <main className="layout">
        <section className="panel" aria-labelledby="inputs-heading">
          <h2 id="inputs-heading">Campaign inputs</h2>
          <label className="field">
            <span>Marketing spend</span>
            <input
              inputMode="decimal"
              value={spend}
              onChange={(event) => setSpend(event.target.value)}
              aria-invalid={spendValue === null}
            />
          </label>
          <label className="field">
            <span>Attributed revenue</span>
            <input
              inputMode="decimal"
              value={revenue}
              onChange={(event) => setRevenue(event.target.value)}
              aria-invalid={revenueValue === null}
            />
          </label>
          <label className="field">
            <span>Other costs (optional)</span>
            <input
              inputMode="decimal"
              value={otherCosts}
              onChange={(event) => setOtherCosts(event.target.value)}
              aria-invalid={otherCostsValue === null}
            />
          </label>
          {invalid ? (
            <p className="error" role="alert">
              Enter valid numbers in every field.
            </p>
          ) : null}
        </section>

        <section className="panel results" aria-labelledby="results-heading">
          <h2 id="results-heading">Results</h2>
          {metrics ? (
            <dl className="metrics">
              <div>
                <dt>Net profit</dt>
                <dd data-testid="net-profit">
                  {formatCurrency(metrics.profit)}
                </dd>
              </div>
              <div>
                <dt>ROI</dt>
                <dd data-testid="roi">
                  {metrics.roi === null
                    ? '— (no spend)'
                    : formatPercent(metrics.roi)}
                </dd>
              </div>
              <div>
                <dt>ROAS</dt>
                <dd data-testid="roas">
                  {metrics.roas === null
                    ? '— (no spend)'
                    : formatRatio(metrics.roas)}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="muted">Fix invalid inputs to see metrics.</p>
          )}
          <p className="footnote">
            ROI = (revenue − spend − other costs) ÷ spend. ROAS = revenue ÷
            spend.
          </p>
        </section>
      </main>
    </div>
  )
}
