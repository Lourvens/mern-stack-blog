/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", "[data-theme=\"dark\"]"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {}
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#1989F1",
          "accent": "#87b5db",
          "base-100": "#ffffff"
        }
      },
      {
        dark: {
          "base-100": "#101825",
          "primary": "#1989F1",
          "accent": "#87b5db",
        }
      }
    ]
  },
}

