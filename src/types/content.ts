// Global types for Astro Content Collections

export interface ServiceContent {
  id: string;
  slug: string;
  data: {
    name: string;
    description: string;
    longDescription: string;
    icon: string;
    seoTitle: string;
    seoDescription: string;
    keywords: string[];
    popularSearchTerms: string[];
    relatedServices: string[];

    treatments?: {
      name: string;
      description: string;
      duration?: number;
      price?: number;
      preparation?: string[];
    }[];
    featured: boolean;
    comingSoon: boolean;
    order: number;
  };
}

export interface ArticleContent {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    publishDate: Date;
    author: string;
    specialty: string;
    tags: string[];
    seoKeywords: string[];
    featured: boolean;
    medicallyReviewed: boolean;
    reviewedBy?: string;
    reviewDate?: Date;
    readingTime?: number;
    image?: string;
    imageAlt?: string;
  };
}
