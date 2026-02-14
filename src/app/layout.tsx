import './globals.css'

import { Inter, Montserrat } from 'next/font/google'

import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const montserrat = Montserrat({

subsets: ['latin'],

weight: ['800', '900'],

variable: '--font-montserrat'

})

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
