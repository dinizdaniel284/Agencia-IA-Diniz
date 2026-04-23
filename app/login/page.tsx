'use client'

import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { LogIn, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false) // Alterna entre Login e Cadastro
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    setLoading(true)

    try {
      if (isSignUp) {
        // LÓGICA DE CADASTRO
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` }
        })
        if (error) throw error
        alert('Conta criada! Verifique seu e-mail para confirmar o cadastro.')
        setIsSignUp(false)
      } else {
        // LÓGICA DE LOGIN
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/dashboard')
      }
    } catch (err: any) {
      alert(err.message || 'Erro na autenticação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={container}>
      <div style={card}>
        <div style={header}>
          <div style={iconBox}><ShieldCheck size={32} color="#22d3ee" /></div>
          <h2 style={title}>{isSignUp ? 'Criar Nova Conta' : 'Acessar Painel'}</h2>
          <p style={subtitle}>
            {isSignUp ? 'Preencha os dados para se cadastrar' : 'Gerencie seus projetos na Agência IA'}
          </p>
        </div>

        <form onSubmit={handleAuth} style={form}>
          <div style={inputGroup}>
            <label style={label}>E-mail</label>
            <input 
              type="email" 
              placeholder="seu@email.com" 
              style={input} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={inputGroup}>
            <label style={label}>Senha</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={input} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading} style={btn}>
            {loading ? 'Aguarde...' : (
              isSignUp ? <><UserPlus size={18} /> Cadastrar</> : <><LogIn size={18} /> Entrar</>
            )}
          </button>
        </form>

        <div style={footer}>
          <button 
            onClick={() => setIsSignUp(!isSignUp)} 
            style={toggleBtn}
          >
            {isSignUp ? 'Já tem conta? Faça Login' : 'Não tem conta? Cadastre-se agora'}
          </button>
        </div>
      </div>
    </main>
  )
}

// ESTILOS
const container: React.CSSProperties = { background: '#020617', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif' }
const card: React.CSSProperties = { background: '#0f172a', padding: '40px', borderRadius: '24px', border: '1px solid #1e293b', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }
const header: React.CSSProperties = { textAlign: 'center', marginBottom: '30px' }
const iconBox: React.CSSProperties = { background: 'rgba(34, 211, 238, 0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }
const title: React.CSSProperties = { fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }
const subtitle: React.CSSProperties = { fontSize: '14px', opacity: 0.6 }
const form: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '20px' }
const inputGroup: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '8px' }
const label: React.CSSProperties = { fontSize: '14px', fontWeight: '500', color: '#94a3b8' }
const input: React.CSSProperties = { background: '#020617', border: '1px solid #1e293b', padding: '12px 16px', borderRadius: '12px', color: 'white', fontSize: '16px', outline: 'none' }
const btn: React.CSSProperties = { background: '#22d3ee', color: '#020617', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: '0.3s', marginTop: '10px' }
const footer: React.CSSProperties = { marginTop: '25px', textAlign: 'center' }
const toggleBtn: React.CSSProperties = { background: 'none', border: 'none', color: '#22d3ee', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }