"use client";
import { getAllRegions } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import CreateAgentModal from "./CreateAgentModal";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
} from "./ui/dropdown-menu";

import RangeDropDown from "./FilterDropDown";
import { IoIosArrowDown } from "react-icons/io";

import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

import { FIlterSkeleton } from "./FIlterSkeleton";

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

const LOCAL_STORAGE_KEY = "realEstateFilters";

const RealEstateFilter = ({ onFilterChange }: FilterProps) => {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedRegions, setSelectedRegions] = useState<number[]>([]);
  const [minArea, setMinArea] = useState<number | null>(null);
  const [maxArea, setMaxArea] = useState<number | null>(null);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [openRegion, setOpenRegion] = useState(false);
  const [openBedroom, setOpenBedroom] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({
    minPrice: null,
    maxPrice: null,
    selectedRegions: [],
    minArea: null,
    maxArea: null,
    bedrooms: null,
  });

  const saveFiltersToLocalStorage = (filters: FilterValues) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filters));
  };

  const applyFilters = (filters: Partial<FilterValues>) => {
    const newFilters = {
      ...appliedFilters,
      ...filters,
    };
    setAppliedFilters(newFilters);
    saveFiltersToLocalStorage(newFilters);
    onFilterChange(newFilters);
  };

  const applyPriceFilters = (
    minValue: number | null,
    maxValue: number | null
  ) => {
    applyFilters({ minPrice: minValue, maxPrice: maxValue });
  };

  useEffect(() => {
    const savedFilters = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      setMinPrice(parsedFilters.minPrice || null);
      setMaxPrice(parsedFilters.maxPrice || null);
      setSelectedRegions(parsedFilters.selectedRegions || []);
      setMinArea(parsedFilters.minArea || null);
      setMaxArea(parsedFilters.maxArea || null);
      setBedrooms(parsedFilters.bedrooms || null);
      applyFilters(parsedFilters);
    }
    setLoading(false);
  }, []);

  const applyAreaFilters = (
    minValue: number | null,
    maxValue: number | null
  ) => {
    applyFilters({ minArea: minValue, maxArea: maxValue });
  };

  const minPriceList = [5000, 10000, 50000, 100000, 150000];
  const maxPriceList = [20000, 50000, 100000, 200000, 400000];

  const minAreaList = [50, 100, 150, 200, 250];
  const maxAreaList = [200, 300, 400, 500, 600];

  const bedroomsList = [1, 2, 3, 4, 5, 6];

  const selectedRegionsName = regions?.filter((region) =>
    selectedRegions.includes(region.id)
  );

  const selectedValueName = (
    value1: number | null,
    value2: number | null,
    symbol: string
  ) => {
    const selectedValueName =
      value1 && value2
        ? `${value1}${symbol} - ${value2}${symbol}`
        : value1
        ? `min - ${value1}${symbol}`
        : value2
        ? `max - ${value2}${symbol}`
        : null;
    return selectedValueName;
  };
  const removeFilter = (filterType: keyof FilterValues) => {
    const updatedFilters = { ...appliedFilters };

    if (filterType === "selectedRegions") {
      updatedFilters.selectedRegions = [];
      selectedRegions.length = 0;
    } else if (filterType === "minPrice" || filterType === "maxPrice") {
      updatedFilters.minPrice = null;
      updatedFilters.maxPrice = null;
      setMinPrice(null);
      setMaxPrice(null);
    } else if (filterType === "minArea" || filterType === "maxArea") {
      updatedFilters.minArea = null;
      updatedFilters.maxArea = null;
      setMinArea(null);
      setMaxArea(null);
    } else if (filterType === "bedrooms") {
      updatedFilters.bedrooms = null;
      setBedrooms(null);
    }

    applyFilters(updatedFilters);
  };

  const filterTags = (
    tagValue: string | null | number,
    filterType?: string
  ) => {
    return (
      tagValue && (
        <span className="flex justify-center items-center gap-2 rounded-[43px] border shadow px-2.5 py-1.5 font-sm text-[#021526CC] ">
          {tagValue}
          <button
            onClick={() =>
              filterType && removeFilter(filterType as keyof FilterValues)
            }
            className=" text-[#021526CC]"
          >
            x
          </button>
        </span>
      )
    );
  };

  const arrowClass = (openValue: boolean) => {
    return openValue
      ? "transform rotate-180 transition-transform duration-300"
      : "transform rotate-0 transition-transform duration-300 ";
  };

  if (loading) return <FIlterSkeleton />;

  return (
    <div className="w-full flex flex-col gap-3 ">
      <div className="   mt-[80px] flex justify-between items-center">
        <motion.div
          variants={fadeIn("right", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex justify-start gap-6 items-center    shadow border rounded-md h-[47px] "
        >
          <DropdownMenu open={openRegion} onOpenChange={setOpenRegion}>
            <DropdownMenuTrigger className=" filter_Btn  flex justify-center items-center gap-2 ">
              რეგიონი
              <span>
                <IoIosArrowDown className={arrowClass(openRegion)} />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className=" flex flex-col items-center gap-6 p-6 border-md"
            >
              <h1 className=" text-base font-bold self-start">
                რეგიონის მიხედვით
              </h1>
              <div className="grid grid-cols-3 grid-rows-4 gap-x-12 gap-y-4 mb-3 ">
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
              <Button
                onClick={() => {
                  applyFilters({ selectedRegions });
                  setOpenRegion(false);
                }}
                variant="destructive"
                className="self-end mt-2"
              >
                არჩევა
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
          <RangeDropDown
            applyPriceFilters={applyPriceFilters}
            minValue={minPrice}
            icon="₾"
            maxValue={maxPrice}
            setMinValue={setMinPrice}
            setMaxValue={setMaxPrice}
            minList={minPriceList}
            maxList={maxPriceList}
            label="ფასი"
          />

          <RangeDropDown
            applyPriceFilters={applyAreaFilters}
            minValue={minArea}
            icon="m²"
            maxValue={maxArea}
            setMinValue={setMinArea}
            setMaxValue={setMaxArea}
            minList={minAreaList}
            maxList={maxAreaList}
            label="ფართობი"
          />
          <DropdownMenu open={openBedroom} onOpenChange={setOpenBedroom}>
            <DropdownMenuTrigger className="filter_Btn flex justify-center items-center gap-2">
              საძინებლების რაოდენობა
              <span>
                <IoIosArrowDown className={arrowClass(openBedroom)} />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <div className="flex flex-col justify-start items-center gap-5 p-6">
                <h1 className="font-bold text-base self-start ">
                  საძინებლების რაოდენობა
                </h1>
                <div className="flex justify-start items-center gap-5">
                  {bedroomsList.map((bedroom) => (
                    <Button
                      className={cn(
                        "border mb-3 border-black-1 text-black-1 hover:bg-black-1 hover:text-white",
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
                <Button
                  onClick={() => {
                    applyFilters({ bedrooms });
                    setOpenBedroom(false);
                  }}
                  variant="destructive"
                  className="self-end"
                >
                  არჩევა
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex justify-center items-center gap-3"
        >
          <Link href="/add-estate">
            <Button className="h-[47px]" variant="destructive">
              + ლისტრინგის დამატება
            </Button>
          </Link>
          <div className="h-[47px] flex justify-center items-center border py-2.5 px-4 rounded-[10px] border-default-primary text-default-primary hover:bg-default-primary hover:text-white transition-colors duration-200 ease-in-out  ">
            <CreateAgentModal />
          </div>
        </motion.div>
      </div>
      <div className="w-full self-start flex justify-start items-start ">
        <div className="flex justify-center items-start gap-1">
          {selectedRegionsName?.map((region) => (
            <span
              className=" flex justify-center items-center gap-2 rounded-[43px] border shadow px-2.5 py-1.5 font-sm text-[#021526CC] "
              key={region.id}
            >
              {region.name}
              <button
                onClick={() => removeFilter("selectedRegions")}
                className="text-[#021526CC]"
              >
                x
              </button>
            </span>
          ))}
        </div>
        {filterTags(
          selectedValueName(minPrice, maxPrice, "₾"),
          "minPrice" || "maxPrice"
        )}
        {filterTags(
          selectedValueName(minArea, maxArea, "m²"),
          "minArea" || "maxArea"
        )}
        {filterTags(bedrooms, "bedrooms")}
      </div>
    </div>
  );
};

export default RealEstateFilter;
