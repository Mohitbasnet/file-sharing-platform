import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { HiMiniPlus } from "react-icons/hi2";
import { Input } from "../ui/input";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import { getUserByEmail, apiInviteUser } from "@/lib/apiRequests";
import showToast from "@/lib/toastNotification";
import Image from "next/image";

interface AddMemberFormProps {
  org: any;
}

const AddMemberForm = ({ org }: AddMemberFormProps) => {
  const [email, setEmail] = React.useState("");
  const [searching, setSearching] = React.useState(false);

  const {
    isLoading,
    error,
    data: member,
    refetch,
  } = useQuery<any>({
    queryKey: ["member", email],
    queryFn: () => getUserByEmail(email),
    enabled: false,
  });

  const handleSearch = () => {
    setSearching(true);
    refetch();
  };

  const handleInvite = async (user_id: string, name: string) => {
    try {
      const response = await apiInviteUser({
        user_id,
        organization_id: org.id,
      });
      console.log(response);
      if (response.status === 201) {
        showToast("success", "Invite sent to " + name);
        setEmail("");
      }
    } catch (error: any) {
      if (
        error.response.data.non_field_errors[0] ===
        "The fields user_id, organization_id must make a unique set."
      ) {
        showToast("error", "User already invited.");
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <span className="flex items-center gap-1 bg-zinc-900 text-white px-3 py-2 rounded-lg">
          <HiMiniPlus className="text-xl" />
          <span>Add Member</span>
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Invite a member to join</SheetTitle>
          <SheetDescription>
            Enter the email address of the person you want to invite to join the
            organization.
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Type email address"
              className="mt-5 w-full border rounded-lg p-2"
            />
            <Button
              onClick={handleSearch}
              disabled={!email}
              className="mt-3 flex items-center gap-2 hover:ring-1 ring-gray-300 transition-all ease-in-out duration-300"
              variant="default"
            >
              <HiOutlineMagnifyingGlass className="text-xl" />
              <span>Search User</span>
            </Button>
            {isLoading && <span>Loading...</span>}
            {error && showToast("error", "User not found. Please try again.")}
            {member &&
              member?.data?.map((user: any) => (
                <span key={user.id} className="flex items-center gap-2 mt-3">
                  <Image
                    height={40}
                    width={40}
                    src={user?.profile_image}
                    alt="avatar"
                    className="rounded-full object-cover"
                  />
                  <span className="flex flex-col">
                    <span className="text-lg font-semibold">
                      {user.full_name}
                    </span>
                  </span>
                  <span
                    className="ml-auto cursor-pointer flex items-center gap-1 border rounded px-2 py-1.5"
                    onClick={() => handleInvite(user.id, user.full_name)}
                  >
                    <HiMiniPlus />
                    <span>Invite</span>
                  </span>
                </span>
              ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddMemberForm;
