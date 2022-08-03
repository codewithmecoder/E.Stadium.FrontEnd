/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      logo: ['Fira Code', 'monospace', 'ui-sans-serif', 'system-ui'],
      welcome: ['Press Start 2P', 'cursive', 'ui-sans-serif', 'system-ui'],
    },
  },
  plugins: [],
};
