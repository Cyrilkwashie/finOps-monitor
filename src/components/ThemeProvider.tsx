'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext<{ dark: boolean; toggle: () => void }>({
  dark: false,
  toggle: () => {},
})

export function ThemeLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('prox_theme')
    if (stored === 'dark') setDark(true)
  }, [])

  function toggle() {
    setDark(prev => {
      const next = !prev
      localStorage.setItem('prox_theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <div className={`${dark ? 'dark ' : ''}${className ?? ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
