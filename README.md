# Blue Moon Marketing — Growth ROI Calculator

Interactive web calculator that turns revenue goals into estimated marketing investment, lead volume, customer growth, ROI, and ROAS. Built for [Blue Moon Marketing](https://www.bluemoonmarketing.com.au/) as a lead-generation and planning tool.

**Stack:** React 19, JavaScript, Vite, Tailwind CSS.

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| [Node.js](https://nodejs.org/) | 18+ (20 LTS recommended) |
| npm | Comes with Node |

No environment variables or backend are required for local development.

---

## Required steps (local setup)

### 1. Clone and enter the project

```bash
git clone <repository-url>
cd marketing-roi-calculator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open the URL Vite prints (usually **http://localhost:5173**).

### 4. Verify calculations (recommended)

```bash
npm test
```

Seven unit tests cover the proposal worked example ($30k → $50k revenue, ROI, ROAS, and scenario ad budgets).

### 5. Production build (optional)

```bash
npm run build
npm run preview
```

Static assets are output to `dist/`.

---

## Using the calculator (user flow)

1. **Landing** — Read overview; click **Calculate my growth**.
2. **Business** — Industry, model, current/desired monthly revenue, ARPU, customer count.
3. **Marketing** — Ad budget, agency fees, cost per lead, conversion %, gross margin %, growth period, channels.
4. **Results** — KPIs, revenue comparison, funnel, scenario table (Conservative / Expected / Optimistic). Selecting a scenario updates conversion and CPL.
5. **Consultation** — Request a strategy call; sidebar shows your latest estimate.

All projections update from shared form state as inputs change.

---

## Calculation methodology

Illustrative formulas (AUD, monthly unless noted):

| Step | Formula |
|------|---------|
| Additional revenue | Target revenue − current revenue |
| Additional customers | Additional revenue ÷ revenue per new customer |
| Required leads | Additional customers ÷ conversion rate (leads rounded up for planning) |
| Ad investment | Required leads × cost per lead |
| Total marketing investment | Ad investment + agency/other fees |
| Marketing ROI | (Additional gross profit − total investment) ÷ total investment × 100 |
| ROAS | Attributed additional revenue ÷ ad investment |

**Default example:** $30,000 → $50,000/month, $500/customer, 10% conversion, $25 CPL, 50% margin, $1,000 fees → **400 leads**, **$11,000** total investment, **~−9.1% ROI**, **2.00× ROAS**.

Results are estimates, not guarantees.

---

## npm scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run Vitest calculation tests |

---

## Project structure

```
src/
  App.jsx                 # Wizard flow and shared input state
  pages/                  # Landing + 4 wizard steps
  components/
    layout/               # Header, footer, stepper, shell
    ui/                   # Form controls, icons
  data/formOptions.js     # Defaults, dropdown options, tooltips
  utils/calculations.js   # Projection engine
  utils/calculations.test.js
```

---

## Design notes

UI follows the Blue Moon Growth Calculator Figma/PDF: brand blue `#2563EB`, Inter typography, four-step progress (Business → Marketing → Results → Consultation).

---

## License

Private / client project — see repository owner for usage terms.
