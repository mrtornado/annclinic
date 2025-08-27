import { motion } from "framer-motion";
import { useState } from "react";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import { siteConfig } from "../../config/site";

export default function LocationMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Google Maps embed URL pentru Ann Medical Clinic (coordonatele corecte)
  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2851.091659844327!2d26.0041646!3d44.3868225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40adff5417f61649:0x603662fc6541411d!2sANN+Medical+Clinic!5e0!3m2!1sro!2sro!4v1735044000000!5m2!1sro!2sro`;

  const transportOptions = [
    {
      icon: "🚗",
      title: "Cu mașina",
      description: "Acces din București prin A1",
      details: "Șoseaua Alexandriei nr. 101",
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
      description: "Zonă accesibilă",
      details: "",
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
                    href="https://www.google.com/maps/dir/?api=1&destination=44.3868187,26.0067395"
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
                    href="https://www.google.com/maps/place/ANN+Medical+Clinic/@44.3868225,26.0041646,17z/data=!3m1!4b1!4m6!3m5!1s0x40adff5417f61649:0x603662fc6541411d!8m2!3d44.3868187!4d26.0067395!16s%2Fg%2F11mckbtny9?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D"
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
          </div>
        </div>
      </div>
    </section>
  );
}
