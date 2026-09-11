# Structure.md — Site & Page Architecture

Reference: ayushcmd.me

## 1. Site Map (routes) — confirmed from screenshots
```
/                → Home (Hero, Projects preview, About preview, Experience, Contact/FAQ)
/projects        → "Selected Works" — full Projects list
/credentials     → "My Credentials" — certificate viewer (13 certificates)
/skills          → "Forge" — Technical Expertise, 3D skill globe
/about           → "Persona" — full About page (education, GitHub/LeetCode stats, socials)
/kiro            → "AI — Coming Soon" — placeholder for the future assistant
/buy             → "Get Source" — sell/share the portfolio template
/gallery         → Visitors gallery
/spectrum        → "Monitor" — analytics/status page
```
Recommended clone scope: build `/`, `/projects`, `/about`, `/skills`, `/credentials`, `/kiro` (contact folded into home). Treat `/buy`, `/gallery`, `/spectrum` as optional extras.

## 2. Global Layout (present on every page)
```
<Header>
  home icon + logo/wordmark (site domain as brand, italic cyan gradient)
  nav links: Projects | Credentials | Forge (Skills) | Persona (About)
  AI icon (opens the AI Coming Soon page, links to /kiro)
  theme toggle pill: cycles DARK → TIMES → MATRIX → NEURAL (see THEMES.md) — persists across routes
</Header>

<page content: section by section, see below>

<Footer>
  small live-status dot + © year, name (left)
  three pill buttons, right-aligned: Visitors (live counter) | Gallery | Monitor
</Footer>
```
Note: no persistent "Get Source" button in the navbar itself — it appears as a themed CTA within the hero/photo area instead (see sections/hero.md).

## 3. Home Page — Section Order
1. **Hero**
2. **Featured Work (Projects preview)**
3. **About Me (preview)**
4. **Experience (Education + Work timeline)**
5. **Reach Out (Skills workflow strip + Contact form + FAQ)**
6. **Footer**

## 4. Section-by-Section Structure

### 4.1 Hero
- Background: looping ambient video (theme toggle NEW/OLD or Matrix/Green)
- Top-left/center: domain wordmark
- Nav bar (see Global Layout)
- Headline: Full name, large type, first name / last name possibly on two lines
- Subheading: role tagline in monospace caps (`FULL-STACK · ML · DEVELOPER`)
- Short 1–2 sentence bio/value statement
- Small status badges: role label, "Lounge" counter/tag
- Primary CTA button: "Get Source"
- Right/side: Flip profile card (photo front/back) + contact & social link list (email, GitHub, LinkedIn, X, Reddit)
- Small floating tags: "0 → 1 BUILDER", "XGBOOST · LSTM"

### 4.2 Projects (Featured Work)
- Eyebrow: "Featured Work"
- Heading: "Projects"
- Grid of project cards (3 shown on home, full list on `/projects`), each with:
  - Project name
  - 1–2 sentence description
  - Tech stack tag pills
- "View All Projects" link/button

### 4.3 About Me
- Eyebrow: "Who I Am"
- Heading: "About Me"
- Left: interactive location panel (hover-to-reveal country photo, coordinates, timezone)
- Right: short "/ ABOUT" bio paragraph + a pull-quote line
- Academic panel: institute code, semester progress, CPI/SPI mini chart across semesters, verify-certificate link
- Three trait callouts (e.g. "An explorer of systems…", "FOCUS", "CRAFT") as short cards/lines
- "View Persona" link to full About page

### 4.4 Experience
- Eyebrow: "Education & Work"
- Heading: "Experience"
- Timeline/list of entries, each with:
  - Date range
  - Title (degree or job title)
  - Org/company name
  - Description (for work entries)
  - Tech/skill tag pills (for work entries)
  - Optional hover-reveal photo (for education entries)

### 4.5 Reach Out (Contact)
- Eyebrow: "Skills · Workflow · Identity"
- Heading: "Reach Out"
- Workflow pipeline strip: sequence of labeled steps (IDEA → PLAN → AI HELP → CODE → REVIEW → TEST → LEARN)
- Contact form: Name, Email, Message fields + "Send Message" button
- FAQ accordion (5 common questions, collapsed by default)

### 4.6 Footer
- Small pulsing status dot + copyright line (left)
- Three pill buttons (right): `Visitors` (live counter, pulse icon), `Gallery`, `Monitor` — each links out to its own page

## 5. About/Persona Page (`/about`) — extra structure beyond home preview
- Full bio paragraph (longer, more technical detail: current focus, stack)
- Location + institute chip row
- Education card with hover photo and CPI stat
- GitHub contribution graph embed
- LeetCode activity embed
- Full social link list (8 platforms: GitHub, LinkedIn, LeetCode, Kaggle, HackerRank, X, Reddit, GitLab) as a link grid

## 6. Skills Page (`/skills`) — "Forge" — full spec in `sections/skills-forge.md`
- Big heading "Technical Expertise" partially hidden behind navbar on scroll (heading sits above the fold, navbar overlaps it)
- **3D interactive skill globe**: a wireframe sphere with individual skill "planets" (colored dot + label pill) floating around it in 3D space; "Drag to rotate" hint; each of the 4 category tabs loads a different constellation of skill nodes onto/around the globe
- Category tab row: `Foundations | Languages | AI/ML | Tools`, each with a small dot indicator, active tab underlined/filled
- Below the globe: a content card per active category — title, one-line description, a "N skills" count badge, and a flat wrapped row of skill pill tags (many with brand icons: Python, JavaScript, TypeScript, React, Next.js, Docker, GitHub, TensorFlow, etc.)

## 7. Credentials Page (`/credentials`) — full spec in `sections/credentials.md`
- Heading "My Credentials", subheading "13 certificates · scroll to explore", counter badge top-right ("01 / 13")
- Split layout: certificate image/scan on the left (in a corner-bracketed frame), detail panel on the right (tags, title, issuer + date, description, verification ID + "Verify Certificate" external link button)
- Vertical dot-pagination rail on the far right edge (13 dots, current one highlighted) — scrolling or clicking dots pages through certificates

## 8. AI Placeholder Page (`/kiro`) — full spec in `sections/kiro-assistant.md`
- A centered panel showing "AI — Coming Soon"
- No chatbot UI or assistant logic yet; the site owner will build it later
- Reachable site-wide via the small AI icon in the navbar

## 9. Component Inventory (build once, reuse)
- `Navbar` (home icon, wordmark, links, bot icon, theme toggle)
- `ThemeProvider` / `ThemeToggle` (see THEMES.md)
- `HeroSection` (per-theme variants)
- `SocialLinkList`
- `SectionHeading` (eyebrow + title)
- `ProjectCard` (thumbnail, title, description, SCOPE/TECH tag pills)
- `TagPill`
- `HoverRevealCard`
- `StatChart` (mini line/bar chart)
- `TimelineItem`
- `WorkflowStrip`
- `ContactForm`
- `FAQAccordion`
- `Footer` (status dot + Visitors/Gallery/Monitor pills)
- `VisitorCounter`
- `SkillGlobe3D` (wireframe sphere + orbiting skill nodes, drag-to-rotate)
- `CredentialViewer` (framed cert image + detail panel + dot pagination)
