import AnimatedText from "../magic-ui/AnimatedText";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedButton from "../magic-ui/AnimatedButton";
import type { DoctorContent } from "../../types/content";

interface DoctorDetailsProps {
  doctor: DoctorContent;
}

export default function DoctorDetails({ doctor }: DoctorDetailsProps) {
  return (
    <section className="py-20 sm:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <AnimatedText delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text">
                  Despre {doctor.data.name}
                </h2>
                <div className="prose prose-lg max-w-none text-secondary">
                  <p className="leading-relaxed">{doctor.data.bio}</p>
                </div>
              </div>
            </AnimatedText>

            {/* Qualifications */}
            <AnimatedText delay={0.4}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text flex items-center gap-3">
                  <span className="text-2xl">🎓</span>
                  Calificări și Certificări
                </h3>
                <div className="grid gap-4">
                  {doctor.data.qualifications.map((qualification, index) => (
                    <MagicCard key={index} className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                          <span className="text-xl">📜</span>
                        </div>
                        <div>
                          <p className="font-semibold text">
                            {qualification}
                          </p>
                        </div>
                      </div>
                    </MagicCard>
                  ))}
                </div>
              </div>
            </AnimatedText>

            {/* Consultation Types */}
            {doctor.data.consultationTypes && (
              <AnimatedText delay={0.6}>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text flex items-center gap-3">
                    <span className="text-2xl">🏥</span>
                    Tipuri de Consultații
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctor.data.consultationTypes.map(
                      (consultation, index) => (
                        <MagicCard key={index} className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                              <span className="text-lg">✓</span>
                            </div>
                            <div>
                              <p className="font-medium text">
                                {consultation}
                              </p>
                            </div>
                          </div>
                        </MagicCard>
                      )
                    )}
                  </div>
                </div>
              </AnimatedText>
            )}

            {/* Patient Reviews Section */}
            <AnimatedText delay={0.8}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  Recenzii Pacienți
                </h3>
                <div className="grid gap-6">
                  {/* Sample reviews - in a real app these would come from a database */}
                  <MagicCard className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {"★".repeat(5)}
                        </div>
                        <span className="text-sm text-secondary">5/5</span>
                      </div>
                      <p className="text-secondary italic">
                        "Dr. {doctor.data.name.split(" ")[1]} este un medic
                        excepțional. Profesionalism, empatie și competență la
                        cel mai înalt nivel. Recomand cu încredere!"
                      </p>
                      <div className="text-sm text-muted">
                        - Pacient verificat
                      </div>
                    </div>
                  </MagicCard>

                  <MagicCard className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {"★".repeat(5)}
                        </div>
                        <span className="text-sm text-secondary">5/5</span>
                      </div>
                      <p className="text-secondary italic">
                        "Foarte mulțumită de consultația cu Dr.{" "}
                        {doctor.data.name.split(" ")[1]}. Explicații clare,
                        tratament eficient și o abordare foarte profesională."
                      </p>
                      <div className="text-sm text-muted">
                        - Pacient verificat
                      </div>
                    </div>
                  </MagicCard>
                </div>
              </div>
            </AnimatedText>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Info Card */}
            <AnimatedText delay={0.3}>
              <MagicCard className="p-6 sticky top-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text">
                    Informații Rapide
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-secondary mb-1">
                        Specializări
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {doctor.data.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-secondary mb-1">
                        Experiență
                      </div>
                      <div className="text font-semibold">
                        {doctor.data.experience} ani
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-secondary mb-1">
                        Limbi vorbite
                      </div>
                      <div className="text">
                        {doctor.data.languages.join(", ")}
                      </div>
                    </div>

                    {doctor.data.availableDays && (
                      <div>
                        <div className="text-sm font-medium text-secondary mb-1">
                          Zile disponibile
                        </div>
                        <div className="text">
                          {doctor.data.availableDays.join(", ")}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border/30">
                    <AnimatedButton
                      href="/programare"
                      variant="primary"
                      size="lg"
                      className="w-full hero-btn-primary"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-lg">📅</span>
                        <span>Programează Consultație</span>
                      </span>
                    </AnimatedButton>
                  </div>

                  <div className="space-y-2">
                    <AnimatedButton
                      href="tel:+40123456789"
                      variant="outline"
                      size="md"
                      className="w-full"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-lg">📞</span>
                        <span>Sună acum</span>
                      </span>
                    </AnimatedButton>

                    <AnimatedButton
                      href="/contact"
                      variant="outline"
                      size="md"
                      className="w-full"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-lg">✉️</span>
                        <span>Trimite mesaj</span>
                      </span>
                    </AnimatedButton>
                  </div>
                </div>
              </MagicCard>
            </AnimatedText>

            {/* Emergency Contact */}
            <AnimatedText delay={0.5}>
              <MagicCard className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚨</span>
                    <h3 className="text-lg font-bold text">
                      Urgențe Medicale
                    </h3>
                  </div>
                  <p className="text-sm text-secondary">
                    Pentru urgențe medicale, sunați imediat la numărul de
                    urgență:
                  </p>
                  <AnimatedButton
                    href="tel:+40123456789"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-lg">🚨</span>
                      <span>Urgențe: +40 123 456 789</span>
                    </span>
                  </AnimatedButton>
                </div>
              </MagicCard>
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
}
