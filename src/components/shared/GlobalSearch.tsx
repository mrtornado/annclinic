import { useState, useRef, useEffect } from "react";
import { useSearch } from "./SearchProvider";
import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedIcon from "../magic-ui/AnimatedIcon";

interface GlobalSearchProps {
  placeholder?: string;
  variant?: "header" | "fullscreen" | "compact";
  className?: string;
}

export default function GlobalSearch({
  placeholder = "Caută servicii, medici sau specialități...",
  variant = "header",
  className = "",
}: GlobalSearchProps) {
  const {
    query,
    suggestions,
    results,
    isLoading,
    hasError,
    totalResults,
    isOpen,
    setQuery,
    toggleSearch,
    selectSuggestion,
    clearSearch,
  } = useSearch();

  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showSuggestions && !isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            selectSuggestion(suggestions[selectedIndex]);
            setShowSuggestions(false);
            setSelectedIndex(-1);
          }
          break;
        case "Escape":
          setShowSuggestions(false);
          setSelectedIndex(-1);
          if (variant === "fullscreen") {
            toggleSearch();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    showSuggestions,
    suggestions,
    selectedIndex,
    selectSuggestion,
    toggleSearch,
    variant,
    isOpen,
  ]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (query.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    selectSuggestion(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const handleClearSearch = () => {
    clearSearch();
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Service/Doctor type icons
  const getResultIcon = (type: "service" | "doctor") => {
    return type === "service" ? "🏥" : "👨‍⚕️";
  };

  // Compact variant for header
  if (variant === "compact") {
    return (
      <div className={`relative ${className}`}>
        <AnimatedButton
          onClick={toggleSearch}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
        >
          <AnimatedIcon icon="🔍" size="sm" />
          <span className="hidden sm:inline">Caută</span>
        </AnimatedButton>
      </div>
    );
  }

  // Fullscreen overlay variant
  if (variant === "fullscreen") {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-surface/95 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-8 h-full flex flex-col">
              {/* Search Header */}
              <AnimatedText delay={0.1}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text">
                    Caută în ANN Clinic
                  </h2>
                  <AnimatedButton
                    onClick={toggleSearch}
                    variant="outline"
                    size="sm"
                    className="text-muted hover:text-primary"
                  >
                    <AnimatedIcon icon="✕" size="sm" />
                  </AnimatedButton>
                </div>
              </AnimatedText>

              {/* Search Input */}
              <AnimatedText delay={0.2}>
                <div className="relative mb-8">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      placeholder={placeholder}
                      className="w-full px-6 py-4 pl-14 text-lg bg-surface-elevated border border-border rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      autoFocus
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">
                      🔍
                    </div>
                    {query && (
                      <AnimatedButton
                        onClick={handleClearSearch}
                        variant="outline"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        <AnimatedIcon icon="✕" size="sm" />
                      </AnimatedButton>
                    )}
                  </div>
                </div>
              </AnimatedText>

              {/* Search Results */}
              <div className="flex-1 overflow-hidden" ref={resultsRef}>
                {query.length > 0 && (
                  <AnimatedText delay={0.3}>
                    <div className="mb-4">
                      <span className="text-secondary">
                        {isLoading
                          ? "Căutare..."
                          : `${totalResults} rezultate găsite`}
                      </span>
                    </div>
                  </AnimatedText>
                )}

                {/* Suggestions */}
                {showSuggestions &&
                  suggestions.length > 0 &&
                  query.length > 0 && (
                    <AnimatedText delay={0.4}>
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-muted mb-3">
                          Sugestii
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={suggestion}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${
                                selectedIndex === index
                                  ? "bg-primary text-white border-primary"
                                  : "bg-surface-elevated border-border hover:border-primary text-secondary hover:text-primary"
                              }`}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    </AnimatedText>
                  )}

                {/* Results Grid */}
                {results.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[60vh]">
                    {results.map((result, index) => (
                      <AnimatedText key={result.id} delay={0.5 + index * 0.1}>
                        <a
                          href={result.url}
                          className="block p-4 bg-surface-elevated border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">
                              {getResultIcon(result.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text group-hover:text-primary transition-colors line-clamp-1">
                                {result.title}
                              </h4>
                              <p className="text-sm text-secondary mt-1 line-clamp-2">
                                {result.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                  {result.type === "service"
                                    ? "Serviciu"
                                    : "Medic"}
                                </span>
                                {result.specialty && (
                                  <span className="text-xs text-muted">
                                    {result.specialty}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </a>
                      </AnimatedText>
                    ))}
                  </div>
                )}

                {/* No results */}
                {query.length > 0 && !isLoading && results.length === 0 && (
                  <AnimatedText delay={0.4}>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-lg font-medium text mb-2">
                        Nu am găsit rezultate
                      </h3>
                      <p className="text-secondary mb-4">
                        Încearcă să cauți altceva sau verifică scrierea.
                      </p>
                      <AnimatedButton
                        onClick={handleClearSearch}
                        variant="outline"
                        size="sm"
                      >
                        Șterge căutarea
                      </AnimatedButton>
                    </div>
                  </AnimatedText>
                )}

                {/* Error state */}
                {hasError && (
                  <AnimatedText delay={0.4}>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">⚠️</div>
                      <h3 className="text-lg font-medium text mb-2">
                        Eroare la căutare
                      </h3>
                      <p className="text-secondary">
                        A apărut o eroare. Te rugăm să încerci din nou.
                      </p>
                    </div>
                  </AnimatedText>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Header variant
  return (
    <div className={`relative ${className}`} ref={resultsRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className={`w-full px-4 py-2 pl-10 pr-10 bg-surface-elevated border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
            isFocused ? "shadow-lg" : ""
          }`}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">
          🔍
        </div>
        {query && (
          <button
            onClick={handleClearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center text-muted hover:text-primary transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {showSuggestions && (suggestions.length > 0 || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-elevated border border-border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-3 border-b border-border">
              <div className="text-xs font-medium text-muted mb-2">
                Sugestii
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`block w-full text-left px-3 py-2 text-sm rounded hover:bg-surface transition-colors ${
                    selectedIndex === index ? "bg-surface" : ""
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Quick Results */}
          {results.length > 0 && (
            <div className="p-2">
              {results.slice(0, 5).map((result) => (
                <a
                  key={result.id}
                  href={result.url}
                  className="block p-3 rounded hover:bg-surface transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg">{getResultIcon(result.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text line-clamp-1">
                        {result.title}
                      </div>
                      <div className="text-sm text-secondary line-clamp-1">
                        {result.description}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
              {totalResults > 5 && (
                <div className="pt-2 border-t border-border">
                  <AnimatedButton
                    onClick={toggleSearch}
                    variant="outline"
                    size="sm"
                    className="w-full text-primary"
                  >
                    Vezi toate cele {totalResults} rezultate →
                  </AnimatedButton>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
