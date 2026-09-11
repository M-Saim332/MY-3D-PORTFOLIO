/**
 * LocationCard.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Compact, content-driven location card connected to Sanity CMS / ContentContext.
 */

import { useRef, useState } from 'react'
import { usePortfolioContent } from '../content/ContentContext'

export default function LocationCard() {
  const { profile } = usePortfolioContent()
  const cardRef = useRef(null)
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50, opacity: 0 })

  function handlePointerMove(e) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    })
  }

  function handlePointerLeave() {
    setCursorPos(prev => ({ ...prev, opacity: 0 }))
  }

  const cityRegion = profile.cityRegion || 'Islamabad,'
  const country = profile.location || 'Pakistan'
  const coordinates = profile.coordinates || '33.6844° N, 73.0479° E'
  const gmtOffset = profile.gmtOffset || 'GMT +5:00'

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="location-card relative h-auto overflow-hidden rounded-2xl border border-line bg-surface/80 p-5 sm:p-6 backdrop-blur-md transition-all hover:border-accent/40"
    >
      {/* Interactive Cursor Glow Spot */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: cursorPos.opacity,
          background: `radial-gradient(200px circle at ${cursorPos.x}px ${cursorPos.y}px, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%)`,
        }}
      />

      <div className="relative z-10 space-y-3.5">
        {/* Header Label */}
        <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
          📍 LOCATION · HOVER TO EXPLORE
        </p>

        {/* Location Name */}
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            {cityRegion}{' '}
            <span className="text-accent">{country}</span>
          </h3>
        </div>

        {/* Coordinates & GMT Metadata Lines */}
        <div className="space-y-1.5 border-t border-line/60 pt-3 font-mono text-xs text-muted">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-muted/70">Coordinates</span>
            <span className="font-medium text-primary">{coordinates}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-muted/70">Timezone</span>
            <span className="font-medium text-primary">{gmtOffset}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
