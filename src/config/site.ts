export const siteConfig = {
  name: "ANN Clinic",
  title: "ANN Clinic - Clinică Medicală București",
  description:
    "Clinică medicală modernă în Bragadiru, oferind servicii medicale complete în peste 14 specialități. Programează-te online pentru consultații de specialitate.",
  tagline: "Sănătate & Încredere",
  url: "https://annclinic.ro",
  contact: {
    shortPhone: "021 9063",
    phone: "+40 775 11 9063",
    secondaryPhone: "+40 775 22 9063",
    phoneDisplay: "+40 775 11 9063",
    email: "contact@annclinic.ro",
  },
  address: {
    street: "Șoseaua Alexandriei",
    number: "Nr. 101",
    city: "Bragadiru",
    county: "Ilfov",
    postalCode: "077025",
    country: "România",
    coordinates: {
      lat: 44.3601,
      lng: 26.0422,
    },
  },
  schedule: {
    weekdays: "08:00 - 20:00",
    saturday: "În curând",
    sunday: "Închis",
  },
  social: {
    facebook:
      "https://www.facebook.com/profile.php?id=61574771646433&locale=ro_RO",
    instagram: "https://www.instagram.com/annmedicalclinic/",
    tiktok: "https://www.tiktok.com/@ann.medical.clinic",
  },
  seo: {
    defaultImage: "/images/placeholder.svg",
    twitterHandle: "@annclinic",
  },
  mainServices: [
    "Cardiologie",
    "Obstetrică-Ginecologie",
    "Dermatovenerologie",
    "Pediatrie",
    "Medicina Internă",
    "Oftalmologie",
    "ORL",
    "Ortopedie și Traumatologie",
    "Endocrinologie",
    "Pneumologie",
    "Nefrologie",
    "Reumatologie",
    "Psihiatrie",
    "Alergologie",
  ],
} as const;
