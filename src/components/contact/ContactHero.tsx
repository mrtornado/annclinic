import { motion } from "framer-motion";
import AnimatedText, { GradientText } from "../magic-ui/AnimatedText";
import FloatingParticles from "../magic-ui/FloatingParticles";

export default function ContactHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/5 via-surface to-secondary/5 overflow-hidden">
      {/* Background particles */}
      <FloatingParticles
        count={20}
        colors={["#0d9488", "#14b8a6", "#d97706"]}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedText delay={0.2}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <GradientText>Contactează-ne</GradientText>
          </h1>
        </AnimatedText>

        <AnimatedText delay={0.4}>
          <p className="text-xl sm:text-2xl text-secondary max-w-3xl mx-auto mb-8">
            Suntem aici pentru tine. Contactează-ne pentru programări,
            informații sau orice întrebări despre serviciile noastre medicale.
          </p>
        </AnimatedText>

        <AnimatedText delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-lg">
            <motion.div
              className="flex items-center gap-3 bg-surface/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-border/30"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="text-2xl">📞</span>
              <span className="font-semibold text-primary">
                Răspundem rapid
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 bg-surface/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-border/30"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="text-2xl">🏥</span>
              <span className="font-semibold text-primary">
                Locație centrală
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 bg-surface/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-border/30"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="text-2xl">⏰</span>
              <span className="font-semibold text-primary">Program extins</span>
            </motion.div>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
