'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

// Mock data for users - replace with data from Supabase
const users = [
  { id: 1, name: 'Rafael Silva', email: 'rafael@exemplo.com', type: 'Client', status: 'Active' },
  { id: 2, name: 'Luna Santos', email: 'luna@exemplo.com', type: 'Artist', status: 'Active' },
  { id: 3, name: 'DJ Electro', email: 'dj@exemplo.com', type: 'Artist', status: 'Inactive' },
  { id: 4, name: 'Ana Carolina', email: 'ana@exemplo.com', type: 'Client', status: 'Active' },
];

export default function ManageUsersPage() {
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
          <h2 className="text-3xl font-bold">Manage Users</h2>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full text-sm">
            <i className="fas fa-plus mr-2"></i>Add User
          </button>
        </div>

        <div className="bg-secondary bg-opacity-10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary bg-opacity-20">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-secondary">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.type}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'Active' ? 'status-confirmed' : 'status-canceled'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-light hover:text-primary mr-4">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="text-light hover:text-red-500">
                      <i className="fas fa-trash"></i>
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
