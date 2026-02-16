'use client'

// 1. Força o Next.js a não pré-renderizar estaticamente no build (evita erro de variáveis ausentes)
export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from 'react'
import { ArrowRight, Cpu, Bot, CheckCircle2 } from 'lucide-react'
import ChatBot from '@/components/ChatBot'
import { useLanguage } from '@/context/LanguageContext'
import { createClient } from '@supabase/supabase-js'
import dynamicImport from 'next/dynamic'

// --- AJUSTE PARA SILENCIAR ALERTAS ---
const MapContainer = dynamicImport(() => import('react-leaflet').then(mod => mod.MapContainer), { 
  ssr: false 
}) as React.ComponentType<any>;

const TileLayer = dynamicImport(() => import('react-leaflet').then(mod => mod.TileLayer), { 
  ssr: false 
}) as React.ComponentType<any>;

const Marker = dynamicImport(() => import('react-leaflet').then(mod => mod.Marker), { 
  ssr: false 
}) as React.ComponentType<any>;

const Popup = dynamicImport(() => import('react-leaflet').then(mod => mod.Popup), { 
  ssr: false 
}) as React.ComponentType<any>;

import 'leaflet/dist/leaflet.css'

// Supabase Client com Proteção contra Build Fail
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { locale, toggleLocale } = useLanguage()
  const [city, setCity] = useState('')
  const [nodes, setNodes] = useState<any[]>([])
  const [userNode, setUserNode] = useState<any | null>(null)
  const [filter, setFilter] = useState<'global' | 'local' | 'type'>('global')
  const [typeFilter, setTypeFilter] = useState<string>('All')

  const defaultCenter: [number, number] = [0, 0]

  useEffect(() => {
    setMounted(true)
    fetchNodes()

    const L = require('leaflet')
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })
  }, [])

  const openChat = () => {
    window.dispatchEvent(new Event('open-daniel-chat'))
  }

  const fetchNodes = async () => {
    // Só tenta buscar se a URL não for o placeholder
    if (supabaseUrl.includes('placeholder')) return
    
    const { data, error } = await supabase.from('digital_nodes').select('*')
    if (!error && data) setNodes(data)
  }

  const createNode = () => {
    if (!city) return
    if (typeof window !== 'undefined' && !navigator.geolocation) {
      alert('Geolocation not supported!')
      return
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const { data, error } = await supabase.from('digital_nodes').insert([
        { city, latitude, longitude, type: typeFilter },
      ])
      if (!error) {
        setUserNode({ city, latitude, longitude, type: typeFilter })
        fetchNodes()
      }
    })
  }

  const filteredNodes = nodes.filter(node => {
    if (filter === 'local') return userNode ? node.city === userNode.city : true
    if (filter === 'type') return typeFilter === 'All' ? true : node.type === typeFilter
    return true
  })

  const texts = {
    agency: locale === 'pt' ? 'AGÊNCIA DE INTELIGÊNCIA ARTIFICIAL' : 'AI AGENCY',
    title: locale === 'pt' ? 'SOLUÇÕES QUE ESCALAM NEGÓCIOS' : 'SOLUTIONS THAT SCALE BUSINESSES',
    description: locale === 'pt' ? 'Desenvolvedor Full Stack especializado em Python, APIs e Automações que transformam empresas.' : 'Full Stack Developer specialized in Python, APIs, and Automations that transform businesses.',
    btnProject: locale === 'pt' ? 'SOLICITAR PROJETO' : 'REQUEST PROJECT',
    projectsTitle: locale === 'pt' ? 'PROJETOS SELECIONADOS' : 'SELECTED PROJECTS',
    consultant: locale === 'pt' ? 'CONSULTOR IA' : 'AI CONSULTANT',
  }

  const projects = [
    { title: 'TI Saúde', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80', tag: locale === 'pt' ? 'Sistemas' : 'Systems', url: 'https://ti-saude-frontend.vercel.app' },
    { title: 'Plataforma de Vendas', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80', tag: locale === 'pt' ? 'SaaS / IA' : 'SaaS / AI', url: 'https://meu-sistema-vendas.vercel.app' },
    { title: 'Plataforma Actus', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80', tag: locale === 'pt' ? 'Turismo & Comércio' : 'Tourism & Commerce', url: 'https://prototipo-actus.vercel.app' },
  ]

  if (!mounted) return null

  return (
    <main style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'sans-serif', overflowX: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '600px', background: 'radial-gradient(circle at 50% -20%, rgba(34, 211, 238, 0.15) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none' }}></div>

      <nav style={{ width: '100%', maxWidth: '1200px', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <Cpu size={18} color="#22d3ee" />
          <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px' }}>DANIEL DINIZ</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={openChat} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', padding: '10px 20px', borderRadius: '12px', border: 'none', color: '#020617', fontWeight: 'bold', cursor: 'pointer' }}>
            <Bot size={18} />
            <span style={{ fontSize: '13px' }}>{texts.consultant}</span>
          </button>
          <button onClick={toggleLocale} style={btnStyle}>{locale === 'pt' ? 'EN' : 'PT'}</button>
        </div>
      </nav>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1250px', width: '100%', padding: '60px 40px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: '1', minWidth: '320px' }}>
            <div style={{ color: '#22d3ee', fontSize: '11px', fontWeight: '900', marginBottom: '15px', letterSpacing: '2px' }}>{texts.agency}</div>
            <h1 style={{ fontSize: 'clamp(2.5rem,8vw,4.5rem)', fontWeight: '900', lineHeight: 1, marginBottom: '25px' }}>{texts.title}</h1>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '500px', lineHeight: 1.6, marginBottom: '40px' }}>{texts.description}</p>
            <a href="https://wa.me/5519992278928" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#22d3ee', color: '#020617', padding: '15px 30px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none' }}>
              {texts.btnProject} <ArrowRight size={20} />
            </a>
          </div>
          <div style={{ flex: '1', minWidth: '320px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <SkillBox title={locale === 'pt' ? 'Programação & Dev' : 'Programming & Dev'} items={['Python & APIs', 'React & Next.js', 'Tailwind CSS', 'MongoDB']} />
            <SkillBox title={locale === 'pt' ? 'Dados & Ferramentas' : 'Data & Tools'} items={['Power BI & Dashboards', 'Excel Avançado', 'Jira & Trello', 'Lucidchart']} />
            <SkillBox title={locale === 'pt' ? 'Infra & Cloud' : 'Infra & Cloud'} items={['Vercel & Render', 'Supabase', 'Cisco Packet Tracer', 'Automação']} />
            <SkillBox title={locale === 'pt' ? 'Engenharia & IA' : 'Engineering & AI'} items={['Scrum (Sprints/PO)', 'Arquitetura', 'Chatbots', 'Full Stack']} />
          </div>
        </div>

        <h2 style={{ marginTop: '100px', marginBottom: '40px', fontSize: '2rem', fontWeight: '900' }}>{texts.projectsTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '25px' }}>
          {projects.map(p => <ProjectCard key={p.title} {...p} />)}
        </div>

        <div style={{ marginTop: '120px', padding: '50px', borderRadius: '24px', backgroundColor: '#0b1120', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '20px' }}>🌍 Infraestrutura Digital</h2>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button onClick={() => setFilter('global')} style={filter==='global'?activeBtnStyle:btnStyle}>Global</button>
            <button onClick={() => setFilter('local')} style={filter==='local'?activeBtnStyle:btnStyle}>Local</button>
          </div>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <input value={city} onChange={e => setCity(e.target.value)} placeholder="City..." style={inputStyle} />
            <button onClick={createNode} style={btnStyle}>Create Node</button>
          </div>
          <div style={{ height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
            <MapContainer center={defaultCenter} zoom={2} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredNodes.map(node => (
                <Marker key={node.id} position={[node.latitude, node.longitude]}>
                  <Popup>{node.city}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
      <ChatBot />
    </main>
  )
}

// COMPONENTES AUXILIARES
interface SkillBoxProps { title: string; items: string[] }
function SkillBox({ title, items }: SkillBoxProps) {
  return (
    <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
      <h3 style={{ fontSize: '0.8rem', color: '#22d3ee', marginBottom: '10px', fontWeight: '900' }}>{title}</h3>
      {items.map((item) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#94a3b8' }}>
          <CheckCircle2 size={12} color="#22d3ee" /> {item}
        </div>
      ))}
    </div>
  )
}

interface ProjectCardProps { title: string; img: string; tag: string; url: string }
function ProjectCard({ title, img, tag, url }: ProjectCardProps) {
  return (
    <div style={{ borderRadius: '24px', overflow: 'hidden', backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.05)' }}>
      <img src={img} alt={title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
      <div style={{ padding: '20px' }}>
        <span style={{ fontSize: '10px', color: '#22d3ee', fontWeight: 'bold' }}>{tag}</span>
        <h3 style={{ fontSize: '1.1rem', marginTop: '5px', fontWeight: 'bold', marginBottom: '15px' }}>{title}</h3>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 15px', borderRadius: '8px' }}>Ver Projeto</a>
      </div>
    </div>
  )
}

const btnStyle: React.CSSProperties = { padding: '12px 25px', borderRadius: '12px', backgroundColor: '#22d3ee', color: '#020617', fontWeight: 'bold', border: 'none', cursor: 'pointer' }
const activeBtnStyle: React.CSSProperties = { ...btnStyle, boxShadow: '0 0 15px #22d3ee' }
const inputStyle: React.CSSProperties = { padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', color: 'white' }