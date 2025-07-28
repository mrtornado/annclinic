import { motion } from "framer-motion";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedText, { GradientText } from "../magic-ui/AnimatedText";

export default function Facilities() {
  const facilities = [
    {
      title: "Cabinete de Consultații",
      description:
        "10 cabinete moderne, complet echipate pentru consultații de specialitate",
      icon: "🏥",
      features: [
        "Climatizare",
        "Echipamente moderne",
        "Mobilier ergonomic",
        "Sistem de dezinfecție",
      ],
      color: "from-primary to-primary-hover",
    },
    {
      title: "Laborator de Analize",
      description: "Laborator propriu pentru analize rapide și precise",
      icon: "🔬",
      features: [
        "Analize de sânge",
        "Analize de urină",
        "Teste rapide",
        "Rezultate în 24h",
      ],
      color: "from-secondary to-secondary-hover",
    },
    {
      title: "Sala de Proceduri",
      description: "Sală sterilă pentru proceduri medicale minore",
      icon: "⚕️",
      features: [
        "Sterilizare completă",
        "Echipamente chirurgicale",
        "Monitorizare pacient",
        "Recuperare post-procedură",
      ],
      color: "from-accent to-accent-hover",
    },
    {
      title: "Imagistică Medicală",
      description: "Echipamente de imagistică pentru diagnosticare precisă",
      icon: "📡",
      features: [
        "Ecograf performant",
        "EKG digital",
        "Radiologie",
        "Interpretare rapidă",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Farmacie",
      description: "Farmacie în cadrul clinicii pentru medicamente esențiale",
      icon: "💊",
      features: [
        "Medicamente de specialitate",
        "Consiliere farmaceutică",
        "Produse medicale",
        "Disponibilitate continuă",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      title: "Zona de Așteptare",
      description: "Spații confortabile și relaxante pentru pacienți",
      icon: "🪑",
      features: [
        "Scaune confortabile",
        "WiFi gratuit",
        "Reviste și cărți",
        "Zonă pentru copii",
      ],
      color: "from-purple-500 to-purple-600",
    },
  ];

  const equipment = [
    {
      name: "Ecograf 4D",
      description: "Pentru investigații ginecologice și obstetricale avansate",
      icon: "📱",
    },
    {
      name: "EKG Digital",
      description: "Monitorizare cardiacă de înaltă precizie",
      icon: "💓",
    },
    {
      name: "Dermatoscop",
      description: "Pentru examinarea detaliată a leziunilor cutanate",
      icon: "🔍",
    },
    {
      name: "Spirometru",
      description: "Testarea funcției pulmonare",
      icon: "🫁",
    },
    {
      name: "Oftalmoscop",
      description: "Examinarea fundului de ochi",
      icon: "👁️",
    },
    {
      name: "Otoscop",
      description: "Investigații ORL de precizie",
      icon: "👂",
    },
  ];

  const safetyFeatures = [
    {
      title: "Sistem de Ventilație",
      description: "Aer curat și filtrat în toate spațiile",
      icon: "🌬️",
    },
    {
      title: "Dezinfecție UV",
      description: "Sterilizare cu lumină ultravioletă",
      icon: "☀️",
    },
    {
      title: "Acces Controlat",
      description: "Sistem de securitate și acces controlat",
      icon: "🔐",
    },
    {
      title: "Monitorizare 24/7",
      description: "Supraveghere continuă pentru siguranță",
      icon: "📹",
    },
  ];

  return (
    <section className="py-16 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedText>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <GradientText>Facilitățile Noastre</GradientText>
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Spații moderne și echipamente de ultimă generație pentru a-ți
              oferi cea mai bună experiență medicală.
            </p>
          </div>
        </AnimatedText>

        {/* Main Facilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MagicCard className="h-full">
                <div className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${facility.color} flex items-center justify-center text-white text-xl shadow-lg`}
                    >
                      {facility.icon}
                    </div>
                    <h3 className="text-lg font-semibold text">
                      {facility.title}
                    </h3>
                  </div>

                  <p className="text-secondary mb-4 leading-relaxed">
                    {facility.description}
                  </p>

                  <div className="space-y-2">
                    {facility.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="text-primary">✓</span>
                        <span className="text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        {/* Medical Equipment */}
        <div className="mb-16">
          <AnimatedText delay={0.6}>
            <h3 className="text-2xl sm:text-3xl font-bold text text-center mb-12">
              Echipamente Medicale Avansate
            </h3>
          </AnimatedText>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <MagicCard>
                  <div className="p-6 text-center">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h4 className="text-lg font-semibold text mb-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-secondary">{item.description}</p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Safety and Hygiene */}
        <div className="mb-16">
          <AnimatedText delay={1.2}>
            <h3 className="text-2xl sm:text-3xl font-bold text text-center mb-12">
              Siguranță și Igienă
            </h3>
          </AnimatedText>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <MagicCard>
                  <div className="p-6 text-center">
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <h4 className="font-semibold text mb-2">{feature.title}</h4>
                    <p className="text-sm text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Accessibility */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <MagicCard>
            <div className="p-8 text-center">
              <div className="text-5xl mb-4">♿</div>
              <h3 className="text-2xl font-bold text mb-4">
                Accesibilitate Completă
              </h3>
              <p className="text-secondary mb-6 max-w-3xl mx-auto">
                Clinica noastră este complet accesibilă pentru persoanele cu
                dizabilități. Avem rampe de acces, lifturi, toalete adaptate și
                personal instruit să asiste pacienții cu nevoi speciale.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-primary">✓</span>
                  <span className="text-sm text-secondary">Rampe de acces</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-primary">✓</span>
                  <span className="text-sm text-secondary">
                    Lift pentru etaje
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-primary">✓</span>
                  <span className="text-sm text-secondary">
                    Toalete adaptate
                  </span>
                </div>
              </div>
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </section>
  );
}
