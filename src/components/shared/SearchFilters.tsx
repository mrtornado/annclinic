import { useState, useEffect } from "react";
import Select from "react-select";
import type { StylesConfig, ThemeConfig } from "react-select";
import { useSearch } from "./SearchProvider";
import AnimatedButton from "../magic-ui/AnimatedButton";
import AnimatedText from "../magic-ui/AnimatedText";
import AnimatedIcon from "../magic-ui/AnimatedIcon";
import MagicCard from "../magic-ui/MagicCard";

interface SearchFiltersProps {
  className?: string;
  variant?: "sidebar" | "horizontal" | "compact";
}

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

export default function SearchFilters({
  className = "",
  variant = "sidebar",
}: SearchFiltersProps) {
  const { filters, setFilters, clearFilters, services, doctors } = useSearch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme === "dark");
    };

    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Extract unique specialties from services and doctors
  const specialties = Array.from(
    new Set([
      ...services.map((service) => service.data.name),
      ...doctors.flatMap((doctor) => doctor.data.specialties || []),
    ])
  ).sort();

  // Options for select components
  const specialtyOptions: SelectOption[] = [
    { value: "", label: "Toate specialitățile", icon: "🏥" },
    ...specialties.map((specialty) => ({
      value: specialty,
      label: specialty,
      icon: getSpecialtyIcon(specialty),
      description: getSpecialtyDescription(specialty),
    })),
  ];

  const availabilityOptions: SelectOption[] = [
    { value: "", label: "Orice disponibilitate", icon: "⏰" },
    {
      value: "available",
      label: "Disponibil acum",
      icon: "✅",
      description: "Poate fi programat imediat",
    },
    {
      value: "busy",
      label: "Ocupat",
      icon: "🔴",
      description: "Nu este disponibil momentan",
    },
  ];

  const serviceTypeOptions: SelectOption[] = [
    { value: "", label: "Toate tipurile", icon: "🏥" },
    {
      value: "consultation",
      label: "Consultații",
      icon: "👨‍⚕️",
      description: "Examinări și diagnostice",
    },
    {
      value: "investigation",
      label: "Investigații",
      icon: "🔬",
      description: "Analize și teste medicale",
    },
    {
      value: "treatment",
      label: "Tratamente",
      icon: "💊",
      description: "Proceduri terapeutice",
    },
  ];

  const locationOptions: SelectOption[] = [
    { value: "", label: "Toate locațiile", icon: "📍" },
    {
      value: "bucurești",
      label: "București",
      icon: "🏙️",
      description: "Centrul principal",
    },
    {
      value: "bragadiru",
      label: "Bragadiru",
      icon: "🏘️",
      description: "Sucursala din Bragadiru",
    },
  ];

  function getSpecialtyIcon(specialty: string): string {
    const iconMap: Record<string, string> = {
      Cardiologie: "❤️",
      Dermatologie: "🧴",
      Ginecologie: "🌸",
      Pediatrie: "👶",
      Neurologie: "🧠",
      Oftalmologie: "👁️",
      ORL: "👂",
      Ortopedie: "🦴",
      Urologie: "💧",
      "Estetică Facială": "✨",
    };
    return iconMap[specialty] || "🏥";
  }

  function getSpecialtyDescription(specialty: string): string {
    const descMap: Record<string, string> = {
      Cardiologie: "Boli de inimă și sistem cardiovascular",
      Dermatologie: "Afecțiuni ale pielii și estetică",
      Ginecologie: "Sănătatea femeii și reproducere",
      Pediatrie: "Medicina copiilor și adolescenților",
      Neurologie: "Sistemul nervos și creier",
      Oftalmologie: "Sănătatea ochilor și vederii",
      ORL: "Urechi, nas și gât",
      Ortopedie: "Oase, articulații și mușchi",
      Urologie: "Sistemul urinar și genital",
      "Estetică Facială": "Tratamente de înfrumusețare",
    };
    return descMap[specialty] || "Servicii medicale specializate";
  }

  // Custom styles for react-select with theme support
  const getSelectStyles = (): StylesConfig<SelectOption, false> => ({
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDark ? "#1e293b" : "#ffffff",
      borderColor: state.isFocused ? "#1e40af" : isDark ? "#374151" : "#d1d5db",
      borderRadius: "0.75rem",
      boxShadow: state.isFocused
        ? `0 0 0 2px ${
            isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(30, 64, 175, 0.2)"
          }`
        : "none",
      minHeight: "44px",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: "#1e40af",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDark ? "#1e293b" : "#ffffff",
      border: isDark ? "1px solid #374151" : "1px solid #d1d5db",
      borderRadius: "0.75rem",
      boxShadow: isDark
        ? "0 10px 25px rgba(0, 0, 0, 0.5)"
        : "0 10px 25px rgba(0, 0, 0, 0.15)",
      zIndex: 9999,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0.5rem",
      borderRadius: "0.75rem",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#1e40af"
        : state.isFocused
        ? isDark
          ? "#374151"
          : "#f3f4f6"
        : "transparent",
      color: state.isSelected ? "#ffffff" : isDark ? "#f9fafb" : "#1f2937",
      borderRadius: "0.5rem",
      padding: "0.75rem",
      margin: "0.125rem 0",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: state.isSelected
          ? "#1d4ed8"
          : isDark
          ? "#374151"
          : "#f3f4f6",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDark ? "#9ca3af" : "#6b7280",
      fontSize: "0.875rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDark ? "#f9fafb" : "#1f2937",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    }),
    input: (provided) => ({
      ...provided,
      color: isDark ? "#f9fafb" : "#1f2937",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: isDark ? "#374151" : "#d1d5db",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: isDark ? "#9ca3af" : "#6b7280",
      "&:hover": {
        color: "#1e40af",
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: isDark ? "#9ca3af" : "#6b7280",
      "&:hover": {
        color: "#dc2626",
      },
    }),
  });

  // Custom theme for react-select
  const selectTheme = {
    borderRadius: 12,
    spacing: {
      baseUnit: 4,
      controlHeight: 44,
      menuGutter: 8,
    },
    colors: {
      primary: "#1e40af",
      primary75: "#1d4ed8",
      primary50: "#3b82f6",
      primary25: "#dbeafe",
      danger: "#dc2626",
      dangerLight: "#fee2e2",
      neutral0: isDark ? "#1e293b" : "#ffffff",
      neutral5: isDark ? "#334155" : "#f8fafc",
      neutral10: isDark ? "#374151" : "#f1f5f9",
      neutral20: isDark ? "#4b5563" : "#e2e8f0",
      neutral30: isDark ? "#6b7280" : "#cbd5e1",
      neutral40: isDark ? "#9ca3af" : "#94a3b8",
      neutral50: isDark ? "#d1d5db" : "#64748b",
      neutral60: isDark ? "#e5e7eb" : "#475569",
      neutral70: isDark ? "#f3f4f6" : "#334155",
      neutral80: isDark ? "#f9fafb" : "#1e293b",
      neutral90: isDark ? "#ffffff" : "#0f172a",
    },
  };

  // Custom option component to display icons
  const formatOptionLabel = (option: SelectOption) => (
    <div className="flex items-center gap-3">
      <span className="text-lg">{option.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">{option.label}</div>
        {option.description && (
          <div
            className={`text-xs mt-0.5 truncate ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {option.description}
          </div>
        )}
      </div>
    </div>
  );

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(Boolean).length;
  };

  // Compact variant for mobile/header
  if (variant === "compact") {
    return (
      <div className={`relative ${className}`}>
        <AnimatedButton
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          size="sm"
          className={`flex items-center gap-2 ${
            isDark
              ? "bg-gray-800 border-gray-600 text-gray-200 hover:border-blue-400"
              : "bg-white border-gray-200 text-gray-800 hover:border-blue-500"
          } shadow-sm transition-all duration-200`}
        >
          <AnimatedIcon icon="🔧" size="sm" />
          <span className="font-medium">Filtre</span>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center font-medium">
              {getActiveFiltersCount()}
            </span>
          )}
        </AnimatedButton>

        {isExpanded && (
          <div
            className={`absolute top-full left-0 right-0 mt-2 ${
              isDark
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-200"
            } border rounded-xl shadow-2xl z-50 p-4 min-w-[320px]`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4
                  className={`text-sm font-semibold ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Filtrează rezultatele
                </h4>
                {getActiveFiltersCount() > 0 && (
                  <AnimatedButton
                    onClick={clearFilters}
                    variant="outline"
                    size="sm"
                    className={`text-xs ${
                      isDark
                        ? "text-gray-400 hover:text-red-400 border-gray-600"
                        : "text-gray-500 hover:text-red-500 border-gray-300"
                    }`}
                  >
                    Șterge toate
                  </AnimatedButton>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Select
                  instanceId="specialty-compact"
                  options={specialtyOptions.slice(0, 6)}
                  value={specialtyOptions.find(
                    (opt) => opt.value === (filters.specialty || "")
                  )}
                  onChange={(option) =>
                    setFilters({ specialty: option?.value || undefined })
                  }
                  placeholder="Selectează specialitatea"
                  isClearable
                  isSearchable
                  styles={getSelectStyles()}
                  theme={selectTheme}
                  formatOptionLabel={formatOptionLabel}
                  noOptionsMessage={() => "Nu s-au găsit specialități"}
                />

                <Select
                  instanceId="availability-compact"
                  options={availabilityOptions}
                  value={availabilityOptions.find(
                    (opt) => opt.value === (filters.availability || "")
                  )}
                  onChange={(option) =>
                    setFilters({
                      availability: (option?.value as any) || undefined,
                    })
                  }
                  placeholder="Disponibilitate"
                  isClearable
                  styles={getSelectStyles()}
                  theme={selectTheme}
                  formatOptionLabel={formatOptionLabel}
                  noOptionsMessage={() => "Nu s-au găsit opțiuni"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Horizontal variant for search results page
  if (variant === "horizontal") {
    return (
      <div
        className={`${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        } border-b pb-6 mb-6 ${className}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            instanceId="specialty-horizontal"
            options={specialtyOptions}
            value={specialtyOptions.find(
              (opt) => opt.value === (filters.specialty || "")
            )}
            onChange={(option) =>
              setFilters({ specialty: option?.value || undefined })
            }
            placeholder="Specialitate"
            isClearable
            isSearchable
            styles={getSelectStyles()}
            theme={selectTheme}
            formatOptionLabel={formatOptionLabel}
            noOptionsMessage={() => "Nu s-au găsit specialități"}
          />

          <Select
            instanceId="availability-horizontal"
            options={availabilityOptions}
            value={availabilityOptions.find(
              (opt) => opt.value === (filters.availability || "")
            )}
            onChange={(option) =>
              setFilters({ availability: (option?.value as any) || undefined })
            }
            placeholder="Disponibilitate"
            isClearable
            styles={getSelectStyles()}
            theme={selectTheme}
            formatOptionLabel={formatOptionLabel}
            noOptionsMessage={() => "Nu s-au găsit opțiuni"}
          />

          <Select
            instanceId="service-type-horizontal"
            options={serviceTypeOptions}
            value={serviceTypeOptions.find(
              (opt) => opt.value === (filters.serviceType || "")
            )}
            onChange={(option) =>
              setFilters({ serviceType: (option?.value as any) || undefined })
            }
            placeholder="Tip serviciu"
            isClearable
            styles={getSelectStyles()}
            theme={selectTheme}
            formatOptionLabel={formatOptionLabel}
            noOptionsMessage={() => "Nu s-au găsit tipuri"}
          />

          <Select
            instanceId="location-horizontal"
            options={locationOptions}
            value={locationOptions.find(
              (opt) => opt.value === (filters.location || "")
            )}
            onChange={(option) =>
              setFilters({ location: option?.value || undefined })
            }
            placeholder="Locație"
            isClearable
            styles={getSelectStyles()}
            theme={selectTheme}
            formatOptionLabel={formatOptionLabel}
            noOptionsMessage={() => "Nu s-au găsit locații"}
          />
        </div>

        {getActiveFiltersCount() > 0 && (
          <div
            className={`flex items-center justify-between mt-4 pt-4 border-t ${
              isDark ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <div className="flex items-center gap-2">
              <AnimatedIcon icon="✅" size="sm" />
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {getActiveFiltersCount()} filtre active
              </span>
            </div>
            <AnimatedButton
              onClick={clearFilters}
              variant="outline"
              size="sm"
              className={`${
                isDark
                  ? "text-gray-400 hover:text-red-400 border-gray-600"
                  : "text-gray-500 hover:text-red-500 border-gray-300"
              }`}
            >
              Șterge toate filtrele
            </AnimatedButton>
          </div>
        )}
      </div>
    );
  }

  // Sidebar variant (default) - MODERN & FRUMOS CU THEME SUPPORT
  return (
    <div className={`space-y-5 ${className}`}>
      <AnimatedText delay={0.1}>
        <div className="flex items-center justify-between">
          <h3
            className={`text-lg font-bold flex items-center gap-2 ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            <AnimatedIcon icon="🎯" size="md" />
            Filtrează rezultatele
          </h3>
          {getActiveFiltersCount() > 0 && (
            <AnimatedButton
              onClick={clearFilters}
              variant="outline"
              size="sm"
              className={`text-sm ${
                isDark
                  ? "text-gray-400 hover:text-red-400 border-gray-600"
                  : "text-gray-500 hover:text-red-500 border-gray-300"
              }`}
            >
              Șterge toate
            </AnimatedButton>
          )}
        </div>
      </AnimatedText>

      {/* Modern Grid Layout cu theme support */}
      <div className="space-y-4">
        {/* Specialitate */}
        <AnimatedText delay={0.2}>
          <MagicCard
            className={`p-4 ${
              isDark
                ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600"
                : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AnimatedIcon icon="🏥" size="sm" />
                <span
                  className={`font-semibold ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Specialitate
                </span>
              </div>
              <Select
                instanceId="specialty-sidebar"
                options={specialtyOptions}
                value={specialtyOptions.find(
                  (opt) => opt.value === (filters.specialty || "")
                )}
                onChange={(option) =>
                  setFilters({ specialty: option?.value || undefined })
                }
                placeholder="Selectează specialitatea"
                isClearable
                isSearchable
                styles={getSelectStyles()}
                theme={selectTheme}
                formatOptionLabel={formatOptionLabel}
                noOptionsMessage={() => "Nu s-au găsit specialități"}
              />
            </div>
          </MagicCard>
        </AnimatedText>

        {/* Disponibilitate */}
        <AnimatedText delay={0.3}>
          <MagicCard
            className={`p-4 ${
              isDark
                ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600"
                : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-100"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AnimatedIcon icon="⏰" size="sm" />
                <span
                  className={`font-semibold ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Disponibilitate
                </span>
              </div>
              <Select
                instanceId="availability-sidebar"
                options={availabilityOptions}
                value={availabilityOptions.find(
                  (opt) => opt.value === (filters.availability || "")
                )}
                onChange={(option) =>
                  setFilters({
                    availability: (option?.value as any) || undefined,
                  })
                }
                placeholder="Orice disponibilitate"
                isClearable
                styles={getSelectStyles()}
                theme={selectTheme}
                formatOptionLabel={formatOptionLabel}
                noOptionsMessage={() => "Nu s-au găsit opțiuni"}
              />
            </div>
          </MagicCard>
        </AnimatedText>

        {/* Tip serviciu */}
        <AnimatedText delay={0.4}>
          <MagicCard
            className={`p-4 ${
              isDark
                ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600"
                : "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AnimatedIcon icon="💼" size="sm" />
                <span
                  className={`font-semibold ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Tip serviciu
                </span>
              </div>
              <Select
                instanceId="service-type-sidebar"
                options={serviceTypeOptions}
                value={serviceTypeOptions.find(
                  (opt) => opt.value === (filters.serviceType || "")
                )}
                onChange={(option) =>
                  setFilters({
                    serviceType: (option?.value as any) || undefined,
                  })
                }
                placeholder="Toate tipurile"
                isClearable
                styles={getSelectStyles()}
                theme={selectTheme}
                formatOptionLabel={formatOptionLabel}
                noOptionsMessage={() => "Nu s-au găsit tipuri"}
              />
            </div>
          </MagicCard>
        </AnimatedText>

        {/* Locație */}
        <AnimatedText delay={0.5}>
          <MagicCard
            className={`p-4 ${
              isDark
                ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600"
                : "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AnimatedIcon icon="📍" size="sm" />
                <span
                  className={`font-semibold ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Locație
                </span>
              </div>
              <Select
                instanceId="location-sidebar"
                options={locationOptions}
                value={locationOptions.find(
                  (opt) => opt.value === (filters.location || "")
                )}
                onChange={(option) =>
                  setFilters({ location: option?.value || undefined })
                }
                placeholder="Toate locațiile"
                isClearable
                styles={getSelectStyles()}
                theme={selectTheme}
                formatOptionLabel={formatOptionLabel}
                noOptionsMessage={() => "Nu s-au găsit locații"}
              />
            </div>
          </MagicCard>
        </AnimatedText>
      </div>

      {/* Active Filters Summary cu theme support */}
      {getActiveFiltersCount() > 0 && (
        <AnimatedText delay={0.6}>
          <MagicCard
            className={`p-4 ${
              isDark
                ? "bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-700/50"
                : "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AnimatedIcon icon="✅" size="sm" />
                <span
                  className={`font-bold text-blue-500 ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {getActiveFiltersCount()} filtre active
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.specialty && (
                  <span className="inline-flex items-center gap-1 text-xs bg-blue-500 text-white px-3 py-1.5 rounded-full font-medium">
                    {getSpecialtyIcon(filters.specialty)}
                    {filters.specialty}
                  </span>
                )}
                {filters.availability && (
                  <span className="inline-flex items-center gap-1 text-xs bg-green-500 text-white px-3 py-1.5 rounded-full font-medium">
                    {
                      availabilityOptions.find(
                        (o) => o.value === filters.availability
                      )?.icon
                    }
                    {
                      availabilityOptions.find(
                        (o) => o.value === filters.availability
                      )?.label
                    }
                  </span>
                )}
                {filters.serviceType && (
                  <span className="inline-flex items-center gap-1 text-xs bg-purple-500 text-white px-3 py-1.5 rounded-full font-medium">
                    {
                      serviceTypeOptions.find(
                        (o) => o.value === filters.serviceType
                      )?.icon
                    }
                    {
                      serviceTypeOptions.find(
                        (o) => o.value === filters.serviceType
                      )?.label
                    }
                  </span>
                )}
                {filters.location && (
                  <span className="inline-flex items-center gap-1 text-xs bg-orange-500 text-white px-3 py-1.5 rounded-full font-medium">
                    {
                      locationOptions.find((o) => o.value === filters.location)
                        ?.icon
                    }
                    {
                      locationOptions.find((o) => o.value === filters.location)
                        ?.label
                    }
                  </span>
                )}
              </div>
            </div>
          </MagicCard>
        </AnimatedText>
      )}
    </div>
  );
}
