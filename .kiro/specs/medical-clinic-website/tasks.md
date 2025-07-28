# Implementation Plan

## Architecture Overview

This implementation follows a **hybrid Astro + React architecture**:

- **Astro (.astro)**: SEO-optimized shell, layouts, static content, Content Collections
- **React (.tsx)**: Interactive components, animations, Magic UI system, dynamic behavior
- **Magic UI**: Custom component library with advanced animations using Framer Motion
- **Tailwind CSS 4**: Modern styling with light-dark() theming and custom properties

### Component Organization:

- `/components/home/` - Homepage sections (React)
- `/components/magic-ui/` - Interactive UI components (React)
- `/components/layout/` - Layout components (Astro)
- `/components/shared/` - Shared components (Mixed)
- `/types/content.ts` - Global TypeScript interfaces

- [x] 1. Project Setup and Configuration

  - Configure Content Collections for medical articles and services
  - Set up SEO and meta tag management system
  - Configure Tailwind CSS 4 theming system with Romanian language support
  - Set up project structure for Romanian medical website
  - Implement Astro + React hybrid architecture with Magic UI components
  - Create global TypeScript types for Content Collections
  - _Requirements: 4.1, 4.2, 7.1, 7.2, 8.1, 10.1_

- [x] 2. Core Layout and Theme System

  - [x] 2.1 Create BaseLayout with integrated Header and Footer (Astro)

    - Implement BaseLayout.astro as SEO-optimized shell
    - Create Header.astro with responsive navigation and Magic UI AnimatedButton
    - Create Footer.astro with clinic information and links
    - Integrate Header/Footer into BaseLayout for consistency across pages
    - _Requirements: 4.1, 4.4, 7.1_

  - [x] 2.2 Implement light/dark theme system using Tailwind CSS 4
    - Set up CSS custom properties with light-dark() function
    - Create ThemeToggle React component with system preference detection
    - Implement smooth theme transitions and accessibility compliance
    - Remove dark: classes in favor of automatic theme switching
    - _Requirements: 4.1, 4.4, 7.2_

- [x] 3. Homepage Development with React Components

  - [x] 3.1 Create HeroSection React component

    - Implement HeroSection.tsx with Magic UI components (AnimatedText, GradientText)
    - Add FloatingParticles background animation system
    - Include AnimatedButton components for CTAs with shimmer effects
    - Add trust indicators with animated statistics
    - Optimize for "clinică medicală București" keywords
    - _Requirements: 1.1, 2.1, 2.2, 5.1, 8.1_

  - [x] 3.2 Build ServicesSection React component

    - Create ServicesSection.tsx with MagicCard components for service display
    - Implement mouse tracking and glow effects for service cards
    - Add AnimatedIcon components for service icons with hover animations
    - Include AnimatedButton for "Află mai multe" links
    - Display all medical services with proper TypeScript interfaces
    - _Requirements: 1.1, 1.3, 2.1, 8.1, 10.1_

  - [x] 3.3 Create ArticlesSection React component
    - Implement ArticlesSection.tsx with MagicCard components for articles
    - Add featured articles display with specialty categorization
    - Include AnimatedButton components for article links
    - Integrate with Astro Content Collections for article data
    - _Requirements: 6.1, 8.1, 8.2, 9.1_

- [x] 4. Service Pages Development with Astro + React

  - [x] 4.1 Create service page template (Astro + React components)

    - Design ServiceLayout.astro for SEO optimization and static content
    - Create ServiceHero React component with Magic UI animations
    - Build ServiceDetails React component with MagicCard for treatments
    - Create DoctorProfiles React component with AnimatedCard displays
    - Add BookingWidget React component with Magic UI interactions
    - Implement SEO optimization with dynamic meta tags in Astro
    - _Requirements: 1.2, 1.3, 2.1, 2.2, 7.1, 8.1_

  - [x] 4.2 Implement Ginecologie service page (/servicii/ginecologie)

    - Create content optimized for "ginecolog București" keywords
    - Include sub-services like consultații and screening
    - Add doctor profiles specializing in gynecology
    - Implement booking widget for gynecology appointments
    - _Requirements: 1.2, 2.1, 2.3, 3.1_

  - [x] 4.3 Implement Cardiologie service page (/servicii/cardiologie)

    - Create content optimized for "cardiolog București" keywords
    - Include investigații cardiologice (EKG, ecocardiografie)
    - Add cardiology doctor profiles and specializations
    - Implement booking widget for cardiology consultations
    - _Requirements: 1.2, 2.1, 2.3, 3.1_

  - [x] 4.4 Implement Dermatologie service page (/servicii/dermatologie)

    - Create content optimized for "dermatolog București" keywords
    - Include sub-services like tratament acnee and dermatoscopie
    - Add dermatology doctor profiles and treatments offered
    - Implement booking widget for dermatology appointments
    - _Requirements: 1.2, 2.1, 2.3, 3.1_

  - [x] 4.5 Implement Pediatrie service page (/servicii/pediatrie)

    - Create content optimized for "pediatru București" keywords
    - Include sub-services like consultații and vaccinări
    - Add pediatric doctor profiles and age specializations
    - Implement booking widget for pediatric appointments
    - _Requirements: 1.2, 2.1, 2.3, 3.1_

  - [x] 4.6 Implement remaining service pages (Ortopedie, ORL, Estetică Facială, etc.)
    - Create all remaining 10+ service pages using the template
    - Optimize each page for specific keywords from research
    - Include relevant sub-services and doctor profiles
    - Implement service-specific booking widgets
    - _Requirements: 1.2, 1.5, 2.1, 2.3, 3.1_

- [x] 5. Sub-Service Landing Pages

  - [x] 5.1 Create high-value treatment landing pages

    - Build dedicated pages for "tratament acnee București"
    - Create "botox București" landing page for aesthetic treatments
    - Develop "ecografie sarcină București" page for obstetrics
    - Optimize each page for specific long-tail keywords
    - _Requirements: 2.2, 2.3, 5.1, 5.2_

  - [x] 5.2 Implement AdWords campaign landing pages
    - Create conversion-optimized landing pages for paid campaigns
    - Include clear value propositions and prominent CTAs
    - Add trust signals and doctor credentials
    - Implement A/B testing framework for optimization
    - _Requirements: 5.1, 5.2, 5.3, 5.5_

- [x] 6. Doctor Profiles System

  - [x] 6.1 Create doctor profile template

    - Design individual doctor profile pages
    - Include qualifications, experience, and specializations
    - Add professional photos and patient reviews section
    - Implement direct booking functionality for specific doctors
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 6.2 Build doctors listing page (/medici)
    - Create comprehensive doctors directory
    - Implement filtering by specialty and availability
    - Add search functionality for finding specific doctors
    - Include doctor cards with key information and booking links
    - _Requirements: 6.1, 6.2, 6.5_

- [x] 7. Appointment Booking System (React + Magic UI)

  - [x] 7.1 Create BookingWidget React component with Magic UI

    - Design multi-step booking process using MagicCard components
    - Implement AnimatedButton components for step navigation
    - Add date/time picker with Magic UI animations and availability checking
    - Create patient information forms with animated input validation
    - Include booking confirmation with AnimatedText success messages
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 8.1_

  - [x] 7.2 Build dedicated booking page (/programare) with Astro + React
    - Create BookingLayout.astro for SEO optimization
    - Build comprehensive BookingInterface React component
    - Implement service and doctor selection with Magic UI components
    - Add booking history component for returning patients
    - Include emergency contact with AnimatedButton for urgent booking
    - _Requirements: 3.1, 3.2, 3.5, 7.1, 8.1_

- [x] 8. Content Management System

  - [x] 8.1 Set up Astro Content Collections for articles

    - Configure content collection schemas for medical articles
    - Set up frontmatter structure for SEO optimization
    - Create article templates with proper meta tag generation
    - Implement categorization by medical specialty
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 8.2 Create blog/articles section (/articole)
    - Build articles listing page with filtering by specialty
    - Implement article search functionality
    - Create individual article pages with SEO optimization
    - Add related articles and internal linking structure
    - _Requirements: 7.1, 7.4, 7.5_

- [x] 9. Contact and Location Pages

  - [x] 9.1 Build contact page (/contact)

    - Include all contact methods (phone, email, contact form)
    - Add interactive Google Maps integration with directions
    - Display operating hours and holiday schedules
    - Implement service-specific contact forms
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [x] 9.2 Create about page (/despre-noi)
    - Include clinic history, mission, and values
    - Add team information and clinic facilities
    - Include certifications and medical equipment information
    - Optimize for local SEO and trust-building keywords
    - _Requirements: 8.1, 8.5_

- [x] 10. SEO Optimization and Performance

  - [x] 10.1 Implement comprehensive SEO strategy

    - Add structured data markup for medical services
    - Create XML sitemap with priority settings
    - Implement canonical URLs and meta tag optimization
    - Add Open Graph and Twitter Card meta tags
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 10.2 Optimize website performance
    - Implement image optimization and lazy loading
    - Add code splitting and bundle optimization
    - Optimize Core Web Vitals scores
    - Implement caching strategies for static content
    - _Requirements: 4.1, 4.2, 4.3_

- [x] 11. Magic UI Component System Enhancement

  - [x] 11.1 Implement Magic UI component library

    - Create AnimatedButton with shimmer effects and spring animations
    - Build MagicCard with mouse tracking and glow effects
    - Implement AnimatedText with staggered fade-in animations
    - Add FloatingParticles system for background animations
    - Create AnimatedIcon with hover interactions
    - Set up Magic UI configuration system with performance optimizations
    - _Requirements: 4.4, 8.1, 8.2_

  - [x] 11.2 Add advanced interactive features
    - Implement real-time search across services and doctors using React
    - Add filtering by specialty, availability, and location with Magic UI
    - Create search results pages with proper SEO (Astro) and interactions (React)
    - Include search suggestions and autocomplete with animated components
    - _Requirements: 1.1, 6.2, 8.1_

- [ ] 12. Testing and Quality Assurance

  - [ ] 12.1 Implement comprehensive testing

    - Test responsive design across all devices and browsers
    - Verify booking system functionality and email integration
    - Test all contact forms and user interactions
    - Validate SEO implementation and meta tags
    - _Requirements: 4.1, 4.4, 3.1, 2.1_

  - [ ] 12.2 Accessibility and performance testing
    - Ensure WCAG 2.1 AA compliance
    - Test screen reader compatibility and keyboard navigation
    - Validate Core Web Vitals and page speed scores
    - Test theme switching and color contrast ratios
    - _Requirements: 4.1, 4.4_

- [ ] 13. Component Architecture Documentation and Optimization

  - [x] 13.1 Document component architecture and create type system

    - Create comprehensive component README with architecture explanation
    - Implement global TypeScript types in /types/content.ts
    - Document Astro vs React component usage guidelines
    - Create component organization structure (/home/, /magic-ui/, /layout/, /shared/)
    - _Requirements: 7.1, 8.1, 10.1, 10.2_

  - [ ] 13.2 Optimize component performance and bundle size
    - Implement selective hydration strategies for React components
    - Optimize Magic UI components for performance
    - Add lazy loading for heavy animations and interactions
    - Minimize JavaScript bundle size through component-level code splitting
    - _Requirements: 4.1, 4.2, 4.3, 8.1_

- [ ] 14. Content Population and Launch Preparation

  - [ ] 14.1 Populate all service pages with Romanian content

    - Add comprehensive service descriptions in Romanian
    - Include doctor profiles with Romanian qualifications
    - Create initial set of medical articles in Romanian
    - Add all contact information and clinic details
    - _Requirements: 1.1, 1.2, 6.1, 9.1_

  - [ ] 14.2 Final optimization and launch preparation
    - Conduct final SEO audit and keyword optimization
    - Test all booking flows and contact forms with Magic UI components
    - Verify Google Analytics and conversion tracking setup
    - Prepare AdWords campaigns with keyword groups from research
    - Test Astro + React hybrid architecture performance
    - _Requirements: 2.1, 3.1, 5.1, 5.4, 7.1_
