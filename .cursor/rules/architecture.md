# Architecture Rules - ANN Clinic Website

## Hybrid Astro + React Architecture

### Astro as SEO Shell

- **ALWAYS** use Astro (.astro files) for:
  - Page layouts (BaseLayout, ServiceLayout, etc.)
  - SEO-critical components (Header, Footer, SEO meta tags)
  - Static content pages
  - Content Collection pages for articles, doctors, services
- **NEVER** add JavaScript to Astro components unless absolutely necessary
- Use Astro Content Collections for all structured content (articles, doctors, services)

### React for Interactivity

- **ALWAYS** use React (.tsx files) for:
  - Interactive components (buttons, forms, animations)
  - Page sections with dynamic behavior
  - Magic UI components
  - Components that need state management
- Use `client:load` directive for React components that need immediate hydration
- Use `client:visible` for components that can be lazily loaded

## File Organization Rules

### Component Structure

```
src/components/
├── layout/          # Astro layouts (Header.astro, Footer.astro)
├── shared/          # Reusable components (SEO.astro, ThemeToggle.tsx)
├── magic-ui/        # Interactive UI components (React + Framer Motion)
├── home/            # Homepage-specific React components
├── services/        # Service-related components
├── doctors/         # Doctor-related components
└── contact/         # Contact page components
```

### Page Organization

```
src/pages/
├── index.astro                    # Homepage
├── servicii/
│   ├── index.astro               # Services listing
│   └── [...slug].astro           # Dynamic service pages
├── medici/
│   ├── index.astro               # Doctors listing
│   └── [...slug].astro           # Dynamic doctor pages
├── articole/                     # Medical articles
└── landing/                      # AdWords landing pages
```

## Content Collections Schema

### Services Collection

```typescript
const servicesCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    icon: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    keywords: z.array(z.string()),
    specialtyColor: z.string(),
    doctorIds: z.array(z.string()),
    treatments: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});
```

### Doctors Collection

```typescript
const doctorsCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    specialties: z.array(z.string()),
    qualifications: z.array(z.string()),
    experience: z.number(),
    photo: z.string(),
    bio: z.string(),
    languages: z.array(z.string()),
    seoTitle: z.string(),
    seoDescription: z.string(),
  }),
});
```

## Romanian Language Requirements

- **ALL** content must be in Romanian
- Use proper Romanian diacritics: ă, â, î, ș, ț
- URL slugs should be in Romanian (e.g., `/servicii/cardiologie`)
- SEO keywords must target Romanian terms
- Meta tags and structured data in Romanian

## TypeScript Requirements

- **ALWAYS** define interfaces for component props
- Use global type definitions in `/types/content.ts`
- Ensure type compatibility between Astro and React components
- Use Content Collection schemas for content type safety
