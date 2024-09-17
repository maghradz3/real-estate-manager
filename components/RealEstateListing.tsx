"use client";
import { getAllRealEstates } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { TbRulerMeasure } from "react-icons/tb";
import { BsSignpostFill } from "react-icons/bs";
import Link from "next/link";
import { getRealEstate, RealEstate } from "@/utils/types";
import RealEstateFilter from "./RealEstateFilter";
import Filter from "./Filter";

const RealEstateListing = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["real-estates"],
    queryFn: () => getAllRealEstates(),
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

  const filteredData = data?.filter((estate: RealEstate) => {
    const meetsPriceCriteria =
      (!filters.minPrice || estate.price >= filters.minPrice) &&
      (!filters.maxPrice || estate.price <= filters.maxPrice);
    const meetsAreaCriteria =
      (!filters.minArea || estate.area >= filters.minArea) &&
      (!filters.maxArea || estate.area <= filters.maxArea);
    const meetsRegionCriteria =
      filters.selectedRegions.length === 0 ||
      filters.selectedRegions.includes(estate.city.region.id);
    const meetsBedroomsCriteria =
      !filters.bedrooms || estate.bedrooms === filters.bedrooms;

    return (
      meetsPriceCriteria &&
      meetsAreaCriteria &&
      meetsRegionCriteria &&
      meetsBedroomsCriteria
    );
  });

  return (
    <>
      <RealEstateFilter onFilterChange={handleFilterChange} />

      <div className="w-[1596px]   grid grid-cols-4 gap-5 ">
        {filteredData?.map((estate) => (
          <Card className="h-[455px]" key={estate.id}>
            <Link href={`/real-estate/${estate.id}`}>
              <div className="relative w-[384px] h-[307px] overflow-hidden">
                <Image
                  src={estate.image}
                  alt="appartment image"
                  width={384}
                  height={307}
                  className=" border object-cover object-center  w-full h-full rounded-t-xl"
                />
                <div
                  className="absolute flex justify-center items-center p-2.5 h-7 rounded-xl top-[29px] left-[33px] bg-[#02152680] backdrop-filter backdrop-blur-sm bg-opacity-40
] "
                >
                  <p className="text-white text-sm">{`${
                    estate?.is_rental === 0 ? "იყიდება" : "ქირავდება"
                  }`}</p>
                </div>
              </div>
              <div className="h-[148px] py-5 px-6 flex flex-col justify-start items-start gap-1.5">
                <h1 className="font-bold text-[28px] ">{estate.price} ₾</h1>
                <p className="flex justify-center items-center gap-1 text-[#02152680]">
                  <span>
                    <MdLocationPin />
                  </span>
                  {estate.address}
                </p>
                <div className="flex justify-center items-center gap-8 mt-5">
                  <p className="flex justify-center items-center gap-1 text-[#02152680]">
                    <IoBedSharp /> {estate.bedrooms}
                  </p>
                  <p className="flex justify-center items-center gap-1 text-[#02152680]">
                    {" "}
                    <TbRulerMeasure />
                    {estate.area} მ²
                  </p>
                  <p className="flex justify-center items-center gap-1 text-[#02152680]">
                    <BsSignpostFill />
                    {estate.price}
                  </p>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
};

export default RealEstateListing;
