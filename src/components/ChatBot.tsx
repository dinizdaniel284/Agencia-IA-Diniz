'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([
    { 
      role: 'assistant', 
      content: 'Olá! Sou o consultor virtual do Daniel. Como posso te ajudar com o seu projeto hoje?' 
    }
  ])
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-daniel-chat', handleOpen);
    return () => window.removeEventListener('open-daniel-chat', handleOpen);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMessage = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await response.json()
      setMessages([...newMessages, { role: 'assistant', content: data.text || "Me chama no WhatsApp?" }])
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: "Erro na conexão. Vamos para o WhatsApp?" }])
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#020817]/95 border border-cyan-500/30 backdrop-blur-2xl w-[320px] sm:w-[380px] h-[520px] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden">
        
        <div className="bg-gradient-to-r from-cyan-500/20 to-transparent p-6 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/20 p-2 rounded-xl">
              <Bot size={22} className="text-cyan-400" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-white text-sm tracking-wide">Daniel AI Agent</span>
              <span className="block text-[10px] text-cyan-400 uppercase tracking-widest font-black">Online agora</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-all p-1">
            <X size={24} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 bg-transparent scrollbar-hide">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex flex-col", m.role === 'user' ? "items-end" : "items-start")}>
              <div className={cn(
                "max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                m.role === 'user' 
                  ? "bg-cyan-500 text-black font-bold rounded-tr-none shadow-lg shadow-cyan-500/20" 
                  : "bg-white/5 text-slate-200 border border-white/10 rounded-tl-none"
              )}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-1.5 p-2">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/5 bg-white/[0.02]">
          <div className="relative flex items-center">
            <input 
              type="text"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                   e.preventDefault();
                   sendMessage();
                }
              }}
              placeholder="Escreva sua mensagem..."
              className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 appearance-none"
              style={{ fontSize: '16px' }} 
            />
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                sendMessage();
              }} 
              className="absolute right-2 p-2 bg-cyan-500 rounded-xl text-black hover:bg-white transition-colors z-10"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
                                       }
              
