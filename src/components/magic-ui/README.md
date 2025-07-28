# Magic UI Components 🎨

Această colecție de componente Magic UI oferă animații și efecte interactive moderne pentru site-ul ANN Clinic.

## Componente Disponibile

### 🎯 AnimatedButton

Butoane cu efecte shimmer, glow și animații spring.

```tsx
<AnimatedButton href="/programare" variant="primary" size="lg">
  📅 Programează-te
</AnimatedButton>
```

**Variante:**

- `primary` - Gradient teal cu text alb
- `secondary` - Gradient gold cu text alb
- `outline` - Border cu background transparent

**Mărimi:**

- `sm` - Mic (px-4 py-2)
- `md` - Mediu (px-6 py-3)
- `lg` - Mare (px-8 py-4)

### ✨ MagicCard

Carduri cu efecte de mouse tracking și glow.

```tsx
<MagicCard glowColor="rgba(13, 148, 136, 0.4)">
  <div>Conținutul cardului</div>
</MagicCard>
```

**Efecte:**

- Mouse tracking pentru glow
- Border gradient animat
- Hover lift animation
- Spotlight effect

### 📝 AnimatedText & GradientText

Text cu animații fade-in și gradienți.

```tsx
<AnimatedText delay={0.2}>
  <h1>Titlu animat</h1>
</AnimatedText>

<GradientText gradient="from-primary to-secondary">
  Text cu gradient
</GradientText>
```

### 🎭 AnimatedIcon

Iconițe cu animații hover interactive.

```tsx
<AnimatedIcon icon="🫀" size="lg" color="text-white" />
```

### 🌟 FloatingParticles

Sistem de particule plutitoare pentru background.

```tsx
<FloatingParticles count={30} colors={["#0d9488", "#14b8a6", "#d97706"]} />
```

## Animații CSS

Toate componentele folosesc animații CSS custom definite în `global.css`:

- `shimmer` - Efect de strălucire pentru butoane
- `float` - Plutire pentru particule
- `glow` - Efect de strălucire
- `gradient-shift` - Animație gradient

## Utilizare

Toate componentele Magic UI trebuie să aibă `client:load` pentru a funcționa în Astro:

```astro
<AnimatedButton client:load>
  Buton animat
</AnimatedButton>
```

## Performance

- Animațiile respectă `prefers-reduced-motion`
- Lazy loading pentru componente interactive
- Optimizat pentru 60fps
- GPU acceleration pentru transformări

## Teme

Componentele se adaptează automat la light/dark theme folosind CSS custom properties definite în `global.css`.
