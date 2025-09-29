import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import FloatingParticles from "../magic-ui/FloatingParticles";
import type { ServiceContent } from "../../types/content";

// Import optimized WebP service images
import cardiologieImg from "../../assets/images/servicii/soon/cardiologie.webp";
import dermatologieImg from "../../assets/images/servicii/dermatologie.webp";
import ginecologieImg from "../../assets/images/servicii/ginecologie.webp";
import pediatrieImg from "../../assets/images/servicii/pediatrrie.webp";
import ortoImg from "../../assets/images/servicii/orto.webp";
import orlImg from "../../assets/images/servicii/soon/ORL.webp";
import oftamologieImg from "../../assets/images/servicii/soon/oftamologie.webp";
import nefrologieImg from "../../assets/images/servicii/nefrologie.webp";
import endocrinologieImg from "../../assets/images/servicii/soon/endocrinologie.webp";
import urologieImg from "../../assets/images/servicii/soon/UROLOGIE.webp";
import psihiatrieImg from "../../assets/images/servicii/soon/psihiatrie.webp";
import chirurgieImg from "../../assets/images/servicii/chirurgie.webp";
import medicinaInternaImg from "../../assets/images/servicii/medicina-interna.webp";
import medicinaMunciiImg from "../../assets/images/servicii/medicina-muncii.webp";
import defaultImg from "../../assets/images/servicii/fam-scaled.webp";

interface ServiceHeroProps {
  service?: ServiceContent | any; // Allow both ServiceContent and direct objects from landing pages
  isLandingPage?: boolean;
  showFreeConsultation?: boolean;
  showCASBanner?: boolean;
  serviceImages?: Record<
    string,
    { src: string; width: number; height: number }
  >;
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

// Service images mapping (local fallback)
const localServiceImages: Record<string, any> = {
  cardiologie: cardiologieImg,
  dermatologie: dermatologieImg,
  dermatovenerologie: dermatologieImg,
  ginecologie: ginecologieImg,
  "obstetrica-ginecologie": ginecologieImg,
  pediatrie: pediatrieImg,
  ortopedie: ortoImg,
  "ortopedie-traumatologie": ortoImg,
  orl: orlImg,
  oftalmologie: oftamologieImg,
  nefrologie: nefrologieImg,
  neurologie: nefrologieImg, // Using nefrologie as placeholder
  endocrinologie: endocrinologieImg,
  urologie: urologieImg,
  psihiatrie: psihiatrieImg,
  "chirurgie-generala": chirurgieImg,
  "medicina-interna": medicinaInternaImg,
  "medicina-muncii": medicinaMunciiImg,
  default: defaultImg,
};

export default function ServiceHero({
  service,
  isLandingPage = false,
  showFreeConsultation = false,
  showCASBanner = false,
  serviceImages,
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

  // Use optimized images from props if available, otherwise fallback to local mapping
  const getServiceImage = () => {
    // First try optimized images from props
    if (serviceImages?.[serviceSlug]) return serviceImages[serviceSlug];
    if (serviceImages?.default) return serviceImages.default;

    // Fallback to local mapping
    return localServiceImages[serviceSlug] || localServiceImages.default;
  };

  const serviceImage = getServiceImage();

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0">
        <img
          src={serviceImage?.src}
          alt={getServiceName()}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Service color overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-multiply"
          style={{ backgroundColor: gradientClass }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        <FloatingParticles count={20} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          {/* Centered Content */}
          <div className="text-center max-w-4xl">
            {/* Service Title */}
            <AnimatedText delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="block mb-2">{getServiceName()}</span>
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hero-gradient-flow">
                  în București și Bragadiru
                </span>
              </h1>
            </AnimatedText>

            {/* CAS Banner */}
            {showCASBanner && (
              <AnimatedText delay={0.3}>
                <div className="relative bg-gradient-to-r from-emerald-500/95 via-green-500/95 to-teal-500/95 backdrop-blur-sm text-white px-6 sm:px-8 py-4 sm:py-5 rounded-3xl text-center mb-8 shadow-2xl border border-emerald-400/40 hover:shadow-emerald-500/25 hover:scale-[1.02] transition-all duration-500 max-w-lg mx-auto overflow-hidden">
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />

                  <div className="relative z-10">
                    <div className="font-bold text-lg sm:text-xl mb-2 tracking-wide">
                      Consultații și Servicii GRATUITE
                    </div>
                    <div className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                      (se decontează de CAS cu bilet de trimitere)
                    </div>
                  </div>
                </div>
              </AnimatedText>
            )}

            {/* Service Description */}
            <AnimatedText delay={0.4}>
              <p className="text-xl text-white/90 mx-auto leading-relaxed mb-8">
                {service?.data?.longDescription ||
                  service?.longDescription ||
                  getServiceDescription()}
              </p>
            </AnimatedText>

            {/* CTA Buttons */}
            <AnimatedText delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  href="tel:+40721234567"
                  variant="outline"
                  size="lg"
                  className="hero-btn-outline border-white/30 text-white hover:bg-white hover:text-gray-900"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">📞</span>
                    <span>Sună Acum</span>
                  </span>
                </AnimatedButton>
              </div>
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
}
