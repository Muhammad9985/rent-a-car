export interface OfficeLocation {
  id: string;
  city: string;
  officeName: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapUrl: string;
  hours: string;
  image: string;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  category: string;
  seats: number;
  transmission: string;
  fuel: string;
  pricePerDay: number;
  image: string;
  tagline: string;
  accent: string;
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
  };
}

export interface TravelDestination {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  recommendedVehicle: string;
  image: string;
}

export const SITE_CONFIG = {
  brandName: "RENT A CAR",
  tagline: "Drive Your Way.",
  subTagline: "Premium cars. Exceptional service. Wherever the road takes you.",
  primaryWhatsapp: "+923098867872",
  primaryPhone: "+923098867872",
  primaryEmail: "concierge@rentacar.com",

  // Central Helper to generate WhatsApp links with custom encoded messages
  getWhatsappUrl: (message?: string, numberOverride?: string) => {
    const num = (numberOverride || SITE_CONFIG.primaryWhatsapp).replace(/[^0-9]/g, '');
    const defaultMsg = "Hi RENT A CAR, I would like to inquire about renting a luxury car.";
    const text = encodeURIComponent(message || defaultMsg);
    return `https://wa.me/${num}?text=${text}`;
  },

  getPhoneUrl: (phoneOverride?: string) => {
    const num = (phoneOverride || SITE_CONFIG.primaryPhone).replace(/[^0-9]/g, '');
    return `tel:+${num}`;
  },

  getEmailUrl: (subject?: string) => {
    const sub = encodeURIComponent(subject || "Car Rental Inquiry — RENT A CAR");
    return `mailto:${SITE_CONFIG.primaryEmail}?subject=${sub}`;
  },

  fleet: [
    {
      id: "porsche-911",
      brand: "PORSCHE",
      model: "911 CARRERA S",
      category: "Sports Coupe",
      seats: 2,
      transmission: "8-Speed PDK",
      fuel: "Petrol",
      pricePerDay: 450,
      image: "/images/porsche_911.jpg",
      tagline: "Pure Driving Dynamics",
      accent: "#D4AF37",
      specs: {
        power: "443 HP",
        acceleration: "3.5s",
        topSpeed: "308 km/h"
      }
    },
    {
      id: "g-class-amg",
      brand: "MERCEDES-AMG",
      model: "G 63 V8 BITURBO",
      category: "Luxury SUV",
      seats: 5,
      transmission: "9G-TRONIC",
      fuel: "Petrol V8",
      pricePerDay: 650,
      image: "/images/g_class.jpg",
      tagline: "Iconic Off-Road Royalty",
      accent: "#D4AF37",
      specs: {
        power: "577 HP",
        acceleration: "4.5s",
        topSpeed: "240 km/h"
      }
    },
    {
      id: "bmw-m5",
      brand: "BMW",
      model: "M5 COMPETITION",
      category: "Performance Sedan",
      seats: 5,
      transmission: "M Steptronic",
      fuel: "Petrol V8",
      pricePerDay: 500,
      image: "/images/bmw_m5.jpg",
      tagline: "Uncompromised Executive Speed",
      accent: "#10B981",
      specs: {
        power: "617 HP",
        acceleration: "3.3s",
        topSpeed: "305 km/h"
      }
    },
    {
      id: "range-rover",
      brand: "RANGE ROVER",
      model: "AUTOBIOGRAPHY LWB",
      category: "Ultra-Luxury SUV",
      seats: 5,
      transmission: "8-Speed Auto",
      fuel: "Twin-Turbo V8",
      pricePerDay: 600,
      image: "/images/range_rover.jpg",
      tagline: "First-Class Travel Sanctuary",
      accent: "#D4AF37",
      specs: {
        power: "523 HP",
        acceleration: "4.6s",
        topSpeed: "250 km/h"
      }
    },
    {
      id: "audi-rs7",
      brand: "AUDI",
      model: "RS7 SPORTBACK",
      category: "Grand Tourer",
      seats: 5,
      transmission: "8-Speed Tiptronic",
      fuel: "V8 TFSI",
      pricePerDay: 480,
      image: "/images/audi_rs7.jpg",
      tagline: "Aggressive Aero & Quattro Power",
      accent: "#3B82F6",
      specs: {
        power: "591 HP",
        acceleration: "3.6s",
        topSpeed: "305 km/h"
      }
    },
    {
      id: "land-cruiser-300",
      brand: "TOYOTA",
      model: "LAND CRUISER 300 V6",
      category: "Executive Off-Roader",
      seats: 7,
      transmission: "10-Speed Auto",
      fuel: "Twin-Turbo V6",
      pricePerDay: 350,
      image: "/images/land_cruiser.jpg",
      tagline: "Unstoppable All-Terrain Dominance",
      accent: "#F59E0B",
      specs: {
        power: "409 HP",
        acceleration: "6.7s",
        topSpeed: "210 km/h"
      }
    }
  ] as Vehicle[],

  locations: [
    {
      id: "karachi",
      city: "KARACHI",
      officeName: "Coastal Executive Branch",
      address: "Main Khayaban-e-Ittehad, DHA Phase 6, Karachi",
      phone: "+92 309 8867872",
      whatsapp: "+92 309 8867872",
      email: "karachi@rentacar.com",
      mapUrl: "https://maps.google.com/?q=DHA+Phase+6+Karachi",
      hours: "24/7 Concierge Support",
      image: "/images/karachi_city.jpg"
    },
    {
      id: "lahore",
      city: "LAHORE",
      officeName: "Gulberg Corporate Lounge",
      address: "Main Boulevard, Gulberg III, Lahore",
      phone: "+92 309 8867872",
      whatsapp: "+92 309 8867872",
      email: "lahore@rentacar.com",
      mapUrl: "https://maps.google.com/?q=Gulberg+III+Lahore",
      hours: "24/7 Concierge Support",
      image: "/images/lahore_city.jpg"
    },
    {
      id: "islamabad",
      city: "ISLAMABAD",
      officeName: "Capital Blue Area Hub",
      address: "Jinnah Avenue, Blue Area, Islamabad",
      phone: "+92 309 8867872",
      whatsapp: "+92 309 8867872",
      email: "islamabad@rentacar.com",
      mapUrl: "https://maps.google.com/?q=Blue+Area+Islamabad",
      hours: "24/7 Concierge Support",
      image: "/images/islamabad_city.jpg"
    }
  ] as OfficeLocation[],

  destinations: [
    {
      id: "karachi-coast",
      name: "KARACHI COASTAL HIGHWAY",
      subtitle: "The Arabian Breeze",
      description: "Sunset cruises along Do Darya, French Beach, and Ormara Highway with high-performance coupes.",
      recommendedVehicle: "Porsche 911 Carrera S",
      image: "/images/karachi_city.jpg"
    },
    {
      id: "lahore-avenues",
      name: "LAHORE CITY LIGHTS",
      subtitle: "The Heart of Culture",
      description: "Glide through Gulberg, Ring Road, and luxury dining hubs in unmatched executive sedans.",
      recommendedVehicle: "BMW M5 Competition",
      image: "/images/lahore_city.jpg"
    },
    {
      id: "margalla-hills",
      name: "MARGALLA HILLS & MURREE",
      subtitle: "Alpine Elevation",
      description: "Winding mountain corners and crisp highland air with precision all-wheel-drive luxury.",
      recommendedVehicle: "Audi RS7 Sportback",
      image: "/images/islamabad_city.jpg"
    },
    {
      id: "hunza-skardu",
      name: "HUNZA & SKARDU VALLEY",
      subtitle: "The Karakoram Highway",
      description: "Epic expeditions to the highest peaks on Earth in rugged yet opulent off-road SUVs.",
      recommendedVehicle: "Toyota Land Cruiser 300",
      image: "/images/skardu_mountain.jpg"
    }
  ] as TravelDestination[],

  stats: [
    { value: "10K+", label: "DRIVERS DELIGHTED" },
    { value: "250+", label: "LUXURY VEHICLES" },
    { value: "3", label: "METRO LOCATIONS" },
    { value: "24/7", label: "PERSONAL CONCIERGE" }
  ],

  testimonials: [
    {
      quote: "From the instant WhatsApp message to picking up the G63 in Gulberg, the concierge level of service surpassed luxury hotels in Dubai.",
      author: "Tariq Malik",
      location: "Lahore",
      vehicle: "Mercedes-AMG G 63"
    },
    {
      quote: "Rented the Porsche 911 for a weekend drive up to Monal. Pristine car, spotless condition, zero paperwork delays.",
      author: "Zainab Shah",
      location: "Islamabad",
      vehicle: "Porsche 911 Carrera S"
    },
    {
      quote: "We needed two Land Cruiser 300s for a family tour through Skardu. RENT A CAR handled transport, delivery, and support flawlessly.",
      author: "Hamza Sheikh",
      location: "Karachi",
      vehicle: "Toyota Land Cruiser 300"
    }
  ]
};
