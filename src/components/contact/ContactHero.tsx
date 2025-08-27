import { motion } from "framer-motion";
import AnimatedText, { GradientText } from "../magic-ui/AnimatedText";
import FloatingParticles from "../magic-ui/FloatingParticles";

export default function ContactHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center py-24 bg-gradient-to-br from-primary/10 via-surface to-secondary/10 overflow-hidden">
      {/* Background particles */}
      <FloatingParticles
        count={30}
        colors={["#0d9488", "#14b8a6", "#d97706", "#0891b2"]}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-60 h-60 bg-secondary/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <AnimatedText delay={0.2}>
          <div className="inline-flex items-center gap-2 bg-surface-elevated/80 backdrop-blur-md text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg border border-primary/20">
            <span className="text-primary">📞</span>
            <span>Contactează-ne cu încredere</span>
          </div>
        </AnimatedText>

        <AnimatedText delay={0.4}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block mb-2">Sănătatea Ta</span>
            <GradientText>Este Prioritatea Noastră</GradientText>
          </h1>
        </AnimatedText>

        <AnimatedText delay={0.6}>
          <p className="text-xl sm:text-2xl text-secondary max-w-3xl mx-auto mb-10">
            Echipa noastră medicală este pregătită să îți ofere servicii de
            înaltă calitate și să răspundă tuturor întrebărilor tale.
          </p>
        </AnimatedText>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-[120px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,90.7C672,75,768,85,864,122.7C960,160,1056,224,1152,224C1248,224,1344,160,1392,128L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
