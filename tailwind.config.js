/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tells Tailwind where to look for class names
  content: [
    './App.tsx',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  presets: [require('nativewind/preset')],

  theme: {
    extend: {
      // Design tokens go here in Phase 0.2
    },
  },

  plugins: [],
};
