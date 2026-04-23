'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { Users, FolderPlus, DollarSign, List, ShieldCheck } from 'lucide-react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null

export default function AdminPanel() {
  const [authorized, setAuthorized] = useState(false)
  const [allFeedbacks, setAllFeedbacks] = useState<any[]>([])
  const [allResources, setAllResources] = useState<any[]>([])
  const [formData, setFormData] = useState({ userId: '', projName: '', progress: 0 })
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase!.auth.getUser()
      // Trava de segurança: só entra se for o seu e-mail
      if (user?.email !== 'dinizdaniel892@gmail.com') {
        router.push('/dashboard')
        return
      }
      setAuthorized(true)
      
      const [feed, res] = await Promise.all([
        supabase!.from('feedbacks').select('*'),
        supabase!.from('resources').select('*')
      ])
      setAllFeedbacks(feed.data || [])
      setAllResources(res.data || [])
    }
    checkAdmin()
  }, [router])

  const createProject = async () => {
    const { error } = await supabase!.from('projects').insert([
      { user_id: formData.userId, name: formData.projName, progress: formData.progress, status: 'Em Desenvolvimento' }
    ])
    if (!error) alert('Projeto cadastrado para o cliente!')
  }

  if (!authorized) return <div style={{background: '#020617', color: 'white', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Verificando Credenciais de Mestre...</div>

  return (
    <main style={{padding: '50px', background: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 15, marginBottom: '40px'}}>
        <ShieldCheck size={32} color="#22d3ee" />
        <h1>Painel de Controle - Agência IA</h1>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px'}}>
        {/* CADASTRO DE PROJETOS */}
        <div style={adminCard}>
          <h2 style={{marginBottom: '20px'}}><FolderPlus /> Novo Projeto p/ Cliente</h2>
          <input style={input} placeholder="ID do Usuário (UID do Supabase)" onChange={e => setFormData({...formData, userId: e.target.value})} />
          <input style={input} placeholder="Nome do Projeto" onChange={e => setFormData({...formData, projName: e.target.value})} />
          <input style={input} type="number" placeholder="Progresso Inicial %" onChange={e => setFormData({...formData, progress: parseInt(e.target.value)})} />
          <button style={btnAdmin} onClick={createProject}>Liberar no Dashboard do Cliente</button>
        </div>

        {/* FEEDBACKS RECEBIDOS */}
        <div style={adminCard}>
          <h2 style={{marginBottom: '20px'}}><List /> Feedbacks dos Clientes</h2>
          {allFeedbacks.map(f => (
            <div key={f.id} style={itemRow}>
              <strong>Cliente: {f.user_id.slice(0, 8)}...</strong>
              <p>{f.message}</p>
            </div>
          ))}
        </div>

        {/* ÚLTIMOS ARQUIVOS ENVIADOS PELOS CLIENTES */}
        <div style={{...adminCard, gridColumn: 'span 2'}}>
          <h2><Users /> Arquivos Recebidos</h2>
          <div style={{marginTop: '20px'}}>
            {allResources.filter(r => r.category === 'Enviado pelo Cliente').map(r => (
              <div key={r.id} style={itemRow}>
                <span>{new Date(r.created_at).toLocaleDateString()}</span>
                <strong>{r.title}</strong>
                <a href={r.link_url} target="_blank" style={{color: '#22d3ee'}}>Baixar Arquivo</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

const adminCard = { background: '#0f172a', padding: '30px', borderRadius: '20px', border: '1px solid #22d3ee44' }
const input = { width: '100%', padding: '12px', marginBottom: '15px', background: '#020617', border: '1px solid #1e293b', color: 'white', borderRadius: '10px' }
const btnAdmin = { width: '100%', padding: '15px', background: '#22d3ee', color: '#020617', border: 'none', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer' }
const itemRow = { padding: '15px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }