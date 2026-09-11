# Section: Skills / "Forge" (`/skills`)

## Purpose
Technical-expertise page built around a playful 3D interactive centerpiece (a skill "globe") rather than a plain grid — the standout, most complex component on the whole site.

## Layout (confirmed from screenshots)
- Heading "Technical Expertise" sits large at the very top, partially covered by the navbar as the user scrolls (i.e. heading is above/behind the sticky nav, not fully in the safe content area).
- **3D Skill Globe**: a wireframe sphere (like a rotating latitude/longitude wireframe globe, tron-style) floating in the starfield background, with individual "skill nodes" — a colored dot/icon + text-label pill — positioned around and on the globe in 3D space (e.g. `XGBoost`, `Docker`, `Jupyter`, `GitHub`, `Redis`, `NumPy`, `Next.js`, `PostgreSQL`, `Pandas`, `HuggingFace`, `Scikit-Learn`, `TypeScript`, `Python`, `LangChain`, `Power BI`, `React`, `TensorFlow`, `Supabase`…).
  - A small "⊕ Drag to rotate" hint label appears near the globe, confirming it's a **draggable 3D object** (click-drag to orbit the camera or spin the globe).
  - Node color/icon corresponds to the tool's brand (Python = blue/yellow snake mark, Docker = blue whale mark, React = cyan atom mark, etc.) — use each tool's real brand icon where possible.
  - The globe's node set appears to **change per active category tab** (different nodes visible when "Foundations" vs "AI/ML" vs "Tools" is selected) — likely the full/idle state shows a mixed "all skills" cloud, and selecting a tab highlights/filters the relevant subset.
- **Category tab row**, pill-style, 4 tabs: `Foundations | Languages | AI/ML | Tools`, each with a small leading dot; active tab has solid fill/border and bold label.
- **Content card** below the tabs (dark panel, rounded corners) showing the active category's details:
  - Small leading dot + category name (e.g. "Programming Foundations", "Languages & Frameworks", "AI & Machine Learning", "Tools & Ecosystem")
  - One-line description of the category's scope
  - A count badge on the right (e.g. "8 skills", "16 skills", "18 skills")
  - Below: a flat, wrapped row of skill pill chips, most with a small brand icon, each in an outlined rounded-rectangle pill

## Category Data (confirmed content)
```json
[
  {
    "id": "foundations",
    "label": "Foundations",
    "title": "Programming Foundations",
    "description": "Core concepts that underpin everything — applied across problem-solving, development, and system design.",
    "count": 8,
    "skills": ["Object-Oriented Programming", "Data Structures", "Algorithms", "Complexity Analysis", "Linear Algebra", "Probability & Statistics", "Numerical Methods", "Computer Organization"]
  },
  {
    "id": "languages",
    "label": "Languages",
    "title": "Languages & Frameworks",
    "description": "Languages and frameworks used across data work, backend logic, and frontend interfaces.",
    "count": 16,
    "skills": ["Python", "JavaScript", "TypeScript", "C++", "R", "SQL", "HTML / CSS", "React", "Next.js", "Node.js", "Express.js", "FastAPI", "TailwindCSS", "PostgreSQL", "MongoDB", "Prisma ORM"]
  },
  {
    "id": "ai-ml",
    "label": "AI / ML",
    "title": "AI & Machine Learning",
    "description": "Concepts explored through coursework and applied directly to analytical and agentic projects.",
    "count": 18,
    "skills": ["Supervised Learning", "Unsupervised Learning", "Deep Learning", "Neural Networks", "NLP", "Feature Engineering", "Model Evaluation", "Data Preprocessing", "XGBoost", "LSTM", "LangChain", "LangGraph", "Groq", "RAG", "HuggingFace", "Optuna", "MLflow", "Evidently AI"]
  },
  {
    "id": "tools",
    "label": "Tools",
    "title": "Tools & Ecosystem",
    "description": "Supporting toolchain for data science, visualization, DevOps, and deployment.",
    "count": 18,
    "skills": ["NumPy", "Pandas", "Scikit-Learn", "TensorFlow", "Plotly", "Matplotlib", "Power BI", "DAX", "Jupyter", "Google Colab", "Git", "GitHub", "Docker", "Redis", "Supabase", "Vercel", "Postman", "VS Code"]
  }
]
```

## Interaction
- Tab click: swaps the content card (title/description/count/skill list) and re-populates the 3D globe's node set, likely with a cross-fade or fly-in animation for the nodes.
- Globe: drag to rotate/orbit; nodes probably gently auto-rotate/drift when idle.
- Skill pills in the list are static/informational (not clickable), each optionally prefixed with a brand icon.

## Implementation Notes
- Build the globe with `three.js` / `react-three-fiber`: a low-poly wireframe `SphereGeometry`, `OrbitControls` (or a custom drag-to-rotate handler) restricted to rotation only (no zoom/pan needed), and HTML-in-3D labels via `@react-three/drei`'s `<Html>` for the node pills so text stays crisp.
- Keep node positions on/near the sphere surface using spherical coordinates so they read as "orbiting" the globe rather than scattered randomly.
- Because this is the most performance-heavy component on the site, lazy-load it (dynamic import, client-only) and provide a static fallback image for reduced-motion / low-power settings.
