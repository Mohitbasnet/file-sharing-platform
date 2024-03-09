import React from "react";
interface RecycleBinProps {
  org: any;
}
const RecycleBinTab = ({ org }: RecycleBinProps) => {
  console.log("Recycle", org);
  return <div>RecycleBinTab</div>;
};

export default RecycleBinTab;
