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
  name: z.string().min(2, "მინიმუმ ორი სიმბოლო").nonempty("სავალდებულო სახელი"),
  surname: z
    .string()
    .min(2, "მინიმუმ ორი სიმბოლო")
    .nonempty("სავალდებულო გვარი"),
  email: z
    .string()
    .nonempty("სავალდებულო მეილი")
    .regex(/@redberry\.ge$/, "მეილი უნდა სრულდებოდეს @redberry.ge"),
  phone: z
    .string()
    .regex(/^5\d{8}$/, "ნომერი უნდა იყოს  5XXXXXXXXX ფორმატით")
    .nonempty("ნომერი სავალდებულოა"),
  avatar: z
    .instanceof(File)
    .refine((file) => file.size > 0, "სავალდებულო ფოტო"),
});
