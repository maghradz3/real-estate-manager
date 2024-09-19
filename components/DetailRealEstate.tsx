"use client";
import { deleteRealEstateById, getRealEstateById } from "@/utils/action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import { useRouter } from "next/navigation";

import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import IconText from "./IconText";
import { IoBedSharp } from "react-icons/io5";
import { TbRulerMeasure } from "react-icons/tb";
import { BsSignpost2Fill } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { MdPhoneInTalk } from "react-icons/md";

import EstateDeleteModal from "./EstateDeleteModal";
import RealEstateCarousel from "./RealEstateCarousel";

interface detailRealEstateProps {
  id: string;
}

const DetailRealEstate = ({ id }: detailRealEstateProps) => {
  const NumberId = Number(id);
  console.log(typeof NumberId);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useQuery({
    queryKey: [id],
    queryFn: () => getRealEstateById(NumberId),
  });

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteRealEstateById(id);
    },
    onSuccess: () => {
      console.log("deleted");
      queryClient.invalidateQueries({ queryKey: [id] });
      router.push("/");
    },
  });

  const formatDate = (dateString: string | undefined) => {
    const date = new Date(dateString!);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  const formatedDate = formatDate(data?.created_at);

  const onSubmit = () => {
    mutate(NumberId);
  };
  console.log(data?.agent?.avatar);
  return (
    <div className="flex flex-col justify-center w-full  items-center gap-16 mt-[125px] ">
      <div className="flex w-full justify-between items-center gap-[68px]  ">
        <div className="flex flex-col overflow-hidden  w-[839px] h-[714px]   rounded-t-[14px] ">
          <Image
            src={data?.image || "/default-image.jpg"}
            alt="real estate detail"
            width={839}
            height={670}
            className="shadow h-[714px] object-cover object-center  rounded-t-xl "
          />
          <p className="self-end text-base text-[#808A93]">
            გამოქვეყნების თარიღი {formatedDate}
          </p>
        </div>
        <div className="flex h-full w-1/2 justify-start self-start pt-7">
          <div className="flex flex-col justify-start items-start gap-4">
            <h1 className="text-4xl text-black-2 font-extrabold mb-6">
              {data?.price} ₾
            </h1>
            <IconText
              icon={<MdLocationPin />}
              text={data?.address}
              className="text-2xl "
            />
            <IconText
              icon={<TbRulerMeasure />}
              text={`ფართი ${data?.area}`}
              className="text-2xl"
            />
            <IconText
              icon={<IoBedSharp />}
              text={`საძინებელი ${data?.bedrooms}`}
              className="text-2xl"
            />

            <IconText
              icon={<BsSignpost2Fill />}
              text={`საფოსტო ინდექსი ${data?.zip_code}`}
              className="text-2xl"
            />
            <p className="text-base text-[#808A93] mt-6">{data?.description}</p>
            <div className="w-full rounded-[8px]  flex flex-col  p-2.5  border ">
              <div className="flex justify-start items-start gap-3 mb-2">
                <div className="w-18 h-18  rounded-full overflow-hidden shadow border">
                  <Image
                    src={data?.agent?.avatar || "/default-avatar.jpg"}
                    alt="agent avatar"
                    width={72}
                    height={72}
                    className="object-cover object-center rounded-full "
                  />
                </div>
                <div className="flex flex-col mt-2 items-start ">
                  <h1 className="text-base   ">
                    {data?.agent?.name} {data?.agent?.surname}
                  </h1>
                  <p className="text-sm text-[#676E76]">აგენტი</p>
                </div>
              </div>
              <IconText
                className="self-start"
                icon={<CiMail />}
                text={data?.agent?.email}
              />
              <IconText
                className="self-start"
                icon={<MdPhoneInTalk />}
                text={data?.agent?.phone}
              />
            </div>
            <EstateDeleteModal onSubmit={onSubmit} />
          </div>
        </div>
      </div>
      <div>
        <RealEstateCarousel regionId={data?.city?.region.id} />
      </div>
    </div>
  );
};

export default DetailRealEstate;
