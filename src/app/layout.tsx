import './globals.css'
import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['800', '900'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: "Agência IA Diniz | Soluções com Inteligência Artificial",
  description:
    "Plataforma moderna de soluções com Inteligência Artificial voltada para automação, geração de conteúdo estratégico e escalabilidade digital.",
  openGraph: {
    title: "Agência IA Diniz",
    description:
      "Automação, IA, SaaS e soluções inteligentes para empresas que querem escalar.",
    url: "https://agencia-ia-diniz.vercel.app/",
    siteName: "Agência IA Diniz",
    images: [
      {
        url: "https://agencia-ia-diniz.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={cn(inter.variable, montserrat.variable, "font-sans antialiased")}>

        {/* Background Luxuoso com Nebulosas */}
        <div className="fixed inset-0 -z-10 bg-[#020817]">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-900/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 blur-[150px] rounded-full" />
        </div>

        {children}

      </body>
    </html>
  )
}
