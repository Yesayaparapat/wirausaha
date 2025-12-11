'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/lib/auth'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Jika sudah login, redirect ke dashboard
    if (authService.isAuthenticated()) {
      router.push('/dashboard')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Selamat Datang
        </h1>
        <p className="text-gray-600 mb-8">
          Silakan login atau daftar untuk melanjutkan
        </p>
        
        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Login
          </Link>
          
          <Link
            href="/register"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Daftar
          </Link>
        </div>
      </div>
    </div>
  )
}

