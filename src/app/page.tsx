'use client'

export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from 'react'
import { ArrowRight, Cpu, Bot, Globe, Zap, Layout, User, MessageSquare, Languages } from 'lucide-react'
import ChatBot from '@/components/ChatBot'
import { createClient } from '@supabase/supabase-js'

// --- DICIONÁRIO DE TRADUÇÃO ---
const translations = {
  pt: {
    navServices: 'Serviços',
    navPortfolio: 'Portfólio',
    navOrder: 'Pedir Orçamento',
    heroBadge: '🚀 Plataforma de Soluções Tech',
    heroTitle: 'Contrate soluções de {span} sob medida.',
    heroSubtitle: 'Desenvolvedor Full Stack especializado em Web3, Automações Inteligentes e Landing Pages.',
    heroPlaceholder: 'Seu melhor e-mail...',
    heroCta: 'Solicitar Orçamento',
    heroStats: 'Junte-se a +150 clientes que automatizaram seus negócios.',
    servicesTitle: 'O que eu posso construir para você',
    service1: 'Chatbots Inteligentes',
    service1Desc: 'Agentes de IA que vendem por você 24h no WhatsApp e Web.',
    service2: 'Landing Pages High-End',
    service2Desc: 'Páginas de vendas focadas em conversão com design moderno.',
    service3: 'SaaS & Web3',
    service3Desc: 'Sistemas escaláveis e integração com Blockchain/Tokens.',
    service4: 'Automação de Processos',
    service4Desc: 'Integração de sistemas via n8n para economizar seu tempo.',
    aboutTitle: 'Daniel Diniz',
    aboutRole: 'Software Engineer & Founder',
    aboutText: 'Especialista em transformar café em sistemas eficientes. Com foco em Web3 e IA, minha missão é criar ferramentas que tragam lucro real.',
    aboutStats1: '<b>100%</b> Sucesso nos Testes',
    aboutStats2: '<b>+20</b> Projetos Entregues',
    portfolioTitle: 'Portfólio de Elite',
    explore: 'Explorar Projeto',
    footerLoc: 'Santa Rita do Passa Quatro/SP',
    alertLead: 'Show Daniel! O e-mail {email} foi registrado. Bora fechar no Zap!'
  },
  en: {
    navServices: 'Services',
    navPortfolio: 'Portfolio',
    navOrder: 'Get a Quote',
    heroBadge: '🚀 Tech Solutions Platform',
    heroTitle: 'Hire custom {span} solutions.',
    heroSubtitle: 'Full Stack Developer specialized in Web3, AI Automation, and High-Conversion Landing Pages.',
    heroPlaceholder: 'Your best email...',
    heroCta: 'Request a Quote',
    heroStats: 'Join +150 clients who automated their business.',
    servicesTitle: 'What I can build for you',
    service1: 'Intelligent Chatbots',
    service1Desc: 'AI agents that sell for you 24/7 on WhatsApp and Web.',
    service2: 'High-End Landing Pages',
    service2Desc: 'Sales pages focused on conversion with modern design.',
    service3: 'SaaS & Web3',
    service3Desc: 'Scalable systems and Blockchain/Token integration.',
    service4: 'Process Automation',
    service4Desc: 'System integration via n8n to save your time.',
    aboutTitle: 'Daniel Diniz',
    aboutRole: 'Software Engineer & Founder',
    aboutText: 'Specialist in turning coffee into efficient systems. Focused on Web3 and AI, my mission is to create tools that bring real profit.',
    aboutStats1: '<b>100%</b> Test Success Rate',
    aboutStats2: '<b>+20</b> Projects Delivered',
    portfolioTitle: 'Elite Portfolio',
    explore: 'Explore Project',
    footerLoc: 'Brazil-based | Global Delivery',
    alertLead: 'Great! The email {email} was registered. Let\'s talk on WhatsApp!'
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export default function Home() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt')
  const [projects, setProjects] = useState<any[]>([])
  const [email, setEmail] = useState('')

  const t = translations[lang]

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const fallback = [
      { title: 'Web3 Risk Monitor', img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500', tag: 'Blockchain', url: 'https://web3-risk-monitor.vercel.app/', description: 'Security monitoring and smart contract analysis.' },
      { title: 'IA Order System', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500', tag: 'Automation', url: 'https://devburger-premium.vercel.app/', description: 'Automatic sales via WhatsApp with integrated AI.' }
    ]
    if (!supabase) { setProjects(fallback); return; }
    try {
      const { data } = await supabase.from('projects').select('*')
      setProjects(data?.length ? data : fallback)
    } catch { setProjects(fallback) }
  }

  const handleLeadCapture = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.alertLead.replace('{email}', email));
    window.open(`https://wa.me/5519992278928?text=Lead from Website (${email}) - Language: ${lang.toUpperCase()}`, '_blank');
  };

  return (
    <main style={main}>
      {/* NAVBAR */}
      <nav style={nav}>
        <div style={logo}><Cpu size={22} color="#22d3ee" /> AGÊNCIA <span style={{color: '#22d3ee'}}>IA</span> DINIZ</div>
        
        <div style={navLinks}>
          <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} style={langBtn}>
            <Languages size={16} /> {lang.toUpperCase()}
          </button>
          <a href="#servicos" style={link}>{t.navServices}</a>
          <button style={btnSmall} onClick={() => window.location.href='#orcamento'}>{t.navOrder}</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={hero}>
        <span style={badge}>{t.heroBadge}</span>
        <h1 style={mainTitle}>
            {lang === 'pt' ? 'Contrate soluções de ' : 'Hire custom '}
            <span style={{color: '#22d3ee'}}>IA & Web3</span>
            {lang === 'pt' ? ' sob medida.' : ' solutions.'}
        </h1>
        <p style={subtitle}>{t.heroSubtitle}</p>

        <form onSubmit={handleLeadCapture} style={formHero} id="orcamento">
          <input type="email" placeholder={t.heroPlaceholder} style={input} required value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" style={cta}>{t.heroCta} <ArrowRight size={18} /></button>
        </form>
        <p style={{fontSize: 12, opacity: 0.5, marginTop: 15}}>{t.heroStats}</p>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" style={section}>
        <h2 style={sectionTitle}>{t.servicesTitle}</h2>
        <div style={servicesGrid}>
          <div style={serviceCard}><Bot size={32} color="#22d3ee" /><h3>{t.service1}</h3><p>{t.service1Desc}</p></div>
          <div style={serviceCard}><Layout size={32} color="#22d3ee" /><h3>{t.service2}</h3><p>{t.service2Desc}</p></div>
          <div style={serviceCard}><Globe size={32} color="#22d3ee" /><h3>{t.service3}</h3><p>{t.service3Desc}</p></div>
          <div style={serviceCard}><Zap size={32} color="#22d3ee" /><h3>{t.service4}</h3><p>{t.service4Desc}</p></div>
        </div>
      </section>

      {/* SOBRE */}
      <section style={aboutSection}>
        <div style={aboutContent}>
          <div style={profileCircle}><User size={80} color="#22d3ee" /></div>
          <div style={{textAlign: 'left'}}>
            <h2>{t.aboutTitle}</h2>
            <p style={{color: '#22d3ee', fontWeight: 'bold'}}>{t.aboutRole}</p>
            <p style={{maxWidth: 500, opacity: 0.8}}>{t.aboutText}</p>
            <div style={statsLine}>
              <span dangerouslySetInnerHTML={{__html: t.aboutStats1}}></span>
              <span dangerouslySetInnerHTML={{__html: t.aboutStats2}}></span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" style={section}>
        <h2 style={sectionTitle}>{t.portfolioTitle}</h2>
        <div style={grid}>
          {projects.map((p) => (
            <div key={p.title} style={card}>
              <div style={cardImgContainer}><img src={p.img} style={img} /><span style={cardTag}>{p.tag}</span></div>
              <div style={{ padding: 20, textAlign: 'left' }}>
                <h3 style={{marginBottom: 10}}>{p.title}</h3>
                <p style={desc}>{p.description}</p>
                <a href={p.url} target="_blank" style={projectLink}>{t.explore} <MessageSquare size={14} /></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={footer}>
        <p>© 2026 Agência IA Diniz - {t.footerLoc}</p>
      </footer>
      <ChatBot />
    </main>
  )
}

// --- ESTILOS ADICIONAIS/MODIFICADOS ---
const main: React.CSSProperties = { background: '#020617', color: 'white', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }
const nav: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 5%', borderBottom: '1px solid rgba(255,255,255,0.05)' }
const navLinks: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '20px' }
const langBtn: React.CSSProperties = { background: 'rgba(255,255,255,0.05)', border: '1px solid #1e293b', color: 'white', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }
const link: React.CSSProperties = { color: '#ccc', textDecoration: 'none', fontSize: '14px' }
const logo: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 10, fontWeight: 'bold', letterSpacing: '1px' }
const hero: React.CSSProperties = { textAlign: 'center', padding: '100px 5% 60px', background: 'radial-gradient(circle at top, #0f172a 0%, #020617 100%)' }
const badge: React.CSSProperties = { background: 'rgba(34, 211, 238, 0.1)', color: '#22d3ee', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px', display: 'inline-block' }
const mainTitle: React.CSSProperties = { fontSize: '3.5rem', fontWeight: 800, maxWidth: '900px', margin: '0 auto 20px', lineHeight: '1.1' }
const subtitle: React.CSSProperties = { fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 40px' }
const formHero: React.CSSProperties = { display: 'flex', justifyContent: 'center', gap: '10px', maxWidth: '500px', margin: '0 auto' }
const input: React.CSSProperties = { flex: 1, padding: '15px 20px', borderRadius: '10px', border: '1px solid #1e293b', background: '#0f172a', color: 'white', outline: 'none' }
const cta: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 8, background: '#22d3ee', padding: '15px 25px', borderRadius: 10, color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }
const section: React.CSSProperties = { padding: '80px 5%', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }
const sectionTitle: React.CSSProperties = { fontSize: '2rem', marginBottom: '40px' }
const servicesGrid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }
const serviceCard: React.CSSProperties = { padding: '40px 20px', background: '#0f172a', borderRadius: '15px', border: '1px solid #1e293b', textAlign: 'left' }
const aboutSection: React.CSSProperties = { background: '#0f172a', padding: '60px 5%', display: 'flex', justifyContent: 'center' }
const aboutContent: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '40px', maxWidth: '900px', flexWrap: 'wrap' }
const profileCircle: React.CSSProperties = { width: '150px', height: '150px', borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #22d3ee' }
const statsLine: React.CSSProperties = { marginTop: '20px', display: 'flex', gap: '20px', fontSize: '14px' }
const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }
const card: React.CSSProperties = { background: '#0f172a', borderRadius: '15px', overflow: 'hidden', border: '1px solid #1e293b' }
const cardImgContainer: React.CSSProperties = { position: 'relative', height: '200px' }
const cardTag: React.CSSProperties = { position: 'absolute', top: '15px', left: '15px', background: '#22d3ee', color: '#000', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }
const img: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover' }
const desc: React.CSSProperties = { fontSize: '14px', color: '#94a3b8', marginBottom: '20px', height: '40px', overflow: 'hidden' }
const projectLink: React.CSSProperties = { color: '#22d3ee', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: 5 }
const btnSmall: React.CSSProperties = { background: 'transparent', border: '1px solid #22d3ee', color: '#22d3ee', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }
const footer: React.CSSProperties = { textAlign: 'center', padding: '40px', borderTop: '1px solid #1e293b', color: '#94a3b8' }
                  
