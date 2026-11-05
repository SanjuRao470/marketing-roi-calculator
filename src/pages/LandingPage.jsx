import { SiteFooter, SiteHeader } from '../components/layout/SiteChrome'

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-bmm-canvas px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-4xl bg-white shadow-shell">
        <SiteHeader onGetStarted={onStart} />

        <div className="px-6 pb-8 sm:px-10 sm:pb-10">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A1628] via-[#0F2744] to-[#1A3A5C] px-8 py-12 text-white shadow-hero sm:px-12 sm:py-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
              Your business. Your next level.
            </p>
            <h1 className="mt-4 max-w-xl text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.65rem]">
              Make your next marketing move a smarter one.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              Discover the marketing investment, leads and customer growth you may
              need to reach your revenue goals. Build your growth scenario in
              minutes.
            </p>
            <button
              type="button"
              onClick={onStart}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-bmm-navy transition hover:bg-gray-100"
            >
              Calculate my growth
              <span aria-hidden>→</span>
            </button>
            <p className="mt-4 text-xs text-white/55">
              Free calculator · Instant projections · Australian businesses
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { stat: '1,000+', label: 'Long-term client partnerships*' },
              { stat: '500K+', label: 'Leads generated*' },
              { stat: '9+ years', label: 'Helping brands grow online*' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-bmm-line bg-white px-5 py-5 text-center"
              >
                <p className="text-2xl font-bold text-bmm-ink">{item.stat}</p>
                <p className="mt-1 text-xs text-bmm-muted">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                step: '01 / Input',
                title: 'Your business',
                body: 'Share your current revenue and growth goals.',
              },
              {
                step: '02 / Model',
                title: 'Your investment',
                body: 'Explore budget, leads and conversion assumptions.',
              },
              {
                step: '03 / Discover',
                title: 'Your opportunity',
                body: 'Review projected outcomes and next steps.',
              },
            ].map((card) => (
              <div
                key={card.step}
                className="rounded-xl border border-bmm-line bg-white p-5"
              >
                <p className="text-[11px] font-bold uppercase tracking-wide text-bmm-blue">
                  {card.step}
                </p>
                <h2 className="mt-2 font-bold text-bmm-ink">{card.title}</h2>
                <p className="mt-2 text-sm text-bmm-muted">{card.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-[11px] leading-relaxed text-bmm-muted">
            *Company-reported figures shown for design context. This calculator
            provides illustrative estimates, not guaranteed marketing outcomes.
          </p>
        </div>

        <SiteFooter />
      </div>
    </div>
  )
}
