import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import type { ServiceContent } from "../../types/content";

interface ServicesSectionProps {
  services: ServiceContent[];
}

// Service icons mapping pentru iconițe emoji
const serviceIcons: Record<string, string> = {
  cardiologie: "❤️",
  dermatologie: "🧴",
  ginecologie: "🌸",
  pediatrie: "👶",
  ortopedie: "🦴",
  orl: "👂",
  estetica: "✨",
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
  estetica: "#f97316", // Aesthetics - Orange
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

export default function ServicesSection({ services }: ServicesSectionProps) {
  // Selectăm primele 6 servicii pentru afișare
  const featuredServices = services.slice(0, 6);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-surface via-surface-secondary to-surface relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-3/4 -right-8 w-32 h-32 bg-secondary/5 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-accent/5 rounded-full blur-xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <AnimatedText delay={0.2}>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 border border-primary/20">
              ✨ Servicii Medicale Complete
            </span>
          </AnimatedText>

          <AnimatedText delay={0.4}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-6">
              Îngrijire Medicală de{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient-x">
                Excepție
              </span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={0.6}>
            <p className="text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              Echipa noastră de{" "}
              <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                specialiști experimentați
              </span>{" "}
              oferă servicii medicale complete cu tehnologie avansată și o
              abordare personalizată pentru fiecare pacient.
            </p>
          </AnimatedText>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {featuredServices.map((service, index) => (
            <AnimatedText key={service.slug} delay={0.8 + index * 0.1}>
              <article className="group relative bg-surface-elevated/90 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-border/20 hover:border-primary/30 overflow-hidden h-full flex flex-col">
                {/* Dynamic Background Gradient based on service with better visibility */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${
                      serviceColors[
                        service.data.name?.toLowerCase().replace(/\s+/g, "") ||
                          ""
                      ] || serviceColors.default
                    }30, transparent)`,
                  }}
                />

                {/* Enhanced Glow Effect */}
                <div
                  className="absolute -inset-1 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${
                      serviceColors[
                        service.data.name?.toLowerCase().replace(/\s+/g, "") ||
                          ""
                      ] || serviceColors.default
                    }40, transparent)`,
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Service Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-20 h-20 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl"
                        style={{
                          background: `linear-gradient(135deg, ${
                            serviceColors[
                              service.data.name
                                ?.toLowerCase()
                                .replace(/\s+/g, "") || ""
                            ] || serviceColors.default
                          }20, ${
                            serviceColors[
                              service.data.name
                                ?.toLowerCase()
                                .replace(/\s+/g, "") || ""
                            ] || serviceColors.default
                          }30)`,
                        }}
                      >
                        <span className="text-3xl">
                          {serviceIcons[
                            service.data.name
                              ?.toLowerCase()
                              .replace(/\s+/g, "") || ""
                          ] || serviceIcons.default}
                        </span>
                      </div>
                      <div
                        className="absolute -inset-2 rounded-3xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${
                            serviceColors[
                              service.data.name
                                ?.toLowerCase()
                                .replace(/\s+/g, "") || ""
                            ] || serviceColors.default
                          }40, transparent)`,
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
                        {service.data.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
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

                  {/* Service Description */}
                  <div className="flex-1 mb-8">
                    <p className="text-text-secondary leading-relaxed line-clamp-3 group-hover:text-text-tertiary transition-colors duration-300">
                      {service.data.description}
                    </p>
                  </div>

                  {/* Service Features */}
                  <div className="mb-8">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-text-tertiary">
                        <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span>Consultații</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-tertiary">
                        <span className="w-2 h-2 bg-info rounded-full animate-pulse" />
                        <span>Investigații</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-tertiary">
                        <span className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                        <span>Tratamente</span>
                      </div>
                      <div className="flex items-center gap-2 text-success">
                        <span className="w-2 h-2 bg-success rounded-full" />
                        <span className="font-medium">Disponibil</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <AnimatedButton
                      href={`/servicii/${service.slug}`}
                      variant="outline"
                      size="lg"
                      className="w-full group-hover:border-primary group-hover:text-primary"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>Află mai multe</span>
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

        {/* Call to Action */}
        <div className="text-center mt-16">
          <AnimatedText delay={1.4}>
            <p className="text-lg text-text-secondary mb-8">
              Explorează toate serviciile noastre medicale și găsește îngrijirea
              de care ai nevoie.
            </p>
            <AnimatedButton
              href="/servicii"
              variant="primary"
              size="lg"
              className="shadow-2xl hover:shadow-primary/25"
            >
              <span className="flex items-center gap-3">
                <span>🏥</span>
                <span>Vezi Toate Serviciile</span>
                <span>→</span>
              </span>
            </AnimatedButton>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
