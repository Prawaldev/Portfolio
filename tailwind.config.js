/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Brass Mono Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        /* pure black page, panels lift off it */
        base: '#000000',
        surface: '#0A0D12',
        raised: '#0E1218',
        sunken: '#10151C',
        void: '#04060A',
        /* hairlines */
        line: '#1B2027',
        'line-soft': '#141920',
        'line-bright': '#2B323C',
        /* type */
        ink: '#E9EBEE',
        'ink-soft': '#BCC2CC',
        'ink-dim': '#9BA5B3',
        'ink-faint': '#8E9CAE',
        /* accents */
        amber: '#E0BE52',
        'amber-dim': '#A8912F',
        steel: '#97A7BA',
        /* loud colour reserved for the small type */
        signal: '#6FD3E8',
      },
      maxWidth: {
        shell: '1320px',
      },
      letterSpacing: {
        label: '0.22em',
      },
      transitionTimingFunction: {
        terminal: 'cubic-bezier(0.2, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
