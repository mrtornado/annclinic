import { useState } from "react";
import { motion } from "framer-motion";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText from "../magic-ui/AnimatedText";
import { siteConfig } from "../../config/site";
import type { ServiceContent } from "../../types/content";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  specialty: string;
  message: string;
  urgency: string;
}

interface ContactFormProps {
  services: ServiceContent[];
}

export default function ContactForm({ services }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    specialty: "",
    message: "",
    urgency: "normal",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        specialty: "",
        message: "",
        urgency: "normal",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-border/30 bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text";
  const labelClasses = "block text-sm font-semibold text mb-2";

  return (
    <div className="space-y-8">
      <AnimatedText>
        <h2 className="text-3xl font-bold text mb-6">Trimite-ne un Mesaj</h2>
      </AnimatedText>

      <MagicCard>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label htmlFor="name" className={labelClasses}>
                  Nume complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={inputClasses}
                  placeholder="Introduceți numele complet"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="email" className={labelClasses}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={inputClasses}
                  placeholder="exemplu@email.com"
                />
              </motion.div>
            </div>

            {/* Phone and Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="phone" className={labelClasses}>
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="+40 XXX XXX XXX"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="subject" className={labelClasses}>
                  Subiect *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Selectați subiectul</option>
                  <option value="appointment">Programare consultație</option>
                  <option value="information">Informații servicii</option>
                  <option value="results">Rezultate analize</option>
                  <option value="complaint">Reclamație</option>
                  <option value="other">Altele</option>
                </select>
              </motion.div>
            </div>

            {/* Specialty and Urgency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="specialty" className={labelClasses}>
                  Specialitate medicală
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  className={inputClasses}
                >
                  <option value="">Selectați specialitatea</option>
                  {services
                    .filter((service) => !service.data.comingSoon)
                    .map((service) => (
                      <option key={service.slug} value={service.slug}>
                        {service.data.name}
                      </option>
                    ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="urgency" className={labelClasses}>
                  Urgența
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className={inputClasses}
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="emergency">Urgență medicală</option>
                </select>
              </motion.div>
            </div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label htmlFor="message" className={labelClasses}>
                Mesaj *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className={inputClasses}
                placeholder="Descrieți motivul contactării sau întrebarea dumneavoastră..."
              />
            </motion.div>

            {/* Submit Status */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-green-50 border border-green-200 rounded-xl"
              >
                <div className="flex items-center gap-2 text-green-800">
                  <span className="text-xl">✅</span>
                  <span className="font-semibold">Mesaj trimis cu succes!</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Vă vom contacta în cel mai scurt timp posibil.
                </p>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-xl">❌</span>
                  <span className="font-semibold">
                    Eroare la trimiterea mesajului
                  </span>
                </div>
                <p className="text-red-700 text-sm mt-1">
                  Vă rugăm să încercați din nou sau să ne contactați telefonic.
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-end"
            >
              <AnimatedButton
                variant="primary"
                size="lg"
                className="min-w-[200px]"
                onClick={() => {}}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    <span>Se trimite...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>📧</span>
                    <span>Trimite Mesajul</span>
                  </span>
                )}
              </AnimatedButton>
            </motion.div>
          </form>

          {/* Emergency Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl animate-pulse">🚨</span>
              <div>
                <p className="font-semibold text-accent mb-1">
                  Urgențe Medicale
                </p>
                <p className="text-sm text-secondary">
                  Pentru urgențe medicale, nu folosiți acest formular. Sunați
                  imediat la <strong>112</strong> sau contactați-ne telefonic la{" "}
                  <strong>{siteConfig.contact.phoneDisplay}</strong>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </MagicCard>
    </div>
  );
}
