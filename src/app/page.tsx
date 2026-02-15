'use client'

import React, { useEffect, useState } from 'react'
import { ArrowRight, Cpu, Bot, CheckCircle2 } from 'lucide-react'
import ChatBot from '@/components/ChatBot'
import { useLanguage } from '@/context/LanguageContext'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { locale, toggleLocale } = useLanguage()

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null;

  const openChat = () => { window.dispatchEvent(new Event('open-daniel-chat')); }

  // Textos PT / EN
  const texts = {
    agency: locale === 'pt' ? 'AGÊNCIA DE INTELIGÊNCIA ARTIFICIAL' : 'AI AGENCY',
    title: locale === 'pt' ? 'SOLUÇÕES QUE ESCALAM NEGÓCIOS' : 'SOLUTIONS THAT SCALE BUSINESSES',
    description: locale === 'pt' ? 'Desenvolvedor Full Stack especializado em Python, APIs e Automações que transformam empresas.' :
      'Full Stack Developer specialized in Python, APIs, and Automations that transform businesses.',
    btnProject: locale === 'pt' ? 'SOLICITAR PROJETO' : 'REQUEST PROJECT',
    projectsTitle: locale === 'pt' ? 'PROJETOS SELECIONADOS' : 'SELECTED PROJECTS',
  }

  return (
    <main style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'sans-serif', overflowX: 'hidden', position: 'relative' }}>
      
      {/* Efeito de Luz */}
      <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', height: '600px', background: 'radial-gradient(circle at 50% -20%, rgba(34, 211, 238, 0.15) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none' }}></div>

      {/* NAV */}
      <nav style={{ width: '100%', maxWidth: '1200px', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 15px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
          <Cpu size={18} color="#22d3ee" />
          <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px' }}>DANIEL DINIZ</span>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={openChat} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', padding: '10px 20px', borderRadius: '12px', border: 'none', color: '#020617', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>
            <Bot size={18} />
            <span style={{ fontSize: '13px' }}>{locale === 'pt' ? 'CONSULTOR IA' : 'AI CONSULTANT'}</span>
          </button>

          <button onClick={toggleLocale} style={{ padding: '10px 18px', borderRadius: '12px', backgroundColor: '#22d3ee', color: '#020617', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 15px #22d3ee', animation: 'pulse 2s infinite', transition: 'all 0.3s' }}>
            {locale === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>
      </nav>

      {/* CONTEÚDO */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1250px', width: '100%', padding: '60px 40px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: '1', minWidth: '320px', textAlign: 'left' }}>
            <div style={{ color: '#22d3ee', fontSize: '11px', fontWeight: '900', marginBottom: '15px', letterSpacing: '2px' }}>{texts.agency}</div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '900', lineHeight: '1', marginBottom: '25px', letterSpacing: '-2px' }}>
              {texts.title}
            </h1>
            
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '500px', lineHeight: '1.6', marginBottom: '40px' }}>
              {texts.description}
            </p>

            <a href="https://wa.me/5519992278928" target="_blank" className="btn-premium">
              {texts.btnProject} <ArrowRight size={20} />
            </a>
          </div>

          {/* SKILL BOX */}
          <div style={{ flex: '1', minWidth: '320px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <SkillBox title={locale === 'pt' ? "Programação & Dev" : "Programming & Dev"} items={locale === 'pt' ? ["Python & APIs", "React & Next.js", "Tailwind CSS", "MongoDB"] : ["Python & APIs", "React & Next.js", "Tailwind CSS", "MongoDB"]} />
            <SkillBox title={locale === 'pt' ? "Dados & Ferramentas" : "Data & Tools"} items={locale === 'pt' ? ["Power BI & Dashboards", "Excel Avançado", "Jira & Trello", "Lucidchart"] : ["Power BI & Dashboards", "Advanced Excel", "Jira & Trello", "Lucidchart"]} />
            <SkillBox title={locale === 'pt' ? "Infra & Cloud" : "Infra & Cloud"} items={locale === 'pt' ? ["Vercel & Render", "Supabase", "Cisco Packet Tracer", "Automação de Tarefas"] : ["Vercel & Render", "Supabase", "Cisco Packet Tracer", "Task Automation"]} />
            <SkillBox title={locale === 'pt' ? "Engenharia & IA" : "Engineering & AI"} items={locale === 'pt' ? ["Scrum (Sprints/PO)", "Arquitetura de Sistemas", "Chatbots (OpenAI/Gemini)", "Full Stack Integration"] : ["Scrum (Sprints/PO)", "System Architecture", "Chatbots (OpenAI/Gemini)", "Full Stack Integration"]} />
          </div>
        </div>

        <h2 style={{ textAlign: 'left', marginTop: '100px', marginBottom: '40px', fontSize: '2rem', fontWeight: '900' }}>
          {texts.projectsTitle} <span style={{color: '#22d3ee'}}></span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          <ProjectCard title="TI Saúde" img="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80" tag={locale==='pt' ? "Sistemas" : "Systems"} url="https://ti-saude-frontend.vercel.app" />
          <ProjectCard title="Plataforma de Vendas" img="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80" tag={locale==='pt' ? "SaaS / IA" : "SaaS / AI"} url="https://meu-sistema-vendas.vercel.app" />
          <ProjectCard title="Plataforma Actus" img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80" tag={locale==='pt' ? "Turismo & Comércio" : "Tourism & Commerce"} url="https://prototipo-actus.vercel.app" />
        </div>
      </div>

      <ChatBot />

      <style>{`
        @keyframes pulse {0%,100% {box-shadow:0 0 15px #22d3ee;}50% {box-shadow:0 0 25px #22d3ee;}}
      `}</style>
    </main>
  )
}

function SkillBox({ title, items }: any) {
  return (
    <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
      <h3 style={{ fontSize: '0.8rem', color: '#22d3ee', marginBottom: '10px', fontWeight: '900', letterSpacing: '1px' }}>{title}</h3>
      {items.map((item: any) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
          <CheckCircle2 size={12} color="#22d3ee" /> {item}
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ title, img, tag, url }: any) {
  return (
    <div style={{ borderRadius: '24px', overflow: 'hidden', backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.05)' }}>
      <img src={img} alt={title} style={{ width: '100%', height: '180px', objectFit: 'cover', opacity: '0.8' }} />
      <div style={{ padding: '20px' }}>
        <span style={{ fontSize: '10px', color: '#22d3ee', fontWeight: 'bold', letterSpacing: '1px' }}>{tag}</span>
        <h3 style={{ fontSize: '1.1rem', marginTop: '5px', fontWeight: 'bold', marginBottom: '15px' }}>{title}</h3>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', borderBottom: '1px solid #22d3ee' }}>
          {locale==='pt' ? 'VER PROJETO' : 'VIEW PROJECT'}
        </a>
      </div>
    </div>
  )
            }
