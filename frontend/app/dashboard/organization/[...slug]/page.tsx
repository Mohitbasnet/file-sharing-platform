"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/DashboardElements/Spinner";
import { apiGetOrganization } from "@/lib/apiRequests";
import { useParams } from "next/navigation";
import TabMenu from "@/components/OrganizationElements/TabMenu";
import HomeMenu from "@/components/OrganizationElements/HomeMenu";
import FilesMenu from "@/components/OrganizationElements/FilesMenu";
import MembersMenu from "@/components/OrganizationElements/MembersMenu";
import RecycleBinMenu from "@/components/OrganizationElements/RecycleBinMenu";

const SingleOrganization = () => {
  const { slug } = useParams();
  const [currentTab, setCurrentTab] = useState("home");
  const {
    isLoading,
    error,
    data: organization,
  } = useQuery<any>({
    queryKey: ["organization"],
    queryFn: () => apiGetOrganization(slug[0]),
  });

  isLoading && <Spinner />;
  const org = organization?.data;

  return (
    <main>
      <div className="mt-2 mb-8">
        <TabMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
      <div className="my-4">
        {currentTab === "home" && <HomeMenu organization={org} />}
        {currentTab === "files" && <FilesMenu organization={org} />}
        {currentTab === "members" && <MembersMenu organization={org} />}
        {currentTab === "recycle bin" && <RecycleBinMenu organization={org} />}
      </div>
    </main>
  );
};

export default SingleOrganization;
