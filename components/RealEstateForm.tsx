"use client";
import { getAllCities, getAllRegions } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { realEstateSchema } from "@/utils/validationSchema";
import { z } from "zod";

import CustomInput from "@/helpers/CustomInput";
import { Button } from "./ui/button";
import CreateAgentModal from "./CreateAgentModal";

type RealEstateFormValues = z.infer<typeof realEstateSchema>;
const RealEstateForm = () => {
  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: () => getAllRegions(),
  });
  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: () => getAllCities(),
  });

  console.log(regions);

  const methods = useForm<RealEstateFormValues>({
    resolver: zodResolver(realEstateSchema),
  });

  const {
    handleSubmit,

    formState: { errors },
  } = methods;

  const onSubmit = (data: RealEstateFormValues) => {
    console.log("form data", data);
  };

  return (
    <div className="flex flex-col items-center mt-[80px] gap-10 ">
      <h1
        className="text-3xl text-[#021526] font-medium;
"
      >
        {" "}
        ლისტინგის დამატება
      </h1>
      <FormProvider {...methods}>
        <CreateAgentModal />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 h-[1211px] border border-gray-300 p-1"
        >
          <h1 className="font-xl font-black-1 mb-5">მდებარეობა</h1>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <CustomInput
              name="adress"
              label="მისამართი"
              error={errors.adress}
            />
            <CustomInput
              name="zip_code"
              label="Zip Code"
              error={errors.zip_code}
            />
            <CustomInput name="price" label="ფასი" error={errors.price} />
            <CustomInput name="area" label="ფართი" error={errors.area} />
            <CustomInput
              name="bedrooms"
              label="საძინებლები"
              error={errors.bedrooms}
            />
            <CustomInput name="is_rental" label="ქირავდება" />

            <CustomInput name="image" label="სურათი" error={errors.image} />
            <CustomInput
              name="region_id"
              label="რეგიონი"
              error={errors.region_id}
            />
            <CustomInput name="city_id" label="ქალაქი" error={errors.city_id} />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default RealEstateForm;
