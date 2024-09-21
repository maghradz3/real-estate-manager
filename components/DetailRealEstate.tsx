"use client";
import { deleteRealEstateById, getRealEstateById } from "@/utils/action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { useRouter } from "next/navigation";

import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import IconText from "./IconText";
import { IoBedSharp } from "react-icons/io5";
import { TbRulerMeasure } from "react-icons/tb";
import { BsSignpostFill } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { MdPhoneInTalk } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import EstateDeleteModal from "./EstateDeleteModal";
import RealEstateCarousel from "./RealEstateCarousel";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { DetailRealEstateSkeleton } from "./FIlterSkeleton";

interface detailRealEstateProps {
  id: string;
}

const DetailRealEstate = ({ id }: detailRealEstateProps) => {
  const NumberId = Number(id);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
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
      toast({
        description: "უძრავი ქონება წაიშლა",
        duration: 5000,
      });
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
  const formatedPrice = data?.price.toLocaleString("en-US");

  const onSubmit = () => {
    mutate(NumberId);
  };

  if (isLoading) {
    return (
      <div>
        <DetailRealEstateSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center w-full  items-center gap-7 mt-[64px] ">
      <Button
        variant="outline"
        onClick={() => {
          router.back();
        }}
        className="self-start"
      >
        <FaArrowLeft />
      </Button>
      <div className="flex w-full max-h-[714px] justify-start  items-center gap-[68px]      ">
        <motion.div
          variants={fadeIn("right", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col   w-[839px] h-full  "
        >
          <div className="max-w-[839px] h-[670px] overflow-hidden rounded-t-[14px]  ">
            <Image
              src={data?.image || "/default-image.jpg"}
              alt="real estate detail"
              width={839}
              height={670}
              priority
              className="shadow w-full h-full object-cover object-center  rounded-t-xl "
            />
          </div>
          <p className="self-end text-base text-[#808A93]">
            გამოქვეყნების თარიღი {formatedDate}
          </p>
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex h-[714px] max-w-full xl:max-w-[503px]    justify-start self-start  pt-7"
        >
          <div className="flex flex-col justify-start items-start gap-10">
            <h1 className="text-4xl text-black-2 font-extrabold mb-6">
              {formatedPrice} ₾
            </h1>
            <div className="flex flex-col items-start gap-4">
              <IconText
                icon={<MdLocationPin />}
                text={data?.address}
                className="text-2xl "
              />
              <IconText
                icon={<TbRulerMeasure />}
                text={`ფართი ${data?.area}მ²`}
                className="text-2xl"
              />
              <IconText
                icon={<IoBedSharp />}
                text={`საძინებელი ${data?.bedrooms}`}
                className="text-2xl"
              />

              <IconText
                icon={<BsSignpostFill />}
                text={`საფოსტო ინდექსი ${data?.zip_code}`}
                className="text-2xl"
              />
            </div>
            <p className="text-base text-[#808A93] mt-6">{data?.description}</p>
            <div className="w-full rounded-[8px]  flex flex-col  p-2.5  border ">
              <div className="flex justify-start items-start gap-3 mb-2">
                <div className="w-[72px] h-[72px]  rounded-full overflow-hidden shadow ">
                  <Image
                    src={data?.agent?.avatar || "/default-avatar.jpg"}
                    alt="agent avatar"
                    width={72}
                    height={72}
                    className=" object-cover object-center  w-full h-full rounded-xl"
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
        </motion.div>
      </div>
      <div className="mt-12 flex flex-col items-center gap-12">
        <h1 className="self-start text-3xl text-[#021526]">
          ბინები მსგავს ლოკაციაზე{" "}
        </h1>
        <RealEstateCarousel regionId={data?.city?.region.id} id={NumberId} />
      </div>
    </div>
  );
};

export default DetailRealEstate;
