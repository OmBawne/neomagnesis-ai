'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SkeletonLayout } from './SkeletonLayout'

/**
 * LoadingSequence — skeleton website frame loader.
 *
 * Instead of a bare spinner, this previews the actual site structure:
 * - Skeleton dock (centered, glass pill outline)
 * - Skeleton hero text blocks + Nucleus Loop
 * - Skeleton sections (cards, grids, asymmetric layouts)
 * - Skeleton footer
 * - Subtle shimmer across skeleton elements
 * - Fades out to reveal the real page
 *
 * Only shows on first visit per session (sessionStorage flag).
 * Skipped entirely when prefers-reduced-motion is set.
 */
export function LoadingSequence({ onComplete }: { onComplete?: () => void }) {
  const [show, setShow]       = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const already  = sessionStorage.getItem('neo-loaded')
    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (already || reduced) {
      onComplete?.()
      return
    }

    setShow(true)

    const exitTimer = setTimeout(() => {
      setExiting(true)
      setTimeout(() => {
        setShow(false)
        sessionStorage.setItem('neo-loaded', '1')
        onComplete?.()
      }, 600)
    }, 1800)

    return () => clearTimeout(exitTimer)
  }, [onComplete])

  if (!show) return null

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="skeleton-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-[#080909] overflow-hidden"
          aria-live="polite"
          aria-label="Loading Neomagnesis"
          aria-busy="true"
        >
          <SkeletonLayout />
        </motion.div>
      )}
    </AnimatePresence>
  )
}