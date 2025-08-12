'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

export default function AdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      // In a real app, you would also check if the user has the 'admin' role
    }
    fetchUser()
  }, [])

  // Fetch admin-specific data from Supabase in a real app

  return (
    <div className="dashboard-bg text-white">
      <Header />

      <main className="pt-24 pb-12 px-4 md:px-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <div>
            <Link href="/admin/users" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm mr-4">
              <i className="fas fa-users mr-2"></i>Manage Users
            </Link>
            <Link href="/admin/bookings" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-sm">
              <i className="fas fa-calendar-check mr-2"></i>Manage Bookings
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary bg-opacity-20 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-light text-sm">Total Users</p>
                <h3 className="text-2xl font-bold mt-2">1,250</h3>
              </div>
              <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full">
                <i className="fas fa-users text-blue-500"></i>
              </div>
            </div>
          </div>
          <div className="bg-secondary bg-opacity-20 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-light text-sm">Total Bookings</p>
                <h3 className="text-2xl font-bold mt-2">5,678</h3>
              </div>
              <div className="bg-purple-500 bg-opacity-20 p-3 rounded-full">
                <i className="fas fa-calendar-check text-purple-500"></i>
              </div>
            </div>
          </div>
          <div className="bg-secondary bg-opacity-20 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-light text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-2">R$ 1,250,000.00</h3>
              </div>
              <div className="bg-green-500 bg-opacity-20 p-3 rounded-full">
                <i className="fas fa-dollar-sign text-green-500"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-secondary bg-opacity-10 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-secondary bg-secondary bg-opacity-20 font-semibold">
            Recent Activity
          </div>
          {/* Activity items will be dynamically loaded here */}
        </div>
      </main>

      <Footer />
    </div>
  )
}
