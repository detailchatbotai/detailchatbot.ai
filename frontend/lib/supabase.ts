import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helper functions
export const auth = {
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password })
  },
  
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password })
  },
  
  signOut: async () => {
    return await supabase.auth.signOut()
  },
  
  getUser: async () => {
    return await supabase.auth.getUser()
  },
  
  getSession: async () => {
    return await supabase.auth.getSession()
  }
}