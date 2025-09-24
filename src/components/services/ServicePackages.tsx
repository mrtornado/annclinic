import React from "react";
import AnimatedText from "../magic-ui/AnimatedText";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedButton from "../magic-ui/AnimatedButton";

interface Package {
  name: string;
  description: string;
  originalPrice: number;
  packagePrice: number;
  savings: number;
  services: string[];
  highlight?: boolean;
  popular?: boolean;
}

interface ServicePackagesProps {
  serviceSlug: string;
  serviceName: string;
  service?: any; // Service data from content
}

// Pachete speciale pentru fiecare serviciu
const servicePackages: { [key: string]: Package[] } = {
  cardiologie: [
    {
      name: "Pachet Cardiologic Complet",
      description: "Evaluare cardiologică completă cu investigații moderne",
      originalPrice: 530,
      packagePrice: 450,
      savings: 80,
      services: ["Consultație cardiologie", "EKG", "Ecocardiografie"],
      highlight: true,
      popular: true,
    },
    {
      name: "Screening Cardiac Basic",
      description: "Evaluare de bază pentru sănătatea inimii",
      originalPrice: 280,
      packagePrice: 250,
      savings: 30,
      services: ["Consultație cardiologie", "EKG"],
    },
    {
      name: "Monitorizare Cardiacă Avansată",
      description: "Pentru pacienți cu risc cardiovascular crescut",
      originalPrice: 850,
      packagePrice: 750,
      savings: 100,
      services: [
        "Consultație cardiologie",
        "EKG",
        "Ecocardiografie",
        "Monitorizare Holter",
      ],
    },
  ],
  dermatovenerologie: [
    {
      name: "Pachet Dermatologie Completă",
      description: "Evaluare completă a sănătății pielii",
      originalPrice: 330,
      packagePrice: 280,
      savings: 50,
      services: ["Consultație dermatovenerologie", "Dermatoscopie"],
      highlight: true,
      popular: true,
    },
    {
      name: "Tratament Acnee Premium",
      description: "Soluție completă pentru tratamentul acneei",
      originalPrice: 380,
      packagePrice: 320,
      savings: 60,
      services: ["Consultație dermatovenerologie", "Tratament acnee"],
    },
    {
      name: "Screening Melanom",
      description: "Depistarea precoce a cancerului de piele",
      originalPrice: 430,
      packagePrice: 380,
      savings: 50,
      services: [
        "Consultație dermatovenerologie",
        "Dermatoscopie",
        "Biopsie cutanată",
      ],
    },
  ],
  "obstetrica-ginecologie": [
    {
      name: "Pachet Ginecologic Complet",
      description: "Evaluare ginecologică completă cu investigații moderne",
      originalPrice: 380,
      packagePrice: 320,
      savings: 60,
      services: [
        "Consultație obstetrică-ginecologie",
        "Ecografie ginecologică",
      ],
      highlight: true,
      popular: true,
    },
    {
      name: "Screening Preventiv Feminin",
      description: "Prevenție și depistare precoce",
      originalPrice: 470,
      packagePrice: 400,
      savings: 70,
      services: [
        "Consultație obstetrică-ginecologie",
        "Citologie cervicală",
        "Testare HPV",
      ],
    },
    {
      name: "Investigații Ginecologice Avansate",
      description: "Pentru cazuri complexe și diagnostic precis",
      originalPrice: 630,
      packagePrice: 550,
      savings: 80,
      services: [
        "Consultație obstetrică-ginecologie",
        "Ecografie ginecologică",
        "Colposcopie",
      ],
    },
  ],
  pediatrie: [
    {
      name: "Pachet Pediatric Complet",
      description: "Evaluare completă a sănătății copilului",
      originalPrice: 310,
      packagePrice: 270,
      savings: 40,
      services: ["Consultație pediatrie", "Monitorizare dezvoltare"],
      highlight: true,
      popular: true,
    },
    {
      name: "Pachet Nou-Născut",
      description: "Îngrijire specializată pentru bebeluși",
      originalPrice: 340,
      packagePrice: 300,
      savings: 40,
      services: ["Consultație nou-născut", "Investigații pediatrice"],
    },
    {
      name: "Program Vaccinare Completă",
      description: "Protecție optimă prin vaccinare",
      originalPrice: 250,
      packagePrice: 220,
      savings: 30,
      services: ["Consultație pediatrie", "Vaccinări copii"],
    },
  ],
  "analize-laborator": [
    {
      name: "Pachet Analize Complete",
      description: "Evaluare de laborator completă pentru sănătate generală",
      originalPrice: 150,
      packagePrice: 120,
      savings: 30,
      services: ["Hemoleucogramă completă", "Biochimie sânge completă"],
      highlight: true,
      popular: true,
    },
    {
      name: "Screening Hormonal Feminin",
      description: "Evaluarea funcțiilor hormonale feminine",
      originalPrice: 200,
      packagePrice: 170,
      savings: 30,
      services: ["Analize hormonale", "Hemoleucogramă completă"],
    },
    {
      name: "Pachet Oncologic Screening",
      description: "Depistarea precoce prin markeri tumorali",
      originalPrice: 195,
      packagePrice: 165,
      savings: 30,
      services: ["Markeri tumorali", "Biochimie sânge completă"],
    },
  ],
};

// Pachete default pentru serviciile care nu au pachete specifice
const defaultPackages: Package[] = [
  {
    name: "Consultație + Investigații",
    description: "Evaluare medicală completă cu investigații de specialitate",
    originalPrice: 350,
    packagePrice: 300,
    savings: 50,
    services: ["Consultație de specialitate", "Investigații medicale"],
    highlight: true,
  },
  {
    name: "Screening Preventiv",
    description: "Evaluare preventivă pentru depistarea precoce",
    originalPrice: 280,
    packagePrice: 250,
    savings: 30,
    services: ["Consultație de specialitate", "Analize de screening"],
  },
];

export default function ServicePackages({
  serviceSlug,
  serviceName,
  service,
}: ServicePackagesProps) {
  // Folosim pachete din content dacă sunt disponibile, altfel folosim cele hardcodate
  const contentPackages = service?.data?.packages || service?.packages;
  const packages = contentPackages || servicePackages[serviceSlug];
  const hasPackages = packages && packages.length > 0;

  // Componenta pentru secțiunea "Ce oferim" - modernă cu conținut diferit
  const CeOferimSection = () => {
    const treatments = service?.data?.treatments || service?.treatments || [];
    const keywords = service?.data?.keywords || service?.keywords || [];

    return (
      <section className="relative py-20 bg-gradient-to-br from-surface via-surface-secondary to-surface overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-20 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-32 right-20 w-80 h-80 bg-secondary/3 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/2 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <AnimatedText delay={0.2}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-md text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg border border-primary/30">
                <span className="text-lg">⭐</span>
                <span>Servicii de Specialitate</span>
              </div>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text mb-6">
                <span className="block mb-2">Expertiză Medicală în</span>
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hero-gradient-flow">
                  {serviceName}
                </span>
              </h2>
            </AnimatedText>

            <AnimatedText delay={0.6}>
              <p className="text-lg sm:text-xl text-secondary max-w-4xl mx-auto leading-relaxed">
                Echipa noastră de specialiști oferă servicii medicale complete
                cu tehnologie de ultimă generație și abordare personalizată
                pentru fiecare pacient
              </p>
            </AnimatedText>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Side - Treatments/Services */}
            <AnimatedText delay={0.8}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white text-sm">
                    🔬
                  </span>
                  Servicii Principale
                </h3>

                {treatments.length > 0 ? (
                  <div className="space-y-4">
                    {treatments
                      .slice(0, 6)
                      .map((treatment: any, index: number) => (
                        <div
                          key={index}
                          className="group flex items-start gap-4 p-4 bg-surface-elevated/50 backdrop-blur-sm rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mt-3 group-hover:scale-125 transition-transform duration-300" />
                          <div className="flex-1">
                            <h4 className="font-semibold text text-sm mb-1">
                              {treatment.name}
                            </h4>
                            <p className="text-secondary text-sm leading-relaxed">
                              {treatment.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-surface-elevated/50 backdrop-blur-sm rounded-2xl border border-border/20">
                      <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mt-3" />
                      <div className="flex-1">
                        <h4 className="font-semibold text text-sm mb-1">
                          Consultații de Specialitate
                        </h4>
                        <p className="text-secondary text-sm">
                          Evaluări complete cu specialiști experimentați
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-surface-elevated/50 backdrop-blur-sm rounded-2xl border border-border/20">
                      <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mt-3" />
                      <div className="flex-1">
                        <h4 className="font-semibold text text-sm mb-1">
                          Investigații Moderne
                        </h4>
                        <p className="text-secondary text-sm">
                          Echipament de ultimă generație pentru diagnostic
                          precis
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-surface-elevated/50 backdrop-blur-sm rounded-2xl border border-border/20">
                      <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mt-3" />
                      <div className="flex-1">
                        <h4 className="font-semibold text text-sm mb-1">
                          Tratamente Personalizate
                        </h4>
                        <p className="text-secondary text-sm">
                          Planuri de tratament adaptate nevoilor individuale
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedText>

            {/* Right Side - Keywords & Benefits */}
            <AnimatedText delay={1.0}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center text-white text-sm">
                    🎯
                  </span>
                  Specializări & Expertise
                </h3>

                {/* Keywords as modern cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {keywords
                    .slice(0, 8)
                    .map((keyword: string, index: number) => (
                      <div
                        key={index}
                        className="group relative bg-gradient-to-r from-surface-elevated/80 to-surface-elevated/60 backdrop-blur-sm text-primary px-4 py-3 rounded-2xl text-sm font-medium border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-lg overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 block text-center">
                          {keyword}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Benefits */}
                <div className="mt-8 p-6 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl border border-primary/20">
                  <h4 className="text-lg font-bold text mb-4 flex items-center gap-2">
                    <span className="text-primary">✨</span>
                    De ce să ne alegi?
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </span>
                      <span className="text-secondary text-sm">
                        Specialiști cu experiență vastă
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </span>
                      <span className="text-secondary text-sm">
                        Echipament medical de ultimă generație
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </span>
                      <span className="text-secondary text-sm">
                        Abordare personalizată pentru fiecare pacient
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </span>
                      <span className="text-secondary text-sm">
                        Programări rapide și flexibile
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedText>
          </div>

          {/* CTA Section */}
          <AnimatedText delay={1.2}>
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 lg:p-12 border border-primary/20 backdrop-blur-sm">
                <h3 className="text-2xl lg:text-3xl font-bold text mb-4">
                  Programează-te pentru o consultație
                </h3>
                <p className="text-secondary text-lg mb-8 max-w-2xl mx-auto">
                  Beneficiază de servicii medicale de înaltă calitate într-un
                  mediu modern și confortabil
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimatedButton
                    href="/programare"
                    variant="primary"
                    size="lg"
                    className="hero-btn-primary shadow-2xl"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-2xl">📅</span>
                      <span>Programare Online</span>
                    </span>
                  </AnimatedButton>
                  <AnimatedButton
                    href="tel:+40721234567"
                    variant="outline"
                    size="lg"
                    className="hero-btn-outline"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-2xl">📞</span>
                      <span>Sună Acum</span>
                    </span>
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </AnimatedText>
        </div>
      </section>
    );
  };

  return (
    <>
      {/* Afișăm pachetele speciale dacă există - PRIMUL */}
      {hasPackages && (
        <section className="relative py-16 bg-gradient-to-br from-surface via-surface-secondary to-surface overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <AnimatedText delay={0.2}>
                <div className="inline-flex items-center gap-2 bg-surface-elevated/80 backdrop-blur-md text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg border border-primary/20">
                  <span className="text-lg">💎</span>
                  <span>Pachete Speciale</span>
                </div>
              </AnimatedText>

              <AnimatedText delay={0.4}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text mb-6">
                  <span className="block">Oferte Exclusive</span>
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hero-gradient-flow">
                    {serviceName}
                  </span>
                </h2>
              </AnimatedText>

              <AnimatedText delay={0.6}>
                <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
                  Economisește cu pachetele noastre speciale care combină
                  servicii complementare pentru îngrijirea ta optimă
                </p>
              </AnimatedText>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <AnimatedText key={index} delay={0.8 + index * 0.1}>
                  <MagicCard
                    className={`relative h-full min-h-[500px] ${
                      pkg.highlight ? "ring-2 ring-primary/50 shadow-2xl" : ""
                    }`}
                    glowColor={
                      pkg.highlight
                        ? "rgba(13, 148, 136, 0.4)"
                        : "rgba(13, 148, 136, 0.2)"
                    }
                  >
                    <div className="p-8 h-full min-h-[500px] flex flex-col">
                      {/* Package Header */}
                      <div className="mb-6">
                        {pkg.popular && (
                          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs font-medium mb-4">
                            <span>⭐</span>
                            <span>Cel mai popular</span>
                          </div>
                        )}
                        <h3 className="text-xl font-bold text mb-3">
                          {pkg.name}
                        </h3>
                        <p className="text-secondary leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>

                      {/* Pricing */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl font-bold text-primary">
                            {pkg.packagePrice} Lei
                          </span>
                          <span className="text-lg text-secondary line-through">
                            {pkg.originalPrice} Lei
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          <span>💰</span>
                          <span>Economisești {pkg.savings} Lei</span>
                        </div>
                      </div>

                      {/* Services Included */}
                      <div className="mb-8 flex-grow">
                        <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">
                          Include:
                        </h4>
                        <ul className="space-y-2">
                          {pkg.services.map((service, serviceIndex) => (
                            <li
                              key={serviceIndex}
                              className="flex items-center gap-2 text-sm text-secondary"
                            >
                              <span className="text-primary">✓</span>
                              <span>{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-auto">
                        <AnimatedButton
                          href="/programare"
                          variant={pkg.highlight ? "primary" : "outline"}
                          size="lg"
                          className={`w-full ${
                            pkg.highlight
                              ? "hero-btn-primary shadow-xl"
                              : "hover:bg-primary hover:text-white hover:border-primary"
                          }`}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <span className="text-lg">📅</span>
                            <span>Rezervă Pachetul</span>
                          </span>
                        </AnimatedButton>
                      </div>
                    </div>
                  </MagicCard>
                </AnimatedText>
              ))}
            </div>

            {/* Bottom CTA */}
            <AnimatedText delay={1.4}>
              <div className="text-center mt-16">
                <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 lg:p-12 border border-primary/20">
                  <h3 className="text-2xl lg:text-3xl font-bold text mb-4">
                    Nu găsești pachetul potrivit?
                  </h3>
                  <p className="text-secondary text-lg mb-6 max-w-2xl mx-auto">
                    Contactează-ne pentru o consultație personalizată și vom
                    crea un plan de îngrijire adaptat nevoilor tale specifice.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <AnimatedButton
                      href="/contact"
                      variant="outline"
                      size="lg"
                      className="hero-btn-outline"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-lg">💬</span>
                        <span>Consultație Personalizată</span>
                      </span>
                    </AnimatedButton>
                    <AnimatedButton
                      href="tel:+40721234567"
                      variant="primary"
                      size="lg"
                      className="hero-btn-primary"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-lg">📞</span>
                        <span>Sună pentru Detalii</span>
                      </span>
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </AnimatedText>
          </div>
        </section>
      )}

      {/* Secțiunea "Ce oferim" - afișată întotdeauna pentru SEO - DUPĂ pachete */}
      <CeOferimSection />
    </>
  );
}
