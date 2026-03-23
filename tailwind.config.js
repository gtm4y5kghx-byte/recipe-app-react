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
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: {
          DEFAULT: 'var(--color-background)',
          light: 'var(--color-background-light)',
          dark: 'var(--color-background-dark)',
        },
        content: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        border: 'var(--color-border)',
        divider: 'var(--color-divider)',
        tag: {
          'secondary-text': 'var(--color-tag-secondary-text)',
          'secondary-bg': 'var(--color-tag-secondary-bg)',
        },
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      fontSize: {
        'caption2': '12px',
        'caption1': '13px',
        'footnote': '13px',
        'subheadline': '15px',
        'callout': '16px',
        'body': '17px',
        'headline': '17px',
        'title3': '20px',
        'title2': '22px',
        'title1': '28px',
        'largeTitle': '34px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        full: '999px',
      },
    },
  },

  plugins: [],
};
