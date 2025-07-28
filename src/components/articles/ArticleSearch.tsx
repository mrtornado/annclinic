import React, { useState, useEffect, useRef } from "react";

interface Article {
  slug: string;
  data: {
    title: string;
    description: string;
    specialty: string;
    tags: string[];
    publishDate: Date;
  };
}

interface ArticleSearchProps {
  articles: Article[];
  placeholder?: string;
  className?: string;
  onResultClick?: (article: Article) => void;
}

export default function ArticleSearch({
  articles,
  placeholder = "Caută articole medicale...",
  className = "",
  onResultClick,
}: ArticleSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search function
  const searchArticles = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const filtered = articles.filter((article) => {
      const titleMatch = article.data.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descriptionMatch = article.data.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const specialtyMatch = article.data.specialty
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const tagMatch = article.data.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return titleMatch || descriptionMatch || specialtyMatch || tagMatch;
    });

    // Sort by relevance (title matches first, then description, etc.)
    const sorted = filtered.sort((a, b) => {
      const aTitle = a.data.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
        ? 1
        : 0;
      const bTitle = b.data.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
        ? 1
        : 0;

      if (aTitle !== bTitle) return bTitle - aTitle;

      // Then by publish date (newest first)
      return (
        new Date(b.data.publishDate).getTime() -
        new Date(a.data.publishDate).getTime()
      );
    });

    setResults(sorted.slice(0, 8)); // Limit to 8 results
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    searchArticles(value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle result click
  const handleResultClick = (article: Article) => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);

    if (onResultClick) {
      onResultClick(article);
    } else {
      // Default behavior: navigate to article
      window.location.href = `/articole/${article.slug}`;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ro-RO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  // Highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="bg-yellow-200 dark:bg-yellow-800 text dark:text-white"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border border-border dark:border-border-secondary rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-surface-elevated text dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          autoComplete="off"
        />

        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Clear Button */}
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-secondary dark:hover:text-tertiary"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (query.trim() || results.length > 0) && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-surface-elevated border border-border dark:border-border-secondary rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <>
              {results.map((article, index) => (
                <button
                  key={article.slug}
                  onClick={() => handleResultClick(article)}
                  className={`w-full text-left px-4 py-3 hover:bg-surface-secondary dark:hover:bg-surface-elevated border-b border-gray-100 dark:border-border-secondary last:border-b-0 transition-colors ${
                    selectedIndex === index
                      ? "bg-teal-50 dark:bg-teal-900/20"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text dark:text-white mb-1 line-clamp-1">
                        {highlightText(article.data.title, query)}
                      </h4>
                      <p className="text-xs text-secondary dark:text-muted mb-2 line-clamp-2">
                        {highlightText(article.data.description, query)}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted dark:text-muted">
                        <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full">
                          {article.data.specialty}
                        </span>
                        <span>{formatDate(article.data.publishDate)}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}

              {/* View All Results Link */}
              <div className="px-4 py-3 bg-surface-secondary dark:bg-surface-elevated border-t border-border dark:border-border-secondary">
                <a
                  href={`/articole?search=${encodeURIComponent(query)}`}
                  className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
                >
                  Vezi toate rezultatele pentru "{query}" →
                </a>
              </div>
            </>
          ) : query.trim() ? (
            <div className="px-4 py-6 text-center text-muted dark:text-muted">
              <svg
                className="w-12 h-12 mx-auto mb-2 text-tertiary dark:text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-sm">Nu am găsit articole pentru "{query}"</p>
              <p className="text-xs mt-1">
                Încearcă cu alți termeni de căutare
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

// CSS for line clamping
const styles = `
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
