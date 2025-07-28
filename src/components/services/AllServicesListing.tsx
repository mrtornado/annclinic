import { useState, useEffect } from "react";
import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedIcon from "../magic-ui/AnimatedIcon";
import FloatingParticles from "../magic-ui/FloatingParticles";
import type { ServiceContent } from "../../types/content";

interface AllServicesListingProps {
  services: ServiceContent[];
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
}: AllServicesListingProps) {
  const [visibleServices, setVisibleServices] = useState<ServiceContent[]>([]);

  useEffect(() => {
    // Show all services for the main services page
    setVisibleServices(services);
  }, [services]);

  const getServiceKey = (serviceName: string) => {
    return serviceName.toLowerCase().replace(/\s+/g, "-");
  };

  const getServiceColor = (serviceSlug: string) => {
    const key = serviceSlug.toLowerCase().replace(/\s+/g, "-");
    return serviceColors[key] || serviceColors.default;
  };

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-br from-surface-secondary via-surface to-surface-tertiary overflow-hidden">
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
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text mb-8 leading-tight">
              <span className="block mb-2">Servicii Complete de</span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hero-gradient-flow">
                Sănătate
              </span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={0.6}>
            <p className="text-lg sm:text-xl text-secondary max-w-4xl mx-auto leading-relaxed">
              Echipa noastră de{" "}
              <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                {services.length} specialiști experimentați
              </span>{" "}
              oferă îngrijire medicală de înaltă calitate într-o gamă completă
              de specialități. Tehnologie avansată și abordare personalizată
              pentru fiecare pacient.
            </p>
          </AnimatedText>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {visibleServices.map((service, index) => {
            const serviceKey = getServiceKey(service.data.name);

            return (
              <AnimatedText key={service.slug} delay={0.2 + index * 0.1}>
                <article className="group relative bg-surface-elevated/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-border/20 hover:border-primary/30 overflow-hidden h-full flex flex-col">
                  {/* Enhanced glow and visibility effects */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${getServiceColor(
                        service.slug
                      )}30, transparent)`,
                    }}
                  />

                  <div
                    className="absolute -inset-1 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${getServiceColor(
                        service.slug
                      )}40, transparent)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Service Icon with enhanced colors */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${getServiceColor(
                          service.slug
                        )}20, ${getServiceColor(service.slug)}30)`,
                      }}
                    >
                      <span className="text-2xl">
                        {serviceIcons[service.slug] || serviceIcons.default}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors duration-300 mb-2">
                        {service.data.name}
                      </h3>

                      <div className="flex flex-wrap gap-1">
                        {service.data.keywords
                          ?.slice(0, 2)
                          .map((keyword: string) => (
                            <span
                              key={keyword}
                              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium border border-primary/20"
                            >
                              {keyword}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Service Description with better text colors */}
                  <p className="text-text-secondary group-hover:text-text-tertiary transition-colors duration-300 mb-6 line-clamp-2">
                    {service.data.description}
                  </p>

                  {/* Service Features with colored indicators */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-text-tertiary">
                      <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      <span>Consultații</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-tertiary">
                      <span className="w-2 h-2 bg-info rounded-full animate-pulse" />
                      <span>Investigații</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-success">
                      <span className="w-2 h-2 bg-success rounded-full" />
                      <span className="font-medium">Disponibil</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <AnimatedButton
                    href={`/servicii/${service.slug}`}
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:border-primary group-hover:text-primary"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>Detalii</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </span>
                  </AnimatedButton>
                </article>
              </AnimatedText>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <AnimatedText delay={1.0}>
          <div className="text-center mt-20">
            <div className="bg-surface-elevated/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-border/20 shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text mb-6">
                Nu găsești ce cauți?
              </h3>
              <p className="text-secondary text-lg mb-8 max-w-2xl mx-auto">
                Contactează-ne pentru mai multe informații despre serviciile
                noastre sau pentru a programa o consultație personalizată.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <AnimatedButton
                  href="/programare"
                  variant="primary"
                  size="lg"
                  className="hero-btn-primary shadow-2xl"
                >
                  <span className="flex items-center gap-3">
                    <AnimatedIcon icon="📅" size="sm" />
                    <span>Programează Consultație</span>
                    <AnimatedIcon icon="✨" size="sm" />
                  </span>
                </AnimatedButton>

                <AnimatedButton
                  href="/contact"
                  variant="outline"
                  size="lg"
                  className="hero-btn-outline"
                >
                  <span className="flex items-center gap-3">
                    <AnimatedIcon icon="📞" size="sm" />
                    <span>Contactează-ne</span>
                  </span>
                </AnimatedButton>
              </div>
            </div>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
