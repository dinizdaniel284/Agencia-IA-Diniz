'use client'

export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from 'react'
import { ArrowRight, Cpu, Bot } from 'lucide-react'
import ChatBot from '@/components/ChatBot'
import { createClient } from '@supabase/supabase-js'

type Project = {
  title: string
  img: string
  tag: string
  url: string
  description: string
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const fallback: Project[] = [
      {
        title: 'Sistema de Pedidos Inteligente',
        img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500',
        tag: 'Restaurante',
        url: 'https://devburger-premium.vercel.app/',
        description:
          'Sistema que automatiza pedidos e aumenta vendas via WhatsApp.',
      },
      {
        title: 'Varejo AI',
        img: 'https://images.unsplash.com/photo-1612831662556-61de1e8f5e76?w=500',
        tag: 'E-commerce',
        url: 'https://varejo-ai-diniz.vercel.app/',
        description:
          'Plataforma inteligente para recomendação e aumento de conversão.',
      },
    ]

    if (!supabase) {
      setProjects(fallback)
      return
    }

    try {
      const { data } = await supabase.from('projects').select('*')
      setProjects(data?.length ? data : fallback)
    } catch {
      setProjects(fallback)
    }
  }

  return (
    <main style={main}>
      
      {/* NAV */}
      <nav style={nav}>
        <div style={logo}>
          <Cpu size={18} /> Agência IA Diniz
        </div>

        <button
          style={btn}
          onClick={() =>
            window.open(
              'https://wa.me/5519992278928?text=Quero automatizar meu negócio',
              '_blank'
            )
          }
        >
          Falar no WhatsApp
        </button>
      </nav>

      {/* HERO */}
      <section style={hero}>
        <h1>Automatize seu atendimento e aumente suas vendas com IA</h1>

        <p>
          Sistemas inteligentes que respondem clientes, sugerem produtos e
          fecham pedidos automaticamente no WhatsApp.
        </p>

        <a
          href="https://wa.me/5519992278928?text=Quero automatizar meu negócio"
          style={cta}
        >
          Quero automatizar meu negócio <ArrowRight size={18} />
        </a>
      </section>

      {/* COMO FUNCIONA */}
      <section style={section}>
        <h2>Como funciona</h2>

        <div style={steps}>
          <div>📲 Cliente chama no WhatsApp</div>
          <div>🤖 IA responde automaticamente</div>
          <div>🛒 Sistema sugere produtos</div>
          <div>💰 Pedido fechado sozinho</div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section style={section}>
        <h2>Resultados para seu negócio</h2>

        <div style={steps}>
          <div>📈 Mais vendas todos os dias</div>
          <div>⏱ Atendimento 24h</div>
          <div>💸 Menos erros e prejuízo</div>
          <div>🚀 Mais conversão</div>
        </div>
      </section>

      {/* PROJETOS */}
      <section style={section}>
        <h2>Demonstrações reais funcionando</h2>

        <div style={grid}>
          {projects.map((p) => (
            <div key={p.title} style={card}>
              <img src={p.img} style={img} />

              <div style={{ padding: 15 }}>
                <span style={tag}>{p.tag}</span>
                <h3>{p.title}</h3>
                <p style={desc}>{p.description}</p>

                <a href={p.url} target="_blank">
                  Ver demonstração →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ChatBot />
    </main>
  )
}

// STYLES
const main = {
  background: '#020617',
  color: 'white',
  minHeight: '100vh',
  padding: 30,
}

const nav = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 50,
}

const logo = {
  display: 'flex',
  gap: 10,
  fontWeight: 'bold',
}

const hero = {
  textAlign: 'center' as const,
  maxWidth: 800,
  margin: '0 auto 60px',
}

const cta = {
  display: 'inline-flex',
  marginTop: 20,
  background: '#22d3ee',
  padding: '14px 24px',
  borderRadius: 10,
  color: '#000',
  textDecoration: 'none',
  fontWeight: 'bold',
}

const section = {
  maxWidth: 1000,
  margin: '60px auto',
  textAlign: 'center' as const,
}

const steps = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
  gap: 20,
  marginTop: 20,
}

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
  gap: 20,
  marginTop: 30,
}

const card = {
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  overflow: 'hidden',
}

const img = {
  width: '100%',
  height: 160,
  objectFit: 'cover' as const,
}

const tag = {
  fontSize: 12,
  opacity: 0.6,
}

const desc = {
  fontSize: 14,
  color: '#ccc',
}

const btn = {
  background: '#22d3ee',
  border: 'none',
  padding: '10px 18px',
  borderRadius: 8,
  cursor: 'pointer',
}
