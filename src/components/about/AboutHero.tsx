import { motion } from "framer-motion";
import AnimatedText, { GradientText } from "../magic-ui/AnimatedText";
import FloatingParticles from "../magic-ui/FloatingParticles";
import AnimatedButton from "../magic-ui/AnimatedButton";

export default function AboutHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/5 via-surface to-secondary/5 overflow-hidden">
      {/* Background particles */}
      <FloatingParticles
        count={25}
        colors={["#0d9488", "#14b8a6", "#d97706", "#e11d48"]}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <AnimatedText delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <GradientText>Despre ANN Medical Clinic</GradientText>
              </h1>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <p className="text-xl sm:text-2xl text-secondary mb-8">
                O clinică medicală modernă, construită pe încredere,
                profesionalism și grija pentru sănătatea ta.
              </p>
            </AnimatedText>

            <AnimatedText delay={0.6}>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <motion.div
                  className="text-center p-4 bg-surface/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="text-3xl font-bold text-primary mb-1">
                    14+
                  </div>
                  <div className="text-sm text-secondary">Specialități</div>
                </motion.div>

                <motion.div
                  className="text-center p-4 bg-surface/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="text-3xl font-bold text-primary mb-1">
                    20+
                  </div>
                  <div className="text-sm text-secondary">Medici</div>
                </motion.div>

                <motion.div
                  className="text-center p-4 bg-surface/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="text-3xl font-bold text-primary mb-1">
                    5000+
                  </div>
                  <div className="text-sm text-secondary">Pacienți</div>
                </motion.div>

                <motion.div
                  className="text-center p-4 bg-surface/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="text-3xl font-bold text-primary mb-1">4</div>
                  <div className="text-sm text-secondary">Ani experiență</div>
                </motion.div>
              </div>
            </AnimatedText>

            <AnimatedText delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton href="/servicii" variant="primary" size="lg">
                  <span className="flex items-center gap-2">
                    <span>🏥</span>
                    <span>Serviciile Noastre</span>
                  </span>
                </AnimatedButton>

                <AnimatedButton href="/medici" variant="outline" size="lg">
                  <span className="flex items-center gap-2">
                    <span>👨‍⚕️</span>
                    <span>Echipa Medicală</span>
                  </span>
                </AnimatedButton>
              </div>
            </AnimatedText>
          </div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 backdrop-blur-sm border border-border/30">
              <div className="text-center">
                <div className="text-8xl mb-6">🏥</div>
                <h3 className="text-2xl font-bold text mb-4">
                  ANN Medical Clinic
                </h3>
                <p className="text-secondary">Sănătate & Încredere din 2020</p>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full opacity-30"></div>
              <div className="absolute top-1/2 -left-2 w-4 h-4 bg-accent rounded-full opacity-25"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
