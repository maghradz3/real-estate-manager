"use client";
import { deleteRealEstateById, getRealEstateById } from "@/utils/action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { number } from "zod";

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

  const onSubmit = () => {
    mutate(NumberId);
  };

  return (
    <div>
      {data?.city.name}

      <Button onClick={onSubmit} variant="destructive">
        წაშლა
      </Button>
    </div>
  );
};

export default DetailRealEstate;
