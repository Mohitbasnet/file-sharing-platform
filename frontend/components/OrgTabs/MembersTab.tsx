import React from "react";
interface MembersTabProps {
  org: any;
}
const MembersTab = ({ org }: MembersTabProps) => {
  console.log("Member", org);

  return <div>MembersTab</div>;
};

export default MembersTab;
