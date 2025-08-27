import { motion } from "framer-motion";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedText from "../magic-ui/AnimatedText";
import { siteConfig } from "../../config/site";

export default function ContactInfo() {
  const contactMethods = [
    {
      icon: "📞",
      title: "Telefon",
      primary: siteConfig.contact.shortPhone,
      secondary: "Luni - Vineri: 08:00 - 20:00",
      action: `tel:${siteConfig.contact.shortPhone}`,
      description:
        "Ne poți contacta telefonic pentru programări sau informații despre serviciile noastre medicale.",
    },
    {
      icon: "📧",
      title: "Email",
      primary: siteConfig.contact.email,
      secondary: "Răspundem în 24h",
      action: `mailto:${siteConfig.contact.email}`,
      description:
        "Trimite-ne un email pentru informații detaliate sau solicitări care nu sunt urgente.",
    },
  ];

  // Program de lucru din configurația site-ului
  const schedule = [
    {
      day: "Luni - Vineri",
      hours: siteConfig.schedule.weekdays,
      available: true,
    },
    {
      day: "Sâmbătă",
      hours: siteConfig.schedule.saturday,
      available: siteConfig.schedule.saturday !== "În curând",
    },
    {
      day: "Duminică",
      hours: siteConfig.schedule.sunday,
      available: false,
    },
  ];

  return (
    <div className="space-y-16">
      {/* Contact Methods - Modern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <MagicCard className="h-full" glowColor={`rgba(13, 148, 136, 0.2)`}>
              <a
                href={method.action}
                target={method.action.startsWith("http") ? "_blank" : undefined}
                rel={
                  method.action.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="block p-8 h-full hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 flex items-center justify-center text-3xl">
                      {method.icon}
                    </div>
                    <h3 className="font-bold text-2xl">{method.title}</h3>
                  </div>

                  <div className="mb-6">
                    <p className="font-semibold text-xl text-primary mb-1">
                      {method.primary}
                    </p>
                    <p className="text-secondary">{method.secondary}</p>
                  </div>

                  <p className="text-secondary mt-auto">{method.description}</p>

                  <div className="mt-6 inline-flex items-center text-sm font-medium text-primary">
                    {method.action.startsWith("http")
                      ? "Vezi pe hartă"
                      : method.action.startsWith("tel")
                      ? "Apelează acum"
                      : "Trimite email"}
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </a>
            </MagicCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Schedule - Modern Design */}
        <AnimatedText delay={0.4}>
          <MagicCard glowColor={`rgba(13, 148, 136, 0.2)`}>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center text-2xl">
                  ⏰
                </div>
                Program de Lucru
              </h3>
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-border/30 last:border-b-0"
                  >
                    <span className="font-medium text-lg">{item.day}</span>
                    <span
                      className={`font-bold text-lg ${
                        item.available ? "text-primary" : "text-secondary"
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-primary/10 rounded-xl border border-primary/20">
                <p className="text-primary font-medium flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <span>
                    Pentru urgențe medicale, sunați la 021 9063 sau contactați
                    serviciul de ambulanță.
                  </span>
                </p>
              </div>
            </div>
          </MagicCard>
        </AnimatedText>

        {/* Social Media - Modern Design */}
        <AnimatedText delay={0.6}>
          <MagicCard glowColor={`rgba(13, 148, 136, 0.2)`}>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center text-2xl">
                  🌐
                </div>
                Urmărește-ne Online
              </h3>

              <p className="text-secondary mb-6">
                Urmărește-ne pe rețelele sociale pentru noutăți, sfaturi
                medicale și informații despre serviciile noastre.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-medium text-sm sm:text-base"
                >
                  <span className="text-xl sm:text-2xl">📘</span>
                  <span>Facebook</span>
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-medium text-sm sm:text-base"
                >
                  <span className="text-xl sm:text-2xl">📷</span>
                  <span>Instagram</span>
                </a>
                <a
                  href={siteConfig.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-800 to-black text-white px-4 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-medium text-sm sm:text-base"
                >
                  <span className="text-xl sm:text-2xl">🎵</span>
                  <span>TikTok</span>
                </a>
              </div>

              <div className="mt-6 p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                <p className="text-secondary font-medium flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  <span>
                    Urmăritorii noștri primesc acces la oferte speciale și
                    evenimente medicale gratuite.
                    <p>Se aplică termeni și condiții.</p>
                  </span>
                </p>
              </div>
            </div>
          </MagicCard>
        </AnimatedText>
      </div>
    </div>
  );
}
