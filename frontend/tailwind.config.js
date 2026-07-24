/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0B0B0B',
        darkSurface: '#161616',
        darkCard: '#1E1E1E',
        goldAccent: '#C9A227',
        goldHover: '#DFB531',
        emeraldAccent: '#2E8B57',
        emeraldHover: '#3CB371',
        luxuryWhite: '#FAFAFA',
        luxuryGray: '#B5B5B5',
        luxuryMuted: '#6E6E6E',
        luxuryBorder: 'rgba(255, 255, 255, 0.08)',
        goldBorder: 'rgba(201, 162, 39, 0.3)',
      },
      fontFamily: {
        hero: ['var(--font-cormorant)', 'serif'],
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
        button: ['var(--font-space)', 'sans-serif'],
      },
      borderRadius: {
        '24': '24px',
        'luxury': '24px',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(201, 162, 39, 0.25)',
        'emerald-glow': '0 0 25px rgba(46, 139, 87, 0.25)',
        'luxury-shadow': '0 20px 50px rgba(0, 0, 0, 0.7)',
        'glass-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #161616 0%, #0B0B0B 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #F5D77F 50%, #9A7714 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'gold-border-gradient': 'linear-gradient(135deg, rgba(201, 162, 39, 0.5), rgba(255, 255, 255, 0.05))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s infinite alternate',
        'shimmer': 'shimmer 2.5s infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%': { opacity: '0.4', transform: 'scale(1)' },
          '100%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
