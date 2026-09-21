/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        script: ['Italianno', 'Playfair Display', 'cursive'],
      },
      colors: {
        theme: {
          bg: 'var(--color-bg-primary)',
          surface: 'var(--color-bg-surface)',
          text: 'var(--color-text-primary)',
          'text-muted': 'var(--color-text-secondary)',
          accent: 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
          border: 'var(--color-border)',
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
        },
        brand: {
          green: 'var(--color-brand-green)',
          orange: 'var(--color-warning)',
          bg: 'var(--color-bg-primary)',
          'feature-bg': 'var(--color-bg-surface)',
          text: 'var(--color-text-primary)'
        },
        gold: {
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          glow: '#fde047',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        ocean: {
          900: '#07162c',
          950: '#030a17',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'equalizer': 'equalizer 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        equalizer: {
          '0%': { height: '4px' },
          '100%': { height: '16px' },
        }
      }
    },
  },
  plugins: [],
}
