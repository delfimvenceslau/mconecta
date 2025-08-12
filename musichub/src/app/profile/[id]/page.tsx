'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Mock data for a single artist - replace with data from Supabase
const artist = {
  id: 1,
  name: 'Luna Santos',
  genre: 'POP',
  location: 'São Paulo, SP',
  rating: 4.9,
  reviews: 128,
  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  bio: 'Cantora e compositora paulistana com mais de 50 milhões de streams em suas músicas. Luna traz um show energético que mistura seu repertório autoral com versões especiais de sucessos do POP nacional e internacional.',
  styles: ['POP', 'MPB', 'R&B'],
  acting: 'Todo Brasil (viagens inclusas no preço para eventos acima de R$ 10.000)',
  priceRange: 'R$ 5.000 - R$ 15.000 (varia conforme localização e duração)',
  formation: 'Solo (com playback) ou banda completa (4 músicos)',
  showDescription: 'Show com duração de 60 a 120 minutos, incluindo: Repertório autoral (10 músicas), Covers especiais de artistas como Anitta, Ludmilla e Dua Lipa, Interação com o público, Equipamento de som básico incluído, 1 técnico de som',
  technicalRequirements: 'Palco mínimo de 4x3 metros, Tomadas 220V próximas ao palco, Espaço para camarim (para shows com banda), Estacionamento para 1 carro (solo) ou 2 carros (banda)',
  gallery: [
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  ]
};

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('sobre')
  const router = useRouter()

  // Fetch artist data from Supabase based on params.id in a real app

  return (
    <div className="profile-bg text-white">
      <Header />

      <div className="pt-20 pb-10 px-4 sm:px-10 artist-header">
        {/* Artist Header */}
      </div>

      <main className="py-8 px-4 sm:px-10">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              {/* Tabs */}
              <div className="flex space-x-4 border-b border-gray-700 mt-4">
                <button className={`tab-button pb-3 px-1 ${activeTab === 'sobre' ? 'active' : 'text-gray-400'}`} onClick={() => setActiveTab('sobre')}>Sobre</button>
                <button className={`tab-button pb-3 px-1 ${activeTab === 'galeria' ? 'active' : 'text-gray-400'}`} onClick={() => setActiveTab('galeria')}>Fotos/Vídeos</button>
                <button className={`tab-button pb-3 px-1 ${activeTab === 'avaliacoes' ? 'active' : 'text-gray-400'}`} onClick={() => setActiveTab('avaliacoes')}>Avaliações</button>
                <button className={`tab-button pb-3 px-1 ${activeTab === 'agenda' ? 'active' : 'text-gray-400'}`} onClick={() => setActiveTab('agenda')}>Agenda</button>
              </div>

              {/* Tab Content */}
              <div className="mt-8">
                {activeTab === 'sobre' && (
                  <section id="sobre" className="tab-content active mb-12">
                    {/* About section content */}
                  </section>
                )}
                {activeTab === 'galeria' && (
                  <section id="galeria" className="tab-content active mb-12">
                    {/* Gallery section content */}
                  </section>
                )}
                {activeTab === 'avaliacoes' && (
                  <section id="avaliacoes" className="tab-content active mb-12">
                    {/* Reviews section content */}
                  </section>
                )}
                {activeTab === 'agenda' && (
                  <section id="agenda" className="tab-content active mb-12">
                    {/* Agenda section content */}
                  </section>
                )}
              </div>
            </div>
            <div className="lg:w-1/3">
              {/* Sidebar with booking form */}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
