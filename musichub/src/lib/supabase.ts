import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!supabaseAnonKey) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create Supabase client with enhanced configuration
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Configure authentication settings
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web',
    },
  },
})

// Export types for better TypeScript support
export type Database = {
  public: {
    Tables: {
      // Add your table types here as you create them
      // Example:
      // users: {
      //   Row: {
      //     id: string
      //     email: string
      //     created_at: string
      //   }
      // }
    }
  }
}

export default supabase
