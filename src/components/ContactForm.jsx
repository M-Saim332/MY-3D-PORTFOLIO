/**
 * ContactForm.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Modular contact form component with 2-column inputs, textarea, and submission handling.
 */

import { useState } from 'react'
import { ArrowRight, Check, Mail } from 'lucide-react'

export default function ContactForm({ email = 'contact@example.com' }) {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setSent(true)
    const subject = encodeURIComponent(`Portfolio message from ${form.get('name')}`)
    const body = encodeURIComponent(`${form.get('message')}\n\nReply to: ${form.get('email')}`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="content-card p-6 sm:p-7">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
          <Mail size={15} />
        </span>
        <h3 className="text-xl font-semibold tracking-tight text-primary">
          Send a Message
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="form-field">
          <span>Name</span>
          <input name="name" required placeholder="Your name" />
        </label>
        <label className="form-field">
          <span>Email</span>
          <input name="email" type="email" required placeholder="you@email.com" />
        </label>
      </div>

      <label className="form-field mt-1">
        <span>Message</span>
        <textarea name="message" required placeholder="Tell me about your idea or project..." />
      </label>

      <button className="button button-primary w-full sm:w-auto mt-2" type="submit">
        Send message <ArrowRight size={15} />
      </button>

      {sent && (
        <p className="mt-3 flex items-center gap-2 font-mono text-xs text-green">
          <Check size={14} /> Email client opened with your message draft.
        </p>
      )}
    </form>
  )
}
