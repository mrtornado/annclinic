import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";

export default function DoctorsHero() {
  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-br from-surface via-surface-secondary to-surface overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedText delay={0.2}>
          <div className="inline-flex items-center gap-2 bg-surface-elevated/80 backdrop-blur-md text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg border border-primary/20">
            <span className="text-lg">👨‍⚕️</span>
            <span>Echipa Medicală</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={0.4}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text mb-6">
            <span className="block">Medicii Noștri</span>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hero-gradient-flow">
              Specialiști de Încredere
            </span>
          </h1>
        </AnimatedText>

        <AnimatedText delay={0.6}>
          <p className="text-lg sm:text-xl text-secondary leading-relaxed max-w-3xl mx-auto mb-12">
            Echipa noastră de medici specialiști cu experiență vastă în diverse
            domenii medicale este dedicată oferiri de îngrijire medicală de cea
            mai înaltă calitate. Fiecare medic aduce expertiza și pasiunea
            pentru medicina modernă.
          </p>
        </AnimatedText>

        <AnimatedText delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton
              href="/programare"
              variant="primary"
              size="lg"
              className="hero-btn-primary"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <span>Programează Consultație</span>
              </span>
            </AnimatedButton>

            <AnimatedButton href="#medici" variant="outline" size="lg">
              <span className="flex items-center gap-2">
                <span className="text-lg">👨‍⚕️</span>
                <span>Vezi Medicii</span>
              </span>
            </AnimatedButton>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
