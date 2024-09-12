"use client";
import { useFormContext, RegisterOptions } from "react-hook-form";

import { FieldError } from "react-hook-form";
import { Input, InputProps } from "@/components/ui/input";

interface CustomInputProps extends InputProps {
  name: string;
  label: string;
  rules?: RegisterOptions;
  error?: FieldError;
}

const CustomInput = ({
  name,
  label,
  rules,
  error,
  ...rest
}: CustomInputProps) => {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <Input
        type="number"
        {...register(name, rules)}
        placeholder={label}
        {...rest}
      />
      {error && <p className="text-default-primary">{error.message}</p>}
    </div>
  );
};

export default CustomInput;
