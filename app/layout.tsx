import { ToastProvider } from '@/providers/toast-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'
import AuthProvider from '@/providers/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Edato',
  description: 'Edato is data collect software for small and medium  Businesses .',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider />
        {children}
      </ThemeProvider>
      </AuthProvider>
      </body>
    </html>
  )
}
