# Section: Experience

## Purpose
Chronological record of education + work, blending academic and professional milestones in one timeline.

## Layout
- Eyebrow: "Education & Work"
- Heading: "Experience"
- Vertical list of entries, most-recent or in chronological order, each entry as a card/row with a date range on the left and details on the right (or stacked on mobile).

## Entry Types

### Education Entry
- Date range (e.g. "2024 — 2028")
- Degree title (e.g. "Bachelor of Science")
- Field of study (e.g. "Computer Science & Data Analytics")
- Institution name
- Hover-reveal campus photo

### Work Entry
- Date range (e.g. "Dec 20, 2025 — Feb 26, 2026")
- Role title (e.g. "Backend & API Design Intern")
- Company name
- 1–3 sentence description of responsibilities/impact
- Tag pill row of tools/tech used (e.g. `Node.js` `REST APIs` `OAuth2` `System Design` `JWT` `PostgreSQL`)

## Interaction
- Hovering an education card fades/slides in the associated photo.
- Cards fade-in-up on scroll.
- Tag pills same style as Projects section for visual consistency.

## Data Needed
```json
[
  {
    "type": "education",
    "dateRange": "2024 — 2028",
    "title": "Bachelor of Science",
    "subtitle": "Computer Science & Data Analytics",
    "org": "Institution Name",
    "image": "/campus.jpg"
  },
  {
    "type": "work",
    "dateRange": "Mon DD, YYYY — Mon DD, YYYY",
    "title": "Role Title",
    "org": "Company Name",
    "description": "1-3 sentence description of the role.",
    "tags": ["Node.js", "REST APIs", "OAuth2", "System Design", "JWT", "PostgreSQL"]
  }
]
```
