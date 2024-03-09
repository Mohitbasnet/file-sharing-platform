"use client";
import React, { useEffect } from "react";
import OrganizationTabs from "@/components/elements/OrganizationTabs";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiGetOrganization } from "@/lib/apiRequests";
import Spinner from "@/components/elements/Spinner";
import HomeTab from "@/components/OrgTabs/HomeTab";
import MembersTab from "@/components/OrgTabs/MembersTab";
import FilesTab from "@/components/OrgTabs/FilesTab";
import RecycleBinTab from "@/components/OrgTabs/RecycleBinTab";

const SingleOrganization = () => {
  const { slug } = useParams();
  const orgName = slug[0];
  const [selectedTab, setSelectedTab] = React.useState("home");
  const {
    isLoading,
    error,
    data: organization,
  } = useQuery<any>({
    queryKey: ["organization", orgName],
    queryFn: () => apiGetOrganization(orgName),
  });

  isLoading && <Spinner />;
  const org = organization?.data;
  return (
    <>
      <div className="flex items-center justify-between">
        <OrganizationTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <div className="text-2xl font-semibold flex items-center gap-2">
          <p className="w-4 h-4 rounded-full bg-emerald-500"></p>
          <p>{org?.name}</p>
        </div>
      </div>
      <div className="my-6">
        {selectedTab === "home" && <HomeTab org={org} />}
        {selectedTab === "files" && <FilesTab org={org} />}
        {selectedTab === "members" && <MembersTab org={org} />}
        {selectedTab === "recycle" && <RecycleBinTab org={org} />}
      </div>
    </>
  );
};

export default SingleOrganization;
