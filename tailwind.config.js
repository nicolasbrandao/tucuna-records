/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'midnight-blue': 'rgb(var(--color-midnight-blue) / <alpha-value>)',
        'dark-blue': 'rgb(var(--color-dark-blue) / <alpha-value>)',
        'deep-blue': 'rgb(var(--color-deep-blue) / <alpha-value>)',
        cerulean: 'rgb(var(--color-cerulean) / <alpha-value>)',
        'sky-blue': 'rgb(var(--color-sky-blue) / <alpha-value>)',
        'pale-mint': 'rgb(var(--color-pale-mint) / <alpha-value>)',
        'light-blue': 'rgb(var(--color-light-blue) / <alpha-value>)',
        'steel-blue': 'rgb(var(--color-steel-blue) / <alpha-value>)',
        navy: 'rgb(var(--color-navy) / <alpha-value>)',
        'darker-navy': 'rgb(var(--color-darker-navy) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
