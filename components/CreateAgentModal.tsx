"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateAgentForm from "./CreateAgentForm";

import { Button } from "./ui/button";

const CreateAgentModal = () => {
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
      <Button type="button" onClick={openModal}>
        Open Modal
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="  flex flex-col items-center  ">
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
