# Portfolio Clone — Documentation Index

Reference site: ayushcmd.me (analyzed via live text fetch + user-provided screenshots across all themes and pages)

## How to use these docs
Read in this order when building:
1. **THEMES.md** — read first. The site's biggest design decision is its 4-theme skin system (DARK / TIMES / MATRIX / NEURAL); everything else is built on top of whichever theme is active.
2. **DESIGN.md** — overall visual language, components, and interaction patterns shared across the site.
3. **STRUCTURE.md** — site map, global layout, and section order for every page.
4. **sections/*.md** — implementation-level spec for each individual section/page, with layout, interaction notes, and a JSON data schema to fill in with your own content.

## File Map
```
DESIGN.md                    — visual design system, component inventory, motion
STRUCTURE.md                 — site map, global layout, page-by-page structure
THEMES.md                    — the 4-theme skin system (DARK/TIMES/MATRIX/NEURAL) + tokens
sections/
  hero.md                    — homepage hero: name, tagline, role-title carousel, particle bg, photo card
  navbar-footer.md           — global nav + footer (theme toggle, bot icon, visitor/gallery/monitor pills)
  projects.md                — homepage "Featured Work" + full /projects "Selected Works" page
  about.md                   — homepage "About Me" preview section
  experience.md               — homepage "Experience" (education + work timeline)
  contact.md                  — homepage "Reach Out" (workflow strip, contact form, FAQ)
  credentials.md              — /credentials "My Credentials" cert viewer
  skills-forge.md             — /skills "Forge" — 3D skill globe + category tabs
  kiro-assistant.md           — /kiro AI Coming Soon placeholder
```

## Known Gaps / Not Yet Verified
These weren't visible in the screenshots provided and would need a live look at the actual site (or the "OLD" toggle state / flip-card version) to nail down exactly:
- The `/about` ("Persona") page's exact visual treatment across all 4 themes (only the `dark` theme's content was confirmed via text fetch).
- Whether the "OLD" hero variant (flip-card + ambient video, described in the original DESIGN.md pass) is a 5th theme, a legacy fallback, or the same thing as one of DARK/TIMES/MATRIX/NEURAL under a different name — treat as unconfirmed and prioritize the 4 confirmed themes.
- Mobile/responsive behavior for the 3D skill globe and the credential dot-pagination rail — recommend a simpler fallback (static list / swipeable cards) below a tablet breakpoint.
- Exact transition animation between themes.

## Build Priority Suggestion
1. Global shell: Navbar + Footer + ThemeProvider (get DARK theme fully working first)
2. Home page: Hero → Projects preview → About preview → Experience → Contact
3. `/projects` full page
4. `/skills` (start with the tab content cards; add the 3D globe last — it's the most complex single component)
5. `/credentials`
6. `/kiro` AI placeholder (Coming Soon; chatbot to be built later)
7. Remaining themes (TIMES → MATRIX → NEURAL) once the DARK-theme structure is solid
