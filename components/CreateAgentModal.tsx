"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CreateAgentForm from "./CreateAgentForm";

import { IoIosAddCircleOutline } from "react-icons/io";
import { DialogDescription } from "@radix-ui/react-dialog";

interface CreateAgentModalProps {
  isUnderlined?: boolean;
}

const CreateAgentModal = ({ isUnderlined }: CreateAgentModalProps) => {
  const [open, setOpen] = React.useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setOpen(false);
  };
  return (
    <>
      <button
        className={`h-[42px] w-full flex justify-start items-center gap-3 ${
          isUnderlined && "border-b m border-[#808A93"
        } p-2.5`}
        onClick={openModal}
      >
        <IoIosAddCircleOutline className="w-[20px] h-[20px]" />
        <p>დაამატეთ აგენტი</p>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" w-[1009px] max-h-[784px] flex flex-col items-center  ">
          <DialogTitle className="text-3xl mt-[87px] mb-[61px]">
            აგენტის დამატება
          </DialogTitle>

          <CreateAgentForm closeModal={closeModal} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateAgentModal;
