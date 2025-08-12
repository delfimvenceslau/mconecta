'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

export default function ArtistDashboardPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  // Fetch artist-specific data from Supabase in a real app

  return (
    <div className="dashboard-bg text-white">
      <Header />

      <main className="pt-24 pb-12 px-4 md:px-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Artist Dashboard</h2>
          <Link href="/artist/profile/edit" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm">
            <i className="fas fa-edit mr-2"></i>Edit Profile
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary bg-opacity-20 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-light text-sm">Total Earnings</p>
                <h3 className="text-2xl font-bold mt-2">R$ 25.000,00</h3>
              </div>
              <div className="bg-green-500 bg-opacity-20 p-3 rounded-full">
                <i className="fas fa-dollar-sign text-green-500"></i>
              </div>
            </div>
          </div>
          <div className="bg-secondary bg-opacity-20 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-light text-sm">Upcoming Bookings</p>
                <h3 className="text-2xl font-bold mt-2">5</h3>
              </div>
              <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full">
                <i className="fas fa-calendar-check text-blue-500"></i>
              </div>
            </div>
          </div>
          <div className="bg-secondary bg-opacity-20 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-light text-sm">Total Bookings</p>
                <h3 className="text-2xl font-bold mt-2">50</h3>
              </div>
              <div className="bg-purple-500 bg-opacity-20 p-3 rounded-full">
                <i className="fas fa-check-circle text-purple-500"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Bookings List */}
        <div className="bg-secondary bg-opacity-10 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-secondary bg-secondary bg-opacity-20 font-semibold">
            Upcoming Bookings
          </div>
          {/* Booking items will be dynamically loaded here */}
        </div>
      </main>

      <Footer />
    </div>
  )
}
