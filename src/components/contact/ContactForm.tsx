'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useLenis } from '@/components/providers/LenisProvider'
import { content } from '@/data/content'

const ACCESS_KEY = '6fd11388-49a7-41bc-b8fd-2a92b4d25bc4'
const EASE = [0.16, 1, 0.3, 1] as const

type Status = 'idle' | 'sending' | 'success' | 'error'

/* min-h + >=16px type: keeps taps comfortable and stops iOS zooming on focus. */
const FIELD =
  'w-full min-h-[52px] rounded-xl lg:rounded-2xl bg-neutral-800 border border-neutral-700 px-5 py-4 text-base sm:text-lg lg:text-xl text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors duration-300'
const LABEL = 'font-mono text-xs lg:text-sm tracking-widest text-neutral-400 uppercase mb-2.5 block'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input:not([type="hidden"]), select, [tabindex]:not([tabindex="-1"])'

export function ContactForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)
  const { stop, start } = useLenis()
  const reduceMotion = useReducedMotion() ?? false

  /* Lock the background: pause Lenis and hide overflow on <html>. It has to be
     <html> rather than <body> because globals.css sets `overflow-x: hidden`
     there, which makes <html> the scroll container and stops body overflow
     propagating to the viewport. Any scrollbar width is paid back as padding so
     the page cannot shift, and the exact scroll offset is restored on close. */
  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const scrollY = window.scrollY
    const scrollbarW = window.innerWidth - html.clientWidth
    const prevOverflow = html.style.overflow
    const prevPadding = html.style.paddingRight

    stop()
    html.style.overflow = 'hidden'
    if (scrollbarW > 0) html.style.paddingRight = `${scrollbarW}px`

    return () => {
      html.style.overflow = prevOverflow
      html.style.paddingRight = prevPadding
      window.scrollTo(0, scrollY)
      start()
    }
  }, [open, stop, start])

  /* Escape to close, and keep Tab cycling inside the dialog. */
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    // Focus the panel itself, not the first field: focusing an input here would
    // pop the on-screen keyboard the instant the modal opens on mobile.
    panel?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetWidth > 0 || el.offsetHeight > 0
      )
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Reset state shortly after closing so reopening is clean.
  useEffect(() => {
    if (open) return
    const t = setTimeout(() => {
      setStatus('idle')
      setError('')
    }, 300)
    return () => clearTimeout(t)
  }, [open])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    setError('')

    const data = new FormData(form)
    data.append('access_key', ACCESS_KEY)
    data.append('subject', 'New message from your portfolio')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json: { success: boolean; message?: string } = await res.json()
      if (json.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setError(json.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setError('Network error — please check your connection and try again.')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onMouseDown={(e) => {
            // Only a press that starts on the backdrop itself closes; presses
            // inside the panel (including drag-selecting text) must not.
            if (e.target === e.currentTarget) onClose()
          }}
          /* z-100 clears the sticky header (z-50) and the floating controls. */
          className="fixed inset-0 z-[100] flex items-center justify-center sm:p-6 lg:p-8 bg-neutral-900/70 backdrop-blur-md"
        >
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
            data-surface="dark"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            /* Full-bleed sheet below sm; capped and centred above it. dvh keeps
               it inside the visual viewport when the mobile keyboard is up, and
               the panel scrolls internally rather than the page. */
            className="w-full h-full sm:h-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[100dvh] sm:max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain rounded-none sm:rounded-2xl md:rounded-[28px] bg-neutral-900 sm:border sm:border-neutral-800 p-6 sm:p-10 md:p-12 lg:p-14 focus:outline-none"
          >
            <div className="relative mb-8 lg:mb-10">
              {/* Right padding reserves the close button's column so the headline can
                  never grow into it, however wide "heading" text gets to be. The
                  button is taken out of flow (absolute) rather than sized to shrink,
                  so overlap is structurally impossible rather than just unlikely. */}
              <div className="pr-16 sm:pr-20 lg:pr-24">
                <h2
                  id="contact-title"
                  className="text-[clamp(32px,6vw,84px)] font-bold uppercase tracking-tight leading-[0.9] text-neutral-100 break-words"
                >
                  {content.contact.heading}
                </h2>
                <p className="text-neutral-400 text-base lg:text-lg mt-3">{content.contact.subheading}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-0 right-0 flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors duration-300 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {status === 'success' ? (
              <div className="py-12 lg:py-16 text-center">
                <div className="mx-auto mb-6 flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-neutral-100 text-neutral-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <p className="text-neutral-100 font-bold text-2xl lg:text-3xl">Message sent</p>
                <p className="text-neutral-400 text-base lg:text-lg mt-2">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-8 rounded-full bg-neutral-100 text-neutral-900 font-semibold text-lg px-8 py-4 hover:bg-neutral-300 transition-colors duration-300 cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 lg:gap-6" noValidate>
                {/* honeypot */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label htmlFor="cf-name" className={LABEL}>
                    {content.contact.nameLabel}
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={content.contact.namePlaceholder}
                    className={FIELD}
                  />
                </div>

                <div>
                  <label htmlFor="cf-email" className={LABEL}>
                    {content.contact.emailLabel}
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={content.contact.emailPlaceholder}
                    className={FIELD}
                  />
                </div>

                <div>
                  <label htmlFor="cf-message" className={LABEL}>
                    {content.contact.messageLabel}
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    required
                    rows={4}
                    placeholder={content.contact.messagePlaceholder}
                    className={`${FIELD} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-2 rounded-full bg-neutral-100 text-neutral-900 font-semibold text-lg lg:text-xl py-4 lg:py-5 hover:bg-neutral-300 transition-colors duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending…' : content.contact.submitLabel}
                </button>

                {status === 'error' && (
                  <p className="text-red-400 text-base text-center" role="alert">
                    {error}
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
