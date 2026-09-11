# Section: Projects (Home Preview + Full `/projects` Page)

## Purpose
Showcase 3 strongest projects on the homepage with a link to the full list; the `/projects` route ("Selected Works") holds every project with the same card design, larger.

## Home Preview Layout
- Eyebrow: "Featured Work" (copy adapts per theme, e.g. "FEATURED DEPLOYMENTS" in the `matrix` theme)
- Heading: "Projects"
- 3-column responsive grid (→ 1 column on mobile)
- "View All Projects →" link/button below the grid

## `/projects` Full Page Layout (confirmed from screenshot)
- Nav breadcrumb dot under "Projects" link shows current page
- Eyebrow: "PORTFOLIO" (small caps, accent color)
- Heading: "Selected Works" (large serif/display, white)
- 3-column card grid (desktop), equal-height cards, generous gutter, starfield background visible between/around cards

## Project Card Structure (confirmed)
- **Thumbnail** at the top of the card — a real product screenshot/UI mock (e.g. a dashboard) or a stylized logo lockup on a dark/gradient panel (e.g. "FG FitoGlobe" wordmark centered on a dark gradient tile with a small glowing dot)
- **Title** — bold, medium-large, white
- **Description** — 2–4 sentence explanation of what the project does and its standout features, muted gray
- **Tag row** — exactly two pill labels: `SCOPE` (filled accent/cyan pill) and `TECH` (outlined gray pill) — these appear to be **expandable/clickable category tags** (SCOPE = problem domain, TECH = tech stack) rather than a long flat tag list; clicking likely reveals the full stack or scope detail
- Card hover: border brightens to accent, slight lift + shadow

## Content (structure to reuse, replace with your own projects)
```json
[
  {
    "name": "CommodityChain",
    "thumbnail": "/projects/commoditychain-cover.png",
    "thumbnailType": "screenshot",
    "description": "Real-time commodity intelligence platform with live prices, AI-driven insights, interactive charts, correlation analytics, and India-focused macroeconomic data for traders.",
    "scope": "Data platform",
    "tech": ["Next.js 14", "FastAPI", "WebSockets", "D3.js"]
  },
  {
    "name": "FitoGlobe",
    "thumbnail": "/projects/fitoglobe-cover.png",
    "thumbnailType": "logo-lockup",
    "description": "Full-stack fitness tracking web app with AI macro calculator, food scanner, Groq-powered coach, multilingual support, and mobile-first design.",
    "scope": "Consumer app",
    "tech": ["React", "FastAPI", "Groq LLaMA"]
  },
  {
    "name": "Dollar Hegemony",
    "thumbnail": "/projects/dollar-hegemony-cover.png",
    "thumbnailType": "screenshot",
    "description": "ML-driven study of USD dominance using a custom Dollar Supremacy Index built from macro indicators, with XGBoost + stacked LSTM + Temporal Transformer ensemble forecasting.",
    "scope": "Research / ML",
    "tech": ["Python", "XGBoost", "LSTM", "MLOps"]
  }
]
```

## Interaction
- Card hover: border brightens to accent color, slight lift (translateY -4px) + shadow.
- SCOPE / TECH pills: likely a small expand-on-click or tooltip revealing the full stack list (design as clickable, not purely decorative).
- Entire card is clickable → project detail page or external live link.

## Data Needed (schema)
See JSON block above — repeat per project. Keep description to 2–4 sentences; keep exactly two pill categories per card (SCOPE, TECH) to match the reference layout, with the option to store the full tech array under `tech` even if only a summary chip shows by default.
