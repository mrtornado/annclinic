import { useState, useEffect } from "react";
import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedIcon from "../magic-ui/AnimatedIcon";
import type { ServiceContent } from "../../types/content";

interface ServicesSearchProps {
  services: ServiceContent[];
  variant?: "top" | "bottom";
}

export default function ServicesSearch({
  services,
  variant = "top",
}: ServicesSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Function to remove diacritics for search
  const removeDiacritics = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const queryNoDiacritics = removeDiacritics(query);
    const results: any[] = [];

    services.forEach((service) => {
      const matches: string[] = [];

      // Search in service name (both with and without diacritics)
      const serviceName = service.data.name.toLowerCase();
      const serviceNameNoDiacritics = removeDiacritics(serviceName);
      if (
        serviceName.includes(query) ||
        serviceNameNoDiacritics.includes(queryNoDiacritics)
      ) {
        matches.push(`Serviciu: ${service.data.name}`);
      }

      // Search in service description (both with and without diacritics)
      const serviceDesc = service.data.description.toLowerCase();
      const serviceDescNoDiacritics = removeDiacritics(serviceDesc);
      if (
        serviceDesc.includes(query) ||
        serviceDescNoDiacritics.includes(queryNoDiacritics)
      ) {
        matches.push(
          `Descriere: ${service.data.description.substring(0, 100)}...`
        );
      }

      // Search in keywords (both with and without diacritics)
      service.data.keywords?.forEach((keyword) => {
        const keywordLower = keyword.toLowerCase();
        const keywordNoDiacritics = removeDiacritics(keywordLower);
        if (
          keywordLower.includes(query) ||
          keywordNoDiacritics.includes(queryNoDiacritics)
        ) {
          matches.push(`Specialitate: ${keyword}`);
        }
      });

      // Search in treatments (both with and without diacritics)
      service.data.treatments?.forEach((treatment) => {
        const treatmentName = treatment.name.toLowerCase();
        const treatmentNameNoDiacritics = removeDiacritics(treatmentName);
        if (
          treatmentName.includes(query) ||
          treatmentNameNoDiacritics.includes(queryNoDiacritics)
        ) {
          matches.push(`Tratament: ${treatment.name}`);
        }
        if (treatment.description) {
          const treatmentDesc = treatment.description.toLowerCase();
          const treatmentDescNoDiacritics = removeDiacritics(treatmentDesc);
          if (
            treatmentDesc.includes(query) ||
            treatmentDescNoDiacritics.includes(queryNoDiacritics)
          ) {
            matches.push(`Procedură: ${treatment.description}`);
          }
        }
      });

      if (matches.length > 0) {
        results.push({
          service,
          matches: matches.slice(0, 4), // Increased to 4 matches for better visibility
          searchQuery: query, // Store the search query for highlighting
        });
      }
    });

    setSearchResults(results);
  }, [searchQuery, services]);

  // Function to highlight search terms in text (supports diacritics)
  const highlightSearchTerm = (
    text: string,
    searchQuery: string
  ): React.ReactNode => {
    if (!searchQuery.trim()) return text;

    const query = searchQuery.toLowerCase().trim();
    const queryNoDiacritics = removeDiacritics(query);

    // Use regex to find matches with flexible diacritic matching
    const escapeRegex = (str: string) =>
      str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Create a pattern that matches the query with or without diacritics
    let pattern = escapeRegex(query);

    // If the query doesn't have diacritics, make it flexible to match diacritics too
    if (query === queryNoDiacritics) {
      pattern = queryNoDiacritics
        .split("")
        .map((char) => {
          switch (char) {
            case "a":
              return "[aăâ]";
            case "e":
              return "[eê]";
            case "i":
              return "[iî]";
            case "s":
              return "[sș]";
            case "t":
              return "[tț]";
            default:
              return escapeRegex(char);
          }
        })
        .join("");
    }

    const regex = new RegExp(`(${pattern})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a matched part
        return (
          <span
            key={index}
            className="bg-primary/20 text-primary px-1.5 py-0.5 rounded-md font-bold border border-primary/30"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const bgClasses =
    variant === "top"
      ? "bg-gradient-to-br from-white via-gray-50 to-white"
      : "bg-gradient-to-br from-gray-50 via-white to-gray-50";

  return (
    <section className={`relative py-16 sm:py-20 ${bgClasses} overflow-hidden`}>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Services Section */}
        <AnimatedText delay={0.2}>
          <div className="text-center">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Caută Servicii și Tratamente
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Găsește rapid serviciul medical de care ai nevoie. Caută prin
                toate specialitățile, tratamentele și procedurile oferite de
                clinica noastră.
              </p>

              {/* Search Input */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Caută servicii, tratamente, proceduri... (ex: consultație cardiologie, ecografie, analize)"
                    className="w-full px-6 py-4 pr-14 text-lg border-2 border-gray-200 rounded-2xl focus:border-primary focus:outline-none transition-all duration-300 shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <AnimatedIcon icon="🔍" size="sm" />
                  </div>
                </div>
              </div>

              {/* Search Results */}
              {searchQuery.trim() && searchResults.length > 0 && (
                <div className="text-left max-w-4xl mx-auto mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-6 text-center">
                    Rezultate găsite:{" "}
                    <span className="text-primary">{searchResults.length}</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.map((result, index) => (
                      <a
                        key={`${result.service.slug}-${index}`}
                        href={`/servicii/${result.service.slug}`}
                        className="block bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                result.service.data.comingSoon
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                              } animate-pulse shadow-sm`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-semibold text-gray-900 text-base hover:text-primary transition-colors duration-300">
                                {highlightSearchTerm(
                                  result.service.data.name,
                                  searchQuery
                                )}
                              </h5>
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  result.service.data.comingSoon
                                    ? "bg-orange-100 text-orange-600"
                                    : "bg-green-100 text-green-600"
                                }`}
                              >
                                {result.service.data.comingSoon
                                  ? "În curând"
                                  : "Disponibil"}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {result.matches.map(
                                (match: string, matchIndex: number) => (
                                  <li
                                    key={matchIndex}
                                    className="text-sm text-gray-600 leading-relaxed"
                                  >
                                    <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                                    <span>
                                      {highlightSearchTerm(match, searchQuery)}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                            <div className="mt-3">
                              <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                                Vezi detalii
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                  →
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results Message */}
              {searchQuery.trim() && searchResults.length === 0 && (
                <div className="text-center mb-8">
                  <div className="text-gray-500 text-lg mb-6">
                    Nu am găsit rezultate pentru{" "}
                    <span className="font-semibold">"{searchQuery}"</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                    <AnimatedButton
                      href="/programare"
                      variant="primary"
                      size="lg"
                      className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <span className="flex items-center gap-3">
                        <AnimatedIcon icon="📅" size="sm" />
                        <span>Programează Consultație</span>
                      </span>
                    </AnimatedButton>

                    <AnimatedButton
                      href="/contact"
                      variant="outline"
                      size="lg"
                      className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-2xl font-semibold border-2 border-gray-200 hover:border-primary transition-all duration-300 hover:scale-105"
                    >
                      <span className="flex items-center gap-3">
                        <AnimatedIcon icon="📞" size="sm" />
                        <span>Contactează-ne</span>
                      </span>
                    </AnimatedButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
