export const siteConfig = {
  name: "ANN Clinic",
  title: "ANN Clinic - Clinică Medicală București",
  description:
    "Clinică medicală modernă în Bragadiru, oferind servicii medicale complete în peste 14 specialități. Programează-te online pentru consultații de specialitate.",
  tagline: "Sănătate & Încredere",
  url: "https://annclinic.ro",

  contact: {
    phone: "+40-XXX-XXX-XXX",
    phoneDisplay: "+40 XXX XXX XXX",
    email: "contact@annclinic.ro",
  },

  address: {
    street: "Strada Exemplu",
    number: "Nr. 1",
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
    weekdays: "Luni - Vineri: 08:00 - 20:00",
    saturday: "Sâmbătă: 08:00 - 16:00",
    sunday: "Duminică: Închis",
  },

  social: {
    facebook: "https://facebook.com/annclinic",
    instagram: "https://instagram.com/annclinic",
    twitter: "@annclinic",
  },

  specialties: [
    "Cardiologie",
    "Dermatologie",
    "Ginecologie",
    "Pediatrie",
    "Ortopedie",
    "ORL",
    "Estetică Facială",
    "Neurologie",
    "Endocrinologie",
    "Gastroenterologie",
    "Urologie",
    "Oftalmologie",
    "Psihiatrie",
    "Radiologie",
  ],

  mainServices: [
    "Cardiologie",
    "Dermatologie",
    "Ginecologie",
    "Pediatrie",
    "Ortopedie",
    "ORL",
    "Estetică Facială",
  ],

  seo: {
    defaultImage: "/images/placeholder.svg",
    twitterHandle: "@annclinic",
  },
} as const;
