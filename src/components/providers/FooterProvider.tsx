'use client'

import { createContext, useContext, useRef } from 'react'

type FooterContextValue = { footerRef: React.RefObject<HTMLElement | null> }

const FooterContext = createContext<FooterContextValue | null>(null)

export function FooterProvider({ children }: { children: React.ReactNode }) {
  const footerRef = useRef<HTMLElement>(null)
  return (
    <FooterContext.Provider value={{ footerRef }}>
      {children}
    </FooterContext.Provider>
  )
}

export function useFooter() {
  const ctx = useContext(FooterContext)
  if (!ctx) throw new Error('useFooter must be used within a FooterProvider')
  return ctx
}
