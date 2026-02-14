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
      backgroundColor: '#0b1120', color: 'white', minHeight: '100vh', width: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      fontFamily: 'sans-serif', overflowX: 'hidden', position: 'relative'
    }}>
      
      <nav style={{
        width: '100%', maxWidth: '1200px', padding: '20px 40px', display: 'flex', 
        justifyContent: 'space-between', alignItems: 'center', zIndex: 100
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 15px',
          borderRadius: '10px', border: '1px solid rgba(34, 211, 238, 0.3)', backgroundColor: 'rgba(34, 211, 238, 0.05)'
        }}>
          <Cpu size={18} color="#22d3ee" />
          <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>DANIEL DINIZ</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <button 
            onClick={openChat}
            className="chatbot-trigger"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(34, 211, 238, 0.15)',
              padding: '10px 20px', borderRadius: '12px', border: '1px solid #22d3ee',
              color: '#22d3ee', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s'
            }}
          >
            <Bot size={18} className="animate-pulse" />
            <span style={{ fontSize: '13px' }}>CONSULTOR IA</span>
          </button>
        </div>
      </nav>

      <div className="neural-network"></div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1250px', width: '100%', padding: '60px 40px' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          
          <div style={{ flex: '1', minWidth: '350px', textAlign: 'left' }}>
            <div style={{ color: '#22d3ee', fontSize: '11px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#22d3ee', borderRadius: '50%' }} className="animate-ping"></span>
              IA DISPONÍVEL AGORA
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '25px' }}>
              SOLUÇÕES QUE <br />
              <span className="sains-text">ESCALAM NEGÓCIOS</span>
            </h1>
            
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '500px', lineHeight: '1.6', marginBottom: '40px' }}>
              Desenvolvedor Full Stack especializado em Python, APIs, Sites Web e Automações inteligentes.
            </p>

            <a href="https://wa.me/5519992278928" target="_blank" className="btn-glow">
              SOLICITAR PROJETO <ArrowRight size={20} />
            </a>
          </div>

          <div style={{ flex: '1', minWidth: '350px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <SkillBox title="Backend" items={["Python (APIs)", "Flask/Django", "JSON Data"]} />
            <SkillBox title="Desenvolvimento" items={["Next.js", "React Native", "Websites"]} />
            <SkillBox title="Cloud" items={["Vercel/Render", "Git/Gitflow", "AWS Noções"]} />
            <SkillBox title="Engenharia" items={["Automações", "Arquitetura", "SaaS Models"]} />
          </div>
        </div>

        <h2 style={{ textAlign: 'left', marginTop: '100px', marginBottom: '40px', fontSize: '2rem' }}>PROJETOS <span style={{color: '#22d3ee'}}>RECENTES</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          <ProjectCard title="TI Saúde" img="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80" tag="Sistemas" url="https://ti-saude-frontend.vercel.app" />
          <ProjectCard title="Plataforma de Vendas" img="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80" tag="SaaS / IA" url="https://meu-sistema-vendas.vercel.app" />
          <ProjectCard title="Plataforma Actus" img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80" tag="Turismo & Comércio" url="https://prototipo-actus.vercel.app" />
        </div>
      </div>

      <ChatBot />

      <style>{`
        .sains-text {
          background: linear-gradient(90deg, #22d3ee, #3b82f6, #a855f7, #f472b6, #22d3ee);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-fill-color: transparent;
          -webkit-background-clip: text;
          animation: colorShift 5s linear infinite;
        }
        @keyframes colorShift { to { background-position: 300% center; } }
        .neural-network {
          position: absolute; inset: 0; opacity: 0.15;
          background-image: radial-gradient(#22d3ee 1.2px, transparent 1.2px);
          background-size: 50px 50px;
          animation: networkFloat 20s linear infinite;
          z-index: 1;
        }
        @keyframes networkFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
        .btn-glow {
          display: inline-flex; align-items: center; gap: 12px;
          background-color: #22d3ee; color: #020817; padding: 18px 35px;
          border-radius: 12px; font-weight: 900; text-decoration: none;
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.4); transition: 0.3s;
        }
        .btn-glow:hover { transform: translateY(-3px); background-color: white; color: #020817; }
        .chatbot-trigger:hover { background-color: #22d3ee !important; color: #0b1120 !important; }
        .animate-ping { animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        .animate-pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </main>
  )
}

function SkillBox({ title, items }: any) {
  return (
    <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '25px', borderRadius: '15px', textAlign: 'left' }}>
      <h3 style={{ fontSize: '0.9rem', color: '#22d3ee', marginBottom: '15px', fontWeight: 'bold' }}>{title}</h3>
      {items.map((item: any) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
          <CheckCircle2 size={12} color="#22d3ee" /> {item}
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ title, img, tag, url }: any) {
  return (
    <div style={{ borderRadius: '20px', overflow: 'hidden', backgroundColor: '#1e293b', textAlign: 'left', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
      <img src={img} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <div style={{ padding: '25px', flex: 1 }}>
        <span style={{ fontSize: '10px', color: '#22d3ee', fontWeight: 'bold' }}>{tag}</span>
        <h3 style={{ fontSize: '1.2rem', marginTop: '8px', fontWeight: 'bold', marginBottom: '20px' }}>{title}</h3>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', borderBottom: '1px solid #22d3ee', paddingBottom: '2px' }}>
          VER PROJETO <Rocket size={14} />
        </a>
      </div>
    </div>
  )
            }
                     
