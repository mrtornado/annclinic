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

                  {/* Service Icon */}
                  <div className="absolute top-3 right-3">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-lg">
                        {serviceIcons[service.slug] || serviceIcons.default}
                      </span>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {service.data.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-secondary text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Popular
                      </span>
                    </div>
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
                      <div className="flex items-center gap-1 text-green-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-medium">Disponibil</span>
                      </div>
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

        {/* Bottom Call to Action */}
        <AnimatedText delay={1.0}>
          <div className="text-center mt-20">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Nu găsești ce cauți?
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Contactează-ne pentru mai multe informații despre serviciile
                noastre sau pentru a programa o consultație personalizată.
              </p>

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
                    <AnimatedIcon icon="✨" size="sm" />
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
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
