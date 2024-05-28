import { createClient } from '@supabase/supabase-js'
//TODO: Configurar botão de sigin-out e estado do botão logado
const SUPABASE_URL = process.env['SUPABASE_URL'] || ''
const SUPABASE_KEY = process.env['SUPABASE_SERVICE_ROLE'] || ''
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)

export async function signOut() {
  const { error } = await supabaseClient.auth.signOut()
  return error
}
