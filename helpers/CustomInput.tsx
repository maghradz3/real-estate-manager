"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CustomInputProps {
  label: string;
  name: string;

  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  tel?: string;
  validate: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  isValid: boolean;
  isTouched: boolean;
}

const CustomInput = ({
  label,
  name,

  tel,
  handleKeyDown,
  labelClassName,
  validate,
  register,
  inputClassName,
  error,
  className,
  isValid,
  isTouched,
}: CustomInputProps) => {
  const handleKeyDownHandler = handleKeyDown && handleKeyDown;

  const greenStyle = isValid && isTouched ? true : false;

  const getValidationTextColor = () => {
    if (error) {
      return "text-red-500 flex ";
    }
    if (isValid && isTouched) {
      return "text-green-500 !important";
    }
    return "text-yellow-400 !important";
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
        onKeyDown={handleKeyDownHandler}
        className={cn("input_default p-2.5", {
          "border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500 focus:ring-0 focus:outline-none focus-visible:ring-red-500 focus-visible:outline-red-500 ":
            error,
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
