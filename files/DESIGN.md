# Design.md — Visual Design System

Reference: ayushcmd.me (dark, developer-focused personal portfolio)

## 1. Overall Art Direction
- **Vibe**: "Hacker terminal meets minimal SaaS" — dark background, monospace accents, sharp uppercase labels, subtle motion.
- **Base mode**: Dark-first design (`theme-color: #0a0a0a`). A background video (`GreenMode.mp4` / `Matrix.mp4`) suggests a toggleable "matrix / terminal" ambient mode layered behind content.
- **Density**: Generous negative space around a narrow-ish content column; sections are full-bleed but text is centered/constrained.
- **Motion philosophy**: Micro-interactions everywhere — hover-to-flip cards, hover-to-reveal images, animated charts, ticking counters — nothing static feels "final," everything invites interaction.

## 2. Layout System
- Single-column vertical scroll, one big idea per section (Hero → Projects → About → Experience → Contact).
- Sticky/fixed top navbar, translucent over content.
- Section headers follow a two-line "kicker + heading" pattern:
  - Small uppercase eyebrow label (e.g. "FEATURED WORK")
  - Large serif/sans display heading below it (e.g. "Projects")
- Cards (project cards, education cards) use consistent padding, 1px hairline borders, and rounded corners (~12–16px).
- Grid: 3-column card grid on desktop for Projects/Skills, collapsing to 1 column on mobile.

## 3. Typography
- **Display/heading font**: A geometric sans (or serif-adjacent display face) for big names/headings — large, tight tracking, e.g. "Muhammad Saim."
- **Body font**: Clean neutral sans-serif for paragraphs, small size, muted gray color, generous line-height.
- **Monospace font**: Used for labels, taglines, stats, and metadata (`FULL-STACK·ML·DEVELOPER`, `TAP TO FLIP`, `GMT+5:30`) — gives it a "console/IDE" feel.
- **Case treatment**: Small labels/eyebrows are ALL CAPS with letter-spacing; headings are sentence/title case.

## 4. Color Palette (dark theme)
| Token | Approx value | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background |
| `--surface` | `#121212` – `#161616` | Cards, panels |
| `--border` | `rgba(255,255,255,0.08–0.12)` | Hairline borders/dividers |
| `--text-primary` | `#f5f5f5` | Headings, primary text |
| `--text-muted` | `#9a9a9a` | Body copy, secondary text |
| `--accent` | `#00d9ff` (cyan) | Links, chart accents, GitHub graph color, hover states |
| `--accent-alt` | green (Matrix-mode) | Alternate accent when "Green Mode" video/theme active |

Accent color (electric cyan) is used sparingly — hover underlines, chart lines, small glyphs (▲, ⚙, #) — so it reads as "signal" against the near-black background.

## 5. Iconography & Glyphs
- Uses small unicode/symbol glyphs instead of icon packs in places: `▲`, `⚙`, `#`, `/` — reinforcing a terminal/dev aesthetic.
- Social icons are minimal line icons (GitHub, LinkedIn, X, Reddit, Kaggle, HackerRank, GitLab).

## 6. Imagery
- One real profile photo with a **flip-card interaction** (front photo ↔ back photo, "TAP TO FLIP" label).
- Hover-reveal images for context cards (e.g., hovering a location card reveals a photo of India; hovering an education card reveals a campus photo).
- Live-generated images used directly (GitHub contribution graph via `ghchart.rshah.org`, embedded LeetCode widget).

## 7. Components / Patterns to Replicate
1. **Flip Profile Card** — 3D CSS flip on tap/hover, front = photo, back = alt photo/info.
2. **Hover-reveal Info Card** — text link/label that reveals an image on hover (About/Location, Education).
3. **Animated Stat/Chart Card** — small inline sparkline or bar (SPI/CPI academic trend across semesters) with a legend.
4. **Tag Pills** — small rounded-rect chips for tech stack under each project (`Next.js 14`, `FastAPI`, `WebSockets`, `D3.js`).
5. **Workflow Strip** — horizontal row of process labels (IDEA → PLAN → AI HELP → CODE → REVIEW → TEST → LEARN) as a visual "pipeline."
6. **Background Ambient Video** — full-bleed looping video behind the hero, low-opacity/dimmed, theme-switchable (Matrix vs Green Mode).
7. **Interactive Particle Field** — canvas-based constellation of dots/lines behind hero text, subtly animated and mouse-reactive (see §8b). Note: this may be an alternate/"NEW" version of the hero background in place of, or layered with, the ambient video.
8. **Rotating Role-Title Carousel** — large gradient word under the tagline (e.g. "STUDENT") that cycles through a short list of role words, with small pagination dots below indicating position in the cycle.
9. **Accordion FAQ** — collapsed question list at the bottom, expands on click.
10. **Live Visitor Counter** — small live-updating number badge in the footer.
11. **Viewfinder Photo Frame** — profile photo card has thin corner-bracket decorations (like a camera viewfinder/scan frame) at its four corners, plus floating tag badges anchored to its edges. Reused identically to frame certificate images on `/credentials`.
12. **3D Skill Globe** — a draggable wireframe sphere on `/skills` with orbiting brand-icon skill nodes; see `sections/skills-forge.md` for full spec.
13. **Multi-Theme Skin System** — 4 complete visual reskins (DARK / TIMES / MATRIX / NEURAL), each swapping palette, type, background motif, and even the profile photo's treatment. This is the single biggest design decision on the site — see `THEMES.md` for the full breakdown before styling anything else.
14. **Credential Slide Viewer** — one-certificate-at-a-time paged viewer with a synced counter and a vertical dot-pagination rail.
15. **AI Coming Soon Placeholder** — a themed `/kiro` page reserved for the future assistant.

## 8. Interaction/Animation Notes
- Entrance animations: fade + slight upward slide on scroll for section headers and cards.
- Hover states: border brightens, subtle scale (1.01–1.03), accent-colored glow/underline.
- Numbers (CPI, semester counters) animate/count up on scroll into view.
- Cursor-following or parallax subtlety on the hero background video (optional enhancement).
- Theme changes should transition smoothly (cross-fade background/colors, ~300–400ms) rather than hard-cutting, since the swap is so visually dramatic (e.g. cream newspaper ↔ near-black cyberpunk).

## 8b. Interactive Background (confirmed from screenshot)
- Hero background is an animated **particle/constellation field**: small dots connected by faint lines when close together, plus an occasional longer "shooting star" trail line.
- Behaves like a canvas particle system (particles.js / tsParticles style): particles drift continuously, and likely react to cursor position (nearby particles link to the cursor or repel/attract on move).
- Sits behind all hero text at low opacity so text stays legible.
- Implementation note: build with `tsparticles` (or a lightweight custom `<canvas>` + `requestAnimationFrame`), config ~60-100 particles, link distance ~120px, particle speed low, accent-colored (cyan) dots/lines at low opacity, `mousemove` interaction mode `"grab"` or `"connect"`.
- **This background motif is theme-specific, not global** — swapped entirely per theme (starfield in DARK/MATRIX-adjacent, hex-grid in MATRIX, none/paper-texture in TIMES, triangulated mesh in NEURAL). See THEMES.md §6 for the per-theme background component approach.

## 8c. Full Page Inventory (design-relevant, beyond the homepage)
- `/projects` — "Selected Works": full project grid, same card design as the homepage preview, larger; see `sections/projects.md`.
- `/credentials` — "My Credentials": one-certificate-at-a-time viewer; see `sections/credentials.md`.
- `/skills` — "Forge": the 3D skill globe page; see `sections/skills-forge.md`.
- `/kiro` — AI Coming Soon page; see `sections/kiro-assistant.md`.

## 9. Responsive Behavior
- Navbar collapses to a hamburger/menu on mobile.
- 3-column grids → 1 column stack.
- Flip card and hover-reveal cards switch hover → tap behavior on touch devices.
- Font sizes scale down roughly 30–40% from desktop hero heading to mobile.
