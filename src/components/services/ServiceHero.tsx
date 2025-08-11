import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import FloatingParticles from "../magic-ui/FloatingParticles";
import type { ServiceContent } from "../../types/content";

interface ServiceHeroProps {
  service?: ServiceContent | any; // Allow both ServiceContent and direct objects from landing pages
  isLandingPage?: boolean;
  showFreeConsultation?: boolean;
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

export default function ServiceHero({
  service,
  isLandingPage = false,
  showFreeConsultation = false,
}: ServiceHeroProps) {
  // Handle both ServiceContent and direct objects from landing pages
  const getServiceName = () => {
    if (service?.data?.name) return service.data.name; // ServiceContent format
    if (service?.name) return service.name; // Direct object format
    return "Servicii Medicale";
  };

  const getServiceDescription = () => {
    if (service?.data?.description) return service.data.description; // ServiceContent format
    if (service?.description) return service.description; // Direct object format
    return "Servicii medicale de calitate";
  };

  const serviceSlug = service?.slug || service?.icon || "default";
  const gradientClass = serviceColors[serviceSlug] || serviceColors.default;
  const iconEmoji = serviceIcons[serviceSlug] || serviceIcons.default;

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradientClass} pt-24 sm:pt-28`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <FloatingParticles count={40} />

        {/* Service-specific background shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl hero-pulse" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl hero-glow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/10 rounded-full blur-2xl hero-float"
          style={{ animationDelay: "4s" }}
        />

        {/* Medical cross pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/5 w-8 h-8 bg-primary transform rotate-45 rounded-sm" />
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-secondary transform rotate-45 rounded-sm" />
          <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-accent transform rotate-45 rounded-sm" />
        </div>

        {/* Gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-transparent to-surface/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Service Badge */}
        <AnimatedText delay={0.2}>
          <div className="inline-flex items-center gap-3 bg-surface-elevated/80 backdrop-blur-md text-primary px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-xl border border-primary/20 hover:bg-surface-elevated transition-all duration-300">
            <span className="text-2xl">{iconEmoji}</span>
            <span>Servicii Medicale de Specialitate</span>
            <div className="w-2 h-2 bg-secondary rounded-full hero-pulse" />
          </div>
        </AnimatedText>

        {/* Service Title */}
        <AnimatedText delay={0.4}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text mb-8 leading-tight">
            <span className="block mb-4">{getServiceName()}</span>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hero-gradient-flow">
              în București și Bragadiru
            </span>
          </h1>
        </AnimatedText>

        {/* Service Description */}
        <AnimatedText delay={0.6}>
          <p className="text-lg sm:text-xl lg:text-2xl text-secondary max-w-4xl mx-auto leading-relaxed mb-12">
            {service?.data?.longDescription ||
              service?.longDescription ||
              getServiceDescription()}
          </p>
        </AnimatedText>

        {/* CTA Buttons */}
        <AnimatedText delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16">
            <AnimatedButton
              href="/programare"
              variant="primary"
              size="lg"
              className="hero-btn-primary shadow-2xl"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">📅</span>
                <span>Programează Consultație</span>
              </span>
            </AnimatedButton>

            <AnimatedButton
              href="/contact"
              variant="outline"
              size="lg"
              className="hero-btn-outline"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <span>Contactează-ne</span>
              </span>
            </AnimatedButton>
          </div>
        </AnimatedText>

        {/* Service Highlights removed */}
      </div>

      {/* Scroll Indicator removed */}
    </section>
  );
}
