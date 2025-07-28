import { useState, useEffect } from "react";
import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedIcon from "../magic-ui/AnimatedIcon";
import FloatingParticles from "../magic-ui/FloatingParticles";
import type { ServiceContent } from "../../types/content";

interface ServicesSectionProps {
  services: ServiceContent[];
}

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

const serviceColors: Record<string, string> = {
  cardiologie: "rgba(220, 38, 38, 0.4)",
  dermatologie: "rgba(245, 158, 11, 0.4)",
  ginecologie: "rgba(236, 72, 153, 0.4)",
  pediatrie: "rgba(16, 185, 129, 0.4)",
  ortopedie: "rgba(59, 130, 246, 0.4)",
  orl: "rgba(139, 92, 246, 0.4)",
  estetica: "rgba(249, 115, 22, 0.4)",
  neurologie: "rgba(99, 102, 241, 0.4)",
  endocrinologie: "rgba(5, 150, 105, 0.4)",
  gastroenterologie: "rgba(217, 119, 6, 0.4)",
  urologie: "rgba(14, 165, 233, 0.4)",
  oftalmologie: "rgba(132, 204, 22, 0.4)",
  psihiatrie: "rgba(168, 85, 247, 0.4)",
  radiologie: "rgba(100, 116, 139, 0.4)",
  laborator: "rgba(71, 85, 105, 0.4)",
  default: "rgba(30, 64, 175, 0.4)",
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [featuredServices, setFeaturedServices] = useState<ServiceContent[]>(
    []
  );

  useEffect(() => {
    setFeaturedServices(services.filter((service) => service.data.featured));
  }, [services]);

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-br from-surface-secondary via-surface to-surface-tertiary overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <FloatingParticles count={35} />

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
              <AnimatedIcon icon="🏥" size="sm" />
              <span>Servicii Medicale de Excelență</span>
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
              <span className="block mb-2">Specialități de</span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hero-gradient-flow">
                Excelență
              </span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={0.6}>
            <p className="text-lg sm:text-xl text-secondary max-w-4xl mx-auto leading-relaxed">
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
                {/* Dynamic Background Gradient based on service */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${
                      serviceColors[
                        service.data.name?.toLowerCase().replace(/\s+/g, "") ||
                          ""
                      ] || serviceColors.default
                    }15, transparent)`,
                  }}
                />

                {/* Enhanced Glow Effect */}
                <div
                  className="absolute -inset-1 rounded-3xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${
                      serviceColors[
                        service.data.name?.toLowerCase().replace(/\s+/g, "") ||
                          ""
                      ] || serviceColors.default
                    }, transparent)`,
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Service Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 via-primary/30 to-primary/20 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                        <span className="text-3xl">
                          {serviceIcons[
                            service.data.name
                              ?.toLowerCase()
                              .replace(/\s+/g, "") || ""
                          ] || serviceIcons.default}
                        </span>
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl lg:text-3xl font-bold text group-hover:text-primary transition-colors duration-300 mb-3 leading-tight">
                        {service.data.name}
                      </h3>
                      <div className="w-20 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-full group-hover:w-32 transition-all duration-500" />
                    </div>
                  </div>

                  {/* Service Description */}
                  <div className="flex-1 mb-8">
                    <p className="text-secondary text-lg leading-relaxed">
                      {service.data.description}
                    </p>
                  </div>

                  {/* Service Features */}
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-3">
                      {["Consultații", "Investigații", "Tratamente"].map(
                        (feature, idx) => (
                          <span
                            key={feature}
                            className="text-sm bg-gradient-to-r from-primary/15 to-secondary/15 text-primary px-4 py-2 rounded-full border border-primary/20 group-hover:border-primary/40 transition-all duration-300 hover:scale-105 font-medium"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                          >
                            {feature}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Service Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-border/30 group-hover:border-primary/30 transition-colors duration-300">
                    <AnimatedButton
                      href={`/servicii/${service.slug}`}
                      variant="outline"
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 hover:scale-105"
                    >
                      <span className="flex items-center gap-2">
                        <span>Află mai multe</span>
                        <span className="text-lg">→</span>
                      </span>
                    </AnimatedButton>

                    <div className="flex items-center gap-3 bg-surface/50 px-3 py-2 rounded-full">
                      <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                      <span className="text-sm text-muted font-medium">
                        Disponibil
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </AnimatedText>
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedText delay={1.4}>
          <div className="text-center mt-16">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <AnimatedButton
                href="/servicii"
                variant="primary"
                size="lg"
                className="hero-btn-primary shadow-2xl"
              >
                <span className="flex items-center gap-3">
                  <AnimatedIcon icon="🏥" size="sm" />
                  <span>Vezi Toate Serviciile</span>
                  <AnimatedIcon icon="✨" size="sm" />
                </span>
              </AnimatedButton>

              <AnimatedButton
                href="/programare"
                variant="outline"
                size="lg"
                className="hero-btn-outline"
              >
                <span className="flex items-center gap-3">
                  <AnimatedIcon icon="📅" size="sm" />
                  <span>Programează Consultație</span>
                </span>
              </AnimatedButton>
            </div>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
