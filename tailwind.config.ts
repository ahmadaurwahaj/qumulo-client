import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-bottom": "0px -1px 0px 0px #00000033",
      },
      colors: {
        form: "#C7CACC",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        grey: {
          primary: "#242C35",
          active: "#13181E",
          input: "#424B5380",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        blue: {
          primary: "#0298FF",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          background: "hsl(var(--secondary-background))",
          border: "hsl(var(--secondary-border))",
          muted: "hsl(var(--secondary-muted))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          muted: "hsl(var(--muted-border))",
        },
        input: {
          DEFAULT: "hsl(var(--input))",
          secondary: "hsl(var(--input-secondary))",
        },
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontSize: {
        heading: "var(--font-size-heading)",
      },
      spacing: {
        "4.5": "14px",
        50: "12.5rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 6px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
