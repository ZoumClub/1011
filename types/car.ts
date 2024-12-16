export interface CarSpecs {
  mileage: number;
  transmission: string;
  fuelType: string;
  year: number;
}

export interface Dealer {
  name: string;
  phone: string;
  whatsapp: string;
}

export interface Car {
  id: number;
  name: string;
  price: string;
  savings?: string;
  type: "new" | "used";
  images: string[];
  video?: string;
  specs: CarSpecs;
  features: string[];
  dealer: Dealer;
}