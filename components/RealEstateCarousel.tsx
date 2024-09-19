"use client";
import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getAllRealEstates } from "@/utils/action";
import RealEstateCard from "./RealEstateCard";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Button } from "./ui/button";

interface RealEstateCarouselProps {
  regionId: number | undefined;
}

const RealEstateCarousel = ({ regionId }: RealEstateCarouselProps) => {
  const { data } = useQuery({
    queryKey: ["real-estates"],
    queryFn: () => getAllRealEstates(),
  });

  const realEstatesByRegion = data?.filter(
    (estate) => regionId === estate.city.region.id
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const itemsPerPage = 2;
  const totalItems = realEstatesByRegion?.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= totalItems! ? 0 : prevIndex + itemsPerPage
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? totalItems! - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, totalItems, handleNext]);

  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div className="flex  justify-center items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="absolute left-0 z-10 "
            disabled={currentIndex === 0}
          >
            <FiArrowLeft className="text-lg" />
          </Button>

          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform ease-in-out duration-700"
              style={{
                transform: `translateX(-${
                  (currentIndex / totalItems!) * 100
                }%)`,
              }}
            >
              {realEstatesByRegion?.map((estate) => (
                <div key={estate.id} className="min-w-[25%] p-4">
                  <RealEstateCard estate={estate} />
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleNext}
            variant="outline"
            className="absolute right-0 z-10  "
            disabled={currentIndex + itemsPerPage >= totalItems!}
          >
            <FiArrowRight className="text-lg" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default RealEstateCarousel;
