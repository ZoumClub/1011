import { Brand } from "@/types/brand";

export const ALL_BRANDS: Brand = {
  id: 0,
  name: "All Brands",
  logo: "/brands/all-brands.png"
};

export const BRAND_LIST: Brand[] = [
  { 
    id: 1,
    name: "BMW",
    logo: "https://www.car-logos.org/wp-content/uploads/2011/09/bmw.png"
  },
  { 
    id: 2,
    name: "Mercedes",
    logo: "https://www.car-logos.org/wp-content/uploads/2011/09/mercedes.png"
  },
  { 
    id: 3,
    name: "Audi",
    logo: "https://www.car-logos.org/wp-content/uploads/2011/09/audi.png"
  },
  { 
    id: 4,
    name: "Toyota",
    logo: "https://www.car-logos.org/wp-content/uploads/2011/09/toyota.png"
  },
  { 
    id: 5,
    name: "Honda",
    logo: "https://www.car-logos.org/wp-content/uploads/2011/09/honda.png"
  },
  { 
    id: 6,
    name: "Lexus",
    logo: "https://www.car-logos.org/wp-content/uploads/2011/09/lexus.png"
  },
  { 
    id: 7,
    name: "Porsche",
    logo: "https://www.car-logos.org/wp-content/uploads/2011/09/porsche.png"
  }
];

export const BRANDS: Brand[] = [ALL_BRANDS, ...BRAND_LIST];