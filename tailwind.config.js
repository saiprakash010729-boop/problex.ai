/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F5FF',
          100: '#E1EBFE',
          200: '#C7D9FE',
          300: '#9EBEFD',
          400: '#6E99FB',
          500: '#3F6FF7',
          600: '#214CEE',
          700: '#1838DC',
          800: '#142BB2',
          900: '#0A1128', // Deep Navy Blue
          950: '#050918',
        },
        electric: {
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          blue: '#2563EB',
          cyan: '#06B6D4',
        },
        brandPurple: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          900: '#4C1D95',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(37, 99, 235, 0.15)',
        'glow': '0 0 25px -5px rgba(37, 99, 235, 0.25)',
        'glow-purple': '0 0 25px -5px rgba(124, 58, 237, 0.25)',
        'card': '0 10px 30px -10px rgba(10, 17, 40, 0.07)',
        'card-hover': '0 20px 40px -15px rgba(10, 17, 40, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
