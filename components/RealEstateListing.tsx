"use client";
import { getAllRealEstates } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { RealEstate } from "@/utils/types";
import RealEstateFilter from "./RealEstateFilter";
import RealEstateCard from "./RealEstateCard";
import { FIlterSkeleton, RealEstateSkeleton } from "./FIlterSkeleton";

const RealEstateListing = () => {
  const { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["real-estates"],
    queryFn: () => getAllRealEstates(),
    staleTime: 1000 * 60 * 5,
  });

  const [filters, setFilters] = useState<{
    minPrice: number | null;
    maxPrice: number | null;
    selectedRegions: number[];
    minArea: number | null;
    maxArea: number | null;
    bedrooms: number | null;
  }>({
    minPrice: null,
    maxPrice: null,
    selectedRegions: [],
    minArea: null,
    maxArea: null,
    bedrooms: null,
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };
  const isAnyFilterSet = () => {
    return (
      filters.minPrice !== null ||
      filters.maxPrice !== null ||
      filters.selectedRegions.length > 0 ||
      filters.minArea !== null ||
      filters.maxArea !== null ||
      filters.bedrooms !== null
    );
  };

  const filteredData = data?.filter((estate: RealEstate) => {
    if (!isAnyFilterSet()) {
      return true;
    }
    const meetsPriceCriteria =
      filters.minPrice &&
      estate.price >= filters.minPrice &&
      filters.maxPrice &&
      estate.price < filters.maxPrice;

    const meetsAreaCriteria =
      filters.minArea &&
      estate.area >= filters.minArea &&
      filters.maxArea &&
      estate.area < filters.maxArea;

    const meetsRegionCriteria =
      filters.selectedRegions.length > 0 &&
      filters.selectedRegions.includes(estate.city.region.id);

    const meetsBedroomsCriteria =
      filters.bedrooms && estate.bedrooms === filters.bedrooms;

    return (
      meetsPriceCriteria ||
      meetsAreaCriteria ||
      meetsRegionCriteria ||
      meetsBedroomsCriteria
    );
  });

  if (isLoading) {
    return (
      <div>
        <FIlterSkeleton />
        <RealEstateSkeleton cardLength={8} />
      </div>
    );
  }

  console.log(isError, error);

  if (error) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  return (
    <>
      <RealEstateFilter onFilterChange={handleFilterChange} />

      {filteredData?.length ? (
        <div className=" w-full grid grid-cols-3 gap-3  2xl:grid xl:grid-cols-4 xl:gap-5  ">
          {filteredData?.map((estate) => (
            <RealEstateCard estate={estate} key={estate.id} />
          ))}
        </div>
      ) : (
        <div className="self-start text-lg">
          აღნიშნული მონაცემებით განცხადება არ იძებნება
        </div>
      )}
    </>
  );
};

export default RealEstateListing;
