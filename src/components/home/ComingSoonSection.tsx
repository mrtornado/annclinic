import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import type { ServiceContent } from "../../types/content";

interface ComingSoonSectionProps {
  services: ServiceContent[];
  serviceImages: Record<string, { src: string; width: number; height: number }>;
  backgroundImage: string;
}

export default function ComingSoonSection({
  services,
  serviceImages,
  backgroundImage,
}: ComingSoonSectionProps) {
  // Filtrăm doar serviciile care au comingSoon: true
  const comingSoonServices = services.filter(
    (service) => service.data.comingSoon === true
  );

  if (comingSoonServices.length === 0) {
    return null; // Nu afișăm secțiunea dacă nu avem servicii coming soon
  }

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Overlay with different gradient for coming soon */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-accent/85 to-primary/90" />

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
            <div className="inline-flex items-center gap-3 mb-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                În Curând
              </h2>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.4}>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Următoarele specialități vor fi disponibile în cel mai scurt timp
              posibil.
            </p>
          </AnimatedText>
        </div>

        {/* Coming Soon Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {comingSoonServices.map((service, index) => (
            <AnimatedText
              key={service?.slug || index}
              delay={0.6 + index * 0.1}
            >
              <div className="group relative">
                {/* Coming Soon Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-[28rem] relative">
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      În Curând
                    </span>
                  </div>

                  {/* Image Section */}
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <img
                      src={
                        (service?.slug && serviceImages[service.slug]?.src) ||
                        serviceImages.default?.src
                      }
                      alt={service?.data.name || "Serviciu medical"}
                      className="w-full h-full object-cover transition-transform duration-300 opacity-80"
                      loading="lazy"
                    />
                    {/* Coming soon overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent" />

                    {/* Coming Soon Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl">
                        <span className="text-2xl">⏳</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex flex-col h-64">
                    {/* Service Title */}
                    <div className="mb-3 h-12 flex items-start">
                      <h3 className="text-lg font-bold text-text leading-tight transition-colors duration-300 line-clamp-2">
                        {service?.data.name || "Serviciu Medical"}
                      </h3>
                    </div>

                    {/* SEO Keywords Tags - faded for coming soon */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {service?.data.keywords
                          ?.slice(0, 2)
                          .map((keyword: string) => (
                            <span
                              key={keyword}
                              className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded-full font-medium border border-secondary/30"
                            >
                              {keyword}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Service Description */}
                    <div className="mb-4 h-20">
                      <p className="text-text-secondary text-sm leading-relaxed line-clamp-5 overflow-hidden opacity-80">
                        {service?.data.description ||
                          "Servicii medicale complete cu echipament modern și personal calificat pentru îngrijirea sănătății tale."}
                      </p>
                    </div>

                    {/* Coming Soon Status */}
                    <div className="mt-auto">
                      <div className="w-full h-11 bg-secondary/20 text-secondary border-2 border-secondary/30 rounded-lg text-center font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-not-allowed">
                        <span>⏰</span>
                        <span>În Dezvoltare</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedText>
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-white/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/5 to-white/10 rounded-full blur-2xl -z-10" />
    </section>
  );
}
