/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
        32: "repeat(32, minmax(0, 1fr))",
        64: "repeat(64, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        16: "repeat(16, minmax(0, 1fr))",
        64: "repeat(64, minmax(0, 1fr))",
      },
    },
  },
  safelist: [
    "grid-cols-8",
    "grid-cols-16",
    "grid-cols-32",
    "grid-cols-64",
    "grid-rows-8",
    "grid-rows-16",
    "grid-rows-32",
    "grid-rows-64",
  ],
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
};

module.exports = config;
