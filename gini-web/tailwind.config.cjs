/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#1e1e1e",
        menu: "#262626",
        border: "#b2b2bf",
        accent: {
          purple: "#7378D9",
          green: "#04BF9D",
          red: "#F46A82"
        },
        backdrop: {
          purple: "#E1E1EF",
        },
      },
    }
  },
  plugins: [],
}
