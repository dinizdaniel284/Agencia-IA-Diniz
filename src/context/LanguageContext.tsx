'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface LanguageContextType {
  locale: 'pt' | 'en'
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'pt',
  toggleLocale: () => {},
})

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocale] = useState<'pt' | 'en'>('pt')

  const toggleLocale = () => {
    setLocale(prev => (prev === 'pt' ? 'en' : 'pt'))
  }

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook para usar facilmente
export function useLanguage() {
  return useContext(LanguageContext)
}
