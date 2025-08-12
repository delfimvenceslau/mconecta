'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

// Mock data for bookings - replace with data from Supabase
const bookings = [
  { id: 1, artist: 'DJ Electro', client: 'Rafael Silva', date: '15/10/2023', value: 'R$ 2.500,00', status: 'Confirmed' },
  { id: 2, artist: 'Banda RockNow', client: 'Ana Carolina', date: '22/09/2023', value: 'R$ 4.800,00', status: 'Confirmed' },
  { id: 3, artist: 'Soul Singer', client: 'Ricardo Almeida', date: '05/09/2023', value: 'R$ 3.200,00', status: 'Canceled' },
  { id: 4, artist: 'Jazz Trio', client: 'Mariana Costa', date: '12/11/2023', value: 'R$ 2.000,00', status: 'Pending' },
];

export default function ManageBookingsPage() {
  const [adminUser, setAdminUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setAdminUser(user)
      // In a real app, you would also check if the user has the 'admin' role
    }
    fetchUser()
  }, [])

  return (
    <div className="dashboard-bg text-white">
      <Header />

      <main className="pt-24 pb-12 px-4 md:px-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Manage Bookings</h2>
          {/* Add filtering options here */}
        </div>

        <div className="bg-secondary bg-opacity-10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary bg-opacity-20">
              <tr>
                <th className="p-4 text-left">Artist</th>
                <th className="p-4 text-left">Client</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Value</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-secondary">
                  <td className="p-4">{booking.artist}</td>
                  <td className="p-4">{booking.client}</td>
                  <td className="p-4">{booking.date}</td>
                  <td className="p-4">{booking.value}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'Confirmed' ? 'status-confirmed' :
                      booking.status === 'Canceled' ? 'status-canceled' : 'status-pending'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-light hover:text-primary">
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  )
}
