# Component Rules - ANN Clinic Website

## React Component Organization

### Component Structure by Feature

```
src/components/
├── layout/           # Astro layouts only
│   ├── Header.astro
│   ├── Footer.astro
│   └── BaseLayout.astro
├── shared/           # Reusable across features
│   ├── SEO.astro
│   ├── ThemeToggle.tsx
│   └── ABTestingFramework.tsx
├── magic-ui/         # Interactive UI library
│   ├── AnimatedButton.tsx
│   ├── MagicCard.tsx
│   ├── AnimatedText.tsx
│   ├── FloatingParticles.tsx
│   └── AnimatedIcon.tsx
├── home/             # Homepage-specific
│   ├── HeroSection.tsx
│   ├── ServicesSection.tsx
│   └── ArticlesSection.tsx
├── services/         # Service-related
│   ├── ServiceHero.tsx
│   ├── ServiceDetails.tsx
│   ├── BookingWidget.tsx
│   └── DoctorProfiles.tsx
├── doctors/          # Doctor-related
│   ├── DoctorsHero.tsx
│   ├── DoctorsListing.tsx
│   └── DoctorDetails.tsx
├── articles/         # Blog/articles
│   ├── ArticlesHero.tsx
│   ├── ArticlesListing.tsx
│   └── ArticleSearch.tsx
└── contact/          # Contact page
    ├── ContactHero.tsx
    ├── ContactForm.tsx
    ├── ContactInfo.tsx
    └── LocationMap.tsx
```

## Component Interface Standards

### Required Props Interface

```typescript
// ALWAYS define interfaces for component props
interface ComponentNameProps {
  // Required props first
  title: string;
  description: string;

  // Optional props with defaults
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;

  // Event handlers
  onClick?: () => void;
  onSubmit?: (data: FormData) => void;

  // Children and composition
  children?: React.ReactNode;
}

// Export interface for reuse
export type { ComponentNameProps };
```

### Global Type Definitions

```typescript
// src/types/content.ts
export interface MedicalService {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  specialtyColor: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  doctors: Doctor[];
}

export interface Doctor {
  id: string;
  name: string;
  slug: string;
  specialties: string[];
  qualifications: string[];
  experience: number;
  photo: string;
  bio: string;
  languages: string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishDate: Date;
  specialty: string;
  tags: string[];
  featured: boolean;
}
```

## Magic UI Component Standards

### AnimatedButton Implementation

```tsx
interface AnimatedButtonProps {
  variant: "primary" | "secondary" | "outline";
  size: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

// ALWAYS include these features:
// - Shimmer animation on hover
// - Spring physics with stiffness: 400, damping: 17
// - Glow effect with blur and opacity
// - Emoji icons for visual appeal
// - Proper accessibility attributes

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant,
  size,
  href,
  onClick,
  children,
  className,
  disabled = false,
}) => {
  // Implementation with Framer Motion
};
```

### MagicCard Implementation

```tsx
interface MagicCardProps {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
  spotlight?: boolean;
  border?: boolean;
}

// ALWAYS include these features:
// - Mouse tracking with useMousePosition hook
// - Radial gradient glow following cursor
// - Y-axis lift animation on hover (-8px)
// - Border gradient animation
// - Performance-optimized transform calculations

export const MagicCard: React.FC<MagicCardProps> = ({
  children,
  glowColor = "rgba(13, 148, 136, 0.4)",
  className,
  spotlight = true,
  border = true,
}) => {
  // Implementation with mouse tracking
};
```

## Component Composition Patterns

### Service Card Pattern

```tsx
// Use this pattern for all service-related cards
const ServiceCard = ({ service }: { service: MedicalService }) => (
  <MagicCard glowColor={`rgba(${service.specialtyColor}, 0.4)`}>
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <AnimatedIcon icon={service.icon} />
        <h3 className="text-xl font-semibold">{service.name}</h3>
      </div>

      <p className="text-gray-600 dark:text-gray-300">{service.description}</p>

      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          {service.doctors.length} medici specialiști
        </p>

        <AnimatedButton
          variant="primary"
          size="sm"
          href={`/servicii/${service.slug}`}
        >
          📋 Vezi Detalii
        </AnimatedButton>
      </div>
    </div>
  </MagicCard>
);
```

### Doctor Profile Pattern

```tsx
const DoctorProfile = ({ doctor }: { doctor: Doctor }) => (
  <MagicCard>
    <div className="p-6 text-center space-y-4">
      <img
        src={doctor.photo}
        alt={`Dr. ${doctor.name}`}
        className="w-24 h-24 rounded-full mx-auto object-cover"
      />

      <div>
        <h3 className="text-xl font-semibold">Dr. {doctor.name}</h3>
        <p className="text-primary-600">{doctor.specialties.join(", ")}</p>
        <p className="text-sm text-gray-500">
          {doctor.experience} ani experiență
        </p>
      </div>

      <AnimatedButton
        variant="outline"
        size="sm"
        href={`/medici/${doctor.slug}`}
      >
        👤 Vezi Profil
      </AnimatedButton>
    </div>
  </MagicCard>
);
```

## Animation Rules

### Framer Motion Standards

```tsx
// Use these exact animation configurations
const cardVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};
```

### Performance-First Animation

```tsx
// ALWAYS use these optimization techniques
const optimizedComponent = {
  // Use transform and opacity only
  whileHover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.2 },
  },

  // Add will-change for performance
  style: { willChange: "transform" },

  // Respect reduced motion preference
  initial: false,
  animate: !prefersReducedMotion ? "visible" : "reducedMotion",
};
```

## Form Component Standards

### Contact Form Pattern

```tsx
interface ContactFormProps {
  specialty?: string;
  doctorId?: string;
  onSubmit: (data: ContactFormData) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  specialty,
  doctorId,
  onSubmit,
}) => {
  // ALWAYS include:
  // - Form validation with proper error messages
  // - Loading states during submission
  // - Success/error feedback
  // - Accessibility attributes
  // - Romanian language labels and messages
};
```

### Booking Widget Pattern

```tsx
interface BookingWidgetProps {
  embedded?: boolean;
  preselectedService?: string;
  preselectedDoctor?: string;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({
  embedded = false,
  preselectedService,
  preselectedDoctor,
}) => {
  // Multi-step booking process:
  // 1. Service selection
  // 2. Doctor selection
  // 3. Date/time selection
  // 4. Patient information
  // 5. Confirmation
};
```

## Responsive Component Guidelines

### Mobile-First Implementation

```tsx
// ALWAYS design mobile-first, enhance for larger screens
const ResponsiveComponent = () => (
  <div
    className={cn(
      // Mobile styles (default)
      "p-4 text-sm space-y-4",
      // Tablet styles
      "md:p-6 md:text-base md:space-y-6",
      // Desktop styles
      "lg:p-8 lg:text-lg lg:space-y-8",
      // Large desktop
      "xl:p-12 xl:text-xl xl:space-y-12"
    )}
  >
    {children}
  </div>
);
```

### Touch-Friendly Interactions

```tsx
// Ensure minimum 44px touch targets
const TouchFriendlyButton = () => (
  <button
    className={cn(
      "min-h-[44px] min-w-[44px]", // Minimum touch target
      "touch-manipulation", // Optimize for touch
      "active:scale-95", // Touch feedback
      "transition-transform duration-150"
    )}
  >
    {children}
  </button>
);
```

## Error Handling Standards

### Component Error Boundaries

```tsx
// Wrap interactive components with error boundaries
const SafeComponent = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary
    fallback={<ErrorFallback />}
    onError={(error, errorInfo) => {
      console.error("Component error:", error, errorInfo);
      // Send to error reporting service
    }}
  >
    {children}
  </ErrorBoundary>
);
```

### Graceful Degradation

```tsx
// Components should work without JavaScript
const ProgressivelyEnhanced = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {/* Basic functionality always available */}
      <BasicContent />

      {/* Enhanced features only when JavaScript loads */}
      {isClient && <EnhancedFeatures />}
    </div>
  );
};
```

## Testing Requirements

### Component Testing Standards

- **ALWAYS** test component rendering with different props
- **ALWAYS** test accessibility with screen readers
- **ALWAYS** test responsive behavior on mobile devices
- **ALWAYS** test animations respect `prefers-reduced-motion`
- **ALWAYS** test Romanian language content displays correctly
