'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthContext'
import { useTheme } from '@/lib/theme'
import { motion, AnimatePresence } from 'framer-motion'
import AuthModal from '@/components/auth/AuthModal'
import { Logo } from '@/components/shared/Logo'

const navLinks = [
  { label: 'Product', href: '#what-we-do' },
  { label: 'Agentic AI', href: '#agentic-ai' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Community', href: '#community' },
  { label: 'About', href: '#why-neomagnesis' },
]

export default function Navbar() {
  const { openAuthModal, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isLight = theme === 'light'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <AuthModal />
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl border-b'
            : ''
        }`}
        style={scrolled ? {
          background: isLight ? 'rgba(245,243,237,0.88)' : 'rgba(8,9,9,0.85)',
          borderBottomColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(143,150,147,0.1)',
        } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Logo href="/" width={140} height={32} />

          {/* Center nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm rounded-lg transition-all duration-150"
                style={{
                  color: isLight ? '#737875' : '#8F9693',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = isLight ? '#171918' : '#F1EFE8'
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.color = isLight ? '#737875' : '#8F9693'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(143,150,147,0.08)',
                color: isLight ? '#737875' : '#8F9693',
                border: isLight ? 'none' : '1px solid rgba(143,150,147,0.12)',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {user ? (
              <Link href="/dashboard" className="btn-primary">
                Dashboard
              </Link>
            ) : (
              <>
                <button onClick={() => openAuthModal('signin')} className="btn-ghost">
                  Login
                </button>
                <button onClick={() => openAuthModal('signup')} className="btn-primary">
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 flex items-center justify-center transition-colors"
              style={{ color: isLight ? '#737875' : '#8F9693' }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="transition-colors"
              style={{ color: isLight ? '#737875' : '#8F9693' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden backdrop-blur-xl border-b px-4 pb-4"
              style={{
                background: isLight ? 'rgba(245,243,237,0.97)' : 'rgba(8,9,9,0.97)',
                borderBottomColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(143,150,147,0.1)',
              }}
            >
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm border-b transition-colors"
                  style={{
                    color: isLight ? '#737875' : '#8F9693',
                    borderBottomColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(143,150,147,0.06)',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 pt-4">
                <button onClick={() => { openAuthModal('signin'); setMobileOpen(false) }} className="btn-ghost flex-1 justify-center">Login</button>
                <button onClick={() => { openAuthModal('signup'); setMobileOpen(false) }} className="btn-primary flex-1 justify-center">Get Started</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
