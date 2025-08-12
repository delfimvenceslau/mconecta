'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUpPage() {
  const [userType, setUserType] = useState('client')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          user_type: userType,
        },
      },
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Registration successful! Please check your email to verify your account.')
      router.push('/login')
    }
  }

  return (
    <div className="text-white">
      <nav className="flex justify-between items-center p-4 z-50 fixed w-full">
        <h1 className="text-red-600 font-bold text-3xl">MUSICHUB</h1>
        <Link href="/login" className="text-gray-300 hover:text-white">
          Já tem conta? <span className="text-red-400">Entrar</span>
        </Link>
      </nav>

      <main className="min-h-screen flex items-center justify-center register-bg py-16">
        <div className="max-w-md w-full mx-4 bg-black bg-opacity-80 rounded-lg overflow-hidden shadow-2xl">
          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Crie sua conta</h2>
            <p className="text-gray-400">Faça parte da maior plataforma de conexão musical</p>
          </div>

          <form className="px-8 pb-8" onSubmit={handleSignUp}>
            <div className="mb-6">
              <label htmlFor="user-type" className="block text-sm font-medium mb-2">Você é:</label>
              <select
                id="user-type"
                className="w-full select-field rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-600 text-white pr-10"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="client">Cliente (quero contratar artistas)</option>
                <option value="artist">Artista (quero me apresentar)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Nome Completo*</label>
                <input
                  type="text"
                  id="name"
                  className="w-full input-field rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Seu nome"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email*</label>
                <input
                  type="email"
                  id="email"
                  className="w-full input-field rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="seu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">Senha*</label>
                <input
                  type="password"
                  id="password"
                  className="w-full input-field rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">Confirme a Senha*</label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full input-field rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center mb-8">
              <input id="terms" type="checkbox" className="w-4 h-4 rounded bg-gray-700 border-gray-600 focus:ring-red-600" required />
              <label htmlFor="terms" className="ml-2 text-sm">
                Eu concordo com os <a href="#" className="text-red-400 hover:underline">Termos de Serviço</a> e <a href="#" className="text-red-400 hover:underline">Política de Privacidade</a>*
              </label>
            </div>

            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition duration-300 mb-4">
              Criar Conta
            </button>
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
        .register-bg {
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 100%),
            url('https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-4.0.3&id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
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
        .select-field {
          background-color: rgba(20, 20, 20, 0.8);
          border: 1px solid #333;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1.5em;
        }
      `}</style>
    </div>
  )
}
