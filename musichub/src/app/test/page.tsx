'use client'

import { AuthExample } from '@/components/AuthExample'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Supabase Authentication Test
        </h1>
        <AuthExample />
      </div>
    </div>
  )
}
