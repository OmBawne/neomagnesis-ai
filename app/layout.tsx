import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/auth/AuthContext'
import { ThemeProvider } from '@/lib/theme'
import { BackgroundElements } from '@/components/shared/BackgroundElements'
import { ScrollProgressLine } from '@/components/ui/ScrollProgressLine'
import { CursorLight } from '@/components/ui/CursorLight'
import { LoadingSequence } from '@/components/ui/LoadingSequence'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://neomagnesis.ai'),
  title: 'Neomagnesis AI — Local-First Agentic AI Operating System',
  description:
    'Neomagnesis AI is a local-first Agentic AI Operating System engineered for sovereign hardware execution, zero cloud telemetry, and intelligent workflow orchestration.',
  applicationName: 'Neomagnesis AI',
  keywords: [
    'Neomagnesis AI',
    'Neomagnesis',
    'Local-First Agentic AI Operating System',
    'Local AI OS',
    'Autonomous Agents',
    'Local LLM Orchestration',
    'Sovereign AI',
    'Air-Gapped AI',
  ],
  authors: [{ name: 'Neomagnesis AI', url: 'https://neomagnesis.ai' }],
  creator: 'Neomagnesis AI',
  publisher: 'Neomagnesis AI',
  openGraph: {
    title: 'Neomagnesis AI — Local-First Agentic AI Operating System',
    description:
      'A local-first Agentic AI Operating System. Sovereign hardware execution, air-gapped security, and deterministic agent orchestration.',
    url: 'https://neomagnesis.ai',
    siteName: 'Neomagnesis AI',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Neomagnesis AI — Local-First Agentic AI Operating System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neomagnesis AI — Local-First Agentic AI Operating System',
    description:
      'A local-first Agentic AI Operating System. Sovereign hardware execution, air-gapped security, and deterministic agent orchestration.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://neomagnesis.ai',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://neomagnesis.ai/#software',
      name: 'Neomagnesis AI',
      alternateName: ['Neomagnesis', 'Neomagnesis OS', 'Neomagnesis Agentic AI'],
      applicationCategory: 'OperatingSystem',
      operatingSystem: 'macOS, Windows, Linux',
      description:
        'Neomagnesis AI is a local-first Agentic AI Operating System built for sovereign workflow orchestration and offline intelligence.',
      url: 'https://neomagnesis.ai',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://neomagnesis.ai/#organization',
      name: 'Neomagnesis AI',
      url: 'https://neomagnesis.ai',
      logo: 'https://neomagnesis.ai/icon.png',
      sameAs: [
        'https://discord.gg/neomagnesis',
        'https://instagram.com/neomagnesis.ai',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://neomagnesis.ai/#website',
      url: 'https://neomagnesis.ai',
      name: 'Neomagnesis AI',
      description:
        'Neomagnesis AI — Local-First Agentic AI Operating System.',
      publisher: {
        '@id': 'https://neomagnesis.ai/#organization',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#08090A] text-[#F1EFE8] antialiased">
        <ThemeProvider>
          <AuthProvider>
            <LoadingSequence />
            <ScrollProgressLine />
            <CursorLight />
            <BackgroundElements />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
