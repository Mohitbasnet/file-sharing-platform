import React from "react";

interface OrganizationTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  isCreator?: boolean;
}

const OrganizationTabs: React.FC<OrganizationTabsProps> = ({
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
      <button
        className={`inline-block rounded-md px-4 py-2 text-sm ${
          selectedTab === "home"
            ? "text-blue-500 shadow-sm bg-white focus:relative"
            : "text-gray-500 hover:text-gray-700 focus:relative"
        }`}
        onClick={() => setSelectedTab("home")}
      >
        Home
      </button>

      <button
        className={`inline-block rounded-md px-4 py-2 text-sm ${
          selectedTab === "files"
            ? "text-blue-500 shadow-sm bg-white focus:relative"
            : "text-gray-500 hover:text-gray-700 focus:relative"
        }`}
        onClick={() => setSelectedTab("files")}
      >
        Files
      </button>

      <button
        className={`inline-block rounded-md px-4 py-2 text-sm ${
          selectedTab === "members"
            ? "text-blue-500 shadow-sm bg-white focus:relative"
            : "text-gray-500 hover:text-gray-700 focus:relative"
        }`}
        onClick={() => setSelectedTab("members")}
      >
        Members
      </button>

      <button
        className={`inline-block rounded-md px-4 py-2 text-sm ${
          selectedTab === "recycle"
            ? "text-blue-500 shadow-sm bg-white focus:relative"
            : "text-gray-500 hover:text-gray-700 focus:relative"
        }`}
        onClick={() => setSelectedTab("recycle")}
      >
        Recycle Bin
      </button>
    </div>
  );
};

export default OrganizationTabs;
