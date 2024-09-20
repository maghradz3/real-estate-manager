import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

interface EstateDeleteModalProps {
  onSubmit: () => void;
}

const EstateDeleteModal = ({ onSubmit }: EstateDeleteModalProps) => {
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
      <Button
        variant="outline"
        className="flex justify-center items-center shadow border p-2.5 hover:bg-[#808A93] hover:text-white"
        onClick={openModal}
      >
        ლისტინგის წაშლა
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="  w-[623px] h-[222px] flex flex-col items-center justify-center gap-6  ">
          <DialogTitle className="text-xl ">
            გსურთ წაშალოთ ლისტინგი ?
          </DialogTitle>
          <div className="flex justify-center items-center gap-3">
            <Button onClick={closeModal} variant="default">
              გაუქმება
            </Button>
            <Button onClick={onSubmit} variant="destructive">
              დადასტურება
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EstateDeleteModal;
