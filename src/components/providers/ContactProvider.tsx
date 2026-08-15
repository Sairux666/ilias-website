'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { ContactForm } from '@/components/contact/ContactForm'

type ContactContextValue = {
  open: boolean
  openContact: () => void
  closeContact: () => void
}

const ContactContext = createContext<ContactContextValue | null>(null)

/* Owns the contact modal so the header (rendered in the root layout) and the
   footer's physics buttons drive the same single instance. The form is rendered
   here rather than inside a section so it always sits above the sticky header. */
export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  // Whatever had focus when the modal opened, so focus can be returned on close.
  const triggerRef = useRef<HTMLElement | null>(null)

  const openContact = useCallback(() => {
    const active = document.activeElement
    triggerRef.current = active instanceof HTMLElement && active !== document.body ? active : null
    setOpen(true)
  }, [])

  const closeContact = useCallback(() => {
    setOpen(false)
    const trigger = triggerRef.current
    if (trigger) {
      // Defer past the unmount so the modal's focus trap can't reclaim it.
      setTimeout(() => trigger.focus(), 0)
    }
  }, [])

  return (
    <ContactContext.Provider value={{ open, openContact, closeContact }}>
      {children}
      <ContactForm open={open} onClose={closeContact} />
    </ContactContext.Provider>
  )
}

export function useContact() {
  const ctx = useContext(ContactContext)
  if (!ctx) throw new Error('useContact must be used within a ContactProvider')
  return ctx
}
