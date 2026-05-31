'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function LoadingScreen() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // Lock scroll while the loader is on screen (~2.5s), matching the reference.
  useEffect(() => {
    const { overflow, height, position, width } = document.body.style
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    const t = setTimeout(() => {
      document.body.style.overflow = overflow
      document.body.style.height = height
      document.body.style.position = position
      document.body.style.width = width
    }, 2500)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = overflow
      document.body.style.height = height
      document.body.style.position = position
      document.body.style.width = width
    }
  }, [])

  // Tick 0 → 100, then hide.
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 10)
    if (count === 100) {
      clearInterval(id)
      setLoading(false)
    }
    return () => clearInterval(id)
  }, [count])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={loading ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 1 }}
      className="loading-screen fixed flex items-center justify-center inset-0 z-[999] bg-neutral-100 w-screen h-screen pointer-events-none"
    >
      <div className="overflow-hidden">
        <motion.p
          animate={loading ? {} : { y: '-100%' }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.7, 0, 0.84, 0] }}
          className="text-sm font-semibold tracking-tight"
        >
          {count}
        </motion.p>
      </div>
    </motion.div>
  )
}
