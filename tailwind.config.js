/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Brass Mono Code"', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: '#000000',
        ink: '#e4e4e7',
        sky: '#60a5fa',
        link: '#93c5fd',
        wall: '#000000',
        tea: '#8b8b94',
        blu: '#60a5fa',
        pur: '#818cf8',
        rud: '#f87171',
        edge: '#27272a',
      },
    },
  },
  plugins: [],
}