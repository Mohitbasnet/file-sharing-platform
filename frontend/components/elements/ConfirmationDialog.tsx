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
}

const ConfirmationDialog = ({
  onConfirm,
  btnName,
  confirmTitle,
  confirmDescription,
}: ConfirmationDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <span>
          <Button variant="destructive">{btnName}</Button>
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{confirmTitle}</DialogTitle>
          <DialogDescription>{confirmDescription}</DialogDescription>
          <DialogDescription>This action can not be undone.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
          <Button variant="secondary">
            <DialogClose>Cancel</DialogClose>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
