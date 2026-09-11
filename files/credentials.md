# Section: Credentials (`/credentials` — "My Credentials")

## Purpose
A scrollable, one-at-a-time viewer for certifications — makes each credential feel substantial rather than dumping a grid of logos.

## Layout (confirmed from screenshot)
- Eyebrow: "ACHIEVEMENTS" (small caps, top-left, partially tucked behind navbar on load)
- Heading: "My Credentials" (very large, white)
- Subheading: "13 certificates · scroll to explore" (muted, monospace)
- Counter badge, top-right: `01 / 13` (updates as you scroll/page through)
- Two-column split per credential:
  - **Left**: the certificate image itself, inside a thin bordered frame with small corner-bracket ticks (viewfinder style, matches hero photo framing)
  - **Right**: detail panel —
    1. Row of category tag pills (e.g. `AI`, `Infrastructure`, `MLOps`, `NVIDIA`, `Coursera`) — dark rounded pills
    2. Certificate title, large, white, bold
    3. Issuer name (accent-colored, italic) — em dash — date (muted)
    4. 2–3 sentence description of what the course/cert covered
    5. Small shield/verified icon + verification code (monospace, muted)
    6. "Verify Certificate" button — accent-colored (green in this instance), external-link icon, opens the issuer's verification page
- **Vertical dot-pagination rail** on the far right edge of the viewport — one dot per certificate (13 total), current one filled/highlighted (green), rest outlined — click or scroll to page through

## Interaction
- Scrolling (or clicking a rail dot) transitions to the next/previous certificate — likely a snap-scroll or fade/slide transition between full credential "slides."
- "Verify Certificate" opens the issuer's official verification URL in a new tab.
- Counter badge and pagination rail stay in sync with the currently displayed certificate.

## Data Needed
```json
[
  {
    "title": "AI Infrastructure and Operations Fundamentals",
    "issuer": "NVIDIA (Coursera)",
    "date": "Jul 28, 2026",
    "tags": ["AI", "Infrastructure", "MLOps", "NVIDIA", "Coursera"],
    "description": "Completed NVIDIA's AI Infrastructure and Operations Fundamentals course on Coursera, covering AI infrastructure, GPU computing, deployment workflows, and operational fundamentals for AI systems.",
    "verificationCode": "2BFXUY0E92VK",
    "verifyUrl": "https://coursera.org/verify/2BFXUY0E92VK",
    "image": "/credentials/cert-01.png"
  }
]
```

## Notes for Implementation
- Store certificates as an ordered array; render one "slide" at a time with a snap-scroll container (`scroll-snap-type: y mandatory` works well) or a paged carousel.
- The corner-bracket frame around the certificate image is the same visual component used on the hero photo — build it once as a reusable `BracketFrame` wrapper.
- Keep the counter (`01 / 13`) and the dot rail driven by the same active-index state so they never fall out of sync.
