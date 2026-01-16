import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// DIAGNÓSTICO DE PRODUÇÃO (Seguro)
console.log('--- Supabase Init Check ---')
console.log('URL definida:', !!supabaseUrl)
if (supabaseUrl) console.log('URL inicia com:', supabaseUrl.substring(0, 10) + '...')
console.log('Key definida:', !!supabaseAnonKey)
if (supabaseAnonKey) console.log('Key termina com:', '...' + supabaseAnonKey.substring(supabaseAnonKey.length - 5))
console.log('---------------------------')

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('CRITICAL: Supabase environment variables are missing!', {
        urlLength: supabaseUrl?.length || 0,
        keyLength: supabaseAnonKey?.length || 0
    })
}

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : { auth: { onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }), getSession: async () => ({ data: { session: null } }) } }
