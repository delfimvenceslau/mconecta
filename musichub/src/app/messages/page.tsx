'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import type { User } from '@supabase/supabase-js'

// Mock data - replace with data from Supabase
const conversations = [
  { id: 1, name: 'Luna Santos', lastMessage: 'Ótimo! Podemos marcar para dia 15 às 20h?', time: '15:30', avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
  { id: 2, name: 'Banda Rock Now', lastMessage: 'Enviámos a proposta para seu evento corporativo', time: 'Ontem', avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
];

const messages = [
    { id: 1, text: 'Olá Rafael! Obrigada pelo interesse no meu trabalho. Como posso te ajudar?', sender: 'Luna Santos', time: '14:20', avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { id: 2, text: 'Oi Luna! Estou organizando um casamento para dia 15/06 e adoraria te contratar para o evento. Você está disponível?', sender: 'You', time: '14:25', avatar: '' },
];

export default function MessagesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === '') return
    // In a real app, send the message to Supabase
    console.log('Sending message:', newMessage)
    setNewMessage('')
  }

  return (
    <div className="messages-bg text-white">
      <Header />

      <main className="pt-20 pb-16 px-4 sm:px-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Mensagens</h2>
          <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-180px)]">
            {/* Conversations list */}
            <div className="md:w-1/3 bg-gray-900 rounded-lg overflow-hidden flex flex-col">
              {/* Search */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map(convo => (
                  <div key={convo.id} onClick={() => setActiveConversation(convo)} className={`conversation-item flex items-center p-4 border-b border-gray-800 cursor-pointer ${activeConversation.id === convo.id ? 'active' : ''}`}>
                    <Image src={convo.avatar} alt={convo.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold">{convo.name}</h3>
                        <span className="text-xs text-gray-400">{convo.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{convo.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Messages area */}
            <div className="md:w-2/3 bg-gray-900 rounded-lg overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex items-start ${msg.sender === 'You' ? 'justify-end' : ''}`}>
                    {msg.sender !== 'You' && <Image src={msg.avatar} alt={msg.sender} width={32} height={32} className="w-8 h-8 rounded-full object-cover mr-3" />}
                    <div>
                      <div className={`${msg.sender === 'You' ? 'message-sent' : 'message-received'} px-4 py-2 max-w-xs md:max-w-md`}>
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-xs text-gray-400 mt-1 block">{msg.sender} • {msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Input */}
              <div className="p-4 border-t border-gray-800">
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Digite sua mensagem..." className="flex-1 message-input rounded-full py-2 px-4 focus:outline-none" />
                  <button type="submit" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 ml-2">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
