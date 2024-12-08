/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#005F6A", // Main Color
        background: "#fefdfc", // Background Color
        secondary: "#F7FFFC", // Secondary Color
        SoftMain: "#f9eae7", // Soft Main Color
        accent: "#001F34", // Accent Color
        "main-font": "#010200", // Main Font Color
        "secondary-font": "#fefdfc", // Secondary Font Color
      },
    },
  },
  plugins: [],
}

