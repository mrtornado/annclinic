/**
 * Romanian language utilities for the medical website
 */

// Romanian months for date formatting
export const ROMANIAN_MONTHS = [
  "ianuarie",
  "februarie",
  "martie",
  "aprilie",
  "mai",
  "iunie",
  "iulie",
  "august",
  "septembrie",
  "octombrie",
  "noiembrie",
  "decembrie",
];

// Romanian days of the week
export const ROMANIAN_DAYS = [
  "duminică",
  "luni",
  "marți",
  "miercuri",
  "joi",
  "vineri",
  "sâmbătă",
];

// Romanian days abbreviated
export const ROMANIAN_DAYS_SHORT = [
  "Dum",
  "Lun",
  "Mar",
  "Mie",
  "Joi",
  "Vin",
  "Sâm",
];

// Medical specialties in Romanian
export const MEDICAL_SPECIALTIES = {
  cardiology: "Cardiologie",
  dermatology: "Dermatologie",
  gynecology: "Ginecologie",
  pediatrics: "Pediatrie",
  orthopedics: "Ortopedie",
  orl: "ORL (Otorinolaringologie)",
  aesthetics: "Estetică Facială",
  neurology: "Neurologie",
  endocrinology: "Endocrinologie",
  gastroenterology: "Gastroenterologie",
  urology: "Urologie",
  ophthalmology: "Oftalmologie",
  psychiatry: "Psihiatrie",
  radiology: "Radiologie",
  laboratory: "Analize Medicale",
} as const;

// Common medical terms in Romanian
export const MEDICAL_TERMS = {
  consultation: "consultație",
  appointment: "programare",
  doctor: "doctor",
  specialist: "specialist",
  treatment: "tratament",
  diagnosis: "diagnostic",
  prescription: "rețetă",
  examination: "examinare",
  investigation: "investigație",
  therapy: "terapie",
  surgery: "chirurgie",
  emergency: "urgență",
  clinic: "clinică",
  hospital: "spital",
  patient: "pacient",
  symptoms: "simptome",
  disease: "boală",
  health: "sănătate",
  medicine: "medicină",
  pharmacy: "farmacie",
} as const;

/**
 * Format date in Romanian
 */
export function formatRomanianDate(date: Date, includeDay = false): string {
  const day = date.getDate();
  const month = ROMANIAN_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  const dayName = ROMANIAN_DAYS[date.getDay()];

  if (includeDay) {
    return `${dayName}, ${day} ${month} ${year}`;
  }

  return `${day} ${month} ${year}`;
}

/**
 * Format date in Romanian (alias for compatibility)
 */
export function formatDate(date: Date, includeDay = false): string {
  return formatRomanianDate(date, includeDay);
}

/**
 * Format time in Romanian 24-hour format
 */
export function formatRomanianTime(date: Date): string {
  return date.toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * Generate Romanian slug from text
 */
export function generateRomanianSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/ș/g, "s")
    .replace(/ț/g, "t")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Capitalize Romanian text properly
 */
export function capitalizeRomanian(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Get Romanian plural form for numbers
 */
export function getRomanianPlural(
  count: number,
  singular: string,
  plural: string,
  fewForm?: string
): string {
  if (count === 1) {
    return singular;
  }

  if (fewForm && count >= 2 && count <= 19) {
    return fewForm;
  }

  return plural;
}

/**
 * Format Romanian phone number
 */
export function formatRomanianPhone(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, "");

  // Format as +40 XXX XXX XXX
  if (digits.startsWith("40") && digits.length === 12) {
    return `+40 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }

  // Format as 0XXX XXX XXX
  if (digits.startsWith("0") && digits.length === 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  return phone; // Return original if format not recognized
}

/**
 * Romanian address formatting
 */
export function formatRomanianAddress(address: {
  street: string;
  number: string;
  city: string;
  county: string;
  postalCode: string;
}): string {
  return `${address.street} ${address.number}, ${address.city}, ${address.county} ${address.postalCode}`;
}

/**
 * Get Romanian ordinal number (1st, 2nd, etc.)
 */
export function getRomanianOrdinal(num: number): string {
  if (num === 1) return "1-ul";
  if (num === 2) return "2-lea";
  return `${num}-lea`;
}

/**
 * Romanian currency formatting
 */
export function formatRomanianCurrency(amount: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
