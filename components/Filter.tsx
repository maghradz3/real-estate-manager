"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import CreateAgentModal from "./CreateAgentModal";

const Filter = () => {
  return (
    <div className="px-[162px] w-[1596px] border border-[#DBDBDB] mt-[80px] flex justify-between items-center ">
      Filter
      <div className="flex justify-center items-center gap-3">
        <Link href="/add-estate">
          <Button className="h-[47px]" variant="destructive">
            + ლისტრინგის დამატება
          </Button>
        </Link>
        <span className="border border-default-primary text-default-primary hover:text-white hover:bg-default-primary rounded-md ">
          <CreateAgentModal />
        </span>
      </div>
    </div>
  );
};

export default Filter;
