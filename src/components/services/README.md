# Componente pentru Servicii Medicale

Acest director conține componentele pentru afișarea și gestionarea serviciilor medicale ale clinicii ANN.

## Optimizarea Imaginilor cu Astro

Pentru a optimiza imaginile folosim o combinație de Astro și React:

1. **ServiceImageOptimizer.astro** - Folosește `astro:assets` pentru optimizare avansată a imaginilor:

   - Convertește imaginile în format WebP
   - Asigură încărcarea optimă și redimensionarea corectă
   - Generează imagini optimizate pentru diferite dimensiuni de ecran

2. **ServiceDetails.tsx** și alte componente React nu importă imaginile direct, ci folosesc containere care sunt populare din componenta Astro.

## Implementare

Astro nu permite folosirea componentelor sale native (`<Image />`, `<Picture />`) direct în componentele React. Soluția este:

1. Importăm și optimizăm imaginile în fișiere Astro
2. Folosim un script client pentru a insera imaginile optimizate în containerele React

## Beneficii

- **Performanță**: Reducere semnificativă a dimensiunii imaginilor (~70%)
- **SEO**: Scor Lighthouse îmbunătățit pentru LCP (Largest Contentful Paint)
- **UX**: Încărcare progresivă a imaginilor
- **Responsive**: Imagini adaptate automat pentru diferite dispozitive

## Exemplu de Utilizare

```astro
---
// În fișierul Astro
import ServiceImageOptimizer from "../components/services/ServiceImageOptimizer.astro";
---

<ServiceImageOptimizer serviceSlug={serviceSlug} serviceName={serviceName} />

<script>
  // Script pentru înlocuirea containerului cu imaginea optimizată
  document.addEventListener('DOMContentLoaded', () => {
    // Cod pentru manipularea DOM și înlocuirea imaginilor
  });
</script>
```

```tsx
// În componenta React
function ServiceComponent() {
  return (
    <div className="image-container">
      {/* Container-ul care va fi populat cu imaginea optimizată */}
      <div
        id="service-image-container"
        data-service-slug={serviceSlug}
        data-service-name={serviceName}
      ></div>
    </div>
  );
}
```
