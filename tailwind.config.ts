import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "#312E81",
          foreground: "#FFFFFF"
        },
        success: {
          DEFAULT: "#10B981",
          foreground: "#052E2B"
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF"
        }
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans TC", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 60px -30px rgb(15 23 42 / 0.35)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
