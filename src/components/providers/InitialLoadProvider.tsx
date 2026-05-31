'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const InitialLoadContext = createContext<{ isInitialLoad: boolean }>({
  isInitialLoad: true,
})

export function InitialLoadProvider({ children }: { children: React.ReactNode }) {
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsInitialLoad(false), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <InitialLoadContext.Provider value={{ isInitialLoad }}>
      {children}
    </InitialLoadContext.Provider>
  )
}

export function useInitialLoad() {
  return useContext(InitialLoadContext)
}
