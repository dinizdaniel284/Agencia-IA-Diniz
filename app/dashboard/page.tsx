'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, Box, ExternalLink, LogOut, MessageSquare, 
  Send, FileText, CreditCard, Download, UploadCloud, Languages,
  Rocket, Smartphone
} from 'lucide-react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null

const translations = {
  pt: {
    projects: 'Meus Projetos',
    files: 'Arquivos',
    finance: 'Financeiro',
    services: 'Novos Projetos',
    welcome: 'Área do Cliente',
    loggedAs: 'Logado como',
    noProjects: 'Nenhum projeto ativo.',
    uploadBtn: 'Enviar Arquivo',
    uploading: 'Subindo...',
    payBtn: 'Pagar Agora',
    dueDate: 'Vencimento',
    logout: 'Sair do Sistema',
    ctaTitle: 'Precisa de algo novo?',
    ctaDesc: 'Desenvolvemos automações, apps e sistemas sob medida para sua empresa.',
    ctaBtn: 'Falar com Daniel no WhatsApp'
  },
  en: {
    projects: 'My Projects',
    files: 'Files',
    finance: 'Finance',
    services: 'New Projects',
    welcome: 'Client Area',
    loggedAs: 'Logged in as',
    noProjects: 'No active projects.',
    uploadBtn: 'Upload File',
    uploading: 'Uploading...',
    payBtn: 'Pay Now',
    dueDate: 'Due Date',
    logout: 'Sign Out',
    ctaTitle: 'Need something new?',
    ctaDesc: 'We develop custom automations, apps, and systems for your business.',
    ctaBtn: 'Talk to Daniel on WhatsApp'
  }
}

export default function Dashboard() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt')
  const t = translations[lang]

  const [activeTab, setActiveTab] = useState<'projetos' | 'arquivos' | 'financeiro' | 'servicos'>('projetos')
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [resources, setResources] = useState<any[]>([])
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const loadData = async () => {
    if (!supabase) return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }
    setUser(user)

    const [proj, res, inv] = await Promise.all([
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('resources').select('*').order('created_at', { ascending: false }),
      supabase.from('invoices').select('*').order('due_date', { ascending: true })
    ])

    setProjects(proj.data || [])
    setResources(res.data || [])
    setInvoices(inv.data || [])
    setLoading(false)
  }

  useEffect(() => { loadData() }, [router])

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Olá Daniel! Estou no Dashboard da Agência IA e gostaria de falar sobre um projeto.`)
    window.open(`https://wa.me/5519992278928?text=${msg}`, '_blank') // COLOQUE SEU NUMERO AQUI
  }

  if (loading) return <div style={loader}>Carregando sistema...</div>

  return (
    <main style={main}>
      {/* WHATSAPP FLUTUANTE */}
      <div style={whatsappFloat} onClick={handleWhatsApp}>
        <MessageSquare size={24} />
      </div>

      {/* SIDEBAR */}
      <nav style={sidebar}>
        <div style={logo}><LayoutDashboard size={22} color="#22d3ee" /> AGÊNCIA IA</div>
        
        <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} style={langBtn}>
          <Languages size={16} /> {lang.toUpperCase()}
        </button>

        <div style={navItems}>
          <div style={activeTab === 'projetos' ? navItemActive : navItem} onClick={() => setActiveTab('projetos')}><Box size={18} /> {t.projects}</div>
          <div style={activeTab === 'arquivos' ? navItemActive : navItem} onClick={() => setActiveTab('arquivos')}><FileText size={18} /> {t.files}</div>
          <div style={activeTab === 'financeiro' ? navItemActive : navItem} onClick={() => setActiveTab('financeiro')}><CreditCard size={18} /> {t.finance}</div>
          <div style={activeTab === 'servicos' ? navItemActive : navItem} onClick={() => setActiveTab('servicos')}><Rocket size={18} /> {t.services}</div>
        </div>
        
        <button onClick={() => supabase?.auth.signOut().then(() => router.push('/login'))} style={logoutBtn}>
          <LogOut size={18} /> {t.logout}
        </button>
      </nav>

      <section style={content}>
        <header style={header}>
          <h1>{t.welcome}</h1>
          <p style={{opacity: 0.6}}>{t.loggedAs}: <span style={{color: '#22d3ee'}}>{user?.email}</span></p>
        </header>

        {activeTab === 'projetos' && (
          <div style={grid}>
            {projects.length === 0 && <p style={{opacity: 0.5}}>{t.noProjects}</p>}
            {projects.map(p => (
              <div key={p.id} style={card}>
                <span style={statusBadge}>{p.status}</span>
                <h3>{p.name}</h3>
                <div style={progressBar}><div style={{...progressFill, width: `${p.progress}%`}}></div></div>
                <button style={btnAction} onClick={() => window.open(p.preview_url, '_blank')}><ExternalLink size={16} /> Preview</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'servicos' && (
          <div style={{...card, textAlign: 'center', padding: '50px'}}>
            <Rocket size={48} color="#22d3ee" style={{marginBottom: 20}} />
            <h2 style={{fontSize: '24px', marginBottom: 15}}>{t.ctaTitle}</h2>
            <p style={{opacity: 0.7, maxWidth: '500px', margin: '0 auto 30px'}}>{t.ctaDesc}</p>
            <button style={{...btnAction, margin: '0 auto', padding: '15px 30px'}} onClick={handleWhatsApp}>
               <Smartphone size={20} /> {t.ctaBtn}
            </button>
          </div>
        )}

        {activeTab === 'arquivos' && (
          <div style={card}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
              <h2>{t.files}</h2>
              <label style={btnAction}>
                {uploading ? t.uploading : <><UploadCloud size={18} /> {t.uploadBtn}</>}
                <input type="file" hidden onChange={(e) => alert('Funcionalidade de upload ativa!')} disabled={uploading} />
              </label>
            </div>
            {resources.map(r => (
              <div key={r.id} style={listRow} onClick={() => window.open(r.link_url, '_blank')}>
                <span>{r.title}</span> <Download size={16} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'financeiro' && (
          <div style={card}>
            <h2>{t.finance}</h2>
            {invoices.map(i => (
              <div key={i.id} style={listRow}>
                <div><strong>{i.description}</strong><br/><small>{t.dueDate}: {i.due_date}</small></div>
                <div style={{textAlign: 'right'}}>
                  <div>R$ {i.amount}</div>
                  {i.payment_url && i.status !== 'Pago' && (
                    <button style={btnPay} onClick={() => window.open(i.payment_url, '_blank')}>{t.payBtn}</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

// ESTILOS ADICIONAIS E AJUSTADOS
const main: React.CSSProperties = { display: 'flex', background: '#020617', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }
const sidebar: React.CSSProperties = { width: '260px', background: '#0f172a', padding: '30px 20px', borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }
const logo: React.CSSProperties = { fontWeight: '900', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '20px', letterSpacing: '1px' }
const langBtn: React.CSSProperties = { background: '#1e293b', color: '#22d3ee', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', fontWeight: 'bold' }
const navItems: React.CSSProperties = { flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }
const navItem: React.CSSProperties = { padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', opacity: 0.5, transition: '0.3s' }
const navItemActive: React.CSSProperties = { background: 'rgba(34, 211, 238, 0.1)', color: '#22d3ee', padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontWeight: 'bold' }
const content: React.CSSProperties = { flex: 1, padding: '40px', overflowY: 'auto' }
const header: React.CSSProperties = { marginBottom: '40px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }
const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }
const card: React.CSSProperties = { background: '#0f172a', padding: '25px', borderRadius: '20px', border: '1px solid #1e293b', transition: '0.3s' }
const btnAction: React.CSSProperties = { background: '#22d3ee', color: '#020617', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }
const btnPay: React.CSSProperties = { background: '#22c55e', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '5px', marginTop: '8px', cursor: 'pointer', fontWeight: 'bold' }
const listRow: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#020617', borderRadius: '12px', marginBottom: '10px', cursor: 'pointer', border: '1px solid transparent' }
const loader: React.CSSProperties = { background: '#020617', color: '#22d3ee', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }
const statusBadge: React.CSSProperties = { background: 'rgba(34, 211, 238, 0.1)', color: '#22d3ee', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', marginBottom: '15px', display: 'inline-block', fontWeight: 'bold' }
const progressBar: React.CSSProperties = { height: '8px', background: '#1e293b', borderRadius: '10px', margin: '20px 0' }
const progressFill: React.CSSProperties = { height: '100%', background: '#22d3ee', borderRadius: '10px' }
const logoutBtn: React.CSSProperties = { background: 'transparent', border: 'none', color: '#ef4444', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontWeight: 'bold', marginTop: '20px' }
const whatsappFloat: React.CSSProperties = { position: 'fixed', bottom: '30px', right: '30px', background: '#22c55e', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', zIndex: 1000 }