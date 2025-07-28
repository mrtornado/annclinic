# SEO & Content Rules - ANN Clinic Website

## Romanian SEO Strategy

### Target Keywords Structure

```
Primary Keywords:
- "ginecolog București" → /servicii/ginecologie
- "cardiolog București" → /servicii/cardiologie
- "dermatolog București" → /servicii/dermatologie
- "pediatru București" → /servicii/pediatrie
- "ortoped București" → /servicii/ortopedie
- "ORL București" → /servicii/orl

Long-tail Keywords:
- "tratament acnee București" → /servicii/dermatologie/tratament-acnee
- "ecografie sarcină București" → /servicii/ginecologie/ecografie-sarcina
- "consultație cardiologie Bragadiru"
- "clinică medicală Bragadiru"
```

### URL Structure Rules

- **ALWAYS** use Romanian in URLs: `/servicii/`, `/medici/`, `/articole/`
- **NEVER** use English slugs for Romanian content
- Use hyphens for multi-word slugs: `/tratament-acnee-bucuresti`
- Include location keywords where relevant: `/ginecolog-bucuresti`

## Meta Tags Requirements

### Title Tag Formula

```html
<!-- Service pages -->
<title>[Specialty] București - [Service] | ANN Clinic</title>
<!-- Example: -->
<title>Ginecolog București - Consultații Ginecologie | ANN Clinic</title>

<!-- Doctor pages -->
<title>Dr. [Name] - [Specialty] | ANN Clinic Bragadiru</title>

<!-- Article pages -->
<title>[Article Title] - Informații Medicale | ANN Clinic</title>
```

### Meta Description Formula

```html
<!-- Service pages -->
<meta
  name="description"
  content="[Specialty] în București și Bragadiru. Consultații cu medici specialiști, [specific services]. Programează online la ANN Clinic. ☎️ [phone]"
/>

<!-- Doctor pages -->
<meta
  name="description"
  content="Dr. [Name], medic [specialty] cu [years] ani experiență. Consultații și tratamente la ANN Clinic Bragadiru. Programează consultația online."
/>
```

## Structured Data Requirements

### Medical Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "ANN Clinic",
  "description": "Clinică medicală multidisciplinară în Bragadiru",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Address]",
    "addressLocality": "Bragadiru",
    "addressRegion": "Ilfov",
    "addressCountry": "RO"
  },
  "telephone": "[Phone Number]",
  "medicalSpecialty": [
    "Ginecologie",
    "Cardiologie",
    "Dermatologie",
    "Pediatrie"
  ]
}
```

### Medical Service Schema

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": "[Service Name]",
  "description": "[Service Description]",
  "performer": {
    "@type": "MedicalOrganization",
    "name": "ANN Clinic"
  }
}
```

## Content Creation Guidelines

### Romanian Language Standards

- **ALWAYS** use correct Romanian diacritics: ă, â, î, ș, ț
- Use formal medical terminology appropriate for patients
- Include common Romanian medical search terms naturally in content
- Avoid machine translation - content must be written by Romanian speakers

### Medical Content Requirements

```markdown
<!-- Service page content structure -->

# [Service Name] la ANN Clinic București

## Ce este [Service Name]?

[Professional explanation in Romanian]

## Servicii oferite:

- [Service 1]
- [Service 2]
- [Service 3]

## Medicii noștri specialiști

[Doctor information]

## De ce să alegi ANN Clinic?

[Trust signals and benefits]

## Programează o consultație

[Clear CTA]
```

### Article Content Structure

```markdown
---
title: "[Article Title]"
description: "[SEO Description]"
publishDate: 2024-01-01
specialty: "ginecologie"
tags: ["sănătate feminină", "consultații"]
seoKeywords: ["ginecolog bucurești", "consultație ginecologie"]
medicallyReviewed: true
---

# [H1 Title with Keywords]

## Introducere

[Hook paragraph with target keywords]

## [H2 Main Sections]

[Detailed content with medical information]

## Când să consultați medicul specialist

[Call to action for medical consultation]

## Programează o consultație la ANN Clinic

[Clear CTA with contact information]
```

## Local SEO Requirements

### Google My Business Optimization

- **ALWAYS** include "Bragadiru" and "București" in business descriptions
- Use medical categories: "Medical Clinic", "Gynecologist", "Cardiologist"
- Include all medical specialties in business description
- Add Romanian keywords to business posts

### Local Keywords Integration

```
Primary Location Terms:
- "Bragadiru" (primary location)
- "București" (major nearby city)
- "Ilfov" (county)
- "zona Bragadiru"
- "lângă București"
```

## Landing Page SEO Rules

### AdWords Landing Pages

```
/landing/ginecolog-bucuresti/
/landing/cardiolog-bucuresti/
/landing/dermatolog-bucuresti/
/landing/botox-bucuresti/
/landing/tratament-acnee-bucuresti/
```

### Landing Page Structure

```html
<!-- ALWAYS include in landing pages -->
<h1>[Service] în București - [Clinic Name]</h1>
<h2>De ce să alegi [Clinic Name] pentru [Service]?</h2>
<h3>Programează consultația online</h3>

<!-- Include trust signals -->
<section class="trust-signals">
  <h3>Medicii noștri specialiști</h3>
  <h3>Echipamente moderne</h3>
  <h3>Peste [X] pacienți mulțumiți</h3>
</section>
```

## Content Collections SEO

### Article Schema

```typescript
const articleCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    specialty: z.string(),
    tags: z.array(z.string()),
    seoKeywords: z.array(z.string()),
    featured: z.boolean().default(false),
    medicallyReviewed: z.boolean().default(false),
    reviewedBy: z.string().optional(),
  }),
});
```

### Service Schema

```typescript
const serviceCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    keywords: z.array(z.string()),
    localKeywords: z.array(z.string()), // București, Bragadiru specific
    specialtyColor: z.string(),
    priority: z.number(), // For sitemap priority
  }),
});
```

## Technical SEO Requirements

### Core Web Vitals Optimization

- **Target**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **ALWAYS** optimize images with WebP and lazy loading
- **ALWAYS** minimize JavaScript for critical path
- Use Astro's static generation for maximum performance

### Sitemap Structure

```xml
<!-- Priority levels for sitemap -->
Homepage: 1.0
Main service pages: 0.9
Doctor pages: 0.8
Service sub-pages: 0.7
Articles: 0.6
Landing pages: 0.5
```

### Internal Linking Strategy

- **ALWAYS** link related services to each other
- Link doctor profiles to their specialties
- Link articles to relevant service pages
- Use descriptive anchor text with keywords
- Create topic clusters around medical specialties

## Conversion Optimization

### CTA Requirements

```html
<!-- Primary CTAs must include action and benefit -->
<button>📅 Programează Consultația - Răspuns în 24h</button>
<button>☎️ Sună Acum - Consiliere Gratuită</button>
<button>💬 WhatsApp - Răspuns Imediat</button>
```

### Trust Signals Requirements

- **ALWAYS** include doctor credentials prominently
- Display patient testimonials where available
- Show medical certifications and affiliations
- Include emergency contact information
- Display clinic photos and facilities
