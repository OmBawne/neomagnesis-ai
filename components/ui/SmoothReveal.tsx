'use client'

import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface SmoothRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  className?: string
}

export function SmoothReveal({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 24,
  className = '',
  ...props
}: SmoothRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
