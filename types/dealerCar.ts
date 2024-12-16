export interface DealerCarMedia {
  id: string;
  car_id: string;
  media_type: 'image' | 'video';
  url: string;
  path: string;
  position: number;
  created_at: string;
}

export interface DealerCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage_range: string;
  previous_owners: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  exterior_color: string;
  interior_color: string;
  features: string[];
  type: 'new' | 'used';
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  dealer_car_media?: DealerCarMedia[];
}