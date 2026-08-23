'use client'

import Link from 'next/link'
import { useTheme } from '@/lib/theme'

export interface LogoProps {
  variant?: 'full' | 'icon'
  theme?: 'auto' | 'light' | 'dark'
  width?: number
  height?: number
  className?: string
  href?: string | null
  iconOnly?: boolean
}

export function Logo({
  variant = 'full',
  theme: themeProp = 'auto',
  width,
  height,
  className = '',
  href,
  iconOnly = false,
}: LogoProps) {
  const themeContext = useTheme()
  const appTheme = themeContext?.theme ?? 'dark'
  const effectiveTheme = themeProp === 'auto' ? appTheme : themeProp
  const isIcon = variant === 'icon' || iconOnly
  const isLight = effectiveTheme === 'light'

  const defaultWidth = isIcon ? 32 : 140
  const defaultHeight = isIcon ? 32 : 32

  const w = width ?? defaultWidth
  const h = height ?? defaultHeight

  // Ink Wash mark — geometric "N" in neutral tones
  const renderMark = () => (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full select-none shrink-0"
    >
      <defs>
        <linearGradient id="neoMarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isLight ? '#171918' : '#8F9693'} />
          <stop offset="100%" stopColor={isLight ? '#737875' : '#D8D6CF'} />
        </linearGradient>
      </defs>

      <path
        d="M 18,18 L 34,18 L 82,66 L 82,18 L 98,18 L 98,82 L 82,82 L 34,34 L 34,82 L 18,82 Z"
        fill="url(#neoMarkGrad)"
      />
    </svg>
  )

  if (isIcon) {
    const iconContent = (
      <div
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width: w, height: h }}
      >
        {renderMark()}
      </div>
    )

    if (href) {
      return (
        <Link
          href={href}
          className="inline-flex items-center hover:opacity-90 transition-opacity shrink-0"
        >
          {iconContent}
        </Link>
      )
    }
    return iconContent
  }

  // Full Logo (Icon + NEOMAGNESIS + AI Pill)
  const textColor = isLight ? '#171918' : '#F1EFE8'

  const fullContent = (
    <div
      className={`inline-flex items-center gap-2.5 shrink-0 ${className}`}
      style={{ height: h }}
    >
      <div className="shrink-0" style={{ width: h, height: h }}>
        {renderMark()}
      </div>

      <div className="flex items-center gap-1.5 select-none shrink-0">
        <span
          className="font-semibold tracking-wider"
          style={{
            fontSize: `${Math.max(13, Math.round(h * 0.54))}px`,
            letterSpacing: '0.08em',
            color: textColor,
            lineHeight: 1,
            fontFamily: "system-ui, -apple-system, 'Inter', 'Segoe UI', sans-serif",
          }}
        >
          NEOMAGNESIS
        </span>
        <span
          className="inline-flex items-center justify-center px-1.5 py-0.5 rounded font-semibold"
          style={{
            background: isLight ? '#171918' : '#F1EFE8',
            color: isLight ? '#F1EFE8' : '#080909',
            fontSize: `${Math.max(9, Math.round(h * 0.36))}px`,
            lineHeight: 1,
          }}
        >
          AI
        </span>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center hover:opacity-90 transition-opacity shrink-0"
      >
        {fullContent}
      </Link>
    )
  }

  return fullContent
}

export default Logo
