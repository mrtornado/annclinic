# Design System Rules - ANN Clinic Website

## Mobile-First Approach

- **ALWAYS** design for mobile first, then enhance for desktop
- **ALWAYS** modify both mobile and desktop views when working on components
- Use Tailwind CSS responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Test on mobile devices frequently during development

## Tailwind CSS 4 Syntax

### New Syntax Requirements

- Use `@import "tailwindcss";` instead of older directives
- Use `@utility` instead of `@layer utilities` for custom utilities
- Configure container with `@utility container` in CSS

### Color Palette

#### Primary Medical Colors

```css
/* Primary Teal - Main brand color */
--color-primary: #0d9488
--color-primary-hover: #0f766e
--color-primary-light: #ccfbf1
--color-primary-dark: #134e4a

/* Secondary Gold - Premium accent */
--color-secondary: #d97706
--color-secondary-hover: #b45309
--color-secondary-light: #fef3c7

/* Accent Rose - Call-to-action */
--color-accent: #e11d48
--color-accent-hover: #be185d
--color-accent-light: #fce7f3
```

#### Medical Specialty Colors

```css
/* Use these specific colors for each specialty */
--cardiology: #dc2626     /* Red - heart health */
--dermatology: #ea580c    /* Orange - skin care */
--gynecology: #c2410c     /* Warm orange - women's health */
--pediatrics: #16a34a     /* Green - child health */
--orthopedics: #2563eb    /* Blue - bone health */
--orl: #7c3aed           /* Purple - specialized care */
--aesthetics: #db2777     /* Pink - beauty treatments */
```

## Magic UI Component Standards

### AnimatedButton Requirements

```tsx
// ALWAYS include emoji icons for better visual appeal
<AnimatedButton variant="primary" size="lg" href="/programare">
  📅 Programează Consultație
</AnimatedButton>

// Available variants: primary, secondary, outline
// Available sizes: sm, md, lg
```

### MagicCard Requirements

```tsx
// ALWAYS use appropriate glow colors for medical context
<MagicCard glowColor="rgba(13, 148, 136, 0.4)">
  {/* Card content */}
</MagicCard>

// Use specialty colors for service cards
<MagicCard glowColor="rgba(220, 38, 38, 0.4)"> {/* Cardiology */}
```

### Animation Performance Rules

- **NEVER** animate layout-affecting properties (width, height, margin)
- **ALWAYS** use CSS transforms and opacity for animations
- **ALWAYS** respect `prefers-reduced-motion` settings
- Use `will-change` property for elements with animations
- Clean up animations on component unmount

## Typography Standards

### Font Requirements

- **Primary Font**: Inter (medical-grade readability)
- **Font Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **ALWAYS** support Romanian diacritics: ă, â, î, ș, ț
- Use text shadows strategically for contrast on gradient backgrounds

### Heading Hierarchy

```css
/* Use this exact hierarchy for SEO */
h1: text-4xl md:text-6xl font-bold     /* Page titles */
h2: text-3xl md:text-5xl font-semibold /* Section titles */
h3: text-2xl md:text-4xl font-medium   /* Subsection titles */
h4: text-xl md:text-2xl font-medium    /* Card titles */
```

## Theme System Requirements

### Light/Dark Mode Implementation

```tsx
// ALWAYS implement theme awareness in components
const ThemeComponent = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Component content */}
    </div>
  );
};
```

### Theme Transition

- **ALWAYS** use smooth transitions between themes (0.3s duration)
- Use CSS custom properties with `light-dark()` functions
- Ensure all components adapt automatically to theme changes

## Responsive Design Rules

### Breakpoints

```css
/* Use these exact breakpoints */
mobile: 320px - 767px
tablet: 768px - 1023px
desktop: 1024px - 1439px
large: 1440px+
```

### Touch Targets

- **ALWAYS** ensure interactive elements are minimum 44px for touch
- Use `touch-manipulation` CSS for better mobile performance
- Test touch interactions on actual devices

## Component Naming Conventions

### File Naming

- React components: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
- Astro layouts: `PascalCase.astro` (e.g., `BaseLayout.astro`)
- Content files: `kebab-case.md` (e.g., `dr-maria-popescu.md`)

### CSS Classes

- Use Tailwind utility classes over custom CSS
- When custom CSS needed, use semantic names: `.service-card`, `.doctor-profile`
- Prefix component-specific classes with component name

## Medical Context Guidelines

### Trust and Professional Appearance

- **ALWAYS** use clean, professional layouts
- Emphasize trust signals (certifications, credentials)
- Use medical blue and teal colors to convey trust
- Include clear contact information prominently

### Romanian Medical Terminology

- Use correct Romanian medical terms
- Include common search terms in content
- Use formal tone for medical content
- Include emergency contact information clearly

## Performance Requirements

### Image Optimization

- **ALWAYS** use WebP format for images
- Implement lazy loading for all images
- Use appropriate alt text for medical images
- Optimize images for both mobile and desktop

### Animation Performance

- Target 60fps for all animations
- Use GPU acceleration (transform3d, translateZ)
- Minimize reflows and repaints
- Implement animation cleanup
