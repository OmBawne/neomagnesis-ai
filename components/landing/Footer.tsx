'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import { ArrowUpRight, Trash2 } from 'lucide-react'
import { DeleteRegistrationModal } from '@/components/ui/DeleteRegistrationModal'

export function Footer() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

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
          <div className="md:col-span-5 space-y-6">
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
          </div>

          {/* Navigation & Documentation */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* System */}
            <div>
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
                    Updates &amp; Roadmap
                  </a>
                </li>
                <li>
                  <a href="#early-access" className="text-[#FFAE70] hover:text-[#FAF8F5] transition-colors font-medium">
                    Early Access Program
                  </a>
                </li>
              </ul>
            </div>

            {/* Governance & Trust */}
            <div>
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
                    Terms &amp; Conditions
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
            </div>

            {/* Inquiries & Rights */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#FAF8F5] mb-4 font-semibold">
                Inquiries &amp; Rights
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
                  <button
                    onClick={() => setDeleteModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#D4DDD8] hover:text-[#E07A74] transition-colors cursor-pointer"
                    aria-label="Delete Early Access registration"
                  >
                    <Trash2 size={12} />
                    <span>Delete Registration</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
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
        </div>
      </footer>
    </>
  )
}

export default Footer