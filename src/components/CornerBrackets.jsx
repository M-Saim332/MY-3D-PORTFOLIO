/**
 * CornerBrackets.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable wrapper that adds sci-fi L-shaped HUD brackets to the 4 corners
 * of card/container elements.
 */

export default function CornerBrackets({ children, className = '' }) {
  return (
    <div className={`corner-bracket-wrap relative ${className}`}>
      <span className="corner-bracket top-left" />
      <span className="corner-bracket top-right" />
      <span className="corner-bracket bottom-left" />
      <span className="corner-bracket bottom-right" />
      {children}
    </div>
  )
}
