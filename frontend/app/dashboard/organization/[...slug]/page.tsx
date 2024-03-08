"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/DashboardElements/Spinner";
import { apiGetOrganization } from "@/lib/apiRequests";
import { useParams } from "next/navigation";

const SingleOrganization = () => {
  const { slug } = useParams();
  const [currentTab, setCurrentTab] = useState("recycle bin");
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
      <h1 className="text-2xl font-bold">Welcome to {org?.name}</h1>
      <div className="my-4">
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
      </div>
    </main>
  );
};

export default SingleOrganization;
