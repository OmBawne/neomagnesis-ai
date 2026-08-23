'use client'

import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import { ArrowUpRight } from 'lucide-react'

interface FooterLinkItem {
  label: string
  href: string
  external?: boolean
}

const footerLinks: Record<string, FooterLinkItem[]> = {
  Platform: [
    { label: 'Capabilities', href: '#what-we-do' },
    { label: 'Agentic Loop', href: '#agentic-ai' },
    { label: 'Workflow Engine', href: '#automation' },
    { label: 'Interface Telemetry', href: '#showcase' },
    { label: 'Use Cases', href: '#use-cases' },
  ],
  Company: [
    { label: 'Philosophy', href: '#why-neomagnesis' },
    { label: 'Community', href: '#community' },
    { label: 'Careers', href: '#hiring' },
    { label: 'Discord', href: 'https://discord.gg/neomagnesis', external: true },
    { label: 'Instagram', href: 'https://instagram.com/neomagnesis.ai', external: true },
  ],
  Governance: [
    { label: 'Privacy Policy', href: '/legal' },
    { label: 'Terms of Service', href: '/legal' },
    { label: 'Security & Privacy', href: '/legal' },
    { label: 'Contact Engineering', href: 'mailto:neomagnesisai@gmail.com' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(143,150,147,0.12)] pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand Column (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <Logo width={140} height={32} href="/" />
          <p className="text-sm text-[#8F9693] leading-relaxed max-w-sm pt-2">
            The sovereign operating system for autonomous workflows. Reason over complex intent, coordinate tools dynamically, and execute with deterministic precision.
          </p>
          <div className="pt-2 text-xs font-mono text-[#8F9693]">
            Direct inquiries: <a href="mailto:neomagnesisai@gmail.com" className="text-[#D8D6CF] hover:underline">neomagnesisai@gmail.com</a>
          </div>
        </div>

        {/* Links Columns (7 cols) */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#8F9693] mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/legal') ? (
                      <Link
                        href={link.href}
                        className="text-xs text-[#8F9693] hover:text-[#F1EFE8] transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-xs text-[#8F9693] hover:text-[#F1EFE8] transition-colors inline-flex items-center gap-1"
                      >
                        {link.label}
                        {link.external && <ArrowUpRight size={11} className="opacity-70" />}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="pt-8 border-t border-[rgba(143,150,147,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8F9693]">
        <div>&copy; {new Date().getFullYear()} Neomagnesis AI. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span>Encrypted Architecture</span>
          <span>·</span>
          <span>Zero Data Training</span>
        </div>
      </div>
    </footer>
  )
}
