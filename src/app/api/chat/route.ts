import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const messages = body.messages || [];

    const lastMessage =
      messages.length > 0
        ? String(messages[messages.length - 1].content).toLowerCase()
        : "";

    const meuWhats = "https://wa.me/5519992278928";

    let responseText = "";

    // AUTOMAÇÃO
    if (
      lastMessage.includes("automação") ||
      lastMessage.includes("automatizar") ||
      lastMessage.includes("n8n") ||
      lastMessage.includes("bot")
    ) {
      responseText =
        `Automação é uma das coisas que mais gera resultado hoje.

Posso criar sistemas que trabalham por você 24h:
• atendimento automático
• integração com WhatsApp
• processos rodando sozinhos

Se quiser ver como isso funcionaria no seu negócio:
${meuWhats}`;
    }

    // SITE / APP
    else if (
      lastMessage.includes("site") ||
      lastMessage.includes("app") ||
      lastMessage.includes("aplicativo") ||
      lastMessage.includes("web")
    ) {
      responseText =
        `Eu desenvolvo sites modernos focados em gerar clientes.

Não é só design bonito.
É pensado para:
• converter visitantes
• carregar rápido
• funcionar perfeito no celular

Se quiser posso te mostrar exemplos:
${meuWhats}`;
    }

    // PREÇO
    else if (
      lastMessage.includes("valor") ||
      lastMessage.includes("preço") ||
      lastMessage.includes("quanto") ||
      lastMessage.includes("custo")
    ) {
      responseText =
        `Os valores dependem do tipo de projeto.

Alguns são mais simples e outros envolvem automações ou integrações.

Se me explicar rapidamente o que você precisa consigo te passar uma ideia de investimento:
${meuWhats}`;
    }

    // DADOS / BI
    else if (
      lastMessage.includes("dados") ||
      lastMessage.includes("dashboard") ||
      lastMessage.includes("power bi") ||
      lastMessage.includes("relatório")
    ) {
      responseText =
        `Também trabalho com análise de dados e dashboards.

Isso ajuda empresas a enxergarem:
• faturamento
• clientes
• oportunidades de crescimento

Tudo em tempo real.

Se quiser conversar sobre isso:
${meuWhats}`;
    }

    // CONTATO
    else if (
      lastMessage.includes("contato") ||
      lastMessage.includes("whatsapp") ||
      lastMessage.includes("falar")
    ) {
      responseText =
        `Claro. Você pode falar diretamente comigo aqui:
${meuWhats}`;
    }

    // RESPOSTA PADRÃO
    else {
      responseText =
        `Olá! Eu sou o assistente do Daniel.

Ele trabalha com:
• criação de sites
• automações com IA
• dashboards e dados
• integração entre sistemas

O que você gostaria de criar ou melhorar no seu negócio?`;
    }

    await new Promise((resolve) => setTimeout(resolve, 900));

    return NextResponse.json({ text: responseText });

  } catch (error) {
    return NextResponse.json({
      text: "Tive um pequeno problema técnico. Mas você pode falar direto comigo aqui: https://wa.me/5519992278928",
    });
  }
}