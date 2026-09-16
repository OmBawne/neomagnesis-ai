'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingSequenceProps {
  onComplete?: () => void
}

/**
 * Minimalist entrance loader — Nucleus Loop mark draws in,
 * then the entire overlay fades out.
 *
 * Only shows on first visit per session (sessionStorage flag).
 */
export function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const [show, setShow] = useState(false)
  const [drawing, setDrawing] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const already = sessionStorage.getItem('neo-loaded')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (already || reduced) {
      onComplete?.()
      return
    }

    setShow(true)
    setDrawing(true)

    const exitTimer = setTimeout(() => {
      setExiting(true)
      setTimeout(() => {
        setShow(false)
        sessionStorage.setItem('neo-loaded', '1')
        onComplete?.()
      }, 450)
    }, 1300)

    return () => clearTimeout(exitTimer)
  }, [onComplete])

  if (!show) return null

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#080909]"
          aria-live="polite"
          aria-label="Loading Neomagnesis"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Animated Nucleus Loop */}
            <svg
              viewBox="0 0 100 100"
              width="64"
              height="64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Arc 1 */}
              <path
                d="M 50 18 C 72 18, 84 30, 82 50 C 80 70, 66 80, 50 78 C 38 78, 30 72, 28 64"
                stroke="#F1EFE8"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="200"
                strokeDashoffset={drawing ? 0 : 200}
                style={{
                  transition: 'stroke-dashoffset 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '0s',
                }}
              />
              {/* Arc 2 */}
              <path
                d="M 50 82 C 28 82, 16 70, 18 50 C 20 30, 34 20, 50 22 C 62 22, 70 28, 72 36"
                stroke="#F1EFE8"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="200"
                strokeDashoffset={drawing ? 0 : 200}
                style={{
                  transition: 'stroke-dashoffset 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '0.12s',
                }}
              />
              {/* Arc 3 */}
              <path
                d="M 66 32 C 70 40, 68 52, 60 60 C 52 68, 40 70, 32 66"
                stroke="#B87333"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="120"
                strokeDashoffset={drawing ? 0 : 120}
                style={{
                  transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '0.24s',
                }}
              />
            </svg>

            {/* Brand name */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#626A66]"
            >
              Neomagnesis
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
