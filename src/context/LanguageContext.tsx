'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type LanguageContextType = {
  locale: 'pt' | 'en'
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'pt',
  toggleLocale: () => {}
})

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
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

export const useLanguage = () => useContext(LanguageContext)
