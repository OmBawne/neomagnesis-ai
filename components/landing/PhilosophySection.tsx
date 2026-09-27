'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface PhilosophyStatement {
  id: string
  num: string
  title: React.ReactNode
  sub: React.ReactNode
}

const statements: PhilosophyStatement[] = [
  {
    id: 'stmt-1',
    num: '01',
    title: (
      <>
        Intelligence should feel{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#FFAE70] to-[#E58B4E] font-normal underline decoration-[#E58B4E]/30 underline-offset-8">
          invisible.
        </span>
      </>
    ),
    sub: (
      <>
        The most powerful tools disappear into the work. You should feel{' '}
        <span className="text-[#FAF8F5] font-medium">in command</span> — never managed by the machine.
      </>
    ),
  },
  {
    id: 'stmt-2',
    num: '02',
    title: (
      <>
        Sovereignty is not a feature.{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#FFAE70] to-[#E58B4E] font-normal">
          It is the foundation.
        </span>
      </>
    ),
    sub: (
      <>
        Your data lives where you decide. Your models run where you choose.{' '}
        <span className="text-[#FAF8F5] font-medium">Ownership is not optional.</span>
      </>
    ),
  },
  {
    id: 'stmt-3',
    num: '03',
    title: (
      <>
        The best workflow is the one you{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#FFAE70] to-[#E58B4E] font-normal">
          never have to manage.
        </span>
      </>
    ),
    sub: (
      <>
        Agents should reason, adapt, and execute. Your attention belongs to{' '}
        <span className="text-[#FAF8F5] font-medium">what only you can do.</span>
      </>
    ),
  },
]

function Statement({ statement, index }: { statement: PhilosophyStatement; index: number }) {
  return (
    <motion.div
      key={statement.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start py-16 lg:py-20 group"
      style={{ borderTop: index > 0 ? '1px solid #2A2D2C' : undefined }}
    >
      {/* Statement number badge */}
      <div className="lg:col-span-1 flex items-start pt-2">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#FFAE70] font-semibold bg-[#E58B4E]/10 border border-[#E58B4E]/30 px-2.5 py-1 rounded-full">
          {statement.num}
        </span>
      </div>

      {/* Main statement */}
      <div className="lg:col-span-7">
        <h3
          className="font-light text-[#FAF8F5] leading-[1.08] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          {statement.title}
        </h3>
      </div>

      {/* Supporting copy */}
      <div className="lg:col-span-4 flex items-start pt-1.5">
        <p className="text-sm sm:text-base leading-relaxed text-[#D4DDD8] font-normal">
          {statement.sub}
        </p>
      </div>
    </motion.div>
  )
}

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax on the overline
  const overlineY = useTransform(scrollYProgress, [0, 1], ['0px', '-24px'])

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-20 lg:py-28 px-5 sm:px-8"
      style={{ borderTop: '1px solid #2A2D2C' }}
      aria-labelledby="philosophy-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Overline */}
        <motion.div
          style={{ y: overlineY }}
          className="mb-14 lg:mb-18 flex items-center gap-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E58B4E]" aria-hidden="true" />
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mono-label text-[#FAF8F5] font-medium"
          >
            // Core Philosophy
          </motion.span>
        </motion.div>

        {/* Statements */}
        <h2 id="philosophy-heading" className="sr-only">Core Philosophy</h2>
        {statements.map((statement, i) => (
          <Statement key={statement.id} statement={statement} index={i} />
        ))}

        {/* Closing mark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-12 lg:pt-16 flex items-center gap-6"
        >
          <div className="w-16 h-px bg-[#E58B4E] opacity-75" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#FFAE70] font-semibold">
            Built differently
          </span>
        </motion.div>
      </div>
    </section>
  )
}