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
          black: '#080909',
          charcoal: '#111312',
          graphite: '#181B1A',
          gray: '#8F9693',
          muted: '#D8D6CF',
          ivory: '#F1EFE8',
          canvas: '#E5EAE6',
        },
        cream: '#F5F3ED',
        // Keep base for dashboard compatibility
        base: '#080909',
        surface: '#111312',
        border: 'rgba(143, 150, 147, 0.12)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
