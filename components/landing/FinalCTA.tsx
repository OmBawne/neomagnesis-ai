'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthContext'

export default function FinalCTA() {
  const { openAuthModal } = useAuth()

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(143,150,147,0.12)] text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-[#8F9693] font-medium mb-4 block font-mono">
          // Deployment
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light text-ink-ivory tracking-tight leading-[1.1] mb-6">
          Ready to build with <br />
          <span className="font-normal text-white">sovereign intelligence</span>?
        </h2>
        <p className="text-base sm:text-lg text-[#8F9693] leading-relaxed font-normal mb-10 max-w-xl mx-auto">
          Start deploying autonomous workflows today. Connect your platforms, configure high-level goals, and let Neomagnesis handle execution.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => openAuthModal('signup')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer bg-[#F1EFE8] text-[#080909] hover:opacity-90 w-full sm:w-auto justify-center"
          >
            Get Started Free
            <ArrowRight size={15} />
          </button>
          <a
            href="https://discord.gg/neomagnesis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer bg-[#181B1A] text-[#D8D6CF] border border-[rgba(143,150,147,0.22)] hover:border-[rgba(143,150,147,0.4)] hover:text-[#F1EFE8] w-full sm:w-auto justify-center"
          >
            Join Community
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="mt-12 text-xs font-mono text-[#8F9693]">
          Zero lock-in · Native webhook support · End-to-end data encryption
        </div>
      </motion.div>
    </section>
  )
}
