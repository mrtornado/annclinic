import { motion } from "framer-motion";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedText, { GradientText } from "../magic-ui/AnimatedText";

export default function MissionValues() {
  const values = [
    {
      icon: "🤝",
      title: "Încredere",
      description:
        "Construim relații de încredere cu fiecare pacient, bazate pe transparență și profesionalism.",
      color: "from-primary to-primary-hover",
    },
    {
      icon: "⚡",
      title: "Excelență",
      description:
        "Ne străduim să oferim servicii medicale de cea mai înaltă calitate, folosind tehnologii moderne.",
      color: "from-secondary to-secondary-hover",
    },
    {
      icon: "❤️",
      title: "Empatie",
      description:
        "Înțelegem că fiecare pacient este unic și oferim o abordare personalizată și plină de compasiune.",
      color: "from-accent to-accent-hover",
    },
    {
      icon: "🔬",
      title: "Inovație",
      description:
        "Investim constant în tehnologii medicale avansate și în formarea continuă a echipei noastre.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "🌟",
      title: "Integritate",
      description:
        "Acționăm cu onestitate și integritate în toate interacțiunile cu pacienții și partenerii noștri.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: "🚀",
      title: "Accesibilitate",
      description:
        "Facem serviciile medicale de calitate accesibile pentru toată comunitatea din Bragadiru și București.",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <section className="py-16 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <AnimatedText>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <GradientText>Misiunea Noastră</GradientText>
            </h2>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div className="max-w-4xl mx-auto">
              <MagicCard>
                <div className="p-8">
                  <div className="text-6xl mb-6">🎯</div>
                  <p className="text-xl sm:text-2xl text-secondary leading-relaxed">
                    <strong className="text-primary">Misiunea noastră</strong>{" "}
                    este să oferim servicii medicale de excelență, accesibile și
                    personalizate, contribuind la sănătatea și bunăstarea
                    comunității noastre. Ne dedicăm să fim partenerul tău de
                    încredere în menținerea și îmbunătățirea sănătății tale.
                  </p>
                </div>
              </MagicCard>
            </div>
          </AnimatedText>
        </div>

        {/* Values */}
        <div className="mb-16">
          <AnimatedText delay={0.4}>
            <h3 className="text-2xl sm:text-3xl font-bold text text-center mb-12">
              Valorile Care Ne Ghidează
            </h3>
          </AnimatedText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <MagicCard className="h-full">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center text-white text-xl shadow-lg`}
                      >
                        {value.icon}
                      </div>
                      <h4 className="text-xl font-semibold text">
                        {value.title}
                      </h4>
                    </div>
                    <p className="text-secondary leading-relaxed flex-1">
                      {value.description}
                    </p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <AnimatedText delay={1.2}>
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text mb-8">
              Viziunea Noastră
            </h3>

            <MagicCard>
              <div className="p-8">
                <div className="text-6xl mb-6">🌅</div>
                <p className="text-xl text-secondary leading-relaxed max-w-3xl mx-auto">
                  <strong className="text-primary">Viziunea noastră</strong>{" "}
                  este să devenim clinica medicală de referință din regiunea
                  București-Ilfov, recunoscută pentru calitatea serviciilor,
                  inovația tehnologică și grija excepțională pentru pacienți.
                  Aspirăm să contribuim la crearea unui sistem de sănătate mai
                  bun și mai accesibil pentru toți.
                </p>
              </div>
            </MagicCard>
          </div>
        </AnimatedText>

        {/* Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <MagicCard>
            <div className="p-6 text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="text-lg font-semibold text mb-2">
                Calitate Garantată
              </h4>
              <p className="text-sm text-secondary">
                Respectăm cele mai înalte standarde medicale și de siguranță
              </p>
            </div>
          </MagicCard>

          <MagicCard>
            <div className="p-6 text-center">
              <div className="text-4xl mb-4">🤲</div>
              <h4 className="text-lg font-semibold text mb-2">
                Grija Personalizată
              </h4>
              <p className="text-sm text-secondary">
                Fiecare pacient primește atenția și tratamentul personalizat pe
                care îl merită
              </p>
            </div>
          </MagicCard>

          <MagicCard>
            <div className="p-6 text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h4 className="text-lg font-semibold text mb-2">
                Dezvoltare Continuă
              </h4>
              <p className="text-sm text-secondary">
                Ne perfecționăm constant pentru a oferi cele mai bune servicii
                medicale
              </p>
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </section>
  );
}
