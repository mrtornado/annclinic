import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import type { ServiceContent } from "../../types/content";

interface DoctorProfilesProps {
  service?: ServiceContent | any; // Allow both ServiceContent and direct objects from landing pages
  highlightCertifications?: boolean;
}

export default function DoctorProfiles({
  service,
  highlightCertifications = false,
}: DoctorProfilesProps) {
  // Handle both ServiceContent and direct objects from landing pages
  const getServiceName = () => {
    if (service?.data?.name) return service.data.name; // ServiceContent format
    if (service?.name) return service.name; // Direct object format
    return "Servicii Medicale";
  };

  const getServiceDoctors = () => {
    if (service?.data?.doctors) return service.data.doctors; // ServiceContent format
    if (service?.doctors) return service.doctors; // Direct object format
    return [];
  };

  // Use doctors from service data if available, otherwise use mock data
  const serviceDoctors = getServiceDoctors();

  // Mock doctor data as fallback
  const mockDoctors = [
    {
      name: "Dr. Maria Popescu",
      specialization: "Specialist Principal",
      experience: 15,
      qualifications: [
        "Medic Specialist",
        "Doctorat în Medicină",
        "Membru al Colegiului Medicilor",
      ],
      languages: ["Română", "Engleză"],
      availability: "Luni, Miercuri, Vineri",
    },
    {
      name: "Dr. Alexandru Ionescu",
      specialization: "Medic Specialist",
      experience: 10,
      qualifications: [
        "Medic Specialist",
        "Certificări Internaționale",
        "Formări Continue",
      ],
      languages: ["Română", "Engleză"],
      availability: "Marți, Joi, Sâmbătă",
    },
  ];

  const doctors = serviceDoctors.length > 0 ? serviceDoctors : mockDoctors;

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-br from-surface-secondary via-surface to-surface-tertiary overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/8 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/8 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedText delay={0.2}>
            <div className="inline-flex items-center gap-2 bg-surface-elevated/80 backdrop-blur-md text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg border border-primary/20">
              <span className="text-lg">👨‍⚕️</span>
              <span>Echipa Medicală</span>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.4}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text mb-6">
              <span className="block">Specialiștii noștri în</span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hero-gradient-flow">
                {getServiceName()}
              </span>
            </h2>
          </AnimatedText>

          <AnimatedText delay={0.6}>
            <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
              Medici cu experiență vastă și dedicare pentru oferirea celor mai
              bune servicii medicale
            </p>
          </AnimatedText>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {doctors.map((doctor: any, index: number) => (
            <AnimatedText key={doctor.name} delay={0.8 + index * 0.2}>
              <article className="group relative bg-surface-elevated/90 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-border/20 hover:border-primary/30 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Doctor Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-4xl sm:text-5xl">❤️</span>
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-red-500/30 to-red-600/30 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text mb-2 group-hover:text-primary transition-colors duration-300">
                        {doctor.name}
                      </h3>
                      <p className="text-primary font-semibold mb-2">
                        {doctor.specialization}
                      </p>
                      <p className="text-secondary text-sm mb-4">
                        {doctor.experience}+ ani experiență
                      </p>

                      {/* Qualifications */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text mb-3">
                          Calificări:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.qualifications.map(
                            (qualification: string, idx: number) => (
                              <span
                                key={idx}
                                className="bg-gradient-to-r from-red-500/15 to-red-600/15 text-red-600 px-3 py-1 rounded-full text-xs font-medium border border-red-500/20"
                              >
                                {qualification}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* Languages */}
                      {doctor.languages && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text mb-2">
                            Limbi vorbite:
                          </h4>
                          <p className="text-secondary text-sm">
                            {doctor.languages.join(", ")}
                          </p>
                        </div>
                      )}

                      {/* Availability and CTA */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <p className="text-sm text-muted mb-1">
                            Disponibilitate:
                          </p>
                          <p className="text-sm font-medium text">
                            {doctor.availability}
                          </p>
                        </div>
                        <AnimatedButton
                          href={`/programare?doctor=${encodeURIComponent(
                            doctor.name
                          )}`}
                          variant="outline"
                          size="sm"
                          className="group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300 hover:scale-105"
                        >
                          <span className="flex items-center gap-2">
                            <span>Programează</span>
                            <span className="text-lg">📅</span>
                          </span>
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </AnimatedText>
          ))}
        </div>

        {/* Team Stats */}
        <AnimatedText delay={1.4}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {[
              { number: "15+", label: "Ani Experiență Medie", icon: "⭐" },
              { number: "1000+", label: "Pacienți Tratați", icon: "😊" },
              { number: "98%", label: "Rata de Satisfacție", icon: "💯" },
              { number: "24/7", label: "Suport Medical", icon: "📞" },
            ].map((stat: any, index: number) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-surface-elevated/80 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text mb-2 group-hover:text-primary transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-secondary font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedText>

        {/* CTA Section */}
        <AnimatedText delay={1.6}>
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 border border-primary/20">
              <h3 className="text-2xl lg:text-3xl font-bold text mb-6">
                Alege specialistul potrivit pentru tine
              </h3>
              <p className="text-secondary text-lg mb-8 max-w-2xl mx-auto">
                Programează o consultație cu unul dintre specialiștii noștri și
                beneficiază de îngrijire medicală de calitate superioară.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  href="/programare"
                  variant="primary"
                  size="lg"
                  className="hero-btn-primary shadow-2xl"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">👨‍⚕️</span>
                    <span>Alege Specialistul</span>
                  </span>
                </AnimatedButton>
                <AnimatedButton
                  href="/medici"
                  variant="outline"
                  size="lg"
                  className="hero-btn-outline"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">📋</span>
                    <span>Vezi Toți Medicii</span>
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
