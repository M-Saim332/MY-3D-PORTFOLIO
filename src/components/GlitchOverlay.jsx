/**
 * GlitchOverlay.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Random glitch-flicker overlay effect active exclusively on the Matrix theme.
 *
 * Spawns 1–7 random rectangular "static blocks" across the full page height
 * at irregular positions, sizes, and intervals. Each block flashes quickly
 * (100–300ms) and disappears — only frequency and spread have increased.
 */

import { useEffect, useState } from 'react'

export default function GlitchOverlay({ theme }) {
  const [blocks, setBlocks] = useState([])
  const isMatrix = theme === 'matrix'

  useEffect(() => {
    if (!isMatrix) {
      setBlocks([])
      return
    }

    let timeoutId = null
    let isActiveTab = !document.hidden

    function handleVisibility() {
      isActiveTab = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    function spawnGlitch() {
      if (!isActiveTab) {
        scheduleNext()
        return
      }

      setBlocks(prev => {
        // Allow up to 7 simultaneous blocks
        if (prev.length >= 7) return prev

        const id = Math.random().toString(36).substring(2, 9)
        const isScanline = Math.random() < 0.05   // ~1 in 20: wide scanline
        const isWide    = !isScanline && Math.random() < 0.1  // ~1 in 10: longer block
        const isRed     = Math.random() < 0.15    // ~1 in 7: red-tinted block

        // Scatter across full document height, not just viewport
        const pageH = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          window.innerHeight,
        )
        const topPx   = Math.floor(Math.random() * pageH)
        const leftPct = isScanline ? 0 : Math.floor(Math.random() * 90)

        const width = isScanline
          ? Math.floor(Math.random() * 20) + 80   // 80–100vw
          : isWide
          ? Math.floor(Math.random() * 150) + 150 // 150–300px
          : Math.floor(Math.random() * 130) + 20  // 20–150px
        const height = isScanline
          ? Math.floor(Math.random() * 2) + 1
          : Math.floor(Math.random() * 8) + 2     // 2–10px

        // Flash duration: 100–300ms (unchanged — only frequency/spread changed)
        const duration = Math.floor(Math.random() * 200) + 100

        const bg     = isRed ? 'rgba(255, 45, 85, 0.65)'        : 'rgba(255, 255, 255, 0.85)'
        const shadow = isRed ? '0 0 10px rgba(255, 45, 85, 0.8)' : '0 0 8px rgba(255, 255, 255, 0.6)'

        const newBlock = { id, topPx, leftPct, width, height, duration, bg, shadow, isScanline }

        // Auto-remove after flash duration
        setTimeout(() => {
          setBlocks(current => current.filter(b => b.id !== id))
        }, duration)

        return [...prev, newBlock]
      })

      scheduleNext()
    }

    function scheduleNext() {
      // Faster spawn: 100–500ms between glitches (was 250–1800ms)
      const delay = Math.floor(Math.random() * 400) + 100
      timeoutId = setTimeout(spawnGlitch, delay)
    }

    scheduleNext()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [isMatrix])

  if (!isMatrix) return null

  return (
    <div className="glitch-overlay-container" aria-hidden="true">
      {blocks.map(b => (
        <span
          key={b.id}
          className="glitch-block"
          style={{
            top:    `${b.topPx}px`,
            left:   b.isScanline ? '0' : `${b.leftPct}%`,
            width:  b.isScanline ? `${b.width}vw` : `${b.width}px`,
            height: `${b.height}px`,
            background:        b.bg,
            boxShadow:         b.shadow,
            animationDuration: `${b.duration}ms`,
          }}
        />
      ))}
    </div>
  )
}
