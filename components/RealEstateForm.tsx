"use client";
import { getAllAgents, getAllCities, getAllRegions } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { realEstateSchema } from "@/utils/validationSchema";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import CustomInput from "@/helpers/CustomInput";
import { Button } from "./ui/button";
import CreateAgentModal from "./CreateAgentModal";
import DropDownSelect from "@/helpers/DropDownSelect";

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

  const { data: agents } = useQuery({
    queryKey: ["agents"],
    queryFn: () => getAllAgents(),
  });

  const [selectedRegion, setSelectedRegion] = React.useState<number | null>(
    null
  );
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<RealEstateFormValues>({
    resolver: zodResolver(realEstateSchema),
    mode: "onChange",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: RealEstateFormValues) => {
    console.log("submited");
    const formData = new FormData();
    formData.append("is_rental", data.is_rental);
    console.log(data.is_rental);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <RadioGroup className="flex " defaultValue="0">
            <div className="flex items-center space-x-2">
              <RadioGroupItem {...register("is_rental")} value="0" id="0" />
              <Label htmlFor="0">იყიდება</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem {...register("is_rental")} value="1" id="1" />
              <Label htmlFor="1">ქირავდება</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-5 w-full">
          <CustomInput
            label="მისამართი *"
            name="address"
            register={register("address")}
            validate="მინიმუმ 2 სიმბოლო"
            error={errors.address}
            isValid={!!dirtyFields.address && !errors.address}
            isTouched={!!touchedFields.address}
          />
          <CustomInput
            label="საფოსტო ინდექსი *"
            name="zip_code"
            register={register("zip_code")}
            error={errors.zip_code}
            validate="მხოლოდ რიცხვები"
            isValid={!!dirtyFields.zip_code && !errors.zip_code}
            isTouched={!!touchedFields.zip_code}
          />
          <div className="w-[384px]">
            <DropDownSelect
              options={regions || []}
              label="რეგიონი *"
              onChange={(regionId) => {
                setSelectedRegion(regionId);
                setValue("region", regionId.toString());
              }}
            />
            {errors.region && (
              <p className="text-red-500">{errors.region.message}</p>
            )}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <CreateAgentModal />
    </div>
  );
};

export default RealEstateForm;
