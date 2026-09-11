# Section: About Me

## Purpose
Humanize the portfolio — where they're based, who they are, and a quick academic snapshot — with a link to the deeper `/about` ("Persona") page.

## Layout
- Eyebrow: "Who I Am"
- Heading: "About Me"
- Two-column layout:
  - **Left**: interactive location panel
  - **Right**: bio text + academic stat card
- Below: 3 short trait callouts in a row
- "View Persona" link at the bottom

## Content Blocks

### Location Panel (left)
- Label: "LOCATION · HOVER TO EXPLORE"
- Country name, large
- Lat/long coordinates
- Timezone (e.g. `GMT+5:30`)
- Hover reveals a background photo of the country/region

### Bio (right)
- Small label "/ ABOUT"
- 2–4 sentence first-person bio: who you are, what you study/do, what you care about
- Short italic pull-quote line (e.g. "Where tradition meets technology.")

### Academic Snapshot Card
- Institution short code (e.g. "IIT-P")
- Reference/ID label (e.g. "TRANSCRIPT REF · 24A12RES897")
- "Academic Trend" mini chart: SPI/CPI across semesters (small line or bar chart, S1–S4 labeled)
- Current CPI large number callout
- One-line insight under the chart (e.g. "dipped Sem 2, recovering since")
- "Verify" link (external, e.g. to institute's certificate verification page)

### Trait Callouts (row of 3)
Each is a short label + one-line description:
1. e.g. "GROWTH — An explorer of systems, driven by curiosity and understanding."
2. e.g. "FOCUS — Deep work on efficiency and precision in every layer built."
3. e.g. "CRAFT — Discipline and dedication in every single line of code."

## Interaction
- Hovering the location panel fades in a background photo.
- Academic trend chart animates in (draws line) on scroll into view.
- CPI number counts up from 0 on scroll into view.

## Data Needed
```json
{
  "country": "",
  "coordinates": "21.2379° N, 81.6337° E",
  "timezone": "GMT+5:30",
  "bio": "2-4 sentence bio",
  "quote": "short pull-quote",
  "institutionCode": "",
  "transcriptRef": "",
  "semesters": [{"label": "S1", "spi": 0, "cpi": 0}],
  "currentCPI": 0,
  "insightNote": "",
  "verifyUrl": "",
  "traits": [
    {"label": "GROWTH", "text": ""},
    {"label": "FOCUS", "text": ""},
    {"label": "CRAFT", "text": ""}
  ]
}
```
