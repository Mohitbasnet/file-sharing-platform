import React, { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import showToast from "@/lib/toastNotification";
import { apiAddFile } from "@/lib/apiRequests";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

const UploadForm = () => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSwitchChange = () => {
    setIsPrivate((previsPrivate) => !previsPrivate);
  };

  const handleUpload = async () => {
    if (!file || !fileName) {
      showToast("error", "Please fill all the fields and select a file.");
      return;
    }
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 25) {
      showToast("error", "File size exceeds the limit of 25 MB.");
      return;
    }
    try {
      const response = await apiAddFile({
        user_id: localStorage.getItem("user_id"),
        file_name: fileName,
        is_private: isPrivate,
        file,
      });
      if (response.id) {
        showToast("success", "File uploaded successfully");
        setFile(null);
        setFileName("");
        queryClient.invalidateQueries("user" as InvalidateQueryFilters);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <span className="flex gap-1 items-center bg-gray-100 px-4 py-2 rounded">
          <PlusIcon />
          <span>Upload File</span>
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="text-2xl py-3">Upload your file here</p>
            <p className="py-2 font-normal text-sm">
              Your file will be accessible by anyone unless you make it private.
            </p>
          </DialogTitle>
          <DialogDescription>
            <form
              method="post"
              onSubmit={(e) => e.preventDefault()}
              encType="multipart/form-data"
            >
              <div className="flex flex-col space-y-4">
                <div>
                  <Label>File Name</Label>
                  <Input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="picture">File</Label>
                  <Input id="picture" type="file" onChange={handleFileChange} />
                </div>
                <div className="flex items-center gap-1.5">
                  <Label>Public</Label>
                  <Switch
                    checked={isPrivate}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label>Private</Label>
                </div>

                <div className="flex justify-end">
                  <DialogClose>
                    <Button
                      className="w-fit"
                      size={"lg"}
                      onClick={handleUpload}
                    >
                      Upload
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadForm;
