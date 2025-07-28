import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { ServiceContent, DoctorContent } from "../../types/content";

// Search context types
export interface SearchFilters {
  specialty?: string;
  availability?: "available" | "busy" | "any";
  location?: string;
  serviceType?: "consultation" | "investigation" | "treatment" | "any";
}

export interface SearchResult {
  id: string;
  type: "service" | "doctor";
  title: string;
  description: string;
  url: string;
  specialty?: string;
  availability?: string;
  location?: string;
  image?: string;
  tags?: string[];
  priority: number; // For search ranking
}

export interface SearchState {
  query: string;
  filters: SearchFilters;
  results: SearchResult[];
  suggestions: string[];
  isLoading: boolean;
  hasError: boolean;
  totalResults: number;
  isOpen: boolean;
}

export interface SearchContextType extends SearchState {
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  clearSearch: () => void;
  toggleSearch: () => void;
  selectSuggestion: (suggestion: string) => void;
  services: ServiceContent[];
  doctors: DoctorContent[];
}

// Initial state
const initialState: SearchState = {
  query: "",
  filters: {},
  results: [],
  suggestions: [],
  isLoading: false,
  hasError: false,
  totalResults: 0,
  isOpen: false,
};

// Create context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Search utility functions
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .trim();
};

const calculateRelevanceScore = (
  searchTerm: string,
  title: string,
  description: string,
  tags: string[] = []
): number => {
  const normalizedSearch = normalizeText(searchTerm);
  const normalizedTitle = normalizeText(title);
  const normalizedDescription = normalizeText(description);
  const normalizedTags = tags.map((tag) => normalizeText(tag));

  let score = 0;

  // Exact title match (highest priority)
  if (normalizedTitle === normalizedSearch) score += 100;
  // Title starts with search term
  else if (normalizedTitle.startsWith(normalizedSearch)) score += 80;
  // Title contains search term
  else if (normalizedTitle.includes(normalizedSearch)) score += 60;

  // Tag matches
  for (const tag of normalizedTags) {
    if (tag === normalizedSearch) score += 70;
    else if (tag.includes(normalizedSearch)) score += 40;
  }

  // Description matches
  if (normalizedDescription.includes(normalizedSearch)) score += 30;

  // Word matches
  const searchWords = normalizedSearch.split(" ");
  for (const word of searchWords) {
    if (word.length > 2) {
      // Ignore very short words
      if (normalizedTitle.includes(word)) score += 20;
      if (normalizedDescription.includes(word)) score += 10;
    }
  }

  return score;
};

const generateSuggestions = (
  query: string,
  services: ServiceContent[],
  doctors: DoctorContent[]
): string[] => {
  if (query.length < 2) return [];

  const suggestions = new Set<string>();
  const normalizedQuery = normalizeText(query);

  // Add service names and related terms
  services.forEach((service) => {
    const serviceName = service.data.name;
    if (normalizeText(serviceName).includes(normalizedQuery)) {
      suggestions.add(serviceName);
    }

    // Add popular search terms
    service.data.popularSearchTerms?.forEach((term) => {
      if (normalizeText(term).includes(normalizedQuery)) {
        suggestions.add(term);
      }
    });

    // Add keywords
    service.data.keywords?.forEach((keyword) => {
      if (normalizeText(keyword).includes(normalizedQuery)) {
        suggestions.add(keyword);
      }
    });
  });

  // Add doctor specialties
  doctors.forEach((doctor) => {
    doctor.data.specialties?.forEach((specialty) => {
      if (normalizeText(specialty).includes(normalizedQuery)) {
        suggestions.add(specialty);
      }
    });

    // Add doctor names for partial matches
    if (normalizeText(doctor.data.name).includes(normalizedQuery)) {
      suggestions.add(doctor.data.name);
    }
  });

  // Common medical terms in Romanian
  const commonTerms = [
    "consultație",
    "investigație",
    "tratament",
    "diagnostic",
    "analize",
    "ecografie",
    "radiografie",
    "biopsia",
    "chirurgie",
    "terapie",
    "programare",
    "urgență",
    "control",
    "screening",
    "prevenție",
  ];

  commonTerms.forEach((term) => {
    if (normalizeText(term).includes(normalizedQuery)) {
      suggestions.add(term);
    }
  });

  return Array.from(suggestions).slice(0, 6); // Limit to 6 suggestions
};

// Provider component
interface SearchProviderProps {
  children: ReactNode;
  services: ServiceContent[];
  doctors: DoctorContent[];
}

export function SearchProvider({
  children,
  services,
  doctors,
}: SearchProviderProps) {
  const [state, setState] = useState<SearchState>(initialState);

  // Debounced search effect
  useEffect(() => {
    if (!state.query.trim()) {
      setState((prev) => ({
        ...prev,
        results: [],
        suggestions: [],
        totalResults: 0,
        isLoading: false,
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, hasError: false }));

    const searchTimeout = setTimeout(() => {
      try {
        performSearch(state.query, state.filters);
      } catch (error) {
        setState((prev) => ({ ...prev, hasError: true, isLoading: false }));
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(searchTimeout);
  }, [state.query, state.filters]);

  const performSearch = (query: string, filters: SearchFilters) => {
    const results: SearchResult[] = [];
    const normalizedQuery = normalizeText(query);

    // Search services
    services.forEach((service) => {
      const tags = [
        ...(service.data.keywords || []),
        ...(service.data.popularSearchTerms || []),
        service.data.name,
      ];

      const score = calculateRelevanceScore(
        normalizedQuery,
        service.data.name,
        service.data.description,
        tags
      );

      if (score > 0) {
        // Apply filters
        if (
          filters.specialty &&
          !service.data.name
            .toLowerCase()
            .includes(filters.specialty.toLowerCase())
        ) {
          return;
        }

        results.push({
          id: service.slug,
          type: "service",
          title: service.data.name,
          description: service.data.description,
          url: `/servicii/${service.slug}`,
          specialty: service.data.name,
          availability: "available",
          location: "București, Bragadiru",
          image: service.data.icon,
          tags: tags,
          priority: score,
        });
      }
    });

    // Search doctors
    doctors.forEach((doctor) => {
      const tags = [
        ...(doctor.data.specialties || []),
        ...(doctor.data.qualifications || []),
        doctor.data.name,
      ];

      const score = calculateRelevanceScore(
        normalizedQuery,
        doctor.data.name,
        doctor.data.bio,
        tags
      );

      if (score > 0) {
        // Apply filters
        if (
          filters.specialty &&
          !doctor.data.specialties.some((s) =>
            s.toLowerCase().includes(filters.specialty!.toLowerCase())
          )
        ) {
          return;
        }

        results.push({
          id: doctor.slug,
          type: "doctor",
          title: doctor.data.name,
          description: `${doctor.data.specialties.join(", ")} • ${
            doctor.data.experience
          } ani experiență`,
          url: `/medici/${doctor.slug}`,
          specialty: doctor.data.specialties[0],
          availability: "available", // This would come from a booking system
          location: "București, Bragadiru",
          image: doctor.data.photo,
          tags: tags,
          priority: score,
        });
      }
    });

    // Sort by relevance score
    results.sort((a, b) => b.priority - a.priority);

    // Generate suggestions
    const suggestions = generateSuggestions(query, services, doctors);

    setState((prev) => ({
      ...prev,
      results: results.slice(0, 20), // Limit to 20 results
      suggestions,
      totalResults: results.length,
      isLoading: false,
      hasError: false,
    }));
  };

  const setQuery = (query: string) => {
    setState((prev) => ({ ...prev, query }));
  };

  const setFilters = (newFilters: Partial<SearchFilters>) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters },
    }));
  };

  const clearFilters = () => {
    setState((prev) => ({ ...prev, filters: {} }));
  };

  const clearSearch = () => {
    setState((prev) => ({
      ...prev,
      query: "",
      results: [],
      suggestions: [],
      totalResults: 0,
      isLoading: false,
      hasError: false,
    }));
  };

  const toggleSearch = () => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const selectSuggestion = (suggestion: string) => {
    setState((prev) => ({ ...prev, query: suggestion }));
  };

  const contextValue: SearchContextType = {
    ...state,
    setQuery,
    setFilters,
    clearFilters,
    clearSearch,
    toggleSearch,
    selectSuggestion,
    services,
    doctors,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

// Hook for using search context
export function useSearch(): SearchContextType {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
