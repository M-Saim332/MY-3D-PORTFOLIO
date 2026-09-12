/**
 * AcademicTrendCard.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Compact academic progress card plotting BOTH SPI (semester) and CPI (overall cumulative)
 * lines across S1–S4 in a sleek horizontal dashboard layout.
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

  const highestSpi = Math.max(...points.map(p => p.spi))
  const semAvg = (points.reduce((s, p) => s + p.spi, 0) / points.length).toFixed(1)

  const width = 200
  const height = 55
  const paddingX = 12
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
    <article className="content-card relative overflow-hidden rounded-2xl border border-line bg-surface/80 p-4 sm:p-5 backdrop-blur-md">
      {/* Horizontal Dashboard Layout: Left Info (58%), Right Chart (42%) on desktop */}
      <div className="grid items-center gap-4 sm:gap-6 lg:grid-cols-[1.18fr_0.82fr]">
        
        {/* LEFT SIDE — Academic Information */}
        <div className="flex flex-col justify-between min-w-0">
          {/* Header & Badges Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-mono text-[9px] font-medium tracking-wider text-muted/60 uppercase">
                {transcriptRef}
              </p>
              <h3 className="font-mono text-[10px] font-semibold tracking-[0.16em] text-accent uppercase">
                Learning Trajectory
              </h3>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[9px] font-semibold">
              <span className="inline-flex items-center gap-1 rounded-full border border-green/30 bg-green/10 px-2 py-0.5 text-green">
                <CheckCircle2 size={10} /> {verifyText}
              </span>
              <span className="rounded-full border border-line bg-surface px-2 py-0.5 text-muted">
                {semesterProgress}
              </span>
            </div>
          </div>

          {/* Main CGPA Score & Progress Description */}
          <div className="mt-2.5">
            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary">
                {cgpa}
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-semibold text-accent uppercase tracking-wider">
                {cgpaLabel}
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {cgpaStatus}
            </p>
          </div>

          {/* Secondary Academic Metrics Row */}
          <div className="mt-3 flex items-center gap-4 border-t border-line/60 pt-2 font-mono text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="text-muted/70 uppercase tracking-wider text-[9px]">Highest SPI</span>
              <span className="font-semibold text-primary">{highestSpi}</span>
            </div>
            <span className="text-line">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-muted/70 uppercase tracking-wider text-[9px]">Sem Average</span>
              <span className="font-semibold text-primary">{semAvg}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Compact Trend Graph */}
        <div className="flex flex-col justify-center min-w-0 w-full pt-2 sm:pt-0 border-t border-line/40 sm:border-t-0">
          <div className="relative w-full">
            <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="block h-[72px] sm:h-[80px] w-full overflow-visible">
              <defs>
                <linearGradient id="academicChartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Gradient Area Fill under SPI Line */}
              <path d={areaPath} fill="url(#academicChartGradient)" />

              {/* Line 1: CPI Overall Trend (Accent-2 dashed) */}
              <polyline
                fill="none"
                stroke="var(--accent-2)"
                strokeWidth="1.5"
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
                <circle key={`cpi-${pt.sem}`} cx={pt.x} cy={pt.y} r="2" fill="var(--accent-2)" />
              ))}

              {/* SPI Plot Dots */}
              {spiCoords.map(pt => (
                <circle key={`spi-${pt.sem}`} cx={pt.x} cy={pt.y} r="2.5" fill="var(--accent)" />
              ))}
            </svg>

            {/* Semester Axis Labels */}
            <div className="mt-1 flex justify-between px-1 font-mono text-[9px] text-muted">
              {spiCoords.map(c => <span key={c.sem}>{c.sem}</span>)}
            </div>
          </div>

          {/* Legend Row */}
          <div className="mt-1.5 flex items-center justify-end gap-3 font-mono text-[9px] text-muted">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> SPI
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-2)' }} /> CPI
            </span>
          </div>
        </div>

      </div>
    </article>
  )
}

