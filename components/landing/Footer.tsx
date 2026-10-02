'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Logo } from '@/components/shared/Logo'
import { ArrowUpRight, Trash2 } from 'lucide-react'
import { DeleteRegistrationModal } from '@/components/ui/DeleteRegistrationModal'

export function Footer() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const brandRef = useRef<HTMLDivElement>(null)
  const systemRef = useRef<HTMLDivElement>(null)
  const governanceRef = useRef<HTMLDivElement>(null)
  const inquiriesRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const brandInView = useInView(brandRef, { once: true, margin: '-10%' })
  const systemInView = useInView(systemRef, { once: true, margin: '-10%' })
  const governanceInView = useInView(governanceRef, { once: true, margin: '-10%' })
  const inquiriesInView = useInView(inquiriesRef, { once: true, margin: '-10%' })
  const bottomInView = useInView(bottomRef, { once: true, margin: '-10%' })

  const prefersReduced = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  const fadeInUp = (delay = 0) => ({
    initial: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <>
      <DeleteRegistrationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />

      <footer
        className="relative py-20 lg:py-28 px-5 sm:px-8 max-w-[1200px] mx-auto border-t border-[#2A2D2C]"
        aria-label="Site footer"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand Column */}
          <motion.div
            ref={brandRef}
            {...fadeInUp(0)}
            className="md:col-span-5 space-y-6"
          >
            <Logo height={30} href="/" />
            <p className="text-sm sm:text-base text-[#D4DDD8] leading-relaxed max-w-sm font-normal">
              The Local-First Agentic AI Operating System. Sovereign intelligence, privacy by design, and timeless craftsmanship.
            </p>
            <div className="flex flex-col gap-1.5 text-xs font-mono text-[#D4DDD8]">
              <span className="text-[#FAF8F5] font-semibold">Public Early Access Launch</span>
              <a
                href="mailto:neomagnesisai@gmail.com"
                className="text-[#D4DDD8] hover:text-[#FFAE70] transition-colors"
              >
                neomagnesisai@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Navigation & Documentation */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* System */}
            <motion.div ref={systemRef} {...fadeInUp(0.05)}>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#FAF8F5] mb-4 font-semibold">
                System
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm" role="list">
                <li>
                  <Link href="/legal#about" className="text-[#D4DDD8] hover:text-[#FAF8F5] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <a href="#philosophy" className="text-[#D4DDD8] hover:text-[#FAF8F5] transition-colors">
                    Philosophy
                  </a>
                </li>
                <li>
                  <a href="#why-local-first" className="text-[#D4DDD8] hover:text-[#FAF8F5] transition-colors">
                    Local-First Architecture
                  </a>
                </li>
                <li>
                  <a href="#roadmap" className="text-[#D4DDD8] hover:text-[#FAF8F5] transition-colors">
                    Updates & Roadmap
                  </a>
                </li>
                <li>
                  <a href="#early-access" className="text-[#FFAE70] hover:text-[#FAF8F5] transition-colors font-medium">
                    Early Access Program
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Governance & Trust */}
            <motion.div ref={governanceRef} {...fadeInUp(0.1)}>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#FAF8F5] mb-4 font-semibold">
                Governance
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm" role="list">
                <li>
                  <Link href="/legal#privacy" className="text-[#D4DDD8] hover:text-[#FAF8F5] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal#terms" className="text-[#D4DDD8] hover:text-[#FAF8F5] transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/legal#cookies" className="text-[#D4DDD8] hover:text-[#FAF8F5] transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal#security" className="text-[#D4DDD8] hover:text-[#FAF8F5] transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/legal#ai-transparency" className="text-[#D4DDD8] hover:text-[#FAF8F5] transition-colors">
                    AI Transparency
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Inquiries & Rights */}
            <motion.div ref={inquiriesRef} {...fadeInUp(0.15)}>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#FAF8F5] mb-4 font-semibold">
                Inquiries & Rights
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm" role="list">
                <li>
                  <a href="mailto:neomagnesisai@gmail.com" className="text-[#D4DDD8] hover:text-[#FAF8F5] transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/neomagnesis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4DDD8] hover:text-[#FAF8F5] transition-colors inline-flex items-center gap-1"
                  >
                    Discord Community
                    <ArrowUpRight size={12} className="opacity-70" />
                  </a>
                </li>
                <li className="pt-2">
                  <motion.button
                    onClick={() => setDeleteModalOpen(true)}
                    whileHover={{ x: 2 }}
                    whileTap={{ x: 0, scale: 0.98 }}
                    className="inline-flex items-center gap-1.5 text-xs text-[#D4DDD8] hover:text-[#E07A74] transition-colors cursor-pointer"
                    aria-label="Delete Early Access registration"
                  >
                    <Trash2 size={12} />
                    <span>Delete Registration</span>
                  </motion.button>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          ref={bottomRef}
          {...fadeInUp(0.2)}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#D4DDD8] border-t border-[#2A2D2C]/80"
        >
          <div>&copy; {new Date().getFullYear()} Neomagnesis AI. All rights reserved.</div>
          <div className="flex items-center gap-4 text-xs text-[#D4DDD8]">
            <span>Local-First OS</span>
            <span>&middot;</span>
            <span>Zero Data Brokerage</span>
            <span>&middot;</span>
            <span>Sovereign Compute</span>
          </div>
        </motion.div>
      </footer>
    </>
  )
}

export default Footer