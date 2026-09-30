/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Brass Mono Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        /* mirrors the dark theme tokens in src/index.css — every colour on the
           site actually flows through the CSS variables, these are for
           one-off utilities only */
        base: '#0F0F05',
        surface: '#17160B',
        raised: '#1B1A0F',
        sunken: '#1F1E13',
        void: '#121107',
        /* hairlines */
        line: '#373522',
        'line-soft': '#282614',
        'line-bright': '#4E4C37',
        /* type */
        ink: '#F8F4E1',
        'ink-soft': '#D9D5C3',
        'ink-dim': '#CBC7AD',
        'ink-faint': '#AFAC92',
        /* accents */
        amber: '#F7B3EF',
        'amber-dim': '#BA7CB4',
        steel: '#A29F86',
        /* loud colour reserved for the small type */
        signal: '#D2D389',
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
