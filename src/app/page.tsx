'use client'

export const dynamic = 'force-dynamic'

import React, { useEffect, useState, useRef } from 'react'
import { ArrowRight, Cpu, Bot, CheckCircle2 } from 'lucide-react'
import ChatBot from '@/components/ChatBot'
import { useLanguage } from '@/context/LanguageContext'
import { createClient } from '@supabase/supabase-js'
import dynamicImport from 'next/dynamic'

const MapContainer = dynamicImport(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false }) as React.ComponentType<any>;
const TileLayer = dynamicImport(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false }) as React.ComponentType<any>;
const Marker = dynamicImport(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false }) as React.ComponentType<any>;
const Popup = dynamicImport(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false }) as React.ComponentType<any>;

import 'leaflet/dist/leaflet.css'

// --- AJUSTE DE URL DO SUPABASE ---
const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'placeholder').trim();
const supabaseUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder').trim();

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { locale, toggleLocale } = useLanguage()
  const [city, setCity] = useState('')
  const [nodes, setNodes] = useState<any[]>([])
  const [userNode, setUserNode] = useState<any | null>(null)
  
  const mapRef = useRef<any>(null)

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

  const fetchNodes = async () => {
    if (supabaseUrl.includes('placeholder')) return
    const { data, error } = await supabase.from('digital_nodes').select('*')
    if (!error && data) setNodes(data)
  }

  const createNode = () => {
    console.log("Iniciando criação de nó na Agência IA Diniz...");
    if (!city) { alert("Digite o nome da cidade!"); return; }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        // 1. Move o mapa imediatamente com o ref
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 13, { animate: true });
        }

        // 2. Salva no banco
        const { error } = await supabase.from('digital_nodes').insert([
          { city, latitude, longitude, type: 'AI Node' },
        ]);

        if (!error) {
          setUserNode({ city, latitude, longitude });
          fetchNodes();
        } else {
          console.error("Erro Supabase:", error.message);
        }
      }, (err) => {
        alert("Erro de permissão ou GPS: " + err.message);
      }, { enableHighAccuracy: true, timeout: 10000 });
    } else {
      alert("Seu navegador não suporta geolocalização.");
    }
  }

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
          <button onClick={() => window.dispatchEvent(new Event('open-daniel-chat'))} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', padding: '10px 20px', borderRadius: '12px', border: 'none', color: '#020617', fontWeight: 'bold', cursor: 'pointer' }}>
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
             <SkillBox title={locale === 'pt' ? 'Programação' : 'Dev'} items={['Python', 'Next.js', 'Tailwind', 'Supabase']} />
             <SkillBox title={locale === 'pt' ? 'Infra' : 'Cloud'} items={['Vercel', 'Render', 'IA', 'Automation']} />
          </div>
        </div>

        <h2 style={{ marginTop: '100px', marginBottom: '40px', fontSize: '2rem', fontWeight: '900' }}>{texts.projectsTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '25px' }}>
          {projects.map(p => <ProjectCard key={p.title} {...p} />)}
        </div>

        <div style={{ marginTop: '120px', padding: '50px', borderRadius: '24px', backgroundColor: '#0b1120', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '20px' }}>🌍 Infraestrutura Digital</h2>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <input value={city} onChange={e => setCity(e.target.value)} placeholder="Sua cidade..." style={inputStyle} />
            <button onClick={createNode} style={btnStyle}>Criar Nó Digital</button>
          </div>
          
          <div style={{ height: '450px', borderRadius: '16px', overflow: 'hidden', border: '2px solid #22d3ee' }}>
            <MapContainer 
              center={[0, 0]} 
              zoom={2} 
              style={{ height: '100%', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {nodes.map(node => (
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

function SkillBox({ title, items }: any) {
  return (
    <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
      <h3 style={{ fontSize: '0.8rem', color: '#22d3ee', marginBottom: '10px', fontWeight: '900' }}>{title}</h3>
      {items.map((item: any) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#94a3b8' }}>
          <CheckCircle2 size={12} color="#22d3ee" /> {item}
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ title, img, tag, url }: any) {
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
const inputStyle: React.CSSProperties = { padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', color: 'white', flex: 1 }