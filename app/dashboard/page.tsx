'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authService, User } from '@/lib/auth'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    
    if (!currentUser) {
      router.push('/login')
    } else {
      setUser(currentUser)
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    authService.logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Memuat...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Selamat datang kembali!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Informasi Akun
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Nama:</span>
                  <p className="text-lg text-gray-800">{user.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <p className="text-lg text-gray-800">{user.email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">ID:</span>
                  <p className="text-sm text-gray-500 font-mono">{user.id}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Catatan:</strong> Data disimpan di localStorage browser Anda. 
                Data tidak akan tersinkronisasi antar device atau browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

