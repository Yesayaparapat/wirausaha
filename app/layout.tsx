import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Project Wirausaha - Login & Register',
  description: 'Website sederhana dengan fitur login dan register',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}

