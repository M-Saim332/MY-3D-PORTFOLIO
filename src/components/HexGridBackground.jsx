/**
 * HexGridBackground.jsx — Matrix theme ONLY
 * ──────────────────────────────────────────────────────────────────────
 * Robust frame-based animation system with zero setTimeout dependency.
 * Guarantees immediate activity on fresh page loads, hard reloads, and
 * React StrictMode mount cycles.
 *
 * Activity rates:
 *   - Hex Glows : 2–5 new hex events / sec (70% red, 30% white)
 *   - White Glare: 2–5 new glare events / sec (streak + radial + glint)
 *   - Instant pre-seeding on Frame 1 (8 hexes + 6 glares pre-populated)
 */

import { useEffect, useRef } from 'react'

export default function HexGridBackground({ theme }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (theme !== 'matrix') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)
    let mob = W < 640
    let hexR = mob ? 24 : 30
    let hexW = hexR * Math.sqrt(3)
    let hexH = hexR * 1.5
    let cols = Math.ceil(W / hexW) + 3
    let rows = Math.ceil(H / hexH) + 3

    function updateSize() {
      if (!canvas) return
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      mob = W < 640
      hexR = mob ? 24 : 30
      hexW = hexR * Math.sqrt(3)
      hexH = hexR * 1.5
      cols = Math.ceil(W / hexW) + 3
      rows = Math.ceil(H / hexH) + 3
    }
    window.addEventListener('resize', updateSize)

    const now = () => performance.now()

    function hexCenter(col, row) {
      return {
        cx: (col - 0.5) * hexW + (row % 2 === 1 ? hexW / 2 : 0),
        cy: (row - 0.5) * hexH,
      }
    }

    function hexPath(cx, cy, r) {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6
        const x = cx + r * Math.cos(a)
        const y = cy + r * Math.sin(a)
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
    }

    const hexPool = []
    const glarePool = []

    function spawnHex(customTime = now(), customProg = 0) {
      if (hexPool.length >= (mob ? 14 : 28)) return

      const white = Math.random() < 0.30
      const col = 1 + Math.floor(Math.random() * Math.max(1, cols - 2))
      const row = 1 + Math.floor(Math.random() * Math.max(1, rows - 2))
      if (hexPool.some(h => h.col === col && h.row === row)) return

      const { cx, cy } = hexCenter(col, row)
      const durationMs = 500 + Math.random() * 1000

      hexPool.push({
        col, row, cx, cy, white,
        startTime: customTime - customProg * durationMs,
        durationMs,
        maxBorder: white ? 1.0 : (0.85 + Math.random() * 0.15),
        maxFill: white ? 0.25 : (0.12 + Math.random() * 0.12),
        glowR: white ? (28 + Math.random() * 18) : (20 + Math.random() * 20),
      })
    }

    function spawnGlare(customTime = now(), customProg = 0) {
      if (glarePool.length >= (mob ? 6 : 14)) return

      const rand = Math.random()
      let type, baseLen, coreH, bloomH, maxCA, maxBA, hlR, durMs

      if (rand < 0.50) {
        type = 'small'
        baseLen = 90 + Math.random() * 90
        coreH = 6 + Math.random() * 3
        bloomH = 22 + Math.random() * 10
        maxCA = 0.90 + Math.random() * 0.10
        maxBA = 0.40 + Math.random() * 0.15
        hlR = 100
        durMs = 500 + Math.random() * 500
      } else if (rand < 0.88) {
        type = 'medium'
        baseLen = 180 + Math.random() * 140
        coreH = 9 + Math.random() * 4
        bloomH = 32 + Math.random() * 14
        maxCA = 0.92 + Math.random() * 0.08
        maxBA = 0.42 + Math.random() * 0.15
        hlR = 160
        durMs = 700 + Math.random() * 500
      } else {
        if (glarePool.some(g => g.type === 'large')) return
        type = 'large'
        baseLen = 340 + Math.random() * 200
        coreH = 14 + Math.random() * 5
        bloomH = 48 + Math.random() * 18
        maxCA = 0.95 + Math.random() * 0.05
        maxBA = 0.46 + Math.random() * 0.12
        hlR = 240
        durMs = 900 + Math.random() * 400
      }

      const dir = Math.random() > 0.5 ? 1 : -1
      const drift = (25 + Math.random() * 55) * dir
      const hasGlint = Math.random() < 0.35

      glarePool.push({
        type,
        startX: W * (0.04 + Math.random() * 0.92),
        startY: H * (0.04 + Math.random() * 0.92),
        drift, baseLen, coreH, bloomH,
        maxCA, maxBA, hlR, hasGlint,
        startTime: customTime - customProg * durMs,
        durationMs: durMs,
      })
    }

    // Pre-seed Frame 1 with ongoing events
    const bootTime = now()
    for (let i = 0; i < 9; i++) {
      spawnHex(bootTime, Math.random() * 0.8)
    }
    for (let i = 0; i < 7; i++) {
      spawnGlare(bootTime, Math.random() * 0.8)
    }

    let lastHexSpawn = bootTime
    let nextHexDelay = 150 + Math.random() * 150

    let lastGlareSpawn = bootTime
    let nextGlareDelay = 180 + Math.random() * 170

    let animFrameId = null

    function render(currentTime) {
      const t = currentTime || now()

      // Spawn ticks driven strictly by render loop
      if (t - lastHexSpawn >= nextHexDelay) {
        const count = mob ? (1 + Math.floor(Math.random() * 2)) : (2 + Math.floor(Math.random() * 3))
        for (let i = 0; i < count; i++) spawnHex(t, 0)
        lastHexSpawn = t
        nextHexDelay = 140 + Math.random() * 140
      }

      if (t - lastGlareSpawn >= nextGlareDelay) {
        const count = mob ? 1 : (1 + Math.floor(Math.random() * 3))
        for (let i = 0; i < count; i++) spawnGlare(t, 0)
        lastGlareSpawn = t
        nextGlareDelay = 170 + Math.random() * 160
      }

      ctx.clearRect(0, 0, W, H)

      // LAYER 1: Dark subtle base honeycomb
      ctx.lineWidth = 0.85
      ctx.strokeStyle = 'rgba(180, 22, 50, 0.16)'
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const { cx, cy } = hexCenter(c, r)
          hexPath(cx, cy, hexR)
          ctx.fillStyle = 'rgba(120, 12, 28, 0.03)'
          ctx.fill()
          ctx.stroke()
        }
      }

      if (reduced) {
        animFrameId = requestAnimationFrame(render)
        return
      }

      // LAYER 2: Hex glow events
      for (let i = hexPool.length - 1; i >= 0; i--) {
        const h = hexPool[i]
        const prog = (t - h.startTime) / h.durationMs
        if (prog >= 1) { hexPool.splice(i, 1); continue }
        if (prog < 0) continue

        const a = Math.sin(prog * Math.PI)
        const bA = a * h.maxBorder
        const fA = a * h.maxFill
        const gR = Math.max(1, h.glowR * a)

        if (h.white) {
          // White hex glow
          hexPath(h.cx, h.cy, hexR)
          ctx.fillStyle = `rgba(255,255,255,${fA})`
          ctx.fill()

          ctx.save()
          ctx.shadowColor = '#ffffff'
          ctx.shadowBlur = gR * 2.0
          ctx.strokeStyle = `rgba(255,255,255,${bA})`
          ctx.lineWidth = 2.0 + a * 1.8
          hexPath(h.cx, h.cy, hexR)
          ctx.stroke()
          ctx.restore()

          ctx.save()
          ctx.shadowColor = 'rgba(255,255,255,0.6)'
          ctx.shadowBlur = gR * 3.5
          ctx.strokeStyle = `rgba(255,255,255,${bA * 0.5})`
          ctx.lineWidth = 4
          hexPath(h.cx, h.cy, hexR + 4)
          ctx.stroke()
          ctx.restore()
        } else {
          // Red hex glow
          hexPath(h.cx, h.cy, hexR)
          ctx.fillStyle = `rgba(255,35,75,${fA})`
          ctx.fill()

          ctx.save()
          ctx.shadowColor = 'rgba(255,45,90,1)'
          ctx.shadowBlur = gR * 2.0
          ctx.strokeStyle = `rgba(255,55,90,${bA})`
          ctx.lineWidth = 2.0 + a * 2.0
          hexPath(h.cx, h.cy, hexR)
          ctx.stroke()
          ctx.restore()

          ctx.save()
          ctx.shadowColor = 'rgba(255,20,50,0.7)'
          ctx.shadowBlur = gR * 3.5
          ctx.strokeStyle = `rgba(255,45,85,${bA * 0.45})`
          ctx.lineWidth = 4.5
          hexPath(h.cx, h.cy, hexR + 5)
          ctx.stroke()
          ctx.restore()
        }
      }

      // LAYER 3: Animated white glare streaks
      for (let i = glarePool.length - 1; i >= 0; i--) {
        const g = glarePool[i]
        const prog = (t - g.startTime) / g.durationMs
        if (prog >= 1) { glarePool.splice(i, 1); continue }
        if (prog < 0) continue

        const scaleX = 0.55 + prog * 0.70
        const len = Math.max(10, g.baseLen * scaleX)
        const cx = g.startX + g.drift * prog
        const cy = g.startY
        const aF = Math.sin(prog * Math.PI)
        const bA = aF * g.maxBA
        const cA = aF * g.maxCA
        const coreH = Math.max(2, g.coreH)
        const bloomH = Math.max(4, g.bloomH)

        ctx.save()

        const bgrd = ctx.createLinearGradient(cx - len / 2, cy, cx + len / 2, cy)
        bgrd.addColorStop(0, 'rgba(255,255,255,0)')
        bgrd.addColorStop(0.15, `rgba(255,255,255,${bA * 0.28})`)
        bgrd.addColorStop(0.35, `rgba(255,255,255,${bA * 0.72})`)
        bgrd.addColorStop(0.5, `rgba(255,255,255,${bA})`)
        bgrd.addColorStop(0.65, `rgba(255,255,255,${bA * 0.72})`)
        bgrd.addColorStop(0.85, `rgba(255,255,255,${bA * 0.28})`)
        bgrd.addColorStop(1, 'rgba(255,255,255,0)')

        ctx.shadowColor = '#ffffff'
        ctx.shadowBlur = 28 * aF
        ctx.fillStyle = bgrd
        ctx.beginPath()
        ctx.ellipse(cx, cy, len / 2, bloomH / 2, 0, 0, Math.PI * 2)
        ctx.fill()

        const cgrd = ctx.createLinearGradient(cx - len / 2, cy, cx + len / 2, cy)
        cgrd.addColorStop(0, 'rgba(255,255,255,0)')
        cgrd.addColorStop(0.12, `rgba(255,255,255,${cA * 0.30})`)
        cgrd.addColorStop(0.32, `rgba(255,255,255,${cA * 0.85})`)
        cgrd.addColorStop(0.5, `rgba(255,255,255,${cA})`)
        cgrd.addColorStop(0.68, `rgba(255,255,255,${cA * 0.85})`)
        cgrd.addColorStop(0.88, `rgba(255,255,255,${cA * 0.30})`)
        cgrd.addColorStop(1, 'rgba(255,255,255,0)')

        ctx.shadowColor = '#ffffff'
        ctx.shadowBlur = 14 * aF
        ctx.fillStyle = cgrd
        ctx.beginPath()
        ctx.ellipse(cx, cy, len / 2, coreH / 2, 0, 0, Math.PI * 2)
        ctx.fill()

        const starR = Math.max(1, coreH * 3)
        const sgrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, starR)
        sgrd.addColorStop(0, '#ffffff')
        sgrd.addColorStop(0.4, `rgba(255,255,255,${cA})`)
        sgrd.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = sgrd
        ctx.beginPath()
        ctx.arc(cx, cy, starR, 0, Math.PI * 2)
        ctx.fill()

        if (g.hasGlint) {
          const vl = Math.min(len * 0.24, 30)
          ctx.strokeStyle = `rgba(255,255,255,${cA * 0.88})`
          ctx.lineWidth = 2
          ctx.shadowColor = '#ffffff'
          ctx.shadowBlur = 12 * aF
          ctx.beginPath()
          ctx.moveTo(cx, cy - vl)
          ctx.lineTo(cx, cy + vl)
          ctx.stroke()
        }

        ctx.restore()

        const c0 = Math.max(0, Math.floor((cx - g.hlR) / hexW))
        const c1 = Math.min(cols, Math.ceil((cx + g.hlR) / hexW))
        const r0 = Math.max(0, Math.floor((cy - g.hlR) / hexH))
        const r1 = Math.min(rows, Math.ceil((cy + g.hlR) / hexH))

        for (let r = r0; r < r1; r++) {
          for (let c = c0; c < c1; c++) {
            const { cx: hx, cy: hy } = hexCenter(c, r)
            const d = Math.hypot(hx - cx, hy - cy)
            if (d < g.hlR) {
              const pf = (1 - d / g.hlR) * aF
              if (pf > 0.08) {
                hexPath(hx, hy, hexR)
                ctx.save()
                ctx.fillStyle = `rgba(255,255,255,${pf * 0.15})`
                ctx.fill()
                ctx.strokeStyle = `rgba(255,255,255,${pf * 0.90})`
                ctx.lineWidth = 1.2 + pf * 1.4
                ctx.shadowColor = '#ffffff'
                ctx.shadowBlur = 9 * pf
                ctx.stroke()
                ctx.restore()
              }
            }
          }
        }
      }

      animFrameId = requestAnimationFrame(render)
    }

    animFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', updateSize)
      if (animFrameId) cancelAnimationFrame(animFrameId)
    }
  }, [theme])

  if (theme !== 'matrix') return null

  return (
    <div className="hex-grid-container" aria-hidden="true">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
