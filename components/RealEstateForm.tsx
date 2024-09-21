"use client";
import {
  createRealEstate,
  getAllAgents,
  getAllCities,
  getAllRegions,
} from "@/utils/action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { realEstateSchema } from "@/utils/validationSchema";
import { z } from "zod";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import CustomInput from "@/helpers/CustomInput";
import { Button } from "./ui/button";
import CreateAgentModal from "./CreateAgentModal";
import DropDownSelect from "@/helpers/DropDownSelect";
import plusImage from "../assets/plus-circle.png";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { Agents } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";

const LOCAL_STORAGE_KEY = "realEstateFormData";

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
  const queryClient = useQueryClient();

  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<RealEstateFormValues>({
    resolver: zodResolver(realEstateSchema),
    mode: "onChange",
    defaultValues: {
      address: "",
      zip_code: "",
      // price: 0,
      // area: 0,
      bedrooms: "",
      description: "",
      is_rental: "0",
      agent_id: "",
      region_id: "",
      city_id: "",
    },
  });
  console.log(selectedCity);
  const isRentalValue = watch("is_rental", "0");
  useEffect(() => {
    const subscription = watch((formValues) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formValues));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const savedFormData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key as keyof RealEstateFormValues, parsedData[key]);
        if (parsedData.region_id) {
          setSelectedRegion(Number(parsedData.region_id));
        }
        if (parsedData.city_id) {
          setSelectedCity(Number(parsedData.city_id));
        }
        if (parsedData.agent_id) {
          setSelectedAgent(Number(parsedData.agent_id));
        }
      });
    }
  }, [setValue]);

  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await createRealEstate(formData);
    },
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["real-estates"] });
      router.push("/");
      toast({
        description: "ახალი ლისტი წარმატებით შეიქმნა",
        duration: 5000,
      });
    },
    onError: (error) => {
      console.error("Error creating real estate:", error);
      toast({
        variant: "destructive",
        description: "ლისტის დამატების დროს მოხდა შეცდომა",
        duration: 3000,
      });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const selectedAgentName = selectedAgent
    ? agents?.find((agent) => agent.id === selectedAgent)?.name +
      " " +
      agents?.find((agent) => agent.id === selectedAgent)?.surname
    : "აირჩიეთ აგენტი";

  const citiesFromRegion = cities?.filter(
    (cityId) => cityId.region_id === selectedRegion
  );

  const onSubmit = (data: RealEstateFormValues) => {
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("image", data.image);
    formData.append("region_id", data.region_id);
    formData.append("city_id", data.city_id);
    formData.append("zip_code", data.zip_code);
    formData.append("price", data.price.toString());
    formData.append("area", data.area.toString());
    formData.append("bedrooms", data.bedrooms);
    formData.append("description", data.description);
    formData.append("is_rental", data.is_rental);
    formData.append("agent_id", data.agent_id);

    mutate(formData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <motion.div
      variants={fadeIn("up", 0.3)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="flex flex-col items-center mt-[80px] gap-10 "
    >
      <h1
        className="text-3xl text-[#021526] font-bold;
"
      >
        ლისტინგის დამატება
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <div className="mb-20">
          <h1 className=" text-base font-semibold">გარიგების ტიპი</h1>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="0"
                {...register("is_rental")}
                className="radio-custom"
                defaultChecked={isRentalValue === "0"}
              />
              <span>იყიდება</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="1"
                {...register("is_rental")}
                className="radio-custom"
                defaultChecked={isRentalValue === "1"}
              />
              <span>ქირავდება</span>
            </label>
          </div>
          {errors.is_rental && (
            <p className="text-red-500">{errors.is_rental.message}</p>
          )}
        </div>
        <h1 className=" text-base font-semibold mb-5 ">მდებარეობა</h1>
        <div className="grid grid-cols-2 grid-rows-2 gap-5 w-full mb-20">
          <CustomInput
            label="მისამართი *"
            name="address"
            labelClassName="text-sm font-semibold "
            register={register("address")}
            validate="მინიმუმ 2 სიმბოლო"
            error={errors.address}
            isValid={!!dirtyFields.address && !errors.address}
            isTouched={!!touchedFields.address}
          />
          <CustomInput
            label="საფოსტო ინდექსი *"
            name="zip_code"
            labelClassName="text-sm font-semibold "
            register={register("zip_code")}
            error={errors.zip_code}
            validate="მხოლოდ რიცხვები"
            isValid={!!dirtyFields.zip_code && !errors.zip_code}
            isTouched={!!touchedFields.zip_code}
          />
          <div className="w-[384px]">
            <DropDownSelect
              optionsRegion={regions || []}
              value={selectedRegion}
              label="რეგიონი *"
              onChange={(regionId) => {
                setSelectedRegion(regionId);
                setValue("region_id", regionId.toString());
              }}
            />
            {errors.region_id && (
              <p className="text-red-500">{errors.region_id.message}</p>
            )}
          </div>
          {selectedRegion !== null && (
            <div className="w-[384px]">
              <DropDownSelect
                value={selectedCity}
                forCities={true}
                optionsCity={citiesFromRegion || []}
                label="ქალაქი *"
                onChange={(cityId) => {
                  setSelectedCity(cityId);
                  setValue("city_id", cityId.toString());
                }}
              />
              {errors.region_id && (
                <p className="text-red-500">{errors.region_id.message}</p>
              )}
            </div>
          )}
        </div>
        <h1 className="font-bold text-base mb-5">ბინის დეტალები</h1>
        <div className="grid grid-cols-2 gap-2">
          <CustomInput
            label="ფასი *"
            labelClassName="text-sm font-semibold "
            name="price"
            register={register("price")}
            error={errors.price}
            validate="მხოლოდ რიცხვები"
            isValid={!!dirtyFields.price && !errors.price}
            isTouched={!!touchedFields.price}
          />
          <CustomInput
            label="ფართობი *"
            labelClassName="text-sm font-semibold "
            name="area"
            register={register("area")}
            error={errors.area}
            validate="მხოლოდ რიცხვები"
            isValid={!!dirtyFields.area && !errors.area}
            isTouched={!!touchedFields.area}
          />
          <CustomInput
            label="საძინებლების რაოდენობა *"
            labelClassName="text-sm font-semibold "
            name="bedrooms"
            register={register("bedrooms")}
            error={errors.bedrooms}
            validate="მხოლოდ რიცხვები"
            isValid={!!dirtyFields.bedrooms && !errors.bedrooms}
            isTouched={!!touchedFields.bedrooms}
          />
        </div>
        <div className="mt-5">
          <div className="flex flex-col gap-2">
            <Label className="font-bold text-sm" htmlFor="description">
              აღწერა *
            </Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "მინიმუმ 5 სიტყვა",
              })}
            />
            {errors?.description ? (
              <p className="text-red-500">
                <span className=" ">&#10003;</span>
                {errors.description.message}
              </p>
            ) : !!dirtyFields.description && !errors.description ? (
              <p className="text-default-secondary">
                <span className=" ">&#10003;</span>
                მინიმუმ 5 სიტყვა
              </p>
            ) : (
              <p className="text-black-1">
                <span className=" ">&#10003;</span>
                მინიმუმ 5 სიტყვა
              </p>
            )}
          </div>
          <div className="mt-[20px]">
            <label className="text-sm font-semibold" htmlFor="image">
              ატვირთეთ ფოტო *
            </label>
            <div className="flex justify-center items-center w-full h-[144px] border-2 border-dashed border-gray-300 rounded-md relative cursor-pointer">
              <input
                className=" w-full absolute inset-0 opacity-0 cursor-pointer z-10"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="flex flex-col items-center justify-center text-gray-500">
                <Image
                  src={plusImage}
                  alt="add button"
                  width={24}
                  height={24}
                  className={cn("", { hidden: previewImage })}
                />
                {errors.image && (
                  <p className="text-red-500">{errors.image.message}</p>
                )}

                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="Agent Preview"
                    className="mt-2 h-24 w-24 rounded-md object-cover"
                    width={136}
                    height={96}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-20">
            <div>
              <h1 className=" text-base font-semibold">აგენტი</h1>
              <p className="text-sm font-semibold mt-4">აირჩიე</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="border w-[384px] h-[42px] rounded-md flex justify-between items-center p-2.5 ">
                {selectedAgentName}
                <span>
                  <IoIosArrowDown />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="max-h-[300px] overflow-y-scroll "
                side="bottom"
                align="start"
              >
                <div>
                  <CreateAgentModal isUnderlined={true} />
                </div>
                {agents?.map((agent: Agents) => (
                  <DropdownMenuItem
                    onSelect={() => {
                      setSelectedAgent(agent.id);
                      setValue("agent_id", agent.id.toString());
                    }}
                    key={agent.id}
                    className="flex h-[42px] p-2.5  w-full justify-start items-center gap-3 border-b border-b-[#808A93]  "
                  >
                    <p>{`${agent.name} ${agent.surname}`}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="self-end  flex justify-center items-center gap-3.5 my-20">
          <Button
            type="button"
            variant="default"
            onClick={() => {
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              router.push("/");
            }}
          >
            გაუქმება
          </Button>
          <Button variant="destructive" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default RealEstateForm;
