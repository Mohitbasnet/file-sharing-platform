import React from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
interface MemberCardProps {
  member: any;
}
const MemberCard = ({ member }: MemberCardProps) => {
  console.log(member);
  return (
    <TableRow>
      <TableCell className="font-medium">{member.user.full_name}</TableCell>
      <TableCell>{member.user.email}</TableCell>
      <TableCell className="capitalize">{member.role}</TableCell>
      <TableCell className="text-right">
        <Button variant="destructive" size="sm">
          Kick Out
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default MemberCard;
