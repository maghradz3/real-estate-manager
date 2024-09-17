import { getAllRegions } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import CreateAgentModal from "./CreateAgentModal";

import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
} from "./ui/dropdown-menu";

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

  const regionName = regions?.find(
    (region) => region.id === selectedRegions[0]
  )?.name;

  const selectedTags = setTimeout(() => {
    return (
      <p>
        {minPrice} {maxPrice}
        {selectedRegions}
      </p>
    );
  }, 500);

  return (
    <div className="px-[162px] w-[1596px] border border-[#DBDBDB] mt-[80px] flex justify-between items-center">
      <div className="flex border border-red-500  gap-4 mb-8">
        <DropdownMenu>
          <DropdownMenuTrigger>Regions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="flex flex-col">
              {regions?.map((region) => (
                <label key={region.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRegions.includes(region.id)}
                    onChange={() => handleRegionChange(region.id)}
                    className="mr-2"
                  />
                  {region.name}
                </label>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <label>Min Price</label>
          <input
            type="number"
            value={minPrice || ""}
            onChange={(e) => setMinPrice(Number(e.target.value) || null)}
            placeholder="Min Price"
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label>Max Price</label>
          <input
            type="number"
            value={maxPrice || ""}
            onChange={(e) => setMaxPrice(Number(e.target.value) || null)}
            placeholder="Max Price"
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label>Min Area (m²)</label>
          <input
            type="number"
            value={minArea || ""}
            onChange={(e) => setMinArea(Number(e.target.value) || null)}
            placeholder="Min Area"
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label>Max Area (m²)</label>
          <input
            type="number"
            value={maxArea || ""}
            onChange={(e) => setMaxArea(Number(e.target.value) || null)}
            placeholder="Max Area"
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label>Bedrooms</label>
          <select
            value={bedrooms || ""}
            onChange={(e) => setBedrooms(Number(e.target.value) || null)}
            className="border p-2 rounded"
          >
            <option value="">Select Bedrooms</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5 Bedrooms</option>
          </select>
        </div>
        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Apply Filters
        </button>
        <p className="border border-red-500">
          {maxPrice}
          {regionName}
        </p>
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
