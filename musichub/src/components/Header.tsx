'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  return (
    <nav className="flex justify-between items-center p-4 z-50 fixed w-full bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center">
        <h1 className="text-red-600 font-bold text-2xl md:text-3xl">MUSICHUB</h1>
        <button
          id="menu-toggle"
          className="md:hidden ml-4 text-white focus:outline-none"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen)
            setIsMobileSearchOpen(false)
          }}
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
        <ul className="hidden md:flex space-x-6 ml-10">
          <li><Link href="/" className="hover:text-gray-300">Início</Link></li>
          <li><Link href="/dashboard" className="hover:text-gray-300">Artistas</Link></li>
          <li><Link href="/genres" className="hover:text-gray-300">Gêneros</Link></li>
          <li><Link href="/shows" className="hover:text-gray-300">Shows</Link></li>
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:block relative">
          <input
            type="text"
            placeholder="Buscar artistas..."
            className="bg-black bg-opacity-70 border border-gray-700 rounded px-4 py-1 focus:outline-none focus:border-white w-40 lg:w-64"
          />
          <i className="fas fa-search absolute right-3 top-2 text-gray-400"></i>
        </div>
        <button
          id="search-toggle"
          className="md:hidden text-white"
          onClick={() => {
            setIsMobileSearchOpen(!isMobileSearchOpen)
            setIsMobileMenuOpen(false)
          }}
        >
          <i className="fas fa-search text-xl"></i>
        </button>
        {user ? (
          <div className="flex items-center space-x-2">
            <span>Olá, {user.email}</span>
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 md:px-4 rounded hover:bg-red-700 text-sm md:text-base">
              SAIR
            </button>
          </div>
        ) : (
          <Link href="/login" className="bg-red-600 px-3 py-1 md:px-4 rounded hover:bg-red-700 text-sm md:text-base">
            ENTRAR
          </Link>
        )}
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="absolute top-16 left-0 right-0 bg-black bg-opacity-95 py-4 px-6 md:hidden">
          <ul className="space-y-4">
            <li><Link href="/" className="block hover:text-gray-300 text-lg">Início</Link></li>
            <li><Link href="/dashboard" className="block hover:text-gray-300 text-lg">Artistas</Link></li>
            <li><Link href="/genres" className="block hover:text-gray-300 text-lg">Gêneros</Link></li>
            <li><Link href="/shows" className="block hover:text-gray-300 text-lg">Shows</Link></li>
          </ul>
        </div>
      )}

      {isMobileSearchOpen && (
        <div id="mobile-search" className="absolute top-16 left-0 right-0 bg-black bg-opacity-95 py-4 px-6 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar artistas..."
              className="bg-gray-900 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-white w-full"
            />
            <i className="fas fa-search absolute right-6 top-3 text-gray-400"></i>
          </div>
        </div>
      )}
    </nav>
  )
}
