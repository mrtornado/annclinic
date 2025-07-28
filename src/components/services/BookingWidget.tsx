import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText, { GradientText } from "../magic-ui/AnimatedText";
import AnimatedButton from "../magic-ui/AnimatedButton";
import MagicCard from "../magic-ui/MagicCard";
import AnimatedIcon from "../magic-ui/AnimatedIcon";
import type { ServiceContent } from "../../types/content";

interface BookingWidgetProps {
  service?: ServiceContent | any; // Allow both ServiceContent and direct objects from landing pages
  specialty?: string;
  doctor?: string;
  embedded?: boolean;
  priority?: string;
  showFreeConsultation?: boolean;
  showEmergencyContact?: boolean;
}

export default function BookingWidget({
  service,
  specialty = "",
  doctor = "",
  embedded = false,
  priority = "normal",
  showFreeConsultation = false,
  showEmergencyContact = false,
}: BookingWidgetProps) {
  const [selectedStep, setSelectedStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // Handle both ServiceContent and direct objects from landing pages
  const getServiceName = () => {
    if (service?.data?.name) return service.data.name; // ServiceContent format
    if (service?.name) return service.name; // Direct object format
    return specialty || "Servicii Medicale";
  };

  const getServiceDoctors = () => {
    if (service?.data?.doctors) return service.data.doctors; // ServiceContent format
    if (service?.doctors) return service.doctors; // Direct object format
    return [];
  };

  const [formData, setFormData] = useState({
    service: getServiceName(),
    doctor: doctor,
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const steps = [
    { id: 1, title: "Alege Serviciul", icon: "🏥" },
    { id: 2, title: "Selectează Data", icon: "📅" },
    { id: 3, title: "Datele Tale", icon: "👤" },
    { id: 4, title: "Confirmare", icon: "✅" },
  ];

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

  // Check if time slot is available (mock implementation)
  const isTimeAvailable = (time: string): boolean => {
    // In a real app, this would check against a backend API
    const unavailableTimes = ["10:30", "15:00"]; // Mock unavailable times
    return !unavailableTimes.includes(time);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
          service: getServiceName(),
          doctor: doctor,
          date: "",
          time: "",
          name: "",
          phone: "",
          email: "",
          notes: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <AnimatedText delay={0.2}>
            <div className="inline-flex items-center gap-2 bg-surface-elevated/80 backdrop-blur-md text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg border border-primary/20">
              <span className="text-lg">📅</span>
              <span>Programare Online</span>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.4}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text mb-6">
              <span className="block">Programează-te pentru</span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hero-gradient-flow">
                {getServiceName()}
              </span>
            </h2>
          </AnimatedText>
        </div>

        {/* Booking Widget */}
        <AnimatedText delay={0.6}>
          <MagicCard
            className="p-8 lg:p-12"
            glowColor="rgba(13, 148, 136, 0.2)"
          >
            {/* Progress Steps with Enhanced Magic UI */}
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
                    {/* Glow effect for active step */}
                    {selectedStep >= step.id && (
                      <div className="absolute inset-0 rounded-full bg-primary/30 blur-lg animate-pulse" />
                    )}

                    {/* Step icon with animation */}
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
                          selectedStep >= step.id ? "text-white" : "text-muted"
                        }
                      />
                    </motion.div>

                    {/* Completion checkmark overlay */}
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

                  {/* Step title */}
                  <div className="ml-3 hidden sm:block">
                    <motion.p
                      className={`text-sm font-medium transition-colors duration-300 ${
                        selectedStep >= step.id ? "text-primary" : "text-muted"
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {step.title}
                    </motion.p>
                  </div>

                  {/* Progress connector */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className={`relative w-8 sm:w-16 h-1 mx-4 rounded-full overflow-hidden ${
                        selectedStep > step.id ? "bg-primary" : "bg-border"
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {/* Animated progress fill */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: selectedStep > step.id ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                        style={{ transformOrigin: "left" }}
                      />

                      {/* Shimmer effect on active progress */}
                      {selectedStep > step.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {/* Step 1: Service Selection */}
                {selectedStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <AnimatedText>
                      <h3 className="text-2xl font-bold text mb-6">
                        Confirmă serviciul selectat
                      </h3>
                    </AnimatedText>

                    <MagicCard
                      className="p-6"
                      glowColor="rgba(217, 119, 6, 0.3)"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <AnimatedIcon
                            icon="🏥"
                            size="lg"
                            color="text-primary"
                          />
                        </motion.div>
                        <div className="flex-1">
                          <motion.h4
                            className="text-xl font-semibold text mb-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <GradientText gradient="from-primary via-secondary to-accent">
                              {getServiceName()}
                            </GradientText>
                          </motion.h4>
                          <motion.p
                            className="text-secondary"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {service?.data?.description ||
                              service?.description ||
                              "Serviciu medical specializat"}
                          </motion.p>
                        </div>
                      </div>
                    </MagicCard>

                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text">
                        Selectează medicul (opțional)
                      </label>
                      <motion.select
                        className={`w-full px-4 py-3 rounded-xl border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
                          validationErrors.doctor
                            ? "border-red-500"
                            : "border-border"
                        }`}
                        value={formData.doctor}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          handleInputChange("doctor", e.target.value)
                        }
                        whileFocus={{ scale: 1.02 }}
                      >
                        <option value="">Orice medic disponibil</option>
                        {getServiceDoctors().length > 0
                          ? getServiceDoctors().map(
                              (doctor: any, index: number) => (
                                <option key={index} value={doctor.name}>
                                  {doctor.name} - {doctor.specialization}
                                </option>
                              )
                            )
                          : [
                              <option key="default1" value="Dr. Maria Popescu">
                                Dr. Maria Popescu - Specialist Principal
                              </option>,
                              <option
                                key="default2"
                                value="Dr. Alexandru Ionescu"
                              >
                                Dr. Alexandru Ionescu - Medic Specialist
                              </option>,
                            ]}
                      </motion.select>
                      {validationErrors.doctor && (
                        <motion.p
                          className="text-red-500 text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {validationErrors.doctor}
                        </motion.p>
                      )}
                    </motion.div>
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
                    <AnimatedText>
                      <h3 className="text-2xl font-bold text mb-6">
                        Alege data și ora
                      </h3>
                    </AnimatedText>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-sm font-medium text mb-3">
                          Selectează data
                        </label>
                        <motion.div className="relative">
                          <motion.input
                            type="date"
                            className={`w-full px-4 py-3 pl-12 rounded-xl border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
                              validationErrors.date
                                ? "border-red-500 focus:ring-red-500/20"
                                : "border-border"
                            }`}
                            value={formData.date}
                            onChange={(e) =>
                              handleInputChange("date", e.target.value)
                            }
                            min={new Date().toISOString().split("T")[0]}
                            whileFocus={{
                              scale: 1.02,
                              boxShadow: "0 0 0 3px rgba(13, 148, 136, 0.1)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <AnimatedIcon
                              icon="📅"
                              size="sm"
                              color={
                                validationErrors.date
                                  ? "text-red-500"
                                  : "text-primary"
                              }
                            />
                          </div>
                        </motion.div>
                        {validationErrors.date && (
                          <motion.div
                            className="flex items-center gap-2 mt-2 p-2 bg-red-50 rounded-lg border border-red-200"
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <AnimatedIcon
                              icon="⚠️"
                              size="sm"
                              color="text-red-500"
                            />
                            <span className="text-red-600 text-sm font-medium">
                              {validationErrors.date}
                            </span>
                          </motion.div>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-sm font-medium text mb-3">
                          Selectează ora
                        </label>
                        <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                          {availableTimes.map((time, index) => {
                            const isSelected = formData.time === time;
                            const isAvailable = isTimeAvailable(time);

                            return (
                              <motion.button
                                key={time}
                                className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden ${
                                  isSelected
                                    ? "bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg"
                                    : isAvailable
                                    ? "bg-surface border border-border hover:border-primary hover:bg-primary/10 hover:shadow-md"
                                    : "bg-surface-muted text-muted cursor-not-allowed"
                                }`}
                                onClick={() =>
                                  isAvailable && handleInputChange("time", time)
                                }
                                disabled={!isAvailable}
                                whileHover={
                                  isAvailable
                                    ? {
                                        scale: 1.05,
                                        y: -2,
                                        boxShadow:
                                          "0 10px 25px rgba(13, 148, 136, 0.2)",
                                      }
                                    : {}
                                }
                                whileTap={isAvailable ? { scale: 0.95 } : {}}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{
                                  delay: index * 0.05,
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20,
                                }}
                              >
                                {/* Shimmer effect for available times */}
                                {isAvailable && !isSelected && (
                                  <div className="absolute inset-0 -top-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[shimmer_0.8s_ease-out] pointer-events-none" />
                                )}

                                {/* Glow effect for selected time */}
                                {isSelected && (
                                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-primary-hover/20 blur-xl opacity-75 -z-10" />
                                )}

                                <span className="relative z-10 flex flex-col items-center">
                                  <AnimatedIcon
                                    icon="🕐"
                                    size="sm"
                                    color={
                                      isSelected ? "text-white" : "text-primary"
                                    }
                                  />
                                  <span className="mt-1">{time}</span>
                                  {!isAvailable && (
                                    <span className="text-xs opacity-75">
                                      Ocupat
                                    </span>
                                  )}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                        {validationErrors.time && (
                          <motion.div
                            className="flex items-center gap-2 mt-2 p-2 bg-red-50 rounded-lg border border-red-200"
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <AnimatedIcon
                              icon="⚠️"
                              size="sm"
                              color="text-red-500"
                            />
                            <span className="text-red-600 text-sm font-medium">
                              {validationErrors.time}
                            </span>
                          </motion.div>
                        )}
                      </motion.div>
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
                    <AnimatedText>
                      <h3 className="text-2xl font-bold text mb-6">
                        Datele tale de contact
                      </h3>
                    </AnimatedText>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-sm font-medium text mb-2">
                          Nume complet *
                        </label>
                        <motion.div className="relative">
                          <motion.input
                            type="text"
                            className={`w-full px-4 py-3 pl-12 rounded-xl border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
                              validationErrors.name
                                ? "border-red-500 focus:ring-red-500/20"
                                : "border-border"
                            }`}
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Numele tău complet"
                            whileFocus={{
                              scale: 1.02,
                              boxShadow: "0 0 0 3px rgba(13, 148, 136, 0.1)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <AnimatedIcon
                              icon="👤"
                              size="sm"
                              color={
                                validationErrors.name
                                  ? "text-red-500"
                                  : "text-primary"
                              }
                            />
                          </div>
                        </motion.div>
                        {validationErrors.name && (
                          <motion.div
                            className="flex items-center gap-2 mt-2 p-2 bg-red-50 rounded-lg border border-red-200"
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <AnimatedIcon
                              icon="⚠️"
                              size="sm"
                              color="text-red-500"
                            />
                            <span className="text-red-600 text-sm font-medium">
                              {validationErrors.name}
                            </span>
                          </motion.div>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-sm font-medium text mb-2">
                          Telefon *
                        </label>
                        <motion.div className="relative">
                          <motion.input
                            type="tel"
                            className={`w-full px-4 py-3 pl-12 rounded-xl border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
                              validationErrors.phone
                                ? "border-red-500 focus:ring-red-500/20"
                                : "border-border"
                            }`}
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            placeholder="+40 123 456 789"
                            whileFocus={{
                              scale: 1.02,
                              boxShadow: "0 0 0 3px rgba(13, 148, 136, 0.1)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <AnimatedIcon
                              icon="📱"
                              size="sm"
                              color={
                                validationErrors.phone
                                  ? "text-red-500"
                                  : "text-primary"
                              }
                            />
                          </div>
                        </motion.div>
                        {validationErrors.phone && (
                          <motion.div
                            className="flex items-center gap-2 mt-2 p-2 bg-red-50 rounded-lg border border-red-200"
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <AnimatedIcon
                              icon="⚠️"
                              size="sm"
                              color="text-red-500"
                            />
                            <span className="text-red-600 text-sm font-medium">
                              {validationErrors.phone}
                            </span>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-medium text mb-2">
                        Email *
                      </label>
                      <motion.div className="relative">
                        <motion.input
                          type="email"
                          className={`w-full px-4 py-3 pl-12 rounded-xl border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
                            validationErrors.email
                              ? "border-red-500 focus:ring-red-500/20"
                              : "border-border"
                          }`}
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="email@exemplu.com"
                          whileFocus={{
                            scale: 1.02,
                            boxShadow: "0 0 0 3px rgba(13, 148, 136, 0.1)",
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <AnimatedIcon
                            icon="📧"
                            size="sm"
                            color={
                              validationErrors.email
                                ? "text-red-500"
                                : "text-primary"
                            }
                          />
                        </div>
                      </motion.div>
                      {validationErrors.email && (
                        <motion.div
                          className="flex items-center gap-2 mt-2 p-2 bg-red-50 rounded-lg border border-red-200"
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <AnimatedIcon
                            icon="⚠️"
                            size="sm"
                            color="text-red-500"
                          />
                          <span className="text-red-600 text-sm font-medium">
                            {validationErrors.email}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-medium text mb-2">
                        Observații (opțional)
                      </label>
                      <motion.div className="relative">
                        <motion.textarea
                          className="w-full px-4 py-3 pl-12 rounded-xl border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-24 resize-none"
                          value={formData.notes}
                          onChange={(e) =>
                            handleInputChange("notes", e.target.value)
                          }
                          placeholder="Detalii suplimentare despre programare..."
                          whileFocus={{
                            scale: 1.02,
                            boxShadow: "0 0 0 3px rgba(13, 148, 136, 0.1)",
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                        <div className="absolute left-3 top-3">
                          <AnimatedIcon
                            icon="📝"
                            size="sm"
                            color="text-primary"
                          />
                        </div>
                      </motion.div>
                    </motion.div>
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
                    {isSuccess ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-12"
                      >
                        {/* Success Icon with Celebration Animation */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{
                            scale: [0, 1.2, 1],
                            rotate: [0, 360, 0],
                          }}
                          transition={{
                            delay: 0.2,
                            duration: 0.8,
                            type: "spring",
                            stiffness: 200,
                          }}
                          className="relative w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                        >
                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-full bg-green-400/30 blur-xl animate-pulse" />

                          {/* Success checkmark */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 0.6,
                              type: "spring",
                              stiffness: 300,
                            }}
                          >
                            <AnimatedIcon
                              icon="✅"
                              size="xl"
                              color="text-green-600"
                            />
                          </motion.div>

                          {/* Celebration particles */}
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-green-400 rounded-full"
                              initial={{
                                scale: 0,
                                x: 0,
                                y: 0,
                                opacity: 1,
                              }}
                              animate={{
                                scale: [0, 1, 0],
                                x: Math.cos((i * 60 * Math.PI) / 180) * 40,
                                y: Math.sin((i * 60 * Math.PI) / 180) * 40,
                                opacity: [1, 1, 0],
                              }}
                              transition={{
                                delay: 0.8 + i * 0.1,
                                duration: 1,
                                ease: "easeOut",
                              }}
                            />
                          ))}
                        </motion.div>

                        {/* Success Messages with Staggered Animation */}
                        <AnimatedText delay={0.4}>
                          <motion.h3
                            className="text-2xl font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            <GradientText gradient="from-green-600 via-green-500 to-emerald-600">
                              Programarea a fost înregistrată cu succes!
                            </GradientText>
                          </motion.h3>
                        </AnimatedText>

                        <AnimatedText delay={0.8}>
                          <motion.p
                            className="text-secondary text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                          >
                            Vă vom contacta în curând pentru confirmare.
                          </motion.p>
                        </AnimatedText>

                        {/* Additional success details */}
                        <motion.div
                          className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          <AnimatedText delay={1.4}>
                            <div className="flex items-center justify-center gap-2 text-green-700">
                              <AnimatedIcon
                                icon="📞"
                                size="sm"
                                color="text-green-600"
                              />
                              <span className="text-sm font-medium">
                                Veți fi contactați în maxim 2 ore lucrătoare
                              </span>
                            </div>
                          </AnimatedText>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <>
                        <AnimatedText>
                          <h3 className="text-2xl font-bold text mb-6">
                            Confirmă programarea
                          </h3>
                        </AnimatedText>

                        <MagicCard
                          className="p-6"
                          glowColor="rgba(34, 197, 94, 0.3)"
                        >
                          <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {[
                              { label: "Serviciu", value: formData.service },
                              ...(formData.doctor
                                ? [{ label: "Medic", value: formData.doctor }]
                                : []),
                              { label: "Data", value: formData.date },
                              { label: "Ora", value: formData.time },
                              { label: "Nume", value: formData.name },
                              { label: "Telefon", value: formData.phone },
                              { label: "Email", value: formData.email },
                            ].map((item, index) => (
                              <motion.div
                                key={item.label}
                                className="flex justify-between"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <span className="font-medium text">
                                  {item.label}:
                                </span>
                                <span className="text-secondary">
                                  {item.value}
                                </span>
                              </motion.div>
                            ))}
                          </motion.div>
                        </MagicCard>

                        <motion.div
                          className="bg-accent/10 border border-accent/20 rounded-xl p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <p className="text-sm text-secondary">
                            <strong>Notă:</strong> Programarea va fi confirmată
                            telefonic în maxim 2 ore lucrătoare. Vă rugăm să
                            fiți disponibili la numărul de telefon furnizat.
                          </p>
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {!isSuccess && (
              <motion.div
                className="flex justify-between items-center mt-12 pt-8 border-t border-border/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <AnimatedButton
                  onClick={prevStep}
                  variant="outline"
                  size="lg"
                  className={
                    selectedStep === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }
                >
                  <span className="flex items-center gap-2">
                    <motion.span
                      className="text-lg"
                      whileHover={{ x: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      ←
                    </motion.span>
                    <span>Înapoi</span>
                  </span>
                </AnimatedButton>

                {selectedStep < 4 ? (
                  <AnimatedButton
                    onClick={nextStep}
                    variant="primary"
                    size="lg"
                  >
                    <span className="flex items-center gap-2">
                      <span>Continuă</span>
                      <motion.span
                        className="text-lg"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        →
                      </motion.span>
                    </span>
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    onClick={handleSubmit}
                    variant="primary"
                    size="lg"
                    className={
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }
                  >
                    <span className="flex items-center gap-2">
                      {isSubmitting ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      ) : (
                        <motion.span
                          className="text-lg"
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          ✅
                        </motion.span>
                      )}
                      <span>
                        {isSubmitting
                          ? "Se procesează..."
                          : "Confirmă Programarea"}
                      </span>
                    </span>
                  </AnimatedButton>
                )}
              </motion.div>
            )}
          </MagicCard>
        </AnimatedText>
      </div>
    </section>
  );
}
