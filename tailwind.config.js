/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '440px',
        xw: '300px',
        xr: '580px',
        xv: '520px',
        xh: '390px',
        'small-lg': '992px',
      },
      backgroundImage: {},
      gridTemplateColumns: {
        '1/2': '1.5fr 1fr',
        auto: 'auto 1fr',
      },
      backgroundImage: {
        primary:
          'linear-gradient(to bottom right, black 0%, transparent 40%, transparent 60%, black 100%);',
      },
      boxShadow: {
        logocard: '0 0 0 1px rgba(255, 255, 255, 0.12)',
      },

      animation: {
        'fade-out1': 'fade-out1 40s linear infinite',
        'fade-out2': 'fade-out2 40s linear infinite',
      },

      keyframes: {
        'fade-out1': {
          '0%': { transform: 'translateX(0%)' },

          '50%': { transform: 'translateX(-100%)' },
          '50.000001%': { transform: 'translateX(100%)' },

          '100%': {
            transform: 'translateX(0%)',
          },
        },
        'fade-out2': {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-200%)',
          },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
