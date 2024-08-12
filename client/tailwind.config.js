/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "task-white": "#FFFFFF",
        "task-gray": "#ECEDEE",
        "task-shadow": "#b7b7b7",
        "task-text-gray": "#797979",
        "task-border-gray": "#625F6D",
        "task-badge-gray": "#E0E0E0",
        "task-expiry": "#F42D20",
        "task-active": "#E89271",
        "task-completed": "#70A1E5",
        "task-toDo": "#5030E5",
        "create-task": "#0D25FF",
        "add-task": "#20E7F4",
        "task-onProgress": "#FFA500",
        "task-done": "#8BC48A",
        "task-neutral": "#0D062D",
        "task-badge-low": "#ffecdb",
        "task-badge-completed": "#ddf9dc",
        "task-badge-high": "#ffe7ea",
        "task-badge-text-low": "#D58D49",
        "task-badge-text-completed": "#68B266",
        "task-badge-text-high": "#D8727D",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      fontFamily: {
        "task-poppins": ["Poppins", "sans-serif"],
        "task-inter": ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}