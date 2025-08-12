'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { User } from '@supabase/supabase-js'

// Mock data for a single artist - replace with data from Supabase
const artist = {
  id: 1,
  name: 'Luna Santos',
  genre: 'POP',
  location: 'São Paulo, SP',
  bio: 'Cantora e compositora paulistana com mais de 50 milhões de streams em suas músicas. Luna traz um show energético que mistura seu repertório autoral com versões especiais de sucessos do POP nacional e internacional.',
  styles: ['POP', 'MPB', 'R&B'],
  priceRange: 'R$ 5.000 - R$ 15.000',
};

export default function EditProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState(artist.name)
  const [genre, setGenre] = useState(artist.genre)
  const [location, setLocation] = useState(artist.location)
  const [bio, setBio] = useState(artist.bio)
  const [styles, setStyles] = useState(artist.styles.join(', '))
  const [priceRange, setPriceRange] = useState(artist.priceRange)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      // In a real app, fetch artist data from Supabase and set the state
    }
    fetchUser()
  }, [])

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, update the artist's profile in Supabase
    alert('Profile updated successfully!')
  }

  return (
    <div className="dashboard-bg text-white">
      <Header />

      <main className="pt-24 pb-12 px-4 md:px-12">
        <h2 className="text-3xl font-bold mb-8">Edit Profile</h2>

        <form onSubmit={handleProfileUpdate} className="bg-secondary bg-opacity-20 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full input-field rounded py-3 px-4" />
            </div>
            <div>
              <label htmlFor="genre" className="block text-sm font-medium mb-2">Main Genre</label>
              <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full input-field rounded py-3 px-4" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
              <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full input-field rounded py-3 px-4" />
            </div>
            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium mb-2">Price Range</label>
              <input type="text" id="priceRange" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full input-field rounded py-3 px-4" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="styles" className="block text-sm font-medium mb-2">Styles (comma separated)</label>
              <input type="text" id="styles" value={styles} onChange={(e) => setStyles(e.target.value)} className="w-full input-field rounded py-3 px-4" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="bio" className="block text-sm font-medium mb-2">Bio</label>
              <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="w-full input-field rounded py-3 px-4 h-32"></textarea>
            </div>
          </div>

          <div className="mt-8">
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition duration-300">
              Save Changes
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
