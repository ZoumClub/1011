import { z } from "zod";
import { 
  FUEL_TYPES, 
  TRANSMISSION_TYPES, 
  BODY_TYPES, 
  MILEAGE_RANGES, 
  COLORS,
  CAR_FEATURES 
} from "@/types/sellCar";

// Create string literal types from arrays
const FuelType = z.enum(FUEL_TYPES as [string, ...string[]]);
const TransmissionType = z.enum(TRANSMISSION_TYPES as [string, ...string[]]);
const BodyType = z.enum(BODY_TYPES as [string, ...string[]]);
const Color = z.enum(COLORS as [string, ...string[]]);
const Feature = z.enum(CAR_FEATURES as [string, ...string[]]);

export const sellCarSchema = z.object({
  // Contact Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  pinCode: z.string().length(4, "PIN must be exactly 4 digits").regex(/^\d+$/, "PIN must contain only numbers"),

  // Car Information
  brand: z.string().min(1, "Please select a brand"),
  model: z.string().min(1, "Model is required"),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().positive("Price must be greater than 0"),
  mileage: z.string().refine((val) => MILEAGE_RANGES.includes(val), {
    message: "Please select a valid mileage range",
  }),
  previousOwners: z.number().int().min(0),

  // Technical Specifications
  fuelType: FuelType,
  transmission: TransmissionType,
  bodyType: BodyType,
  exteriorColor: Color,
  interiorColor: Color,

  // Features
  features: z.array(Feature).min(1, "Please select at least one feature"),

  // Media
  images: z.array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(3, "Maximum 3 images allowed")
    .refine((files) => {
      return files.every((file) => file.size <= 5 * 1024 * 1024); // 5MB limit
    }, "Each image must be less than 5MB"),
    
  video: z.instanceof(File)
    .optional()
    .refine((file) => {
      if (!file) return true;
      return file.size <= 100 * 1024 * 1024; // 100MB limit
    }, "Video must be less than 100MB"),
});

export type SellCarFormData = z.infer<typeof sellCarSchema>;