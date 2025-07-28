/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Elegant Teal
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-light": "var(--color-primary-light)",
        "primary-dark": "var(--color-primary-dark)",

        // Secondary Colors - Warm Gold
        secondary: "var(--color-secondary)",
        "secondary-hover": "var(--color-secondary-hover)",
        "secondary-light": "var(--color-secondary-light)",

        // Accent Colors - Soft Rose
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "accent-light": "var(--color-accent-light)",

        // Surface colors (responsive to theme)
        surface: "var(--color-surface)",
        "surface-secondary": "var(--color-surface-secondary)",
        "surface-tertiary": "var(--color-surface-tertiary)",
        "surface-elevated": "var(--color-surface-elevated)",

        // Text colors (responsive to theme)
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        "text-tertiary": "var(--color-text-tertiary)",
        "text-muted": "var(--color-text-muted)",

        // Border colors (responsive to theme)
        border: "var(--color-border)",
        "border-secondary": "var(--color-border-secondary)",
        "border-focus": "var(--color-border-focus)",

        // Medical specialty colors
        cardiology: "var(--color-cardiology)",
        dermatology: "var(--color-dermatology)",
        gynecology: "var(--color-gynecology)",
        pediatrics: "var(--color-pediatrics)",
        orthopedics: "var(--color-orthopedics)",
        orl: "var(--color-orl)",
        aesthetics: "var(--color-aesthetics)",
        neurology: "var(--color-neurology)",
        endocrinology: "var(--color-endocrinology)",
        gastroenterology: "var(--color-gastroenterology)",
        urology: "var(--color-urology)",
        ophthalmology: "var(--color-ophthalmology)",
        psychiatry: "var(--color-psychiatry)",
        radiology: "var(--color-radiology)",
        laboratory: "var(--color-laboratory)",

        // Status colors
        success: "var(--color-success)",
        "success-light": "var(--color-success-light)",
        warning: "var(--color-warning)",
        "warning-light": "var(--color-warning-light)",
        error: "var(--color-error)",
        "error-light": "var(--color-error-light)",
        info: "var(--color-info)",
        "info-light": "var(--color-info-light)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #059669 0%, #10b981 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)",
        "gradient-medical":
          "linear-gradient(135deg, #1e40af 0%, #059669 50%, #3b82f6 100%)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
