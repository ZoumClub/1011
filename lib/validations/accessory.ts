import { z } from "zod";

export const accessorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().or(z.number()).transform(val => Number(val)),
  description: z.string().min(1, "Description is required"),
  image_url: z.string().url("Please enter a valid image URL"),
});

export type AccessoryFormData = z.infer<typeof accessorySchema>;