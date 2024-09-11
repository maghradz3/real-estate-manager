"use client";
import { getAllCities, getAllRegions } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AddNewEstate = () => {
  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: () => getAllRegions(),
  });
  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: () => getAllCities(),
  });

  console.log(regions);

  return <div>AddNewEstate</div>;
};

export default AddNewEstate;
