import React from "react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import showToast from "@/lib/toastNotification";
import { apiCreateOrganization } from "@/lib/apiRequests";
import { useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";

const CreateOrganizationForm = () => {
  const [name, setName] = React.useState("");
  const queryClient = useQueryClient();
  const handleOrgCreate = async () => {
    if (name === "") {
      showToast("error", "Organization name is required.");
      return;
    }
    try {
      const res = await apiCreateOrganization({
        name,
        creator_id: localStorage.getItem("user_id"),
      });
      console.log(res);
      if (res.status === 201) {
        showToast("success", "Organization created successfully.");
        setName("");
        document.getElementById("orgAddDialog")?.click();
        queryClient.invalidateQueries(
          "organizations" as InvalidateQueryFilters
        );
      }
    } catch (error: any) {
      if (error.response.data.name[0]) {
        showToast("error", error.response.data.name[0]);
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="bg-black rounded text-white flex items-center gap-1 p-2">
        <HiOutlineBuildingOffice2 className="text-lg" />
        <span>Create Organization</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an Organization</DialogTitle>
          <DialogDescription>
            Create an organization for yourself to manage your team and files
            exclusively.
            <br />
            <br />
            <span className="flex gap-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Organization Name"
                className="w-full"
              />
              <Button onClick={handleOrgCreate}>Create</Button>
            </span>
            <DialogClose id="orgAddDialog"></DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrganizationForm;
