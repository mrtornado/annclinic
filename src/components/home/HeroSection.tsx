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
    <section className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden pb-24">
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
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#03606C] mb-8">
                021 9063
              </div>
            </AnimatedText>

            {/* Main Heading */}
            <AnimatedText delay={0.4}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#03606C] mb-6 leading-tight">
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
                  href="/servicii/tratamente-clinica"
                  variant="outline"
                  size="lg"
                  className="bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold border-2 border-white/50 hover:border-white/70 transition-all duration-300 hover:scale-105"
                >
                  Tratamente Clinica
                </AnimatedButton>
              </div>
            </AnimatedText>

            {/* Special Lab Button */}
            <AnimatedText delay={1.0}>
              <div className="mb-8">
                <AnimatedButton
                  href="/servicii/analize-laborator"
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent text-white px-8 py-4 rounded-xl font-semibold shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-accent/50"
                >
                  <span className="flex items-center gap-2">
                    <span>Analize Laborator CAS</span>
                  </span>
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
              <div className="flex flex-col items-center lg:items-end space-y-2">
                <img
                  src={synevoLogo}
                  alt="Synevo - Partner"
                  className="h-12 sm:h-14 lg:h-16 w-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
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

      {/* Wave Divider - More Prominent */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full"
          style={{ height: "120px" }}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-surface"
          ></path>
        </svg>
      </div>
    </section>
  );
}
