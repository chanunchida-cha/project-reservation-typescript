/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        index: "url('../public/images/1.png')",
      },
    },
  },
  plugins: [],
};
