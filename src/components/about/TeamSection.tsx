import { motion } from "framer-motion";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedText, { GradientText } from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";

export default function TeamSection() {
  const teamStats = [
    {
      number: "20+",
      label: "Medici Specialiști",
      icon: "👨‍⚕️",
      color: "from-primary to-primary-hover",
    },
    {
      number: "15+",
      label: "Asistente Medicale",
      icon: "👩‍⚕️",
      color: "from-secondary to-secondary-hover",
    },
    {
      number: "10+",
      label: "Personal Suport",
      icon: "👥",
      color: "from-accent to-accent-hover",
    },
    {
      number: "14+",
      label: "Specialități Acoperite",
      icon: "🏥",
      color: "from-blue-500 to-blue-600",
    },
  ];

  const teamHighlights = [
    {
      title: "Experiență Vastă",
      description:
        "Medicii noștri au în medie peste 10 ani de experiență în specialitățile lor.",
      icon: "🎓",
      color: "from-primary to-primary-hover",
    },
    {
      title: "Formare Continuă",
      description:
        "Echipa noastră participă regulat la conferințe și cursuri de specializare.",
      icon: "📚",
      color: "from-secondary to-secondary-hover",
    },
    {
      title: "Abordare Multidisciplinară",
      description:
        "Colaborăm între specialități pentru a oferi cele mai bune soluții medicale.",
      icon: "🤝",
      color: "from-accent to-accent-hover",
    },
    {
      title: "Tehnologie Avansată",
      description:
        "Folosim echipamente medicale de ultimă generație pentru diagnosticare precisă.",
      icon: "🔬",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const departments = [
    {
      name: "Cardiologie",
      specialists: "3 medici",
      icon: "❤️",
      description:
        "Specialiști în boli cardiovasculare și investigații cardiologice",
    },
    {
      name: "Dermatologie",
      specialists: "2 medici",
      icon: "🧴",
      description:
        "Tratamente pentru afecțiuni ale pielii și estetică medicală",
    },
    {
      name: "Ginecologie",
      specialists: "3 medici",
      icon: "🌸",
      description: "Sănătatea femeii și consultații ginecologice complete",
    },
    {
      name: "Pediatrie",
      specialists: "2 medici",
      icon: "👶",
      description:
        "Grija pentru sănătatea copiilor de la naștere la adolescență",
    },
    {
      name: "Ortopedie",
      specialists: "2 medici",
      icon: "🦴",
      description:
        "Tratarea afecțiunilor sistemului locomotor și traumatologie",
    },
    {
      name: "ORL",
      specialists: "2 medici",
      icon: "👂",
      description: "Specialiști în otorinolaringologie și chirurgie ORL",
    },
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedText>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <GradientText>Echipa Noastră Medicală</GradientText>
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              O echipă de profesioniști dedicați, cu experiență vastă și pasiune
              pentru medicina modernă.
            </p>
          </div>
        </AnimatedText>

        {/* Team Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teamStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MagicCard>
                <div className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-2xl shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-secondary">{stat.label}</div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        {/* Team Highlights */}
        <div className="mb-16">
          <AnimatedText delay={0.4}>
            <h3 className="text-2xl sm:text-3xl font-bold text text-center mb-12">
              De Ce Să Alegi Echipa Noastră
            </h3>
          </AnimatedText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <MagicCard className="h-full">
                  <div className="p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${highlight.color} flex items-center justify-center text-white text-xl shadow-lg flex-shrink-0`}
                      >
                        {highlight.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text mb-2">
                          {highlight.title}
                        </h4>
                        <p className="text-secondary leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div className="mb-16">
          <AnimatedText delay={0.8}>
            <h3 className="text-2xl sm:text-3xl font-bold text text-center mb-12">
              Departamentele Noastre
            </h3>
          </AnimatedText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <MagicCard className="h-full">
                  <div className="p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{dept.icon}</span>
                      <div>
                        <h4 className="text-lg font-semibold text">
                          {dept.name}
                        </h4>
                        <p className="text-sm text-primary font-medium">
                          {dept.specialists}
                        </p>
                      </div>
                    </div>
                    <p className="text-secondary text-sm leading-relaxed">
                      {dept.description}
                    </p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center"
        >
          <MagicCard>
            <div className="p-8">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text mb-4">
                Vrei să Cunoști Echipa Noastră?
              </h3>
              <p className="text-secondary mb-6 max-w-2xl mx-auto">
                Descoperă medicii noștri specialiști, experiența lor și
                domeniile de expertiza. Fiecare membru al echipei este dedicat
                să îți ofere cea mai bună îngrijire medicală.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton href="/medici" variant="primary" size="lg">
                  <span className="flex items-center gap-2">
                    <span>👨‍⚕️</span>
                    <span>Vezi Medicii Noștri</span>
                  </span>
                </AnimatedButton>

                <AnimatedButton href="/programare" variant="outline" size="lg">
                  <span className="flex items-center gap-2">
                    <span>📅</span>
                    <span>Programează Consultație</span>
                  </span>
                </AnimatedButton>
              </div>
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </section>
  );
}
