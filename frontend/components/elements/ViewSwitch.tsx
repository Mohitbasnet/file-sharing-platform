import React from "react";
import { HiOutlineListBullet, HiOutlineSquares2X2 } from "react-icons/hi2";

interface Props {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
}
const ViewSwitch = ({ view, setView }: Props) => {
  return (
    <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
      <button
        onClick={() => setView("grid")}
        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm focus:relative ${
          view === "grid" && "bg-white text-blue-500 shadow-sm"
        }`}
      >
        <HiOutlineSquares2X2 className="text-lg" />
        Grid View
      </button>
      <button
        onClick={() => setView("list")}
        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm focus:relative ${
          view === "list" && "bg-white text-blue-500 shadow-sm"
        }`}
      >
        <HiOutlineListBullet className="text-lg" />
        List View
      </button>
    </div>
  );
};

export default ViewSwitch;
