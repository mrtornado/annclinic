# Components Architecture

## Overview

This project uses a hybrid Astro + React architecture where Astro serves as an SEO-optimized shell and React handles all interactivity.

## Directory Structure

```
src/components/
├── home/              # Homepage-specific React components
│   ├── HeroSection.tsx
│   ├── ServicesSection.tsx
│   └── ArticlesSection.tsx
├── layout/            # Layout components (Astro)
│   ├── Header.astro
│   └── Footer.astro
├── magic-ui/          # Interactive UI components (React)
│   ├── AnimatedButton.tsx
│   ├── MagicCard.tsx
│   ├── AnimatedText.tsx
│   ├── FloatingParticles.tsx
│   └── AnimatedIcon.tsx
└── shared/            # Shared components
    ├── SEO.astro
    └── ThemeToggle.tsx
```

## Architecture Principles

### Astro Components (.astro)

- **Purpose**: SEO optimization, static content, layout structure
- **Usage**: Layouts, static sections, SEO components
- **Benefits**: Zero JavaScript, perfect SEO, fast loading

### React Components (.tsx)

- **Purpose**: Interactivity, animations, dynamic content
- **Usage**: Interactive sections, Magic UI components, state management
- **Benefits**: Rich interactions, animations, component reusability

## Component Guidelines

### Homepage Components (`/home/`)

Each major section of the homepage is a separate React component:

- `HeroSection.tsx` - Hero banner with animations and CTAs
- `ServicesSection.tsx` - Medical services grid with Magic UI cards
- `ArticlesSection.tsx` - Featured articles with interactive elements

### Magic UI Components (`/magic-ui/`)

Reusable interactive components with advanced animations:

- `AnimatedButton` - Buttons with shimmer and glow effects
- `MagicCard` - Cards with mouse tracking and hover animations
- `AnimatedText` - Text with fade-in and stagger animations
- `FloatingParticles` - Background particle system
- `AnimatedIcon` - Icons with hover animations

### Layout Components (`/layout/`)

Astro components for consistent page structure:

- `Header.astro` - Site navigation and branding
- `Footer.astro` - Site footer with links and info

## Usage Examples

### In Astro Pages

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import HeroSection from "../components/home/HeroSection.tsx";
---

<BaseLayout title="Page Title">
  <HeroSection client:load />
</BaseLayout>
```

### In React Components

```tsx
import AnimatedButton from "../magic-ui/AnimatedButton";
import MagicCard from "../magic-ui/MagicCard";

export default function MySection() {
  return (
    <MagicCard>
      <h2>Section Title</h2>
      <AnimatedButton href="/contact">Contact Us</AnimatedButton>
    </MagicCard>
  );
}
```

## Performance Considerations

- **Selective Hydration**: Only interactive components use `client:load`
- **Component Splitting**: Each section is a separate component for better code splitting
- **Lazy Loading**: Heavy animations are loaded only when needed
- **Static Generation**: Astro generates static HTML for maximum performance

## SEO Benefits

- **Static HTML**: All content is pre-rendered for search engines
- **Structured Data**: SEO component handles schema markup
- **Meta Tags**: Automatic generation of SEO-optimized meta tags
- **Fast Loading**: Minimal JavaScript for better Core Web Vitals
