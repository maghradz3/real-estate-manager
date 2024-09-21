"use client";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export const FIlterSkeleton = () => {
  return (
    <div className=" mt-[80px] flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <Skeleton className="w-[432px] h-10 " />
        </div>
        <div className="flex items-center justify-center gap-5 w-[300px]">
          <Skeleton className="w-[100px] h-10 " />
          <Skeleton className="w-[100px] h-10" />
        </div>
      </div>
      <div className="flex justify-start items-start gap-2 w-[431px] h-10">
        <Skeleton className="w-[50px] h-5 " />
        <Skeleton className="w-[50px] h-5 " />
        <Skeleton className="w-[50px] h-5 " />
        <Skeleton className="w-[50px] h-5 " />
      </div>
    </div>
  );
};

type RealEstateSkeletonProps = {
  cardLength: number;
};

export const RealEstateSkeleton = ({ cardLength }: RealEstateSkeletonProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 2xl:grid xl:grid-cols-4 xl:gap-5">
      {Array.from({ length: cardLength }).map((_, index) => (
        <div key={index} className="card">
          <div className="relative overflow-hidden">
            <Skeleton className="h-[307px] w-full rounded-t-xl" />

            <div className="absolute flex justify-center items-center p-2.5 h-7 rounded-xl top-[29px] left-[33px] bg-[#02152680] backdrop-filter backdrop-blur-sm bg-opacity-40">
              <Skeleton className="w-[60px] h-[18px] rounded" />
            </div>
          </div>
          <div className="py-5 px-6 flex flex-col justify-start items-start gap-1.5">
            <Skeleton className="h-6 w-1/2 rounded" />

            <Skeleton className="h-5 w-2/3 mt-2 rounded" />
            <div className="flex justify-center items-center gap-7 mt-5">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-4 w-10 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const DetailRealEstateSkeleton = () => {
  return (
    <div className="flex w-full justify-between items-center gap-[68px]">
      <div className="flex flex-col overflow-hidden w-[839px] h-[714px] rounded-t-[14px]">
        <Skeleton className="w-full h-[714px] rounded-t-xl" />
        <Skeleton className="self-end mt-4 w-1/4 h-4" />
      </div>

      <div className="flex h-full w-1/2 justify-start self-start pt-7">
        <div className="flex flex-col justify-start items-start gap-4">
          <Skeleton className="w-[200px] h-8 mb-6" />

          {/* Address, Area, Bedrooms, Zip Code */}
          <Skeleton className="w-[300px] h-6" />
          <Skeleton className="w-[250px] h-6" />
          <Skeleton className="w-[150px] h-6" />
          <Skeleton className="w-[200px] h-6" />

          <Skeleton className="mt-6 w-full h-24" />

          <div className="w-full rounded-[8px] flex flex-col p-2.5 border">
            <div className="flex justify-start items-start gap-3 mb-2">
              <Skeleton className="w-[72px] h-[72px] rounded-full" />
              <div className="flex flex-col mt-2 items-start">
                <Skeleton className="w-[150px] h-4" />
                <Skeleton className="mt-2 w-[100px] h-4" />
              </div>
            </div>

            <Skeleton className="w-[200px] h-4 mt-2" />
            <Skeleton className="w-[150px] h-4 mt-2" />
          </div>

          <Skeleton className="w-full h-10 mt-4" />
        </div>
      </div>
    </div>
  );
};
