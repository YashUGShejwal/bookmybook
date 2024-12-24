/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ACEC00",
        background: "#fff",
        surface: "#000",
        surface2: "#ACEC00",
      },
      boxShadow: {
        shadow1: "0px 8px 20px rgba(35, 35, 35, 0.1)",
      },
    },
  },
  plugins: [],
};
