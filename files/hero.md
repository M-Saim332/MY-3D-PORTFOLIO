# Section: Hero

## Purpose
First impression — name, role, one-line value prop, and immediate ways to connect (CTA + socials), set against an ambient looping background video.

## Layout
- Full-viewport height (or near-full), animated interactive particle background (see below) behind everything — a background video is an alternate/legacy version, not both at once.
- Two-column split on desktop: left = text content + CTA, right = profile photo card with corner-bracket framing + icon contact row below it. Stacks to single column on mobile (text first, card below).
- Fixed/sticky navbar overlaying the top of this section.

## Navbar (as it appears over the hero)
- Left: home icon + wordmark (`muhammadsaim.me`, italic, cyan gradient/glow)
- Center: nav links — Projects, Credentials, Forge, Persona
- Right: small AI icon (opens the AI Coming Soon page) + a "DARK" mode pill button (moon icon + label) for light/dark theme toggle

## Content Blocks
1. **Version toggle** — segmented control "NEW / OLD" directly under the navbar, switches between two hero/portfolio versions (not a color theme — a full alternate layout, "OLD" likely being a prior design).
2. **Name** — large display heading, two lines: first name in solid white, last name in a cyan→purple gradient.
3. **Tagline** — monospace, uppercase, dot-separated (`FULL-STACK · ML · DEVELOPER`), muted gray.
4. **Bio line** — 1–2 sentence description of what they build, with one key phrase bolded in white (e.g. "**intelligent systems**") against the otherwise muted-gray sentence.
5. **Rotating role-title carousel** — very large gradient word below the bio (orange→teal, e.g. "STUDENT"), auto-cycles through 2–4 words (e.g. Student / Developer / Builder / Learner) with a fade/slide transition; small horizontal pagination dots underneath show position, first dot highlighted in accent color.
6. **Interactive particle background** — canvas constellation of small dots + connecting lines + occasional long "shooting star" streak, low-opacity, sits behind all text, animates continuously and reacts to cursor movement (see DESIGN.md §8b).
7. **Profile Photo Card** (right side):
   - Single photo (not necessarily a flip card in the current "NEW" version — treat flip-card as the legacy/"OLD" version, static framed photo as "NEW")
   - Thin corner-bracket frame decorations at all 4 corners (viewfinder/scan style, accent-colored)
   - Floating tag badges anchored to the card edges: top-left dark pill (`NEXT.JS · PYTHON`), top-right green pill (`▲ 0 → 1 BUILDER`), bottom-right pills (`⚙ XGBOOST`, `LSTM`)
8. **Icon contact row** below the photo card — circular icon-only buttons, no labels: email, GitHub, LinkedIn, X, Reddit, and a resume/file icon.

## Interaction
- Particle background: continuous idle animation + mouse-move interaction (grab/connect nearby particles to cursor).
- Role-title carousel: auto-advances every few seconds, fades/slides between words, pagination dots update in sync; likely also tappable to jump directly to a word.
- CTA/icon buttons: hover = brighten/scale + accent glow, tooltip on hover showing platform name.
- Version toggle ("NEW/OLD"): swaps the whole hero layout/asset set (particle canvas vs. video, static photo vs. flip card).
- "DARK" button in navbar toggles a light/dark color scheme independent of the NEW/OLD version toggle.

## Data Needed
```json
{
  "firstName": "",
  "lastName": "",
  "tagline": "FULL-STACK · ML · DEVELOPER",
  "bio": "1-2 sentence description with one **bold** phrase",
  "roleWords": ["STUDENT", "DEVELOPER", "BUILDER"],
  "photo": "/profile.jpg",
  "photoTags": {
    "topLeft": "NEXT.JS · PYTHON",
    "topRight": "▲ 0 → 1 BUILDER",
    "bottomRight": ["XGBOOST", "LSTM"]
  },
  "email": "you@example.com",
  "socials": [
    { "platform": "email", "url": "mailto:you@example.com" },
    { "platform": "github", "url": "" },
    { "platform": "linkedin", "url": "" },
    { "platform": "x", "url": "" },
    { "platform": "reddit", "url": "" },
    { "platform": "resume", "url": "/resume.pdf" }
  ],
  "particleConfig": {
    "count": 80,
    "linkDistance": 120,
    "speed": 0.4,
    "color": "#00d9ff",
    "mouseInteraction": "grab"
  }
}
```
