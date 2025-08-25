import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import type { ServiceContent } from "../../types/content";

interface ServicesSectionProps {
  services: ServiceContent[];
  serviceImages: Record<string, { src: string; width: number; height: number }>;
  backgroundImage: string;
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
  perfuzii: "💉",
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
  perfuzii: "#0284c7", // Perfusions - Sky Blue
  default: "#1e40af", // Default - Primary blue
};

// SEO-optimized button text for each service
const getServiceButtonText = (serviceName: string): string => {
  const buttonTexts: Record<string, string> = {
    "Medicina de Familie": "Consultație Familie",
    Pediatrie: "Servicii Pediatrie",
    "Medicina Internă": "Consultație Internist",
    "Chirurgie Generală": "Consultații Chirurgie",
    "Chirurgie Pediatrică": "Chirurgie Copii",
    Ginecologie: "Consultație Ginecolog",
    Ortopedie: "Servicii Ortopedie",
    Nefrologie: "Consultație Nefrolog",
    "Analize Laborator CAS": "Analize Medicale",
    Dermatologie: "Consultație Dermatolog",
    "Medicina Muncii": "Evaluare Medicală",
    Cardiologie: "Consultație Cardiolog",
    "ORL (Otorinolaringologie)": "Consultație ORL",
    Neurologie: "Consultație Neurolog",
    Oftalmologie: "Consultație Oftalmolog",
    Urologie: "Consultație Urolog",
    "Estetică Facială": "Tratamente Estetice",
    "Administrare Perfuzii": "Servicii Perfuzii",
  };

  return buttonTexts[serviceName] || "Vezi Serviciul";
};

export default function ServicesSection({
  services,
  serviceImages,
  backgroundImage,
}: ServicesSectionProps) {
  // Filtrăm serviciile care nu sunt în categoria "coming soon"
  const activeServices = services.filter(
    (service) => service.data.comingSoon !== true
  );

  // Sortăm serviciile după ordinea specificată în content
  const specialityServices = activeServices.sort(
    (a, b) => (a.data.order || 99) - (b.data.order || 99)
  );

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Overlay with medical colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-secondary/90" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <AnimatedText delay={0.2}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
              Specialități Medicale
            </h2>
          </AnimatedText>
        </div>

        {/* Medical Specialities Grid - Matching image design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {specialityServices.map((service, index) => (
            <AnimatedText
              key={service?.slug || index}
              delay={0.4 + index * 0.1}
            >
              <div className="group relative">
                {/* Clickable Card Container - Larger height for all content */}
                <a
                  href={
                    service?.slug ? `/servicii/${service.slug}` : "/servicii"
                  }
                  className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-[28rem] cursor-pointer"
                >
                  {/* Image Section - Standard image */}
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <img
                      src={
                        (service?.slug && serviceImages[service.slug]?.src) ||
                        serviceImages.default?.src
                      }
                      alt={service?.data.name || "Serviciu medical"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  {/* Content Section - Clean and compact */}
                  <div className="p-5 flex flex-col h-64">
                    {/* Service Title - Clean spacing */}
                    <div className="mb-3 h-12 flex items-start">
                      <h3 className="text-lg font-bold text-text leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {service?.data.name || "Serviciu Medical"}
                      </h3>
                    </div>

                    {/* SEO Keywords Tags - Compact */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {service?.data.keywords
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

                    {/* Service Description - More space without features */}
                    <div className="mb-4 h-20">
                      <p className="text-text-secondary text-sm leading-relaxed line-clamp-5 overflow-hidden">
                        {service?.data.description ||
                          "Servicii medicale complete cu echipament modern și personal calificat pentru îngrijirea sănătății tale."}
                      </p>
                    </div>

                    {/* SEO-Optimized Action Button - Fixed at bottom */}
                    <div className="mt-auto">
                      <div className="w-full h-11 bg-primary text-white rounded-lg text-center font-medium text-sm group-hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2">
                        <span>
                          {getServiceButtonText(service?.data.name || "")}
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </AnimatedText>
          ))}
        </div>
      </div>
    </section>
  );
}
