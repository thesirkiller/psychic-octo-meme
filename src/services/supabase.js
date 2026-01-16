import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('CRITICAL: Supabase environment variables are missing!', {
        urlLength: supabaseUrl?.length || 0,
        keyLength: supabaseAnonKey?.length || 0
    })
}

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : { auth: { onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }), getSession: async () => ({ data: { session: null } }) } }
