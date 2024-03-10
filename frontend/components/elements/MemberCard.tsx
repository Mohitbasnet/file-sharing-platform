import React from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { apiKickMember } from "@/lib/apiRequests";
import showToast from "@/lib/toastNotification";
import { useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";

interface MemberCardProps {
  member: any;
  isCreator: boolean;
  membershipId: string;
}
const MemberCard = ({ member, isCreator, membershipId }: MemberCardProps) => {
  const queryClient = useQueryClient();
  const handleKick = async () => {
    try {
      const response = await apiKickMember(membershipId);
      if (response.status === 204) {
        showToast("success", "Member kicked out successfully.");
        queryClient.invalidateQueries("members" as InvalidateQueryFilters);
      }
    } catch (error: any) {
      showToast("error", "Something went wrong. Please try again.");
    }
  };
  return (
    <TableRow>
      <TableCell className="font-medium">{member.user.full_name}</TableCell>
      <TableCell>{member.user.email}</TableCell>
      <TableCell className="capitalize">{member.role}</TableCell>
      <TableCell className="text-right">
        <button
          onClick={handleKick}
          disabled={!isCreator}
          className="bg-red-500 px-3 py-2 rounded text-white text-xs"
        >
          Kick Out
        </button>
      </TableCell>
    </TableRow>
  );
};

export default MemberCard;
