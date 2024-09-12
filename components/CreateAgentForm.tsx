"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "./ui/input";

import { agentSchema } from "@/utils/validationSchema";
import { useState } from "react";

import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { createAgent } from "@/utils/action";

interface CreateAgentFormProps {
  closeModal: (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => void;
}

type AgentFormValues = z.infer<typeof agentSchema>;

const CreateAgentForm: React.FC<CreateAgentFormProps> = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
    mode: "onChange",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await createAgent(formData);
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

    mutation.mutate(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      setValue("avatar", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col w-[799px] border border-red-400  mt-[88px] mb-[188px]"
      >
        <div className="w-full   grid grid-cols-2 grid-row-2 gap-[28px]">
          <div>
            <label htmlFor="firstName">სახელი *</label>
            <Input
              className="w-full"
              id="firstName"
              {...register("name")}
              placeholder="მინიმუმ ორი სიმბოლო"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="surname">გვარი *</label>
            <Input
              id="surname"
              {...register("surname")}
              placeholder="მინიმუმ ორი სიმბოლო"
            />
            {errors.surname && (
              <p className="text-red-500">{errors.surname.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email">ელ-ფოსტა *</label>
            <Input
              id="email"
              {...register("email")}
              placeholder="გამოიყენე @redberry.ge ფოსტა"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone">ტელეფონის ნომერი *</label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="მობილური რიცხვები"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="image">ატვირთეთ ფოტო *</label>
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.avatar && (
            <p className="text-red-500">{errors.avatar.message}</p>
          )}
     
          {previewImage && (
            <Image
              src={previewImage}
              alt="Agent Preview"
              className="mt-2 h-24 w-24 rounded-md object-cover"
              width={96}
              height={96}
            />
          )}
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
