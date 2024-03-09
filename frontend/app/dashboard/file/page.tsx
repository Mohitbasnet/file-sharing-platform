"use client";
import Empty from "@/components/elements/Empty";
import FileCard from "@/components/elements/FileCard";
import SearchBar from "@/components/elements/SearchBar";
import Spinner from "@/components/elements/Spinner";
import UploadForm from "@/components/elements/UploadForm";
import ViewSwitch from "@/components/elements/ViewSwitch";
import { apiGetFiles } from "@/lib/apiRequests";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useCallback } from "react";

const File = () => {
  const [query, setQuery] = React.useState("");
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [filteredFiles, setFilteredFiles] = React.useState([] as any[]);

  const {
    isLoading,
    error,
    data: files,
  } = useQuery<any>({
    queryKey: ["files"],
    queryFn: () => apiGetFiles(),
  });

  const handleSearch = useCallback(
    (query: string) => {
      if (files) {
        const filteredFiles = files?.data?.filter((file: any) =>
          file?.file_name?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFiles(filteredFiles);
      }
    },
    [files]
  );

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-3xl font-bold">Your Files</h1>
        <SearchBar
          placeholder="Type to search files"
          query={query}
          setQuery={setQuery}
          onSubmit={handleSearch}
        />
        <UploadForm />
      </div>
      {files && files.data.length !== 0 && (
        <div className="my-4">
          <ViewSwitch view={view} setView={setView} />
        </div>
      )}

      {filteredFiles.length === 0 ? (
        <Empty />
      ) : (
        <div className="my-2 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFiles.map((file: any) => (
            <FileCard
              key={file.id}
              file={file}
              view={view}
              options={["favourite", "trash", "permission", "copy"]}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default File;
