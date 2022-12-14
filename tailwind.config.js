/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/pages_component/**/*.{js,ts,jsx,tsx}",
    "src/pages_layout/**/*.{js,ts,jsx,tsx}",
    "src/component/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screen: {
      xs: "576px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1400px",
    },
    minHeight: {
      4: "16px",
    },
    extend: {},
  },
  plugins: [],
};
