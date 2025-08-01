import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText from "../magic-ui/AnimatedText";
import FloatingParticles from "../magic-ui/FloatingParticles";

interface HeroSectionProps {
  backgroundImage: string;
  annLogo: string;
  synevoLogo: string;
}

export default function HeroSection({
  backgroundImage,
  annLogo,
  synevoLogo,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen pt-16 sm:pt-20 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Gradient Overlay - matching the green/teal from image */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-hover/85 to-primary-dark/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent" />

      {/* Floating Particles */}
      <FloatingParticles count={30} />

      {/* Modern Geometric Elements */}
      <div className="absolute inset-0">
        {/* Subtle shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute bottom-32 right-20 w-24 h-24 bg-white/8 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/6 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        {/* Top Section with Phone and Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
          {/* Left Content */}
          <div className="flex-1 text-left lg:pr-12">
            {/* Phone Number */}
            <AnimatedText delay={0.2}>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
                021 9063
              </div>
            </AnimatedText>

            {/* Main Heading */}
            <AnimatedText delay={0.4}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Îngrijire Medicală de Top,
                <br />
                Într-un Centru Medical
                <br />
                Modern și Prietenos.
              </h1>
            </AnimatedText>

            {/* Description */}
            <AnimatedText delay={0.6}>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                Bun venit la <strong>ANN Clinic</strong> – locul unde grija și
                profesionalismul se întâlnesc! Clinica noastră modernă îți oferă
                acces la tehnologie de ultimă generație și o echipă de medici
                dedicați, mereu alături de tine. Alege sănătatea ta cu
                încredere, într-un mediu prietenos și profesionist!
              </p>
            </AnimatedText>

            {/* CTA Buttons */}
            <AnimatedText delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <AnimatedButton
                  href="/programare"
                  variant="secondary"
                  size="lg"
                  className="bg-white hover:bg-white/90 text-primary px-8 py-4 rounded-xl font-semibold shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Programează-te acum!
                </AnimatedButton>
                <AnimatedButton
                  href="/servicii"
                  variant="outline"
                  size="lg"
                  className="bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold border-2 border-white/50 hover:border-white/70 transition-all duration-300 hover:scale-105"
                >
                  Vezi Serviciile
                </AnimatedButton>
              </div>
            </AnimatedText>
          </div>

          {/* Right Side - Logo Area */}
          <div className="flex-shrink-0 text-center lg:text-right space-y-8">
            {/* ANN Medical Clinic Logo */}
            <AnimatedText delay={1.0}>
              <div className="flex justify-center lg:justify-end">
                <img
                  src={annLogo}
                  alt="ANN Medical Clinic"
                  className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter drop-shadow-lg hover:scale-105 transition-transform duration-300"
                  loading="eager"
                />
              </div>
            </AnimatedText>

            {/* Synevo Partner Logo */}
            <AnimatedText delay={1.2}>
              <div className="flex flex-col items-center lg:items-end">
                <img
                  src={synevoLogo}
                  alt="Synevo - Partner"
                  className="h-12 sm:h-14 lg:h-16 w-auto object-contain filter brightness-0 invert drop-shadow-lg hover:scale-105 transition-transform duration-300"
                  loading="eager"
                />
              </div>
            </AnimatedText>
          </div>
        </div>

        {/* Bottom Features Section */}
        <AnimatedText delay={1.4}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Medici Experți */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Medici Experți
                </h3>
                <p className="text-white/80 text-sm">
                  Profesioniști dedicați sănătății tale.
                </p>
              </div>
            </div>

            {/* Fără Așteptare */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⏰</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Fără Așteptare
                </h3>
                <p className="text-white/80 text-sm">
                  Servicii rapide și eficiente.
                </p>
              </div>
            </div>

            {/* Programare Online */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📅</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Programare Online
                </h3>
                <p className="text-white/80 text-sm">
                  Simplu și rapid, direct de acasă.
                </p>
              </div>
            </div>
          </div>
        </AnimatedText>
      </div>

      {/* Modern Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center hover:border-white/80 transition-colors duration-300 bg-white/10 backdrop-blur-sm">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse" />
          </div>
          <p className="text-white/80 text-sm mt-3 font-semibold">Scroll</p>
        </div>
      </div>
    </section>
  );
}
