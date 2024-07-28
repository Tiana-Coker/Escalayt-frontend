/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 8px 8px -4px #1018280A, 0px 20px 24px -4px #1018281A",
      },
      filter: {
        blurred: "blur(5px)",
      },
    },
  },
  plugins: [],
};
