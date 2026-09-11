import { useState } from 'react'
import { Bot, CircuitBoard, Home, Menu, Moon, Newspaper, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  ['/projects', 'Projects'],
  ['/credentials', 'Credentials'],
  ['/skills', 'Forge'],
  ['/about', 'Persona'],
]

const themes = [
  ['dark', Moon],
  ['times', Newspaper],
  ['matrix', CircuitBoard],
  ['neural', Bot],
]

export default function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const index = themes.findIndex(([name]) => name === theme)
  const Icon = themes[index][1]
  const cycleTheme = () => setTheme(themes[(index + 1) % themes.length][0])

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-5">
      <div className="nav-shell mx-auto flex h-16 max-w-[1180px] items-center justify-between rounded-full px-3 pl-4 md:px-5">
        <Link to="/" className="flex items-center gap-2.5 font-mono text-sm font-semibold italic tracking-tight">
          <span className="grid size-8 place-items-center rounded-full border border-accent/40 text-accent"><Home size={14} /></span>
          <span className="brand-gradient hidden sm:block">muhammadsaim.me</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          {links.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/kiro" aria-label="AI assistant" className="nav-control size-10"><Bot size={16} /></Link>
          <button onClick={cycleTheme} className="nav-control gap-2 px-3 font-mono text-[11px] font-semibold uppercase tracking-wider" aria-label="Change theme"><Icon size={14} /><span>{theme}</span></button>
          <button onClick={() => setOpen(!open)} className="nav-control size-10 md:hidden" aria-label="Toggle menu">{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      {open && <nav className="nav-shell mx-auto mt-2 grid max-w-[1180px] gap-1 rounded-2xl p-3 md:hidden">{links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm text-muted hover:bg-white/5 hover:text-primary">{label}</NavLink>)}</nav>}
    </header>
  )
}
