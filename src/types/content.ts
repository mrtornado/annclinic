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
    doctorIds?: string[];
    doctors?: {
      name: string;
      specialization: string;
      experience: number;
      qualifications: string[];
      languages: string[];
      availability: string;
    }[];
    treatments?: {
      name: string;
      description: string;
      duration?: number;
      price?: number;
      preparation?: string[];
    }[];
    featured: boolean;
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

export interface DoctorContent {
  id: string;
  slug: string;
  data: {
    name: string;
    specialties: string[];
    qualifications: string[];
    experience: number;
    photo: string;
    bio: string;
    languages: string[];
    seoTitle: string;
    seoDescription: string;
    featured: boolean;
    order: number;
    consultationTypes?: string[];
    availableDays?: string[];
  };
}
