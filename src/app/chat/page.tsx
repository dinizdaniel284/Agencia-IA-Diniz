"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Olá! Eu sou o agente de IA do Daniel. Posso ajudar a criar automações, sistemas ou integrações para sua empresa."
    }
  ]);

  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input) return;

    setMessages([...messages, { role: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages(m => [
        ...m,
        {
          role: "bot",
          text: "Legal. Me conta o que você quer automatizar ou fale comigo no WhatsApp: https://wa.me/5519992278928"
        }
      ]);
    }, 700);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-zinc-900 text-white rounded-2xl p-6 shadow-xl">
        <h1 className="text-xl mb-4 font-semibold">
          Assistente IA • Agência IA Diniz
        </h1>

        <div className="space-y-3 mb-4 max-h-[400px] overflow-auto">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : ""}>
              <div className="inline-block bg-zinc-800 p-3 rounded-xl">
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 p-2 rounded bg-zinc-800"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escreva sua mensagem..."
          />

          <button
            onClick={sendMessage}
            className="bg-green-600 px-4 rounded"
          >
            Enviar
          </button>
        </div>
      </div>
    </main>
  );
}
