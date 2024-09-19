"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { arrowClass } from "@/helpers/reuseableClasses";
import { IoIosArrowDown } from "react-icons/io";

type RangeDropdownProps = {
  applyPriceFilters: (minPrice: number | null, maxPrice: number | null) => void;
  minValue: number | null;
  maxValue: number | null;
  setMinValue: (value: number | null) => void;
  setMaxValue: (value: number | null) => void;
  minList: number[];
  maxList: number[];
  label: string;
};

const RangeDropDown: React.FC<RangeDropdownProps> = ({
  minValue,
  applyPriceFilters,

  maxValue,
  setMinValue,
  setMaxValue,
  minList,
  maxList,
  label,
}) => {
  const [open, setOpen] = useState(false);
  const [validateError, setValidateError] = useState<string | null>(null);
  const handleChooseClick = () => {
    if (minValue && maxValue && minValue > maxValue) {
      setValidateError(
        `მინიმალური ${label} არ უნდა იყოს მეტი მაქსიმალურ ${label}-ზე.`
      );
      return;
    }

    setValidateError(null);

    applyPriceFilters(minValue, maxValue);

    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="filter_Btn flex justify-center items-center gap-2">
        {label}
        <span>
          <IoIosArrowDown className={arrowClass(open)} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col p-2.5">
        <h1>{`${label} მიხედვით`}</h1>
        <div className="flex justify-center items-center gap-3">
          <div>
            <input
              type="number"
              value={minValue || ""}
              onChange={(e) => setMinValue(Number(e.target.value) || null)}
              placeholder={`მინ.${label}`}
              className="border p-2 rounded"
            />
            <p>მინ.{label}</p>
            <div className="flex flex-col">
              {minList.map((value) => (
                <button
                  key={value}
                  onClick={() => setMinValue(value)}
                  className="p-2 self-start"
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div>
            <input
              type="number"
              value={maxValue || ""}
              onChange={(e) => setMaxValue(Number(e.target.value) || null)}
              placeholder={`მაქს.${label}`}
              className="border p-2 rounded"
            />
            <div className="flex flex-col">
              <p>მაქს.{label}</p>
              {maxList.map((value) => (
                <button
                  key={value}
                  onClick={() => setMaxValue(value)}
                  className="p-2 self-start"
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
        {validateError && (
          <p className="text-destructive-primary">{validateError}</p>
        )}
        <Button
          onClick={handleChooseClick}
          variant="destructive"
          className="self-end"
        >
          არჩევა
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RangeDropDown;
