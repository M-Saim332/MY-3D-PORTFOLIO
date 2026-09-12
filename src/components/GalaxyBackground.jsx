/**
 * GalaxyBackground.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A self-contained interactive galaxy canvas that can be dropped into any
 * hero section. Features:
 *
 *   • Hundreds of twinkling star particles (randomised size / opacity / phase)
 *   • Lerp-smoothed cursor tracking so the nebula glow never "snaps"
 *   • Stars within `reactRadius` px repel / drift away from the cursor, then
 *     ease back to their home position (spring-like restoring force)
 *   • Faint constellation lines between stars that are close together AND
 *     near the cursor — lines fade with distance from both endpoints
 *   • Soft radial "nebula" gradient that follows the lerped cursor position
 *   • requestAnimationFrame render loop capped to ~60 fps
 *   • Pauses when the tab is hidden (document.visibilitychange) or the canvas
 *     scrolls out of view (IntersectionObserver)
 *   • Recalculates on window resize (debounced 150 ms)
 *   • Mobile: reduces particle count and skips repel physics entirely, keeping
 *     only the twinkle so the battery/GPU isn't hammered
 *
 * Props
 * ─────
 *   particleCount   number   Total star count on desktop  (default 320)
 *   color           string   Accent hex / CSS colour      (default '#00d9ff')
 *   reactRadius     number   px radius of cursor effect   (default 170)
 *   className       string   Extra CSS classes for wrapper (default '')
 *
 * Usage
 * ─────
 *   <GalaxyBackground />
 *   <GalaxyBackground particleCount={200} reactRadius={120} color="#8b5cf6" />
 */

import { useEffect, useRef } from 'react'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Linear interpolation — used for smooth cursor easing. */
const lerp = (a, b, t) => a + (b - a) * t

/** Parse a CSS hex colour (#rrggbb or #rgb) into { r, g, b }. */
function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean
  const int = parseInt(full, 16)
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GalaxyBackground({
  particleCount = 320,
  color = '#00d9ff',
  reactRadius = 170,
  className = '',
}) {
  const canvasRef = useRef(null)
  const wrapRef   = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext('2d')
    const rgb = hexToRgb(color)  // pre-parsed for cheap rgba() strings

    let activeTheme = document.documentElement.dataset.theme || 'dark'

    // ── Environment detection ────────────────────────────────────────────────
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
                  || window.innerWidth < 768
    const reduced  = matchMedia('(prefers-reduced-motion: reduce)').matches
    const COUNT    = isMobile ? Math.floor(particleCount * 0.45) : particleCount

    // ── Mutable state ────────────────────────────────────────────────────────
    let width  = 0
    let height = 0
    let rafId  = 0
    let paused = activeTheme !== 'dark'
    let lastTime = 0

    // Listen for theme changes on <html> element
    const themeObserver = new MutationObserver(() => {
      const current = document.documentElement.dataset.theme || 'dark'
      if (current !== activeTheme) {
        activeTheme = current
        paused = activeTheme !== 'dark'
        if (paused) {
          if (rafId) cancelAnimationFrame(rafId)
          rafId = 0
          ctx.clearRect(0, 0, width, height)
        } else if (rafId === 0) {
          rafId = requestAnimationFrame(tick)
        }
      }
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // Raw mouse position (updated by pointermove)
    let rawMouse = { x: -9999, y: -9999 }
    // Lerped mouse position — used for rendering (smooth, never snaps)
    let smoothMouse = { x: -9999, y: -9999 }

    // ── Particle factory ─────────────────────────────────────────────────────
    /**
     * Each star stores:
     *   ox, oy  — normalised "home" position (0..1 relative to canvas)
     *   x,  y   — current screen-space pixel position
     *   dx, dy  — displacement from home caused by cursor repulsion
     *   r       — base radius in CSS px
     *   phase   — random offset for the twinkle sine wave
     *   speed   — twinkle frequency multiplier
     *   vx, vy  — very slow autonomous drift velocity (normalised units/ms)
     */
    const stars = Array.from({ length: COUNT }, () => {
      const r = Math.random() * 1.4 + 0.4  // 0.4 – 1.8 px
      return {
        ox: Math.random(),
        oy: Math.random(),
        x:  0,
        y:  0,
        dx: 0,
        dy: 0,
        r,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0008 + Math.random() * 0.0012,
        vx: (Math.random() - 0.5) * 0.000015,
        vy: (Math.random() - 0.5) * 0.000010,
      }
    })

    // ── Canvas sizing ─────────────────────────────────────────────────────────
    function resize() {
      const rect = wrap.getBoundingClientRect()
      width  = rect.width
      height = rect.height
      const dpr = Math.min(devicePixelRatio, 2)

      canvas.width  = Math.round(width  * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width  = width  + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Re-anchor all star home positions after resize
      stars.forEach(s => {
        s.x  = s.ox * width
        s.y  = s.oy * height
        s.dx = 0
        s.dy = 0
      })
    }

    // Debounce: don't thrash on every pixel of a window-drag
    let resizeTimer = 0
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }

    // ── Pointer tracking ──────────────────────────────────────────────────────
    function onPointerMove(e) {
      // Skip touch on mobile — we disable physics there anyway but this also
      // prevents the nebula glow jumping during touch-scroll
      if (isMobile && e.pointerType === 'touch') return
      const rect = wrap.getBoundingClientRect()
      rawMouse.x = e.clientX - rect.left
      rawMouse.y = e.clientY - rect.top
    }

    function onPointerLeave() {
      rawMouse.x = -9999
      rawMouse.y = -9999
    }

    // ── Visibility / IntersectionObserver ─────────────────────────────────────
    function onVisibilityChange() {
      paused = document.hidden
      if (!paused && rafId === 0) rafId = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        paused = !entry.isIntersecting
        if (!paused && rafId === 0) rafId = requestAnimationFrame(tick)
      },
      { threshold: 0.05 },
    )
    observer.observe(wrap)

    // ── Main render loop ──────────────────────────────────────────────────────
    function tick(now) {
      if (paused) { rafId = 0; return }
      rafId = requestAnimationFrame(tick)

      // Cap dt to 50 ms so a stalled tab doesn't produce a huge jump
      const dt = Math.min(now - lastTime, 50)
      lastTime = now

      // ── 1. Smooth the cursor position with lerp ──────────────────────────
      //    easing factor 0.10 = slow dreamy follow, 0.18 = snappier
      const ease = reduced ? 1 : 0.10
      if (rawMouse.x > -9000) {
        smoothMouse.x = lerp(
          smoothMouse.x < -9000 ? rawMouse.x : smoothMouse.x,
          rawMouse.x, ease,
        )
        smoothMouse.y = lerp(
          smoothMouse.y < -9000 ? rawMouse.y : smoothMouse.y,
          rawMouse.y, ease,
        )
      } else {
        // Cursor left — gently drift smooth position off-screen
        smoothMouse.x = lerp(smoothMouse.x, -9999, 0.04)
        smoothMouse.y = lerp(smoothMouse.y, -9999, 0.04)
      }

      ctx.clearRect(0, 0, width, height)

      // ── 2. Draw nebula glow at the lerped cursor ─────────────────────────
      //    Radial gradient in the accent colour — appears as a soft haze
      const mx = smoothMouse.x
      const my = smoothMouse.y
      if (mx > -500 && height > 0) {
        const nebulaR = reactRadius * 1.8
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, nebulaR)
        grad.addColorStop(0,    `rgba(${rgb.r},${rgb.g},${rgb.b},0.13)`)
        grad.addColorStop(0.45, `rgba(${rgb.r},${rgb.g},${rgb.b},0.06)`)
        grad.addColorStop(1,    `rgba(${rgb.r},${rgb.g},${rgb.b},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(mx, my, nebulaR, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── 3. Update star physics ───────────────────────────────────────────
      //
      //    Physics model (desktop only, skipped on mobile / reduced-motion):
      //
      //    Repulsion:
      //      The cursor acts as a repulsive point force within `reactRadius`.
      //      Force direction  = unit vector from cursor → star home position.
      //      Force magnitude  = (1 − dist/reactRadius) × reactRadius × 0.18
      //        → strongest at the centre, drops linearly to zero at the edge.
      //      The displacement accumulates into (dx, dy) each frame.
      //
      //    Restoration (spring):
      //      Each frame we multiply (dx, dy) by a dampening factor < 1.
      //      This makes the displacement shrink exponentially — stars ease
      //      back to home without needing timers or target tracking.
      //      Dampening 0.88 = snappy;  0.94 = floaty/slow return.
      //
      const r2 = reactRadius * reactRadius  // avoid sqrt in inner loop

      stars.forEach(s => {
        // Slow autonomous drift (desktop only)
        if (!isMobile && !reduced) {
          s.ox = (s.ox + s.vx * dt + 1) % 1
          s.oy = (s.oy + s.vy * dt + 1) % 1
        }

        // Home position in pixels
        const hx = s.ox * width
        const hy = s.oy * height

        if (!isMobile && !reduced && rawMouse.x > -9000) {
          const tox   = hx - rawMouse.x
          const toy   = hy - rawMouse.y
          const dist2 = tox * tox + toy * toy

          if (dist2 < r2 && dist2 > 0.001) {
            const dist     = Math.sqrt(dist2)
            const strength = (1 - dist / reactRadius) * reactRadius * 0.18
            s.dx += (tox / dist) * strength
            s.dy += (toy / dist) * strength
          }
        }

        // Spring dampening — pulls displacement back toward zero
        s.dx *= 0.88
        s.dy *= 0.88

        s.x = hx + s.dx
        s.y = hy + s.dy
      })

      // ── 4. Constellation lines ───────────────────────────────────────────
      //    Drawn between pairs of "near" stars that are also close to each
      //    other. Alpha fades with inter-star distance for a natural look.
      if (!isMobile && !reduced && rawMouse.x > -9000) {
        const lineZone  = reactRadius * 1.25
        const lineZone2 = lineZone * lineZone
        const maxLink   = 90   // max px gap between two stars to link them

        // Filter to stars inside the cursor's constellation zone (avoids O(n²) on full array)
        const near = stars.filter(s => {
          const dx = s.x - rawMouse.x
          const dy = s.y - rawMouse.y
          return dx * dx + dy * dy < lineZone2
        })

        ctx.lineWidth = 0.65
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const a = near[i], b = near[j]
            const dx   = a.x - b.x
            const dy   = a.y - b.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist > maxLink) continue

            const alpha = (1 - dist / maxLink) * 0.22
            ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // ── 5. Draw stars ────────────────────────────────────────────────────
      stars.forEach(s => {
        // Twinkle: opacity oscillates on a per-star sine wave
        const twinkle = 0.25 + (Math.sin(now * s.speed + s.phase) + 1) * 0.22

        // Proximity boost: brighter + slightly larger when near cursor
        let boost = 0
        if (!isMobile && !reduced && rawMouse.x > -9000) {
          const dx = s.x - rawMouse.x
          const dy = s.y - rawMouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < r2) boost = (1 - Math.sqrt(d2) / reactRadius) * 0.6
        }

        const alpha  = Math.min(1, twinkle + boost * 0.3)
        const radius = s.r + boost * 1.0

        ctx.globalAlpha = alpha
        ctx.fillStyle   = `rgb(${rgb.r},${rgb.g},${rgb.b})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2)
        ctx.fill()

        // Sparkle cross on larger stars when near cursor
        if (s.r > 1.2 && boost > 0.15) {
          const arm = radius * 2.8
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.55})`
          ctx.lineWidth   = 0.7
          ctx.beginPath()
          ctx.moveTo(s.x - arm, s.y); ctx.lineTo(s.x + arm, s.y)
          ctx.moveTo(s.x, s.y - arm); ctx.lineTo(s.x, s.y + arm)
          ctx.stroke()
        }
      })

      ctx.globalAlpha = 1
    }

    // ── Bootstrap ─────────────────────────────────────────────────────────────
    resize()
    lastTime = performance.now()
    rafId = requestAnimationFrame(tick)

    window.addEventListener('resize',             onResize,          { passive: true })
    wrap.addEventListener('pointermove',           onPointerMove,     { passive: true })
    wrap.addEventListener('pointerleave',          onPointerLeave,    { passive: true })
    document.addEventListener('visibilitychange',  onVisibilityChange)

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(resizeTimer)
      observer.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('resize',            onResize)
      wrap.removeEventListener('pointermove',         onPointerMove)
      wrap.removeEventListener('pointerleave',        onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  // Re-run if any prop changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particleCount, color, reactRadius])

  return (
    /**
     * The wrapper uses position:absolute + inset:0 so it fills the nearest
     * positioned ancestor without affecting document flow.
     * The parent element must have position:relative (or any non-static value).
     * z-index is intentionally 0 — override via className if needed.
     */
    <div
      ref={wrapRef}
      className={`galaxy-bg-wrap ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="galaxy-bg-canvas"
        aria-hidden="true"
      />
    </div>
  )
}
