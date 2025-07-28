# Design Document

## Overview

The ANN Clinic website will be built as a modern, high-performance medical website using Astro's static site generation capabilities with React components for interactive elements and Tailwind CSS for styling. The architecture prioritizes SEO optimization, fast loading times, and conversion-focused design to attract patients through organic search and paid advertising campaigns.

The design follows a multi-page structure with dedicated pages for each of the 14+ medical specialties, optimized for both generic and location-based keywords (București, Bragadiru). The site will leverage Astro's Content Collections for managing medical articles and blog content, ensuring excellent SEO performance through static generation.

## Architecture

### Technology Stack & Architecture Philosophy

- **Framework**: Astro 5.x with static site generation
- **UI Components**: React 19.x for interactive elements
- **Styling**: Tailwind CSS 4.x with new syntax for responsive design and theming
- **UI Library**: Magic UI - Custom component library with advanced animations
- **Animations**: Framer Motion for interactive animations and micro-interactions
- **Content Management**: Astro Content Collections for articles and service information
- **SEO**: Built-in Astro SEO optimizations with custom meta tags and structured data
- **Performance**: Image optimization, lazy loading, and code splitting
- **Deployment**: Static hosting optimized for Romanian CDN delivery

#### Astro as SEO Shell Philosophy

**Astro serves primarily as an SEO-optimized shell and content delivery system:**

- **Static Generation**: Astro generates static HTML for maximum SEO performance
- **Zero JavaScript by Default**: Only hydrates React components when needed (`client:load`)
- **Content Collections**: Manages medical articles, services, and doctor profiles as structured data
- **SEO Optimization**: Handles meta tags, structured data, and sitemap generation
- **Layout System**: Provides consistent page structure with Header/Footer in BaseLayout

**React Components Handle All Interactivity:**

- **Page Sections**: Each major page section (Hero, Services, Articles) is a React component
- **Magic UI Components**: All interactive elements use React with Framer Motion
- **State Management**: React handles all dynamic behavior and user interactions
- **Component Organization**: Organized by feature (`/components/home/`, `/components/magic-ui/`)

This hybrid approach maximizes both SEO performance (Astro) and user experience (React).

### Magic UI Component System

The website uses a custom Magic UI component library built specifically for medical websites, featuring:

#### Core Magic UI Components:

- **AnimatedButton**: Buttons with shimmer effects, glow animations, and spring interactions
- **MagicCard**: Interactive cards with mouse tracking, glow effects, and hover animations
- **AnimatedText**: Text with staggered fade-in animations and gradient effects
- **FloatingParticles**: Background particle system for visual enhancement
- **AnimatedIcon**: Interactive icons with hover animations and micro-interactions

#### Component Organization:

```
src/components/
├── layout/          # Header, Footer - site structure
├── shared/          # SEO, ThemeToggle - reusable across pages
├── magic-ui/        # Magic UI animated components
├── home/            # Homepage-specific components
└── ui/              # Basic UI components (future expansion)
```

#### Animation Features:

- **Shimmer Effects**: Subtle light animations on buttons and interactive elements
- **Mouse Tracking**: Cards that respond to cursor movement with glow effects
- **Spring Animations**: Natural, physics-based transitions using Framer Motion
- **Particle Systems**: Floating background elements for visual depth
- **Gradient Animations**: Dynamic color transitions and text effects
- **Accessibility**: All animations respect `prefers-reduced-motion` settings

### Site Structure

```
/
├── Homepage (/)
├── Services Hub (/servicii)
├── Individual Service Pages (/servicii/[service])
├── Sub-service Pages (/servicii/[service]/[subservice])
├── Landing Pages (/landing/[campaign])
├── Doctors (/medici)
├── Individual Doctor Pages (/medici/[doctor])
├── Blog/Articles (/articole)
├── Individual Articles (/articole/[article])
├── Appointment Booking (/programare)
├── Contact (/contact)
└── About (/despre-noi)
```

### SEO-Optimized URL Structure

Based on the keyword research, URLs will be in Romanian and optimized for search:

- `/servicii/ginecologie` (targeting "ginecolog București")
- `/servicii/cardiologie` (targeting "cardiolog București")
- `/servicii/dermatologie` (targeting "dermatolog București")
- `/servicii/pediatrie` (targeting "pediatru București")
- `/servicii/ortopedie` (targeting "ortoped București")
- `/servicii/orl` (targeting "ORL București")
- `/servicii/estetica-faciala` (targeting "tratamente estetice faciale")

## Components and Interfaces

### Core Components

#### 1. Header Component

```typescript
interface HeaderProps {
  currentPath: string;
  showAppointmentButton: boolean;
}
```

- Responsive navigation with services dropdown
- Prominent "Programează-te" (Book Appointment) CTA
- Contact information (phone, address)
- Mobile-optimized hamburger menu

#### 2. Service Card Component

```typescript
interface ServiceCardProps {
  service: {
    name: string;
    slug: string;
    description: string;
    icon: string;
    doctorCount: number;
    popularTreatments: string[];
  };
  featured?: boolean;
}
```

- Visual cards for each medical service
- Quick access to popular services
- Doctor availability indicators
- SEO-optimized internal linking

#### 3. Doctor Profile Component

```typescript
interface DoctorProfileProps {
  doctor: {
    name: string;
    specialties: string[];
    qualifications: string[];
    experience: number;
    photo: string;
    availability: AvailabilitySlot[];
  };
  showBookingButton: boolean;
}
```

- Professional doctor presentation
- Qualification and experience display
- Direct booking integration
- Patient review integration (if available)

#### 4. Appointment Booking Widget

```typescript
interface BookingWidgetProps {
  specialty?: string;
  doctor?: string;
  embedded?: boolean;
}
```

- Multi-step booking process
- Service and doctor selection
- Date/time picker with availability
- Patient information collection
- Confirmation and email integration

#### 5. SEO Meta Component

```typescript
interface SEOMetaProps {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  structuredData?: object;
  openGraph?: OpenGraphData;
}
```

- Dynamic meta tag generation
- Structured data for medical services
- Open Graph optimization
- Canonical URL management

### Interactive Features

#### 1. Service Search and Filter

- Real-time search across services and treatments
- Filter by doctor availability
- Location-based service recommendations
- Integration with booking system

#### 2. Contact Forms

- General inquiry form
- Service-specific contact forms
- Emergency contact information
- Integration with clinic management system

#### 3. Map Integration

- Interactive Google Maps embed
- Directions and parking information
- Public transport accessibility
- Multiple contact points display

## Data Models

### Medical Service Data Model

```typescript
interface MedicalService {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  treatments: Treatment[];
  doctors: Doctor[];
  popularSearchTerms: string[];
  relatedServices: string[];
}
```

### Service Data Model

```typescript
interface Service {
  id: string;
  name: string;
  slug: string;
  specialtyId: string;
  description: string;
  duration: number;
  price?: number;
  preparation?: string[];
  seoKeywords: string[];
  landingPageOptimized: boolean;
}
```

### Doctor Data Model

```typescript
interface Doctor {
  id: string;
  name: string;
  slug: string;
  specialties: string[];
  qualifications: string[];
  experience: number;
  photo: string;
  bio: string;
  languages: string[];
  availability: AvailabilitySlot[];
  seoTitle: string;
  seoDescription: string;
}
```

### Content Collection Schemas

Using Astro Content Collections for blog articles:

```typescript
// src/content/config.ts
const articleCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string(),
    specialty: z.string(),
    tags: z.array(z.string()),
    seoKeywords: z.array(z.string()),
    featured: z.boolean().default(false),
    medicallyReviewed: z.boolean().default(false),
  }),
});
```

## Error Handling

### Client-Side Error Handling

- Graceful degradation for JavaScript failures
- Form validation with clear error messages
- Network error handling for booking system
- Fallback content for failed API calls

### SEO Error Handling

- Custom 404 pages with specialty suggestions
- Proper HTTP status codes for all pages
- Redirect management for URL changes
- Broken link monitoring and reporting

### Booking System Error Handling

- Appointment conflict resolution
- Payment processing error handling
- Email delivery failure backup
- Calendar synchronization error recovery

## Testing Strategy

### SEO Testing

- Keyword ranking monitoring for target terms
- Core Web Vitals performance testing
- Mobile-first indexing compatibility
- Structured data validation
- Local SEO optimization verification

### Functionality Testing

- Cross-browser compatibility testing
- Mobile responsiveness across devices
- Booking system integration testing
- Form submission and validation testing
- Contact form delivery verification

### Performance Testing

- Page load speed optimization
- Image optimization and lazy loading
- CDN performance for Romanian users
- Database query optimization
- Caching strategy effectiveness

### Accessibility Testing

- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support
- Color contrast validation
- Alternative text for medical images

## SEO Implementation Strategy

### On-Page SEO

- Title tags optimized for target keywords (e.g., "Ginecolog București - Consultații Ginecologie | ANN Clinic")
- Meta descriptions incorporating long-tail keywords
- H1-H6 hierarchy following SEO best practices
- Internal linking strategy connecting related specialties
- Image alt text with medical keyword optimization

### Technical SEO

- XML sitemap generation with priority settings
- Robots.txt optimization for medical content
- Schema.org markup for medical services
- Canonical URL implementation
- Page speed optimization for Core Web Vitals

### Content SEO Strategy

- Landing pages for high-value keywords:
  - "Ginecolog București" → `/servicii/ginecologie`
  - "Cardiolog București" → `/servicii/cardiologie`
  - "Dermatolog București" → `/servicii/dermatologie`
  - "Tratament acnee București" → `/servicii/dermatologie/tratament-acnee`
  - "Ecografie sarcină București" → `/servicii/obstetrica/ecografie-sarcina`

### Local SEO Optimization

- Google My Business integration
- Local schema markup for Bragadiru location
- Location-specific landing pages
- Local keyword optimization (București, Bragadiru, Ilfov)
- Local directory submissions and citations

## Theming and Visual Design

### Light and Dark Theme Support

The website will implement a comprehensive light and dark theme system using Tailwind CSS 4's new theming capabilities:

#### Theme Implementation

- System preference detection with manual override
- Smooth theme transitions using CSS custom properties
- Consistent color schemes across all components
- Accessibility-compliant contrast ratios for both themes

#### Tailwind CSS 4 Syntax

Using the new Tailwind CSS 4 syntax for theming:

```css
/* Using CSS custom properties for theming */
@theme {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-surface: #ffffff;
  --color-surface-dark: #1f2937;
}

/* Component styling with new syntax */
.service-card {
  @apply bg-surface text-on-surface;
  @apply dark:bg-surface-dark dark:text-on-surface-dark;
}
```

#### Theme Colors for Medical Context

- **Light Theme**: Clean whites, medical blues, trust-building colors
- **Dark Theme**: Dark grays, muted blues, reduced eye strain for evening browsing
- **Accent Colors**: Consistent across themes for CTAs and important elements

### Responsive Design with Tailwind 4

Utilizing Tailwind CSS 4's enhanced responsive design features:

- Container queries for component-based responsiveness
- Improved breakpoint system
- Better mobile-first approach

## Animation and User Experience

### Framer Motion Integration

The website will use Framer Motion (motion.dev) to create subtle, modern animations that enhance user experience without compromising performance:

#### Page Transitions

- Smooth fade-in animations for page loads
- Staggered animations for service cards and content sections
- Subtle parallax effects for hero sections

#### Interactive Elements

- Hover animations for buttons and cards
- Smooth transitions for form interactions
- Loading animations for booking system
- Micro-interactions for user feedback

#### Performance Considerations

- Animations will be optimized for 60fps performance
- Reduced motion preferences will be respected
- Critical animations will be CSS-based for faster initial load
- Complex animations will be lazy-loaded

#### Animation Examples

```typescript
// Service card hover animation
const cardVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 },
  },
};

// Staggered list animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

## Conversion Optimization

### Landing Page Design

- Clear value propositions for each specialty
- Prominent booking CTAs above the fold
- Trust signals (certifications, doctor credentials)
- Patient testimonials and reviews
- Emergency contact information

### Booking Flow Optimization

- Simplified 3-step booking process
- Progress indicators and clear next steps
- Multiple contact options (online, phone, WhatsApp)
- Confirmation and reminder system
- Calendar integration for patients

### AdWords Campaign Support

- Dedicated landing pages for high-value services:
  - Botox treatments (`/landing/botox-bucuresti`)
  - Gynecology consultations (`/landing/ginecolog-bucuresti`)
  - Dermatology treatments (`/landing/dermatolog-bucuresti`)
  - Pediatric care (`/landing/pediatru-bucuresti`)
- A/B testing framework for landing page optimization
- Conversion tracking implementation
- Dynamic keyword insertion support

This design provides a comprehensive foundation for building a modern, SEO-optimized medical clinic website that will effectively compete in the Romanian healthcare market while providing excellent user experience and conversion rates.

## Magic UI Design System

### Color Palette

The website uses an elegant medical color palette optimized for trust and professionalism:

#### Primary Colors

- **Primary Teal**: `#0d9488` - Main brand color, medical trust
- **Primary Hover**: `#0f766e` - Interactive states
- **Primary Light**: `#ccfbf1` - Backgrounds and accents
- **Primary Dark**: `#134e4a` - Deep contrast elements

#### Secondary Colors

- **Secondary Gold**: `#d97706` - Warm accent, premium feel
- **Secondary Hover**: `#b45309` - Interactive gold states
- **Secondary Light**: `#fef3c7` - Subtle backgrounds

#### Accent Colors

- **Accent Rose**: `#e11d48` - Call-to-action elements
- **Accent Hover**: `#be185d` - CTA hover states
- **Accent Light**: `#fce7f3` - Soft highlights

#### Medical Specialty Colors

Each medical specialty has a distinctive color for easy recognition:

- **Cardiology**: `#dc2626` (Red - heart health)
- **Dermatology**: `#ea580c` (Orange - skin care)
- **Gynecology**: `#c2410c` (Warm orange - women's health)
- **Pediatrics**: `#16a34a` (Green - child health)
- **Orthopedics**: `#2563eb` (Blue - bone health)
- **ORL**: `#7c3aed` (Purple - specialized care)
- **Aesthetics**: `#db2777` (Pink - beauty treatments)

### Typography

- **Font Family**: Inter - Modern, medical-grade readability
- **Font Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Romanian Language Support**: Full diacritics support (ă, â, î, ș, ț)
- **Text Shadows**: Used strategically for contrast on gradient backgrounds

### Animation Principles

#### Performance-First Approach

- All animations run at 60fps using GPU acceleration
- CSS transforms and opacity changes for optimal performance
- Framer Motion for complex interactions with spring physics

#### Accessibility Compliance

- Respects `prefers-reduced-motion` user preference
- Animations can be completely disabled for accessibility
- Focus states clearly visible with animated indicators

#### Micro-Interactions

- **Button Hover**: Scale (1.02) + Y-translate (-2px) + glow effect
- **Card Hover**: Y-translate (-8px) + shadow enhancement + border glow
- **Icon Hover**: Scale (1.2) + rotation animation + color transition
- **Text Reveal**: Staggered fade-in with 0.2s delays between elements

### Component Specifications

#### AnimatedButton

```tsx
// Usage examples
<AnimatedButton variant="primary" size="lg" href="/programare">
  📅 Programează Consultație
</AnimatedButton>

<AnimatedButton variant="outline" size="md">
  🏥 Explorează Serviciile
</AnimatedButton>
```

**Features:**

- Shimmer animation on hover (0.8s duration)
- Glow effect with blur and opacity transitions
- Spring animation with stiffness: 400, damping: 17
- Three variants: primary, secondary, outline
- Three sizes: sm, md, lg

#### MagicCard

```tsx
<MagicCard glowColor="rgba(13, 148, 136, 0.4)">
  <div>Card content with mouse tracking</div>
</MagicCard>
```

**Features:**

- Real-time mouse position tracking
- Radial gradient glow following cursor
- Border gradient animation
- Spotlight effect on hover
- Y-axis lift animation (-8px on hover)

#### FloatingParticles

```tsx
<FloatingParticles count={30} colors={["#0d9488", "#14b8a6", "#d97706"]} />
```

**Features:**

- Configurable particle count and colors
- Floating animation with random patterns
- Opacity and scale variations
- Performance optimized with CSS transforms

### Responsive Design

#### Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

#### Mobile-First Approach

- All Magic UI components are mobile-optimized
- Touch-friendly interactive areas (minimum 44px)
- Reduced animation complexity on mobile for performance
- Simplified particle systems on smaller screens

### Theme System

#### Light/Dark Mode Support

- Automatic theme detection using `prefers-color-scheme`
- Manual theme toggle with system/light/dark options
- CSS custom properties with `light-dark()` functions
- Smooth transitions between themes (0.3s duration)

#### Theme-Aware Components

All Magic UI components automatically adapt to theme changes:

- Text colors adjust for optimal contrast
- Background gradients shift appropriately
- Border colors maintain visibility
- Glow effects adapt to theme context

### Performance Optimizations

#### Animation Performance

- CSS transforms instead of layout-affecting properties
- `will-change` property for elements with animations
- Animation cleanup on component unmount
- Reduced motion fallbacks for accessibility

#### Loading Strategy

- Critical CSS inlined for above-the-fold content
- Magic UI components lazy-loaded with `client:load`
- Progressive enhancement for non-JavaScript users
- Optimized bundle splitting for animations

This Magic UI design system ensures a modern, professional, and highly interactive experience while maintaining excellent performance and accessibility standards for the medical website.
