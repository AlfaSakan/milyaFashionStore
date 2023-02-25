/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      animation: {
        skeleton: "skeleton 1s linear infinite alternate",
      },
      spacing: {
        134: "33.5rem",
        5.5: "1.375rem",
      },
      keyframes: {
        skeleton: {
          "0%": { "background-color": "hsl(200, 20%, 80%)" },
          "100%": { "background-color": "hsl(200, 20%, 95%)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
