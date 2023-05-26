/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        layout: {
          900: "#252935",
          700: "#313442",
          600: "#3C3D46",
          500: "#515765"
        },
        primary: {
          700: "#2C4768",
          600: "#268CE5",
          500: "#1A87EF",
        }
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#268CE5",
          accent: "#268CE5",
          neutral: "#3d4451",
          "base-100": "#252935",
        },
      },
    ],
  },
}

