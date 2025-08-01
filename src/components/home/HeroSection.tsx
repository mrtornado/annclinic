import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText from "../magic-ui/AnimatedText";
import FloatingParticles from "../magic-ui/FloatingParticles";

interface HeroSectionProps {
  backgroundImage: string;
}

export default function HeroSection({ backgroundImage }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Modern Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary-hover/70 to-primary-dark/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Floating Particles */}
      <FloatingParticles count={30} />

      {/* Modern Geometric Elements */}
      <div className="absolute inset-0">
        {/* Subtle geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute bottom-32 right-20 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/8 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Modern grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex flex-col justify-center">
        {/* Modern Badge */}
        <AnimatedText delay={0.2}>
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl text-white px-6 py-3 rounded-2xl text-sm font-semibold mb-8 shadow-2xl border border-white/30 hover:bg-white/25 transition-all duration-500 hover:scale-105">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span>Clinică Medicală de Încredere</span>
            <div
              className="w-2 h-2 bg-accent rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </AnimatedText>

        {/* Modern Main Heading */}
        <AnimatedText delay={0.4}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
            <span className="block mb-4 drop-shadow-2xl">Sănătatea Ta,</span>
            <span className="block bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent animate-pulse">
              Prioritatea Noastră
            </span>
          </h1>
        </AnimatedText>

        {/* Modern Subtitle */}
        <AnimatedText delay={0.6}>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-lg">
            Descoperă servicii medicale de excelență în peste{" "}
            <span className="font-bold text-secondary bg-secondary/30 px-3 py-1 rounded-xl backdrop-blur-sm border border-secondary/20">
              14 specialități
            </span>
            , cu echipamente de ultimă generație și o echipă de medici dedicați
            sănătății tale.
          </p>
        </AnimatedText>

        {/* Modern CTA Buttons */}
        <AnimatedText delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <AnimatedButton
              href="/programare"
              variant="secondary"
              size="lg"
              className="bg-secondary hover:bg-secondary-hover text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-secondary/25 transition-all duration-300 hover:scale-105 border-2 border-secondary/20"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl">📅</span>
                <span className="text-lg">Programează Consultație</span>
              </span>
            </AnimatedButton>
            <AnimatedButton
              href="/servicii"
              variant="outline"
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold backdrop-blur-xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl">🏥</span>
                <span className="text-lg">Explorează Serviciile</span>
              </span>
            </AnimatedButton>
          </div>
        </AnimatedText>

        {/* Modern Trust Indicators */}
        <AnimatedText delay={1.0}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "14+", label: "Specialități Medicale", icon: "🏥" },
              { number: "1000+", label: "Pacienți Mulțumiți", icon: "😊" },
              { number: "15+", label: "Ani de Experiență", icon: "⭐" },
              { number: "24/7", label: "Suport Medical", icon: "📞" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <div className="mb-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300 inline-block">
                    {stat.icon}
                  </span>
                </div>
                <div className="text-3xl lg:text-4xl font-black text-white mb-2 group-hover:text-secondary transition-colors duration-300 drop-shadow-lg">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base text-white/90 font-semibold leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
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
