'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

// Mock data for artists - replace with data from Supabase
const artists = [
  {
    id: 1,
    name: 'Luna Santos',
    genre: 'POP',
    location: 'São Paulo',
    price: 8500,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    isFavorite: true,
  },
  {
    id: 2,
    name: 'DJ Electro',
    genre: 'Eletrônico',
    location: 'Rio de Janeiro',
    price: 7800,
    rating: 4.8,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    isFavorite: false,
  },
  {
    id: 3,
    name: 'Duo Raiz',
    genre: 'Sertanejo',
    location: 'Minas Gerais',
    price: 6500,
    rating: 4.9,
    reviews: 152,
    image: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2013&q=80',
    isFavorite: true,
  },
  {
    id: 4,
    name: 'Rock Now',
    genre: 'Rock',
    location: 'São Paulo',
    price: 5200,
    rating: 4.8,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    isFavorite: true,
  },
  {
    id: 5,
    name: 'MC Flow',
    genre: 'Hip Hop',
    location: 'Rio de Janeiro',
    price: 4900,
    rating: 4.5,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    isFavorite: false,
  },
];

export default function DashboardPage() {
  const [artistName, setArtistName] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('')

  return (
    <div className="dashboard-bg text-white">
      <Header />

      <div className="pt-24 px-4 sm:px-10">
        <div className="container mx-auto mb-8">
          {/* Search and filter UI */}
        </div>
      </div>

      <main className="pb-16 px-4 sm:px-10">
        <div className="container mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Artistas em destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.slice(0, 3).map((artist) => (
              <div key={artist.id} className="relative h-64 rounded-xl overflow-hidden group">
                <Image src={artist.image} alt={artist.name} layout="fill" objectFit="cover" className="group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{artist.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-xs bg-gray-800 px-2 py-0.5 rounded mr-2">{artist.genre}</span>
                        <span className="text-xs text-gray-300">{artist.location}</span>
                      </div>
                    </div>
                    <span className="price-tag px-3 py-1 rounded text-sm font-bold">
                      R$ {artist.price.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-60 rounded-full w-8 h-8 flex items-center justify-center">
                  <i className={`fas fa-heart ${artist.isFavorite ? 'text-red-500' : 'text-gray-300'}`}></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Resultados ({artists.length} artistas)</h2>
            {/* Sorting UI */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artists.map((artist) => (
              <div key={artist.id} className="artist-card relative rounded-lg overflow-hidden group bg-gray-800">
                <Image src={artist.image} alt={artist.name} width={500} height={300} objectFit="cover" className="w-full h-48 object-cover group-hover:brightness-110 transition" />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold">{artist.name}</h4>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        <span>{artist.location}</span>
                      </div>
                    </div>
                    <span className="price-tag text-xs px-2 py-1 rounded">
                      R$ {artist.price.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <i className="fas fa-star text-yellow-400 text-xs mr-1"></i>
                      <span className="text-xs">{artist.rating} ({artist.reviews})</span>
                    </div>
                    <Link href={`/profile/${artist.id}`} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition">
                      Ver detalhes
                    </Link>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 rounded-full w-8 h-8 flex items-center justify-center">
                  <i className={`fas fa-heart ${artist.isFavorite ? 'text-red-500' : 'text-gray-300'}`}></i>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination UI */}
        </div>
      </main>

      <Footer />
    </div>
  )
}
