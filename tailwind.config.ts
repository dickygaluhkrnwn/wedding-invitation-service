import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Kita akan mendefinisikan tema warna langsung di app/globals.css
      // menggunakan fitur @theme dari Tailwind v4 agar lebih performant.
    },
  },
  plugins: [],
};
export default config;