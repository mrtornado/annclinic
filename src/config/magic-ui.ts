/**
 * Magic UI Configuration
 * Centralized configuration for all Magic UI components
 */

export const magicUIConfig = {
  // Animation durations (in seconds)
  animations: {
    shimmer: 0.8,
    spring: {
      stiffness: 400,
      damping: 17,
    },
    hover: {
      scale: 1.02,
      translateY: -2,
      duration: 0.3,
    },
    card: {
      translateY: -8,
      duration: 0.3,
    },
    text: {
      fadeIn: 0.6,
      staggerDelay: 0.2,
    },
  },

  // Color configurations - Medical Professional
  colors: {
    glow: {
      primary: "rgba(30, 64, 175, 0.4)", // Medical Blue
      secondary: "rgba(5, 150, 105, 0.4)", // Medical Green
      accent: "rgba(220, 38, 38, 0.4)", // Medical Red
    },
    particles: ["#1e40af", "#3b82f6", "#059669", "#10b981"],
  },

  // Component default props
  defaults: {
    button: {
      variant: "primary" as const,
      size: "md" as const,
    },
    card: {
      glowColor: "rgba(13, 148, 136, 0.4)",
    },
    particles: {
      count: 20,
      colors: ["#1e40af", "#3b82f6", "#059669", "#10b981"],
    },
    text: {
      delay: 0,
      duration: 0.6,
    },
  },

  // Responsive breakpoints
  breakpoints: {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
    large: 1440,
  },

  // Performance settings
  performance: {
    reducedMotion: true, // Respect prefers-reduced-motion
    gpuAcceleration: true, // Use transform3d for GPU acceleration
    lazyLoad: true, // Lazy load heavy animations
  },
} as const;

// Type exports for TypeScript
export type MagicUIConfig = typeof magicUIConfig;
export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "sm" | "md" | "lg";
export type AnimationConfig = typeof magicUIConfig.animations;
