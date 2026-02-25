'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X, Bot, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const quickReplies = [
"Quero automatizar minha empresa",
"Preciso de um sistema",
"Quero integrar APIs",
"Como funciona IA no meu negócio?",
]

const WHATSAPP_LINK =
"https://wa.me/5519992278928?text=Olá%20vim%20pelo%20site"

export default function ChatBot() {

const [isOpen, setIsOpen] = useState(false)
const [showWhatsapp, setShowWhatsapp] = useState(false)

const [input, setInput] = useState('')

const [messages, setMessages] = useState<{ role: string, content: string }[]>([
{
role: 'assistant',
content:
'Olá! Eu sou o agente de IA do Daniel. Posso ajudar com automações, sistemas ou IA para empresas.'
}
])

const [loading, setLoading] = useState(false)

const scrollRef = useRef<HTMLDivElement>(null)

useEffect(() => {
const handleOpen = () => setIsOpen(true)
window.addEventListener('open-daniel-chat', handleOpen)
return () => window.removeEventListener('open-daniel-chat', handleOpen)
}, [])

useEffect(() => {
if (scrollRef.current) {
scrollRef.current.scrollTop = scrollRef.current.scrollHeight
}
}, [messages, loading])

function smartReply(text: string) {

const t = text.toLowerCase()

if (t.includes('autom') || t.includes('empresa')) {

setShowWhatsapp(true)

return `Automação pode economizar horas por semana.

Posso criar:

• atendimento automático  
• integração de sistemas  
• captura de leads  
• relatórios automáticos  

Quer me contar o que você faz hoje manualmente?`
}

if (t.includes('sistema')) {

setShowWhatsapp(true)

return `Daniel desenvolve sistemas completos para empresas:

• plataformas web  
• dashboards  
• sistemas de vendas  
• SaaS  

Qual problema você quer resolver?`
}

if (t.includes('api') || t.includes('integra')) {

setShowWhatsapp(true)

return `Integrações conectam tudo no seu negócio.

Podemos integrar:

• CRM  
• ERP  
• WhatsApp  
• pagamentos  
• IA  

Qual sistema você usa hoje?`
}

if (t.includes('ia')) {

setShowWhatsapp(true)

return `Hoje empresas usam IA para:

• atendimento automático  
• análise de dados  
• automação de processos  
• vendas

Quer ver um exemplo aplicado ao seu negócio?`
}

return `Interessante.

Me conta um pouco mais sobre seu projeto.

Se preferir falar direto com o Daniel, clique no botão verde que apareceu na tela.`
}

const sendMessage = async (text?: string) => {

const messageText = text ?? input

if (!messageText.trim() || loading) return

const userMessage = { role: 'user', content: messageText }

const newMessages = [...messages, userMessage]

setMessages(newMessages)

setInput('')

setLoading(true)

setTimeout(() => {

const reply = smartReply(messageText)

setMessages([...newMessages, { role: 'assistant', content: reply }])

setLoading(false)

}, 900)

}

if (!isOpen) return null

return (

<>

<div className="fixed bottom-6 right-6 z-[9999] animate-in slide-in-from-bottom-5 duration-300">

<div className="bg-[#020817]/95 border border-cyan-500/30 backdrop-blur-2xl w-[340px] sm:w-[390px] h-[540px] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden">

<div className="bg-gradient-to-r from-cyan-500/20 to-transparent p-6 border-b border-white/5 flex justify-between items-center">

<div className="flex items-center gap-3">

<div className="bg-cyan-500/20 p-2 rounded-xl">
<Bot size={22} className="text-cyan-400" />
</div>

<div>
<span className="block font-bold text-white text-sm">Daniel AI Agent</span>
<span className="block text-[10px] text-cyan-400 uppercase tracking-widest font-black flex items-center gap-1">
<Sparkles size={12}/> Online agora
</span>
</div>

</div>

<button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
<X size={22} />
</button>

</div>

<div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6">

{messages.map((m, i) => (

<div key={i} className={cn("flex flex-col", m.role === 'user' ? "items-end" : "items-start")}>

<div className={cn(
"max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
m.role === 'user'
? "bg-cyan-500 text-black font-bold rounded-tr-none"
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

<div className="px-4 pb-2 flex flex-wrap gap-2">

{quickReplies.map((q) => (

<button
key={q}
onClick={() => sendMessage(q)}
className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full hover:bg-cyan-500 hover:text-black transition"
>
{q}
</button>

))}

</div>

<div className="p-4 border-t border-white/5">

<div className="relative flex items-center">

<input
type="text"
value={input}
onChange={(e) => setInput(e.target.value)}
onKeyDown={(e) => {
if (e.key === 'Enter') sendMessage()
}}
placeholder="Escreva sua mensagem..."
className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none"
style={{ fontSize: '16px' }}
/>

<button
onClick={() => sendMessage()}
className="absolute right-2 p-2 bg-cyan-500 rounded-xl text-black hover:bg-white"
>
<Send size={16} />
</button>

</div>

</div>

</div>

</div>

{showWhatsapp && (

<a
href={WHATSAPP_LINK}
target="_blank"
className="fixed bottom-6 left-6 z-[9999] animate-bounce bg-green-500 text-white px-5 py-3 rounded-full shadow-lg font-bold"
>
WhatsApp
</a>

)}

</>

)

  }
