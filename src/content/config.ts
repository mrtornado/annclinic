import { defineCollection, z } from "astro:content";

// Medical Services Collection
const servicesCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    longDescription: z.string(),
    icon: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    keywords: z.array(z.string()),
    popularSearchTerms: z.array(z.string()),
    relatedServices: z.array(z.string()),
    treatments: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          duration: z.number().optional(),
          price: z.number().optional(),
          preparation: z.array(z.string()).optional(),
        })
      )
      .optional(),
    featured: z.boolean().default(false),
    comingSoon: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

// Medical Articles/Blog Collection
const articlesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string(),
    authorBio: z.string().optional(),
    specialty: z.enum([
      "Cardiologie",
      "Dermatologie",
      "Ginecologie",
      "Pediatrie",
      "Ortopedie",
      "ORL",
      "Neurologie",
      "Oftalmologie",
      "Urologie",
      "Estetica Faciala",
      "General",
      "Preventie",
    ]),
    category: z
      .enum([
        "Simptome si Diagnostic",
        "Tratamente",
        "Preventie",
        "Stil de Viata",
        "Noutati Medicale",
        "Ghiduri Pacienti",
        "Intrebari Frecvente",
      ])
      .default("Ghiduri Pacienti"),
    tags: z.array(z.string()),
    seoKeywords: z.array(z.string()),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonicalUrl: z.string().optional(),
    featured: z.boolean().default(false),
    medicallyReviewed: z.boolean().default(false),
    reviewedBy: z.string().optional(),
    reviewDate: z.date().optional(),
    readingTime: z.number().optional(),
    difficulty: z
      .enum(["Incepator", "Intermediar", "Avansat"])
      .default("Incepator"),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    relatedArticles: z.array(z.string()).optional(),
    relatedServices: z.array(z.string()).optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
    structuredData: z
      .object({
        type: z.string().default("Article"),
        headline: z.string().optional(),
        datePublished: z.string().optional(),
        dateModified: z.string().optional(),
        author: z
          .object({
            name: z.string(),
            type: z.string().default("Person"),
          })
          .optional(),
        publisher: z
          .object({
            name: z.string().default("ANN Clinic"),
            type: z.string().default("Organization"),
          })
          .optional(),
      })
      .optional(),
    priority: z.number().min(0).max(1).default(0.7),
    changeFreq: z
      .enum([
        "always",
        "hourly",
        "daily",
        "weekly",
        "monthly",
        "yearly",
        "never",
      ])
      .default("monthly"),
  }),
});

// Landing Pages Collection (for AdWords campaigns)
const landingPagesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    service: z.string(),
    campaign: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    keywords: z.array(z.string()),
    ctaText: z.string(),
    ctaUrl: z.string(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    testimonials: z
      .array(
        z.object({
          name: z.string(),
          text: z.string(),
          rating: z.number().optional(),
        })
      )
      .optional(),
    features: z.array(z.string()).optional(),
    pricing: z
      .object({
        price: z.number(),
        currency: z.string().default("RON"),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  services: servicesCollection,
  articles: articlesCollection,
  landing: landingPagesCollection,
};
