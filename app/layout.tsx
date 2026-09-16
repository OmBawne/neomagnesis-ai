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
  title: 'Neomagnesis AI | Local-First Agentic AI Operating System',
  description:
    'Neomagnesis AI is a premium local-first Agentic AI Operating System built for intelligent workflow automation.',
  applicationName: 'Neomagnesis AI',
  keywords: [
    'Neomagnesis AI',
    'Neomagnesis',
    'Local-First Agentic AI',
    'Agentic AI Operating System',
    'AI Workflow Automation',
    'Autonomous Agents',
    'Intelligent Automation',
    'Local AI OS',
  ],
  authors: [{ name: 'Neomagnesis AI', url: 'https://neomagnesis.ai' }],
  creator: 'Neomagnesis AI',
  publisher: 'Neomagnesis AI',
  openGraph: {
    title: 'Neomagnesis AI',
    description:
      'Neomagnesis AI is a premium local-first Agentic AI Operating System built for intelligent workflow automation.',
    url: 'https://neomagnesis.ai',
    siteName: 'Neomagnesis AI',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Neomagnesis AI Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neomagnesis AI',
    description:
      'Neomagnesis AI is a premium local-first Agentic AI Operating System built for intelligent workflow automation.',
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
      { url: '/icon.png', type: 'image/png' },
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
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Windows, macOS',
      description:
        'Neomagnesis AI is a premium local-first Agentic AI Operating System built for intelligent workflow automation.',
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
        'Neomagnesis AI is a premium local-first Agentic AI Operating System built for intelligent workflow automation.',
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
      <body className="bg-ink-bg text-ink-ivory antialiased">
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

