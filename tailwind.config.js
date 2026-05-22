/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#050505',
          deep: '#000000',
          mid:  '#0a0a0a',
          soft: '#111111',
        },
        red: {
          DEFAULT:   '#ff1a1a',
          bright:    '#ff3333',
          dark:      '#cc0000',
          glow:      '#ff1a1a',
          muted:     '#991111',
        },
        gray: {
          950: '#0d0d0d',
          900: '#141414',
          850: '#1a1a1a',
          800: '#222222',
          700: '#333333',
          600: '#444444',
          500: '#666666',
          400: '#888888',
          300: '#aaaaaa',
          200: '#cccccc',
          100: '#eeeeee',
        },
      },
      fontFamily: {
        anton:    ['Anton', 'sans-serif'],
        epilogue: ['Epilogue', 'sans-serif'],
        mono:     ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.9' }],
        '9xl':  ['8rem',  { lineHeight: '0.9' }],
        '8xl':  ['6rem',  { lineHeight: '0.9' }],
      },
      letterSpacing: {
        widest:  '0.3em',
        widest2: '0.5em',
        tightest: '-0.05em',
        tighter2: '-0.03em',
      },
      animation: {
        'grain':        'grain 8s steps(10) infinite',
        'glow-pulse':   'glowPulse 3s ease-in-out infinite',
        'slide-in':     'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up':     'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in':      'fadeIn 0.5s ease-out',
        'marquee':      'marquee 20s linear infinite',
        'marquee2':     'marquee2 20s linear infinite',
        'shimmer':      'shimmer 2s infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 2%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(2%, -1%)' },
          '50%': { transform: 'translate(-3%, 2%)' },
          '60%': { transform: 'translate(1%, -3%)' },
          '70%': { transform: 'translate(3%, 1%)' },
          '80%': { transform: 'translate(-2%, 3%)' },
          '90%': { transform: 'translate(2%, -2%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.05)' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to:   { transform: 'translateX(0)',    opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(40px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'red-glow': 'radial-gradient(ellipse at center, rgba(255,26,26,0.15) 0%, transparent 70%)',
        'dark-grid': `linear-gradient(rgba(255,26,26,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,26,26,0.03) 1px, transparent 1px)`,
      },
      boxShadow: {
        'red':       '0 0 20px rgba(255,26,26,0.3)',
        'red-lg':    '0 0 40px rgba(255,26,26,0.4)',
        'red-xl':    '0 0 80px rgba(255,26,26,0.5)',
        'red-inner': 'inset 0 0 20px rgba(255,26,26,0.1)',
        'card':      '0 4px 24px rgba(0,0,0,0.8)',
        'card-hover':'0 8px 40px rgba(255,26,26,0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'bounce-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
