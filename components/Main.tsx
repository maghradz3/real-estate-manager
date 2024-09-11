"use client";
import React from "react";
import Filter from "./Filter";
import { getAllRealEstates, getAllRegions } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";

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
    <div>
      <Filter />
    </div>
  );
};

export default Main;
