import React from "react";

// Utility component to help with Tailwind 4 color compatibility
// This provides easy access to CSS custom properties for colors

interface ColorProps {
  children: React.ReactNode;
  className?: string;
}

// Primary color variants
export const PrimaryBg = ({ children, className = "" }: ColorProps) => (
  <div
    className={className}
    style={{ backgroundColor: "var(--color-primary)" }}
  >
    {children}
  </div>
);

export const PrimaryText = ({ children, className = "" }: ColorProps) => (
  <span className={className} style={{ color: "var(--color-primary)" }}>
    {children}
  </span>
);

export const PrimaryGradient = ({ children, className = "" }: ColorProps) => (
  <div
    className={className}
    style={{
      background:
        "linear-gradient(to right, var(--color-primary), var(--color-primary-hover))",
    }}
  >
    {children}
  </div>
);

// Secondary color variants
export const SecondaryBg = ({ children, className = "" }: ColorProps) => (
  <div
    className={className}
    style={{ backgroundColor: "var(--color-secondary)" }}
  >
    {children}
  </div>
);

export const SecondaryText = ({ children, className = "" }: ColorProps) => (
  <span className={className} style={{ color: "var(--color-secondary)" }}>
    {children}
  </span>
);

export const SecondaryLightBg = ({ children, className = "" }: ColorProps) => (
  <div
    className={className}
    style={{ backgroundColor: "var(--color-secondary-light)" }}
  >
    {children}
  </div>
);

// Accent color variants
export const AccentBg = ({ children, className = "" }: ColorProps) => (
  <div className={className} style={{ backgroundColor: "var(--color-accent)" }}>
    {children}
  </div>
);

export const AccentText = ({ children, className = "" }: ColorProps) => (
  <span className={className} style={{ color: "var(--color-accent)" }}>
    {children}
  </span>
);

export const AccentGradient = ({ children, className = "" }: ColorProps) => (
  <div
    className={className}
    style={{
      background:
        "linear-gradient(to right, var(--color-accent), var(--color-accent-hover))",
    }}
  >
    {children}
  </div>
);

// Medical specialty colors
export const CardiologyColor = ({ children, className = "" }: ColorProps) => (
  <span className={className} style={{ color: "var(--color-cardiology)" }}>
    {children}
  </span>
);

export const DermatologyColor = ({ children, className = "" }: ColorProps) => (
  <span className={className} style={{ color: "var(--color-dermatology)" }}>
    {children}
  </span>
);

export const GynecologyColor = ({ children, className = "" }: ColorProps) => (
  <span className={className} style={{ color: "var(--color-gynecology)" }}>
    {children}
  </span>
);

// Utility function to get CSS custom property values
export const getColorValue = (colorName: string): string => {
  if (typeof window !== "undefined") {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-${colorName}`)
      .trim();
  }
  return "";
};

// Utility function to create inline styles for colors
export const colorStyle = (
  property: "color" | "backgroundColor" | "borderColor",
  colorVar: string
) => ({
  [property]: `var(--color-${colorVar})`,
});

// Gradient utility function
export const gradientStyle = (
  from: string,
  to: string,
  direction: string = "to right"
) => ({
  background: `linear-gradient(${direction}, var(--color-${from}), var(--color-${to}))`,
});

// Example usage:
// <PrimaryText className="font-bold">Primary colored text</PrimaryText>
// <AccentGradient className="p-4 rounded">Gradient background</AccentGradient>
// <div style={colorStyle('backgroundColor', 'secondary-light')}>Custom background</div>
// <div style={gradientStyle('primary', 'primary-hover')}>Custom gradient</div>
