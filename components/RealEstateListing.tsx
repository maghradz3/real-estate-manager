"use client";
import { getAllRealEstates } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { TbRulerMeasure } from "react-icons/tb";
import { BsSignpostFill } from "react-icons/bs";

const RealEstateListing = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["real-estates"],
    queryFn: () => getAllRealEstates(),
  });
  console.log(data);

  return (
    <div className="w-[1596px]   grid grid-cols-4 gap-5 ">
      {data?.map((estate) => (
        <Card className="h-[455px]" key={estate.id}>
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
                estate?.is_rental === 0 ? "ქირავდება" : "იყიდება"
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
        </Card>
      ))}
    </div>
  );
};

export default RealEstateListing;
