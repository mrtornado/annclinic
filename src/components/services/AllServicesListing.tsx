import { useState, useEffect } from "react";
import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedIcon from "../magic-ui/AnimatedIcon";
import FloatingParticles from "../magic-ui/FloatingParticles";
import type { ServiceContent } from "../../types/content";

interface AllServicesListingProps {
  services: ServiceContent[];
  serviceImages: Record<string, { src: string; width: number; height: number }>;
}

const serviceIcons: Record<string, string> = {
  cardiologie: "❤️",
  dermatologie: "🧴",
  ginecologie: "🌸",
  pediatrie: "👶",
  ortopedie: "🦴",
  orl: "👂",
  "estetica-faciala": "✨",
  neurologie: "🧠",
  endocrinologie: "⚖️",
  gastroenterologie: "🫄",
  urologie: "💧",
  oftalmologie: "👁️",
  psihiatrie: "🧘",
  radiologie: "📡",
  laborator: "🔬",
  default: "🏥",
};

// Enhanced service colors with better visibility for dark mode
const serviceColors: Record<string, string> = {
  cardiologie: "#ef4444", // Cardiology - Bright red
  dermatologie: "#f59e0b", // Dermatology - Amber
  ginecologie: "#ec4899", // Gynecology - Pink
  pediatrie: "#10b981", // Pediatrics - Emerald
  ortopedie: "#3b82f6", // Orthopedics - Blue
  orl: "#8b5cf6", // ORL - Purple
  "estetica-faciala": "#f97316", // Aesthetics - Orange
  neurologie: "#6366f1", // Neurology - Indigo
  endocrinologie: "#059669", // Endocrinology - Teal
  gastroenterologie: "#d97706", // Gastroenterology - Amber
  urologie: "#0ea5e9", // Urology - Sky
  oftalmologie: "#84cc16", // Ophthalmology - Lime
  psihiatrie: "#a855f7", // Psychiatry - Violet
  radiologie: "#64748b", // Radiology - Slate
  laborator: "#475569", // Laboratory - Gray
  default: "#1e40af", // Default - Primary blue
};

export default function AllServicesListing({
  services,
  serviceImages,
}: AllServicesListingProps) {
  const [visibleServices, setVisibleServices] = useState<ServiceContent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    // Show all services for the main services page
    setVisibleServices(services);
  }, [services]);

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

  const getServiceKey = (serviceName: string) => {
    return serviceName.toLowerCase().replace(/\s+/g, "-");
  };

  const getServiceColor = (serviceSlug: string) => {
    const key = serviceSlug.toLowerCase().replace(/\s+/g, "-");
    return serviceColors[key] || serviceColors.default;
  };

  // Function to remove diacritics for search
  const removeDiacritics = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Function to highlight search terms in text (supports diacritics)
  const highlightSearchTerm = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text;

    const query = searchQuery.toLowerCase().trim();
    const queryNoDiacritics = removeDiacritics(query);
    
    // Create a more comprehensive regex that matches both with and without diacritics
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedQueryNoDiacritics = queryNoDiacritics.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    
    // Build regex pattern that matches both versions
    let pattern = escapedQuery;
    if (escapedQuery !== escapedQueryNoDiacritics) {
      pattern = `(${escapedQuery}|${escapedQueryNoDiacritics})`;
    }
    
    // Also create a reverse pattern to match diacritics when searching without them
    const diacriticMap: { [key: string]: string } = {
      'a': '[aăâ]',
      'e': '[eê]', 
      'i': '[iî]',
      'o': '[o]',
      'u': '[u]',
      's': '[sș]',
      't': '[tț]'
    };
    
    let flexiblePattern = queryNoDiacritics;
    for (const [base, variants] of Object.entries(diacriticMap)) {
      flexiblePattern = flexiblePattern.replace(new RegExp(base, 'g'), variants);
    }
    
    const finalPattern = `(${escapedQuery}|${flexiblePattern})`;
    const regex = new RegExp(finalPattern, "gi");
    
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const partLower = part.toLowerCase();
      const partNoDiacritics = removeDiacritics(partLower);
      
      if (partLower.includes(query) || partNoDiacritics.includes(queryNoDiacritics) || regex.test(part)) {
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

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <FloatingParticles count={40} />

        {/* Enhanced Background Shapes */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/12 rounded-full blur-3xl hero-float" />
        <div
          className="absolute top-1/3 right-20 w-32 h-32 bg-secondary/12 rounded-full blur-2xl hero-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-48 h-48 bg-accent/12 rounded-full blur-3xl hero-glow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-24 h-24 bg-primary/18 rounded-full blur-xl hero-particle-dance"
          style={{ animationDelay: "3s" }}
        />

        {/* Enhanced Medical Cross Pattern */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-1/4 left-1/5 w-8 h-8 bg-primary/30 transform rotate-45 rounded-sm" />
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-secondary/30 transform rotate-45 rounded-sm" />
          <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-accent/30 transform rotate-45 rounded-sm" />
          <div className="absolute top-1/6 right-1/6 w-10 h-10 bg-primary/30 transform rotate-45 rounded-sm" />
        </div>

        {/* Better contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/70 via-transparent to-surface/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <AnimatedText delay={0.2}>
            <div className="inline-flex items-center gap-3 bg-surface-elevated/80 backdrop-blur-md text-primary px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-xl border border-primary/20 hover:bg-surface-elevated transition-all duration-300 hero-glow">
              <AnimatedIcon icon="⚕️" size="sm" />
              <span>Toate Specialitățile Medicale</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full hero-pulse" />
                <div
                  className="w-2 h-2 bg-secondary rounded-full hero-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <div
                  className="w-2 h-2 bg-accent rounded-full hero-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.4}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              <span className="block mb-2">Servicii Complete de</span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Sănătate
              </span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={0.6}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Echipa noastră de{" "}
              <span className="font-semibold text-primary bg-primary/10 px-3 py-1 rounded-xl">
                {services.length} specialiști experimentați
              </span>{" "}
              oferă îngrijire medicală de înaltă calitate într-o gamă completă
              de specialități. Tehnologie avansată și abordare personalizată
              pentru fiecare pacient.
            </p>
          </AnimatedText>
        </div>

        {/* Modern Services Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {visibleServices.map((service, index) => (
            <AnimatedText key={service.slug} delay={0.2 + index * 0.1}>
              <article className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden h-full flex flex-col border border-gray-100">
                {/* Service Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={
                      serviceImages[service.slug]?.src ||
                      serviceImages.default?.src
                    }
                    alt={service.data.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    width={
                      serviceImages[service.slug]?.width ||
                      serviceImages.default?.width
                    }
                    height={
                      serviceImages[service.slug]?.height ||
                      serviceImages.default?.height
                    }
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Status Badge */}
                  {service.data.comingSoon ? (
                    <div className="absolute top-3 left-3">
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        În Curând
                      </span>
                    </div>
                  ) : (
                    service.data.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-secondary text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Popular
                        </span>
                      </div>
                    )
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Service Header */}
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      {service.data.name}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {service.data.keywords
                        ?.slice(0, 2)
                        .map((keyword: string) => (
                          <span
                            key={keyword}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Service Description */}
                  <div className="flex-1 mb-4">
                    <p className="text-gray-600 leading-relaxed text-sm line-clamp-2">
                      {service.data.description}
                    </p>
                  </div>

                  {/* Service Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-1 text-gray-500">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <span>Consultații</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span>Investigații</span>
                      </div>
                      {service.data.comingSoon ? (
                        <div className="flex items-center gap-1 text-orange-600">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                          <span className="font-medium">În Curând</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-green-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          <span className="font-medium">Disponibil</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <AnimatedButton
                      href={`/servicii/${service.slug}`}
                      variant="outline"
                      size="sm"
                      className="w-full border-2 border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 text-sm py-2"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>Detalii</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </span>
                    </AnimatedButton>
                  </div>
                </div>
              </article>
            </AnimatedText>
          ))}
        </div>

        {/* Search Services Section */}
        <AnimatedText delay={1.0}>
          <div className="text-center mt-20">
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
