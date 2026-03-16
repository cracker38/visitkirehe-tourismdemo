/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: '#1B5E20',
        'nature-dark': '#0D3D10',
        'lake-blue': '#0288D1',
        'lake-light': '#03A9F4',
        sunshine: '#FDD835',
        'sunshine-dark': '#F9A825',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'hero-pattern': 'linear-gradient(135deg, rgba(27, 94, 32, 0.85) 0%, rgba(2, 136, 209, 0.75) 100%)',
      },
    },
  },
  plugins: [],
}
