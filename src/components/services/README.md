# Service Components

Această directorie conține componentele React pentru paginile de servicii medicale.

## Arhitectura Componentelor

### ServiceLayout.astro

- **Tip**: Astro Layout Component
- **Scop**: SEO-optimized shell pentru paginile de servicii
- **Funcționalități**:
  - Meta tags dinamice pentru fiecare serviciu
  - Structured data pentru SEO medical
  - Integration cu BaseLayout pentru consistență

### ServiceHero.tsx

- **Tip**: React Component cu Magic UI
- **Scop**: Hero section pentru fiecare pagină de serviciu
- **Funcționalități**:
  - AnimatedText cu delay progresiv
  - FloatingParticles pentru background
  - Gradient backgrounds specifice fiecărui serviciu
  - CTA buttons cu AnimatedButton
  - Service highlights cu iconuri animate

### ServiceDetails.tsx

- **Tip**: React Component cu Magic UI
- **Scop**: Detalii despre serviciu și tratamente
- **Funcționalități**:
  - Service overview cu descriere extinsă
  - Grid de tratamente cu hover effects
  - Related services cu link-uri
  - CTA section pentru programări

### DoctorProfiles.tsx

- **Tip**: React Component cu Magic UI
- **Scop**: Profiluri medicilor specializați
- **Funcționalități**:
  - Grid responsive de doctori
  - Informații despre calificări și experiență
  - Team statistics cu animații
  - CTA pentru programări cu doctori specifici

### BookingWidget.tsx

- **Tip**: React Component cu Magic UI
- **Scop**: Widget interactiv pentru programări
- **Funcționalități**:
  - Multi-step booking process
  - Progress indicator animat
  - Form validation și state management
  - Date/time picker cu disponibilitate
  - Confirmation step cu review

## Utilizare

```astro
---
// În pagina de serviciu
import ServiceLayout from "../../layouts/ServiceLayout.astro";
import ServiceHero from "../../components/services/ServiceHero.tsx";
// ... alte componente
---

<ServiceLayout service={service}>
  <ServiceHero service={service} client:load />
  <ServiceDetails service={service} client:load />
  <DoctorProfiles service={service} client:load />
  <BookingWidget service={service} client:load />
</ServiceLayout>
```

## Integrare cu Content Collections

Componentele sunt proiectate să funcționeze cu schema Content Collections:

```typescript
interface ServiceContent {
  data: {
    name: string;
    description: string;
    longDescription?: string;
    keywords?: string[];
    treatments?: Treatment[];
    doctorIds?: string[];
    relatedServices?: string[];
    featured: boolean;
    order: number;
  };
  slug: string;
}
```

## Styling și Animații

- **Tailwind CSS 4**: Cu light-dark() theming
- **Magic UI**: Pentru animații și interactivitate
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliant

## Performance

- **Client-side hydration**: Doar pentru componente interactive
- **Lazy loading**: Pentru animații heavy
- **Code splitting**: La nivel de componentă
- **SEO optimization**: Prin Astro layout
