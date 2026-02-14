import ChatBot from "@/components/ChatBot"

export default function Home() {
  return (
    <main className="min-h-screen px-6">

      {/* HERO */}
      <section className="text-center py-32 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Daniel Tech IA
        </h1>

        <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
          Engenharia de Software, Automações Inteligentes e Soluções com IA
          para transformar negócios em máquinas digitais.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 transition rounded-xl glow">
            Começar Projeto
          </button>
          <button className="px-8 py-3 border border-gray-600 hover:border-indigo-500 transition rounded-xl">
            Ver Serviços
          </button>
        </div>
      </section>

      {/* MÉTRICAS */}
      <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto py-20 text-center">
        <div>
          <h2 className="text-4xl font-bold text-indigo-400">+10</h2>
          <p className="text-gray-400 mt-2">Projetos Criados</p>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-indigo-400">100%</h2>
          <p className="text-gray-400 mt-2">Código Autorais</p>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-indigo-400">IA</h2>
          <p className="text-gray-400 mt-2">Integrações Inteligentes</p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="max-w-6xl mx-auto py-24">
        <h2 className="text-3xl font-bold text-center mb-16">
          Como Funciona
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-6 border border-gray-800 rounded-2xl hover:border-indigo-500 transition">
            <h3 className="text-xl font-semibold mb-3">1. Diagnóstico</h3>
            <p className="text-gray-400">
              Entendimento estratégico do problema e definição da melhor solução tecnológica.
            </p>
          </div>

          <div className="p-6 border border-gray-800 rounded-2xl hover:border-indigo-500 transition">
            <h3 className="text-xl font-semibold mb-3">2. Desenvolvimento</h3>
            <p className="text-gray-400">
              Construção com tecnologias modernas e arquitetura escalável.
            </p>
          </div>

          <div className="p-6 border border-gray-800 rounded-2xl hover:border-indigo-500 transition">
            <h3 className="text-xl font-semibold mb-3">3. Automação & IA</h3>
            <p className="text-gray-400">
              Integração de inteligência artificial e automações inteligentes.
            </p>
          </div>
        </div>
      </section>

      {/* CHAT */}
      <section className="py-24">
        <ChatBot />
      </section>

      {/* CTA FINAL */}
      <section className="text-center py-32">
        <h2 className="text-4xl font-bold">
          Vamos Construir Algo Grande?
        </h2>
        <p className="text-gray-400 mt-4">
          Transforme sua ideia em um sistema inteligente e escalável.
        </p>

        <button className="mt-8 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 transition rounded-xl glow text-lg">
          Iniciar Agora
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-10 text-center text-gray-500">
        © {new Date().getFullYear()} Daniel Tech IA. Todos os direitos reservados.
      </footer>

    </main>
  )
}
