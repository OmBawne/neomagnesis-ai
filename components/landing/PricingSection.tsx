'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Key, CheckCircle2 } from 'lucide-react'

const foundingPerks = [
  'Priority access to private alpha and beta desktop builds',
  'Founding Member status with unique verified Launch Pass number',
  'Direct communication channel with the core engineering team',
  'Guaranteed grandfathered terms upon public release',
  'Zero recurring subscription requirement for local-only runtimes',
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto border-t border-[#2A2D2C]">
      {/* Header */}
      <div className="max-w-3xl mb-14 lg:mb-18">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9AA19E] mb-3 block">
          // Access & Membership
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F1EFE8] tracking-[-0.025em] leading-[1.12] mb-6">
          Honest models. <br />
          <span className="font-normal text-[#F1EFE8]">No predatory cloud loops.</span>
        </h2>
        <p className="text-base sm:text-lg text-[#9AA19E] leading-relaxed font-normal">
          We refuse to publish speculative tiers or fabricate pricing matrices before our local runtime
          enters public release. Commercial terms will be announced directly to early supporters.
        </p>
      </div>

      {/* Main Showcase Grid - Single column, centered, generous */}
      <div className="max-w-4xl mx-auto">
        {/* Founding Cohort Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="surface-card p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Subtle warm accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C87D55] via-[#C87D55]/30 to-transparent" />

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C87D55] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#F1EFE8]">
                  Founding Cohort
                </span>
              </div>
              <span className="text-xs font-mono text-[#C87D55] bg-[#C87D55]/10 border border-[#C87D55]/30 px-3 py-1 rounded-full">
                Early Access Window Open
              </span>
            </div>

            <div className="mb-6">
              <div className="text-3xl sm:text-4xl font-light text-[#F1EFE8] mb-2 tracking-tight">
                No Cost During Early Access
              </div>
              <p className="text-sm text-[#9AA19E] leading-relaxed max-w-xl">
                Early Access registration is completely free. We are selecting thoughtful, technical users who value sovereignty, offline capability, and high-craft software.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#2A2D2C]/80">
              <div className="text-xs font-mono uppercase text-[#9AA19E] tracking-wider mb-2">
                Founding Member Entitlements
              </div>
              {foundingPerks.map((perk) => (
                <div key={perk} className="flex items-start gap-3 text-sm text-[#F1EFE8]/90">
                  <CheckCircle2 size={16} className="text-[#C87D55] shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#2A2D2C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#9AA19E]">
              Next milestone: Private Alpha invitations
            </div>
            <a
              href="#early-access"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#F1EFE8] text-[#080909] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white hover:shadow-[0_0_20px_rgba(241,239,232,0.3)] transition-all duration-200"
            >
              <span>Join Early Access</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>

        {/* Pricing Philosophy Card - below, not side-by-side */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 surface-card p-8"
        >
          <div className="w-10 h-10 rounded-lg bg-[#181B1A] border border-[#2A2D2C] flex items-center justify-center text-[#C87D55] mb-6">
            <Key size={18} />
          </div>

          <h3 className="text-xl font-light text-[#F1EFE8] mb-3">
            Why No Fake Tiers?
          </h3>
          <p className="text-xs text-[#9AA19E] leading-relaxed mb-4">
            Most AI platforms invent arbitrary pricing tiers with fake enterprise limits to artificially inflate valuation.
          </p>
          <p className="text-xs text-[#9AA19E] leading-relaxed mb-6">
            Neomagnesis runs primarily on your hardware. You supply the compute; you own the results. Our pricing will reflect fair software licensing, not markups on cloud GPUs.
          </p>

          <div className="pt-6 border-t border-[#2A2D2C]">
            <div className="text-[11px] font-mono text-[#9AA19E] uppercase tracking-wider mb-2">
              Commitment
            </div>
            <div className="flex items-center gap-2 text-xs text-[#F1EFE8]">
              <ShieldCheck size={14} className="text-[#5B7065]" />
              <span>Zero vendor lock-in</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#2A2D2C] text-xs font-mono text-[#9AA19E]">
            Status: <span className="text-[#F1EFE8]">Early Access Only</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}