import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          bg:        '#080909',
          black:     '#080909',
          surface:   '#111312',
          charcoal:  '#111312',
          elevated:  '#181B1A',
          graphite:  '#181B1A',
          border:    '#2A2D2C',
          mist:      '#9AA19E',
          gray:      '#9AA19E',
          muted:     '#626A66',
          ivory:     '#F1EFE8',
        },
        copper: {
          DEFAULT: '#B87333',
          hover:   '#C98344',
          subtle:  'rgba(184, 115, 51, 0.12)',
          border:  'rgba(184, 115, 51, 0.3)',
          glow:    'rgba(184, 115, 51, 0.15)',
        },
        forest: {
          DEFAULT: '#3D6B52',
          subtle:  'rgba(61, 107, 82, 0.16)',
          border:  'rgba(61, 107, 82, 0.35)',
        },
        amber: {
          warm:   '#C68A4C',
          subtle: 'rgba(198, 138, 76, 0.16)',
          border: 'rgba(198, 138, 76, 0.35)',
        },
        terracotta: {
          DEFAULT: '#A84B4B',
          subtle:  'rgba(168, 75, 75, 0.16)',
          border:  'rgba(168, 75, 75, 0.35)',
        },
        // Base tokens
        base:    '#080909',
        surface: '#111312',
        border:  '#2A2D2C',
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['"SF Mono"', 'ui-monospace', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'macos-panel':  '0 4px 20px -2px rgba(0, 0, 0, 0.45), 0 0 0 1px #2A2D2C',
        'macos-window': '0 24px 48px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px #2A2D2C',
        'dock':         '0 0 0 0.5px rgba(241,239,232,0.06), 0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)',
        'copper-glow':  '0 0 24px rgba(184, 115, 51, 0.15)',
        'card-hover':   '0 12px 40px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-up':      'fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':      'fadeIn 0.5s ease forwards',
        'float-y':      'floatY 6s ease-in-out infinite',
        'breathe':      'breathe 4s ease-in-out infinite',
        'orbit-drift':  'orbitDrift 10s ease-in-out infinite',
        'pulse-copper': 'pulse-copper 2s ease-in-out infinite',
        'nucleus-draw': 'nucleusDraw 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':       { transform: 'scale(1.025)' },
        },
        orbitDrift: {
          '0%':   { transform: 'translate(0, 0)' },
          '25%':  { transform: 'translate(4px, -6px)' },
          '50%':  { transform: 'translate(-3px, -4px)' },
          '75%':  { transform: 'translate(-5px, 3px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'pulse-copper': {
          '0%, 100%': { opacity: '0.6' },
          '50%':       { opacity: '1' },
        },
        nucleusDraw: {
          from: { strokeDashoffset: '300' },
          to:   { strokeDashoffset: '0' },
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
    },
  },
  plugins: [],
}

export default config
