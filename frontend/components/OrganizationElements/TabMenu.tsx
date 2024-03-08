import React from "react";
interface TabMenuProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}
const TabMenu = ({ currentTab, setCurrentTab }: TabMenuProps) => {
  return (
    <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
      <button
        onClick={() => {
          setCurrentTab("home");
        }}
        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm focus:relative ${
          currentTab == "home" && "bg-white text-blue-500 shadow-sm"
        }`}
      >
        Home
      </button>
      <button
        onClick={() => {
          setCurrentTab("files");
        }}
        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm focus:relative ${
          currentTab == "files" && "bg-white text-blue-500 shadow-sm"
        }`}
      >
        Files
      </button>
      <button
        onClick={() => {
          setCurrentTab("members");
        }}
        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm focus:relative ${
          currentTab == "members" && "bg-white text-blue-500 shadow-sm"
        }`}
      >
        Members
      </button>
      <button
        onClick={() => {
          setCurrentTab("recycle bin");
        }}
        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm focus:relative ${
          currentTab == "recycle bin" && "bg-white text-blue-500 shadow-sm"
        }`}
      >
        Recycle Bin
      </button>
    </div>
  );
};

export default TabMenu;
