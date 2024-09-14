"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface DropdownSelectProps {
  options: { id: number; name: string }[];
  onChange: (selectedId: number) => void;
  label: string;
  multiSelect?: boolean;
}

const DropDownSelect = ({
  options,
  onChange,
  label,
  multiSelect,
}: DropdownSelectProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: number) => {
    if (multiSelect) {
      if (selectedOptions.includes(id)) {
        setSelectedOptions((prev) =>
          prev.filter((optionId) => optionId !== id)
        );
      } else {
        setSelectedOptions((prev) => [...prev, id]);
      }
    } else {
      setSelectedOption(id);
      onChange(id);
      setIsOpen(true);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <label className="block mb-2 text-black ">{label}</label>
      <DropdownMenuTrigger
        asChild
        className="w-full h-[42px] flex justify-between items-center border "
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <div>
          {multiSelect
            ? selectedOptions
                .map((id) => options.find((opt) => opt.id === id)?.name)
                .join(", ") || "Select..."
            : options.find((opt) => opt.id === selectedOption)?.name ||
              "რეგიონი"}
          <span className="ml-2">
            <IoIosArrowDown />
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        className="flex flex-col gap-5 border border-blue-400"
      >
        <h1
          className="mb-[24px] text-base text-black font-bold
"
        >
          რეგიონი
        </h1>
        <div className=" h-[128px] grid grid-cols-3   gap-4 ">
          {options.map((option) => (
            <div
              key={option.id}
              className=" flex gap-2 justify-start items-center p-2 hover:bg-gray-200 "
            >
              <Checkbox
                checked={
                  multiSelect
                    ? selectedOptions.includes(option.id)
                    : selectedOption === option.id
                }
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
