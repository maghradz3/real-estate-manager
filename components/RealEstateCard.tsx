import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";
import { MdLocationPin } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { TbRulerMeasure } from "react-icons/tb";
import { BsSignpostFill } from "react-icons/bs";
import { RealEstate } from "@/utils/types";

interface RealEstateCardProps {
  estate: RealEstate | undefined;
}

const RealEstateCard = ({ estate }: RealEstateCardProps) => {
  const formatedPrice = estate?.price.toLocaleString("en-US");
  return (
    <>
      <Card key={estate?.id}>
        <Link href={`/real-estate/${estate?.id}`}>
          <div className=" relative overflow-hidden max-w-[384px]  h-[307px]">
            <Image
              src={estate?.image || "/path/to/default/image.jpg"}
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
          <div className="py-5 px-6 flex flex-col justify-start items-start gap-1.5 ">
            <h1 className="font-bold text-[28px] ">{formatedPrice} ₾</h1>
            <p className="flex justify-center items-center gap-1 text-[#02152680]">
              <span>
                <MdLocationPin />
              </span>
              {estate?.address}
            </p>
            <div className="flex justify-center items-center gap-7 mt-5">
              <p className="flex justify-center items-center gap-1 text-[#02152680]">
                <IoBedSharp /> {estate?.bedrooms}
              </p>
              <p className="flex justify-center items-center gap-1 text-[#02152680]">
                {" "}
                <TbRulerMeasure />
                {estate?.area} მ²
              </p>
              <p className="flex justify-center items-center gap-1 text-[#02152680]">
                <BsSignpostFill />
                {estate?.zip_code}
              </p>
            </div>
          </div>
        </Link>
      </Card>
    </>
  );
};

export default RealEstateCard;
