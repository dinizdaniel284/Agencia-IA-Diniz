'use client'

export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from 'react'
import { ArrowRight, Cpu, User, Languages, Lock, Globe, Bot, Layout, Zap } from 'lucide-react'
import ChatBot from '@/components/ChatBot'
import { createClient } from '@supabase/supabase-js'

const translations = {
  pt: {
    navServices: 'Serviços',
    navOrder: 'Entrar',
    heroBadge: '?? Plataforma de Soluções Tech',
    heroTitle: 'Contrate soluções de {span} sob medida.',
    heroSubtitle: 'Desenvolvedor Full Stack especializado em Web3, Automações e Landing Pages.',
    heroPlaceholder: 'Seu melhor e-mail...',
    heroCta: 'Solicitar Orçamento',
    heroStats: 'Junte-se a +150 clientes.',
    servicesTitle: 'Nossas Soluções',
    service1: 'Web3 & Smart Contracts',
    service1Desc: 'Desenvolvimento de ecossistemas em Blockchain e monitoramento de riscos.',
    service2: 'Bots de IA & Automação',
    service2Desc: 'Agentes inteligentes para WhatsApp, CRM e processos automáticos.',
    service3: 'Landing Pages de Elite',
    service3Desc: 'Interfaces modernas, ultra rápidas e focadas em conversão.',
    service4: 'SaaS & White-label',
    service4Desc: 'Criação de plataformas completas sob medida para o seu negócio.',
    historyBadge: 'Minha Trajetória',
    historyTitle: 'Da operação de máquinas ao código de elite',
    historyDesc: 'Minha história começou no campo, operando máquinas pesadas. Hoje, aplico essa mesma disciplina para construir arquiteturas de software robustas.',
    alertLead: 'Show Daniel! O e-mail {email} foi registrado!',
    alertError: 'Ops! Erro ao registrar. Tente novamente.'
  },
  en: {
    navServices: 'Services',
    navOrder: 'Login',
    heroBadge: '?? Tech Solutions Platform',
    heroTitle: 'Hire custom {span} solutions.',
    heroSubtitle: 'Full Stack Developer specialized in Web3, Automation, and Landing Pages.',
    heroPlaceholder: 'Your best email...',
    heroCta: 'Get a Quote',
    heroStats: 'Join +150 happy clients.',
    servicesTitle: 'Our Solutions',
    service1: 'Web3 & Smart Contracts',
    service1Desc: 'Blockchain ecosystem development and risk monitoring.',
    service2: 'AI Bots & Automation',
    service2Desc: 'Intelligent agents for WhatsApp, CRM, and automated processes.',
    service3: 'Elite Landing Pages',
    service3Desc: 'Modern, ultra-fast interfaces focused on conversion.',
    service4: 'SaaS & White-label',
    service4Desc: 'Complete custom platforms built for your business.',
    historyBadge: 'My Journey',
    historyTitle: 'From machinery to elite coding',
    historyDesc: 'My story started in the fields, operating heavy machinery. Today, I apply that same discipline to build robust software architectures.',
    alertLead: 'Great! {email} has been registered!',
    alertError: 'Ops! Error registering. Please try again.'
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export default function Home() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt')
  const [email, setEmail] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (supabase) {
      const { error } = await supabase.from('leads').insert([{ email: email }]);
      if (error) {
        alert(t.alertError);
        setLoading(false);
        return;
      }
    }
    alert(t.alertLead.replace('{email}', email));
    window.open(`https://wa.me/5519992278928?text=Olá Daniel! Cadastro no site: ${email}`, '_blank');
    setEmail('');
    setLoading(false);
  };

  return (
    <main style={main}>
      <nav style={{...nav, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 15 : 0}}>
        <div style={logo}><Cpu size={22} color="#22d3ee" /> AGÊNCIA <span style={{color: '#22d3ee'}}>IA</span> DINIZ</div>
        <div style={{...navLinks, gap: isMobile ? 10 : 20}}>
          <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} style={langBtn}>
            <Languages size={14} /> {lang.toUpperCase()}
          </button>
          {!isMobile && <a href="#servicos" style={link}>{t.navServices}</a>}
          <button style={btnSmall} onClick={() => window.location.href = '/login'}>
            <Lock size={14} /> {t.navOrder}
          </button>
        </div>
      </nav>

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
          <button type="submit" style={{...cta, opacity: loading ? 0.7 : 1}} disabled={loading}>
            {loading ? '...' : t.heroCta} <ArrowRight size={18} />
          </button>
        </form>
      </section>

      <section id="servicos" style={{ padding: '60px 0', background: 'rgba(15, 23, 42, 0.3)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: isMobile ? '1.8rem' : '2.5rem' }}>
          {t.servicesTitle}
        </h2>
        <div style={carouselTrack}>
          {[
            { icon: <Globe color="#22d3ee" size={32} />, title: t.service1, desc: t.service1Desc },
            { icon: <Bot color="#22d3ee" size={32} />, title: t.service2, desc: t.service2Desc },
            { icon: <Layout color="#22d3ee" size={32} />, title: t.service3, desc: t.service3Desc },
            { icon: <Zap color="#22d3ee" size={32} />, title: t.service4, desc: t.service4Desc },
          ].map((s, i) => (
            <div key={i} style={serviceCard}>
              <div style={{ marginBottom: 15 }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={footer}><p>© 2026 Agência IA Diniz</p></footer>
    </main>
  )
}

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
const footer: React.CSSProperties = { textAlign: 'center', padding: '30px', opacity: 0.5, fontSize: '12px' }
const carouselTrack: React.CSSProperties = { display: 'flex', gap: '20px', padding: '10px 5%', overflowX: 'auto', scrollbarWidth: 'none' }
const serviceCard: React.CSSProperties = { minWidth: '280px', background: 'rgba(30, 41, 59, 0.5)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(34, 211, 238, 0.1)' }
const btnSmall: React.CSSProperties = { background: 'transparent', border: '1px solid #22d3ee', color: '#22d3ee', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 5 }
