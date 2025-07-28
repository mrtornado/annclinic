# Performance & Optimization Rules - ANN Clinic Website

## Core Web Vitals Targets

### Performance Metrics

```
Target Metrics:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- FCP (First Contentful Paint): < 1.8s
- TTI (Time to Interactive): < 3.5s
```

### Performance Budget

```
JavaScript Bundle Size:
- Main bundle: < 100KB gzipped
- Individual chunks: < 50KB gzipped
- Total JavaScript: < 200KB gzipped

Image Optimization:
- Hero images: < 150KB WebP
- Service images: < 50KB WebP
- Doctor photos: < 30KB WebP
- Icons: SVG format preferred
```

## Astro Performance Optimization

### Static Site Generation Rules

```typescript
// astro.config.mjs
export default defineConfig({
  output: "static", // ALWAYS use static for medical sites
  integrations: [
    react(), // Only for interactive components
    tailwind({
      applyBaseStyles: false, // Custom base styles in global.css
    }),
  ],

  // Image optimization
  image: {
    formats: ["webp", "avif"],
    quality: 80,
  },

  // Build optimization
  build: {
    inlineStylesheets: "auto",
    splitting: true,
  },

  // SEO optimization
  site: "https://annclinic.ro",
  base: "/",
});
```

### Component Hydration Strategy

```astro
<!-- ONLY hydrate when necessary -->

<!-- Immediate hydration for critical interactions -->
<BookingWidget client:load />

<!-- Lazy hydration for below-the-fold content -->
<ServicesSection client:visible />

<!-- Idle hydration for non-critical features -->
<ThemeToggle client:idle />

<!-- Media query hydration for mobile-only components -->
<MobileMenu client:media="(max-width: 768px)" />

<!-- NEVER use client:only unless absolutely necessary -->
```

## Image Optimization Rules

### Image Format Standards

```typescript
// ALWAYS use this hierarchy for image formats
const imageFormats = {
  primary: "webp", // Modern browsers
  fallback: "jpg", // Legacy browser support
  quality: 80, // Optimal quality/size balance
  sizes: [
    // Responsive image sizes
    "(max-width: 768px) 100vw",
    "(max-width: 1024px) 50vw",
    "33vw",
  ],
};

// Implementation example
<picture>
  <source
    srcSet="/images/hero-mobile.webp"
    media="(max-width: 768px)"
    type="image/webp"
  />
  <source
    srcSet="/images/hero-desktop.webp"
    media="(min-width: 769px)"
    type="image/webp"
  />
  <img
    src="/images/hero-desktop.jpg"
    alt="ANN Clinic - Servicii medicale în Bragadiru"
    loading="lazy"
    width="1200"
    height="600"
  />
</picture>;
```

### Lazy Loading Implementation

```typescript
// ALWAYS implement lazy loading for below-the-fold images
const LazyImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
}: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={{
        aspectRatio: `${width}/${height}`,
        objectFit: "cover",
      }}
    />
  );
};
```

## CSS Performance Rules

### Tailwind CSS 4 Optimization

```css
/* src/styles/global.css */
@import "tailwindcss";

/* ALWAYS purge unused styles in production */
@config "./tailwind.config.js";

/* Critical CSS should be inlined */
@utility container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Custom utilities for medical context */
@utility medical-shadow {
  box-shadow: 0 4px 20px rgba(13, 148, 136, 0.1);
}

@utility medical-gradient {
  background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
}
```

### Animation Performance

```css
/* ALWAYS use these performance optimizations for animations */
.optimized-animation {
  /* Use transform and opacity only */
  transform: translateZ(0); /* Force GPU acceleration */
  will-change: transform, opacity;

  /* Avoid animating layout properties */
  /* NEVER animate: width, height, margin, padding, top, left */
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## React Performance Optimization

### Component Optimization Patterns

```tsx
// Use React.memo for expensive components
const ExpensiveServiceCard = React.memo(
  ({ service }: ServiceCardProps) => {
    return <MagicCard>{/* Component content */}</MagicCard>;
  },
  (prevProps, nextProps) => {
    // Custom comparison for complex objects
    return prevProps.service.id === nextProps.service.id;
  }
);

// Use useCallback for event handlers
const DoctorsListing = ({ doctors }: DoctorsListingProps) => {
  const handleDoctorSelect = useCallback((doctorId: string) => {
    // Handle selection
  }, []);

  return (
    <div>
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          onSelect={handleDoctorSelect}
        />
      ))}
    </div>
  );
};

// Use useMemo for expensive calculations
const ServicesSection = ({ services }: ServicesSectionProps) => {
  const featuredServices = useMemo(
    () => services.filter((service) => service.featured),
    [services]
  );

  return (
    <section>
      {featuredServices.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </section>
  );
};
```

### Bundle Splitting Strategy

```typescript
// Lazy load heavy components
const BookingWidget = lazy(() => import("./BookingWidget"));
const ContactForm = lazy(() => import("./ContactForm"));

// Use React.Suspense with fallbacks
const LazyBookingSection = () => (
  <Suspense fallback={<BookingWidgetSkeleton />}>
    <BookingWidget />
  </Suspense>
);

// Dynamic imports for non-critical features
const loadAnalytics = () => import("./analytics");
const loadChatWidget = () => import("./chat-widget");
```

## Loading Strategy Rules

### Critical Path Optimization

```html
<!-- Inline critical CSS -->
<style>
  /* Above-the-fold styles only */
  .hero-section {
    /* Critical styles */
  }
  .navigation {
    /* Critical styles */
  }
</style>

<!-- Preload critical resources -->
<link
  rel="preload"
  href="/fonts/inter-variable.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link rel="preload" href="/images/hero-image.webp" as="image" />

<!-- Prefetch likely next pages -->
<link rel="prefetch" href="/servicii/ginecologie" />
<link rel="prefetch" href="/medici" />
```

### Progressive Enhancement

```typescript
// ALWAYS provide fallbacks for JavaScript features
const ProgressiveBookingWidget = () => {
  const [isJSEnabled, setIsJSEnabled] = useState(false);

  useEffect(() => {
    setIsJSEnabled(true);
  }, []);

  return (
    <div>
      {/* Fallback form always available */}
      <noscript>
        <form action="/contact" method="post">
          <input name="service" type="hidden" value="booking" />
          <input name="name" placeholder="Nume complet" required />
          <input name="phone" placeholder="Telefon" required />
          <textarea name="message" placeholder="Mesaj"></textarea>
          <button type="submit">Trimite solicitarea</button>
        </form>
      </noscript>

      {/* Enhanced version with JavaScript */}
      {isJSEnabled && <InteractiveBookingWidget />}
    </div>
  );
};
```

## Database and API Performance

### Content Collections Optimization

```typescript
// Optimize content queries
const getServicesBySpecialty = async (specialty: string) => {
  // Use getCollection with filtering for better performance
  const allServices = await getCollection("services", ({ data }) => {
    return data.specialty === specialty && data.published === true;
  });

  // Sort by priority for consistent ordering
  return allServices.sort((a, b) => b.data.priority - a.data.priority);
};

// Cache expensive operations
const getCachedDoctors = cache(async () => {
  const doctors = await getCollection("doctors");
  return doctors.map(({ data, slug }) => ({
    ...data,
    slug,
    href: `/medici/${slug}`,
  }));
});
```

### Static Data Pre-generation

```typescript
// Generate static data at build time
export async function getStaticPaths() {
  const services = await getCollection("services");

  return services.map((service) => ({
    params: { slug: service.slug },
    props: {
      service: service.data,
      relatedServices: getRelatedServices(service.data.specialty),
      doctors: getDoctorsBySpecialty(service.data.specialty),
    },
  }));
}
```

## Monitoring and Analytics

### Performance Monitoring

```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

// Track Core Web Vitals
getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);

// Custom performance tracking for medical site
const trackMedicalInteractions = {
  bookingStarted: () => gtag("event", "booking_started"),
  serviceViewed: (service: string) =>
    gtag("event", "service_viewed", { service }),
  doctorProfileViewed: (doctor: string) =>
    gtag("event", "doctor_viewed", { doctor }),
  contactFormSubmitted: () => gtag("event", "contact_form_submitted"),
};
```

### Error Tracking

```typescript
// Error boundary with performance impact tracking
class PerformanceErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Track component errors that impact performance
    gtag("event", "exception", {
      description: error.message,
      fatal: false,
      custom_map: { component: errorInfo.componentStack },
    });
  }
}
```

## Deployment Optimization

### Build Process Rules

```bash
# ALWAYS run these optimizations before deployment
npm run build

# Analyze bundle size
npm run build:analyze

# Performance audit
npm run lighthouse

# Security audit
npm audit

# Check for unused dependencies
npm run depcheck
```

### CDN and Caching Strategy

```typescript
// Cache headers for different content types
const cacheHeaders = {
  // Static assets - long cache
  ".webp": "public, max-age=31536000, immutable",
  ".svg": "public, max-age=31536000, immutable",
  ".woff2": "public, max-age=31536000, immutable",

  // HTML - short cache for updates
  ".html": "public, max-age=3600, must-revalidate",

  // API responses - medical data should be fresh
  "/api/": "public, max-age=300, must-revalidate",
};
```

### Performance Testing Checklist

- [ ] Lighthouse score > 90 for all Core Web Vitals
- [ ] Test on 3G connection simulation
- [ ] Test on mobile devices (iPhone, Android)
- [ ] Verify image lazy loading works correctly
- [ ] Check JavaScript bundle sizes
- [ ] Validate Romanian text rendering on all devices
- [ ] Test booking widget performance under load
- [ ] Verify accessibility performance doesn't degrade
