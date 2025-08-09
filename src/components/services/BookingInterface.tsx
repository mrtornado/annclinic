import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText, { GradientText } from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedIcon from "../magic-ui/AnimatedIcon";
import FloatingParticles from "../magic-ui/FloatingParticles";
import { siteConfig } from "../../config/site";
import type { ServiceContent } from "../../types/content";

interface BookingHistoryItem {
  id: string;
  date: string;
  time: string;
  service: string;
  status: "completed" | "upcoming" | "cancelled";
}

interface BookingInterfaceProps {
  services: ServiceContent[];
  showHistory?: boolean;
  showEmergencyContact?: boolean;
  preselectedService?: string;
}

export default function BookingInterface({
  services,
  showHistory = true,
  showEmergencyContact = true,
  preselectedService = "",
}: BookingInterfaceProps) {
  const [selectedStep, setSelectedStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [formData, setFormData] = useState({
    service: preselectedService,
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
    isReturningPatient: false,
    patientId: "",
  });

  // Filtrez serviciile disponibile (care nu sunt "coming soon")
  const availableServices = services
    .filter((service) => !service.data.comingSoon)
    .map((service) => {
      // Mapare de iconuri text la emoji
      const iconMap: Record<string, string> = {
        skin: "🧴",
        lab: "🧪",
        surgical: "🔪",
        flower: "🌸",
        "child-medical": "👶",
        sparkles: "✨",
        stethoscope: "🩺",
        "work-safety": "⚒️",
        family: "👨‍👩‍👧‍👦",
        brain: "🧠",
      };

      return {
        id: service.slug,
        name: service.data.name,
        icon: iconMap[service.data.icon] || "🏥",
        description: service.data.description,
      };
    });

  // Mock booking history
  const [bookingHistory] = useState<BookingHistoryItem[]>([
    {
      id: "1",
      date: "2024-01-15",
      time: "10:00",
      service: "Cardiologie",
      status: "completed",
    },
    {
      id: "2",
      date: "2024-02-20",
      time: "14:30",
      service: "Dermatologie",
      status: "upcoming",
    },
  ]);

  const availableTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  const steps = [
    { id: 1, title: "Serviciu", icon: "🏥" },
    { id: 2, title: "Data & Ora", icon: "📅" },
    { id: 3, title: "Datele Tale", icon: "👤" },
    { id: 4, title: "Confirmare", icon: "✅" },
  ];

  // Validation functions
  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.service) errors.service = "Selectați un serviciu";
        break;
      case 2:
        if (!formData.date) errors.date = "Selectați o dată";
        if (!formData.time) errors.time = "Selectați o oră";
        break;
      case 3:
        if (!formData.name.trim()) errors.name = "Numele este obligatoriu";
        if (!formData.phone.trim()) errors.phone = "Telefonul este obligatoriu";
        if (!formData.email.trim()) errors.email = "Email-ul este obligatoriu";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
          errors.email = "Email invalid";
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const nextStep = () => {
    if (validateStep(selectedStep) && selectedStep < 4) {
      setSelectedStep(selectedStep + 1);
    }
  };

  const prevStep = () => {
    if (selectedStep > 1) {
      setSelectedStep(selectedStep - 1);
      setValidationErrors({});
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Booking data:", formData);
      setIsSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedStep(1);
        setFormData({
          service: preselectedService,
          date: "",
          time: "",
          name: "",
          phone: "",
          email: "",
          notes: "",
          isReturningPatient: false,
          patientId: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTimeAvailable = (time: string): boolean => {
    // Mock availability check
    const unavailableTimes = ["10:30", "15:00"];
    return !unavailableTimes.includes(time);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-surface via-surface-secondary to-surface overflow-hidden">
      {/* Background Effects */}
      <FloatingParticles
        count={20}
        colors={["#0d9488", "#14b8a6", "#d97706"]}
      />

      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <AnimatedText delay={0.2}>
            <div className="inline-flex items-center gap-2 bg-surface-elevated/80 backdrop-blur-md text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg border border-primary/20">
              <AnimatedIcon icon="📅" size="sm" color="text-primary" />
              <span>Programare Online</span>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.4}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text mb-6">
              <span className="block">Programează-te</span>
              <GradientText gradient="from-primary via-secondary to-accent">
                Rapid și Simplu
              </GradientText>
            </h1>
          </AnimatedText>

          <AnimatedText delay={0.6}>
            <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
              Rezervă consultația ta medicală online în doar câțiva pași.
              Confirmarea se face instant și primești toate detaliile pe email.
            </p>
          </AnimatedText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Booking Interface */}
          <div className="lg:col-span-3">
            <AnimatedText delay={0.8}>
              <MagicCard
                className="p-8 lg:p-12"
                glowColor="rgba(13, 148, 136, 0.2)"
              >
                {/* Progress Steps */}
                <div className="flex justify-between items-center mb-12">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <motion.div
                        className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
                          selectedStep >= step.id
                            ? "bg-gradient-to-br from-primary to-primary-hover text-white shadow-lg"
                            : "bg-surface border-2 border-border text-muted hover:border-primary/50"
                        }`}
                        whileHover={{
                          scale: 1.05,
                          boxShadow:
                            selectedStep >= step.id
                              ? "0 10px 25px rgba(13, 148, 136, 0.3)"
                              : "0 5px 15px rgba(0, 0, 0, 0.1)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {selectedStep >= step.id && (
                          <div className="absolute inset-0 rounded-full bg-primary/30 blur-lg animate-pulse" />
                        )}

                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 300,
                          }}
                          className="relative z-10"
                        >
                          <AnimatedIcon
                            icon={step.icon}
                            size="md"
                            color={
                              selectedStep >= step.id
                                ? "text-white"
                                : "text-muted"
                            }
                          />
                        </motion.div>

                        {selectedStep > step.id && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                          >
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                              <AnimatedIcon
                                icon="✓"
                                size="sm"
                                color="text-primary"
                              />
                            </div>
                          </motion.div>
                        )}
                      </motion.div>

                      <div className="ml-3 hidden sm:block">
                        <motion.p
                          className={`text-sm font-medium transition-colors duration-300 ${
                            selectedStep >= step.id
                              ? "text-primary"
                              : "text-muted"
                          }`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          {step.title}
                        </motion.p>
                      </div>

                      {index < steps.length - 1 && (
                        <motion.div
                          className={`relative w-8 sm:w-16 h-1 mx-4 rounded-full overflow-hidden ${
                            selectedStep > step.id ? "bg-primary" : "bg-border"
                          }`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: selectedStep > step.id ? 1 : 0 }}
                            transition={{
                              duration: 0.8,
                              delay: index * 0.1 + 0.3,
                            }}
                            style={{ transformOrigin: "left" }}
                          />
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                <div className="min-h-[500px]">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Service Selection */}
                    {selectedStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        <h3 className="text-2xl font-bold text mb-6">
                          Alege serviciul medical
                        </h3>

                        {/* Service Selection */}
                        <div>
                          <label className="block text-sm font-medium text mb-4">
                            Selectează serviciul medical *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availableServices.map((service, index) => (
                              <motion.button
                                key={service.id}
                                className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                                  formData.service === service.name
                                    ? "border-primary bg-primary/10 shadow-lg"
                                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                                }`}
                                onClick={() =>
                                  handleInputChange("service", service.name)
                                }
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="text-2xl">{service.icon}</div>
                                  <div>
                                    <h4 className="font-semibold text">
                                      {service.name}
                                    </h4>
                                    <p className="text-sm text-secondary">
                                      {service.description}
                                    </p>
                                  </div>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                          {validationErrors.service && (
                            <motion.p
                              className="text-red-500 text-sm mt-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              {validationErrors.service}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Date & Time Selection */}
                    {selectedStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl font-bold text mb-6">
                          Alege data și ora
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text mb-3">
                              Selectează data *
                            </label>
                            <div className="relative">
                              <input
                                type="date"
                                className={`w-full px-4 py-3 pl-12 rounded-xl border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
                                  validationErrors.date
                                    ? "border-red-500"
                                    : "border-border"
                                }`}
                                value={formData.date}
                                onChange={(e) =>
                                  handleInputChange("date", e.target.value)
                                }
                                min={new Date().toISOString().split("T")[0]}
                              />
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <AnimatedIcon
                                  icon="📅"
                                  size="sm"
                                  color="text-primary"
                                />
                              </div>
                            </div>
                            {validationErrors.date && (
                              <p className="text-red-500 text-sm mt-2">
                                {validationErrors.date}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text mb-3">
                              Selectează ora *
                            </label>
                            <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                              {availableTimes.map((time, index) => {
                                const isSelected = formData.time === time;
                                const isAvailable = isTimeAvailable(time);

                                return (
                                  <motion.button
                                    key={time}
                                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                      isSelected
                                        ? "bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg"
                                        : isAvailable
                                        ? "bg-surface border border-border hover:border-primary hover:bg-primary/10"
                                        : "bg-surface-secondary text-muted cursor-not-allowed"
                                    }`}
                                    onClick={() =>
                                      isAvailable &&
                                      handleInputChange("time", time)
                                    }
                                    disabled={!isAvailable}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={
                                      isAvailable ? { scale: 1.05, y: -2 } : {}
                                    }
                                    whileTap={
                                      isAvailable ? { scale: 0.95 } : {}
                                    }
                                  >
                                    {time}
                                    {!isAvailable && (
                                      <div className="text-xs">Ocupat</div>
                                    )}
                                  </motion.button>
                                );
                              })}
                            </div>
                            {validationErrors.time && (
                              <p className="text-red-500 text-sm mt-2">
                                {validationErrors.time}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Personal Information */}
                    {selectedStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl font-bold text mb-6">
                          Datele tale de contact
                        </h3>

                        {/* Returning Patient Toggle */}
                        <div className="flex items-center gap-3 p-4 bg-surface-elevated rounded-xl">
                          <input
                            type="checkbox"
                            id="returningPatient"
                            checked={formData.isReturningPatient}
                            onChange={(e) =>
                              handleInputChange(
                                "isReturningPatient",
                                e.target.checked
                              )
                            }
                            className="w-5 h-5 text-primary border-border rounded focus:ring-primary/20"
                          />
                          <label
                            htmlFor="returningPatient"
                            className="text-sm font-medium text"
                          >
                            Sunt pacient existent (am mai fost la clinică)
                          </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text mb-2">
                              Nume complet *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                className={`w-full px-4 py-3 pl-12 rounded-xl border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
                                  validationErrors.name
                                    ? "border-red-500"
                                    : "border-border"
                                }`}
                                value={formData.name}
                                onChange={(e) =>
                                  handleInputChange("name", e.target.value)
                                }
                                placeholder="Numele tău complet"
                              />
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <AnimatedIcon
                                  icon="👤"
                                  size="sm"
                                  color="text-primary"
                                />
                              </div>
                            </div>
                            {validationErrors.name && (
                              <p className="text-red-500 text-sm mt-2">
                                {validationErrors.name}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text mb-2">
                              Telefon *
                            </label>
                            <div className="relative">
                              <input
                                type="tel"
                                className={`w-full px-4 py-3 pl-12 rounded-xl border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
                                  validationErrors.phone
                                    ? "border-red-500"
                                    : "border-border"
                                }`}
                                value={formData.phone}
                                onChange={(e) =>
                                  handleInputChange("phone", e.target.value)
                                }
                                placeholder="+40 123 456 789"
                              />
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <AnimatedIcon
                                  icon="📱"
                                  size="sm"
                                  color="text-primary"
                                />
                              </div>
                            </div>
                            {validationErrors.phone && (
                              <p className="text-red-500 text-sm mt-2">
                                {validationErrors.phone}
                              </p>
                            )}
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text mb-2">
                              Email *
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                className={`w-full px-4 py-3 pl-12 rounded-xl border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
                                  validationErrors.email
                                    ? "border-red-500"
                                    : "border-border"
                                }`}
                                value={formData.email}
                                onChange={(e) =>
                                  handleInputChange("email", e.target.value)
                                }
                                placeholder="email@exemplu.ro"
                              />
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <AnimatedIcon
                                  icon="📧"
                                  size="sm"
                                  color="text-primary"
                                />
                              </div>
                            </div>
                            {validationErrors.email && (
                              <p className="text-red-500 text-sm mt-2">
                                {validationErrors.email}
                              </p>
                            )}
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text mb-2">
                              Observații (opțional)
                            </label>
                            <textarea
                              className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                              rows={4}
                              value={formData.notes}
                              onChange={(e) =>
                                handleInputChange("notes", e.target.value)
                              }
                              placeholder="Menționează orice informații relevante pentru consultație..."
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Confirmation */}
                    {selectedStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl font-bold text mb-6">
                          Confirmă programarea
                        </h3>

                        <MagicCard
                          className="p-6"
                          glowColor="rgba(217, 119, 6, 0.3)"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <AnimatedIcon
                                icon="🏥"
                                size="lg"
                                color="text-primary"
                              />
                              <div>
                                <h4 className="font-semibold text">Serviciu</h4>
                                <p className="text-secondary">
                                  {formData.service}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <AnimatedIcon
                                icon="📅"
                                size="lg"
                                color="text-primary"
                              />
                              <div>
                                <h4 className="font-semibold text">
                                  Data și ora
                                </h4>
                                <p className="text-secondary">
                                  {new Date(formData.date).toLocaleDateString(
                                    "ro-RO",
                                    {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}{" "}
                                  la {formData.time}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <AnimatedIcon
                                icon="👤"
                                size="lg"
                                color="text-primary"
                              />
                              <div>
                                <h4 className="font-semibold text">Pacient</h4>
                                <p className="text-secondary">
                                  {formData.name} • {formData.phone} •{" "}
                                  {formData.email}
                                </p>
                              </div>
                            </div>

                            {formData.notes && (
                              <div className="flex items-start gap-4">
                                <AnimatedIcon
                                  icon="📝"
                                  size="lg"
                                  color="text-primary"
                                />
                                <div>
                                  <h4 className="font-semibold text">
                                    Observații
                                  </h4>
                                  <p className="text-secondary">
                                    {formData.notes}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </MagicCard>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <AnimatedIcon
                              icon="ℹ️"
                              size="md"
                              color="text-blue-600"
                            />
                            <div>
                              <h4 className="font-semibold text-blue-800 mb-2">
                                Informații importante
                              </h4>
                              <ul className="text-sm text-blue-700 space-y-1">
                                <li>
                                  • Vei primi confirmarea pe email în câteva
                                  minute
                                </li>
                                <li>
                                  • Te rugăm să ajungi cu 15 minute înainte de
                                  programare
                                </li>
                                <li>
                                  • Adu cu tine actul de identitate și cardul de
                                  sănătate
                                </li>
                                <li>
                                  • Pentru anulări, contactează-ne cu cel puțin
                                  24h înainte
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                  <div>
                    {selectedStep > 1 && (
                      <AnimatedButton
                        variant="outline"
                        size="lg"
                        onClick={prevStep}
                      >
                        ← Înapoi
                      </AnimatedButton>
                    )}
                  </div>

                  <div>
                    {selectedStep < 4 ? (
                      <AnimatedButton
                        variant="primary"
                        size="lg"
                        onClick={nextStep}
                      >
                        Continuă →
                      </AnimatedButton>
                    ) : (
                      <AnimatedButton
                        variant="primary"
                        size="lg"
                        onClick={handleSubmit}
                        className={
                          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Se procesează...
                          </div>
                        ) : (
                          "📅 Confirmă Programarea"
                        )}
                      </AnimatedButton>
                    )}
                  </div>
                </div>
              </MagicCard>
            </AnimatedText>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contact */}
            {showEmergencyContact && (
              <AnimatedText delay={1.0}>
                <MagicCard className="p-6" glowColor="rgba(239, 68, 68, 0.2)">
                  <div className="text-center">
                    <AnimatedIcon icon="🚨" size="xl" color="text-red-500" />
                    <h3 className="text-lg font-bold text mt-3 mb-2">
                      Urgență Medicală?
                    </h3>
                    <p className="text-sm text-secondary mb-4">
                      Pentru situații urgente, contactează-ne imediat
                    </p>
                    <AnimatedButton
                      variant="primary"
                      size="md"
                      href={`tel:${siteConfig.contact.phone}`}
                      className="w-full bg-red-500 hover:bg-red-600"
                    >
                      📞 Sună Acum
                    </AnimatedButton>
                  </div>
                </MagicCard>
              </AnimatedText>
            )}

            {/* Booking History */}
            {showHistory && bookingHistory.length > 0 && (
              <AnimatedText delay={1.2}>
                <MagicCard className="p-6" glowColor="rgba(13, 148, 136, 0.2)">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text">
                      Programările Tale
                    </h3>
                    <AnimatedButton
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHistoryPanel(!showHistoryPanel)}
                    >
                      {showHistoryPanel ? "Ascunde" : "Vezi toate"}
                    </AnimatedButton>
                  </div>

                  <AnimatePresence>
                    {showHistoryPanel && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        {bookingHistory.map((booking) => (
                          <div
                            key={booking.id}
                            className="p-3 bg-surface-elevated rounded-lg border border-border"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text text-sm">
                                  {booking.service}
                                </p>

                                <p className="text-xs text-secondary">
                                  {new Date(booking.date).toLocaleDateString(
                                    "ro-RO"
                                  )}{" "}
                                  • {booking.time}
                                </p>
                              </div>
                              <div
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  booking.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "upcoming"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {booking.status === "completed"
                                  ? "Finalizat"
                                  : booking.status === "upcoming"
                                  ? "Programat"
                                  : "Anulat"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </MagicCard>
              </AnimatedText>
            )}

            {/* Contact Info */}
            <AnimatedText delay={1.4}>
              <MagicCard className="p-6" glowColor="rgba(217, 119, 6, 0.2)">
                <h3 className="text-lg font-bold text mb-4">
                  Informații Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <AnimatedIcon icon="📍" size="sm" color="text-primary" />
                    <div>
                      <p className="text-sm font-medium text">Adresa</p>
                      <p className="text-xs text-secondary">
                        {siteConfig.address.street} {siteConfig.address.number},{" "}
                        {siteConfig.address.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AnimatedIcon icon="📞" size="sm" color="text-primary" />
                    <div>
                      <p className="text-sm font-medium text">Telefon</p>
                      <p className="text-xs text-secondary">
                        {siteConfig.contact.phoneDisplay}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AnimatedIcon icon="🕒" size="sm" color="text-primary" />
                    <div>
                      <p className="text-sm font-medium text">Program</p>
                      <p className="text-xs text-secondary">
                        Luni - Vineri: {siteConfig.schedule.weekdays}
                        <br />
                        Sâmbătă: {siteConfig.schedule.saturday}
                      </p>
                    </div>
                  </div>
                </div>
              </MagicCard>
            </AnimatedText>
          </div>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-surface rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                >
                  <AnimatedIcon icon="✅" size="xl" color="text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text mt-4 mb-2">
                  Programare Confirmată!
                </h3>
                <p className="text-secondary mb-6">
                  Vei primi confirmarea pe email în câteva minute. Te așteptăm!
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-secondary">
                  <AnimatedIcon icon="📧" size="sm" color="text-primary" />
                  <span>Verifică-ți emailul pentru detalii</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
