import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0b12",
        card: "#11131c",
        accent: "#7c3aed",
        muted: "#9ca3af"
      },
      backgroundImage: {
        mathGradient: "linear-gradient(120deg, #7c3aed 0%, #06b6d4 100%)"
      },
      animation: {
        fadeIn: "fadeIn .4s ease-in"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
