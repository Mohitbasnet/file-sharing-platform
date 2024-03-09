import React from "react";
interface HomeTabProps {
  org: any;
}
const HomeTab = ({ org }: HomeTabProps) => {
  console.log("HomeTab", org);
  return <div>HomeTab</div>;
};

export default HomeTab;
