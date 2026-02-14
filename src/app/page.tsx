'use client'

import React, { useEffect, useState } from 'react'
import { ArrowRight, Cpu, Rocket, CheckCircle2, Bot } from 'lucide-react'
import ChatBot from '@/components/ChatBot'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const openChat = () => {
    window.dispatchEvent(new Event('open-daniel-chat'));
  };

  if (!mounted) return null;

  return (
    <main style={{
      backgroundColor: '#020617', // Azul quase preto, muito mais luxuoso
      color: 'white', minHeight: '100vh', width: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      fontFamily: 'sans-serif', overflowX: 'hidden', position: 'relative',
    }}>
      
      {/* Efeito de Luz de Fundo (Luxo e 0% peso) */}
      <div style={{
        position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
        width: '100%', height: '600px',
        background: 'radial-gradient(circle at 50% -20%, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
        zIndex: 1, pointerEvents: 'none'
      }}></div>

      <nav style={{
        width: '100%', maxWidth: '1200px', padding: '20px 40px', display: 'flex', 
        justifyContent: 'space-between', alignItems: 'center', zIndex: 100
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 15px',
          borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.03)'
        }}>
          <Cpu size={18} color="#22d3ee" />
          <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px' }}>DANIEL DINIZ</span>
        </div>
        
        <button 
          onClick={openChat}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'white',
            padding: '10px 20px', borderRadius: '12px', border: 'none',
            color: '#020617', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s'
          }}
        >
          <Bot size={18} />
          <span style={{ fontSize: '13px' }}>CONSULTOR IA</span>
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1250px', width: '100%', padding: '60px 40px' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          
          <div style={{ flex: '1', minWidth: '320px', textAlign: 'left' }}>
            <div style={{ color: '#22d3ee', fontSize: '11px', fontWeight: '900', marginBottom: '15px', letterSpacing: '2px' }}>
              AGÊNCIA DE INTELIGÊNCIA ARTIFICIAL
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '900', lineHeight: '1', marginBottom: '25px', letterSpacing: '-2px' }}>
              SOLUÇÕES QUE <br />
              <span className="sains-text">ESCALAM NEGÓCIOS</span>
            </h1>
            
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '500px', lineHeight: '1.6', marginBottom: '40px' }}>
              Desenvolvedor Full Stack especializado em Python, APIs e Automações que transformam empresas.
            </p>

            <a href="https://wa.me/5519992278928" target="_blank" className="btn-premium">
              SOLICITAR PROJETO <ArrowRight size={20} />
            </a>
          </div>

          <div style={{ flex: '1', minWidth: '320px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <SkillBox title="Backend" items={["Python (APIs)", "Flask/Django"]} />
            <SkillBox title="Desenvolvimento" items={["Next.js", "React Native"]} />
            <SkillBox title="Cloud" items={["Vercel", "AWS"]} />
            <SkillBox title="Engenharia" items={["Automações", "SaaS"]} />
          </div>
        </div>

        <h2 style={{ textAlign: 'left', marginTop: '100px', marginBottom: '40px', fontSize: '2rem', fontWeight: '900' }}>
          PROJETOS <span style={{color: '#22d3ee'}}>SELECIONADOS</span>
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          <ProjectCard title="TI Saúde" img="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80" tag="Sistemas" url="https://ti-saude-frontend.vercel.app" />
          <ProjectCard title="Plataforma de Vendas" img="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80" tag="SaaS / IA" url="https://meu-sistema-vendas.vercel.app" />
          <ProjectCard title="Plataforma Actus" img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80" tag="Turismo & Comércio" url="https://prototipo-actus.vercel.app" />
        </div>
      </div>

      <ChatBot />

      <style>{`
        .sains-text {
          background: linear-gradient(90deg, #fff, #22d3ee, #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s linear infinite;
        }
        @keyframes shine { to { background-position: 200% center; } }
        
        .btn-premium {
          display: inline-flex; align-items: center; gap: 12px;
          background-color: #fff; color: #020617; padding: 18px 35px;
          border-radius: 14px; font-weight: 900; text-decoration: none;
          transition: 0.3s;
        }
        .btn-premium:hover { transform: scale(1.02); }
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
          VER PROJETO
        </a>
      </div>
    </div>
  )
              }
            
