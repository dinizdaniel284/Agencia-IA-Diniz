'use client'

import React, { useEffect, useState } from 'react'
import { ArrowRight, Cpu, Bot } from 'lucide-react'
import ChatBot from '@/components/ChatBot'
import { useLanguage } from '@/context/LanguageContext'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { locale, toggleLocale } = useLanguage()

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const openChat = () => {
    window.dispatchEvent(new Event('open-daniel-chat'))
  }

  const texts = {
    agency: locale === 'pt' ? 'AGÊNCIA DE INTELIGÊNCIA ARTIFICIAL' : 'AI AGENCY',
    title: locale === 'pt' ? 'SOLUÇÕES QUE ESCALAM NEGÓCIOS' : 'SOLUTIONS THAT SCALE BUSINESSES',
    description: locale === 'pt'
      ? 'Desenvolvedor Full Stack especializado em Python, APIs e Automações que transformam empresas.'
      : 'Full Stack Developer specialized in Python, APIs, and Automations that transform businesses.',
    btnProject: locale === 'pt' ? 'SOLICITAR PROJETO' : 'REQUEST PROJECT',
    projectsTitle: locale === 'pt' ? 'PROJETOS SELECIONADOS' : 'SELECTED PROJECTS',
    consultant: locale === 'pt' ? 'CONSULTOR IA' : 'AI CONSULTANT'
  }

  return (
    <main style={{
      backgroundColor: '#020617',
      color: 'white',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'sans-serif',
      overflowX: 'hidden',
      position: 'relative',
    }}>

      {/* Glow Background */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '600px',
        background: 'radial-gradient(circle at 50% -20%, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* NAV */}
      <nav style={{
        width: '100%',
        maxWidth: '1200px',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 15px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.03)'
        }}>
          <Cpu size={18} color="#22d3ee" />
          <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px' }}>
            DANIEL DINIZ
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={openChat}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'white',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              color: '#020617',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            <Bot size={18} />
            <span style={{ fontSize: '13px' }}>{texts.consultant}</span>
          </button>

          <button
            onClick={toggleLocale}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              backgroundColor: '#22d3ee',
              color: '#020617',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {locale === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>
      </nav>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1250px',
        width: '100%',
        padding: '60px 40px'
      }}>

        {/* HERO */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>

          <div style={{ flex: '1', minWidth: '320px' }}>
            <div style={{
              color: '#22d3ee',
              fontSize: '11px',
              fontWeight: '900',
              marginBottom: '15px',
              letterSpacing: '2px'
            }}>
              {texts.agency}
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: '900',
              lineHeight: '1',
              marginBottom: '25px',
              letterSpacing: '-2px'
            }}>
              {texts.title}
            </h1>

            <p style={{
              color: '#94a3b8',
              fontSize: '1.1rem',
              maxWidth: '500px',
              lineHeight: '1.6',
              marginBottom: '40px'
            }}>
              {texts.description}
            </p>

            <a
              href="https://wa.me/5519992278928"
              target="_blank"
              className="btn-premium"
            >
              {texts.btnProject} <ArrowRight size={20} />
            </a>
          </div>
        </div>

        {/* GEO SECTION */}
        <GeoSection locale={locale} />

      </div>

      <ChatBot />
    </main>
  )
}

/* ================= GEO SECTION ================= */

function GeoSection({ locale }: any) {
  const [city, setCity] = useState('')
  const [node, setNode] = useState<string | null>(null)
  const [cubeLink, setCubeLink] = useState('')
  const [linked, setLinked] = useState(false)

  const createNode = () => {
    if (!city) return
    setNode(city)
  }

  const connectCube = () => {
    if (!cubeLink) return
    setLinked(true)
  }

  return (
    <div style={{
      marginTop: '120px',
      padding: '50px',
      borderRadius: '24px',
      backgroundColor: '#0b1120',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '20px' }}>
        🌍 {locale === 'pt'
          ? 'Infraestrutura Digital Geolocalizada'
          : 'Geo Digital Infrastructure'}
      </h2>

      <p style={{
        color: '#94a3b8',
        maxWidth: '700px',
        marginBottom: '30px'
      }}>
        {locale === 'pt'
          ? 'Sistema experimental de presença digital geolocalizada conectando negócios físicos à infraestrutura em nuvem.'
          : 'Experimental geolocated digital presence system connecting physical businesses to scalable cloud infrastructure.'}
      </p>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city..."
          style={{
            padding: '12px 20px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: '#020617',
            color: 'white'
          }}
        />

        <button
          onClick={createNode}
          style={{
            padding: '12px 25px',
            borderRadius: '12px',
            backgroundColor: '#22d3ee',
            color: '#020617',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Create Digital Node
        </button>
      </div>

      {node && (
        <div style={{
          marginTop: '30px',
          padding: '25px',
          borderRadius: '16px',
          backgroundColor: 'rgba(34,211,238,0.05)',
          border: '1px solid rgba(34,211,238,0.2)'
        }}>
          <strong style={{ color: '#22d3ee' }}>Node Activated:</strong>

          <p style={{ marginTop: '10px', color: '#94a3b8' }}>
            Digital presence initialized for {node}. Cloud-ready • Scalable • API-integrated
          </p>

          <div style={{
            marginTop: '25px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.08)'
          }}>
            <h4 style={{ marginBottom: '10px', fontWeight: 'bold' }}>
              🔗 Connect Cube Domain
            </h4>

            <input
              value={cubeLink}
              onChange={(e) => setCubeLink(e.target.value)}
              placeholder="Paste your Cube public link here..."
              style={{
                width: '100%',
                padding: '12px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: '#020617',
                color: 'white',
                marginBottom: '15px'
              }}
            />

            <button
              onClick={connectCube}
              style={{
                padding: '12px 25px',
                borderRadius: '12px',
                backgroundColor: linked ? '#16a34a' : '#22d3ee',
                color: '#020617',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {linked ? 'Cube Linked ✓' : 'Link Cube'}
            </button>

            {linked && (
              <p style={{ marginTop: '15px', color: '#22d3ee' }}>
                Cube successfully connected to your digital node.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
      }
