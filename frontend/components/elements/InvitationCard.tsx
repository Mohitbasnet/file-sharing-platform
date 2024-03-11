import React from "react";
import { HiChevronDown } from "react-icons/hi2";
import ConfirmationDialog from "./ConfirmationDialog";
import showToast from "@/lib/toastNotification";
import { apiDeleteInvitation, apiUpdateInvitation } from "@/lib/apiRequests";
import { useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";

//invitations
interface InvitationCardProps {
  invitation: any;
}
const InvitationCard = ({ invitation }: InvitationCardProps) => {
  const queryClient = useQueryClient();
  const [isActive, setIsActive] = React.useState(false);
  const handleAccept = async () => {
    try {
      const res = await apiUpdateInvitation({
        id: invitation.id,
        status: "accepted",
      });
      if (res.status === 200) {
        showToast("success", "Invitation has been accepted.");
        document.getElementById("dialogCloseBtn")?.click();
        queryClient.invalidateQueries("invitations" as InvalidateQueryFilters);
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Something went wrong. Please try again later.");
    }
  };
  const handleDecline = async () => {
    try {
      const res = await apiUpdateInvitation({
        id: invitation.id,
        status: "rejected",
      });
      if (res.status === 200) {
        showToast("success", "Invitation has been rejected.");
        document.getElementById("dialogCloseBtn")?.click();
        queryClient.invalidateQueries("invitations" as InvalidateQueryFilters);
      }
    } catch (error) {
      showToast("error", "Something went wrong. Please try again later.");
    }
  };
  const handleClear = async () => {
    try {
      const res = await apiDeleteInvitation(invitation.id);
      if (res.status === 204) {
        showToast("success", "Invitation has been cleared.");
        queryClient.invalidateQueries("invitations" as InvalidateQueryFilters);
      }
    } catch (error) {
      showToast("error", "Something went wrong. Please try again later.");
    }
  };
  return (
    <div className="border p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h3>
          <span className="font-semibold">
            {invitation?.organization?.name}
          </span>{" "}
          has invited you to join their organization.
        </h3>
        <p onClick={() => setIsActive(!isActive)} className="cursor-pointer">
          <HiChevronDown
            className={`inline-block ${
              isActive &&
              "transform rotate-180 transition duration-300 ease-in-out"
            }`}
          />
        </p>
      </div>
      {isActive && (
        <>
          <div className="mt-5 text-sm">{invitation.message}</div>
          <div className="mt-4 flex justify-end">
            {invitation.status == "pending" ? (
              <div className="space-x-3">
                <ConfirmationDialog
                  variant="default"
                  onConfirm={handleAccept}
                  btnName="Accept"
                  confirmTitle="Accept Invitation"
                  confirmDescription="Are you sure you want to accept this invitation?"
                />
                <ConfirmationDialog
                  variant="destructive"
                  onConfirm={handleDecline}
                  btnName="Decline"
                  confirmTitle="Decline Invitation"
                  confirmDescription="Are you sure you want to decline this invitation?"
                />
              </div>
            ) : (
              <p className="flex flex-col items-end">
                <span className="text-gray-600 text-sm mb-3">
                  You have already {invitation?.status} this invitation.
                </span>
                <ConfirmationDialog
                  variant="destructive"
                  onConfirm={handleClear}
                  btnName="Remove from list"
                  confirmTitle="Clear Invitation"
                  confirmDescription="Are you sure you want to clear this invitation from the List? They will be able to send you this invitation again."
                />
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InvitationCard;
