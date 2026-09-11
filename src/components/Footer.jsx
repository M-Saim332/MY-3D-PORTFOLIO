import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-line py-8 font-mono text-[11px] uppercase tracking-wider text-muted">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-5 px-5 sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2"><i className="status-dot" />© 2026 Muhammad Saim</span>
        <a href="mailto:" className="flex items-center gap-2 hover:text-accent">Available for opportunities <ArrowUpRight size={13} /></a>
      </div>
    </footer>
  )
}
