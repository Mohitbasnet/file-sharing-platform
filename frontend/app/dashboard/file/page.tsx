"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadForm from "@/components/DashboardElements/UploadForm";
import SelectBox from "@/components/DashboardElements/SelectBox";
import ViewSwitch from "@/components/DashboardElements/ViewSwitch";
import { useQuery } from "@tanstack/react-query";
import { apiGetFiles } from "@/lib/apiRequests";
import Spinner from "@/components/DashboardElements/Spinner";
import FileView from "@/components/DashboardElements/FileView";

const File = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All Files");
  const [view, setView] = useState("grid");

  // useEffect(() => {
  //   console.log("query", query);
  //   console.log("type", type);
  //   console.log("view", view);
  // }, [query, type, view]);

  const {
    isLoading,
    error,
    data: files,
  } = useQuery<any>({
    queryKey: ["files"],
    queryFn: () => apiGetFiles(),
  });

  isLoading && <Spinner />;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Files</h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <Button type="submit">Search</Button>
        </div>
        <UploadForm />
      </div>
      <div className="mt-8 flex items-center justify-between">
        <ViewSwitch view={view} setView={setView} />
        <SelectBox type={type} setType={setType} />
      </div>
      <div className="mt-8">
        <FileView file={files?.data} view={view} />
      </div>
    </>
  );
};

export default File;
