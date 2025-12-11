'use client'

export interface User {
  id: string
  email: string
  name: string
  password: string
}

const STORAGE_KEY = 'wirausaha_users'
const CURRENT_USER_KEY = 'wirausaha_current_user'

export const authService = {
  // Register user baru
  register: (name: string, email: string, password: string): { success: boolean; message: string } => {
    if (typeof window === 'undefined') {
      return { success: false, message: 'Server-side tidak didukung' }
    }

    // Validasi input
    if (!name || !email || !password) {
      return { success: false, message: 'Semua field harus diisi' }
    }

    if (password.length < 6) {
      return { success: false, message: 'Password minimal 6 karakter' }
    }

    // Cek apakah email sudah terdaftar
    const users = authService.getAllUsers()
    const existingUser = users.find((u: User) => u.email === email)
    
    if (existingUser) {
      return { success: false, message: 'Email sudah terdaftar' }
    }

    // Buat user baru
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password, // Dalam production, password harus di-hash
    }

    // Simpan ke localStorage
    users.push(newUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))

    return { success: true, message: 'Registrasi berhasil!' }
  },

  // Login user
  login: (email: string, password: string): { success: boolean; message: string; user?: User } => {
    if (typeof window === 'undefined') {
      return { success: false, message: 'Server-side tidak didukung' }
    }

    if (!email || !password) {
      return { success: false, message: 'Email dan password harus diisi' }
    }

    const users = authService.getAllUsers()
    const user = users.find((u: User) => u.email === email && u.password === password)

    if (!user) {
      return { success: false, message: 'Email atau password salah' }
    }

    // Simpan user yang sedang login
    const { password: _, ...userWithoutPassword } = user
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))

    return { success: true, message: 'Login berhasil!', user: userWithoutPassword as User }
  },

  // Logout
  logout: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(CURRENT_USER_KEY)
  },

  // Get current user
  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null
    
    const userStr = localStorage.getItem(CURRENT_USER_KEY)
    if (!userStr) return null

    try {
      return JSON.parse(userStr) as User
    } catch {
      return null
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return authService.getCurrentUser() !== null
  },

  // Get all users (untuk debugging/testing)
  getAllUsers: (): User[] => {
    if (typeof window === 'undefined') return []
    
    const usersStr = localStorage.getItem(STORAGE_KEY)
    if (!usersStr) return []

    try {
      return JSON.parse(usersStr) as User[]
    } catch {
      return []
    }
  },
}

