"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { agentSchema } from "@/utils/validationSchema";
import { useState } from "react";

import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAgent } from "@/utils/action";
import CustomInput from "@/helpers/CustomInput";

import plusImage from "../assets/plus-circle.png";

import { cn } from "@/lib/utils";

import { useToast } from "@/hooks/use-toast";

interface CreateAgentFormProps {
  closeModal: (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type AgentFormValues = z.infer<typeof agentSchema>;

const CreateAgentForm: React.FC<CreateAgentFormProps> = ({
  closeModal,
  setOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
  } = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
  });

  const queryClient = useQueryClient();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await createAgent(formData);
    },
    onSuccess: () => {
      setOpen(false);

      queryClient.invalidateQueries({ queryKey: ["agents"] });
      // reset();
      toast({
        description: "აგენტი წარმატებით დაემატა",
      });
    },
  });

  const onSubmit = async (data: AgentFormValues) => {
    const formData = new FormData();
    console.log(data.name);
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    formData.append("avatar", data.avatar);

    mutate(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setValue("avatar", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className=" flex flex-col w-[799px]   mb-[87px]"
      >
        <div className="w-full   grid grid-cols-2 grid-row-2 gap-[20px]">
          <CustomInput
            label="სახელი *"
            validate="მინიმუმ 2 სიმბოლო"
            name="name"
            register={register("name")}
            error={errors.name}
            labelClassName="text-sm font-semibold"
            isValid={!!dirtyFields.name && !errors.name}
          />
          <CustomInput
            label="გვარი *"
            validate="მინიმუმ ორი სიმბოლო"
            name="surname"
            register={register("surname")}
            error={errors.surname}
            labelClassName="text-sm font-semibold"
            isValid={!!dirtyFields.surname && !errors.surname}
          />

          <CustomInput
            label="ელ-ფოსტა *"
            validate="გამოიყენეთ @redberry.ge-ით"
            name="email"
            register={register("email")}
            error={errors.email}
            labelClassName="text-sm font-semibold"
            isValid={!!dirtyFields.email && !errors.email}
          />

          <CustomInput
            label="ტელეფონი *"
            validate="მხოლოდ რიცხვები"
            name="phone"
            register={register("phone")}
            error={errors.phone}
            labelClassName="text-sm font-semibold"
            isValid={!!dirtyFields.phone && !errors.phone}
          />
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
              {errors.avatar && (
                <p className="text-red-500">{errors.avatar.message}</p>
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

        <div className="self-end flex justify-center items-center gap-[15px] mt-[95px]">
          <button
            onClick={closeModal}
            className="w-[103px] h-[47px] text-[16px] rounded-[10px] items-center border border-default-primary py-[10px] px-[16px] bg-white text-default-primary"
          >
            გაუქმება
          </button>
          <button
            type="submit"
            className=" h-[47px] text-[16px] items-center  bg-default-primary py-[10px] px-[16px] rounded-[10px] text-white "
          >
            დაამატე აგენტი
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateAgentForm;
