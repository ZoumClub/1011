import { z } from "zod";
import { 
  FUEL_TYPES, 
  TRANSMISSION_TYPES, 
  BODY_TYPES, 
  MILEAGE_RANGES, 
  COLORS,
  CAR_FEATURES 
} from "@/types/sellCar";

const FuelType = z.enum(FUEL_TYPES as [string, ...string[]]);
const TransmissionType = z.enum(TRANSMISSION_TYPES as [string, ...string[]]);
const BodyType = z.enum(BODY_TYPES as [string, ...string[]]);
const Color = z.enum(COLORS as [string, ...string[]]);
const Feature = z.enum(CAR_FEATURES as [string, ...string[]]);

export const dealerCarSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().positive("Price must be greater than 0"),
  mileage_range: z.string().refine((val) => MILEAGE_RANGES.includes(val), {
    message: "Please select a valid mileage range",
  }),
  previous_owners: z.number().int().min(0),
  fuel_type: FuelType,
  transmission: TransmissionType,
  body_type: BodyType,
  exterior_color: Color,
  interior_color: Color,
  features: z.array(Feature).min(1, "Please select at least one feature"),
  type: z.enum(['new', 'used']),
  images: z.array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(3, "Maximum 3 images allowed"),
  video: z.instanceof(File).optional(),
});

export type DealerCarFormData = z.infer<typeof dealerCarSchema>;