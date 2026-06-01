'use client'

import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/* Clipped slide-up reveal — the same primitive Header/About use inline, packaged
   for reuse on the work + case-study pages. */
export function RevealText({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'span'
}) {
  const Wrapper = as === 'span' ? 'span' : 'div'
  const MotionInner = as === 'span' ? motion.span : motion.div
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
