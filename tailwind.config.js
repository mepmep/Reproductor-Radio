/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './app.js'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        22: '5.5rem'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          violet: '#6366f1',
          pink: '#ec4899'
        },
        dark: {
          bg: '#080c14',
          card: '#0f172a',
          surface: '#172033',
          border: '#1e293b'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'eq-1': 'eq 1.1s ease-in-out infinite',
        'eq-2': 'eq 0.9s ease-in-out 0.2s infinite',
        'eq-3': 'eq 1.3s ease-in-out 0.4s infinite',
        'eq-4': 'eq 0.8s ease-in-out 0.1s infinite',
        'eq-5': 'eq 1.0s ease-in-out 0.3s infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        eq: {
          '0%, 100%': { height: '6px' },
          '50%': { height: '26px' }
        }
      }
    }
  },
  safelist: [
    'animate-eq-1',
    'animate-eq-2',
    'animate-eq-3',
    'animate-eq-4',
    'animate-eq-5'
  ]
};
