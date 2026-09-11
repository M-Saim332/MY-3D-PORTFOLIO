# Themes.md — Multi-Theme Skin System

Reference: ayushcmd.me

## 1. Overview — This Is a Full Theme-Swap System, Not a Simple Dark/Light Toggle
Confirmed from screenshots: the top-right nav button shows the **name of the currently active theme** (`DARK`, `TIMES`, `MATRIX`, `NEURAL`) and clicking it cycles to the next theme in the set. Each theme is a **complete visual reskin** — not just a color-variable swap:
- Different background treatment (starfield, newspaper texture, hex grid, tron-style particle net)
- Different color palette (accent + surfaces)
- Different typography (sans/mono vs. serif vs. condensed display)
- Different **photo treatment** for the profile image (real photo w/ scan brackets, grayscale documentary photo, real photo w/ neon brackets, painted/illustrated portrait)
- Different rotating-role-word gradient colors
- The particle/network background (see DESIGN.md §8b) is present in some themes and swapped for a different motif (newspaper halftone dot, hex grid) in others — confirms it's part of the per-theme asset bundle, not a constant.

Treat this as a `theme` enum driving a full token + asset bundle, e.g.:
```ts
type ThemeId = "dark" | "times" | "matrix" | "neural";
```

## 2. Theme: `dark` (default — button label "DARK")
- **Background**: near-black, starfield/particle constellation, cyan-tinted glow accents.
- **Palette**: `--bg:#0a0a0a`, `--accent:#00d9ff` (cyan), `--text-primary:#f5f5f5`.
- **Typography**: geometric sans display (name), monospace labels/taglines.
- **Name treatment**: first name solid white, last name cyan→purple gradient.
- **Photo card**: real photo, thin cyan corner-bracket "viewfinder" frame, dark tag pills.
- **Role-word carousel**: orange→teal gradient (e.g. "STUDENT").
- **Nav toggle button**: moon icon + "DARK" label.

## 3. Theme: `times` (button label "TIMES") — Newspaper / Editorial
- **Background**: warm off-white/cream paper texture, no particles — fully light-mode, high-contrast black text.
- **Palette**: `--bg:#f2efe9` (cream), `--text-primary:#111111`, accent = deep maroon/red `#7a1f2b` for eyebrow/kicker text.
- **Typography**: classic serif display for the byline-style headline ("Local Engineer Builds Systems at the Intersection of Code and Intelligence"), serif body copy, italic subhead ("DEVELOPER") in maroon.
- **Layout metaphor**: front-page newspaper article — byline ("By Our Staff Correspondent — Special to the Gazette"), drop-cap first letter of the bio paragraph, horizontal rule dividers, a photo with a caption in italic ("Fig. 1 — The subject, on assignment").
- **Photo card**: grayscale/desaturated photo, simple bordered frame (no brackets/tags), caption below in italic serif.
- **CTA row**: labeled "CLASSIFIEDS" — three bordered buttons: `LOUNGE (1)`, `RESUME`, `GET SOURCE` (GET SOURCE filled dark maroon, others outlined).
- **Nav toggle button**: newspaper icon + "TIMES" label.

## 4. Theme: `matrix` (button label "MATRIX") — Cyberpunk / Neon Red
- **Background**: dark navy/black with a faint hex-grid pattern and scattered hex outlines, red/pink glow blooms.
- **Palette**: `--bg:#0a0a12`, `--accent:#ff2d55` (hot pink/red), headline text in soft pink `#f5c6d6`.
- **Typography**: bold condensed sans/display in caps for the name (`MUHAMMAD SAIM`), tagline in pink monospace, "DEVELOPER" subhead in large italic pink script-like serif.
- **Photo card**: real photo with thin red/pink corner brackets, small red dot/glow accent floating beside it, bottom tag reads role/class info (e.g. `CLASS OF 2028`) in pink monospace.
- **CTA row**: `LOUNGE (1)`, `RESUME` outlined pink, `GET SOURCE` filled solid pink/red block.
- **Extra info row**: social handle shortcut (e.g. `/in/handle →`) and location/timezone line (`INDIA · GMT+5:30`) in muted pink-gray monospace.
- **Section below hero**: eyebrow reads "FEATURED DEPLOYMENTS" instead of "Featured Work" — copy adapts per theme.
- **Nav toggle button**: terminal-prompt icon (`>_`) + "MATRIX" label.

## 5. Theme: `neural` (button label "NEURAL") — Green Tron / AI Core
- **Background**: deep green gradient wash with a fine wireframe/triangulated network mesh (tron-grid), animated particle nodes, strong green glow bloom in corners.
- **Palette**: `--bg:` near-black green `#04140c`, `--accent:#39ff8a`/mint green, headline in soft mint-white.
- **Typography**: same geometric sans as `dark` theme for the name, gradient gets applied differently (name gradient shifts from mint→lavender).
- **Photo card**: **not a real photograph in this theme** — a stylized painted/illustrated portrait (digital painting style) of the person standing in front of their institution, warm sunset palette inside an otherwise green UI — a deliberate stylistic contrast piece. Small green glowing orb decoration overlaid on the image.
- **Role-word carousel**: orange→teal gradient word cycles too (e.g. "CREATOR"), pagination dots green.
- **Nav toggle button**: chip/processor icon + "NEURAL" label.

## 6. Shared Mechanics Across All Themes
- Nav structure, links (Projects/Credentials/Forge/Persona), home icon, and AI icon remain in the same position across every theme — only their color/skin changes.
- The theme choice persists across route changes (confirmed: Projects/Credentials/Skills/Kiro pages all shown in the `dark` theme in later screenshots, implying it's a global, not per-page, state — likely stored in a cookie/localStorage/context).
- Footer also re-themes; in `dark` theme the footer shows three pill buttons: `Visitors`, `Gallery`, `Monitor` (see STRUCTURE.md).
- Recommended implementation: a `ThemeProvider` (React context) storing `themeId`, applied via a `data-theme="dark|times|matrix|neural"` attribute on `<html>` or a root wrapper, with each theme's tokens defined as a CSS custom-property block scoped to that attribute value, e.g.:
```css
[data-theme="dark"]   { --bg:#0a0a0a; --accent:#00d9ff; --font-display: 'Space Grotesk'; }
[data-theme="times"]  { --bg:#f2efe9; --accent:#7a1f2b; --font-display: 'Playfair Display'; }
[data-theme="matrix"] { --bg:#0a0a12; --accent:#ff2d55; --font-display: 'Chakra Petch'; }
[data-theme="neural"] { --bg:#04140c; --accent:#39ff8a; --font-display: 'Space Grotesk'; }
```
- Because photo treatment differs (real photo vs. grayscale vs. illustrated), store **per-theme image variants** rather than one photo + CSS filter: `photo.dark.jpg`, `photo.times.jpg` (desaturated), `photo.matrix.jpg`, `photo.neural.jpg` (illustration).
- Background motif per theme should be its own component (`<StarfieldBG/>`, `<NewsprintBG/>`, `<HexGridBG/>`, `<NeuralMeshBG/>`) swapped by `themeId`, not a single canvas with recolored particles — the `times` theme drops the particle system entirely.

## 7. Design Tokens — Base Scale (shared structure, values swap per theme)
```css
:root {
  --font-mono: "JetBrains Mono", "IBM Plex Mono", monospace;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-pill: 999px;
  --space-1: 4px; --space-2: 8px; --space-3: 16px; --space-4: 24px; --space-5: 40px; --space-6: 64px; --space-7: 96px;
  --duration-fast: 150ms; --duration-base: 300ms; --duration-slow: 600ms;
  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
}
```
Per-theme color/font tokens as listed in §2–5 above.

## 8. Accessibility Notes
- Verify contrast independently for each theme — `times` (dark-on-cream) and `neural` (mint-on-near-black) need separate contrast audits, not one blanket check.
- Respect `prefers-reduced-motion`: disable the hex-grid/particle/mesh animation layers in `matrix`/`neural`/`dark`, and disable any entrance parallax in `times`.
- Theme toggle button must be reachable by keyboard and announce the resulting theme name on change (e.g. `aria-live="polite"` region: "Theme changed to Matrix").
