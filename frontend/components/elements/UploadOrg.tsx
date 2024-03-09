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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import showToast from "@/lib/toastNotification";
import { apiAddOrganizationFile } from "@/lib/apiRequests";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

interface UploadOrgProps {
  org_id?: string;
}

const UploadOrg = ({ org_id }: UploadOrgProps) => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
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
      const response = await apiAddOrganizationFile({
        user_id: localStorage.getItem("user_id"),
        file_name: fileName,
        org_id: org_id,
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
        <span className="flex gap-1 items-center bg-gray-100 dark:bg-zinc-700 px-4 py-2 rounded">
          <PlusIcon />
          <span>Upload File</span>
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="text-2xl py-3">Upload your file here</p>
            <p className="py-2 font-normal text-sm">
              Your file will be accessible by everyone in the organization.
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

export default UploadOrg;
