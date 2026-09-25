'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const statements = [
  {
    id: 'stmt-1',
    text: 'Intelligence should feel invisible.',
    sub: 'The most powerful tools disappear into the work. You should feel in command — never managed by the machine.',
  },
  {
    id: 'stmt-2',
    text: 'Sovereignty is not a feature. It is the foundation.',
    sub: 'Your data lives where you decide. Your models run where you choose. Ownership is not optional.',
  },
  {
    id: 'stmt-3',
    text: 'The best workflow is the one you never have to manage.',
    sub: 'Agents should reason, adapt, and execute. Your attention belongs to what only you can do.',
  },
]

function Statement({ statement, index }: { statement: typeof statements[0]; index: number }) {
  return (
    <motion.div
      key={statement.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start py-16 lg:py-20"
      style={{ borderTop: index > 0 ? '1px solid #2A2D2C' : undefined }}
    >
      {/* Statement number */}
      <div className="lg:col-span-1 flex items-start pt-2">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#A6B2AC] font-medium">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Main statement */}
      <div className="lg:col-span-7">
        <h3
          className="font-light text-[#FAF8F5] leading-[1.05] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          {statement.text}
        </h3>
      </div>

      {/* Supporting copy */}
      <div className="lg:col-span-4 flex items-start pt-1">
        <p className="text-sm sm:text-base leading-relaxed text-[#C8D0CC] font-normal">
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
      className="relative py-16 lg:py-24 px-5 sm:px-8"
      style={{ borderTop: '1px solid #2A2D2C' }}
      aria-labelledby="philosophy-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Overline */}
        <motion.div
          style={{ y: overlineY }}
          className="mb-14 lg:mb-18"
        >
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mono-label"
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
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#A6B2AC] font-medium">
            Built differently
          </span>
        </motion.div>
      </div>
    </section>
  )
}