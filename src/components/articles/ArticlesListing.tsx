import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText, { GradientText } from "../magic-ui/AnimatedText";
import AnimatedIcon from "../magic-ui/AnimatedIcon";
import FloatingParticles from "../magic-ui/FloatingParticles";
import AnimatedSearchInput from "../magic-ui/AnimatedSearchInput";

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
    <section
      id="articole"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Background Effects */}
      <FloatingParticles
        count={20}
        colors={["#0d9488", "#14b8a6", "#d97706"]}
      />

      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 left-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Filters Section */}
        <AnimatedText delay={0.2}>
          <MagicCard
            className="p-8 mb-12 backdrop-blur-md bg-slate-800/90 border border-slate-700/50 shadow-2xl"
            glowColor="rgba(13, 148, 136, 0.4)"
          >
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-white mb-3">
                  Caută articole medicale
                </label>
                <AnimatedSearchInput
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Caută după titlu, descriere sau etichete..."
                  className="w-full"
                />
              </div>

              {/* Sort */}
              <div className="lg:w-48">
                <label
                  htmlFor="sort"
                  className="block text-sm font-medium text-white mb-3"
                >
                  Sortează după
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-medium"
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
                  className="block text-sm font-medium text-white mb-3"
                >
                  Specialitate
                </label>
                <select
                  id="specialty"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-medium"
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
                  className="block text-sm font-medium text-white mb-3"
                >
                  Categorie
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-medium"
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
                  className="block text-sm font-medium text-white mb-3"
                >
                  Etichetă
                </label>
                <select
                  id="tag"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-medium"
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
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-primary/20">
                <div className="text-sm font-medium text-white">
                  {filteredAndSortedArticles.length} articole găsite
                </div>
                <AnimatedButton
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="text-sm"
                >
                  Șterge toate filtrele
                </AnimatedButton>
              </div>
            )}
          </MagicCard>
        </AnimatedText>

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
                    <div className="h-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl hover:border-primary/30 transition-all duration-300 transform hover:scale-[1.02]">
                      {article.data.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.data.image}
                            alt={article.data.imageAlt || article.data.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full shadow-lg">
                              {article.data.specialty}
                            </span>
                            {article.data.featured && (
                              <span className="inline-block px-3 py-1 bg-gradient-to-r from-accent to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
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
                          <div className="text-sm font-semibold text-primary mb-2">
                            {article.data.category}
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-secondary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2 leading-tight">
                            <a href={`/articole/${article.slug}`}>
                              {article.data.title}
                            </a>
                          </h3>

                          <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                            {article.data.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {article.data.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20 font-medium"
                              >
                                #{tag}
                              </span>
                            ))}
                            {article.data.tags.length > 3 && (
                              <span className="inline-block px-2 py-1 bg-accent/20 text-accent text-xs rounded-full border border-accent/30 font-bold">
                                +{article.data.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200">
                          <div className="flex items-center gap-2 font-medium">
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
                <AnimatedButton
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  variant="outline"
                  size="sm"
                  className={`${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed pointer-events-none"
                      : ""
                  }`}
                >
                  Anterior
                </AnimatedButton>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        currentPage === page
                          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                          : "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:border-primary/30"
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
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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
            <h3 className="text-lg font-medium text-white mb-2">
              Nu am găsit articole
            </h3>
            <p className="text-slate-300 mb-4">
              Încearcă să modifici filtrele sau termenii de căutare.
            </p>
            <AnimatedButton onClick={clearFilters} variant="outline" size="md">
              Șterge toate filtrele
            </AnimatedButton>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="relative bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl p-8 lg:p-12 text-white overflow-hidden shadow-2xl">
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10">
              <div className="text-5xl mb-4">🏥</div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Ai întrebări despre sănătatea ta?
              </h3>
              <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Programează o consultație cu specialiștii noștri pentru sfaturi
                personalizate și tratamente de calitate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  href="/programare"
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-surface-secondary transform hover:scale-105 shadow-lg"
                >
                  📅 Programează Consultație
                </AnimatedButton>
                <AnimatedButton
                  href="/servicii"
                  variant="outline"
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-white/30"
                >
                  🔍 Vezi Toate Serviciile
                </AnimatedButton>
              </div>
            </div>
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
