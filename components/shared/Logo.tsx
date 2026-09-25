'use client'

import Link from 'next/link'
import Image from 'next/image'

export interface LogoProps {
  variant?: 'full' | 'icon'
  width?: number
  height?: number
  className?: string
  href?: string | null
  iconOnly?: boolean
  theme?: 'dark' | 'light'
}

/**
 * Official Neomagnesis AI Brand Logo
 * Direct derivation from the official brand identity sheet.
 * The Nucleus Loop: 3 intertwined orbital arcs around center negative space.
 */
export function Logo({
  variant = 'full',
  width,
  height = 32,
  className = '',
  href,
  iconOnly = false,
  theme = 'dark',
}: LogoProps) {
  const isIcon = variant === 'icon' || iconOnly

  // Aspect ratios:
  // Mark: 225 / 211 (~1.066)
  // Full Logo: 581 / 140 (~4.15)
  const markHeight = height
  const markWidth = Math.round(markHeight * (225 / 211))

  const fullHeight = height
  const fullWidth = width ?? Math.round(fullHeight * (581 / 140))

  const markSrc = theme === 'light' ? '/brand/nucleus-mark-black.png' : '/brand/nucleus-mark-white.png'
  const fullSrc = theme === 'light' ? '/brand/neomagnesis-full-black.png' : '/brand/neomagnesis-full-white.png'

  const content = isIcon ? (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: markWidth, height: markHeight }}
    >
      <img
        src={markSrc}
        alt="Neomagnesis AI"
        width={markWidth}
        height={markHeight}
        className="w-full h-full object-contain pointer-events-none"
        loading="eager"
      />
    </div>
  ) : (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: fullWidth, height: fullHeight }}
    >
      <img
        src={fullSrc}
        alt="Neomagnesis AI"
        width={fullWidth}
        height={fullHeight}
        className="w-full h-full object-contain pointer-events-none"
        loading="eager"
      />
    </div>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center hover:opacity-90 transition-opacity duration-200 shrink-0"
        aria-label="Neomagnesis AI — Home"
      >
        {content}
      </Link>
    )
  }

  return content
}

export default Logo
