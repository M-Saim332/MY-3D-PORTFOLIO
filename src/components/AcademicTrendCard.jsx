/**
 * AcademicTrendCard.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Academic progress card plotting BOTH SPI (semester) and CPI (overall cumulative)
 * lines across S1–S4 with a two-item legend and transcript reference label.
 */

import { CheckCircle2 } from 'lucide-react'
import { usePortfolioContent } from '../content/ContentContext'

export default function AcademicTrendCard() {
  const { profile } = usePortfolioContent()

  const cgpa = profile.cgpa || '3.82'
  const cgpaLabel = profile.cgpaLabel || 'CURRENT CGPA'
  const cgpaStatus = profile.cgpaStatus || 'SPI dipped Sem 2, recovering steadily since'
  const semesterProgress = profile.semesterProgress || '4/8 SEMS'
  const verifyText = profile.verifyText || 'VERIFIED'
  const transcriptRef = profile.transcriptRef || 'TRANSCRIPT REF · TR-2026-084'

  // Data array with both SPI and CPI values per semester
  const rawPoints = profile.chartData?.length ? profile.chartData : [
    { sem: 'S1', spi: 84, cpi: 84 },
    { sem: 'S2', spi: 72, cpi: 78 },
    { sem: 'S3', spi: 88, cpi: 82 },
    { sem: 'S4', spi: 95, cpi: 86 },
  ]

  // Sanity previously stored SPI only. Derive a cumulative CPI instead of
  // copying SPI, which made both chart lines overlap exactly.
  let cumulativeSpi = 0
  const points = rawPoints.map((point, index) => {
    const spi = Number(point.spi) || 0
    cumulativeSpi += spi
    return {
      ...point,
      spi,
      cpi: Number.isFinite(Number(point.cpi)) ? Number(point.cpi) : cumulativeSpi / (index + 1),
    }
  })

  const width = 180
  const height = 50
  const paddingX = 15
  const paddingY = 8

  const minVal = 60
  const maxVal = 100

  // Coordinates for SPI line
  const spiCoords = points.map((pt, i) => {
    const x = paddingX + (i / Math.max(1, points.length - 1)) * (width - 2 * paddingX)
    const y = height - paddingY - ((pt.spi - minVal) / (maxVal - minVal)) * (height - 2 * paddingY)
    return { sem: pt.sem, val: pt.spi, x, y }
  })

  // Coordinates for CPI line
  const cpiCoords = points.map((pt, i) => {
    const x = paddingX + (i / Math.max(1, points.length - 1)) * (width - 2 * paddingX)
    const cpiVal = pt.cpi ?? pt.spi
    const y = height - paddingY - ((cpiVal - minVal) / (maxVal - minVal)) * (height - 2 * paddingY)
    return { sem: pt.sem, val: cpiVal, x, y }
  })

  const spiPolyline = spiCoords.map(c => `${c.x},${c.y}`).join(' ')
  const cpiPolyline = cpiCoords.map(c => `${c.x},${c.y}`).join(' ')
  const areaPath = `M ${spiCoords[0].x},${height} L ${spiCoords.map(c => `${c.x},${c.y}`).join(' L ')} L ${spiCoords[spiCoords.length - 1].x},${height} Z`

  return (
    <article className="content-card relative overflow-hidden rounded-2xl border border-line bg-surface/80 p-5 sm:p-6 backdrop-blur-md">
      {/* Top Header & Badges */}
      <div className="flex items-center justify-between">
        <div>
          {/* Optional muted transcript ref label above heading */}
          <p className="font-mono text-[9px] font-medium tracking-wider text-muted/60 uppercase">
            {transcriptRef}
          </p>
          <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-accent uppercase">
            Learning Trajectory
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[9px] font-semibold">
          <span className="inline-flex items-center gap-1 rounded-full border border-green/30 bg-green/10 px-2.5 py-0.5 text-green">
            <CheckCircle2 size={10} /> {verifyText}
          </span>
          <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-muted">
            {semesterProgress}
          </span>
        </div>
      </div>

      {/* Main Content & Dual SVG Line Chart (SPI + CPI) */}
      <div className="mt-5 grid items-stretch gap-5 sm:grid-cols-[minmax(145px,.8fr)_minmax(220px,1.4fr)]">
        {/* Left: CGPA Score, Status & Mini-Stats */}
        <div className="flex min-w-0 flex-col justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-bold tracking-tight text-primary">
                {cgpa}
              </span>
              <span className="font-mono text-xs font-semibold text-accent">
                {cgpaLabel}
              </span>
            </div>

            <p className="mt-4 text-xs leading-5 text-muted">
              {cgpaStatus}
            </p>
          </div>

          {/* Mini-stat row: Highest SPI + Semester Average */}
          <div className="grid grid-cols-2 gap-2 border-t border-line/60 pt-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider text-muted/60">Highest SPI</p>
              <p className="mt-0.5 font-mono text-sm font-semibold text-primary">
                {Math.max(...points.map(p => p.spi))}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider text-muted/60">Sem Average</p>
              <p className="mt-0.5 font-mono text-sm font-semibold text-primary">
                {(points.reduce((s, p) => s + p.spi, 0) / points.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Dual SVG Line Chart — taller for visual weight */}
        <div className="flex min-w-0 w-full flex-col">
          <div className="relative w-full">
            <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="block h-[190px] w-full overflow-visible sm:h-[210px]">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Gradient Area Fill under SPI Line */}
              <path d={areaPath} fill="url(#chartGradient)" />

              {/* Line 1: CPI Overall Trend (Orange dashed) */}
              <polyline
                fill="none"
                stroke="#ffad66"
                strokeWidth="1.75"
                strokeDasharray="3 3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={cpiPolyline}
                style={{ animation: 'chartDraw 0.8s ease-out forwards' }}
              />

              {/* Line 2: SPI Semester Trend (Accent solid) */}
              <polyline
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={spiPolyline}
                style={{ animation: 'chartDraw 0.9s ease-out forwards' }}
              />

              {/* CPI Plot Dots */}
              {cpiCoords.map(pt => (
                <circle key={`cpi-${pt.sem}`} cx={pt.x} cy={pt.y} r="2.5" fill="#ffad66" />
              ))}

              {/* SPI Plot Dots — no stroke, pure accent fill */}
              {spiCoords.map(pt => (
                <circle key={`spi-${pt.sem}`} cx={pt.x} cy={pt.y} r="3" fill="var(--accent)" />
              ))}
            </svg>

            {/* Semester Axis Labels */}
            <div className="mt-1 flex justify-between px-1.5 font-mono text-[9px] text-muted">
              {spiCoords.map(c => <span key={c.sem}>{c.sem}</span>)}
            </div>
          </div>

          {/* Two-Item Legend (SPI + CPI) */}
          <div className="mt-2 flex items-center gap-3 font-mono text-[9px] text-muted">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> SPI
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffad66]" /> CPI
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
