import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText from "../magic-ui/AnimatedText";

interface WelcomeSectionProps {
  welcomeImage: string;
}

export default function WelcomeSection({ welcomeImage }: WelcomeSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-surface via-surface-secondary to-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1 relative">
            <AnimatedText delay={0.2}>
              <div className="relative group">
                {/* Background decoration */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Main image */}
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-border/20">
                  <img
                    src={welcomeImage}
                    alt="Cabinet medical modern ANN Clinic"
                    className="w-full h-auto object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
                <div
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary/10 rounded-full blur-lg animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </AnimatedText>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <AnimatedText delay={0.4}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                    Bine ați venit la ANN Medical Clinic!
                  </span>
                </div>
              </AnimatedText>

              <AnimatedText delay={0.6}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text leading-tight">
                  Îngrijire medicală la
                  <span className="block text-primary">standarde înalte.</span>
                </h2>
              </AnimatedText>
            </div>

            {/* Description */}
            <AnimatedText delay={0.8}>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                Îți oferim îngrijire medicală de calitate, cu tratamente
                personalizate și un focus constant pe prevenție. Echipa noastră
                de profesioniști utilizează cele mai noi tehnologii și soluții
                inovative pentru a asigura cele mai bune rezultate pentru
                sănătatea ta pe termen lung.
              </p>
            </AnimatedText>

            {/* Features List */}
            <AnimatedText delay={1.0}>
              <div className="space-y-4">
                {[
                  {
                    icon: "⚡",
                    title: "Aparatura de top",
                    description:
                      "Echipamente medicale de ultimă generație pentru diagnosticuri precise",
                  },
                  {
                    icon: "👨‍⚕️",
                    title: "Medici Profesioniști",
                    description:
                      "Echipă de medici experimentați și dedicați sănătății tale",
                  },
                  {
                    icon: "🔬",
                    title: "Parteneriat Synevo",
                    description:
                      "Colaborare cu liderul în analize medicale din România",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-300 hover:shadow-lg border border-border/10"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{feature.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedText>

            {/* CTA Button */}
            <AnimatedText delay={1.2}>
              <div className="pt-6">
                <AnimatedButton
                  href="/servicii"
                  variant="primary"
                  size="lg"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary-dark px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span>🏥</span>
                  <span>Servicii</span>
                  <svg
                    className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </AnimatedButton>
              </div>
            </AnimatedText>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/5 to-primary/5 rounded-full blur-2xl -z-10" />
    </section>
  );
}
