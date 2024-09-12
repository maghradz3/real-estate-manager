import { z } from "zod";
export const realEstateSchema = z.object({
  adress: z.string().min(1, "Address is required"),
  zip_code: z.string().min(1, "Zip code is required"),
  price: z.number().min(1, "Price is required"),
  area: z.number().min(1, "Area is required"),
  bedrooms: z.number().int().min(1, "Bedrooms is required"),
  is_rental: z.number().int().min(1, "Rental status is required"),
  image: z.string().url("Must be a valid image URL"),
  region_id: z.number().int().positive("Region ID is required"),
  city_id: z.number().int().positive("City ID is required"),
});

export const agentSchema = z.object({
  name: z.string().min(3, "გთხოვთ შეიყვანოთ სახელი"),
  surname: z.string().min(3, "გთხოვთ შეიყვანოთ გვარი"),
  email: z.string().email("გთხოვთ შეიყვანოთ ელ-ფოსტა"),
  phone: z.string().min(9, "გთხოვთ შეიყვანოთ ტელეფონი"),
  avatar: z
    .instanceof(File)
    .refine((file) => file.size > 0, "გთხოვთ ატვირთოთ სურათი"),
});
