import { useEffect, useState } from "react";
import { SearchProvider, useSearch } from "./SearchProvider";
import GlobalSearch from "./GlobalSearch";
import SearchFilters from "./SearchFilters";
import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedIcon from "../magic-ui/AnimatedIcon";
import MagicCard from "../magic-ui/MagicCard";
import type { ServiceContent, DoctorContent } from "../../types/content";

interface SearchResultsPageProps {
  services: ServiceContent[];
  doctors: DoctorContent[];
  initialQuery?: string;
  initialSpecialty?: string;
  initialServiceType?: string;
}

function SearchResultsContent() {
  const {
    query,
    results,
    totalResults,
    isLoading,
    hasError,
    filters,
    setQuery,
    setFilters,
  } = useSearch();

  const [sortBy, setSortBy] = useState<"relevance" | "name" | "specialty">(
    "relevance"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Sort results based on selected option
  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.title.localeCompare(b.title);
      case "specialty":
        return (a.specialty || "").localeCompare(b.specialty || "");
      case "relevance":
      default:
        return b.priority - a.priority;
    }
  });

  // Get result icon
  const getResultIcon = (type: "service" | "doctor") => {
    return type === "service" ? "🏥" : "👨‍⚕️";
  };

  // Get specialty color
  const getSpecialtyColor = (specialty?: string) => {
    const colors: Record<string, string> = {
      Cardiologie: "text-red-600 bg-red-50 border-red-200",
      Dermatologie: "text-orange-600 bg-orange-50 border-orange-200",
      Ginecologie: "text-pink-600 bg-pink-50 border-pink-200",
      Pediatrie: "text-green-600 bg-green-50 border-green-200",
      Neurologie: "text-purple-600 bg-purple-50 border-purple-200",
      Oftalmologie: "text-blue-600 bg-blue-50 border-blue-200",
    };
    return (
      colors[specialty || ""] || "text-primary bg-primary/10 border-primary/20"
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <AnimatedText delay={0.1}>
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text mb-4">
              Căutare Servicii Medicale
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Găsește rapid serviciile medicale și medicii specializați de care
              ai nevoie
            </p>
          </div>
        </AnimatedText>

        {/* Search Bar */}
        <AnimatedText delay={0.2}>
          <div className="max-w-2xl mx-auto mb-8">
            <GlobalSearch
              variant="header"
              placeholder="Caută servicii, medici sau specialități..."
              className="w-full"
            />
          </div>
        </AnimatedText>

        {/* Search Summary */}
        {query && (
          <AnimatedText delay={0.3}>
            <div className="text-center mb-6">
              <p className="text-secondary">
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">🔍</span>
                    Căutare...
                  </span>
                ) : (
                  <>
                    {totalResults > 0 ? (
                      <>
                        Găsite{" "}
                        <span className="font-semibold text-primary">
                          {totalResults}
                        </span>{" "}
                        rezultate
                        {query && (
                          <>
                            {" "}
                            pentru "<span className="font-medium">{query}</span>
                            "
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        Nu am găsit rezultate{" "}
                        {query && (
                          <>
                            pentru "<span className="font-medium">{query}</span>
                            "
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </p>
            </div>
          </AnimatedText>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <AnimatedText delay={0.4}>
              <SearchFilters variant="sidebar" />
            </AnimatedText>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          {results.length > 0 && (
            <AnimatedText delay={0.5}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                {/* Sort Options */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted font-medium">
                    Sortează după:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 text-sm border border-border rounded-lg bg-surface-elevated focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="relevance">Relevanță</option>
                    <option value="name">Nume</option>
                    <option value="specialty">Specialitate</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted font-medium">
                    Vizualizare:
                  </span>
                  <div className="flex border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-2 text-sm transition-colors ${
                        viewMode === "grid"
                          ? "bg-primary text-white"
                          : "bg-surface-elevated text-secondary hover:text-primary"
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-2 text-sm transition-colors ${
                        viewMode === "list"
                          ? "bg-primary text-white"
                          : "bg-surface-elevated text-secondary hover:text-primary"
                      }`}
                    >
                      Listă
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedText>
          )}

          {/* Results Grid/List */}
          {results.length > 0 ? (
            <div
              className={`
              ${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            `}
            >
              {sortedResults.map((result, index) => (
                <AnimatedText key={result.id} delay={0.6 + index * 0.1}>
                  <MagicCard
                    className={`
                      group transition-all duration-300 hover:scale-105 cursor-pointer
                      ${viewMode === "list" ? "p-4" : "p-6"}
                    `}
                    glowColor="rgba(30, 64, 175, 0.3)"
                  >
                    <a href={result.url} className="block h-full">
                      <div
                        className={`
                        ${
                          viewMode === "list"
                            ? "flex items-start gap-4"
                            : "space-y-4"
                        }
                      `}
                      >
                        {/* Icon/Type */}
                        <div
                          className={`
                          flex-shrink-0 flex items-center justify-center
                          ${
                            viewMode === "list"
                              ? "w-12 h-12 bg-primary/10 rounded-lg"
                              : "w-16 h-16 bg-primary/10 rounded-xl mx-auto"
                          }
                        `}
                        >
                          <span
                            className={`${
                              viewMode === "list" ? "text-xl" : "text-2xl"
                            }`}
                          >
                            {getResultIcon(result.type)}
                          </span>
                        </div>

                        {/* Content */}
                        <div
                          className={`
                          ${
                            viewMode === "list"
                              ? "flex-1 min-w-0"
                              : "text-center"
                          }
                        `}
                        >
                          <h3
                            className={`
                            font-semibold text group-hover:text-primary transition-colors
                            ${
                              viewMode === "list"
                                ? "text-lg mb-1"
                                : "text-xl mb-2"
                            }
                          `}
                          >
                            {result.title}
                          </h3>

                          <p
                            className={`
                            text-secondary line-clamp-2
                            ${
                              viewMode === "list"
                                ? "text-sm mb-2"
                                : "text-sm mb-3"
                            }
                          `}
                          >
                            {result.description}
                          </p>

                          {/* Meta Info */}
                          <div
                            className={`
                            flex gap-2 text-xs
                            ${
                              viewMode === "list"
                                ? "flex-wrap"
                                : "flex-wrap justify-center"
                            }
                          `}
                          >
                            <span
                              className={`
                              px-2 py-1 rounded-full border font-medium
                              ${
                                result.type === "service"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-green-50 text-green-700 border-green-200"
                              }
                            `}
                            >
                              {result.type === "service" ? "Serviciu" : "Medic"}
                            </span>

                            {result.specialty && (
                              <span
                                className={`
                                px-2 py-1 rounded-full border font-medium
                                ${getSpecialtyColor(result.specialty)}
                              `}
                              >
                                {result.specialty}
                              </span>
                            )}

                            {result.availability && (
                              <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">
                                ✅ Disponibil
                              </span>
                            )}
                          </div>

                          {/* Location */}
                          {result.location && (
                            <div
                              className={`
                              text-xs text-muted flex items-center gap-1 mt-2
                              ${viewMode === "list" ? "" : "justify-center"}
                            `}
                            >
                              <span>📍</span>
                              <span>{result.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </a>
                  </MagicCard>
                </AnimatedText>
              ))}
            </div>
          ) : (
            /* No Results State */
            <AnimatedText delay={0.5}>
              <div className="text-center py-16">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="text-6xl animate-bounce">🔍</div>
                    <h3 className="text-xl font-semibold text">
                      Căutare în curs...
                    </h3>
                    <p className="text-secondary">Te rugăm să aștepți</p>
                  </div>
                ) : hasError ? (
                  <div className="space-y-4">
                    <div className="text-6xl">⚠️</div>
                    <h3 className="text-xl font-semibold text">
                      Eroare la căutare
                    </h3>
                    <p className="text-secondary mb-6">
                      A apărut o problemă. Te rugăm să încerci din nou.
                    </p>
                    <AnimatedButton
                      onClick={() => window.location.reload()}
                      variant="primary"
                      size="sm"
                    >
                      Încearcă din nou
                    </AnimatedButton>
                  </div>
                ) : query ? (
                  <div className="space-y-4">
                    <div className="text-6xl">🔍</div>
                    <h3 className="text-xl font-semibold text">
                      Nu am găsit rezultate
                    </h3>
                    <p className="text-secondary mb-6">
                      Încearcă să cauți altceva sau modifică filtrele active.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <AnimatedButton
                        onClick={() => setQuery("")}
                        variant="primary"
                        size="sm"
                      >
                        Șterge căutarea
                      </AnimatedButton>
                      <AnimatedButton
                        href="/servicii"
                        variant="outline"
                        size="sm"
                      >
                        Vezi toate serviciile
                      </AnimatedButton>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-6xl">🏥</div>
                    <h3 className="text-xl font-semibold text">
                      Începe să cauți
                    </h3>
                    <p className="text-secondary mb-6">
                      Introdu un termen de căutare pentru a găsi servicii
                      medicale și medici specializați.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <AnimatedButton
                        href="/servicii"
                        variant="primary"
                        size="sm"
                      >
                        Vezi toate serviciile
                      </AnimatedButton>
                      <AnimatedButton
                        href="/medici"
                        variant="outline"
                        size="sm"
                      >
                        Vezi toți medicii
                      </AnimatedButton>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedText>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchResultsPage({
  services,
  doctors,
  initialQuery = "",
  initialSpecialty = "",
  initialServiceType = "",
}: SearchResultsPageProps) {
  return (
    <SearchProvider services={services} doctors={doctors}>
      <SearchInitializer
        initialQuery={initialQuery}
        initialSpecialty={initialSpecialty}
        initialServiceType={initialServiceType}
      />
      <SearchResultsContent />
    </SearchProvider>
  );
}

// Helper component to initialize search state
function SearchInitializer({
  initialQuery,
  initialSpecialty,
  initialServiceType,
}: {
  initialQuery: string;
  initialSpecialty: string;
  initialServiceType: string;
}) {
  const { setQuery, setFilters } = useSearch();

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }

    if (initialSpecialty || initialServiceType) {
      setFilters({
        ...(initialSpecialty && { specialty: initialSpecialty }),
        ...(initialServiceType && { serviceType: initialServiceType as any }),
      });
    }
  }, [
    initialQuery,
    initialSpecialty,
    initialServiceType,
    setQuery,
    setFilters,
  ]);

  return null;
}
