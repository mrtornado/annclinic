import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText from "../magic-ui/AnimatedText";
import FloatingParticles from "../magic-ui/FloatingParticles";

export default function HeroSection() {
  return (
    <section className="relative h-screen hero-mobile-optimized flex items-center justify-center overflow-hidden hero-bg-medical hero-scroll-smooth">
      {/* Floating Particles */}
      <FloatingParticles count={50} />

      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Dynamic Geometric Shapes */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-white/5 rounded-full blur-xl hero-pulse" />
        <div className="absolute top-32 sm:top-40 right-8 sm:right-20 w-16 sm:w-24 h-16 sm:h-24 bg-secondary/20 rounded-full blur-lg hero-float" />
        <div
          className="absolute bottom-20 sm:bottom-32 left-1/4 w-24 sm:w-40 h-24 sm:h-40 bg-white/3 rounded-full blur-2xl hero-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-12 sm:w-20 h-12 sm:h-20 bg-accent/10 rounded-full blur-lg hero-glow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-3/4 left-1/6 w-8 sm:w-16 h-8 sm:h-16 bg-secondary/15 rounded-full blur-md hero-particle-dance"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/6 right-1/6 w-6 sm:w-12 h-6 sm:h-12 bg-white/8 rounded-full blur-lg hero-float"
          style={{ animationDelay: "4s" }}
        />

        {/* Medical Cross Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/3 w-6 sm:w-8 h-6 sm:h-8 bg-white transform rotate-45" />
          <div className="absolute top-3/4 right-1/4 w-4 sm:w-6 h-4 sm:h-6 bg-white transform rotate-45" />
          <div className="absolute top-1/2 left-1/6 w-3 sm:w-4 h-3 sm:h-4 bg-white transform rotate-45" />
          <div className="absolute top-1/6 right-1/3 w-5 sm:w-7 h-5 sm:h-7 bg-white transform rotate-45" />
        </div>

        {/* Enhanced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary-hover/90 to-primary-dark/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent hero-gradient-flow opacity-50" />

        {/* Animated Light Rays */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-white/40 via-white/15 to-transparent transform -translate-x-1/2 hero-pulse" />
        <div
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent transform -translate-y-1/2 hero-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/4 right-0 w-full h-px bg-gradient-to-l from-transparent via-secondary/20 to-transparent hero-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent hero-glow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex flex-col justify-center">
        {/* Badge */}
        <AnimatedText delay={0.2}>
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/15 backdrop-blur-md text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hero-glow">
            <div className="w-2 h-2 bg-secondary rounded-full hero-pulse" />
            <span className="whitespace-nowrap">
              Clinică Medicală de Încredere
            </span>
            <div
              className="w-2 h-2 bg-accent rounded-full hero-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </AnimatedText>

        {/* Main Heading */}
        <AnimatedText delay={0.4}>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            <span
              className="block mb-2 sm:mb-4"
              style={{
                textShadow:
                  "0 8px 16px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.3)",
              }}
            >
              Sănătatea Ta,
            </span>
            <span
              className="block bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent hero-gradient-flow hover:scale-105 transition-transform duration-500"
              style={{
                textShadow: "0 8px 16px rgba(0,0,0,0.4)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Prioritatea Noastră
            </span>
          </h1>
        </AnimatedText>

        {/* Subtitle */}
        <AnimatedText delay={0.6}>
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4 sm:px-0"
            style={{ textShadow: "0 4px 8px rgba(0,0,0,0.3)" }}
          >
            Descoperă servicii medicale de excelență în peste{" "}
            <span className="font-semibold text-secondary bg-secondary/20 px-2 py-1 rounded-lg backdrop-blur-sm">
              14 specialități
            </span>
            , cu echipamente de ultimă generație și o echipă de medici dedicați
            sănătății tale.
          </p>
        </AnimatedText>

        {/* CTA Buttons */}
        <AnimatedText delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center mb-12 sm:mb-16 px-4 sm:px-0">
            <AnimatedButton
              href="/programare"
              variant="secondary"
              size="lg"
              className="hero-btn-primary w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">📅</span>
                <span className="text-sm sm:text-base font-medium">
                  Programează Consultație
                </span>
              </span>
            </AnimatedButton>
            <AnimatedButton
              href="/servicii"
              variant="outline"
              size="lg"
              className="hero-btn-outline w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">🏥</span>
                <span className="text-sm sm:text-base font-medium">
                  Explorează Serviciile
                </span>
              </span>
            </AnimatedButton>
          </div>
        </AnimatedText>

        {/* Trust Indicators */}
        <AnimatedText delay={1.0}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-0">
            {[
              { number: "14+", label: "Specialități Medicale", icon: "🏥" },
              { number: "1000+", label: "Pacienți Mulțumiți", icon: "😊" },
              { number: "15+", label: "Ani de Experiență", icon: "⭐" },
              { number: "24/7", label: "Suport Medical", icon: "📞" },
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="mb-2 sm:mb-3">
                  <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">
                    {stat.icon}
                  </span>
                </div>
                <div
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:text-secondary transition-colors duration-300"
                  style={{ textShadow: "0 4px 8px rgba(0,0,0,0.3)" }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-xs sm:text-sm lg:text-base text-white/90 font-medium leading-tight"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedText>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-white/50 rounded-full flex justify-center hover:border-white/70 transition-colors duration-300">
          <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
        <p className="text-white/70 text-xs mt-2 font-medium text-center">
          Scroll
        </p>
      </div>

      {/* Mobile Scroll Hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:hidden">
        <div className="flex flex-col items-center animate-bounce">
          <div className="w-8 h-1 bg-white/50 rounded-full mb-2" />
          <p className="text-white/70 text-xs font-medium">Swipe up</p>
        </div>
      </div>
    </section>
  );
}
