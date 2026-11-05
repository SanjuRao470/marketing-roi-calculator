import { useState } from 'react'

const initialForm = { name: '', email: '', phone: '', company: '', message: '' }

export default function LeadCaptureForm() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-bmm-mint/30 bg-gradient-to-br from-bmm-navy to-bmm-navy-light p-6 text-center text-white sm:p-8">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-bmm-mint text-xl text-bmm-navy">
          ✓
        </div>
        <h3 className="font-display text-xl font-bold">Thank you!</h3>
        <p className="mt-2 text-sm text-white/80">
          Our team will reach out shortly to schedule your free strategy
          consultation.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-bmm-border bg-white p-6 shadow-card sm:p-8">
      <h3 className="font-display text-lg font-bold text-bmm-navy">
        Book a free strategy consultation
      </h3>
      <p className="mt-1 text-sm text-bmm-muted">
        Get a personalised growth plan based on your calculator results.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-xl border border-bmm-border px-4 py-3 text-sm outline-none focus:border-bmm-blue focus:ring-2 focus:ring-bmm-blue/20 sm:col-span-1"
        />
        <input
          required
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-xl border border-bmm-border px-4 py-3 text-sm outline-none focus:border-bmm-blue focus:ring-2 focus:ring-bmm-blue/20 sm:col-span-1"
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded-xl border border-bmm-border px-4 py-3 text-sm outline-none focus:border-bmm-blue focus:ring-2 focus:ring-bmm-blue/20 sm:col-span-1"
        />
        <input
          placeholder="Company name"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="rounded-xl border border-bmm-border px-4 py-3 text-sm outline-none focus:border-bmm-blue focus:ring-2 focus:ring-bmm-blue/20 sm:col-span-1"
        />
        <textarea
          placeholder="Tell us about your growth goals"
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="rounded-xl border border-bmm-border px-4 py-3 text-sm outline-none focus:border-bmm-blue focus:ring-2 focus:ring-bmm-blue/20 sm:col-span-2"
        />
        <button
          type="submit"
          className="rounded-xl bg-bmm-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-bmm-blue-dark sm:col-span-2"
        >
          Request consultation
        </button>
      </form>
    </div>
  )
}
