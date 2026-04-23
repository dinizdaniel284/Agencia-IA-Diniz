'use client'

import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { Cpu, ArrowLeft, Lock, Mail } from 'lucide-react'

// Configuração segura do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) {
      alert('Configuração do banco de dados não encontrada.')
      return
    }
    
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('Erro ao entrar: ' + error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main style={main}>
      <div style={loginCard}>
        <div style={logo}>
          <Cpu size={32} color="#22d3ee" />
          <h2 style={{ margin: 0 }}>AGÊNCIA <span style={{ color: '#22d3ee' }}>IA</span></h2>
        </div>
        
        <p style={{ opacity: 0.7, marginBottom: 30 }}>Acesse seu painel de projetos</p>

        <form onSubmit={handleLogin} style={form}>
          <div style={inputGroup}>
            <Mail size={18} style={icon} />
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              style={input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div style={inputGroup}>
            <Lock size={18} style={icon} />
            <input 
              type="password" 
              placeholder="Sua senha" 
              style={input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" style={btn} disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar no Sistema'}
          </button>
        </form>

        <button onClick={() => router.push('/')} style={backBtn}>
          <ArrowLeft size={14} /> Voltar para o site
        </button>
      </div>
    </main>
  )
}

const main: React.CSSProperties = { background: '#020617', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif' }
const loginCard: React.CSSProperties = { background: '#0f172a', padding: '40px', borderRadius: '20px', border: '1px solid rgba(34, 211, 238, 0.1)', textAlign: 'center', width: '100%', maxWidth: '400px' }
const logo: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 10, fontWeight: 'bold' }
const form: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '15px' }
const inputGroup: React.CSSProperties = { position: 'relative', display: 'flex', alignItems: 'center' }
const icon: React.CSSProperties = { position: 'absolute', left: '15px', opacity: 0.5 }
const input: React.CSSProperties = { width: '100%', padding: '15px 15px 15px 45px', borderRadius: '10px', border: '1px solid #1e293b', background: '#020617', color: 'white' }
const btn: React.CSSProperties = { background: '#22d3ee', color: '#000', padding: '15px', borderRadius: '10px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }
const backBtn: React.CSSProperties = { marginTop: '20px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'center', fontSize: '14px' }