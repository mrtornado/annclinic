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

const serviceColors: Record<string, string> = {
  cardiologie: "from-red-500/20 to-red-600/20",
  dermatologie: "from-amber-500/20 to-amber-600/20",
  ginecologie: "from-pink-500/20 to-pink-600/20",
  pediatrie: "from-green-500/20 to-green-600/20",
  ortopedie: "from-blue-500/20 to-blue-600/20",
  orl: "from-purple-500/20 to-purple-600/20",
  "estetica-faciala": "from-orange-500/20 to-orange-600/20",
  neurologie: "from-indigo-500/20 to-indigo-600/20",
  endocrinologie: "from-emerald-500/20 to-emerald-600/20",
  gastroenterologie: "from-yellow-500/20 to-yellow-600/20",
  urologie: "from-sky-500/20 to-sky-600/20",
  oftalmologie: "from-lime-500/20 to-lime-600/20",
  psihiatrie: "from-violet-500/20 to-violet-600/20",
  radiologie: "from-slate-500/20 to-slate-600/20",
  laborator: "from-gray-500/20 to-gray-600/20",
  default: "from-primary/20 to-primary-hover/20",
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
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradientClass}`}
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
              în București
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

        {/* Service Highlights */}
        <AnimatedText delay={1.0}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: "👨‍⚕️",
                title: "Specialiști Experimentați",
                desc: "Medici cu experiență vastă",
              },
              {
                icon: "🏥",
                title: "Echipamente Moderne",
                desc: "Tehnologie de ultimă generație",
              },
              {
                icon: "⏰",
                title: "Program Flexibil",
                desc: "Luni-Vineri 8:00-20:00",
              },
              {
                icon: "💯",
                title: "Rezultate Garantate",
                desc: "Tratamente eficiente",
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-surface-elevated/80 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text mb-2">
                  {item.title}
                </h3>
                <p className="text-secondary text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedText>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-text/50 rounded-full flex justify-center hover:border-text/70 transition-colors duration-300">
          <div className="w-1 h-3 bg-text/70 rounded-full mt-2 animate-pulse" />
        </div>
        <p className="text 70 text-xs mt-2 font-medium text-center">
          Scroll
        </p>
      </div>
    </section>
  );
}
