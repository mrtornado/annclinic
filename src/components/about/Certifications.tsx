import { motion } from "framer-motion";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedText, { GradientText } from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";

export default function Certifications() {
  const certifications = [
    {
      title: "Autorizație de Funcționare",
      issuer: "Ministerul Sănătății",
      description:
        "Autorizație oficială pentru funcționarea ca unitate medicală",
      icon: "🏛️",
      year: "2020",
      color: "from-primary to-primary-hover",
    },
    {
      title: "Certificare ISO 9001",
      issuer: "Organism de Certificare Acreditat",
      description: "Standard internațional pentru managementul calității",
      icon: "🏆",
      year: "2021",
      color: "from-secondary to-secondary-hover",
    },
    {
      title: "Acreditare Laborator",
      issuer: "Autoritatea Națională de Acreditare",
      description: "Acreditare pentru laboratorul de analize medicale",
      icon: "🔬",
      year: "2022",
      color: "from-accent to-accent-hover",
    },
    {
      title: "Certificare GDPR",
      issuer: "Autoritatea de Supraveghere",
      description: "Conformitate cu regulamentul protecției datelor",
      icon: "🔒",
      year: "2023",
      color: "from-blue-500 to-blue-600",
    },
  ];

  const qualityStandards = [
    {
      title: "Protocoale Medicale",
      description:
        "Respectăm protocoalele medicale naționale și internaționale",
      icon: "📋",
    },
    {
      title: "Siguranța Pacientului",
      description: "Implementăm măsuri stricte pentru siguranța pacienților",
      icon: "🛡️",
    },
    {
      title: "Confidențialitate",
      description: "Protejăm datele medicale conform standardelor GDPR",
      icon: "🔐",
    },
    {
      title: "Formare Continuă",
      description: "Personalul participă la programe de formare continuă",
      icon: "📚",
    },
  ];

  const partnerships = [
    {
      name: "Casa de Asigurări de Sănătate",
      description: "Furnizor de servicii medicale în sistemul public",
      icon: "🏥",
    },
    {
      name: "Universitatea de Medicină",
      description: "Parteneriat pentru cercetare și formare medicală",
      icon: "🎓",
    },
    {
      name: "Societăți Medicale",
      description: "Membru în societăți medicale de specialitate",
      icon: "👥",
    },
    {
      name: "Furnizori Medicali",
      description: "Colaborări cu furnizori de echipamente medicale",
      icon: "🔧",
    },
  ];

  const awards = [
    {
      title: "Clinica Anului 2023",
      organization: "Asociația Medicală Română",
      description: "Recunoaștere pentru excelența în serviciile medicale",
      icon: "🥇",
    },
    {
      title: "Premiul pentru Inovație",
      organization: "Camera de Comerț",
      description: "Pentru implementarea tehnologiilor medicale avansate",
      icon: "💡",
    },
    {
      title: "Certificat de Excelență",
      organization: "Pacienții Noștri",
      description: "Peste 98% rata de satisfacție a pacienților",
      icon: "⭐",
    },
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedText>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <GradientText>Certificări și Acreditări</GradientText>
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Respectăm cele mai înalte standarde de calitate și siguranță în
              medicina modernă.
            </p>
          </div>
        </AnimatedText>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MagicCard className="h-full">
                <div className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${cert.color} flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0`}
                    >
                      {cert.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text">
                          {cert.title}
                        </h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {cert.year}
                        </span>
                      </div>
                      <p className="text-sm text-primary font-medium mb-2">
                        {cert.issuer}
                      </p>
                      <p className="text-sm text-secondary leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        {/* Quality Standards */}
        <div className="mb-16">
          <AnimatedText delay={0.4}>
            <h3 className="text-2xl sm:text-3xl font-bold text text-center mb-12">
              Standardele Noastre de Calitate
            </h3>
          </AnimatedText>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityStandards.map((standard, index) => (
              <motion.div
                key={standard.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <MagicCard className="h-full">
                  <div className="p-6 h-full text-center">
                    <div className="text-4xl mb-4">{standard.icon}</div>
                    <h4 className="text-lg font-semibold text mb-3">
                      {standard.title}
                    </h4>
                    <p className="text-sm text-secondary leading-relaxed">
                      {standard.description}
                    </p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-16">
          <AnimatedText delay={1}>
            <h3 className="text-2xl sm:text-3xl font-bold text text-center mb-12">
              Premii și Recunoașteri
            </h3>
          </AnimatedText>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <MagicCard className="h-full">
                  <div className="p-6 h-full text-center">
                    <div className="text-5xl mb-4">{award.icon}</div>
                    <h4 className="text-lg font-semibold text mb-2">
                      {award.title}
                    </h4>
                    <p className="text-sm text-primary font-medium mb-3">
                      {award.organization}
                    </p>
                    <p className="text-sm text-secondary leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partnerships */}
        <div className="mb-16">
          <AnimatedText delay={1.5}>
            <h3 className="text-2xl sm:text-3xl font-bold text text-center mb-12">
              Parteneriate și Colaborări
            </h3>
          </AnimatedText>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerships.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
              >
                <MagicCard>
                  <div className="p-6 text-center">
                    <div className="text-3xl mb-3">{partner.icon}</div>
                    <h4 className="font-semibold text mb-2">{partner.name}</h4>
                    <p className="text-sm text-secondary">
                      {partner.description}
                    </p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1 }}
        >
          <MagicCard>
            <div className="p-8 text-center">
              <div className="text-5xl mb-6">🤝</div>
              <h3 className="text-2xl font-bold text mb-4">
                Încrederea Ta, Responsabilitatea Noastră
              </h3>
              <p className="text-secondary mb-6 max-w-3xl mx-auto leading-relaxed">
                Toate certificările și acreditările noastre sunt dovada
                angajamentului nostru față de calitate, siguranță și excelență
                în serviciile medicale. Continuăm să investim în formare,
                tehnologie și îmbunătățirea continuă pentru a-ți oferi cea mai
                bună îngrijire medicală.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton href="/servicii" variant="primary" size="lg">
                  <span className="flex items-center gap-2">
                    <span>🏥</span>
                    <span>Explorează Serviciile</span>
                  </span>
                </AnimatedButton>

                <AnimatedButton href="/contact" variant="outline" size="lg">
                  <span className="flex items-center gap-2">
                    <span>📞</span>
                    <span>Contactează-ne</span>
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
