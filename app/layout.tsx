import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/auth/AuthContext'
import { ThemeProvider } from '@/lib/theme'
import { BackgroundElements } from '@/components/shared/BackgroundElements'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: "Neomagnesis AI — Intelligent Automation That Thinks",
  description:
    'Neomagnesis is an intelligent system that can reason, plan, and execute. Build agentic AI workflows for YouTube, Discord, lead generation, and business operations.',
  keywords: 'AI automation, agentic AI, workflow automation, intelligent automation, Neomagnesis AI',
  openGraph: {
    title: "Neomagnesis AI",
    description: "AI that thinks. Workflows that execute.",
    type: 'website',
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },

}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-ink-black text-ink-ivory antialiased transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <BackgroundElements />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
