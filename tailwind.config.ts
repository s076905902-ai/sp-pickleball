import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // ─── SP Pickleball Premium Color System ───────────────────────
        // Premium Black + Emerald 黑金墨綠精品運動風

        // brand.* = 深墨綠 scale (replaces generic green)
        brand: {
          50:  "#F2F8F5",  // barely-there mint
          100: "#E0F0E8",
          200: "#BCDECF",
          300: "#8AC4AB",
          400: "#4FA07C",
          500: "#1F6B4F",  // Secondary / 品牌綠
          600: "#123524",  // Primary / 深墨綠 ← MAIN
          700: "#0D2A1B",
          800: "#091D13",
          900: "#050F0A",
          950: "#020704",
        },

        // gold.* = 香檳金
        gold: {
          400: "#D4B275",
          500: "#C8A45D",  // ← MAIN accent
          600: "#B89245",
          700: "#9A7A38",
        },

        // ink.* = 精品黑
        ink: {
          900: "#111111",
          800: "#1A1A1A",
          700: "#222222",
          600: "#2D2D2D",
          500: "#3D3D3D",
        },

        // cream / warm neutrals
        cream: {
          50:  "#FAFAF8",  // Background / 高級米白
          100: "#F5F5F1",
          200: "#EEECEA",
          300: "#E5E2D8",  // Border
        },

        // Keep court for legacy compat
        court: {
          blue:  "#1e40af",
          teal:  "#1F6B4F",
          green: "#123524",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.5rem",
        "5xl": "2rem",
      },

      fontFamily: {
        sans: ["var(--font-sans)", "Noto Sans TC", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Noto Sans TC", "system-ui", "sans-serif"],
      },

      boxShadow: {
        "card":       "0 18px 45px rgba(17,17,17,0.08)",
        "card-hover": "0 24px 60px rgba(17,17,17,0.14)",
        "luxury":     "0 4px 24px rgba(200,164,93,0.18)",
        "dark":       "0 8px 32px rgba(17,17,17,0.24)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
