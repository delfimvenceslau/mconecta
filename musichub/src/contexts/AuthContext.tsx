'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, metadata?: any) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth state changed:', event, session)
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    session,
    loading,
    signUp: async (email: string, password: string, metadata?: any) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata || {}
        }
      })
      return { data, error }
    },
    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    },
    signOut: async () => {
      await supabase.auth.signOut()
    },
    resetPassword: async (email: string) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      return { data, error }
    },
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
