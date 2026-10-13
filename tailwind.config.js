/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Semantic Tokens (used in RSVP, Popup, etc.) ──────────────────
        primary: '#9c7a52',
        secondary: '#1e293b',
        'bg-page': '#f8f5f0',
        'text-body': '#333333',
        // ── Palette (used in RedCard / BlackCard) ─────────────────────────
        burgundy: {
          950: "#1b0507",
          900: "#2b070b",
          800: "#430d12",
          700: "#5c1018",
          600: "#751722",
        },
        champagne: "#fbf4e6",
        gold: {
          100: "#fcf3d6",
          200: "#f8e6b0",
          300: "#eecd82",
          400: "#e1b75b",
          500: "#cf9e38",
          600: "#b07f23",
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', "cursive"],
        serif: ['"Cinzel"', "serif"],
        sans: ['"Montserrat"', "sans-serif"],
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(207, 158, 56, 0.45), 0 0 50px rgba(225, 183, 91, 0.25)',
        'glow-burgundy': '0 0 35px rgba(117, 23, 34, 0.5), 0 0 70px rgba(92, 16, 24, 0.3)',
        'card-red': '0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px rgba(117,23,34,0.35)',
        'card-black': '0 25px 60px -15px rgba(0,0,0,0.95), 0 0 40px rgba(196,151,63,0.15)',
      },
      keyframes: {
        glowGold: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(207, 158, 56, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(225, 183, 91, 0.8))' },
        },
        glowBurgundy: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(117, 23, 34, 0.3), 0 0 40px rgba(67, 13, 18, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(117, 23, 34, 0.7), 0 0 70px rgba(117, 23, 34, 0.4)' },
        },
        floatCard: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'glow-gold': 'glowGold 3s ease-in-out infinite',
        'glow-burgundy': 'glowBurgundy 3.5s ease-in-out infinite',
        'float': 'floatCard 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
