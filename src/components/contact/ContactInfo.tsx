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
      mobiles: [siteConfig.contact.phone, siteConfig.contact.secondaryPhone],
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
    {
      icon: "📅",
      title: "Programare Online",
      primary: "Programează-te rapid",
      secondary: "Disponibil 24/7",
      action: "/programare",
      description:
        "Sistemul nostru de programare online îți permite să alegi data, ora și specialistul preferat în doar câteva clickuri.",
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <MagicCard
              className="h-full min-h-[400px]"
              glowColor={`rgba(13, 148, 136, 0.3)`}
            >
              <div className="relative p-8 h-full min-h-[400px] flex flex-col overflow-hidden">
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

                {/* Floating decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl animate-pulse" />
                <div
                  className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-lg animate-pulse"
                  style={{ animationDelay: "1s" }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header with modern icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl text-foreground">
                        {method.title}
                      </h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-1" />
                    </div>
                  </div>

                  {/* Main contact info */}
                  <div className="flex-1 mb-6">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 mb-4 border border-primary/20">
                      <p className="font-bold text-xl text-primary mb-1">
                        {method.primary}
                      </p>
                      <p className="text-secondary text-sm font-medium">
                        {method.secondary}
                      </p>
                    </div>

                    {method.mobiles && (
                      <div className="space-y-3">
                        <p className="text-xs text-secondary uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                          <span className="w-4 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                          Telefoane Mobile
                        </p>
                        <div className="grid gap-2">
                          {method.mobiles.map((mobile, idx) => (
                            <div
                              key={idx}
                              className="group flex items-center gap-3 bg-white/50 hover:bg-primary/10 rounded-xl p-3 transition-all duration-300 border border-border/30 hover:border-primary/30 hover:shadow-md cursor-pointer"
                              onClick={() =>
                                (window.location.href = `tel:${mobile}`)
                              }
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm shadow-sm group-hover:scale-110 transition-transform">
                                📱
                              </div>
                              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {mobile}
                              </span>
                              <div className="ml-auto w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Extra content for email to match phone card height */}
                    {method.title === "Email" && (
                      <div className="space-y-3 mt-4">
                        <p className="text-xs text-secondary uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                          <span className="w-4 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                          Avantaje Email
                        </p>
                        <div className="grid gap-2">
                          <div className="flex items-center gap-3 bg-white/50 rounded-xl p-3 border border-border/30">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm shadow-sm">
                              📄
                            </div>
                            <span className="font-medium text-foreground text-sm">
                              Documentația medicală
                            </span>
                          </div>
                          <div className="flex items-center gap-3 bg-white/50 rounded-xl p-3 border border-border/30">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white text-sm shadow-sm">
                              📋
                            </div>
                            <span className="font-medium text-foreground text-sm">
                              Solicitări detaliate
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Extra content for programare to match phone card height */}
                    {method.title === "Programare Online" && (
                      <div className="space-y-3 mt-4">
                        <p className="text-xs text-secondary uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                          <span className="w-4 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                          Avantaje Programare
                        </p>
                        <div className="grid gap-2">
                          <div className="flex items-center gap-3 bg-white/50 rounded-xl p-3 border border-border/30">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white text-sm shadow-sm">
                              ⚡
                            </div>
                            <span className="font-medium text-foreground text-sm">
                              Programare instantanee
                            </span>
                          </div>
                          <div className="flex items-center gap-3 bg-white/50 rounded-xl p-3 border border-border/30">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white text-sm shadow-sm">
                              🎯
                            </div>
                            <span className="font-medium text-foreground text-sm">
                              Alege specialistul preferat
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-secondary text-sm leading-relaxed mb-6 bg-surface/50 rounded-xl p-4 border border-border/20">
                    {method.description}
                  </p>

                  {/* Action button */}
                  <a
                    href={method.action}
                    target={
                      method.action.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      method.action.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 px-6 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-center"
                  >
                    <span>
                      {method.action.startsWith("http")
                        ? "Vezi pe hartă"
                        : method.action.startsWith("tel")
                        ? "Apelează acum"
                        : method.action.startsWith("/")
                        ? "Programează-te acum"
                        : "Trimite email"}
                    </span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </MagicCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Schedule - Modern Design */}
        <AnimatedText delay={0.4}>
          <MagicCard
            className="h-full min-h-[500px]"
            glowColor={`rgba(13, 148, 136, 0.3)`}
          >
            <div className="relative p-8 h-full min-h-[500px] flex flex-col overflow-hidden">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5" />

              {/* Floating decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-xl animate-pulse" />
              <div
                className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-lg animate-pulse"
                style={{ animationDelay: "1.5s" }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header with modern icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                    ⏰
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-foreground">
                      Program de Lucru
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-1" />
                  </div>
                </div>

                {/* Schedule items */}
                <div className="flex-1 mb-6">
                  <div className="space-y-3">
                    {schedule.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 bg-gradient-to-r from-surface/80 to-surface-elevated/80 rounded-xl border border-border/30 hover:border-orange-500/30 transition-all duration-300"
                      >
                        <span className="font-semibold text-lg text-foreground">
                          {item.day}
                        </span>
                        <span
                          className={`font-bold text-lg px-3 py-1 rounded-lg ${
                            item.available
                              ? "text-green-600 bg-green-100"
                              : "text-secondary bg-secondary/10"
                          }`}
                        >
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency info */}
                <div className="mt-auto">
                  <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-4 border border-red-500/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white text-sm shadow-sm flex-shrink-0 mt-0.5">
                        🚨
                      </div>
                      <div>
                        <p className="font-bold text-red-600 mb-1">
                          Urgențe Medicale
                        </p>
                        <p className="text-secondary text-sm leading-relaxed">
                          Pentru urgențe medicale, sunați la{" "}
                          <strong className="text-red-600">021 9063</strong> sau
                          contactați serviciul de ambulanță.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MagicCard>
        </AnimatedText>

        {/* Social Media - Modern Design */}
        <AnimatedText delay={0.6}>
          <MagicCard
            className="h-full min-h-[500px]"
            glowColor={`rgba(13, 148, 136, 0.3)`}
          >
            <div className="relative p-8 h-full min-h-[500px] flex flex-col overflow-hidden">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />

              {/* Floating decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" />
              <div
                className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-lg animate-pulse"
                style={{ animationDelay: "2s" }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header with modern icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                    🌐
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-foreground">
                      Urmărește-ne Online
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-1" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-secondary mb-6 bg-surface/50 rounded-xl p-4 border border-border/20">
                  Urmărește-ne pe rețelele sociale pentru noutăți, sfaturi
                  medicale și informații despre serviciile noastre.
                </p>

                {/* Social media buttons */}
                <div className="flex-1 mb-6">
                  <div className="grid grid-cols-1 gap-4">
                    <a
                      href={siteConfig.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-medium"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        📘
                      </div>
                      <div className="flex-1">
                        <div className="font-bold">Facebook</div>
                        <div className="text-blue-100 text-sm">
                          Urmărește pagina noastră
                        </div>
                      </div>
                      <div className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </a>

                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-medium"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        📷
                      </div>
                      <div className="flex-1">
                        <div className="font-bold">Instagram</div>
                        <div className="text-pink-100 text-sm">
                          Vezi pozele noastre
                        </div>
                      </div>
                      <div className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </a>

                    <a
                      href={siteConfig.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 bg-gradient-to-r from-gray-800 to-black text-white p-4 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-medium"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        🎵
                      </div>
                      <div className="flex-1">
                        <div className="font-bold">TikTok</div>
                        <div className="text-gray-300 text-sm">
                          Conținut medical educativ
                        </div>
                      </div>
                      <div className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Special offer info */}
                <div className="mt-auto">
                  <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-4 border border-emerald-500/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white text-sm shadow-sm flex-shrink-0 mt-0.5">
                        🎁
                      </div>
                      <div>
                        <p className="font-bold text-emerald-600 mb-1">
                          Oferte Exclusive
                        </p>
                        <p className="text-secondary text-sm leading-relaxed">
                          Urmăritorii noștri primesc acces la oferte speciale și
                          evenimente medicale gratuite.
                        </p>
                        <p className="text-secondary/70 text-xs mt-2">
                          *Se aplică termeni și condiții.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MagicCard>
        </AnimatedText>
      </div>
    </div>
  );
}
