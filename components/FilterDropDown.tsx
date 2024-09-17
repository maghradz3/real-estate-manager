"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import arrowClass from "@/helpers/arrowClass";
import { IoIosArrowDown } from "react-icons/io";

type RangeDropdownProps = {
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
  maxValue,
  setMinValue,
  setMaxValue,
  minList,
  maxList,
  label,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="filter_Btn flex justify-center items-center gap-1">
        {label}
        <span>
          <IoIosArrowDown className={arrowClass(open)} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col p-2.5">
        <h1>{`${label} მიხედვით`}</h1>
        <div className="flex justify-center items-center gap-3">
          {/* Min Value Section */}
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

          {/* Max Value Section */}
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

        <Button
          onClick={() => setOpen(false)}
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
