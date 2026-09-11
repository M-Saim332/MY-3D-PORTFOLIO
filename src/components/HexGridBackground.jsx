/**
 * HexGridBackground.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Fixed ambient hexagonal pattern grid overlay, active on the Matrix theme.
 * Includes a secondary layer of scattered accent hexagons (wireframe + 2 filled).
 */

// Helper: generate a flat-top hexagon polygon points string centered at (cx, cy) with radius r
function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30)
    return `${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`
  }).join(' ')
}

// Fixed scatter data — deterministic so no hydration mismatch
// Format: [leftVw, topVh, radius, isFilled]
const ACCENT_HEXES = [
  [8,   12,  52, false],
  [78,  6,   38, false],
  [55,  22,  44, false],
  [22,  38,  60, false],
  [88,  35,  34, false],
  [42,  55,  48, true ],   // ← filled accent #1
  [15,  68,  36, false],
  [70,  62,  56, false],
  [90,  75,  42, false],
  [35,  82,  30, false],
  [60,  88,  64, true ],   // ← filled accent #2
  [5,   92,  40, false],
]

export default function HexGridBackground({ theme }) {
  if (theme !== 'matrix') return null

  return (
    <div className="hex-grid-container" aria-hidden="true">

      {/* Layer 1: tiling hex-grid outline pattern (slightly more visible) */}
      <svg className="hex-grid-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hex-pattern"
            width="40"
            height="69.282"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 20 11.547 L 0 0 L 0 23.094 L 20 34.641 L 40 23.094 Z M 0 34.641 L 20 46.188 L 0 57.735 L 0 80.83 L 20 92.376 L 40 80.83 L 40 57.735 L 20 46.188 Z"
              fill="none"
              stroke="rgba(255, 45, 85, 0.13)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-pattern)" />
      </svg>

      {/* Layer 2: scattered accent hexagons across the full page */}
      <svg
        className="hex-grid-svg hex-accents-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
      >
        {ACCENT_HEXES.map(([lv, tv, r, filled], i) => {
          // Convert vw/vh percentages into the 0-100 viewBox space
          // We render in a viewBox that maps 1 unit = 1% of the container
          // so leftVw → cx, topVh → cy
          const cx = lv
          const cy = tv
          // Scale radius from px → viewBox units (container is ~100vw wide, so 1vw ≈ 1 unit)
          const rv = r * 0.055 // tune: 52px hex ≈ 2.86 units in 0-100 vb

          return filled ? (
            <polygon
              key={i}
              points={hexPoints(cx, cy, rv)}
              fill="rgba(255, 45, 85, 0.55)"
              stroke="rgba(255, 45, 85, 0.9)"
              strokeWidth="0.15"
            />
          ) : (
            <polygon
              key={i}
              points={hexPoints(cx, cy, rv)}
              fill="none"
              stroke="rgba(255, 45, 85, 0.22)"
              strokeWidth="0.12"
            />
          )
        })}
      </svg>

    </div>
  )
}
