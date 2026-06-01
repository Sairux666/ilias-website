'use client'

import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

type Tag = 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p'

/* Clipped slide-up reveal — the same primitive Header/About use inline, packaged
   for reuse on the work + case-study pages. `as` controls the tag of the inner
   (styled, animated, semantic) element so titles can be real headings; the
   outer clip wrapper stays a block container (or span for inline use). */
export function RevealText({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: Tag
}) {
  const Wrapper = as === 'span' ? 'span' : 'div'
  const MotionInner = motion[as] as React.ElementType
  return (
    <Wrapper className="block overflow-hidden">
      <MotionInner
        initial={{ y: '100%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1, delay, ease: EASE }}
        className={`block ${className ?? ''}`}
      >
        {children}
      </MotionInner>
    </Wrapper>
  )
}
