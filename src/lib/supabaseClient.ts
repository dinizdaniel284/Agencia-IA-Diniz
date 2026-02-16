import { createClient } from '@supabase/supabase-js'

// Pegamos as variáveis
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// PROTEÇÃO PARA O BUILD: 
// Se as variáveis não existirem (comum no momento do build da Vercel), 
// passamos uma string vazia ou placeholder para o compilador não crashar.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
)