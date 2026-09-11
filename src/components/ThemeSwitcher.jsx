/**
 * ThemeSwitcher.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A polished pill-shaped theme-switcher dropdown for the portfolio navbar.
 *
 * Features:
 *  • Pill trigger: current theme icon + pulsing cyan status dot + chevron
 *  • Glassmorphic dropdown panel (backdrop-blur, semi-transparent, soft border)
 *  • Per-theme icons (Moon / Sun / Cpu / Terminal / Newspaper) via lucide-react
 *  • Cyan ✓ checkmark on the active row
 *  • Framer-motion AnimatePresence: fade + translateY on open/close (~160 ms)
 *  • Full keyboard navigation: ↑↓ arrows, Enter to select, Escape to close
 *  • Click-outside closes the panel via a useEffect listener
 *  • Accessible: aria-haspopup, aria-expanded, aria-selected, role="listbox"
 *
 * Props
 * ─────
 *   theme     string    active theme key (e.g. 'dark')
 *   setTheme  fn        setter from parent App state
 *
 * Usage
 * ─────
 *   <ThemeSwitcher theme={theme} setTheme={setTheme} />
 */

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bot,
  Check,
  ChevronDown,
  Moon,
  Newspaper,
  Sun,
  Terminal,
} from 'lucide-react'

// ── Theme definitions ─────────────────────────────────────────────────────────
// Each entry: [key, label, Icon, accentColor]
// accentColor drives the status-dot glow so it adapts per theme.
const THEMES = [
  ['dark',   'Dark',   Moon,      '#00d9ff'],
  ['times',  'Times',  Newspaper, '#a32020'],
  ['matrix', 'Matrix', Terminal,  '#32ff73'],
  ['neural', 'Neural', Bot,       '#75ffc7'],
]

// ── Animation variants ────────────────────────────────────────────────────────
const panelVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    transition: { duration: 0.12, ease: 'easeIn' },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] },
  },
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ThemeSwitcher({ theme, setTheme }) {
  const [open,    setOpen]    = useState(false)
  const [focused, setFocused] = useState(0)   // keyboard-focused row index
  const wrapRef   = useRef(null)
  const triggerRef = useRef(null)

  // Derive current theme entry
  const idx     = Math.max(0, THEMES.findIndex(([key]) => key === theme))
  const current = THEMES[idx]
  const [, , TriggerIcon, dotColor] = current

  // ── Close on outside click ────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return
    function onOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onOutside)
    return () => document.removeEventListener('pointerdown', onOutside)
  }, [open])

  // ── Keyboard navigation ───────────────────────────────────────────────────
  function onKeyDown(e) {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
        setFocused(idx)
      }
      return
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocused(f => (f + 1) % THEMES.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocused(f => (f - 1 + THEMES.length) % THEMES.length)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        choose(THEMES[focused][0])
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
        break
      default:
        break
    }
  }

  function choose(key) {
    setTheme(key)
    setOpen(false)
    triggerRef.current?.focus()
  }

  function toggle() {
    setOpen(prev => {
      if (!prev) setFocused(idx) // reset focus to current theme on open
      return !prev
    })
  }

  return (
    <div
      ref={wrapRef}
      className="theme-sw-root"
      onKeyDown={onKeyDown}
    >
      {/* ── Trigger button ── */}
      <button
        ref={triggerRef}
        type="button"
        id="theme-sw-trigger"
        className="theme-sw-trigger"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="theme-sw-panel"
        aria-label={`Theme: ${current[1]}. Click to change.`}
      >
        {/* Current theme icon */}
        <TriggerIcon size={14} aria-hidden="true" />

        {/* Pulsing status dot — color matches theme accent */}
        <span
          className="theme-sw-dot"
          style={{ '--dot-color': dotColor }}
          aria-hidden="true"
        />

        {/* Animated chevron rotates 180° when open */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="theme-sw-chevron"
          aria-hidden="true"
        >
          <ChevronDown size={12} />
        </motion.span>
      </button>

      {/* ── Dropdown panel ── */}
      <AnimatePresence>
        {open && (
          <motion.ul
            id="theme-sw-panel"
            role="listbox"
            aria-labelledby="theme-sw-trigger"
            className="theme-sw-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {THEMES.map(([key, label, Icon, accent], i) => {
              const isActive  = key === theme
              const isFocused = i === focused

              return (
                <li
                  key={key}
                  role="option"
                  aria-selected={isActive}
                  className={`theme-sw-row ${isActive ? 'theme-sw-row--active' : ''} ${isFocused ? 'theme-sw-row--focused' : ''}`}
                  onClick={() => choose(key)}
                  onPointerEnter={() => setFocused(i)}
                  // style for per-theme accent on hover glow
                  style={{ '--row-accent': accent }}
                >
                  {/* Left: icon in a mini pill */}
                  <span className="theme-sw-row-icon" aria-hidden="true">
                    <Icon size={13} />
                  </span>

                  {/* Label */}
                  <span className="theme-sw-row-label">{label}</span>

                  {/* Right: checkmark (active only) */}
                  {isActive && (
                    <Check size={12} className="theme-sw-check" aria-hidden="true" />
                  )}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
