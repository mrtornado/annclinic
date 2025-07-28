import React, { useState, useMemo } from "react";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedButton from "../magic-ui/AnimatedButton";

interface Article {
  slug: string;
  data: {
    title: string;
    description: string;
    specialty: string;
    category: string;
    tags: string[];
    publishDate: Date;
    readingTime?: number;
    image?: string;
    imageAlt?: string;
    featured: boolean;
    author: string;
    medicallyReviewed: boolean;
  };
}

interface ArticlesListingProps {
  articles: Article[];
  specialties: string[];
  categories: string[];
  tags: string[];
  initialFilters?: {
    search: string;
    specialty: string;
    category: string;
    tag: string;
  };
}

export default function ArticlesListing({
  articles,
  specialties,
  categories,
  tags,
  initialFilters,
}: ArticlesListingProps) {
  const [searchTerm, setSearchTerm] = useState(initialFilters?.search || "");
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    initialFilters?.specialty || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    initialFilters?.category || ""
  );
  const [selectedTag, setSelectedTag] = useState(initialFilters?.tag || "");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  // Filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles.filter((article) => {
      const matchesSearch =
        searchTerm === "" ||
        article.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.data.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        article.data.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesSpecialty =
        selectedSpecialty === "" ||
        article.data.specialty === selectedSpecialty;
      const matchesCategory =
        selectedCategory === "" || article.data.category === selectedCategory;
      const matchesTag =
        selectedTag === "" || article.data.tags.includes(selectedTag);

      return matchesSearch && matchesSpecialty && matchesCategory && matchesTag;
    });

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.data.publishDate).getTime() -
            new Date(a.data.publishDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.data.publishDate).getTime() -
            new Date(b.data.publishDate).getTime()
          );
        case "title":
          return a.data.title.localeCompare(b.data.title);
        case "specialty":
          return a.data.specialty.localeCompare(b.data.specialty);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    articles,
    searchTerm,
    selectedSpecialty,
    selectedCategory,
    selectedTag,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedArticles.length / articlesPerPage
  );
  const paginatedArticles = filteredAndSortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSpecialty, selectedCategory, selectedTag, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("");
    setSelectedCategory("");
    setSelectedTag("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm ||
    selectedSpecialty ||
    selectedCategory ||
    selectedTag ||
    sortBy !== "newest";

  return (
    <section id="articole" className="py-16 bg-white dark:bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filters Section */}
        <div className="bg-surface-secondary dark:bg-surface-elevated rounded-xl p-6 mb-8 border border-border dark:border-border-secondary">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-sm font-medium text dark:text-tertiary mb-2"
              >
                Caută articole
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Caută după titlu, descriere sau etichete..."
                  className="w-full pl-10 pr-4 py-2 border border-border dark:border-border-secondary rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-surface-elevated text dark:text-white"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-muted"
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
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <label
                htmlFor="sort"
                className="block text-sm font-medium text dark:text-tertiary mb-2"
              >
                Sortează după
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-border dark:border-border-secondary rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-surface-elevated text dark:text-white"
              >
                <option value="newest">Cele mai noi</option>
                <option value="oldest">Cele mai vechi</option>
                <option value="title">Titlu (A-Z)</option>
                <option value="specialty">Specialitate</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Specialty Filter */}
            <div>
              <label
                htmlFor="specialty"
                className="block text-sm font-medium text dark:text-tertiary mb-2"
              >
                Specialitate
              </label>
              <select
                id="specialty"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2 border border-border dark:border-border-secondary rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-surface-elevated text dark:text-white"
              >
                <option value="">Toate specialitățile</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text dark:text-tertiary mb-2"
              >
                Categorie
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border dark:border-border-secondary rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-surface-elevated text dark:text-white"
              >
                <option value="">Toate categoriile</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag Filter */}
            <div>
              <label
                htmlFor="tag"
                className="block text-sm font-medium text dark:text-tertiary mb-2"
              >
                Etichetă
              </label>
              <select
                id="tag"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 border border-border dark:border-border-secondary rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-surface-elevated text dark:text-white"
              >
                <option value="">Toate etichetele</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    #{tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters and Clear */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border dark:border-border-secondary">
              <div className="text-sm text-secondary dark:text-muted">
                {filteredAndSortedArticles.length} articole găsite
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
              >
                Șterge toate filtrele
              </button>
            </div>
          )}
        </div>

        {/* Articles Grid */}
        {paginatedArticles.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedArticles.map((article, index) => (
                <div
                  key={article.slug}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <MagicCard
                    glowColor="rgba(13, 148, 136, 0.3)"
                    className="group h-full"
                  >
                    <div className="h-full bg-white dark:bg-surface-elevated rounded-xl overflow-hidden border border-border dark:border-border-secondary">
                      {article.data.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.data.image}
                            alt={article.data.imageAlt || article.data.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="inline-block px-3 py-1 bg-teal-500 text-white text-xs font-medium rounded-full">
                              {article.data.specialty}
                            </span>
                            {article.data.featured && (
                              <span className="inline-block px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                                Recomandat
                              </span>
                            )}
                          </div>
                          {article.data.medicallyReviewed && (
                            <div className="absolute top-4 right-4">
                              <div
                                className="bg-green-500 text-white p-1 rounded-full"
                                title="Revizuit medical"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-6 flex flex-col h-full">
                        <div className="flex-1">
                          <div className="text-sm text-teal-600 dark:text-teal-400 mb-2">
                            {article.data.category}
                          </div>

                          <h3 className="text-xl font-semibold text dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                            <a href={`/articole/${article.slug}`}>
                              {article.data.title}
                            </a>
                          </h3>

                          <p className="text-secondary dark:text-tertiary text-sm mb-4 line-clamp-3">
                            {article.data.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {article.data.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-block px-2 py-1 bg-surface-secondary dark:bg-surface-elevated text-secondary dark:text-tertiary text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                            {article.data.tags.length > 3 && (
                              <span className="inline-block px-2 py-1 bg-surface-secondary dark:bg-surface-elevated text-secondary dark:text-tertiary text-xs rounded-full">
                                +{article.data.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted dark:text-muted pt-4 border-t border-border dark:border-border-secondary">
                          <div className="flex items-center gap-2">
                            <span>{article.data.author}</span>
                            <span>•</span>
                            <span>{formatDate(article.data.publishDate)}</span>
                          </div>
                          {article.data.readingTime && (
                            <span className="flex items-center gap-1">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {article.data.readingTime} min
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </MagicCard>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-muted bg-white border border-border rounded-lg hover:bg-surface-secondary disabled:opacity-50 disabled:cursor-not-allowed dark:bg-surface-elevated dark:border-border-secondary dark:text-muted dark:hover:bg-surface-elevated"
                >
                  Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg ${
                        currentPage === page
                          ? "bg-teal-600 text-white"
                          : "text-muted bg-white border border-border hover:bg-surface-secondary dark:bg-surface-elevated dark:border-border-secondary dark:text-muted dark:hover:bg-surface-elevated"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-muted bg-white border border-border rounded-lg hover:bg-surface-secondary disabled:opacity-50 disabled:cursor-not-allowed dark:bg-surface-elevated dark:border-border-secondary dark:text-muted dark:hover:bg-surface-elevated"
                >
                  Următor
                </button>
              </div>
            )}
          </>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-muted">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text dark:text-white mb-2">
              Nu am găsit articole
            </h3>
            <p className="text-secondary dark:text-muted mb-4">
              Încearcă să modifici filtrele sau termenii de căutare.
            </p>
            <AnimatedButton onClick={clearFilters} variant="outline" size="md">
              Șterge toate filtrele
            </AnimatedButton>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ai întrebări despre sănătatea ta?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Programează o consultație cu specialiștii noștri pentru sfaturi
              personalizate.
            </p>
            <AnimatedButton
              href="/programare"
              variant="secondary"
              size="lg"
              className="bg-white text-teal-600 hover:bg-surface-secondary"
            >
              📅 Programează Consultație
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// CSS for animations
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
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
