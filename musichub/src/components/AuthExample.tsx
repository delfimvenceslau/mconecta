'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export function AuthExample() {
  const { user, session, loading, signUp, signIn, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      if (isLogin) {
        const { error } = await signIn(email, password)
        if (error) {
          setError(error.message)
        } else {
          setSuccess('Signed in successfully!')
        }
      } else {
        const { error } = await signUp(email, password)
        if (error) {
          setError(error.message)
        } else {
          setSuccess('Signed up successfully! Check your email to verify your account.')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setSuccess('Signed out successfully!')
    } catch (err) {
      setError('Error signing out')
    }
  }

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  if (user) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
        <div className="mb-4">
          <p className="text-gray-700">Email: {user.email}</p>
          <p className="text-gray-700">User ID: {user.id}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? 'Sign In' : 'Sign Up'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 text-sm bg-green-50 p-3 rounded">
            {success}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:text-blue-600 text-sm"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  )
}
