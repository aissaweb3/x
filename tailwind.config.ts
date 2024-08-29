import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      border: "#28527b",
      input: "#6fa5c8",
      ring: "#065b95",
      background: "#065b9570",
      foreground: "#065b9570",
      primary: {
        DEFAULT: "#065b9570",
        dark: "#184c6b",
        foreground: "#38fdfd",
      },
      secondary: {
        DEFAULT: "#6fa5c8",
        foreground: "#065b95",
      },
      destructive: {
        DEFAULT: "#065b95",
        foreground: "#38fdfd",
      },
      muted: {
        DEFAULT: "#28527b",
        foreground: "#6fa5c8",
      },
      accent: {
        DEFAULT: "#38fdfd",
        foreground: "#065b95",
      },
      popover: {
        DEFAULT: "#065b9570",
        foreground: "#fff",
      },
      card: {
        DEFAULT: "#065b95",
        foreground: "#38fdfd",
      },
    },

    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: {
          height: "0",
        },
        to: {
          height: "var(--radix-accordion-content-height)",
        },
      },
      "accordion-up": {
        from: {
          height: "var(--radix-accordion-content-height)",
        },
        to: {
          height: "0",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
