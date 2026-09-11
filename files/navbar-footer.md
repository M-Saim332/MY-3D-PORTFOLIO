# Section: Navbar & Footer

## Navbar
### Layout (confirmed from screenshots)
- Fixed/sticky to top, translucent/blurred rounded-pill bar floating over the page background, present identically on every route.
- Far left: small home icon + wordmark — domain name used as brand, styled italic with a cyan gradient/glow (`muhammadsaim.me`) — wordmark color stays cyan even when the rest of the page has switched theme (it's a fixed brand mark).
- Center: nav links — `Projects`, `Credentials`, `Forge` (Skills), `Persona` (About). Current-page link is bold/brighter with a small dot indicator underneath it.
- Far right: two controls —
  1. A small circular **AI icon** — links to the `/kiro` AI Coming Soon page (see `sections/kiro-assistant.md`).
  2. A **theme toggle pill** showing the name of the currently active theme with a matching icon — cycles `DARK → TIMES → MATRIX → NEURAL` on click (see `THEMES.md` for the full per-theme visual spec). Icon/label examples seen: moon + "DARK", newspaper + "TIMES", terminal-prompt + "MATRIX", chip + "NEURAL".
- No persistent "Get Source" CTA in the navbar — it lives inside the hero/photo area instead (theme-dependent placement, see `sections/hero.md`).

### Interaction
- Active route link gets a small accent-colored dot/underline beneath it.
- Mobile: links collapse into a hamburger menu / slide-out drawer.
- Theme toggle persists the chosen theme across route navigation (confirmed: Projects/Credentials/Skills/Kiro pages were all seen in the same active theme without resetting).

### Data Needed
```json
{
  "brand": "yourdomain.me",
  "links": [
    {"label": "Projects", "href": "/projects"},
    {"label": "Credentials", "href": "/credentials"},
    {"label": "Forge", "href": "/skills"},
    {"label": "Persona", "href": "/about"}
  ],
  "botAssistantHref": "/kiro",
  "themes": ["dark", "times", "matrix", "neural"],
  "defaultTheme": "dark"
}
```

## Footer
### Layout (confirmed from screenshots)
- Simple row pinned to the bottom of every page, present in the same position regardless of theme.
- Left: small pulsing status dot + copyright line, e.g. `© 2026 MUHAMMAD SAIM`.
- Right: three **pill buttons**, dark rounded, each with a small leading icon:
  - `Visitors` (pulse/activity icon — live visitor counter, likely shows a number on click/hover)
  - `Gallery` (image icon — links to `/gallery`)
  - `Monitor` (screen icon — links to `/spectrum`, an analytics/status page)

### Interaction
- Visitor pill fetches/displays a live or cached count (via a simple counter API or analytics service).
- Gallery and Monitor pills are plain navigation links styled to match the pill system.

### Data Needed
```json
{
  "copyrightName": "YOUR NAME",
  "year": 2026,
  "visitorCount": 0,
  "footerLinks": [
    {"label": "Visitors", "href": "/visitors", "icon": "activity"},
    {"label": "Gallery", "href": "/gallery", "icon": "image"},
    {"label": "Monitor", "href": "/spectrum", "icon": "monitor"}
  ]
}
```
