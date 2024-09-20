import { union, z } from "zod";
export const realEstateSchema = z.object({
  address: z
    .string()
    .min(2, "მინიმუმ ორი სიმბოლო")
    .nonempty("მისამართი სავალდებულოა"),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 1000000, "სურათი უნდა იყოს 1MB-ზე ნაკლები")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "მხოლოდ JPG ან PNG ფორმატის სურათი"
    ),
  region_id: z.string().nonempty("რეგიონი სავალდებულოა "),
  city_id: z.string().nonempty("ქალაქი სავალდებულოა"),
  zip_code: z
    .string()
    .regex(/^\d+$/, "მხოლოდ რიცხვები")
    .nonempty("ზიპ კოდი სავალდებულოა"),
  price: z
    .preprocess(
      (val) => (val !== "" ? Number(val) : null),
      z
        .number({ invalid_type_error: "მხოლოდ რიცხვები" })
        .positive("ფასი სავალდებულოა და უნდა იყოს დადებითი")
    )
    .refine((val) => val !== null, {
      message: "ეს ველი სავალდებულოა",
    }),
  area: z
    .preprocess(
      (val) => (val !== "" ? Number(val) : null),
      z
        .number({ invalid_type_error: "მხოლოდ რიცხვები" })
        .positive("ფართი სავალდებულოა და უნდა იყოს დადებითი")
    )
    .refine((val) => val !== null, {
      message: "ეს ველი სავალდებულოა",
    }),
  bedrooms: z
    .string()
    .regex(/^\d+$/, "მხოლოდ რიცხვები")
    .nonempty("საძინებლები სავალდებულოა"),
  description: z
    .string()

    .refine((val) => val.split(" ").filter(Boolean).length >= 5, {
      message: " მინიმუმ 5 სიტყვა",
    }),
  is_rental: union([z.literal("0"), z.literal("1")]).refine(
    (val) => val !== undefined,
    "აირჩიეთ იყიდება თუ ქირავდება"
  ),
  agent_id: z.string().nonempty("აგენტი სავალდებულოა"),
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
    .refine((file) => file.size <= 1000000, "სურათი უნდა იყოს 1MB-ზე ნაკლები")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "მხოლოდ JPG ან PNG ფორმატის სურათი"
    ),
});
