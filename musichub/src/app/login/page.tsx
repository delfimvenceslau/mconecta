'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="text-white">
      <nav className="flex justify-between items-center p-4 z-50 fixed w-full">
        <h1 className="text-red-600 font-bold text-3xl">MUSICHUB</h1>
      </nav>

      <main className="min-h-screen flex items-center justify-center login-bg">
        <div className="max-w-md w-full mx-4 bg-black bg-opacity-80 rounded-lg overflow-hidden shadow-2xl">
          <div className="p-8 text-center border-b border-gray-800">
            <h2 className="text-3xl font-bold mb-2">Bem-vindo de volta</h2>
            <p className="text-gray-400">Acesse sua conta para contratar os melhores artistas</p>
          </div>

          <form className="p-8 pt-6" onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full input-field rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="fas fa-envelope absolute right-3 top-3.5 text-gray-500"></i>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2">Senha</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full input-field rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="fas fa-lock absolute right-3 top-3.5 text-gray-500"></i>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="w-4 h-4 rounded bg-gray-700 border-gray-600 focus:ring-red-600" />
                <label htmlFor="remember" className="ml-2 text-sm">Lembrar de mim</label>
              </div>
              <a href="#" className="text-sm text-red-400 hover:underline">Esqueceu a senha?</a>
            </div>

            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition duration-300 mb-4">
              Entrar
            </button>

            <div className="text-center text-sm text-gray-400">
              Novo na MusicHub?{' '}
              <Link href="/signup" className="text-red-400 hover:underline">
                Cadastre-se agora
              </Link>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-black py-8 px-10 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p>© 2023 MusicHub. Todos os direitos reservados.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-gray-300">Termos de Uso</a>
            <a href="#" className="hover:text-gray-300">Privacidade</a>
            <a href="#" className="hover:text-gray-300">Cookies</a>
            <a href="#" className="hover:text-gray-300">Contato</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .login-bg {
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 100%),
            url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
          background-size: cover;
          background-position: center;
        }
        .input-field {
          background-color: rgba(20, 20, 20, 0.8);
          border: 1px solid #333;
        }
        .input-field:focus {
          border-color: #e50914;
        }
      `}</style>
    </div>
  )
}
