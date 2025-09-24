import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import type { ServiceContent } from "../../types/content";
import { siteConfig } from "../../config/site";
import { useState, useEffect } from "react";
import ServicePackages from "./ServicePackages";

interface ServiceDetailsProps {
  service?: ServiceContent | any; // Allow both ServiceContent and direct objects from landing pages
  showTrustSignals?: boolean;
  showBeforeAfter?: boolean;
  serviceImages?: Record<
    string,
    {
      src: string;
      width: number;
      height: number;
    }
  >;
}

export default function ServiceDetails({
  service,
  showTrustSignals = false,
  showBeforeAfter = false,
  serviceImages = {},
}: ServiceDetailsProps) {
  // Handle both ServiceContent and direct objects from landing pages
  const getTreatments = () => {
    if (service?.data?.treatments) return service.data.treatments; // ServiceContent format
    if (service?.treatments) return service.treatments; // Direct object format
    return [];
  };

  const getRelatedServices = () => {
    if (service?.data?.relatedServices) return service.data.relatedServices; // ServiceContent format
    if (service?.relatedServices) return service.relatedServices; // Direct object format
    return [];
  };

  const getServiceSlug = () => {
    if (service?.slug) return service.slug; // ServiceContent format
    if (service?.data?.slug) return service.data.slug; // Sometimes nested in data
    // Fallback to converting name to slug format
    const name = service?.data?.name || service?.name || "";
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const serviceSlug = getServiceSlug();

  const treatments = getTreatments();
  const relatedServices = getRelatedServices();
  const telHref = `tel:${siteConfig.contact.shortPhone.replace(/\s+/g, "")}`;

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-br from-surface via-surface-secondary to-surface overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Packages Section sau Ce Oferim Section */}
        <ServicePackages
          serviceSlug={serviceSlug}
          serviceName={
            service?.data?.name || service?.name || "Servicii Medicale"
          }
          service={service}
        />

        {/* Treatments Grid */}
        {treatments.length > 0 && (
          <div className="mb-16">
            <AnimatedText delay={1.0}>
              <h3 className="text-2xl lg:text-3xl font-bold text text-center mb-12">
                Tratamente și Proceduri
              </h3>
            </AnimatedText>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {treatments.map((treatment: any, index: number) => (
                <AnimatedText key={index} delay={1.2 + index * 0.1}>
                  <article className="group relative bg-surface-elevated/90 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-border/20 hover:border-primary/30 overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl">🔬</span>
                      </div>

                      <h4 className="text-xl font-bold text mb-4 group-hover:text-primary transition-colors duration-300">
                        {treatment.name}
                      </h4>

                      <p className="text-secondary leading-relaxed mb-6">
                        {treatment.description}
                      </p>

                      <div className="flex items-center justify-center">
                        <AnimatedButton
                          href="/programare"
                          variant="outline"
                          size="sm"
                          className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                        >
                          Programează
                        </AnimatedButton>
                      </div>
                    </div>
                  </article>
                </AnimatedText>
              ))}
            </div>
          </div>
        )}

        {/* Secțiunea de Servicii Conexe a fost eliminată la cerere */}

        {/* CTA Section */}
        <AnimatedText delay={1.6}>
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 border border-primary/20">
              <h3 className="text-2xl lg:text-3xl font-bold text mb-6">
                Programează o consultație
              </h3>
              <p className="text-secondary text-lg mb-8 max-w-2xl mx-auto">
                Contactează-ne pentru o consultație personalizată și află mai
                multe despre tratamentele disponibile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  href="/programare"
                  variant="primary"
                  size="lg"
                  className="hero-btn-primary shadow-2xl"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">📅</span>
                    <span>Programează Online</span>
                  </span>
                </AnimatedButton>
                <AnimatedButton
                  href={telHref}
                  variant="outline"
                  size="lg"
                  className="hero-btn-outline"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">📞</span>
                    <span>Sună Acum</span>
                  </span>
                </AnimatedButton>
              </div>
            </div>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
