import { supabase } from './supabase'
import { AuthError, User, Session } from '@supabase/supabase-js'

export interface AuthResult {
  user?: User | null
  session?: Session | null
  error?: AuthError | null
}

// Sign up with email and password
export async function signUp(email: string, password: string, metadata?: any): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata || {}
      }
    })

    if (error) {
      console.error('Sign up error:', error)
      return { error }
    }

    return { user: data.user, session: data.session }
  } catch (error) {
    console.error('Sign up exception:', error)
    return { error: error as AuthError }
  }
}

// Sign in with email and password
export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Sign in error:', error)
      return { error }
    }

    return { user: data.user, session: data.session }
  } catch (error) {
    console.error('Sign in exception:', error)
    return { error: error as AuthError }
  }
}

// Sign out
export async function signOut(): Promise<{ error?: AuthError }> {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Sign out error:', error)
      return { error }
    }

    return {}
  } catch (error) {
    console.error('Sign out exception:', error)
    return { error: error as AuthError }
  }
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

// Get current session
export async function getCurrentSession(): Promise<Session | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Get current session error:', error)
    return null
  }
}

// Reset password
export async function resetPassword(email: string): Promise<{ error?: AuthError }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      console.error('Reset password error:', error)
      return { error }
    }

    return {}
  } catch (error) {
    console.error('Reset password exception:', error)
    return { error: error as AuthError }
  }
}

// Update password
export async function updatePassword(newPassword: string): Promise<{ error?: AuthError }> {
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      console.error('Update password error:', error)
      return { error }
    }

    return {}
  } catch (error) {
    console.error('Update password exception:', error)
    return { error: error as AuthError }
  }
}

// Update user metadata
export async function updateUserMetadata(metadata: any): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: metadata
    })

    if (error) {
      console.error('Update user metadata error:', error)
      return { error }
    }

    return { user: data.user }
  } catch (error) {
    console.error('Update user metadata exception:', error)
    return { error: error as AuthError }
  }
}
