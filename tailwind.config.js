/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#faf6eb',
          100: '#f5ecd1',
          200: '#ebd8a3',
          300: '#dfbe6e',
          400: '#d4af37',
          500: '#c5a028',
          600: '#a6851c',
          700: '#826615',
          800: '#5e480f',
          900: '#3d2e0a',
          accent: '#d4af37',
          light: '#f5ecd1',
          dark: '#997d24',
        },
        champagne: {
          50: '#fdfbf7',
          100: '#f8f4eb',
          200: '#f0e6d4',
          300: '#e5d3b6',
          400: '#d2b782',
          500: '#c5a36e',
        },
        pearl: '#fdfbf7',
        ivory: '#f7f4ed',
        charcoal: {
          800: '#232220',
          900: '#171615',
          950: '#0f0e0d',
        },
        rosegold: {
          light: '#f4ded6',
          DEFAULT: '#dca18d',
          dark: '#b67a65',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Cinzel', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(212, 175, 55, 0.15)',
        'luxury-lg': '0 20px 40px -15px rgba(212, 175, 55, 0.25)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-xl': '0 20px 50px -12px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
