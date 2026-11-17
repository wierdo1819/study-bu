/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        edu: {
          blue: '#2563eb',
          indigo: '#4f46e5',
          navy: '#0f172a',
          slate: '#334155',
          amber: '#f59e0b',
          emerald: '#10b981',
          rose: '#e11d48',
          sdg: '#c5192d' // UN SDG 4 Red
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
