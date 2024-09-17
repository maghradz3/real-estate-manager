"use client";
import { getAllRegions } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import CreateAgentModal from "./CreateAgentModal";

import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import PriceDropdown from "./FilterDropDown";
import RangeDropDown from "./FilterDropDown";
import { IoIosArrowDown } from "react-icons/io";
import arrowClass from "@/helpers/arrowClass";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

interface FilterProps {
  onFilterChange: (filters: FilterValues) => void;
}

type FilterValues = {
  minPrice: number | null;
  maxPrice: number | null;
  selectedRegions: number[];
  minArea: number | null;
  maxArea: number | null;
  bedrooms: number | null;
};

const RealEstateFilter = ({ onFilterChange }: FilterProps) => {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedRegions, setSelectedRegions] = useState<number[]>([]);
  const [minArea, setMinArea] = useState<number | null>(null);
  const [maxArea, setMaxArea] = useState<number | null>(null);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [openRegion, setOpenRegion] = useState(false);
  const [openBedroom, setOpenBedroom] = useState(false);

  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: () => getAllRegions(),
  });

  const handleRegionChange = (region: number) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      minPrice,
      maxPrice,
      selectedRegions,
      minArea,
      maxArea,
      bedrooms,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        minPrice,
        maxPrice,
        selectedRegions,
        minArea,
        maxArea,
        bedrooms,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [
    onFilterChange,
    minPrice,
    maxPrice,
    selectedRegions,
    minArea,
    maxArea,
    bedrooms,
  ]);

  const minPriceList = [5000, 10000, 15000];
  const maxPriceList = [20000, 30000, 40000];

  const minAreaList = [50, 100, 150];
  const maxAreaList = [200, 300, 400];

  const bedroomsList = [1, 2, 3, 4, 5];

  const isActive = true;

  const regionName = regions?.find(
    (region) => region.id === selectedRegions[0]
  )?.name;

  return (
    <div className="px-[162px] w-[1596px] border border-[#DBDBDB] mt-[80px] flex justify-between items-center">
      <div className="flex flex-col   gap-4 mb-8">
        <div className="flex justify-center items-center gap-6 w-[785px] h-12 p-2.5  border border-red-500 ">
          <DropdownMenu open={openRegion} onOpenChange={setOpenRegion}>
            <DropdownMenuTrigger className=" filter_Btn  flex justify-center items-center gap-1">
              რეგიონი
              <span>
                <IoIosArrowDown className={arrowClass(openRegion)} />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" flex flex-col items-center gap-3 p-6 border-md">
              <h1 className="text_default text-base font-bold self-start">
                რეგიონის მიხედვით
              </h1>
              <div className="grid grid-cols-3 grid-rows-4 gap-x-12 gap-y-4 ">
                {regions?.map((region) => (
                  <label key={region.id} className="flex items-center">
                    <Checkbox
                      checked={selectedRegions.includes(region.id)}
                      onCheckedChange={() => handleRegionChange(region.id)}
                      className="mr-2 w-4 h-4 rounded border-gray-300 text-white checked:bg-green-500 checked:border-transparent focus:ring-green-500"
                    />
                    {region.name}
                  </label>
                ))}
              </div>
              <Button variant="destructive" className="self-end mt-2">
                არჩევა
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
          <RangeDropDown
            minValue={minPrice}
            maxValue={maxPrice}
            setMinValue={setMinPrice}
            setMaxValue={setMaxPrice}
            minList={minPriceList}
            maxList={maxPriceList}
            label="ფასი"
          />

          <RangeDropDown
            minValue={minArea}
            maxValue={maxArea}
            setMinValue={setMinArea}
            setMaxValue={setMaxArea}
            minList={minAreaList}
            maxList={maxAreaList}
            label="ფართობი"
          />
          <DropdownMenu open={openBedroom} onOpenChange={setOpenBedroom}>
            <DropdownMenuTrigger className="filter_Btn flex justify-center items-center gap-1">
              საძინებლების რაოდენობა
              <span>
                <IoIosArrowDown className={arrowClass(openBedroom)} />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="flex flex-col justify-start items-center gap-5 p-2.5">
                <div className="flex justify-start items-center gap-5">
                  {bedroomsList.map((bedroom) => (
                    <Button
                      className={cn(
                        "border border-black-1 text-black-1 hover:bg-black-1 hover:text-white",
                        {
                          "bg-black-1 text-white": bedrooms === bedroom,
                        }
                      )}
                      size="icon"
                      key={bedroom}
                      onClick={() => setBedrooms(bedroom)}
                    >
                      {bedroom}
                    </Button>
                  ))}
                </div>
                <Button variant="destructive" className="self-end">
                  არჩევა
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <button
            onClick={applyFilters}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Apply Filters
          </button> */}
        </div>
        <div>
          <p className="border border-red-500 ">
            {minPrice}
            {maxPrice}
            {regionName}
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3">
        <Link href="/add-estate">
          <Button className="h-[47px]" variant="destructive">
            + ლისტრინგის დამატება
          </Button>
        </Link>
        <span className="border border-default-primary text-default-primary hover:text-white hover:bg-default-primary rounded-md ">
          <CreateAgentModal />
        </span>
      </div>
    </div>
  );
};

export default RealEstateFilter;
