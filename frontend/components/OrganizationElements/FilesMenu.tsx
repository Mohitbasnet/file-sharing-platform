"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadFormOrg from "../OrganizationElements/UploadFormOrg";
import ViewSwitch from "../DashboardElements/ViewSwitch";
import SelectBox from "../DashboardElements/SelectBox";
import { getFilesOfOrganization } from "@/lib/apiRequests";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../DashboardElements/Spinner";

const FilesMenu = ({ organization }: any) => {
  console.log(organization);
  const [query, setQuery] = React.useState("");
  const [type, setType] = React.useState("All Files");
  const [view, setView] = React.useState("grid");
  const [filteredFiles, setFilteredFiles] = React.useState(null);

  const {
    isLoading,
    error,
    data: files,
  } = useQuery<any>({
    queryKey: ["organization"],
    queryFn: () => getFilesOfOrganization(organization.id),
  });

  React.useEffect(() => {
    setFilteredFiles(files?.data);
    if (query.length === 0) setFilteredFiles(files?.data);
  }, [files, query]);

  isLoading && <Spinner />;

  const handleSearch = () => {
    const filteredFiles = files?.data.filter((file: any) =>
      file.file_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFiles(filteredFiles);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Organization Files</h1>
        <form
          className="flex w-full max-w-sm items-center space-x-2"
          method="get"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="text"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <Button type="submit" onClick={handleSearch}>
            Search
          </Button>
        </form>
        <UploadFormOrg org_id={organization.id} />
      </div>
      <div className="mt-8 flex items-center justify-between">
        <ViewSwitch view={view} setView={setView} />
        <SelectBox type={type} setType={setType} />
      </div>
      <div className="mt-8"></div>
    </>
  );
};

export default FilesMenu;
