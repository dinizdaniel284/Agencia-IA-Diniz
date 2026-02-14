import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();
    const meuWhats = "https://wa.me/5519992278928"; 

    let responseText = "";

    // Lógica de triagem por palavras-chave
    if (lastMessage.includes("automação") || lastMessage.includes("automatizar") || lastMessage.includes("n8n") || lastMessage.includes("bot")) {
      responseText = `Automação é um dos meus focos! Desenvolvo fluxos inteligentes com n8n e Python para otimizar processos e ganhar escala. Vamos automatizar seu negócio? Fale comigo: ${meuWhats}`;
    }
    else if (lastMessage.includes("site") || lastMessage.includes("app") || lastMessage.includes("aplicativo") || lastMessage.includes("web")) {
      responseText = `Desenvolvo Sites Web e Apps modernos, focados em performance e experiência do usuário. Gostaria de ver como podemos transformar sua ideia em realidade? ${meuWhats}`;
    } 
    else if (lastMessage.includes("valor") || lastMessage.includes("preço") || lastMessage.includes("quanto") || lastMessage.includes("custo")) {
      responseText = `Cada projeto de desenvolvimento ou automação é exclusivo. Para um orçamento preciso, fale diretamente comigo aqui: ${meuWhats}`;
    }
    else if (lastMessage.includes("bi") || lastMessage.includes("dados") || lastMessage.includes("dashboard") || lastMessage.includes("power bi")) {
      responseText = `Sou especialista em Power BI e tratamento de dados. Posso criar dashboards que mostram a saúde do seu negócio em tempo real. Chame aqui: ${meuWhats}`;
    }
    else if (lastMessage.includes("contato") || lastMessage.includes("whatsapp") || lastMessage.includes("falar")) {
      responseText = `Com certeza! Você pode falar diretamente com o Daniel pelo WhatsApp para alinhar seu projeto: ${meuWhats}`;
    }
    else {
      responseText = "Olá! Sou o consultor virtual do Daniel. Especialista em Desenvolvimento Web, Apps, BI e Automações inteligentes. Como posso elevar o nível tecnológico do seu projeto hoje?";
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({ text: responseText });
  } catch (error) {
    return NextResponse.json({ text: "Olá! Como posso ajudar você com seu projeto hoje?" });
  }
}