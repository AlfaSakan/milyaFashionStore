/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      spacing: {
        134: "33.5rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
