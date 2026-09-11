/**
 * WorkflowStep.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Modular process/workflow step component with colored icon badge and label.
 */

import { Lightbulb, FileCode2, Cpu, Code, ShieldCheck, TestTube, Rocket } from 'lucide-react'

const ICON_MAP = {
  IDEA: Lightbulb,
  PLAN: FileCode2,
  AI: Cpu,
  CODE: Code,
  REVIEW: ShieldCheck,
  TEST: TestTube,
  SHIP: Rocket,
}

export default function WorkflowStep({
  step = 'IDEA',
  label = 'Idea',
  iconKey = 'IDEA',
  accent = '#00d9ff',
  isLast = false,
}) {
  const IconComponent = ICON_MAP[iconKey] || Lightbulb

  return (
    <div className="flex flex-1 items-center">
      <div className="flex flex-col items-center gap-2">
        {/* Rounded square badge */}
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface shadow-sm transition-transform hover:scale-105"
          style={{
            borderColor: `color-mix(in srgb, ${accent} 40%, var(--line))`,
            boxShadow: `0 0 16px color-mix(in srgb, ${accent} 15%, transparent)`,
          }}
        >
          <IconComponent size={18} style={{ color: accent }} />
        </div>

        {/* Step label */}
        <span className="font-mono text-[10px] font-semibold tracking-wider text-muted uppercase">
          {label || step}
        </span>
      </div>

      {/* Connecting line */}
      {!isLast && (
        <div className="mx-2 hidden h-[1px] flex-1 bg-gradient-to-r from-line via-accent/30 to-line sm:block" />
      )}
    </div>
  )
}
