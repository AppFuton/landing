/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        'primary-hover': '#FF5722',
        'primary-container': '#804D2C',
        secondary: '#FFB26B',
        'secondary-container': '#734A1F',
        surface: '#000000',
        'surface-elevated': '#0A0A0A',
        'surface-highest': '#080808',
        background: '#000000',
        'on-surface': '#F3F4F6',
        'on-surface-muted': '#9CA3AF',
        outline: '#374151',
      },
      fontFamily: {
        'mono': ['"JetBrains Mono"', '"Fira Code"', '"Courier Prime"', 'Courier', 'monospace'],
        'terminal': ['"IBM Plex Mono"', '"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    }
  },
  plugins: [],
}
