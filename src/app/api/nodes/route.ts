import { supabase } from '@/lib/supabaseClient'

export async function POST(req: Request) {
  const { city, user_name } = await req.json()

  const { data, error } = await supabase
    .from('digital_nodes')
    .insert([{ city, user_name }])
    .select()

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })

  return new Response(JSON.stringify(data), { status: 200 })
}
