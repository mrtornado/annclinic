import { useState, useRef, useEffect } from "react";
import { useSearch } from "./SearchProvider";
import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedIcon from "../magic-ui/AnimatedIcon";

interface SearchAutocompleteProps {
  onSelect?: (suggestion: string) => void;
  placeholder?: string;
  className?: string;
  maxSuggestions?: number;
  showCategories?: boolean;
}

interface CategorizedSuggestion {
  text: string;
  category: "service" | "doctor" | "specialty" | "symptom" | "popular";
  icon: string;
  count?: number;
}

export default function SearchAutocomplete({
  onSelect,
  placeholder = "Caută servicii, medici sau specialități...",
  className = "",
  maxSuggestions = 8,
  showCategories = true,
}: SearchAutocompleteProps) {
  const { query, suggestions, services, 
    useSearch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [categorizedSuggestions, setCategorizedSuggestions] = useState<
    CategorizedSuggestion[]
  >([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Generate categorized suggestions
  useEffect(() => {
    if (!query || query.length < 2) {
      setCategorizedSuggestions([]);
      return;
    }

    const normalizedQuery = query.toLowerCase().trim();
    const suggestions: CategorizedSuggestion[] = [];

    // Popular medical terms in Romanian
    const popularTerms = [
      { term: "consultație", icon: "👨‍⚕️" },
      { term: "investigație", icon: "🔬" },
      { term: "tratament", icon: "💊" },
      { term: "diagnostic", icon: "📋" },
      { term: "analize", icon: "🧪" },
      { term: "ecografie", icon: "📡" },
      { term: "radiografie", icon: "🩻" },
      { term: "programare", icon: "📅" },
      { term: "urgență", icon: "🚨" },
      { term: "control", icon: "✅" },
    ];

    // Common symptoms in Romanian
    const symptoms = [
      { term: "durere cap", icon: "🤕" },
      { term: "durere piept", icon: "💔" },
      { term: "durere abdomen", icon: "🤢" },
      { term: "febră", icon: "🌡️" },
      { term: "tuse", icon: "😷" },
      { term: "durere gât", icon: "😮‍💨" },
      { term: "probleme somn", icon: "😴" },
      { term: "probleme digestive", icon: "🤢" },
      { term: "probleme cardiace", icon: "❤️" },
      { term: "probleme piele", icon: "🧴" },
    ];

    // Add services that match
    services.forEach((service) => {
      const serviceName = service.data.name.toLowerCase();
      if (serviceName.includes(normalizedQuery)) {
        suggestions.push({
          text: service.data.name,
          category: "service",
          icon: "🏥",
          count: 1,
        });
      }

      // Check popular search terms
      service.data.popularSearchTerms?.forEach((term) => {
        if (term.toLowerCase().includes(normalizedQuery)) {
          suggestions.push({
            text: term,
            category: "popular",
            icon: "🔥",
          });
        }
      });
    });

    // Add doctor names and specialties
    
      // Doctor names
      if (doctor.data.name.toLowerCase().includes(normalizedQuery)) {
        suggestions.push({
          text: doctor.data.name,
          category: "doctor",
          icon: "👨‍⚕️",
        });
      }

      // Doctor specialties
      doctor.data.specialties?.forEach((specialty) => {
        if (
          specialty.toLowerCase().includes(normalizedQuery) &&
          !suggestions.some((s) => s.text === specialty)
        ) {
          suggestions.push({
            text: specialty,
            category: "specialty",
            icon: "🎯",
          });
        }
      });
    });

    // Add popular terms
    popularTerms.forEach(({ term, icon }) => {
      if (
        term.includes(normalizedQuery) &&
        !suggestions.some((s) => s.text === term)
      ) {
        suggestions.push({
          text: term,
          category: "popular",
          icon,
        });
      }
    });

    // Add symptoms
    symptoms.forEach(({ term, icon }) => {
      if (
        term.includes(normalizedQuery) &&
        !suggestions.some((s) => s.text === term)
      ) {
        suggestions.push({
          text: term,
          category: "symptom",
          icon,
        });
      }
    });

    // Sort by relevance and category priority
    const sortedSuggestions = suggestions
      .sort((a, b) => {
        // Priority order: service > specialty > doctor > popular > symptom
        const priority = {
          service: 5,
          specialty: 4,
          doctor: 3,
          popular: 2,
          symptom: 1,
        };

        const priorityDiff = priority[b.category] - priority[a.category];
        if (priorityDiff !== 0) return priorityDiff;

        // Secondary sort by text relevance
        const aExact = a.text.toLowerCase().startsWith(normalizedQuery);
        const bExact = b.text.toLowerCase().startsWith(normalizedQuery);
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;

        return a.text.localeCompare(b.text);
      })
      .slice(0, maxSuggestions);

    setCategorizedSuggestions(sortedSuggestions);
  }, [query, services, 

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < categorizedSuggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : categorizedSuggestions.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && categorizedSuggestions[selectedIndex]) {
            handleSuggestionSelect(categorizedSuggestions[selectedIndex].text);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
        case "Tab":
          if (selectedIndex >= 0 && categorizedSuggestions[selectedIndex]) {
            e.preventDefault();
            handleSuggestionSelect(categorizedSuggestions[selectedIndex].text);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, categorizedSuggestions, selectedIndex]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    if (query.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = () => {
    // Delay to allow clicking on suggestions
    setTimeout(() => {
      setIsOpen(false);
      setSelectedIndex(-1);
    }, 150);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    selectSuggestion(suggestion);
    onSelect?.(suggestion);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const getCategoryLabel = (category: CategorizedSuggestion["category"]) => {
    const labels = {
      service: "Servicii",
      doctor: "Medici",
      specialty: "Specialități",
      popular: "Popular",
      symptom: "Simptome",
    };
    return labels[category];
  };

  const getCategoryColor = (category: CategorizedSuggestion["category"]) => {
    const colors = {
      service: "text-blue-600 bg-blue-50",
      doctor: "text-green-600 bg-green-50",
      specialty: "text-purple-600 bg-purple-50",
      popular: "text-orange-600 bg-orange-50",
      symptom: "text-red-600 bg-red-50",
    };
    return colors[category];
  };

  // Group suggestions by category for display
  const groupedSuggestions = showCategories
    ? categorizedSuggestions.reduce((groups, suggestion, index) => {
        const category = suggestion.category;
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push({ ...suggestion, originalIndex: index });
        return groups;
      }, {} as Record<string, (CategorizedSuggestion & { originalIndex: number })[]>)
    : {
        all: categorizedSuggestions.map((s, i) => ({ ...s, originalIndex: i })),
      };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-4 text-lg bg-surface-elevated border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none"
          autoComplete="off"
          spellCheck="false"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <AnimatedIcon icon="🔍" size="lg" />
        </div>
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center text-muted hover:text-primary transition-colors rounded-full hover:bg-surface"
          >
            ✕
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && categorizedSuggestions.length > 0 && (
        <div
          ref={listRef}
          className="absolute top-full left-0 right-0 mt-2 bg-surface-elevated border border-border rounded-xl shadow-2xl z-50 max-h-96 overflow-hidden"
        >
          <div className="overflow-y-auto max-h-96">
            {Object.entries(groupedSuggestions).map(
              ([category, suggestions]) => (
                <div key={category}>
                  {/* Category Header */}
                  {showCategories && category !== "all" && (
                    <div className="px-4 py-2 border-b border-border bg-surface/50">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(
                          category as any
                        )}`}
                      >
                        {getCategoryLabel(category as any)}
                      </span>
                    </div>
                  )}

                  {/* Suggestions */}
                  {suggestions.map((suggestion, index) => (
                    <AnimatedText
                      key={`${category}-${index}`}
                      delay={0.05 * index}
                    >
                      <button
                        onClick={() => handleSuggestionSelect(suggestion.text)}
                        className={`
                        w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 border-b border-border/50 last:border-b-0
                        ${
                          selectedIndex === suggestion.originalIndex
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "hover:bg-surface text hover:text-primary"
                        }
                      `}
                      >
                        <span className="text-lg flex-shrink-0">
                          {suggestion.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {suggestion.text}
                          </div>
                          {suggestion.count && (
                            <div className="text-xs text-muted">
                              {suggestion.count} rezultat
                              {suggestion.count !== 1 ? "e" : ""}
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0 text-xs text-muted">
                          <span
                            className={`px-2 py-1 rounded-full ${getCategoryColor(
                              suggestion.category
                            )}`}
                          >
                            {getCategoryLabel(suggestion.category)}
                          </span>
                        </div>
                      </button>
                    </AnimatedText>
                  ))}
                </div>
              )
            )}
          </div>

          {/* Footer with keyboard shortcuts */}
          <div className="px-4 py-2 border-t border-border bg-surface/30 text-xs text-muted">
            <div className="flex items-center justify-between">
              <span>↑↓ Navigare • ↵ Selectare • Esc Închidere</span>
              <span>{categorizedSuggestions.length} sugestii</span>
            </div>
          </div>
        </div>
      )}

      {/* Empty state for when typing but no suggestions */}
      {isOpen && query.length >= 2 && categorizedSuggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-elevated border border-border rounded-xl shadow-xl z-50 p-6 text-center">
          <div className="text-4xl mb-2">🔍</div>
          <p className="text-sm text-secondary">
            Nu am găsit sugestii pentru "
            <span className="font-medium">{query}</span>"
          </p>
          <p className="text-xs text-muted mt-1">
            Apasă Enter pentru a căuta oricum
          </p>
        </div>
      )}
    </div>
  );
}
