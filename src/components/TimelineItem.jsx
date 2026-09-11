/**
 * TimelineItem.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Modular timeline row component for Experience / Education sections.
 */

import { ArrowUpRight } from 'lucide-react'

export default function TimelineItem({
  date = '2024 — PRESENT',
  title = 'Builder & ML Developer',
  company = 'Independent / Open Source',
  description = 'Designing and shipping AI-powered products across finance, fitness, and analytics.',
  tags = ['AI/ML', 'FULL-STACK', 'DATA'],
  link = null,
  accent = 'var(--accent)',
}) {
  return (
    <article className="timeline-item group border-b border-line/60 py-5 transition-colors hover:border-line">
      <div className="grid gap-3 md:grid-cols-[160px_1fr_auto] md:items-start md:gap-6">
        {/* Date / Time */}
        <time className="font-mono text-xs font-semibold tracking-wider text-accent" style={{ color: accent }}>
          {date}
        </time>

        {/* Content */}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-primary">
              {title}
            </h3>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="text-muted transition-colors hover:text-accent"
                aria-label={`Open ${title}`}
              >
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>

          <p className="mt-0.5 font-mono text-xs font-medium" style={{ color: accent }}>
            {company}
          </p>

          <p className="mt-2 text-xs leading-5 text-muted">
            {description}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 md:justify-end">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-line bg-surface/50 px-2.5 py-1 font-mono text-[9px] font-semibold text-muted transition-colors group-hover:border-accent/40 group-hover:text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
