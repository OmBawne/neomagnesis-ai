'use client'

import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface SmoothRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  className?: string
  staggerChildren?: number
  once?: boolean
}

// Props that should not be passed to regular DOM elements
const motionProps = new Set(['initial', 'animate', 'exit', 'whileInView', 'whileHover', 'whileTap', 'whileDrag', 'whileFocus', 'viewport', 'transition', 'variants', 'layout', 'layoutId', 'style'])

export function SmoothReveal({
  children,
  delay = 0,
  duration = 0.7,
  yOffset = 20,
  className = '',
  staggerChildren = 0,
  once = true,
  ...props
}: SmoothRevealProps) {
  const prefersReduced = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  const transition = {
    duration,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  }

  // Filter out motion-specific props for regular div
  const filteredProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !motionProps.has(key))
  )

  if (prefersReduced) {
    return <div className={className} {...filteredProps}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={transition}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child, {
          initial: staggerChildren > 0 ? { opacity: 0, y: 16 } : undefined,
          whileInView: staggerChildren > 0 ? { opacity: 1, y: 0 } : undefined,
          viewport: staggerChildren > 0 ? { once } : undefined,
          transition: staggerChildren > 0 ? {
            duration: 0.5,
            delay: index * staggerChildren,
            ease: [0.22, 1, 0.36, 1],
          } : undefined,
        })
      })}
    </motion.div>
  )
}
