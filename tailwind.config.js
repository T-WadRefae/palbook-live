/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        palestine: {
          red: '#D4756B',
          green: '#7BAA8A',
          black: '#3A3A3A',
          white: '#FFFFFF',
        },
        primary: {
          50: '#FDF6F4',
          100: '#FAE9E5',
          200: '#F4D3CC',
          300: '#EBB6AB',
          400: '#DD928A',
          500: '#C97268',
          600: '#B5564D',
          700: '#964339',
          800: '#793A32',
          900: '#65332D',
        },
        secondary: {
          50: '#F2F8F4',
          100: '#E1F0E5',
          200: '#C3DFCC',
          300: '#9EC6AB',
          400: '#7BAA8A',
          500: '#5B8E6C',
          600: '#467155',
          700: '#3A5C46',
          800: '#314A3A',
          900: '#293D31',
        },
        accent: {
          50: '#FEF9EE',
          100: '#FCF1D5',
          200: '#F8E1AA',
          300: '#F2CB75',
          400: '#ECB04C',
          500: '#E59A33',
          600: '#D17F26',
          700: '#AE6322',
          800: '#8C4F22',
          900: '#73421F',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
        display: ['Fredoka', 'Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-pal': 'linear-gradient(135deg, #D4756B 0%, #7BAA8A 50%, #3A3A3A 100%)',
        'gradient-kid': 'linear-gradient(135deg, #DD928A 0%, #F2CB75 50%, #7BAA8A 100%)',
        'gradient-sky': 'linear-gradient(135deg, #93B5DA 0%, #C9B8DA 100%)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pop': 'pop 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'spin-slow': 'spin 4s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      boxShadow: {
        'kid': '0 10px 30px -5px rgba(212, 117, 107, 0.25)',
        'glow': '0 0 20px rgba(242, 203, 117, 0.35)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};