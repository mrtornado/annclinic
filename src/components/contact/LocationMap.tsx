import { motion } from "framer-motion";
import { useState } from "react";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import type { AnimatedButtonProps } from "../magic-ui/AnimatedButton";
import { siteConfig } from "../../config/site";

export default function LocationMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Google Maps embed URL direct (fără API key)
  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2850.4410003225206!2d26.03968867675105!3d44.36329080215218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40ae00f6b6f8a2a5%3A0x62c5eda8e599c505!2sSos.%20Alexandriei%20101%2C%20Bragadiru%20077025!5e0!3m2!1sro!2sro!4v1718286484204!5m2!1sro!2sro`;

  // Fallback static map URL (using OpenStreetMap)
  const staticMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    siteConfig.address.coordinates.lng - 0.01
  },${siteConfig.address.coordinates.lat - 0.01},${
    siteConfig.address.coordinates.lng + 0.01
  },${siteConfig.address.coordinates.lat + 0.01}&layer=mapnik&marker=${
    siteConfig.address.coordinates.lat
  },${siteConfig.address.coordinates.lng}`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${siteConfig.address.coordinates.lat},${siteConfig.address.coordinates.lng}`;

  const transportOptions = [
    {
      icon: "🚗",
      title: "Cu mașina",
      description: "Parcare gratuită disponibilă",
      details: "Acces facil din București prin A1",
    },
    {
      icon: "🚌",
      title: "Transport public",
      description: "Autobuze și microbuze",
      details: "Stația: Bragadiru Centru",
    },
    {
      icon: "🚶",
      title: "Pe jos",
      description: "Zonă pietonală",
      details: "Acces facil pentru persoane cu dizabilități",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-surface-secondary/50 via-white to-surface-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-surface-elevated/80 backdrop-blur-md text-secondary px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg border border-secondary/20">
              <span className="text-secondary">📍</span>
              <span>Vizitează-ne la clinică</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-secondary-hover">
                Locația Noastră
              </span>
            </h2>

            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Ne găsești în Bragadiru, într-o locație accesibilă și cu parcare
              gratuită. Suntem aproape de București, cu acces facil din toate
              zonele.
            </p>
          </div>
        </AnimatedText>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <MagicCard>
              <div className="p-6">
                <div className="aspect-video rounded-xl overflow-hidden bg-surface-tertiary relative">
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-4">🗺️</div>
                        <p className="text-secondary">Se încarcă harta...</p>
                      </div>
                    </div>
                  )}

                  <iframe
                    src={googleMapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setMapLoaded(true)}
                    className="rounded-xl"
                    title="Locația ANN Clinic"
                  />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <AnimatedButton
                    href="https://www.google.com/maps/dir/?api=1&destination=Sos.+Alexandriei+101+Bragadiru+Ilfov+Romania"
                    variant="primary"
                    size="md"
                    className="flex-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex items-center gap-2">
                      <span>🧭</span>
                      <span>Obține Direcții</span>
                    </span>
                  </AnimatedButton>

                  <AnimatedButton
                    href="https://maps.google.com/?q=Soseaua+Alexandriei+101+Bragadiru+Ilfov+Romania"
                    variant="outline"
                    size="md"
                    className="flex-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex items-center gap-2">
                      <span>📍</span>
                      <span>Vezi în Google Maps</span>
                    </span>
                  </AnimatedButton>
                </div>
              </div>
            </MagicCard>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {/* Address */}
            <MagicCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text mb-4 flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  Adresa Completă
                </h3>
                <div className="space-y-2 text-secondary">
                  <p className="font-medium text">
                    {siteConfig.address.street} {siteConfig.address.number}
                  </p>
                  <p>
                    {siteConfig.address.city}, {siteConfig.address.county}
                  </p>
                  <p>Cod poștal: {siteConfig.address.postalCode}</p>
                  <p>{siteConfig.address.country}</p>
                </div>
              </div>
            </MagicCard>

            {/* Transport Options */}
            <MagicCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text mb-4 flex items-center gap-2">
                  <span className="text-2xl">🚗</span>
                  Cum Ajungi
                </h3>
                <div className="space-y-4">
                  {transportOptions.map((option, index) => (
                    <motion.div
                      key={option.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-surface hover:bg-surface-secondary transition-colors duration-300"
                    >
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <h4 className="font-semibold text">{option.title}</h4>
                        <p className="text-sm text-primary font-medium">
                          {option.description}
                        </p>
                        <p className="text-xs text-secondary mt-1">
                          {option.details}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </MagicCard>

            {/* Landmarks */}
            <MagicCard>
              <div className="p-6">
                <h3 className="text-xl font-semibold text mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏢</span>
                  Puncte de Reper
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-secondary">
                      Lângă Primăria Bragadiru
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-secondary">
                      Vizavi de Parcul Central
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-secondary">
                      La 15 min de București
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-secondary">Acces facil din A1</span>
                  </div>
                </div>
              </div>
            </MagicCard>
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <MagicCard>
            <div className="p-6 text-center">
              <div className="text-3xl mb-3">🅿️</div>
              <h4 className="font-semibold text mb-2">Parcare Gratuită</h4>
              <p className="text-sm text-secondary">
                Locuri de parcare disponibile în fața cliniicii
              </p>
            </div>
          </MagicCard>

          <MagicCard>
            <div className="p-6 text-center">
              <div className="text-3xl mb-3">♿</div>
              <h4 className="font-semibold text mb-2">Acces Facil</h4>
              <p className="text-sm text-secondary">
                Facilități pentru persoane cu dizabilități
              </p>
            </div>
          </MagicCard>

          <MagicCard>
            <div className="p-6 text-center">
              <div className="text-3xl mb-3">🏥</div>
              <h4 className="font-semibold text mb-2">Locație Centrală</h4>
              <p className="text-sm text-secondary">
                În centrul Bragadiru, aproape de toate serviciile
              </p>
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </section>
  );
}
