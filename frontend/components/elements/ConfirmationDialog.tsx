import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface ConfirmationDialogProps {
  onConfirm: () => void;
  btnName: string;
  confirmTitle: string;
  confirmDescription: string;
  variant?: any;
}

const ConfirmationDialog = ({
  onConfirm,
  btnName,
  confirmTitle,
  confirmDescription,
  variant = "destructive",
}: ConfirmationDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>
          <Button variant={variant}>{btnName}</Button>
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{confirmTitle}</DialogTitle>
          <DialogDescription>{confirmDescription}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant={variant} onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="ghost">
            <DialogClose id="dialogCloseBtn">Cancel</DialogClose>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
