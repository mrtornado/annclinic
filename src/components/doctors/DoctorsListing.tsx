import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import AnimatedText from "../magic-ui/AnimatedText";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedButton from "../magic-ui/AnimatedButton";
import type { DoctorContent } from "../../types/content";

interface DoctorsListingProps {
  doctors: DoctorContent[];
}

export default function DoctorsListing({ doctors }: DoctorsListingProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("toate");
  const [selectedAvailability, setSelectedAvailability] = useState("toate");

  // Get unique specialties
  const specialties = useMemo(() => {
    const allSpecialties = doctors.flatMap((doctor) => doctor.data.specialties);
    return [...new Set(allSpecialties)].sort();
  }, [doctors]);

  // Filter doctors based on search and filters
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.data.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesSpecialty =
        selectedSpecialty === "toate" ||
        doctor.data.specialties.includes(selectedSpecialty);

      const matchesAvailability =
        selectedAvailability === "toate" ||
        (selectedAvailability === "disponibil" &&
          doctor.data.availableDays &&
          doctor.data.availableDays.length > 0);

      return matchesSearch && matchesSpecialty && matchesAvailability;
    });
  }, [doctors, searchTerm, selectedSpecialty, selectedAvailability]);

  return (
    <section id="medici" className="py-20 sm:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <AnimatedText delay={0.2}>
          <div className="mb-12 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text mb-4">
                Găsește Medicul Potrivit
              </h2>
              <p className="text-lg text-secondary max-w-2xl mx-auto">
                Folosește filtrele de mai jos pentru a găsi medicul specialist
                care îți poate oferi cea mai bună îngrijire.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-xl">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Caută după nume medic sau specializare..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-surface-elevated focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  className="px-6 py-3 rounded-xl border border-border bg-surface-elevated focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="toate">Toate Specializările</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>

                <select
                  className="px-6 py-3 rounded-xl border border-border bg-surface-elevated focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                >
                  <option value="toate">Toate Disponibilitățile</option>
                  <option value="disponibil">Disponibili</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="text-center text-secondary">
              {filteredDoctors.length}{" "}
              {filteredDoctors.length === 1 ? "medic găsit" : "medici găsiți"}
            </div>
          </div>
        </AnimatedText>

        {/* Doctors Grid */}
        <AnimatedText delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MagicCard className="h-full">
                  <div className="p-6 space-y-6">
                    {/* Doctor Photo */}
                    <div className="relative">
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                        <img
                          src={doctor.data.photo}
                          alt={`Fotografia ${doctor.data.name}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Featured badge */}
                      {doctor.data.featured && (
                        <div className="absolute -top-2 -right-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          ⭐ Recomandat
                        </div>
                      )}
                    </div>

                    {/* Doctor Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text mb-2">
                          {doctor.data.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {doctor.data.specialties.map((specialty, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                        <p className="text-secondary text-sm leading-relaxed">
                          {doctor.data.bio.substring(0, 120)}...
                        </p>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border/30">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">
                            {doctor.data.experience}+
                          </div>
                          <div className="text-xs text-secondary">
                            Ani Experiență
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-secondary">
                            {doctor.data.languages.length}
                          </div>
                          <div className="text-xs text-secondary">
                            Limbi Vorbite
                          </div>
                        </div>
                      </div>

                      {/* Languages */}
                      <div>
                        <div className="text-sm font-medium text-secondary mb-2">
                          Limbi vorbite:
                        </div>
                        <div className="text-sm text">
                          {doctor.data.languages.join(", ")}
                        </div>
                      </div>

                      {/* Availability */}
                      {doctor.data.availableDays && (
                        <div>
                          <div className="text-sm font-medium text-secondary mb-2">
                            Disponibilitate:
                          </div>
                          <div className="text-sm text">
                            {doctor.data.availableDays.join(", ")}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4">
                      <AnimatedButton
                        href={`/medici/${doctor.slug}`}
                        variant="primary"
                        size="md"
                        className="w-full"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span className="text-lg">👨‍⚕️</span>
                          <span>Vezi Profilul</span>
                        </span>
                      </AnimatedButton>

                      <AnimatedButton
                        href="/programare"
                        variant="outline"
                        size="md"
                        className="w-full"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span className="text-lg">📅</span>
                          <span>Programează</span>
                        </span>
                      </AnimatedButton>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </AnimatedText>

        {/* No results message */}
        {filteredDoctors.length === 0 && (
          <AnimatedText delay={0.6}>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text mb-4">
                Nu am găsit medici
              </h3>
              <p className="text-secondary mb-8 max-w-md mx-auto">
                Nu am găsit medici care să corespundă criteriilor tale de
                căutare. Încearcă să modifici filtrele sau să cauți după alți
                termeni.
              </p>
              <AnimatedButton
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialty("toate");
                  setSelectedAvailability("toate");
                }}
                variant="primary"
                size="lg"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">🔄</span>
                  <span>Resetează Filtrele</span>
                </span>
              </AnimatedButton>
            </div>
          </AnimatedText>
        )}

        {/* Call to Action */}
        <AnimatedText delay={0.8}>
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 border border-primary/20">
              <h3 className="text-2xl sm:text-3xl font-bold text mb-4">
                Nu găsești medicul potrivit?
              </h3>
              <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
                Contactează-ne și te vom ajuta să găsești specialistul care îți
                poate oferi cea mai bună îngrijire medicală pentru nevoile tale
                specifice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  href="/contact"
                  variant="primary"
                  size="lg"
                  className="hero-btn-primary"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">📞</span>
                    <span>Contactează-ne</span>
                  </span>
                </AnimatedButton>

                <AnimatedButton href="/programare" variant="outline" size="lg">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    <span>Programare Generală</span>
                  </span>
                </AnimatedButton>
              </div>
            </div>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
