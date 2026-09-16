'use client'

import Link from 'next/link'

export interface LogoProps {
  variant?: 'full' | 'icon'
  width?: number
  height?: number
  className?: string
  href?: string | null
  iconOnly?: boolean
  /** Color of the mark strokes. Defaults to current color (white on dark). */
  color?: string
}

/**
 * Nucleus Loop mark — three intertwined curved strokes orbiting a shared
 * negative-space center, representing intelligence, flow, and unity.
 * Constructed from three arc paths inspired by the brand identity sheet.
 */
function NucleusLoopMark({ color = '#F1EFE8', size = 32 }: { color?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      aria-hidden="true"
      className="select-none shrink-0"
    >
      {/* Arc 1 — upper-left orbital stroke */}
      <path
        d="M 50 18
           C 72 18, 84 30, 82 50
           C 80 70, 66 80, 50 78
           C 38 78, 30 72, 28 64"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arc 2 — right orbital stroke */}
      <path
        d="M 50 82
           C 28 82, 16 70, 18 50
           C 20 30, 34 20, 50 22
           C 62 22, 70 28, 72 36"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arc 3 — diagonal connector stroke */}
      <path
        d="M 66 32
           C 70 40, 68 52, 60 60
           C 52 68, 40 70, 32 66"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function Logo({
  variant = 'full',
  width,
  height,
  className = '',
  href,
  iconOnly = false,
  color = '#F1EFE8',
}: LogoProps) {
  const isIcon = variant === 'icon' || iconOnly
  const h = height ?? (isIcon ? 32 : 32)
  const markSize = h

  const renderContent = () => {
    if (isIcon) {
      return (
        <div
          className={`inline-flex items-center justify-center shrink-0 ${className}`}
          style={{ width: markSize, height: markSize }}
        >
          <NucleusLoopMark color={color} size={markSize} />
        </div>
      )
    }

    return (
      <div
        className={`inline-flex items-center gap-2.5 shrink-0 ${className}`}
        style={{ height: h }}
      >
        <NucleusLoopMark color={color} size={markSize} />
        <div className="flex items-center gap-1.5 select-none shrink-0">
          <span
            className="font-medium"
            style={{
              fontSize: `${Math.max(13, Math.round(h * 0.5))}px`,
              letterSpacing: '0.06em',
              color: color,
              lineHeight: 1,
              fontFamily: "var(--font-inter, system-ui, -apple-system, sans-serif)",
            }}
          >
            Neomagnesis
          </span>
          <span
            className="inline-flex items-center justify-center px-1.5 py-0.5 rounded font-semibold"
            style={{
              background: '#181B1A',
              color: '#F1EFE8',
              border: '1px solid #2A2D2C',
              fontSize: `${Math.max(9, Math.round(h * 0.32))}px`,
              lineHeight: 1,
              letterSpacing: '0.05em',
            }}
          >
            AI
          </span>
        </div>
      </div>
    )
  }

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center hover:opacity-85 transition-opacity duration-200 shrink-0"
        aria-label="Neomagnesis AI — Home"
      >
        {renderContent()}
      </Link>
    )
  }

  return renderContent()
}

export default Logo
