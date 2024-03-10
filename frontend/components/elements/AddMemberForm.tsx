import React from "react";
import { Button } from "../ui/button";
import { HiMiniPlus } from "react-icons/hi2";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { getUserByEmail, apiInviteUser } from "@/lib/apiRequests";
import showToast from "@/lib/toastNotification";
import { Loader2 } from "lucide-react";

export function ButtonLoading() {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

interface AddMemberFormProps {
  org: any;
}

const AddMemberForm = ({ org }: AddMemberFormProps) => {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState(
    "I would like to invite you to our organization."
  );
  const [searching, setSearching] = React.useState(false);
  const [user_id, setUser_id] = React.useState("");

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

  const handleInvite = async () => {
    if (!email) {
      showToast("error", "Email is required.");
      return;
    }
    if (!message) {
      showToast("error", "Message is required.");
      return;
    }
    try {
      setSearching(true);
      const res = await refetch();
      if (res?.data?.data[0].id) {
        setUser_id(res?.data?.data[0].id);
        const response = await apiInviteUser({
          user_id: res?.data?.data[0].id,
          organization_id: org.id,
          message,
        });
        if (response.status === 201) {
          showToast("success", "Invite sent to " + email);
          setEmail("");
          setMessage("");
        }
        setSearching(false);
      }
      if (res.status == "error") {
        showToast("error", "User not found.");
        setSearching(false);
        return;
      }
    } catch (error: any) {
      if (
        error.response.data.non_field_errors[0] ===
        "The fields user_id, organization_id must make a unique set."
      ) {
        showToast("error", "You have already sent an invite to this user.");
      } else {
        showToast("error", "Something went wrong. Please try again later.");
      }
      setSearching(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex items-center gap-1 bg-zinc-900 text-white px-3 py-2 rounded cursor-pointer">
          <HiMiniPlus className="text-xl" />
          <span>Add Member</span>
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Invite a member to join the organization by entering their email.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-3"
              placeholder="Type your message here."
            />
          </div>
        </div>
        <DialogFooter>
          {searching ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button onClick={handleInvite}>Invite User</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberForm;
