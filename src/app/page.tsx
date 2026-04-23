'use client'

export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from 'react'
import { ArrowRight, Cpu, Bot, Globe, Zap, Layout, User, MessageSquare, Languages, Lock } from 'lucide-react'
import ChatBot from '@/components/ChatBot'
import { createClient } from '@supabase/supabase-js'

// --- DICIONÁRIO DE TRADUÇÃO ---
const translations = {
  pt: {
    navServices: 'Serviços',
    navOrder: 'Entrar',
    heroBadge: '🚀 Plataforma de Soluções Tech',
    heroTitle: 'Contrate soluções de {span} sob medida.',
    heroSubtitle: 'Desenvolvedor Full Stack especializado em Web3, Automações e Landing Pages.',
    heroPlaceholder: 'Seu e-mail...',
    heroCta: 'Solicitar Orçamento',
    heroStats: 'Junte-se a +150 clientes.',
    historyBadge: 'Minha Trajetória',
    historyTitle: 'Da operação de máquinas ao código de elite',
    historyDesc: 'Minha história começou no campo, operando máquinas pesadas. Hoje, aplico essa mesma disciplina para construir arquiteturas de software robustas e soluções em Blockchain.',
    portfolioTitle: 'Portfólio de Elite',
    explore: 'Explorar',
    alertLead: 'Show Daniel! O e-mail {email} foi registrado!'
  },
  en: {
    navServices: 'Services',
    navOrder: 'Login',
    heroBadge: '🚀 Tech Solutions Platform',
    heroTitle: 'Hire custom {span} solutions.',
    heroSubtitle: 'Full Stack Developer specialized in Web3, Automation, and Landing Pages.',
    heroPlaceholder: 'Your email...',
    heroCta: 'Get a Quote',
    heroStats: 'Join +150 happy clients.',
    historyBadge: 'My Journey',
    historyTitle: 'From machinery to elite coding',
    historyDesc: 'My story started in the fields, operating heavy machinery. Today, I apply that same discipline to build robust software architectures and Blockchain solutions.',
    portfolioTitle: 'Elite Portfolio',
    explore: 'Explore',
    alertLead: 'Great! {email} has been registered!'
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export default function Home() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt')
  const [email, setEmail] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const t = translations[lang]

  // Check para Mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLeadCapture = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.alertLead.replace('{email}', email));
    window.open(`https://wa.me/5519992278928?text=Olá Daniel! (${email})`, '_blank');
  };

  return (
    <main style={main}>
      
      {/* NAVBAR */}
      <nav style={{...nav, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 15 : 0}}>
        <div style={logo}><Cpu size={22} color="#22d3ee" /> AGÊNCIA <span style={{color: '#22d3ee'}}>IA</span> DINIZ</div>
        
        <div style={{...navLinks, gap: isMobile ? 10 : 20}}>
          <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} style={langBtn}>
            <Languages size={14} /> {lang.toUpperCase()}
          </button>
          {!isMobile && <a href="#servicos" style={link}>{t.navServices}</a>}
          <button style={btnSmall} onClick={() => alert('Sistema de Login em breve!')}>
            <Lock size={14} /> {t.navOrder}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{...hero, padding: isMobile ? '60px 20px' : '100px 5%'}}>
        <span style={badge}>{t.heroBadge}</span>
        <h1 style={{...mainTitle, fontSize: isMobile ? '2.2rem' : '3.5rem'}}>
            {lang === 'pt' ? 'Contrate soluções de ' : 'Hire custom '}
            <span style={{color: '#22d3ee'}}>IA & Web3</span>
            {lang === 'pt' ? ' sob medida.' : ' solutions.'}
        </h1>
        <p style={{...subtitle, fontSize: isMobile ? '1rem' : '1.2rem'}}>{t.heroSubtitle}</p>

        <form onSubmit={handleLeadCapture} style={{...formHero, flexDirection: isMobile ? 'column' : 'row'}}>
          <input type="email" placeholder={t.heroPlaceholder} style={input} required value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" style={cta}>{t.heroCta} <ArrowRight size={18} /></button>
        </form>
        <p style={{fontSize: 12, opacity: 0.5, marginTop: 15}}>{t.heroStats}</p>
      </section>

      {/* HISTÓRIA (NOVA SESSÃO) */}
      <section style={{...historySection, padding: isMobile ? '40px 20px' : '80px 5%'}}>
        <div style={{...historyContent, flexDirection: isMobile ? 'column' : 'row'}}>
            <div style={profileCircle}>
                <User size={isMobile ? 50 : 80} color="#22d3ee" />
            </div>
            <div style={{textAlign: isMobile ? 'center' : 'left', flex: 1}}>
                <span style={badge}>{t.historyBadge}</span>
                <h2 style={{fontSize: isMobile ? '1.8rem' : '2.2rem', margin: '10px 0'}}>{t.historyTitle}</h2>
                <p style={{opacity: 0.8, lineHeight: '1.6', maxWidth: 600}}>{t.historyDesc}</p>
                <div style={{...statsLine, justifyContent: isMobile ? 'center' : 'flex-start'}}>
                    <span style={milestone}><b>2026</b> Agência IA</span>
                    <span style={milestone}><b>Web3</b> Expert</span>
                </div>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={footer}>
        <p>© 2026 Agência IA Diniz</p>
      </footer>

      <ChatBot />
    </main>
  )
}

// --- ESTILOS COM CORREÇÕES MOBILE ---
const main: React.CSSProperties = { background: '#020617', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' }
const nav: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 5%', borderBottom: '1px solid rgba(255,255,255,0.05)' }
const navLinks: React.CSSProperties = { display: 'flex', alignItems: 'center' }
const langBtn: React.CSSProperties = { background: '#1e293b', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: '12px' }
const link: React.CSSProperties = { color: '#ccc', textDecoration: 'none', fontSize: '14px' }
const logo: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 10, fontWeight: 'bold' }
const hero: React.CSSProperties = { textAlign: 'center', background: 'radial-gradient(circle at top, #0f172a 0%, #020617 100%)' }
const badge: React.CSSProperties = { background: 'rgba(34, 211, 238, 0.1)', color: '#22d3ee', padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block', marginBottom: 15 }
const mainTitle: React.CSSProperties = { fontWeight: 800, maxWidth: '800px', margin: '0 auto 20px', lineHeight: '1.2' }
const subtitle: React.CSSProperties = { color: '#94a3b8', maxWidth: '600px', margin: '0 auto 30px' }
const formHero: React.CSSProperties = { display: 'flex', gap: '10px', maxWidth: '500px', margin: '0 auto' }
const input: React.CSSProperties = { flex: 1, padding: '15px', borderRadius: '10px', border: '1px solid #1e293b', background: '#0f172a', color: 'white' }
const cta: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#22d3ee', padding: '15px 20px', borderRadius: 10, color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }
const historySection: React.CSSProperties = { background: '#0f172a', display: 'flex', justifyContent: 'center' }
const historyContent: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '40px', maxWidth: '1000px' }
const profileCircle: React.CSSProperties = { width: '120px', height: '120px', borderRadius: '50%', border: '3px solid #22d3ee', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
const statsLine: React.CSSProperties = { marginTop: '20px', display: 'flex', gap: '15px' }
const milestone: React.CSSProperties = { fontSize: '12px', background: '#1e293b', padding: '5px 10px', borderRadius: '5px' }
const btnSmall: React.CSSProperties = { background: 'transparent', border: '1px solid #22d3ee', color: '#22d3ee', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 5 }
const footer: React.CSSProperties = { textAlign: 'center', padding: '30px', opacity: 0.5, fontSize: '12px' }
  
