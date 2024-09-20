"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CustomInputProps {
  label: string;
  name: string;

  validate: string;
  register: UseFormRegisterReturn;
  error?: FieldError;

  labelClassName?: string;

  isValid: boolean;
  isTouched?: boolean;
}

const CustomInput = ({
  label,
  name,

  labelClassName,
  validate,
  register,

  error,

  isValid,
  isTouched,
}: CustomInputProps) => {
  const getValidationTextColor = () => {
    if (error) {
      return "text-default-primary  ";
    }
    if (isValid) {
      return "text-default-secondary !important";
    }
  };

  return (
    <div className="flex flex-col gap-[5px]">
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>
      <Input
        type="tel"
        inputMode="numeric"
        pattern="[0-3]*"
        className={cn("input_default", {
          "border border-default-secondary": isValid,
          "border  border-default-primary focus-visible:outline-red-700": error,
        })}
        id={name}
        {...register}
      />

      <p
        className={`${getValidationTextColor()} flex justify-start items-center`}
      >
        <span className="">&#10003;</span>

        {error
          ? error.message
          : isTouched && isValid
          ? `${validate}`
          : `${validate}`}
      </p>
    </div>
  );
};

export default CustomInput;
