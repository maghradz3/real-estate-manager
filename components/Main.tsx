"use client";
import React from "react";
import Filter from "./Filter";
import { getAllRealEstates, getAllRegions } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import RealEstateListing from "./RealEstateListing";

const Main = () => {
  //   const { data } = useQuery({
  //     queryKey: ["real-estates"],
  //     queryFn: () => getAllRealEstates(),
  //   });
  //   const { data: regions } = useQuery({
  //     queryKey: ["regions"],
  //     queryFn: () => getAllRegions(),
  //   });

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <RealEstateListing />
    </div>
  );
};

export default Main;
