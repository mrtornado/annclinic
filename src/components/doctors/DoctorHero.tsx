import { motion } from "framer-motion";
import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import type { DoctorContent } from "../../types/content";

interface DoctorHeroProps {
  doctor: DoctorContent;
}

export default function DoctorHero({ doctor }: DoctorHeroProps) {
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Doctor Information */}
          <div className="space-y-8">
            <AnimatedText delay={0.2}>
              <div className="inline-flex items-center gap-2 bg-surface-elevated/80 backdrop-blur-md text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg border border-primary/20">
                <span className="text-lg">👨‍⚕️</span>
                <span>Profil Medic</span>
              </div>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text mb-6">
                <span className="block">{doctor.data.name}</span>
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hero-gradient-flow text-2xl sm:text-3xl lg:text-4xl">
                  {doctor.data.specialties.join(" • ")}
                </span>
              </h1>
            </AnimatedText>

            <AnimatedText delay={0.6}>
              <p className="text-lg sm:text-xl text-secondary leading-relaxed max-w-2xl">
                {doctor.data.bio.substring(0, 200)}...
              </p>
            </AnimatedText>

            {/* Key Stats */}
            <AnimatedText delay={0.8}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {doctor.data.experience}+
                  </div>
                  <div className="text-sm text-secondary">
                    Ani Experiență
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    {doctor.data.specialties.length}
                  </div>
                  <div className="text-sm text-secondary">
                    Specializări
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {doctor.data.languages.length}
                  </div>
                  <div className="text-sm text-secondary">
                    Limbi Vorbite
                  </div>
                </div>
              </div>
            </AnimatedText>

            {/* CTA Buttons */}
            <AnimatedText delay={1.0}>
              <div className="flex flex-col sm:flex-row gap-4">
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

                <AnimatedButton href="#servicii" variant="outline" size="lg">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">🏥</span>
                    <span>Vezi Serviciile</span>
                  </span>
                </AnimatedButton>
              </div>
            </AnimatedText>
          </div>

          {/* Doctor Photo */}
          <AnimatedText delay={0.6}>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl opacity-60" />

              {/* Photo container */}
              <div className="relative bg-gradient-to-br from-surface-elevated to-surface-secondary rounded-3xl p-8 shadow-2xl border border-border/20">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                  <img
                    src={doctor.data.photo}
                    alt={`Fotografia ${doctor.data.name}`}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ⭐ Medic Recomandat
                </div>

                <div className="absolute -bottom-4 -left-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  🏆 {doctor.data.experience}+ ani experiență
                </div>
              </div>
            </motion.div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
