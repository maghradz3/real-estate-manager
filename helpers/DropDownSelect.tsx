"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface DropdownSelectProps {
  forCities?: boolean;
  optionsRegion?: { id: number; name: string }[];
  optionsCity?: { id: number; name: string; region_id: number }[];
  onChange: (selectedId: number) => void;
  label: string;
  multiSelect?: boolean;
  value: number | null;
}

const DropDownSelect = ({
  forCities,
  optionsRegion,
  optionsCity,
  value,
  onChange,
  label,
}: DropdownSelectProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const generalOptions = forCities ? optionsCity : optionsRegion;

  const handleSelect = (id: number) => {
    setSelectedOption(id);
    onChange(id);
    setIsOpen(true);
  };

  useEffect(() => {
    if (value !== null) {
      setSelectedOption(value);
    }
  }, [value]);

  const arrowClass = (openValue: boolean) => {
    return openValue
      ? "transform rotate-180 transition-transform duration-300"
      : "transform rotate-0 transition-transform duration-300 ";
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <label className="block mb-2 text-black ">{label}</label>
      <DropdownMenuTrigger
        asChild
        className="w-full h-[42px] flex justify-between items-center border p-2.5 rounded-[6px] "
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <div>
          {generalOptions?.find((opt) => opt.id === selectedOption)?.name ||
            label}
          <span className="ml-2">
            <IoIosArrowDown className={arrowClass(isOpen)} />
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" className="flex flex-col gap-5 p-2.5 ">
        <h1
          className="mb-[24px] text-base text-black font-bold
"
        >
          რეგიონი
        </h1>
        <div className=" h-[128px] grid grid-cols-3   gap-4 ">
          {generalOptions?.map((option) => (
            <div
              key={option.id}
              className=" flex gap-2 justify-start items-center p-2 hover:bg-gray-200 "
            >
              <Checkbox
                name="region_id"
                checked={selectedOption === option.id}
                onCheckedChange={() => handleSelect(option.id)}
              />
              <span className="text-sm">{option.name}</span>
            </div>
          ))}
        </div>
        <Button
          className="  self-end mt-10 bg-default-primary rounded-sm w-1/2 text-white "
          type="submit"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          არჩევა
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownSelect;
