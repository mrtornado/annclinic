import { motion } from "framer-motion";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedText from "../magic-ui/AnimatedText";
import { siteConfig } from "../../config/site";

export default function ContactInfo() {
  const contactMethods = [
    {
      icon: "📞",
      title: "Telefon",
      primary: siteConfig.contact.phoneDisplay,
      secondary: "Luni - Vineri: 08:00 - 20:00",
      action: `tel:${siteConfig.contact.phone}`,
      color: "from-primary to-primary-hover",
    },
    {
      icon: "📧",
      title: "Email",
      primary: siteConfig.contact.email,
      secondary: "Răspundem în 24h",
      action: `mailto:${siteConfig.contact.email}`,
      color: "from-secondary to-secondary-hover",
    },
    {
      icon: "📍",
      title: "Adresa",
      primary: `${siteConfig.address.street} ${siteConfig.address.number}`,
      secondary: `${siteConfig.address.city}, ${siteConfig.address.county}`,
      action: `https://maps.google.com/?q=${siteConfig.address.coordinates.lat},${siteConfig.address.coordinates.lng}`,
      color: "from-accent to-accent-hover",
    },
    {
      icon: "🚨",
      title: "Urgențe",
      primary: "112 - Ambulanța",
      secondary: "24/7 disponibil",
      action: "tel:112",
      color: "from-red-500 to-red-600",
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
    <div className="space-y-8">
      <AnimatedText>
        <h2 className="text-3xl font-bold text mb-6">Informații de Contact</h2>
      </AnimatedText>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MagicCard className="h-full">
              <a
                href={method.action}
                target={method.action.startsWith("http") ? "_blank" : undefined}
                rel={
                  method.action.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="block p-6 h-full hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center text-white text-xl shadow-lg`}
                  >
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text text-lg mb-1">
                      {method.title}
                    </h3>
                    <p className="font-medium text-primary mb-1">
                      {method.primary}
                    </p>
                    <p className="text-sm text-secondary">{method.secondary}</p>
                  </div>
                </div>
              </a>
            </MagicCard>
          </motion.div>
        ))}
      </div>

      {/* Schedule */}
      <AnimatedText delay={0.4}>
        <MagicCard>
          <div className="p-6">
            <h3 className="text-xl font-semibold text mb-4 flex items-center gap-2">
              <span className="text-2xl">⏰</span>
              Program de Lucru
            </h3>
            <div className="space-y-3">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-border/30 last:border-b-0"
                >
                  <span className="font-medium text">{item.day}</span>
                  <span
                    className={`font-semibold ${
                      item.available ? "text-primary" : "text-secondary"
                    }`}
                  >
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-primary font-medium">
                💡 Pentru urgențe medicale, sunați la 112 sau contactați
                serviciul de ambulanță.
              </p>
            </div>
          </div>
        </MagicCard>
      </AnimatedText>

      {/* Social Media */}
      <AnimatedText delay={0.6}>
        <MagicCard>
          <div className="p-6">
            <h3 className="text-xl font-semibold text mb-4 flex items-center gap-2">
              <span className="text-2xl">🌐</span>
              Urmărește-ne
            </h3>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                <span>📘</span>
                <span>Facebook</span>
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-300"
              >
                <span>📷</span>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </MagicCard>
      </AnimatedText>
    </div>
  );
}
