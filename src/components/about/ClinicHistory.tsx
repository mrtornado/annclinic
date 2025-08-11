import { motion } from "framer-motion";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedText from "../magic-ui/AnimatedText";

export default function ClinicHistory() {
  const timeline = [
    {
      year: "2020",
      title: "Înființarea ANN Clinic",
      description:
        "Am deschis porțile clinicii cu o viziune clară: să oferim servicii medicale de calitate într-un mediu modern și prietenos.",
      icon: "🏗️",
      color: "from-primary to-primary-hover",
    },
    {
      year: "2021",
      title: "Extinderea Serviciilor",
      description:
        "Am adăugat noi specialități medicale și am investit în echipamente de ultimă generație pentru diagnosticare precisă.",
      icon: "📈",
      color: "from-secondary to-secondary-hover",
    },
    {
      year: "2022",
      title: "Certificări și Acreditări",
      description:
        "Am obținut toate certificările necesare și am implementat standardele de calitate internaționale.",
      icon: "🏆",
      color: "from-accent to-accent-hover",
    },
    {
      year: "2023",
      title: "Digitalizare Completă",
      description:
        "Am lansat platforma online pentru programări și am implementat sistemul electronic de management al pacienților.",
      icon: "💻",
      color: "from-blue-500 to-blue-600",
    },
    {
      year: "2024",
      title: "Expansiune și Inovație",
      description:
        "Continuăm să ne extindem echipa și să investim în tehnologii medicale avansate pentru a servi mai bine comunitatea.",
      icon: "🚀",
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text mb-4">
              Povestea Noastră
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              De la o idee simplă la o clinică medicală de încredere - descoperă
              cum am crescut alături de comunitatea noastră.
            </p>
          </div>
        </AnimatedText>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full opacity-20"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <MagicCard>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-xl shadow-lg`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            {item.year}
                          </div>
                          <h3 className="text-xl font-semibold text">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </MagicCard>
                </div>

                {/* Timeline dot */}
                <div className="relative z-10">
                  <div
                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${item.color} shadow-lg border-4 border-surface`}
                  ></div>
                </div>

                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { number: "5000+", label: "Pacienți mulțumiți", icon: "😊" },
            { number: "15000+", label: "Consultații realizate", icon: "🩺" },
            { number: "98%", label: "Rata de satisfacție", icon: "⭐" },
            { number: "", label: "Suport pentru urgențe", icon: "🚨" },
          ].map((stat, index) => (
            <MagicCard key={stat.label}>
              <div className="p-6 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-secondary">{stat.label}</div>
              </div>
            </MagicCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
