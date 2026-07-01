import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A3C5E',
          dark: '#0d2137',
        },
        secondary: {
          DEFAULT: '#E8A020',
          dark: '#c98a1a',
        },
        muted: '#5f6d7a',
        'text-dark': '#2D2D2D',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1120px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 12px 32px rgba(0, 0, 0, 0.14)',
      },
    },
  },
  plugins: [],
};

export default config;
