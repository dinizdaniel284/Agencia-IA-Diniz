'use client'

export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from 'react'
import { ArrowRight, Cpu, Bot } from 'lucide-react'
import ChatBot from '@/components/ChatBot'
import { useLanguage } from '@/context/LanguageContext'
import { createClient } from '@supabase/supabase-js'
import dynamicImport from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

type LatLngTuple = [number, number]

// MAPA (SSR SAFE)
const MapContainer: any = dynamicImport(
  () => import('react-leaflet').then((m) => m.MapContainer),
  { ssr: false }
)
const TileLayer: any = dynamicImport(
  () => import('react-leaflet').then((m) => m.TileLayer),
  { ssr: false }
)
const Marker: any = dynamicImport(
  () => import('react-leaflet').then((m) => m.Marker),
  { ssr: false }
)
const Popup: any = dynamicImport(
  () => import('react-leaflet').then((m) => m.Popup),
  { ssr: false }
)

const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim()

let supabase: any = null
if (rawUrl && supabaseAnonKey) {
  const supabaseUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

type Project = {
  title: string
  img: string
  tag: string
  url: string
  description: string
}

export default function Home() {
  const { locale, toggleLocale } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [city, setCity] = useState('')
  const [nodes, setNodes] = useState<any[]>([])
  const [mapCenter, setMapCenter] = useState<LatLngTuple>([20, 0])
  const [mapZoom, setMapZoom] = useState(2)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    setMounted(true)
    fetchNodes()
    fetchProjects()

    if (typeof window !== 'undefined') {
      const L = require('leaflet')
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })
    }
  }, [])

  async function fetchNodes() {
    if (!supabase) return
    try {
      const { data } = await supabase.from('nodes_sistema').select('*')
      if (data) setNodes(data)
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchProjects() {
    const defaultProjects: Project[] = [
      {
        title: 'Sistema Saúde',
        img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500',
        tag: 'Sistema',
        url: 'https://ti-saude-frontend.vercel.app',
        description: 'Sistema web para gestão de saúde com funcionalidades modernas',
      },
      {
        title: 'Plataforma de Vendas',
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
        tag: 'SaaS',
        url: 'https://meu-sistema-vendas.vercel.app',
        description: 'Painel de vendas inteligente, fluxo de pedidos e integração com APIs.',
      },
      {
        title: 'Actus',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
        tag: 'Plataforma',
        url: 'https://prototipo-actus.vercel.app',
        description: 'Protótipo de plataforma com foco em experiência do usuário.',
      },
      {
        title: 'Varejo AI',
        img: 'https://images.unsplash.com/photo-1612831662556-61de1e8f5e76?w=500', // FIXA
        tag: 'E‑commerce IA',
        url: 'https://varejo-ai-diniz.vercel.app/',
        description: 'Sistema de varejo com inteligência artificial para otimizar vendas e recomendação de produtos.',
      },
    ]

    if (!supabase) {
      setProjects(defaultProjects)
      return
    }

    try {
      const { data } = await supabase.from('projects').select('*')
      if (data && data.length > 0) {
        setProjects(data)
      } else {
        setProjects(defaultProjects)
      }
    } catch (err) {
      console.log(err)
      setProjects(defaultProjects)
    }
  }

  async function addProject(title: string, url: string, tag = 'Projeto') {
    const description = `Projeto ${title} desenvolvido pela Agência Diniz`
    let img = ''

    try {
      const query = encodeURIComponent(title + ',tech,software')
      img = `https://source.unsplash.com/featured/500x300/?${query}`
    } catch (err) {
      img = 'https://images.unsplash.com/photo-1612831662556-61de1e8f5e76?w=500'
    }

    const newProject: Project = { title, img, url, tag, description }

    if (supabase) {
      try {
        await supabase.from('projects').insert([newProject])
        fetchProjects()
      } catch (err) {
        console.log(err)
      }
    } else {
      setProjects((prev) => [...prev, newProject])
    }
  }

  const texts = {
    agency:
      locale === 'pt' ? 'AGÊNCIA DE AUTOMAÇÃO E IA' : 'AI AUTOMATION AGENCY',
    title:
      locale === 'pt'
        ? 'Transformo processos manuais em sistemas inteligentes'
        : 'Turning manual processes into intelligent systems',
    description:
      locale === 'pt'
        ? 'Ajudo empresas a economizar tempo, reduzir erros e crescer usando automações, sistemas web e inteligência artificial.'
        : 'I help companies automate operations and scale using AI and modern systems.',
    btnProject: locale === 'pt' ? 'Receber diagnóstico gratuito' : 'Get free diagnosis',
    projectsTitle: locale === 'pt' ? 'Projetos Desenvolvidos' : 'Projects',
    consultant: locale === 'pt' ? 'CONSULTOR IA' : 'AI CONSULTANT',
  }

  if (!mounted) return null

  return (
    <main style={mainStyle}>
      {/* NAV */}
      <nav style={navStyle}>
        <div style={logoStyle}>
          <Cpu size={18} />
          DANIEL DINIZ
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            style={btnStyle}
            onClick={() => window.dispatchEvent(new Event('open-daniel-chat'))}
          >
            <Bot size={16} /> {texts.consultant}
          </button>
          <button style={btnStyle} onClick={toggleLocale}>
            {locale === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={heroStyle}>
        <h1>{texts.title}</h1>
        <p style={{ fontSize: 18, opacity: 0.9 }}>{texts.description}</p>
        <p style={{ marginTop: 10, opacity: 0.7 }}>
          Automação • Sistemas Web • Integração de APIs • Inteligência Artificial
        </p>
        <a
          href="https://wa.me/5519992278928?text=Olá vim pelo site"
          style={ctaStyle}
        >
          {texts.btnProject} <ArrowRight size={18} />
        </a>
      </section>

      {/* PROJETOS */}
      <section style={{ maxWidth: 1200, width: '100%', marginTop: 80 }}>
        <h2 style={sectionTitle}>{texts.projectsTitle}</h2>
        <div style={projectGrid}>
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      {/* CHATBOT */}
      <ChatBot />
    </main>
  )
}

function ProjectCard({ title, img, tag, url, description }: any) {
  return (
    <div style={projectCard}>
      <img src={img} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
      <div style={{ padding: 15 }}>
        <span style={{ fontSize: 12, opacity: 0.7 }}>{tag}</span>
        <h3 style={{ margin: '8px 0' }}>{title}</h3>
        <p style={{ fontSize: 14, color: '#ccc' }}>{description}</p>
        <a href={url} target="_blank" rel="noreferrer">
          Ver projeto →
        </a>
      </div>
    </div>
  )
}

// STYLES
const mainStyle: React.CSSProperties = { background: '#020617', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 30 }
const navStyle = { width: '100%', maxWidth: 1200, display: 'flex', justifyContent: 'space-between', marginBottom: 60 }
const logoStyle = { display: 'flex', gap: 10, fontWeight: 'bold' }
const heroStyle = { maxWidth: 900, textAlign: 'center' as const, marginBottom: 60 }
const ctaStyle = { marginTop: 25, display: 'inline-flex', gap: 8, background: '#22d3ee', padding: '14px 24px', borderRadius: 10, color: '#000', textDecoration: 'none', fontWeight: 'bold' }
const sectionTitle = { fontSize: 28, marginBottom: 30 }
const projectGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }
const projectCard = { border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, overflow: 'hidden' }
const btnStyle = { padding: '10px 18px', background: '#22d3ee', border: 'none', borderRadius: 8, cursor: 'pointer' }
