import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        luxury: {
          dark: "#020817",
          cyan: "#22d3ee",
          silver: "#94a3b8",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        montserrat: ["var(--font-montserrat)"],
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'gradient-text': 'gradient-text 5s ease infinite', // Animação Sains
        'fade-in': 'fade-in 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards', // Entrada suave
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-text': {
          '0%, 100%': { 'background-position': '0% center' },
          '50%': { 'background-position': '100% center' },
        },
        'fade-in': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;