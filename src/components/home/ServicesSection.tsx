import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import type { ServiceContent } from "../../types/content";

interface ServicesSectionProps {
  services: ServiceContent[];
  serviceImages: Record<string, { src: string; width: number; height: number }>;
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

export default function ServicesSection({
  services,
  serviceImages,
}: ServicesSectionProps) {
  // Selectăm primele 6 servicii pentru afișare
  const featuredServices = services.slice(0, 6);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
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
            <span className="inline-block px-6 py-3 bg-primary/10 text-primary rounded-2xl text-sm font-semibold mb-6 border border-primary/20">
              ✨ Servicii Medicale Complete
            </span>
          </AnimatedText>

          <AnimatedText delay={0.4}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Îngrijire Medicală de{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Excepție
              </span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={0.6}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Echipa noastră de{" "}
              <span className="font-semibold text-primary bg-primary/10 px-3 py-1 rounded-xl">
                specialiști experimentați
              </span>{" "}
              oferă servicii medicale complete cu tehnologie avansată și o
              abordare personalizată pentru fiecare pacient.
            </p>
          </AnimatedText>
        </div>

        {/* Modern Services Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <AnimatedText key={service.slug} delay={0.8 + index * 0.1}>
              <article className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden h-full flex flex-col border border-gray-100">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
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
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">
                        {serviceIcons[
                          service.data.name
                            ?.toLowerCase()
                            .replace(/\s+/g, "") || ""
                        ] || serviceIcons.default}
                      </span>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {service.data.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Popular
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Service Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      {service.data.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
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
                  <div className="flex-1 mb-6">
                    <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                      {service.data.description}
                    </p>
                  </div>

                  {/* Service Features */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>Consultații</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span>Investigații</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span>Tratamente</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
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
                      className="w-full border-2 border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
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
            <p className="text-lg text-gray-600 mb-8">
              Explorează toate serviciile noastre medicale și găsește îngrijirea
              de care ai nevoie.
            </p>
            <AnimatedButton
              href="/servicii"
              variant="primary"
              size="lg"
              className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
